import React from 'react';

function LCD({ logMessages }) {
  return (
    <div className="
      bg-[var(--lcd-bg)] text-[var(--lcd-text)] p-3 rounded text-xs font-normal 
      border-4 border-[#222] w-full h-[60px] 
      shadow-[inset_0_0_20px_#000] drop-shadow-[0_0_3px_var(--lcd-text)]
      overflow-y-auto font-mono flex flex-col-reverse box-border mb-5
    ">
      {logMessages.map((msg, index) => (
        <div className="border-b border-white/10 py-[2px]" key={index}>{msg}</div>
      ))}
    </div>
  );
}

export default LCD;