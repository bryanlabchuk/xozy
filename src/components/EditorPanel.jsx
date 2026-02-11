import React, { useState } from 'react';
import StepSequencerGrid from './StepSequencerGrid';
import PatternBrowser from './PatternBrowser';

function EditorPanel({ 
    engineRef, 
    activeGroup, 
    selectedPad, 
    projectData, 
    updatePadStep, 
    clearCurrentPadPattern, 
    loadPadPattern,
    loadKit,
    current16thNote 
}) {
    const [showBrowser, setShowBrowser] = useState(false);

    // Shared styles
    const labelClass = "text-[0.55rem] font-extrabold uppercase mb-[6px] block tracking-[1px] opacity-80";

    return (
        <div className="bg-black/5 border-2 border-[var(--border)] p-5 rounded-lg flex-grow relative overflow-hidden">
            <div className="border-b border-[var(--border)] pb-[10px] mb-[15px] font-black tracking-[1px] flex justify-between items-center">
                <span id="editor-title">STEP SEQUENCER (64 STEPS)</span>
                <button 
                    onClick={() => setShowBrowser(true)}
                    className="bg-[var(--accent)] text-white px-3 py-1 text-[0.65rem] font-bold rounded-sm tracking-wider hover:brightness-110 shadow-sm"
                >
                    + BROWSE LIBRARY
                </button>
            </div>
            
            {showBrowser ? (
                <PatternBrowser 
                    activeGroup={activeGroup}
                    selectedPad={selectedPad}
                    loadPadPattern={loadPadPattern}
                    loadKit={loadKit}
                    onClose={() => setShowBrowser(false)}
                />
            ) : (
                <>
                    <StepSequencerGrid
                        projectData={projectData}
                        activeGroup={activeGroup}
                        selectedPad={selectedPad}
                        updatePadStep={updatePadStep}
                        current16thNote={current16thNote}
                    />
                    
                    <div className="mt-[15px] text-right">
                        <button 
                            onClick={clearCurrentPadPattern} 
                            className="bg-[#555] text-white border-none p-[10px] text-[0.65rem] cursor-pointer rounded-sm font-bold w-auto"
                        >
                            CLEAR PAD PATTERN
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}

export default EditorPanel;
