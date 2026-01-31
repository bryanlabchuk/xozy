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

  const btnMain = "w-full p-[18px] font-black cursor-pointer rounded border-none uppercase tracking-[1px]";

  return (
    <div>
      <EditorPanel 
        engineRef={engineRef}
        activeGroup={activeGroup}
        selectedPad={selectedPad}
        projectData={projectData}
        updatePadStep={updatePadStep}
        clearCurrentPadPattern={clearCurrentPadPattern}
        current16thNote={current16thNote}
      />

      <div className="grid grid-cols-2 gap-[10px] mt-5">
        <button 
          onClick={handleInject} 
          className={`${btnMain} bg-[var(--accent)] text-white`}
          id="inject-btn"
        >
          INJECT / START
        </button>
        <button 
          onClick={stopSequencer} 
          className={`${btnMain} bg-[#333] text-white`}
        >
          STOP / PANIC
        </button>
      </div>
    </div>
  );
}

export default DeckRight;
