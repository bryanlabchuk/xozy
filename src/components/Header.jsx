import React from 'react';

function Header({ currentTheme, setThemeOverride, toggleDark, toggleLayout }) {
  // Common styles for the select and buttons in the header
  const btnBaseClass = "p-2 bg-[var(--bg)] border border-[var(--text)] text-[var(--text)] font-bold text-[0.7rem] rounded-[2px] cursor-pointer hover:brightness-110 transition-all whitespace-nowrap overflow-hidden text-ellipsis";

  return (
    <div className="flex flex-wrap justify-between items-center mb-5 gap-4">
      <h1 className="m-0 text-[1.2rem] tracking-[4px] font-black uppercase">
        XOZY-EP
      </h1>
      <div className="flex flex-1 max-w-[500px] gap-2">
        <select 
          id="theme-select" 
          className={`${btnBaseClass} flex-1 min-w-0`}
          onChange={(e) => setThemeOverride(e.target.value)} 
          value={currentTheme}
        >
          <option value="auto">THEME: AUTO</option>
          <option value="40">THEME: 40</option>
          <option value="133">THEME: 133</option>
          <option value="1320">THEME: 1320</option>
          <option value="opz">THEME: OP-Z</option>
        </select>
        <button 
          id="dark-btn" 
          onClick={toggleDark} 
          className={`${btnBaseClass} px-4`}
        >
          NIGHT
        </button>
        <button 
          className={`${btnBaseClass} px-3`}
          onClick={toggleLayout} 
          title="Compact Mode"
        >
          ⬌
        </button>
      </div>
    </div>
  );
}

export default Header;