import React, { useState, useEffect } from 'react';
import { clamp } from '../engine';

function ChordTabContent({ engineRef, activeGroup, selectedPad, projectData, updatePadData }) {
  if (!projectData || !projectData[activeGroup] || !projectData[activeGroup][selectedPad]) {
      return <div>Loading...</div>;
  }
  
  const currentPad = projectData[activeGroup][selectedPad];
  const chordData = currentPad.chord;

  const updateChord = (key, value) => {
      updatePadData(activeGroup, selectedPad, `chord.${key}`, value);
  };

  const shiftOctave = (direction) => {
    const newOct = clamp(chordData.oct + direction, 1, 6);
    updateChord('oct', newOct);
  };

  const setRoot = (noteIndex) => {
      updateChord('root', noteIndex);
  };

  const handleKeyClick = (noteIndex) => {
      // 1. Update State
      setRoot(noteIndex);
      
      // 2. Trigger Preview (Send MIDI to device)
      if (engineRef.current) {
          // Create a temp pad object with the NEW root so we hear the change immediately
          const tempPad = {
              ...currentPad,
              chord: {
                  ...currentPad.chord,
                  root: noteIndex
              }
          };
          
          const chan = activeGroup;
          const vel = 110;
          const noteOn = 0x90 + chan;
          const noteOff = 0x80 + chan;
          const now = performance.now();
          
          engineRef.current.triggerChord(tempPad, chan, vel, noteOn, noteOff, now);
      }
  };

  const renderPianoKeys = () => {
      const whites = [0, 2, 4, 5, 7, 9, 11];
      const blacks = [1, 3, 6, 8, 10];
      const blackPositions = { 1: '10%', 3: '24%', 6: '52%', 8: '67%', 10: '82%' };

      return (
          <div className="relative w-full rounded-lg bg-transparent h-[170px]" id="kb-keys">
              <div className="absolute inset-0 flex gap-1">
                  {whites.map(note => (
                      <div 
                        key={note} 
                        className={`
                            flex-1 border-2 border-[var(--border)] cursor-pointer rounded-full transition-colors duration-100
                            ${chordData.root === note ? '!bg-[var(--accent)]' : 'bg-[var(--key-white)] active:bg-[#ddd]'}
                        `} 
                        onMouseDown={() => handleKeyClick(note)}
                      ></div>
                  ))}
              </div>
              <div className="absolute inset-0 pointer-events-none">
                  {blacks.map(note => (
                      <div 
                        key={note} 
                        className={`
                            absolute bg-[#111] cursor-pointer pointer-events-auto rounded-full 
                            border border-white/10 shadow-md w-[10%] h-[90px] top-[5px]
                            ${chordData.root === note ? '!bg-[var(--accent)] border-white' : ''}
                        `} 
                        style={{ left: blackPositions[note] }} 
                        onMouseDown={() => handleKeyClick(note)}
                      ></div>
                  ))}
              </div>
          </div>
      );
  };

  // Styles
  const labelClass = "text-[0.55rem] font-extrabold uppercase mb-[6px] block tracking-[1px] opacity-95";
  const selectClass = "w-full p-2 bg-[var(--bg)] border border-[var(--text)] text-[var(--text)] font-bold text-xs rounded-sm";
  const knobClass = "appearance-none w-full h-1 bg-[var(--text)] outline-none rounded-sm mt-[5px]";
  const octBtnClass = "bg-[#555] text-white border-none p-2 text-xs font-bold cursor-pointer rounded-sm w-8";

  return (
    <div id="tab-chord">
      <div className="bg-black/5 p-[15px] rounded-lg border border-[var(--border)] mb-5">
        <label className={labelClass}>CHORD PIANO</label>
        <div className="flex gap-[10px]">
          <div className="flex flex-col gap-[5px]">
            <button className={octBtnClass} onClick={() => shiftOctave(1)}>+</button>
            <div className="text-center font-bold text-sm"><span id="octave-display">{chordData.oct}</span></div>
            <button className={octBtnClass} onClick={() => shiftOctave(-1)}>&ndash;</button>
          </div>
          
          {renderPianoKeys()}

        </div>
        <div className="grid grid-cols-2 gap-[15px] items-end mt-[15px]">
          <select id="chord-root" className="hidden" value={chordData.root} readOnly><option value={chordData.root}>{chordData.root}</option></select>
          <div>
            <label className={labelClass}>QUALITY</label>
            <select className={selectClass} id="chord-quality" value={chordData.quality} onChange={(e) => updateChord('quality', e.target.value)}>
              <option value="maj">Major</option><option value="min">Minor</option>
              <option value="dim">Diminished</option><option value="aug">Augmented</option>
              <option value="sus2">Sus 2</option><option value="sus4">Sus 4</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>EXT</label>
            <select className={selectClass} id="chord-ext" value={chordData.ext} onChange={(e) => updateChord('ext', e.target.value)}>
              <option value="none">None</option><option value="7">7th</option><option value="9">9th</option>
              <option value="11">11th</option><option value="13">13th</option><option value="6">6th</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>INV</label>
            <select className={selectClass} id="chord-inv" value={chordData.inv} onChange={(e) => updateChord('inv', parseInt(e.target.value, 10))}>
              <option value="0">Root</option><option value="1">1st Inv</option><option value="2">2nd Inv</option><option value="3">3rd Inv</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>VOICING</label>
            <select className={selectClass} id="chord-voice" value={chordData.voice} onChange={(e) => updateChord('voice', e.target.value)}>
              <option value="close">Close</option><option value="wide">Wide</option><option value="open">Open</option>
            </select>
          </div>
        </div>
        <div className="mt-[10px]">
          <label className={`${labelClass} text-[var(--magic)]`}>Non-Conformity (FLUX)</label>
          <input type="range" className={knobClass} id="chord-flux" min="0" max="100" value={chordData.flux} onChange={(e) => updateChord('flux', parseInt(e.target.value, 10))} />
        </div>
      </div>
    </div>
  );
}

export default ChordTabContent;
