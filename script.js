// Web Audio API para simular o som do arpejo do violão
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

const NOTES = {
    'E2': 82.41,
    'A2': 110.00,
    'D3': 146.83,
    'G3': 196.00,
    'B3': 246.94,
    'E4': 329.63,
    'C3': 130.81,
    'C4': 261.63,
    'E3': 164.81,
    'F3': 174.61,
    'F4': 349.23,
    'G4': 392.00,
    'A3': 220.00
};

const CHORDS = {
    'C':  ['C3', 'E3', 'G3', 'C4', 'E4'],
    'Dm': ['D3', 'A3', 'D4', 'F4'],
    'Em': ['E2', 'B3', 'E3', 'G3', 'B3', 'E4'],
    'F':  ['F3', 'C3', 'F3', 'A3', 'C4', 'F4'],
    'G':  ['G3', 'B3', 'D3', 'G3', 'B3', 'G4'],
    'Am': ['A2', 'E3', 'A3', 'C4', 'E4']
};

function playNote(freq, delay) {
    setTimeout(() => {
        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }

        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

        gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 1.8);

        osc.connect(gain);
        gain.connect(audioCtx.destination);

        osc.start();
        osc.stop(audioCtx.currentTime + 1.8);
    }, delay);
}

function playChord(chordName) {
    const chordNotes = CHORDS[chordName];
    if (!chordNotes) return;

    chordNotes.forEach((note, index) => {
        const freq = NOTES[note] || 220;
        playNote(freq, index * 60);
    });
}
