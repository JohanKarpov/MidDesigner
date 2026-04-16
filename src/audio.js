// src/audio.js — Audio manager: SFX, voice loops, music with crossfade
//
// Export API:
//   initAudio()
//   sfx(name, options?)
//   startVoice(speakerKey) / stopVoice()
//   startHomeMusic()       / startSpaceMusic()
//   setMusicEnabled(bool)  / setSfxEnabled(bool)
//   playMainButtonLockedSfx()
//   playMainButtonHeatStarsSfx(volumeScale)
//   setMainButtonHeatSfxLevel(level)
//   getMusicEnabled()      / getSfxEnabled()

// ─────────────────────────────────────────────────────────────
// Asset paths
// ─────────────────────────────────────────────────────────────

const SFX_SRCS = {
    click:        'sounds/sfx/Simple Modern Click.wav',
    back:         'sounds/sfx/Simple Modern Pop.wav',
    shop:         'sounds/sfx/Short Shop Beep.wav',
    alert:        'sounds/sfx/Pluck Notification 02.wav',
    generate:     'sounds/sfx/MainButton_v1.mp3',
    generateLocked: 'sounds/sfx/MainButton_v1_Locked.mp3',
    generateHeatStars: 'sounds/sfx/MainButton_v1_HEAT_Stars.mp3',
    smokingLong:  'sounds/sfx/Smoking_Long.mp3',
    smokingShort: 'sounds/sfx/Smoking_Short.mp3',
    pop:          'sounds/sfx/Bubble Pop High Pitch.wav',
};

const MAIN_BUTTON_HEAT_LOOP_SRC = 'sounds/sfx/MainButton_v1_HEAT.mp3';

const VOICE_SRCS = {
    chatdjbt: 'sounds/sfx/speech/ChatDJBT.mp3',
    gg:       'sounds/sfx/speech/mc-1.mp3',
    thought:  'sounds/sfx/speech/thoughts.mp3',
};

const MUSIC_HOME_AMBIENT = 'sounds/music/home/wind and birds in the background .mp3';
const MUSIC_HOME_TRACKS  = [
    'sounds/music/home/Onyx Music - Water Reflections.mp3',
    'sounds/music/home/Adi Goldstein - Secret Haven.mp3',
];
const MUSIC_SPACE = 'sounds/music/space/Space Ambient Atmosphere Relaxed.mp3';

const LS_MUSIC_KEY  = 'audio_music_enabled';
const LS_SFX_KEY    = 'audio_sfx_enabled';
const LS_MUSIC_VOL  = 'audio_music_volume';
const LS_SFX_VOL    = 'audio_sfx_volume';
const MUSIC_FADE_MS = 2000;
const FADE_STEP_MS  = 50;

// ─────────────────────────────────────────────────────────────
// Internal state
// ─────────────────────────────────────────────────────────────

let _musicEnabled = true;
let _sfxEnabled   = true;
let _musicVolume  = 1.0;   // 0–1 master scale for music
let _sfxVolume    = 1.0;   // 0–1 master scale for sfx/voice

// Track nominal (target) volumes so we can rescale after volume change
const _AMBIENT_NOM  = 0.45;
const _TRACK_NOM    = 0.25;
const _SPACE_NOM    = 0.25;
const _VOICE_NOM    = 0.55;
const _SFX_NOM      = 1.0;

// SFX pool: name → [Audio, ...]
const _sfxPool = {};

// Voice: current looping Audio element
let _voiceEl = null;
let _mainButtonHeatLoopEl = null;
let _mainButtonHeatLevel  = 0;

// Music
let _scene       = null;          // 'home' | 'space' | null
let _ambientEl   = null;
let _trackEls    = [null, null];  // A / B pair for crossfade
let _trackActive = 0;
let _spaceEl     = null;

let _playlistOrder = [];
let _playlistIdx   = -1;

// ─────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────

function _makeAudio(src, loop = false) {
    const a  = new Audio(src);
    a.loop    = loop;
    a.preload = 'auto';
    return a;
}

function _clamp01(v) {
    return Math.max(0, Math.min(1, Number(v) || 0));
}

function _shufflePlaylist() {
    const arr = MUSIC_HOME_TRACKS.map((_, i) => i);
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

/** Animate audio volume to `targetVol` over `durationMs`.  Returns interval id. */
function _fadeTo(audio, targetVol, durationMs, onDone) {
    if (!audio) { onDone?.(); return null; }
    const steps = Math.max(1, Math.round(durationMs / FADE_STEP_MS));
    const start = audio.volume;
    const delta = (targetVol - start) / steps;
    let step = 0;
    const id = setInterval(() => {
        step++;
        audio.volume = Math.max(0, Math.min(1, start + delta * step));
        if (step >= steps) {
            clearInterval(id);
            audio.volume = targetVol;
            onDone?.();
        }
    }, FADE_STEP_MS);
    return id;
}

function _stopAudio(audio) {
    if (!audio) return;
    audio.pause();
    audio.currentTime = 0;
}

// ─────────────────────────────────────────────────────────────
// SFX pool
// ─────────────────────────────────────────────────────────────

function _initSfxPool() {
    for (const [name, src] of Object.entries(SFX_SRCS)) {
        const poolSize = (name === 'click' || name === 'back' || name === 'pop') ? 3 : 2;
        _sfxPool[name] = Array.from({ length: poolSize }, () => _makeAudio(src));
    }
}

export function sfx(name) {
    let options = {};
    if (typeof arguments[1] === 'number') options.volumeScale = arguments[1];
    else if (arguments[1] && typeof arguments[1] === 'object') options = arguments[1];
    if (!_sfxEnabled) return;
    const pool = _sfxPool[name];
    if (!pool) return;
    const idle = pool.find(a => a.paused) ?? pool[0];
    idle.volume = _SFX_NOM * _sfxVolume * _clamp01(options.volumeScale ?? 1);
    idle.currentTime = 0;
    idle.play().catch(() => {});
}

function _getMainButtonHeatLoopVolumeScale() {
    if (_mainButtonHeatLevel <= 0.1) return 0;
    return (_mainButtonHeatLevel - 0.1) / 0.9;
}

function _stopMainButtonHeatLoop() {
    if (!_mainButtonHeatLoopEl) return;
    _mainButtonHeatLoopEl.pause();
    _mainButtonHeatLoopEl.currentTime = 0;
}

function _syncMainButtonHeatLoop() {
    const volumeScale = _getMainButtonHeatLoopVolumeScale();
    if (!_sfxEnabled || volumeScale <= 0) {
        _stopMainButtonHeatLoop();
        return;
    }
    if (!_mainButtonHeatLoopEl) {
        _mainButtonHeatLoopEl = _makeAudio(MAIN_BUTTON_HEAT_LOOP_SRC, true);
    }
    _mainButtonHeatLoopEl.volume = _SFX_NOM * _sfxVolume * _clamp01(volumeScale);
    if (_mainButtonHeatLoopEl.paused) {
        _mainButtonHeatLoopEl.play().catch(() => {});
    }
}

export function playMainButtonLockedSfx() {
    sfx('generateLocked');
}

export function playMainButtonHeatStarsSfx(volumeScale = 1) {
    sfx('generateHeatStars', { volumeScale: _clamp01(volumeScale) * 0.8 });
    sfx('generate');
}

export function setMainButtonHeatSfxLevel(level) {
    _mainButtonHeatLevel = _clamp01(level);
    _syncMainButtonHeatLoop();
}

// ─────────────────────────────────────────────────────────────
// Voice loops
// ─────────────────────────────────────────────────────────────

// How often to retrigger the voice chirp (ms). Tune this to match desired feel.
const VOICE_RETRIGGER_MS = 120;
// Pitch variation: slow sine wave ±VOICE_PITCH_CENTS cents + tiny random jitter ±VOICE_PITCH_JITTER cents
const VOICE_PITCH_CENTS  = 8;    // main wave amplitude in cents
const VOICE_PITCH_JITTER = 3;    // extra random jitter in cents
const VOICE_PITCH_PERIOD_MS = 3200; // full sine period — how slowly pitch drifts

let _voiceIntervalId = null;
let _voicePitchPhase = 0;  // incremented each retrigger tick

export function startVoice(speakerKey) {
    if (!_sfxEnabled) return;
    const src = VOICE_SRCS[speakerKey] ?? VOICE_SRCS.gg;
    // Already correct speaker playing → no-op
    if (_voiceEl && !_voiceEl.paused && _voiceEl._speakerKey === speakerKey) return;
    stopVoice();
    _voiceEl = _makeAudio(src, false);
    _voiceEl._speakerKey = speakerKey;
    _voiceEl.volume = _VOICE_NOM * _sfxVolume;
    _voicePitchPhase = Math.random() * Math.PI * 2; // start at random phase
    _voiceEl.play().catch(() => {});
    _voiceIntervalId = setInterval(() => {
        if (!_voiceEl || !_sfxEnabled) return;
        // Advance phase by one tick's worth of the period
        _voicePitchPhase += (VOICE_RETRIGGER_MS / VOICE_PITCH_PERIOD_MS) * Math.PI * 2;
        const cents = Math.sin(_voicePitchPhase) * VOICE_PITCH_CENTS
                    + (Math.random() * 2 - 1) * VOICE_PITCH_JITTER;
        _voiceEl.playbackRate = Math.pow(2, cents / 1200);
        _voiceEl.currentTime = 0;
        _voiceEl.play().catch(() => {});
    }, VOICE_RETRIGGER_MS);
}

export function stopVoice() {
    if (_voiceIntervalId) { clearInterval(_voiceIntervalId); _voiceIntervalId = null; }
    if (!_voiceEl) return;
    _stopAudio(_voiceEl);
    _voiceEl = null;
}

// ─────────────────────────────────────────────────────────────
// Home music — ambient layer (looping)
// ─────────────────────────────────────────────────────────────

function _startAmbient() {
    if (_ambientEl) return;
    _ambientEl = _makeAudio(MUSIC_HOME_AMBIENT, true);
    _ambientEl.volume = 0;
    _ambientEl.play().catch(() => {});
    _fadeTo(_ambientEl, _AMBIENT_NOM * _musicVolume, MUSIC_FADE_MS);
}

function _stopAmbient(onDone) {
    if (!_ambientEl) { onDone?.(); return; }
    const a = _ambientEl;
    _ambientEl = null;
    _fadeTo(a, 0, MUSIC_FADE_MS, () => _stopAudio(a));
    // Invoke callback immediately — don't block on ambient fade
    onDone?.();
}

// ─────────────────────────────────────────────────────────────
// Home music — track layer (crossfading A/B)
// ─────────────────────────────────────────────────────────────

function _advancePlaylist() {
    _playlistIdx++;
    if (_playlistIdx >= _playlistOrder.length) {
        _playlistOrder = _shufflePlaylist();
        _playlistIdx   = 0;
    }
    return _playlistOrder[_playlistIdx];
}

function _playNextTrack(vol = _TRACK_NOM) {
    const src  = MUSIC_HOME_TRACKS[_advancePlaylist()];
    const next = (_trackActive + 1) % 2;

    // Fade out current
    const old = _trackEls[_trackActive];
    if (old) _fadeTo(old, 0, MUSIC_FADE_MS, () => _stopAudio(old));

    // Start next
    const audio = _makeAudio(src);
    audio.volume = 0;
    _trackEls[next] = audio;
    _trackActive    = next;
    audio.play().catch(() => {});
    if (_musicEnabled) _fadeTo(audio, vol * _musicVolume, MUSIC_FADE_MS);

    // Chain: when this track ends, crossfade to next
    audio.addEventListener('ended', () => {
        if (_scene === 'home' && _musicEnabled) _playNextTrack();
    }, { once: true });
}

function _stopCurrentTrack(onDone) {
    const cur = _trackEls[_trackActive];
    if (!cur) { onDone?.(); return; }
    const tmp = cur;
    _trackEls[0] = null;
    _trackEls[1] = null;
    _fadeTo(tmp, 0, MUSIC_FADE_MS, () => { _stopAudio(tmp); onDone?.(); });
}

// ─────────────────────────────────────────────────────────────
// Public music API
// ─────────────────────────────────────────────────────────────

export function startHomeMusic() {
    if (_scene === 'home') return;
    _scene = 'home';

    // Fade out space music
    if (_spaceEl) {
        const s = _spaceEl;
        _spaceEl = null;
        _fadeTo(s, 0, MUSIC_FADE_MS, () => _stopAudio(s));
    }

    if (!_musicEnabled) return;

    _startAmbient();
    _playNextTrack();
}

export function startSpaceMusic() {
    if (_scene === 'space') return;
    _scene = 'space';

    _stopAmbient();
    _stopCurrentTrack();

    if (!_musicEnabled) return;

    _spaceEl = _makeAudio(MUSIC_SPACE, true);
    _spaceEl.volume = 0;
    _spaceEl.play().catch(() => {});
    _fadeTo(_spaceEl, _SPACE_NOM * _musicVolume, MUSIC_FADE_MS);
}

// ─────────────────────────────────────────────────────────────
// Settings toggles
// ─────────────────────────────────────────────────────────────

export function setMusicEnabled(on) {
    _musicEnabled = on;
    localStorage.setItem(LS_MUSIC_KEY, on ? '1' : '0');

    if (on) {
        // Re-trigger current scene from scratch
        const scene = _scene;
        _scene = null;
        if (scene === 'space') startSpaceMusic();
        else startHomeMusic();
    } else {
        // Fade everything out
        if (_ambientEl) _fadeTo(_ambientEl, 0, MUSIC_FADE_MS);
        const cur = _trackEls[_trackActive];
        if (cur) _fadeTo(cur, 0, MUSIC_FADE_MS);
        if (_spaceEl) _fadeTo(_spaceEl, 0, MUSIC_FADE_MS);
    }
}

export function setMusicVolume(vol) {
    _musicVolume = Math.max(0, Math.min(1, vol));
    localStorage.setItem(LS_MUSIC_VOL, _musicVolume.toFixed(3));
    if (!_musicEnabled) return;
    if (_ambientEl) _ambientEl.volume = _AMBIENT_NOM * _musicVolume;
    const cur = _trackEls[_trackActive];
    if (cur) cur.volume = _TRACK_NOM * _musicVolume;
    if (_spaceEl) _spaceEl.volume = _SPACE_NOM * _musicVolume;
}

export function getMusicVolume() { return _musicVolume; }

export function setSfxEnabled(on) {
    _sfxEnabled = on;
    localStorage.setItem(LS_SFX_KEY, on ? '1' : '0');
    if (!on) {
        stopVoice();
        _stopMainButtonHeatLoop();
        return;
    }
    _syncMainButtonHeatLoop();
}

export function setSfxVolume(vol) {
    _sfxVolume = Math.max(0, Math.min(1, vol));
    localStorage.setItem(LS_SFX_VOL, _sfxVolume.toFixed(3));
    if (_voiceEl) _voiceEl.volume = _VOICE_NOM * _sfxVolume;
    // SFX pool volumes — apply to all pooled elements
    for (const pool of Object.values(_sfxPool)) {
        for (const a of pool) a.volume = _SFX_NOM * _sfxVolume;
    }
    _syncMainButtonHeatLoop();
}

export function getSfxVolume()    { return _sfxVolume; }

export function getMusicEnabled() { return _musicEnabled; }
export function getSfxEnabled()   { return _sfxEnabled;   }

// ─────────────────────────────────────────────────────────────
// Init — call once, ideally on first user interaction or from game.js
// ─────────────────────────────────────────────────────────────

export function initAudio() {
    _musicEnabled  = localStorage.getItem(LS_MUSIC_KEY) === '1';
    _sfxEnabled    = localStorage.getItem(LS_SFX_KEY)   !== '0';
    _musicVolume   = parseFloat(localStorage.getItem(LS_MUSIC_VOL) ?? '0.5');
    _sfxVolume     = parseFloat(localStorage.getItem(LS_SFX_VOL)   ?? '0.5');
    _mainButtonHeatLevel = 0;
    _playlistOrder = _shufflePlaylist();
    _playlistIdx   = -1;
    _initSfxPool();
}
