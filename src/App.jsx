import React, { useState, useEffect } from 'react';
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

  useEffect(() => {
    const savedTheme = localStorage.getItem('oxo_theme') || 'auto';
    setCurrentTheme(savedTheme);
    applyThemeToBody(savedTheme);
    if (document.body.classList.contains('dark-mode')) {
      setIsDarkMode(true);
    }
  }, []);

  useEffect(() => {
    applyThemeToBody(currentTheme);
  }, [currentTheme]);

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [isDarkMode]);

  const applyThemeToBody = (theme) => {
    document.body.className = (theme !== 'auto') ? `theme-${theme}` : '';
  };

  const setThemeOverride = (value) => {
    localStorage.setItem('oxo_theme', value);
    setCurrentTheme(value);
  };

  const toggleDark = () => setIsDarkMode(prev => !prev);
  const toggleLayout = () => setIsSkinnyMode(prev => !prev);

  return (
    <div className={`
      bg-[var(--panel-bg)] border-2 border-[var(--border)] rounded-xl
      p-6 w-[95%] shadow-[20px_20px_60px_rgba(0,0,0,0.3)] backdrop-blur-[10px]
      my-5 mx-auto transition-[max-width] duration-400 ease-in-out
      ${isSkinnyMode ? 'max-w-[480px]' : 'max-w-[1100px]'}
    `}>
      <Header
        currentTheme={currentTheme}
        setThemeOverride={setThemeOverride}
        toggleDark={toggleDark}
        toggleLayout={toggleLayout}
      />

      <LCD logMessages={logMessages} />

      <div className={`grid gap-10 ${isSkinnyMode ? 'grid-cols-1' : 'grid-cols-[1fr_1.4fr]'}`}>
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