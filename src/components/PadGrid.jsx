import React from 'react';

function PadGrid({ engineRef, activeGroup, selectedPad, setEngineSelectedPad, projectData, updatePadData }) {
  const legends = { 9: '7', 10: '8', 11: '9', 6: '4', 7: '5', 8: '6', 3: '1', 4: '2', 5: '3', 0: '■', 1: '0', 2: 'ENT' };
  const mapIdx = [9, 10, 11, 6, 7, 8, 3, 4, 5, 0, 1, 2];

  const selectPad = (idx) => {
    setEngineSelectedPad(idx);
  };

  const triggerLivePad = (padIdx) => {
    if (!engineRef.current) return;
    const pad = projectData[activeGroup][padIdx];
    const chan = activeGroup;

    // Visual flash is better handled by a transient state or CSS animation trigger,
    // but for now we'll stick to the class logic if we can access the DOM or skip it.
    // The previous implementation used document.getElementById, which is brittle in React but works for a quick port.
    const btn = document.getElementById(`pad-${padIdx}`);
    if (btn) {
      btn.classList.add('brightness-150'); // Tailwind for filter: brightness(1.5)
      setTimeout(() => btn.classList.remove('brightness-150'), 100);
    }

    if (engineRef.current.midiOut) {
      if (pad.mode === 'chord') {
        engineRef.current.triggerChord(pad, chan, 110, 0x90 + chan, 0x80 + chan, performance.now());
      } else {
        engineRef.current.midiOut.send([0x90 + chan, pad.midiNote, 110], performance.now());
        engineRef.current.midiOut.send([0x80 + chan, pad.midiNote, 0], performance.now() + pad.gateMs);
      }
    }
    
    // Internal Audio Preview for Pads is DISABLED per user requirement.
    // Pads only send MIDI data to the external device.
  };

  return (
    <>
      {mapIdx.map(idx => (
        <div
          key={idx}
          className={`
            bg-black/5 border-2 border-[var(--border)] aspect-[4/3] rounded-md cursor-pointer relative
            shadow-sm active:shadow-inner hover:bg-black/10 transition-all duration-75
            ${idx === selectedPad ? '!border-[var(--accent)] !bg-[var(--accent)] text-white shadow-[0_0_10px_var(--accent)]' : ''}
          `}
          id={`pad-${idx}`}
          onClick={() => selectPad(idx)}
          onMouseDown={(e) => { if (e.button === 0) triggerLivePad(idx); }}
        >
          <div className="absolute top-1 right-[6px] font-black text-[0.65rem] opacity-50">
            {legends[idx]}
          </div>
        </div>
      ))}
    </>
  );
}

export default PadGrid;