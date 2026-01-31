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
    current16thNote,
    projectData,
    updatePadData,
    updatePadStep,
    clearCurrentPadPattern,
    logMessages,
  } = useSequencer();

  const applyThemeToBody = (theme) => {
    document.body.className = (theme !== 'auto') ? `theme-${theme}` : '';
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem('oxo_theme') || 'auto';
    setCurrentTheme(savedTheme);
    applyThemeToBody(savedTheme);
    if (document.body.classList.contains('dark-mode')) {
      setIsDarkMode(true);
    }
  }, []);

  const setThemeOverride = (value) => {
    localStorage.setItem('oxo_theme', value);
    setCurrentTheme(value);
  };

  const toggleDark = () => setIsDarkMode(prev => !prev);
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
          setActiveTab={setActiveTab}
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