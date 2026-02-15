# XOZY-EP

A browser-based, hardware-inspired 4-track MIDI sequencer and synthesizer. Works with Teenage Engineering EP-series, **OP-Z**, KO II, and other MIDI devices.

## Quick Start

```bash
npm install
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173), click **INITIALIZE MIDI** (browser will request MIDI access), connect your device via USB, and start sequencing.

## Supported Devices

XOZY auto-detects and prefers Teenage Engineering hardware when multiple MIDI outputs are available:

- **EP-133 KO II** • EP-1 • EP-133
- **OP-Z** • OP-1 • OP-2 • TX-6
- Pocket Operators (when connected via MIDI)

Standard USB MIDI devices work as well—if only one output exists, it will be used automatically.

---

## OP-Z Setup Guide

Use these steps so your friend can run XOZY with their OP-Z.

### 1. Connect the OP-Z

- Connect the OP-Z to your computer via **USB-C** (or USB-C to USB-A cable)
- The OP-Z appears as a class-compliant USB MIDI device (e.g. "OP-Z" or "Synthesizer - OPZ")

### 2. Enable MIDI on the OP-Z

Press and hold **Tempo** + **Screen**, then press:

| Key | Setting | Required |
|-----|---------|----------|
| 2 | Incoming MIDI | ✅ On |
| 4 | MIDI Clock In | ✅ On |
| 1 | Channel 1 to active | ❌ **Off** (so each track gets its own channel) |

For multi-track sequencing, **Channel 1 to active** should be **off**. Otherwise all notes would go to the currently selected track.

### 3. Channel Mapping

XOZY sends on **4 MIDI channels** (1–4):

- **Group 0** → MIDI Channel 1 → OP-Z Track 1  
- **Group 1** → MIDI Channel 2 → OP-Z Track 2  
- **Group 2** → MIDI Channel 3 → OP-Z Track 3  
- **Group 3** → MIDI Channel 4 → OP-Z Track 4  

On the OP-Z, assign Tracks 1–4 to receive on channels 1–4: hold **Tempo** + **Screen**, then hold the track key (1–4) for ~1 second and turn the green dial to set channel 1–4.

### 4. Automation / CC (Optional)

XOZY can send CC automation per step. The OP-Z uses these per-track CCs:

- **CC 3** – Filter Cutoff  
- **CC 4** – Filter Resonance  
- **CC 16** – Volume  

In the **Performance** tab, set **Auto Target CC** to `3` for filter cutoff modulation on the OP-Z.

### 5. Run XOZY

```bash
npm run dev
```

Then in the browser: **INITIALIZE MIDI** → choose the OP-Z when prompted → start sequencing.

---

## Build & Scripts

- `npm run dev` – Start dev server
- `npm run build` – Production build
- `npm run preview` – Preview production build
- `npm run lint` – Run ESLint
