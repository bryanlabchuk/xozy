import React, { useState } from 'react';
import { GENRES, INSTRUMENT_TYPES, PAD_MAPPING, getPatternList } from '../data/patternLibrary';

function PatternBrowser({ activeGroup, selectedPad, loadPadPattern, loadKit, onClose }) {
  const [activeTab, setActiveTab] = useState('single'); 
  const [selectedGenre, setSelectedGenre] = useState('House');
  const [selectedInstrument, setSelectedInstrument] = useState(PAD_MAPPING[selectedPad] || 'Kick');
  const [genGenre, setGenGenre] = useState('House');

  const handlePatternClick = (pat) => {
    loadPadPattern(activeGroup, selectedPad, pat.pat);
  };

  const handleGenerateKit = () => {
      const newKitTracks = {};
      for (let i = 0; i < 12; i++) {
          const inst = PAD_MAPPING[i] || 'Perc';
          const pool = getPatternList(genGenre, inst);
          if (pool && pool.length > 0) {
              const randomPat = pool[Math.floor(Math.random() * pool.length)];
              newKitTracks[i] = randomPat.pat;
          }
      }
      loadKit({ name: `Generated ${genGenre}`, tracks: newKitTracks });
  };

  const renderSinglePatterns = () => {
      const patterns = getPatternList(selectedGenre, selectedInstrument);
      
      return (
          <div className="flex flex-col gap-4 h-full">
            {/* Controls Container */}
            <div className="flex flex-col gap-3 shrink-0">
                {/* Genre Row */}
                <div>
                    <div className="text-[0.6rem] font-bold opacity-60 mb-1 uppercase tracking-wider text-[var(--text)]">Genre</div>
                    <div className="flex flex-wrap gap-2">
                        {GENRES.map(g => (
                            <button 
                                key={g} 
                                onClick={() => setSelectedGenre(g)}
                                className={`
                                    px-3 py-1.5 text-[0.7rem] font-bold rounded-sm border transition-all
                                    ${selectedGenre === g 
                                        ? 'bg-[var(--accent)] text-white border-[var(--accent)]' 
                                        : 'bg-transparent text-[var(--text)] border-[var(--text)] opacity-60 hover:opacity-100'}
                                `}
                            >
                                {g.toUpperCase()}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Instrument Row */}
                <div>
                    <div className="text-[0.6rem] font-bold opacity-60 mb-1 uppercase tracking-wider text-[var(--text)]">Instrument</div>
                    <div className="flex flex-wrap gap-2">
                        {INSTRUMENT_TYPES.map(inst => (
                            <button
                                key={inst}
                                onClick={() => setSelectedInstrument(inst)}
                                className={`
                                    px-3 py-1.5 text-[0.7rem] font-bold rounded-sm border transition-all
                                    ${selectedInstrument === inst 
                                        ? 'bg-[var(--text)] text-[var(--bg)] border-[var(--text)]' 
                                        : 'bg-transparent text-[var(--text)] border-[var(--text)] opacity-60 hover:opacity-100'}
                                `}
                            >
                                {inst.toUpperCase()}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* List Container - Takes remaining height */}
            <div className="flex-1 overflow-y-auto min-h-0 border border-[var(--border)] rounded bg-black/5 p-1 mt-2">
                 <div className="grid grid-cols-2 gap-2">
                    {patterns && patterns.length > 0 ? (
                        patterns.map((p, i) => (
                            <button 
                                key={i} 
                                onClick={() => handlePatternClick(p)}
                                className="p-3 bg-[var(--panel-bg)] hover:bg-[var(--accent)] hover:text-white text-[var(--text)] text-left text-xs font-mono border border-[var(--border)] rounded-sm shadow-sm transition-colors"
                            >
                                {p.name}
                            </button>
                        ))
                    ) : (
                        <div className="col-span-2 text-center p-8 opacity-50 text-xs text-[var(--text)]">
                            No patterns found for {selectedGenre} / {selectedInstrument}
                        </div>
                    )}
                 </div>
            </div>
          </div>
      );
  };

  const renderGenerator = () => {
      return (
          <div className="flex flex-col items-center justify-center h-full p-4">
              <h3 className="text-sm font-black mb-6 uppercase tracking-widest text-[var(--text)]">
                  Kit Generator
              </h3>
              
              <div className="grid grid-cols-2 gap-3 mb-8 w-full max-w-[400px]">
                {GENRES.map(g => (
                    <button 
                        key={g} 
                        onClick={() => setGenGenre(g)}
                        className={`
                            p-4 text-xs font-bold rounded border-2 transition-all
                            ${genGenre === g 
                                ? 'bg-[var(--magic)] text-white border-white scale-105 shadow-md' 
                                : 'bg-transparent text-[var(--text)] border-[var(--text)] opacity-70 hover:opacity-100'}
                        `}
                    >
                        {g}
                    </button>
                ))}
              </div>

              <button 
                onClick={handleGenerateKit}
                className="w-full max-w-[400px] py-4 bg-[var(--accent)] text-white font-black text-lg tracking-[4px] rounded shadow-lg hover:brightness-110 active:scale-95 transition-all"
              >
                  GENERATE KIT
              </button>
              
              <p className="text-[0.65rem] mt-6 opacity-60 text-[var(--text)] max-w-[300px] text-center">
                  Generates a full 12-pad kit using random patterns from the selected genre.
              </p>
          </div>
      );
  };

  return (
    <div className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8 animate-fadeIn">
        <div className="w-full max-w-[700px] max-h-[90vh] bg-[var(--bg)] border-2 border-[var(--text)] rounded-lg shadow-[0_0_50px_rgba(0,0,0,0.5)] flex flex-col relative overflow-hidden">
            
            {/* Header */}
            <div className="flex justify-between items-center p-4 border-b-2 border-[var(--text)] shrink-0 bg-[var(--panel-bg)]">
                <div className="flex items-center gap-2">
                    <span className="font-black text-base tracking-[3px] text-[var(--text)] uppercase">Library Browser</span>
                </div>
                <button 
                    onClick={onClose} 
                    className="font-bold text-[0.7rem] px-3 py-1.5 bg-red-600 text-white rounded hover:bg-red-700 shadow-sm tracking-wider"
                >
                    CLOSE
                </button>
            </div>

            {/* Tab Navigation */}
            <div className="flex gap-4 px-5 pt-3 shrink-0 border-b border-[var(--border)] bg-[var(--bg)]">
                <button 
                    onClick={() => setActiveTab('single')}
                    className={`
                        pb-2 font-black text-[0.7rem] tracking-wider transition-all border-b-4 uppercase
                        ${activeTab === 'single' 
                            ? 'border-[var(--accent)] text-[var(--text)] opacity-100' 
                            : 'border-transparent text-[var(--text)] opacity-40 hover:opacity-80'}
                    `} 
                >
                    Browse Patterns
                </button>
                <button 
                    onClick={() => setActiveTab('generator')}
                    className={`
                        pb-2 font-black text-[0.7rem] tracking-wider transition-all border-b-4 uppercase
                        ${activeTab === 'generator' 
                            ? 'border-[var(--magic)] text-[var(--text)] opacity-100' 
                            : 'border-transparent text-[var(--text)] opacity-40 hover:opacity-80'}
                    `} 
                >
                    Kit Generator
                </button>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-y-auto p-5 bg-[var(--bg)]">
                {activeTab === 'single' ? renderSinglePatterns() : renderGenerator()}
            </div>
        </div>
    </div>
  );
}

export default PatternBrowser;