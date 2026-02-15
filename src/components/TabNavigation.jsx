import React from 'react';

function TabNavigation({ activeTab, setActiveTab }) {
  const btnClass = (tabName) => `
    bg-transparent border-none text-[var(--text)] font-black cursor-pointer 
    py-2 px-4 text-xs uppercase transition-opacity duration-200
    ${activeTab === tabName 
      ? 'opacity-100 text-[var(--accent)] border-b-[3px] border-[var(--accent)]' 
      : 'opacity-75 hover:opacity-95'}
  `;

  return (
    <div className="flex gap-[5px] mb-[15px] border-b-2 border-[var(--border)]">
      <button
        className={btnClass('drum')}
        onClick={() => setActiveTab('drum')}
      >
        DRUM / SEQ
      </button>
      <button
        className={btnClass('chord')}
        onClick={() => setActiveTab('chord')}
      >
        CHORD MODE
      </button>
      <button
        className={btnClass('synth')}
        onClick={() => setActiveTab('synth')}
      >
        POLY SYNTH
      </button>
    </div>
  );
}

export default TabNavigation;