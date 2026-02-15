export const GENRES = ['House', 'Techno', 'HipHop', 'Trap', 'DnB', 'Disco', 'Garage', 'Afrobeat'];

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
        { name: "Charleston", pat: "XOOZ OOXZ OOOO XOOO" },
        { name: "Minimal", pat: "XOOO OOOO XOOO OOOO" },
        { name: "Driving 2", pat: "XOOO XOOX XOOO XOOX" }
    ],
    Snare: [
        { name: "Backbeat", pat: "OOOO XOOO OOOO XOOO" },
        { name: "Half Time", pat: "OOOO OOOO XOOO OOOO" },
        { name: "Ghost Notes", pat: "OOOO XOOO OOYO XOYO" },
        { name: "Roll End", pat: "OOOO XOOO OOOO XXXX" },
        { name: "Four on Floor", pat: "OOOO XOOO OOOO XOOO" },
        { name: "Flams", pat: "OOOO XOOO OOYX XOOO" }
    ],
    Clap: [
        { name: "Backbeat", pat: "OOOO XOOO OOOO XOOO" },
        { name: "Double Clap", pat: "OOOO XXOO OOOO XXOO" },
        { name: "Half Time", pat: "OOOO OOOO XOOO OOOO" },
        { name: "Syncopated", pat: "OOOX OOOO XOOO OOOO" }
    ],
    HiHat: [
        { name: "8th Notes", pat: "XOXO XOXO XOXO XOXO" },
        { name: "16th Notes", pat: "XXXX XXXX XXXX XXXX" },
        { name: "Offbeat", pat: "OOXO OOXO OOXO OOXO" },
        { name: "Gallop", pat: "XOOX XOOX XOOX XOOX" },
        { name: "Open/Close", pat: "XZXZ XZXZ XXXX XZXZ" },
        { name: "Sparse 8s", pat: "XOOO XOOO XOOO XOOO" }
    ],
    OpenHat: [
        { name: "Standard Open", pat: "OOZO OOZO OOZO OOZO" },
        { name: "Quarter Open", pat: "OXOO OXOO OXOO OXOO" },
        { name: "Sparse", pat: "OOOZ OOOO OOOZ OOOO" }
    ],
    Perc: [
        { name: "Conga", pat: "OOXO OOXO OOXO OOXO" },
        { name: "Shaker 8s", pat: "XYXY XYXY XYXY XYXY" },
        { name: "Bongo", pat: "OXOX OXOO OXOX OXOO" }
    ],
    Ride: [
        { name: "Jazz Ride", pat: "XYXY XYXY XYXY XYXY" },
        { name: "Bell Accent", pat: "XOOX XOOX XOOX XOOX" },
        { name: "Sparse", pat: "XOOO XOOO XOOO XOOO" }
    ],
    Tom: [
        { name: "Fill 1", pat: "OOOX OOOO OOOO OOOO" },
        { name: "Fill 2", pat: "OOOX OOXO OOXO OOOO" },
        { name: "Roll", pat: "OOOO OOOO XXXO OOOO" }
    ],
    FX: [
        { name: "Sparse", pat: "XOOO OOOO OOOO OOOO" },
        { name: "Stab", pat: "OOOO XOOO OOOO OOOO" }
    ]
};

export const LIBRARY = {
    House: {
        Kick: [
            ...COMMON_PATTERNS.Kick,
            { name: "Deep Pulse", pat: "XOOO XOOO XOOX XOOO" },
            { name: "Stutter", pat: "XXOO XOOO XOOO XOOO" },
            { name: "Jacking", pat: "XOOX OOXO XOOX OOXO" }
        ],
        Snare: [
            ...COMMON_PATTERNS.Snare,
            { name: "Clap Stack", pat: "OOOO XOOO OOOO XOXO" },
            { name: "Claps 2&4", pat: "OOOO XOOO OOOO XOOO" }
        ],
        Clap: [
            ...COMMON_PATTERNS.Clap,
            { name: "House Clap", pat: "OOOO XOOO OOOO XOOO" }
        ],
        HiHat: [
            ...COMMON_PATTERNS.HiHat,
            { name: "Classic Offbeat", pat: "OOXO OOXO OOXO OOXO" },
            { name: "Shaker Feel", pat: "YXYX YXYX YXYX YXYX" },
            { name: "Jacking Hats", pat: "OXOX OXOX OXOX OXOX" }
        ],
        OpenHat: [...COMMON_PATTERNS.OpenHat],
        Perc: [
            { name: "Conga", pat: "OOXO OOXO OOXO OOXO" },
            { name: "Cowbell", pat: "OOXZ OOZO OOXZ OOZO" }
        ],
        Ride: [...COMMON_PATTERNS.Ride],
        Tom: [...COMMON_PATTERNS.Tom],
        FX: [...COMMON_PATTERNS.FX]
    },
    Techno: {
        Kick: [
            ...COMMON_PATTERNS.Kick,
            { name: "Rumble", pat: "XOOY XOOY XOOY XOOY" },
            { name: "Driving", pat: "XOOO XOOX XOOO XOOX" },
            { name: "Industrial", pat: "XOOX XOOX XOOX XOOX" }
        ],
        Snare: [
            ...COMMON_PATTERNS.Snare,
            { name: "Reverb Snare", pat: "OOOO XOOO OOOZ OOOO" },
            { name: "Clap Layer", pat: "OOOO XXOO OOOO XXOO" }
        ],
        Clap: [...COMMON_PATTERNS.Clap],
        HiHat: [
            ...COMMON_PATTERNS.HiHat,
            { name: "Aggressive Off", pat: "OOXZ OOXZ OOXZ OOXZ" },
            { name: "Fast 16s", pat: "XZXZ XZXZ XZXZ XZXZ" },
            { name: "Closed Ride", pat: "XXXX XXXZ XXXX XXXZ" }
        ],
        OpenHat: [
            ...COMMON_PATTERNS.OpenHat,
            { name: "Techno Open", pat: "OOXZ OOZO OOXZ OOZO" }
        ],
        Perc: [
            { name: "Industrial", pat: "XOOX XOOX XOOX XOOX" },
            { name: "Rim", pat: "OOXZ OOZX OOXZ OOZX" }
        ],
        Ride: [...COMMON_PATTERNS.Ride],
        Tom: [...COMMON_PATTERNS.Tom],
        FX: [...COMMON_PATTERNS.FX]
    },
    HipHop: {
        Kick: [
            ...COMMON_PATTERNS.Kick,
            { name: "Boom Bap 1", pat: "XOOZ OOXZ OOOO XOOO" },
            { name: "Boom Bap 2", pat: "XOOX OOZX OOZO OOXO" },
            { name: "Syncopated", pat: "XOOO OOXO XOOO OOXO" }
        ],
        Snare: [
            ...COMMON_PATTERNS.Snare,
            { name: "Lazy Snare", pat: "OOOO YOOO ZZZZ YOOZ" },
            { name: "Rimshot", pat: "OOZO YOOZ ZOZO YOOO" },
            { name: "Brush", pat: "OOYZ OOZY OOOO XOOO" }
        ],
        Clap: [...COMMON_PATTERNS.Clap],
        HiHat: [
            ...COMMON_PATTERNS.HiHat,
            { name: "Swing 8s", pat: "XYXY XYXY XYXY XYXY" },
            { name: "Loose", pat: "YXZY YXZY YXZY YXZY" },
            { name: "Triplet Feel", pat: "XOXO XOOX OXOO XOXO" }
        ],
        OpenHat: [...COMMON_PATTERNS.OpenHat],
        Perc: [
            ...COMMON_PATTERNS.Perc,
            { name: "Tambourine", pat: "XYXY XYXY XYXY XYXY" }
        ],
        Ride: [...COMMON_PATTERNS.Ride],
        Tom: [...COMMON_PATTERNS.Tom],
        FX: [...COMMON_PATTERNS.FX]
    },
    Trap: {
        Kick: [
            ...COMMON_PATTERNS.Kick,
            { name: "Spaced Out", pat: "XOOOOOOOXOOOOOOO" },
            { name: "Double Time", pat: "XOOOXOOOXOOOXOOO" },
            { name: "Roll Intro", pat: "OOOOOOOOXXXOOOOO" }
        ],
        Snare: [
            ...COMMON_PATTERNS.Snare,
            { name: "Trap Snap", pat: "OOOOOOOOXOOOOOOO" },
            { name: "Half Snap", pat: "OOOOOOOOOOOOXOOO" },
            { name: "Double Snap", pat: "OOOOOOOOXOOOXOOO" }
        ],
        Clap: [...COMMON_PATTERNS.Clap],
        HiHat: [
            ...COMMON_PATTERNS.HiHat,
            { name: "Rolls 1", pat: "XZXZXZXZXXXXXZXZ" },
            { name: "Triplets", pat: "XOXOXOXOXOXOXOXO" },
            { name: "Fast Hats", pat: "XXXXXXXZXXXXXXXX" }
        ],
        OpenHat: [...COMMON_PATTERNS.OpenHat],
        Perc: [...COMMON_PATTERNS.Perc],
        Ride: [...COMMON_PATTERNS.Ride],
        Tom: [...COMMON_PATTERNS.Tom],
        FX: [...COMMON_PATTERNS.FX]
    },
    DnB: {
        Kick: [
            ...COMMON_PATTERNS.Kick,
            { name: "2-Step Basic", pat: "XOOOOOOOOOXOOOOO" },
            { name: "Techstep", pat: "XOOOOOOOXOOXOOOO" },
            { name: "Rolling", pat: "XOOOXOOOXOOOXOOO" }
        ],
        Snare: [
            ...COMMON_PATTERNS.Snare,
            { name: "Standard 2/4", pat: "OOOOXOOOOOOOXOOO" },
            { name: "Ghosty", pat: "OOOOXOOYOOYOXOOO" },
            { name: "Break Snare", pat: "OOXOOOXOOOXOOOXO" }
        ],
        Clap: [...COMMON_PATTERNS.Clap],
        HiHat: [
            ...COMMON_PATTERNS.HiHat,
            { name: "Fast Shaker", pat: "XZXZXZXZXZXZXZXZ" },
            { name: "Shuffle", pat: "XOOXXOOXXOOXXOOX" },
            { name: "Break Hats", pat: "XOXOXOXOXOXOXOXO" }
        ],
        OpenHat: [...COMMON_PATTERNS.OpenHat],
        Perc: [
            ...COMMON_PATTERNS.Perc,
            { name: "Amen Break", pat: "OOXOOXOOXOOXOOXO" },
            { name: "Break Perc", pat: "OOXOOOXOOOXOOOXO" }
        ],
        Ride: [...COMMON_PATTERNS.Ride],
        Tom: [...COMMON_PATTERNS.Tom],
        FX: [...COMMON_PATTERNS.FX]
    },
    Disco: {
        Kick: [
            ...COMMON_PATTERNS.Kick,
            { name: "Four on Floor", pat: "XOOO XOOO XOOO XOOO" },
            { name: "Disco Pocket", pat: "XOOZ OOXZ XOOO OOXO" }
        ],
        Snare: [
            ...COMMON_PATTERNS.Snare,
            { name: "Disco Clap", pat: "OOOO XOOO OOOO XOOO" }
        ],
        Clap: [...COMMON_PATTERNS.Clap],
        HiHat: [
            ...COMMON_PATTERNS.HiHat,
            { name: "Disco Hats", pat: "XXXX XXZX XXXX XXZX" },
            { name: "Open Accents", pat: "XZXZ XZXZ XZXZ XZXZ" }
        ],
        OpenHat: [...COMMON_PATTERNS.OpenHat],
        Perc: [
            ...COMMON_PATTERNS.Perc,
            { name: "Conga Disco", pat: "OOXO OOXO OOXO OOXO" },
            { name: "Cowbell", pat: "OOXZ OOZO OOXZ OOZO" }
        ],
        Ride: [...COMMON_PATTERNS.Ride],
        Tom: [...COMMON_PATTERNS.Tom],
        FX: [...COMMON_PATTERNS.FX]
    },
    Garage: {
        Kick: [
            ...COMMON_PATTERNS.Kick,
            { name: "2-Step Kick", pat: "XOOO OOOO XOOO OOOO" },
            { name: "Garage Kick", pat: "XOOZ OOXO XOOO OOXO" }
        ],
        Snare: [
            ...COMMON_PATTERNS.Snare,
            { name: "Garage Snare", pat: "OOOO XOOO OOOO XOOO" },
            { name: "Skippy", pat: "OOOO XOOY OOOO XOOY" }
        ],
        Clap: [...COMMON_PATTERNS.Clap],
        HiHat: [
            ...COMMON_PATTERNS.HiHat,
            { name: "Skippy Hats", pat: "XOXO XOXZ XOXO XOXZ" },
            { name: "Shuffle", pat: "XYXY XYXY XYXY XYXY" }
        ],
        OpenHat: [...COMMON_PATTERNS.OpenHat],
        Perc: [...COMMON_PATTERNS.Perc],
        Ride: [...COMMON_PATTERNS.Ride],
        Tom: [...COMMON_PATTERNS.Tom],
        FX: [...COMMON_PATTERNS.FX]
    },
    Afrobeat: {
        Kick: [
            ...COMMON_PATTERNS.Kick,
            { name: "Afro 4", pat: "XOOO XOOO XOOO XOOO" },
            { name: "Syncopated", pat: "XOOO OOXO XOOO OOXO" }
        ],
        Snare: [
            ...COMMON_PATTERNS.Snare,
            { name: "Cross Stick", pat: "OOOO XOOO OOOO XOOO" }
        ],
        Clap: [...COMMON_PATTERNS.Clap],
        HiHat: [
            ...COMMON_PATTERNS.HiHat,
            { name: "Shaker", pat: "XYXY XYXY XYXY XYXY" },
            { name: "Bell Pattern", pat: "XOOX OXOX XOOX OXOX" }
        ],
        OpenHat: [...COMMON_PATTERNS.OpenHat],
        Perc: [
            ...COMMON_PATTERNS.Perc,
            { name: "Bell 12/8", pat: "XOXOXO XOXOXO" },
            { name: "Conga Afro", pat: "OOXOOOXOOOXOOOXO" }
        ],
        Ride: [...COMMON_PATTERNS.Ride],
        Tom: [...COMMON_PATTERNS.Tom],
        FX: [...COMMON_PATTERNS.FX]
    }
};

// Full preset kits - one-click load for all 12 pads (pad indices 0-11)
export const FULL_KITS = [
    {
        name: "Basic House",
        genre: "House",
        tracks: {
            0: "XOOOXOOOXOOOXOOO",
            1: "OOOOXOOOOOOOXOOO",
            2: "OOXOOOXOOOXOOOXO",
            3: "OOZOOOZOOOZOOOZO"
        }
    },
    {
        name: "Deep House",
        genre: "House",
        tracks: {
            0: "XOOOXOOXXOOOXOOX",
            1: "OOOOXOOOOOOOXOOO",
            2: "OOXOOOXOOOXOOOXO",
            3: "OOZOOOZOOOZOOOZO"
        }
    },
    {
        name: "Jacking House",
        genre: "House",
        tracks: {
            0: "XOOXOOXOXOOXOOXO",
            1: "OOOOXOOOOOOOXOOO",
            2: "OXOXOXOXOXOXOXOX",
            3: "OOZOOOZOOOZOOOZO"
        }
    },
    {
        name: "Boom Bap",
        genre: "HipHop",
        tracks: {
            0: "XOOZOOXZOOOOXOOO",
            1: "OOOOYOOOZZZZYOOZ",
            2: "XOXOXOXOXOXOXOXO",
            3: "OOZOOOZOOOZOOOZO"
        }
    },
    {
        name: "Boom Bap 2",
        genre: "HipHop",
        tracks: {
            0: "XOOXOOZXOOZOOOXO",
            1: "OOOOXOOOZOOOXOOZ",
            2: "XZXZXZXZXZXZXZXZ",
            3: "OOZOOOZOOOZOOOZO"
        }
    },
    {
        name: "Trap Banger",
        genre: "Trap",
        tracks: {
            0: "XOOOOOOOXOOOOOOO",
            1: "OOOOOOOOXOOOOOOO",
            2: "XZXZXZXZXXXXXZXZ",
            3: "OOZOOOZOOOZOOOZO"
        }
    },
    {
        name: "Techno Driving",
        genre: "Techno",
        tracks: {
            0: "XOOOXOOXXOOOXOOX",
            1: "OOOOXOOOOOOOXOOO",
            2: "XZXZXZXZXZXZXZXZ",
            3: "OOXZOOXZOOXZOOXZ"
        }
    },
    {
        name: "Techno Industrial",
        genre: "Techno",
        tracks: {
            0: "XOOYXOOYXOOYXOOY",
            1: "OOOOXOOOOOOOXOOO",
            2: "OOXZOOXZOOXZOOXZ",
            4: "XOOXXOOXXOOXXOOX"
        }
    },
    {
        name: "DnB 2-Step",
        genre: "DnB",
        tracks: {
            0: "XOOOOOOOOOXOOOOO",
            1: "OOOOXOOOOOOOXOOO",
            2: "XZXZXZXZXZXZXZXZ",
            3: "OOZOOOZOOOZOOOZO"
        }
    },
    {
        name: "DnB Break",
        genre: "DnB",
        tracks: {
            0: "XOOOOOOOXOOXOOOO",
            1: "OOOOXOOYOOYOXOOO",
            2: "XOOXXOOXXOOXXOOX",
            4: "OOXOOXOOXOOXOOXO"
        }
    },
    {
        name: "Rock Beat",
        genre: "House",
        tracks: {
            0: "XOOOXXOOXOOOXXOO",
            1: "OOOOXOOOOOOOXOOO",
            2: "XXXXXOXOXXXXXOXO",
            3: "OOZOOOZOOOZOOOZO"
        }
    },
    {
        name: "Punk Drive",
        genre: "House",
        tracks: {
            0: "XOOOXOOOXOOOXOOO",
            1: "OOOOXOOOOOOOXOOO",
            2: "XXXXXXXXXXXXXXXX",
            3: "OOZOOOZOOOZOOOZO"
        }
    },
    {
        name: "Dem Bow",
        genre: "Trap",
        tracks: {
            0: "XOOOXOOOXOOOXOOO",
            1: "OOXZOOXZOOXZOOXZ",
            2: "XXXXXXXXXXXXXXXX",
            3: "OOZOOOZOOOZOOOZO"
        }
    },
    {
        name: "Disco 4/4",
        genre: "Disco",
        tracks: {
            0: "XOOOXOOOXOOOXOOO",
            1: "OOOOXOOOOOOOXOOO",
            2: "XXXXXXZXXXXXXXZX",
            3: "OOZOOOZOOOZOOOZO"
        }
    },
    {
        name: "UK Garage",
        genre: "Garage",
        tracks: {
            0: "XOOOOOOOXOOOOOOO",
            1: "OOOOXOOOOOOOXOOO",
            2: "XOXOXOXZXOXOXOXZ",
            3: "OOZOOOZOOOZOOOZO"
        }
    },
    {
        name: "Afrobeat",
        genre: "Afrobeat",
        tracks: {
            0: "XOOOXOOOXOOOXOOO",
            1: "OOOOXOOOOOOOXOOO",
            2: "XYXYXYXYXYXYXYXY",
            4: "OOXOOOXOOOXOOOXO"
        }
    },
    {
        name: "Minimal",
        genre: "Techno",
        tracks: {
            0: "XOOOOOOOXOOOOOOO",
            1: "OOOOOOOOXOOOOOOO",
            2: "OXOXOXOXOXOXOXOX",
            3: "OOZOOOZOOOZOOOZO"
        }
    }
];

export const getPatternList = (genre, instrument) => {
    // 1. Try specific genre + instrument
    if (LIBRARY[genre] && LIBRARY[genre][instrument]) {
        return LIBRARY[genre][instrument];
    }
    // 2. Try 'House' as fallback genre
    if (LIBRARY.House && LIBRARY.House[instrument]) {
        return LIBRARY.House[instrument];
    }
    // 3. Try Common Patterns
    if (COMMON_PATTERNS[instrument]) {
        return COMMON_PATTERNS[instrument];
    }
    // 4. Generic fallback
    return [{ name: "Basic 4", pat: "XOOO XOOO XOOO XOOO" }];
};
