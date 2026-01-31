import React from 'react';
import TabNavigation from './TabNavigation';
import DrumTabContent from './DrumTabContent';
import ChordTabContent from './ChordTabContent';
import SynthTabContent from './SynthTabContent';
import PadPerformanceControls from './PadPerformanceControls';

function DeckLeft({
  activeTab, setActiveTab, initMidi, engineRef,
  bpm, setEngineBPM, swing, setEngineSwing, globalBars, setEngineGlobalBars,
  activeGroup, setEngineActiveGroup, selectedPad, setEngineSelectedPad,
  projectData, updatePadData
}) {
  return (
    <div className="deck-left">
      <button 
        className="w-full p-[18px] font-black cursor-pointer rounded border-none uppercase tracking-[1px] mb-5 bg-[var(--accent)] text-white" 
        id="init-btn" 
        onClick={initMidi}
      >
        INITIALIZE MIDI
      </button>

      <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

      {activeTab === 'drum' && (
        <DrumTabContent
          engineRef={engineRef}
          bpm={bpm} setEngineBPM={setEngineBPM}
          swing={swing} setEngineSwing={setEngineSwing}
          globalBars={globalBars} setEngineGlobalBars={setEngineGlobalBars}
          activeGroup={activeGroup} setEngineActiveGroup={setEngineActiveGroup}
          selectedPad={selectedPad} setEngineSelectedPad={setEngineSelectedPad}
          projectData={projectData}
          updatePadData={updatePadData}
        />
      )}
      {activeTab === 'chord' && (
        <ChordTabContent
          engineRef={engineRef}
          activeGroup={activeGroup}
          selectedPad={selectedPad}
          projectData={projectData}
          updatePadData={updatePadData}
        />
      )}
      {activeTab === 'synth' && (
        <SynthTabContent
          engineRef={engineRef}
        />
      )}

      <PadPerformanceControls
        engineRef={engineRef}
        activeGroup={activeGroup}
        selectedPad={selectedPad}
        projectData={projectData}
        updatePadData={updatePadData}
      />
    </div>
  );
}

export default DeckLeft;
