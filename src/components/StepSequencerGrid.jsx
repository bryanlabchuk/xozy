import React from 'react';
import { FIXED_STEPS } from '../engine';

function StepSequencerGrid({ projectData, activeGroup, selectedPad, updatePadStep, current16thNote }) {
  if (!projectData || !projectData[activeGroup] || !projectData[activeGroup][selectedPad]) {
      return <div className="grid grid-cols-8 gap-[2px] w-full mt-[10px] min-h-[200px]">Loading...</div>;
  }

  const currentPad = projectData[activeGroup][selectedPad];
  const steps = currentPad.notes;

  const handleStepClick = (stepIndex) => {
    const currentVal = steps[stepIndex];
    const cycle = ['O', 'X', 'Y', 'Z'];
    const nextVal = cycle[(cycle.indexOf(currentVal) + 1) % cycle.length];
    updatePadStep(activeGroup, selectedPad, stepIndex, nextVal);
  };

  return (
    <div id="grid-notes" className="grid grid-cols-8 gap-[2px] w-full mt-[10px] min-h-[200px]">
      {steps.map((val, i) => {
        const isCurrentStep = (current16thNote % FIXED_STEPS) === i;
        
        let baseClass = "aspect-square border-2 flex items-center justify-center text-xs cursor-pointer font-black rounded-[3px]";
        let stateClass = "border-[var(--text)] opacity-40"; // Default 'O' state

        if (val === 'X') {
            stateClass = "bg-[var(--accent)] text-white border-[var(--accent)] opacity-100";
        } else if (val === 'Y') {
            stateClass = "bg-[#555] text-white border-[#555] opacity-100";
        } else if (val === 'Z') {
            stateClass = "text-[var(--accent)] border-[var(--accent)] border-dashed opacity-100";
        }

        // Current step highlight override
        const highlightStyle = isCurrentStep ? { borderColor: 'var(--accent)', opacity: 1 } : {};

        return (
          <div
            key={i}
            className={`${baseClass} ${stateClass}`}
            style={highlightStyle}
            onMouseDown={() => handleStepClick(i)}
          >
            {val === 'O' ? '' : val}
          </div>
        );
      })}
    </div>
  );
}

export default StepSequencerGrid;