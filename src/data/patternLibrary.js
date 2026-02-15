export const GENRES = ['House', 'Techno', 'HipHop', 'Trap', 'DnB'];

export const INSTRUMENT_TYPES = [
    'Kick', 'Snare', 'Clap', 'HiHat', 'OpenHat', 'Perc', 'Ride', 'Tom', 'FX'
];

// Standard mapping for the 12 pads (0-11)
export const PAD_MAPPING = {
    0: 'Kick',
    1: 'Snare',
    2: 'HiHat',
    3: 'OpenHat',
    4: 'Perc',
    5: 'Perc',
    6: 'Clap',
    7: 'Tom',
    8: 'Tom',
    9: 'Ride',
    10: 'FX',
    11: 'FX'
};

const COMMON_PATTERNS = {
    Kick: [
        { name: "Four on Floor", pat: "XOOO XOOO XOOO XOOO" },
        { name: "Syncopated 1", pat: "XOOX OOOO XOOO OOOO" },
        { name: "Syncopated 2", pat: "XOOO OOXO XOOO OOXO" },
        { name: "Double Hit", pat: "XOXO OOOO XOOO OOOO" },
        { name: "Charleston", pat: "XOOZ OOXZ OOOO XOOO" }
    ],
    Snare: [
        { name: "Backbeat", pat: "OOOO XOOO OOOO XOOO" },
        { name: "Half Time", pat: "OOOO OOOO XOOO OOOO" },
        { name: "Ghost Notes", pat: "OOOO XOOO OOYO XOYO" },
        { name: "Roll End", pat: "OOOO XOOO OOOO XXXX" }
    ],
    HiHat: [
        { name: "8th Notes", pat: "XOXO XOXO XOXO XOXO" },
        { name: "16th Notes", pat: "XXXX XXXX XXXX XXXX" },
        { name: "Offbeat", pat: "OOXO OOXO OOXO OOXO" },
        { name: "Gallop", pat: "XOOX XOOX XOOX XOOX" },
        { name: "Open/Close", pat: "XZXZ XZXZ XXXX XZXZ" }
    ]
};

export const LIBRARY = {
    House: {
        Kick: [
            ...COMMON_PATTERNS.Kick,
            { name: "Deep Pulse", pat: "XOOO XOOO XOOX XOOO" }
        ],
        Snare: [
            ...COMMON_PATTERNS.Snare,
            { name: "Clap Stack", pat: "OOOO XOOO OOOO XOXO" }
        ],
        HiHat: [
            { name: "Classic Offbeat", pat: "OOXO OOXO OOXO OOXO" },
            { name: "Shaker Feel", pat: "YXYX YXYX YXYX YXYX" }
        ],
        OpenHat: [{ name: "Standard Open", pat: "OOZO OOZO OOZO OOZO" }],
        Perc: [{ name: "Conga", pat: "OOXOOOXOOOXOOOXO" }],
        Clap: [{ name: "House Clap", pat: "OOOOXOOOOOOOXOOO" }]
    },
    Techno: {
        Kick: [
            { name: "Rumble", pat: "XOOY XOOY XOOY XOOY" },
            { name: "Driving", pat: "XOOO XOOX XOOO XOOX" }
        ],
        HiHat: [
            { name: "Aggressive Off", pat: "OOXZ OOXZ OOXZ OOXZ" },
            { name: "Fast 16s", pat: "XZXZ XZXZ XZXZ XZXZ" }
        ],
        Perc: [{ name: "Industrial", pat: "X...X...X...X..." }]
    },
    HipHop: {
        Kick: [
            { name: "Boom Bap 1", pat: "XOOZ OOXZ OOOO XOOO" },
            { name: "Boom Bap 2", pat: "XOOX OOZX OOZO OOXO" }
        ],
        Snare: [
            { name: "Lazy Snare", pat: "OOOO YOOO ZZZZ YOOZ" },
            { name: "Rimshot", pat: "OOZO YOOZ ZOZO YOOO" }
        ],
        HiHat: [
            { name: "Swing 8s", pat: "X.X. X.X. X.X. X.X." },
            { name: "Loose", pat: "YXZY YXZY YXZY YXZY" }
        ]
    },
    Trap: {
        Kick: [
            { name: "Spaced Out", pat: "XOOOOOOOXOOOOOOO" }
        ],
        Snare: [
            { name: "Trap Snap", pat: "OOOOOOOOXOOOOOOO" }
        ],
        HiHat: [
            { name: "Rolls 1", pat: "XZXZXZXZXXXXXZXZ" },
            { name: "Triplets", pat: "XOXOXOXOXOXOXOXO" } 
        ]
    },
    DnB: {
        Kick: [
            { name: "2-Step Basic", pat: "XOOOOOOOOOXOOOOO" },
            { name: "Techstep", pat: "XOOOOOOOXOOXOOOO" }
        ],
        Snare: [
            { name: "Standard 2/4", pat: "OOOOXOOOOOOOXOOO" },
            { name: "Ghosty", pat: "OOOOXOOYOOYOXOOO" }
        ],
        HiHat: [
            { name: "Fast Shaker", pat: "XZXZXZXZXZXZXZXZ" },
            { name: "Shuffle", pat: "XOOXXOOXXOOXXOOX" }
        ],
        Perc: [{ name: "Amen Break", pat: "OOXOOXOOXOOXOOXO" }]
    }
};

export const getPatternList = (genre, instrument) => {
    // 1. Try specific genre + instrument
    if (LIBRARY[genre] && LIBRARY[genre][instrument]) {
        return LIBRARY[genre][instrument];
    }
    // 2. Try 'House' as fallback genre
    if (LIBRARY.House[instrument]) {
        return LIBRARY.House[instrument];
    }
    // 3. Try Common Patterns
    if (COMMON_PATTERNS[instrument]) {
        return COMMON_PATTERNS[instrument];
    }
    // 4. Generic fallback
    return [{ name: "Basic 4", pat: "XOOO XOOO XOOO XOOO" }];
};