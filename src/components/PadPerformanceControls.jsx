import React from 'react';

function PadPerformanceControls({ engineRef, activeGroup, selectedPad, projectData, updatePadData }) {
  if (!projectData || !projectData[activeGroup] || !projectData[activeGroup][selectedPad]) {
    return <div className="p-4 bg-black/5 rounded">Loading Pad Data...</div>;
  }

  const currentPad = projectData[activeGroup][selectedPad];

  const handleNoteChange = (e) => updatePadData(activeGroup, selectedPad, 'midiNote', parseInt(e.target.value, 10));
  const handleGateChange = (e) => updatePadData(activeGroup, selectedPad, 'gateMs', parseInt(e.target.value, 10));
  const handleVelModeChange = (e) => updatePadData(activeGroup, selectedPad, 'velMode', e.target.value);
  const handleAutoCCChange = (e) => updatePadData(activeGroup, selectedPad, 'autoTargetCC', parseInt(e.target.value, 10));

  const toggleMute = () => {
    updatePadData(activeGroup, selectedPad, 'muted', !currentPad.muted);
  };

  const toggleMode = () => {
    const newMode = currentPad.mode === 'chord' ? 'drum' : 'chord';
    updatePadData(activeGroup, selectedPad, 'mode', newMode);
  };

  const resetPadPerf = () => {
      updatePadData(activeGroup, selectedPad, 'midiNote', 36 + selectedPad);
      updatePadData(activeGroup, selectedPad, 'gateMs', 100);
      updatePadData(activeGroup, selectedPad, 'velMode', 'xyz');
      updatePadData(activeGroup, selectedPad, 'autoTargetCC', 74);
      updatePadData(activeGroup, selectedPad, 'muted', false);
      updatePadData(activeGroup, selectedPad, 'mode', 'drum');
  };

  // Styles
  const labelClass = "text-[0.55rem] font-extrabold uppercase mb-[6px] block tracking-[1px] opacity-80";
  const inputClass = "w-full p-2 bg-[var(--bg)] border border-[var(--text)] text-[var(--text)] font-bold text-xs rounded-sm box-border";
  const btnSmallClass = "bg-[#555] text-white border-none p-[10px] text-[0.65rem] cursor-pointer rounded-sm font-bold w-full";
  const btnToggleOnClass = "!bg-[var(--lcd-text)] !text-black";

  return (
    <div className="bg-black/5 p-[15px] rounded-lg border border-[var(--border)] mt-5">
      <div className="flex justify-between items-center mb-[10px]">
        <strong className="tracking-[1px] text-[0.7rem]">PAD SETTINGS</strong>
        <button 
            className={`${btnSmallClass} !w-auto`} 
            onClick={resetPadPerf}
        >
            RESET
        </button>
      </div>
      <div className="grid grid-cols-2 gap-[15px] items-end">
        <div>
            <label className={labelClass}>NOTE</label>
            <input type="number" className={inputClass} id="pad-midi-note" value={currentPad.midiNote} onChange={handleNoteChange} />
        </div>
        <div>
            <label className={labelClass}>GATE</label>
            <input type="number" className={inputClass} id="pad-gate-ms" value={currentPad.gateMs} onChange={handleGateChange} />
        </div>
        <div>
            <label className={labelClass}>VEL MODE</label>
            <select className={inputClass} id="pad-vel-mode" value={currentPad.velMode} onChange={handleVelModeChange}>
                <option value="xyz">Use X/Y/Z</option>
                <option value="fixed">Fixed</option><option value="range">Random</option>
            </select>
        </div>
        <div>
            <label className={labelClass}>CC (AUTO)</label>
            <input type="number" className={inputClass} id="pad-auto-cc" value={currentPad.autoTargetCC} onChange={handleAutoCCChange} />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-[10px] mt-[10px]">
        <button 
            id="pad-mute-btn" 
            className={`${btnSmallClass} ${currentPad.muted ? btnToggleOnClass : ''}`} 
            onClick={toggleMute}
        >
            {currentPad.muted ? 'PAD: MUTE' : 'PAD: ON'}
        </button>
        <button 
            id="pad-mode-toggle" 
            className={btnSmallClass} 
            onClick={toggleMode}
        >
            MODE: {currentPad.mode.toUpperCase()}
        </button>
      </div>
    </div>
  );
}

export default PadPerformanceControls;
