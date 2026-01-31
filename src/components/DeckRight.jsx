import React from 'react';
import EditorPanel from './EditorPanel';

function DeckRight({ 
  engineRef, 
  handleInject, 
  stopSequencer, 
  clearCurrentPadPattern, 
  activeGroup, 
  selectedPad, 
  projectData, 
  updatePadStep, 
  current16thNote 
}) {

  const btnBase = "w-full p-[18px] font-black cursor-pointer rounded-[4px] uppercase tracking-[1px] border-none text-[var(--bg)]";

  return (
    <div className="deck-right">
      <EditorPanel 
        engineRef={engineRef}
        activeGroup={activeGroup}
        selectedPad={selectedPad}
        projectData={projectData}
        updatePadStep={updatePadStep}
        clearCurrentPadPattern={clearCurrentPadPattern}
        current16thNote={current16thNote}
      />

      <div className="grid grid-cols-2 gap-[10px] mt-8">
        <button 
          onClick={handleInject} 
          className={`${btnBase} bg-[var(--accent)] text-white`}
          id="inject-btn"
        >
          INJECT / START
        </button>
        <button 
          onClick={stopSequencer} 
          className={`${btnBase} bg-[#333] text-white`}
          id="stop-btn"
        >
          STOP / PANIC
        </button>
      </div>
    </div>
  );
}

export default DeckRight;
