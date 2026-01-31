import React, { useEffect, useState } from 'react';

function SynthTabContent({ engineRef }) {
    // 37 Keys Logic: C2 (48) to C5 (84)
    // White keys count: 22
    // Black keys count: 15

    const renderKeys = () => {
        const keys = [];
        const startNote = 48; // C2
        const numKeys = 37;
        
        // Arrays to hold JSX for rendering
        const whites = [];
        const blacks = [];

        // Track white key index for positioning black keys
        let whiteKeyIndex = 0;

        for (let i = 0; i < numKeys; i++) {
            const midiNote = startNote + i;
            const noteInOctave = midiNote % 12;
            const isBlack = [1, 3, 6, 8, 10].includes(noteInOctave);
            
            const freq = 440 * Math.pow(2, (midiNote - 69) / 12);
            
            const play = () => engineRef.current?.internalSynth?.play(freq);
            const stop = () => engineRef.current?.internalSynth?.stop(freq);

            if (!isBlack) {
                whites.push(
                    <div
                        key={midiNote}
                        className="flex-1 mx-[1px] bg-[var(--key-white)] border-2 border-[var(--border)] rounded-full cursor-pointer active:bg-[#ddd] h-full"
                        onMouseDown={play}
                        onMouseUp={stop}
                        onMouseLeave={stop}
                    />
                );
                whiteKeyIndex++;
            } else {
                // Calculate position relative to the previous white key
                // Each white key takes up roughly 100% / 22 width
                // Black key is centered between white keys. 
                // Position is roughly (whiteIndex * (100/22)) - (blackWidth/2)
                // We'll use the same logic as the CSS calculation: left: calc((whiteIndex * (100 / 22))% - 1.6%)
                // 3.2% width is roughly appropriate.
                
                const leftPos = `calc(${(whiteKeyIndex * (100 / 22))}% - 1.6%)`;

                blacks.push(
                    <div
                        key={midiNote}
                        className="absolute bg-[#111] border border-white/10 shadow-md rounded-full cursor-pointer z-10 w-[3.2%] h-[90px] top-[5px] pointer-events-auto"
                        style={{ left: leftPos }}
                        onMouseDown={play}
                        onMouseUp={stop}
                        onMouseLeave={stop}
                    />
                );
            }
        }

        return (
            <div className="relative w-[1000px] h-[160px]">
                <div className="absolute inset-0 flex px-[2px]">
                    {whites}
                </div>
                <div className="absolute inset-0 pointer-events-none">
                    <div className="relative w-full h-full">
                        {blacks}
                    </div>
                </div>
            </div>
        );
    };

    // Styles
    const labelClass = "text-[0.55rem] font-extrabold uppercase mb-[6px] block tracking-[1px] opacity-80";
    const knobClass = "appearance-none w-full h-1 bg-[var(--text)] outline-none rounded-sm mt-[5px]";
    const selectClass = "w-full p-2 bg-[var(--bg)] border border-[var(--text)] text-[var(--text)] font-bold text-xs rounded-sm";


  return (
    <div id="tab-synth">
      <div className="bg-black/5 p-[15px] rounded-lg border border-[var(--border)] mb-5">
        <div className="w-full overflow-x-auto pb-[10px] mb-4">
            {renderKeys()}
        </div>
        <div className="grid grid-cols-2 gap-[15px] items-end">
          <div>
            <label className={labelClass}>OSC SHAPE</label>
            <select className={selectClass} id="osc-type" defaultValue="sawtooth">
              <option value="sawtooth">ANALOG SAW</option>
              <option value="square">SQUARE</option>
              <option value="triangle">TRIANGLE</option>
            </select>
          </div>
          <div><label className={labelClass}>CUTOFF</label><input type="range" className={knobClass} id="syn-cutoff" min="50" max="10000" defaultValue="2500" /></div>
          <div><label className={labelClass}>RESONANCE</label><input type="range" className={knobClass} id="syn-res" min="0" max="20" defaultValue="1" /></div>
          <div><label className={labelClass}>DELAY</label><input type="range" className={knobClass} id="syn-delay" min="0" max="0.9" step="0.1" defaultValue="0.3" /></div>
        </div>
      </div>
    </div>
  );
}

export default SynthTabContent;