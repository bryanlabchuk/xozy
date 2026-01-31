import React from 'react';
import PadGrid from './PadGrid';

function DrumTabContent({
  engineRef,
  bpm, setEngineBPM,
  swing, setEngineSwing,
  globalBars, setEngineGlobalBars,
  activeGroup, setEngineActiveGroup,
  selectedPad, setEngineSelectedPad,
  projectData,
  updatePadData
}) {

  const selectGroup = (index) => {
    setEngineActiveGroup(index);
    engineRef.current.log(`GROUP ${['A', 'B', 'C', 'D'][index]} SELECTED`);
  };

  // Styles
  const controlGroupClass = "bg-black/5 p-[15px] rounded-lg border border-[var(--border)] mb-5";
  const gridClass = "grid grid-cols-2 gap-[15px] items-end";
  const labelClass = "text-[0.55rem] font-extrabold uppercase mb-[6px] block tracking-[1px] opacity-80";
  const inputClass = "w-full p-2 bg-[var(--bg)] border border-[var(--text)] text-[var(--text)] font-bold text-xs rounded-sm box-border";
  const knobClass = "appearance-none w-full h-1 bg-[var(--text)] outline-none rounded-sm mt-[5px]";

  return (
    <div id="tab-drum">
      <div className={controlGroupClass}>
        <div className={`${gridClass} mb-[15px]`}>
          <div>
            <label className={labelClass}>BPM</label>
            <input 
              type="number" 
              className={inputClass}
              id="tempo" 
              value={bpm} 
              onChange={(e) => setEngineBPM(parseInt(e.target.value, 10))} 
            />
          </div>
          <div>
            <label className={labelClass}>MIDI CHANNEL</label>
            <div className="text-[0.7rem] font-black p-[10px] bg-black/10 border border-[var(--text)] rounded-[2px]">
              AUTO
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-[10px] items-end">
          <div>
            <label className={labelClass}>LENGTH</label>
            <select 
              className={inputClass}
              id="global-bars" 
              value={globalBars} 
              onChange={(e) => setEngineGlobalBars(parseInt(e.target.value, 10))}
            >
              <option value="1">1 Bar</option>
              <option value="2">2 Bars</option>
              <option value="4">4 Bars</option>
              <option value="8">8 Bars</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>SWING</label>
            <input 
              type="range" 
              className={knobClass} 
              id="swing-slider" 
              min="0" max="75" 
              value={swing} 
              onChange={(e) => setEngineSwing(parseInt(e.target.value, 10))} 
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-[45px_1fr] gap-5">
        <div className="flex flex-col gap-[6px] justify-end">
          {['A', 'B', 'C', 'D'].map((groupName, index) => (
            <button
              key={index}
              className={`
                flex-1 bg-black/10 border-2 border-[var(--text)] rounded-[4px] 
                text-[var(--text)] font-black cursor-pointer flex items-center justify-center text-sm
                ${index === activeGroup ? 'bg-[var(--accent)] text-white border-[var(--accent)]' : ''}
              `}
              onClick={() => selectGroup(index)}
            >
              {groupName}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-[2px]">
            <PadGrid
              engineRef={engineRef}
              activeGroup={activeGroup}
              selectedPad={selectedPad}
              setEngineSelectedPad={setEngineSelectedPad}
              projectData={projectData}
              updatePadData={updatePadData}
            />
        </div>
      </div>
    </div>
  );
}

export default DrumTabContent;
