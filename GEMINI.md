# XOZY-EP Project Context

## Project Overview
**XOZY-EP** is a browser-based, hardware-inspired 4-track MIDI/Audio sequencer and synthesizer. It emulates the workflow and aesthetic of retro samplers and grooveboxes (reminiscent of the Teenage Engineering EP-series).

### Key Technologies
*   **Framework:** React 19 (Vite)
*   **Audio Engine:** Tone.js (Synthesis, Effects, Timing)
*   **Styling:** Tailwind CSS (v4) + CSS Variables for extensive theming
*   **MIDI:** Web MIDI API for external device integration

## Architecture

### Core Logic (`src/engine.js`)
The application logic is driven by the `SequencerEngine` class, which operates independently of the React render cycle to ensure precise audio timing.
*   **Audio:** Features a `PolySynth` built on `Tone.MonoSynth` voices with a custom effects chain (Vibrato -> Chorus/Delay).
*   **Sequencer:** 
    *   4 Groups (Tracks) x 12 Pads.
    *   64 Steps per pattern (`FIXED_STEPS`).
    *   Supports Note/Chord triggering, Swing, Humanization, and Velocity Randomization.
*   **MIDI:** Handles both Input (controlling internal synth) and Output (sequencing external gear).

### State Management (`src/hooks/useSequencer.js`)
*   The `useSequencer` custom hook acts as the bridge between the imperative `SequencerEngine` and the declarative React UI.
*   It synchronizes `projectData`, `bpm`, `activeGroup`, etc., ensuring the UI reflects the engine's state without causing unnecessary re-renders during high-frequency clock ticks.

### UI Structure (`src/components/`)
*   **Chassis:** Main container with `App.css` styling for 3D depth and theming.
*   **DeckLeft:** Primary performance area. Contains `PadGrid`, `PadPerformanceControls`, and Tab navigation (Drum/Chord/Synth modes).
*   **DeckRight:** Editing area. Contains `EditorPanel` (Step Sequencer Grid) and Transport controls.
*   **LCD:** Displays real-time logs from the engine.

## Development Conventions

### Styling & Theming
*   **Tailwind CSS:** Used for layout and utility classes.
*   **CSS Variables:** Heavily used in `src/index.css` to support multiple themes (`theme-40`, `theme-133`, `theme-1320`, `dark-mode`).
*   **3D Aesthetics:** The UI relies on `box-shadow`, gradients, and borders to create a tactile, hardware-like feel.

### Build & Run
*   `npm run dev`: Start the local development server.
*   `npm run build`: Compile the application for production.
*   `npm run lint`: Run ESLint to check for code quality issues.

### Audio/MIDI Constraints
*   **Audio Context:** Must be resumed via user interaction (handled by `initMidi` or `handleInject`).
*   **Impure Functions:** `performance.now()` is used for precise scheduling; be mindful of React's purity rules when using it in render logic (prefer `useEffect` or event handlers).

## Tone.js Implementation Reference

The project utilizes `Tone.js` v15 for its audio engine.

### Audio Graph
*   **Voices:** `Tone.PolySynth` using `Tone.MonoSynth` voices.
    *   **Oscillator:** Sawtooth (default), configurable via UI.
    *   **Envelope:** A/D/S/R (Attack, Decay, Sustain, Release).
    *   **Filter:** Lowpass, controlled via Envelope and UI Cutoff/Resonance.
*   **Effects Chain:**
    *   `PolySynth` -> `Tone.Vibrato` -> `Tone.Chorus` -> Destination
    *   `PolySynth` -> `Tone.Vibrato` -> `Tone.FeedbackDelay` -> Destination (Parallel Path)
*   **Master Output:** `Tone.Destination` (Hardware Output).

### Scheduling & Timing
*   **Transport:** The project *does not* use the main `Tone.Transport` for sequencing notes.
*   **Custom Scheduler:** It implements a "lookahead scheduler" pattern (inspired by [A Tale of Two Clocks](https://web.dev/audio-scheduling/)).
    *   `requestAnimationFrame` loop checks `audioCtx.currentTime`.
    *   Notes are scheduled in the future using `Tone.now()` (wrapper for `audioContext.currentTime`).
    *   This hybrid approach allows for React state updates without audio glitches.

### Common Patterns
*   **Starting Audio:** `Tone.start()` must be called on a user gesture (handled in `initMidi`).
*   **Triggering Notes:** `synth.triggerAttackRelease(freq, duration, time)` or manual `triggerAttack`/`triggerRelease` for gate control.
*   **Parameter Ramps:** `param.rampTo(value, rampTime)` is used for smooth transitions of effect parameters (e.g., Delay Time, Chorus Depth).