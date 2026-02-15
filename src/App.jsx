import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header.jsx';
import LCD from './components/LCD.jsx';
import DeckLeft from './components/DeckLeft.jsx';
import DeckRight from './components/DeckRight.jsx';
import useSequencer from './hooks/useSequencer.js';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentTheme, setCurrentTheme] = useState('auto');
  const [isSkinnyMode, setIsSkinnyMode] = useState(false);
  const [activeTab, setActiveTab] = useState('drum');

  const {
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
  } = useSequencer();

  useEffect(() => {
    // 1. Get Base Class (Theme)
    const baseClass = (currentTheme !== 'auto') ? `theme-${currentTheme}` : '';
    
    // 2. Set Body Class (Overwrites existing to ensure clean state)
    document.body.className = baseClass;

    // 3. Append Dark Mode if active
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
    }
  }, [currentTheme, isDarkMode]);

  useEffect(() => {
    const savedTheme = localStorage.getItem('oxo_theme') || 'auto';
    const savedDark = localStorage.getItem('oxo_dark_mode') === 'true';
    
    setCurrentTheme(savedTheme);
    setIsDarkMode(savedDark);
  }, []);

  const setThemeOverride = (value) => {
    localStorage.setItem('oxo_theme', value);
    setCurrentTheme(value);
  };

  const toggleDark = () => {
    setIsDarkMode(prev => {
        const newValue = !prev;
        localStorage.setItem('oxo_dark_mode', newValue);
        return newValue;
    });
  };
  const toggleLayout = () => setIsSkinnyMode(prev => !prev);

  return (
    <div className={`chassis ${isSkinnyMode ? 'skinny-mode' : ''}`}>
      <Header
        currentTheme={currentTheme}
        setThemeOverride={setThemeOverride}
        toggleDark={toggleDark}
        toggleLayout={toggleLayout}
      />

      <LCD logMessages={logMessages} />

      <div className="main-deck">
        <DeckLeft
          activeTab={activeTab}
          setActiveTab={(tab) => { setActiveTab(tab); setEngineActiveTab(tab); }}
          initMidi={initMidi}
          engineRef={engineRef}
          bpm={bpm} setEngineBPM={setEngineBPM}
          swing={swing} setEngineSwing={setEngineSwing}
          globalBars={globalBars} setEngineGlobalBars={setEngineGlobalBars}
          activeGroup={activeGroup} setEngineActiveGroup={setEngineActiveGroup}
          selectedPad={selectedPad} setEngineSelectedPad={setEngineSelectedPad}
          projectData={projectData}
          updatePadData={updatePadData}
        />

        <DeckRight
          engineRef={engineRef}
          handleInject={handleInject}
          stopSequencer={stopSequencer}
          clearCurrentPadPattern={clearCurrentPadPattern}
          loadPadPattern={loadPadPattern}
          loadKit={loadKit}
          activeGroup={activeGroup}
          selectedPad={selectedPad}
          projectData={projectData}
          updatePadStep={updatePadStep}
          current16thNote={current16thNote}
        />
      </div>
    </div>
  );
}

export default App;