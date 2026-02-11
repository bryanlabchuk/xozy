import { useRef, useEffect, useState, useCallback } from 'react';
import { SequencerEngine, clamp } from '../engine'; // Import clamp as well

function useSequencer() {
  const engineRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [bpm, setBpm] = useState(120);
  const [swing, setSwing] = useState(0);
  const [globalBars, setGlobalBars] = useState(4);
  const [activeGroup, setActiveGroup] = useState(0);
  const [selectedPad, setSelectedPad] = useState(0);
  const [current16thNote, setCurrent16thNote] = useState(0);

  // State for projectData to trigger React re-renders when pads/steps change
  // This will need to be a deep copy or use Immer for mutable updates
  const [projectData, setProjectData] = useState([]);

  // Log messages for the LCD
  const [logMessages, setLogMessages] = useState([]);

  useEffect(() => {
    // Initialize the engine only once
    if (!engineRef.current) {
      engineRef.current = new SequencerEngine();
      
      // Setup engine log handler
      engineRef.current.onLog = (msg) => {
        const t = new Date().toLocaleTimeString().split(' ')[0];
        setLogMessages(prevMessages => [`${t} ${msg}`, ...prevMessages]);
      };
      engineRef.current.log("SYSTEM BOOT...");

      // Initial project data from engine
      setProjectData(JSON.parse(JSON.stringify(engineRef.current.projectData)));
      setBpm(engineRef.current.bpm);
      setSwing(engineRef.current.swing);
      setGlobalBars(engineRef.current.globalBars);
    }

    // Cleanup function for the engine if needed
    return () => {
      if (engineRef.current) {
        engineRef.current.stop();
      }
    };
  }, []);

  // --- Engine Control Functions ---
  const initMidi = useCallback(async () => {
    if (engineRef.current) {
      const ready = await engineRef.current.init();
      if (!ready) {
        engineRef.current.log("OFFLINE MODE (NO MIDI)");
      } else {
        engineRef.current.log("SYSTEM READY. MIDI INITIALIZED.");
        // Attach UI update handlers for engine events
        engineRef.current.onStepTrigger = (g, p) => {
            // Need a way to flash pad in UI
            console.log(`Step Triggered: Group ${g}, Pad ${p}`);
        };
        engineRef.current.onClockTick = (stepIndex) => {
            setCurrent16thNote(stepIndex);
            // Need a way to highlight step in UI
            console.log(`Clock Tick: Step ${stepIndex}`);
        };
      }
    }
  }, []);

  const handleInject = useCallback(() => {
    if (engineRef.current) {
      engineRef.current.handleInject();
      setIsPlaying(true);
    }
  }, []);

  const stopSequencer = useCallback(() => {
    if (engineRef.current) {
      engineRef.current.stop();
      setIsPlaying(false);
    }
  }, []);

  // --- UI-to-Engine State Sync ---
  const setEngineBPM = useCallback((newBPM) => {
    if (engineRef.current) {
      engineRef.current.bpm = newBPM;
      setBpm(newBPM);
    }
  }, []);

  const setEngineSwing = useCallback((newSwing) => {
    if (engineRef.current) {
      engineRef.current.swing = newSwing;
      setSwing(newSwing);
    }
  }, []);

  const setEngineGlobalBars = useCallback((newGlobalBars) => {
    if (engineRef.current) {
      engineRef.current.globalBars = newGlobalBars;
      setGlobalBars(newGlobalBars);
    }
  }, []);

  const setEngineActiveGroup = useCallback((groupIndex) => {
    if (engineRef.current) {
      setActiveGroup(groupIndex);
      // Potentially update UI for pad selection based on group
    }
  }, []);

  const setEngineSelectedPad = useCallback((padIndex) => {
    if (engineRef.current) {
      setSelectedPad(padIndex);
      // Potentially update UI for pad settings based on selected pad
    }
  }, []);

  const setEngineActiveTab = useCallback((tab) => {
      if (engineRef.current) {
          engineRef.current.activeTab = tab;
      }
  }, []);

  // Function to update a specific pad's properties and trigger a re-render
  const updatePadData = useCallback((group, pad, key, value) => {
    setProjectData(prevData => {
      const newData = JSON.parse(JSON.stringify(prevData)); // Deep copy to ensure immutability
      if (newData[group] && newData[group][pad]) {
        if (key.startsWith("chord.")) { // Handle nested chord object
            const [chordKey, chordSubKey] = key.split('.');
            newData[group][pad][chordKey][chordSubKey] = value;
        } else {
            newData[group][pad][key] = value;
        }
      }
      if (engineRef.current) engineRef.current.projectData = newData;
      return newData;
    });
  }, []);

  // Function to update a specific step's note character
  const updatePadStep = useCallback((group, pad, stepIndex, newNoteChar) => {
    setProjectData(prevData => {
      const newData = JSON.parse(JSON.stringify(prevData));
      if (newData[group] && newData[group][pad] && newData[group][pad].notes) {
        newData[group][pad].notes[stepIndex] = newNoteChar;
      }
      if (engineRef.current) engineRef.current.projectData = newData;
      return newData;
    });
  }, []);

  // Function to clear current pad pattern
  const clearCurrentPadPattern = useCallback(() => {
    if (engineRef.current && projectData[activeGroup] && projectData[activeGroup][selectedPad]) {
      setProjectData(prevData => {
        const newData = JSON.parse(JSON.stringify(prevData));
        newData[activeGroup][selectedPad].notes.fill('O');
        if (engineRef.current) engineRef.current.projectData = newData;
        return newData;
      });
      engineRef.current.log("PAD CLEARED");
    }
  }, [activeGroup, selectedPad, projectData]);

  const loadPadPattern = useCallback((group, pad, patternString) => {
    const cleanPat = patternString.replace(/\s/g, '');
    setProjectData(prevData => {
      const newData = JSON.parse(JSON.stringify(prevData));
      if (newData[group] && newData[group][pad]) {
          for (let i = 0; i < 64; i++) {
               newData[group][pad].notes[i] = cleanPat[i % cleanPat.length] || 'O';
          }
      }
      if (engineRef.current) engineRef.current.projectData = newData;
      return newData;
    });
    if (engineRef.current) engineRef.current.log("PATTERN LOADED");
  }, []);

  const loadKit = useCallback((kitData) => {
    setProjectData(prevData => {
      const newData = JSON.parse(JSON.stringify(prevData));
      // Iterate through tracks in the kit (e.g. 0, 1, 2)
      for (const [padIndex, patternStr] of Object.entries(kitData.tracks)) {
          const pIdx = parseInt(padIndex, 10);
          // Apply to the active group
          if (newData[activeGroup] && newData[activeGroup][pIdx]) {
               const cleanPat = patternStr.replace(/\s/g, '');
               for (let i = 0; i < 64; i++) {
                   newData[activeGroup][pIdx].notes[i] = cleanPat[i % cleanPat.length] || 'O';
               }
          }
      }
      if (engineRef.current) engineRef.current.projectData = newData;
      return newData;
    });
    if (engineRef.current) engineRef.current.log(`KIT LOADED: ${kitData.name}`);
  }, [activeGroup]);


  return {
    engineRef,
    initMidi,
    handleInject,
    stopSequencer,
    isPlaying,
    bpm, setEngineBPM,
    swing, setEngineSwing,
    globalBars, setEngineGlobalBars,
    activeGroup, setEngineActiveGroup,
    selectedPad, setEngineSelectedPad,
    setEngineActiveTab,
    current16thNote,
    projectData,
    updatePadData,
    updatePadStep,
    clearCurrentPadPattern,
    loadPadPattern,
    loadKit,
    logMessages,
  };
}

export default useSequencer;
