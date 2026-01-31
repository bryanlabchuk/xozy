import React from 'react';
import { PRESETS } from '../engine';
import StepSequencerGrid from './StepSequencerGrid';

function EditorPanel({ 
    engineRef, 
    activeGroup, 
    selectedPad, 
    projectData, 
    updatePadStep, 
    clearCurrentPadPattern, 
    current16thNote 
}) {

    const loadPreset = (presetJSON, isKit) => {
        if (!engineRef.current) return;
        const preset = JSON.parse(presetJSON);
        
        if (isKit) {
             console.log("Kit loading not fully implemented in React state yet.");
        } else {
             const cleanPat = preset.pat.replace(/\s/g, '');
             for (let i = 0; i < 64; i++) {
                 updatePadStep(activeGroup, selectedPad, i, cleanPat[i % cleanPat.length] || 'O');
             }
             if (engineRef.current) engineRef.current.log(`PATTERN LOADED: ${preset.name}`);
        }
    };

    const renderOptions = (isKit) => {
        const options = [];
        for (const [category, patterns] of Object.entries(PRESETS)) {
            const groupPatterns = patterns.filter(p => {
                const isMulti = p.type === 'multi';
                return isKit ? isMulti : !isMulti;
            });
            
            if (groupPatterns.length > 0) {
                 options.push(
                     <optgroup label={category} key={category}>
                         {groupPatterns.map((pat, idx) => (
                             <option key={idx} value={JSON.stringify(pat)}>{pat.name}</option>
                         ))}
                     </optgroup>
                 );
            }
        }
        return options;
    };

    // Shared styles
    const labelClass = "text-[0.55rem] font-extrabold uppercase mb-[6px] block tracking-[1px] opacity-80";
    const selectClass = "w-full p-2 bg-[var(--bg)] border border-[var(--text)] text-[var(--text)] font-bold text-xs rounded-sm";

    return (
        <div className="bg-black/5 border-2 border-[var(--border)] p-5 rounded-lg flex-grow">
            <div className="border-b border-[var(--border)] pb-[10px] mb-[15px] font-black tracking-[1px]">
                <span id="editor-title">STEP SEQUENCER (64 STEPS)</span>
            </div>
            
            <div className="grid grid-cols-2 gap-[15px] items-end mb-[15px]">
                <div>
                    <label className={labelClass}>FULL KITS (TODO)</label>
                    <select className={selectClass} id="preset-kit-select" onChange={(e) => {
                        if (e.target.value) { loadPreset(e.target.value, true); e.target.value = ""; }
                    }}>
                        <option value="">-- LOAD KIT --</option>
                        {renderOptions(true)}
                    </select>
                </div>
                <div>
                    <label className={labelClass}>PATTERNS</label>
                    <select className={selectClass} id="preset-pad-select" onChange={(e) => {
                        if (e.target.value) { loadPreset(e.target.value, false); e.target.value = ""; }
                    }}>
                        <option value="">-- LOAD PATTERN --</option>
                        {renderOptions(false)}
                    </select>
                </div>
            </div>

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
        </div>
    );
}

export default EditorPanel;
