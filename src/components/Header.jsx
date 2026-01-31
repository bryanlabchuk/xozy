import React from 'react';

function Header({ currentTheme, setThemeOverride, toggleDark, toggleLayout }) {
  // Common styles for the select and buttons in the header
  const btnLayoutClass = "w-full p-2 bg-[var(--bg)] border border-[var(--text)] color-[var(--text)] font-bold text-[0.75rem] rounded-[2px] cursor-pointer hover:opacity-80 transition-opacity";

  return (
    <div className="flex justify-between items-center mb-5">
      <h1 className="m-0 text-[1.2rem] tracking-[4px] font-black uppercase">
        XOZY-EP
      </h1>
      <div className="flex gap-2">
        <select 
          id="theme-select" 
          className={btnLayoutClass} 
          onChange={(e) => setThemeOverride(e.target.value)} 
          value={currentTheme}
        >
          <option value="auto">THEME: AUTO</option>
          <option value="40">THEME: 40</option>
          <option value="133">THEME: 133</option>
          <option value="1320">THEME: 1320</option>
        </select>
        <button 
          id="dark-btn" 
          onClick={toggleDark} 
          className={btnLayoutClass}
        >
          NIGHT
        </button>
        <button 
          className={btnLayoutClass} 
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