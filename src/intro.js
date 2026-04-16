// src/intro.js — VN / cinematic state machine

import { state, saveState } from './state.js';
import { Config }           from './config.js';
import { spawnStoryOrder }  from './economy.js';
import { startVoice, stopVoice } from './audio.js';
import { t } from './i18n.js';

// ─────────────────────────────────────────────────────────────
// DOM element cache — populated by initIntro()
// ─────────────────────────────────────────────────────────────

let el = {};

export function initIntro() {
    el = {
        overlay:     document.getElementById('cinematic-overlay'),
        black:       document.getElementById('cinematic-black'),
        flash:       document.getElementById('cinematic-flash'),
        phone:       document.getElementById('phone-hand'),
        thoughtBox:  document.getElementById('thought-box'),
        thoughtText: document.getElementById('thought-text'),
        thoughtNext: document.getElementById('thought-next-btn'),
        vnDialog:    document.getElementById('vn-dialog'),
        vnSpeaker:   document.getElementById('vn-speaker-name'),
        vnIcon:      document.getElementById('vn-speaker-icon'),
        vnText:      document.getElementById('vn-text'),
        vnNext:      document.getElementById('vn-next-btn'),
        choice:      document.getElementById('tutorial-choice'),
        continueBtn: document.getElementById('tutorial-continue-btn'),
        skipBtn:     document.getElementById('tutorial-skip-btn'),
        spotlight:   document.getElementById('spotlight-ring'),
        skipCinBtn:  document.getElementById('cinematic-skip-btn'),
    };

    el.skipCinBtn?.addEventListener('click', () => skipIntro());
}

// ─────────────────────────────────────────────────────────────
// Speakers
// ─────────────────────────────────────────────────────────────

const SPEAKERS = {
    chatdjbt: { name: 'ChatDJBT',    icon: 'images/cinematic/chatdjbt-icon.png' },
    gg:       { name: 'GG',          icon: 'images/cinematic/gg-icon.png'       },
    pm:       { name: 'Outistic PM', icon: 'images/cinematic/chatdjbt-icon.png' },
};

// ─────────────────────────────────────────────────────────────
// State machine vars
// ─────────────────────────────────────────────────────────────

let queue            = [];
let pointer          = 0;
let typing           = false;
let pendingTimeoutId = null;
let _typeGeneration  = 0;
let _spotlightTargetEl = null;
let _waitPollId      = null;
let _spotlightRafId  = null;

// ─────────────────────────────────────────────────────────────
// Visibility helpers (CSS class-based — style.css owns all transitions)
// .cinematic-overlay  -> .active shows it (display:none -> block)
// .thought-box etc.   -> .visible shows it (opacity/visibility)
// .cinematic-black    -> opacity:1 when parent .active, .scene-opened fades it out
// ─────────────────────────────────────────────────────────────

function showOverlay() {
    el.overlay?.classList.add('active');
}

function hideOverlay() {
    el.overlay?.classList.remove('active');
}

function stopSpotlightTracking() {
    if (_spotlightRafId) {
        cancelAnimationFrame(_spotlightRafId);
        _spotlightRafId = null;
    }
}

function syncSpotlightRing() {
    if (!_spotlightTargetEl || !el.overlay || !el.spotlight) {
        stopSpotlightTracking();
        return;
    }

    const overlayRect = el.overlay.getBoundingClientRect();
    const targetRect = _spotlightTargetEl.getBoundingClientRect();
    const padX = Math.max(10, overlayRect.width * 0.012);
    const padY = Math.max(10, overlayRect.height * 0.012);

    el.spotlight.style.left = `${targetRect.left - overlayRect.left - padX}px`;
    el.spotlight.style.top = `${targetRect.top - overlayRect.top - padY}px`;
    el.spotlight.style.width = `${targetRect.width + padX * 2}px`;
    el.spotlight.style.height = `${targetRect.height + padY * 2}px`;
    el.spotlight.classList.add('visible');
    el.overlay.classList.add('spotlight-on');

    _spotlightRafId = requestAnimationFrame(syncSpotlightRing);
}

function clearSpotlightTarget() {
    stopSpotlightTracking();
    if (_spotlightTargetEl) {
        _spotlightTargetEl.classList.remove('tutorial-spotlight-target');
        _spotlightTargetEl = null;
    }
    el.spotlight?.classList.remove('visible');
    el.overlay?.classList.remove('spotlight-on');
}

function applySpotlightTarget(step) {
    clearSpotlightTarget();
    if (!step?.spotlight) return;
    const target = document.querySelector(step.spotlight);
    if (target) {
        target.classList.add('tutorial-spotlight-target');
        _spotlightTargetEl = target;
    }
}

function hideAllPanels() {
    el.thoughtBox?.classList.remove('visible');
    el.vnDialog?.classList.remove('visible');
    el.choice?.classList.remove('visible');
    el.phone?.classList.remove('visible');
    el.flash?.classList.remove('active');
    clearSpotlightTarget();
}

// ─────────────────────────────────────────────────────────────
// Text resolution — handles plain strings AND { en, ru } objects
// ─────────────────────────────────────────────────────────────

function resolveStepText(step) {
    const val = step?.text;
    if (typeof step?.textKey === 'string' && step.textKey.trim()) {
        return t(step.textKey);
    }
    if (!val) return '';
    if (typeof val === 'object') {
        if (typeof val.locKey === 'string' && val.locKey.trim()) {
            return t(val.locKey);
        }
        const lang = state.language || 'ru';
        return val[lang] || val.en || val.ru || '';
    }
    return val;
}

// ─────────────────────────────────────────────────────────────
// Typewriter
// ─────────────────────────────────────────────────────────────

function typeText(text, targetEl, onDone) {
    if (!targetEl) { onDone?.(); return; }
    clearTimeout(pendingTimeoutId);
    const gen = ++_typeGeneration;
    targetEl.textContent = '';
    typing = true;
    let i = 0;
    let _buf = '';
    let _rafId = 0;

    function flush() {
        _rafId = 0;
        targetEl.textContent = _buf;
    }

    function tick() {
        if (gen !== _typeGeneration) { cancelAnimationFrame(_rafId); return; } // stale
        if (i >= text.length) {
            cancelAnimationFrame(_rafId);
            targetEl.textContent = _buf; // flush final state immediately
            typing = false;
            onDone?.();
            return;
        }
        const ch = text[i++];
        _buf += ch;
        if (!_rafId) _rafId = requestAnimationFrame(flush); // batch DOM write to next frame
        const delay = i === 1 ? 12 : /[.!?,;]/.test(ch) ? 38 : 18;
        pendingTimeoutId = setTimeout(tick, delay);
    }
    tick();
}

function skipTypingNow(targetEl, fullText) {
    clearTimeout(pendingTimeoutId);
    typing = false;
    if (targetEl) targetEl.textContent = fullText;
    stopVoice();
}

// ─────────────────────────────────────────────────────────────
// Queue advancement
// ─────────────────────────────────────────────────────────────

function advance() {
    pointer++;
    if (pointer < queue.length) {
        playStep(queue[pointer]);
    } else {
        endSequence();
    }
}

function endSequence() {
    hideOverlay();
    hideAllPanels();
    markIntroDone();
    const cb = _sequenceEndCallback;
    _sequenceEndCallback = null;
    cb?.();
}

// ─────────────────────────────────────────────────────────────
// Step dispatcher
// ─────────────────────────────────────────────────────────────

function playStep(step) {
    if (!step) { endSequence(); return; }

    switch (step.type) {

        case 'wait':
            pendingTimeoutId = setTimeout(advance, step.ms ?? 500);
            break;

        case 'flash': {
            el.flash?.classList.add('active');
            pendingTimeoutId = setTimeout(() => {
                el.flash?.classList.remove('active');
                advance();
            }, step.ms ?? 400);
            break;
        }

        case 'reveal_scene': {
            el.black?.classList.add('scene-opened');
            pendingTimeoutId = setTimeout(advance, 900);
            break;
        }

        case 'phone': {
            if (step.action === 'show') {
                el.phone?.classList.add('visible');
            } else {
                el.phone?.classList.remove('visible');
            }
            advance();
            break;
        }

        case 'thought': {
            hideAllPanels();
            el.thoughtBox?.classList.add('visible');

            const fullText = resolveStepText(step);

            function onThoughtClick(e) {
                e?.stopPropagation();
                if (typing) {
                    skipTypingNow(el.thoughtText, fullText);
                    return;
                }
                el.thoughtNext?.removeEventListener('click', onThoughtClick);
                el.thoughtBox?.removeEventListener('click', onThoughtClick);
                advance();
            }

            el.thoughtNext?.addEventListener('click', onThoughtClick);
            el.thoughtBox?.addEventListener('click', onThoughtClick);
            startVoice('thought');
            typeText(fullText, el.thoughtText, () => { stopVoice(); });
            break;
        }

        case 'dialog': {
            hideAllPanels();
            el.vnDialog?.classList.add('visible');

            const speakerKey = step.speaker || 'chatdjbt';
            const spk = SPEAKERS[speakerKey] || SPEAKERS.chatdjbt;
            if (el.vnSpeaker) el.vnSpeaker.textContent = spk.name;
            if (el.vnIcon)    el.vnIcon.src = spk.icon;

            el.vnDialog?.classList.remove('gg-theme', 'chat-theme');
            el.vnDialog?.classList.add(speakerKey === 'gg' ? 'gg-theme' : 'chat-theme');

            const fullText = resolveStepText(step);

            function onDialogClick() {
                if (typing) {
                    skipTypingNow(el.vnText, fullText);
                    return;
                }
                el.vnNext?.removeEventListener('click', onDialogClick);
                advance();
            }

            el.vnNext?.addEventListener('click', onDialogClick);
            applySpotlightTarget(step);
            startVoice(speakerKey === 'gg' ? 'gg' : 'chatdjbt');
            typeText(fullText, el.vnText, () => { stopVoice(); });
            break;
        }

        case 'choice': {
            hideAllPanels();
            el.choice?.classList.add('visible');

            function onContinue() {
                cleanup();
                state.tutorialMode = true;
                const lead = window.TUTORIAL_SEQUENCE?.tutorialLeadIn || [];
                if (lead.length) {
                    queue = lead; pointer = 0; playStep(queue[0]);
                } else {
                    onSkipChoice();
                }
            }

            function onSkipChoice() {
                cleanup();
                state.tutorialSkipped = true;
                skipIntro();
            }

            function cleanup() {
                el.continueBtn?.removeEventListener('click', onContinue);
                el.skipBtn?.removeEventListener('click', onSkipChoice);
            }

            el.continueBtn?.addEventListener('click', onContinue);
            el.skipBtn?.addEventListener('click', onSkipChoice);
            break;
        }

        case 'reveal_ui':  advance(); break;
        case 'sfx':        advance(); break;

        case 'edge_fx': {
            const container = document.querySelector('.game-container');
            if (container) {
                const cls = step.color === 'green' ? 'edge-fx-green' : 'edge-fx-red';
                container.classList.remove('edge-fx-red', 'edge-fx-green');
                requestAnimationFrame(() => container.classList.add(cls));
                setTimeout(() => container.classList.remove(cls), (step.ms || 900) + 200);
            }
            advance();
            break;
        }

        case 'wait_story_started': {
            // Hide dialog panels and make overlay pass-through so player can click game UI
            el.thoughtBox?.classList.remove('visible');
            el.vnDialog?.classList.remove('visible');
            clearSpotlightTarget();
            if (el.overlay) el.overlay.style.pointerEvents = 'none';
            _waitPollId = setInterval(() => {
                if (state.activeOrder?.isStory) {
                    clearInterval(_waitPollId);
                    _waitPollId = null;
                    if (el.overlay) el.overlay.style.pointerEvents = '';
                    advance();
                }
            }, 400);
            break;
        }

        case 'add_stress':
            _addStressCallback?.(step.amount || 0);
            advance();
            break;

        case 'force_smoke':
            _doSmokeBreakCallback?.();
            advance();
            break;

        case 'set_zen':
            state.zenEnabled = step.enabled !== false;
            advance();
            break;

        case 'force_story_order':
            spawnStoryOrder('post_portfolio');
            advance();
            break;

        case 'end':
            markIntroDone();
            hideOverlay();
            hideAllPanels();
            break;

        default:
            advance();
            break;
    }
}

// ─────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────

function markIntroDone() {
    if (state.introCompleted) return;
    state.introCompleted = true;
    saveState();
    _refreshBadgesCallback?.();
}

// ─────────────────────────────────────────────────────────────
// Public API
// ─────────────────────────────────────────────────────────────

export function startIfNeeded() {
    if (state.introCompleted || state.introStarted) return;
    state.introStarted = true;

    const cinematic = window.TUTORIAL_SEQUENCE?.cinematic;
    if (!cinematic || cinematic.length === 0) {
        console.warn('[intro] TUTORIAL_SEQUENCE.cinematic not found');
        return;
    }

    queue   = cinematic;
    pointer = 0;
    showOverlay();
    hideAllPanels();
    el.black?.classList.remove('scene-opened');
    playStep(queue[0]);
}

export function skipIntro() {
    clearTimeout(pendingTimeoutId);
    if (_waitPollId) { clearInterval(_waitPollId); _waitPollId = null; }
    typing = false;
    stopVoice();
    if (el.overlay) el.overlay.style.pointerEvents = '';
    markIntroDone();
    hideOverlay();
    hideAllPanels();
    spawnStoryOrder('post_portfolio');
}

export function fireCh1Event(storyId) {
    if (!storyId) return;
    if (state.chapter1Completed && storyId !== '__runtime_comment_sequence') return;
    const events = window.CH1_EVENTS;
    if (!events) return;
    const evt = events[storyId];
    if (!evt) return;

    // Gate: only fire if a prerequisite event already fired
    if (evt.requiresFiredEvent && !state.ch1FiredEvents[evt.requiresFiredEvent]) return;

    // firedOnce: false allows event to repeat (e.g. story-fail respawn)
    const cacheFire = evt.firedOnce !== false;
    if (cacheFire && state.ch1FiredEvents[storyId]) return;
    if (cacheFire) state.ch1FiredEvents[storyId] = true;

    // ── Side effects (applied immediately) ──────────────────
    if (evt.unlockMenus) {
        for (const k of (Array.isArray(evt.unlockMenus) ? evt.unlockMenus : Object.keys(evt.unlockMenus))) {
            state.unlockedMenus[k] = true;
        }
        _refreshLocksCallback?.();
    }

    if (Array.isArray(evt.unlockClothingVariants)) {
        if (!state.wardrobeUnlockedVariants) state.wardrobeUnlockedVariants = {};
        for (const key of evt.unlockClothingVariants) {
            state.wardrobeUnlockedVariants[key] = true;
        }
    }

    if (Array.isArray(evt.unlockFullOutfits)) {
        if (!state.wardrobeUnlockedOutfits) state.wardrobeUnlockedOutfits = {};
        for (const tag of evt.unlockFullOutfits) {
            state.wardrobeUnlockedOutfits[tag] = true;
        }
    }

    if (Array.isArray(evt.unlockSpecialTasks)) {
        for (const id of evt.unlockSpecialTasks) state.unlockedSpecialTasks[id] = true;
        _refreshBadgesCallback?.();
    }

    if (Array.isArray(evt.unlockTaskTypes)) {
        for (const t of evt.unlockTaskTypes) {
            if (!state.unlockedTaskTypes.includes(t)) state.unlockedTaskTypes.push(t);
        }
    }

    if (evt.setStress != null) {
        const prev = state.stress;
        state.stress = Math.min(100, Math.max(0, Number(evt.setStress)));
        const delta = state.stress - prev;
        if (delta > 0) _addStressCallback?.(delta);
    }

    if (evt.setOutfit != null) {
        state.currentOutfit = Number(evt.setOutfit);
    }

    if (Array.isArray(evt.achievements)) {
        _unlockAchievementCallback?.(evt.achievements);
    }

    if (Array.isArray(evt.injectStories)) {
        for (const id of evt.injectStories) spawnStoryOrder(id);
    }

    if (evt.ch1Complete) {
        state.chapter1Completed = true;
        for (const key of Object.keys(state.unlockedMenus)) state.unlockedMenus[key] = true;
        _refreshLocksCallback?.();
        // Persist chapter completion — survives reset
        try {
            const _chapData = JSON.parse(localStorage.getItem(Config.CHAPTERS_SAVE_KEY) || '{}');
            _chapData.chapter1 = true;
            localStorage.setItem(Config.CHAPTERS_SAVE_KEY, JSON.stringify(_chapData));
        } catch (_) {}
    }

    // ── followUp timer ───────────────────────────────────────
    if (evt.followUp?.eventKey) {
        setTimeout(() => fireCh1Event(evt.followUp.eventKey), evt.followUp.delayMs ?? 0);
    }

    saveState();

    // ── Dialogue / cinematic (optionally delayed) ────────────
    if (Array.isArray(evt.cinematic) && evt.cinematic.length > 0) {
        const delay = evt.cinematicDelay ?? 0;
        setTimeout(() => playMeetingCinematic(evt.cinematic), delay);
    } else if (Array.isArray(evt.dialogue) && evt.dialogue.length > 0) {
        const isGenerationDialogue = /^story_gen_|^special_gen_/.test(storyId);
        const delay = isGenerationDialogue ? Math.max(4000, evt.dialogueDelay ?? 0) : (evt.dialogueDelay ?? 0);
        const postActions = evt.postActions || null;
        setTimeout(() => {
            if (postActions) {
                _sequenceEndCallback = () => _handlePostActions(postActions);
            }
            queue   = evt.dialogue.map(step => step?.type ? step : { ...step, type: 'dialog' });
            pointer = 0;
            showOverlay();
            hideAllPanels();
            el.black?.classList.add('scene-opened');
            playStep(queue[0]);
        }, delay);
    }
}

// ─────────────────────────────────────────────────────────────
// PM Meeting Cinematic (uses #meeting-overlay)
// ─────────────────────────────────────────────────────────────

const MEETING_SPEAKERS = {
    pm: { name: 'Outistic PM', icon: 'images/cinematic/chatdjbt-icon.png' },
    gg: { name: 'GG',          icon: 'images/cinematic/gg-icon.png'       },
};
const MEETING_IMG_DEFAULT = 'images/cinematic/manager-outistic-smile.png';
const MEETING_IMG_SMILE2  = 'images/cinematic/manager-outistic-smile2.png';

export function playMeetingCinematic(steps) {
    if (!Array.isArray(steps) || steps.length === 0) return;

    const overlay = document.getElementById('meeting-overlay');
    if (!overlay) { console.warn('[intro] #meeting-overlay not found'); return; }

    const managerImg = overlay.querySelector('.meeting-manager-img');
    const speakerName = overlay.querySelector('.meeting-speaker-name');
    const speakerIcon = overlay.querySelector('.meeting-speaker-icon');
    const textEl      = overlay.querySelector('.meeting-text');
    const nextBtn     = overlay.querySelector('.meeting-next-btn');

    if (!managerImg || !textEl || !nextBtn) return;

    let mIdx = 0;
    let mTyping = false;
    let mTimeout = null;

    // Reset manager image at start of each scene
    managerImg.src = MEETING_IMG_DEFAULT;

    overlay.classList.add('active');

    function showStep(step) {
        if (!step) { endMeeting(); return; }

        // Image swap
        if (step.swapImage === 'smile2') {
            managerImg.src = MEETING_IMG_SMILE2;
        } else if (step.swapImage === 'smile1') {
            managerImg.src = MEETING_IMG_DEFAULT;
        }

        const spk = MEETING_SPEAKERS[step.speaker] || MEETING_SPEAKERS.pm;
        if (speakerName) speakerName.textContent = spk.name;
        if (speakerIcon) speakerIcon.src = spk.icon;

        const fullText = resolveStepText(step);
        typeText(fullText, textEl, () => { mTyping = false; });
        mTyping = true;
    }

    function onNext(e) {
        e?.stopPropagation();
        if (mTyping) {
            clearTimeout(mTimeout);
            // Finish typing immediately
            skipTypingNow(textEl, resolveStepText(steps[mIdx] || {}));
            mTyping = false;
            return;
        }
        mIdx++;
        if (mIdx < steps.length) {
            showStep(steps[mIdx]);
        } else {
            endMeeting();
        }
    }

    function endMeeting() {
        nextBtn.removeEventListener('click', onNext);
        overlay.removeEventListener('click', onNext);
        overlay.classList.remove('active');
    }

    nextBtn.addEventListener('click', onNext);
    overlay.addEventListener('click', onNext);

    showStep(steps[0]);
}

// ─────────────────────────────────────────────────────────────
// Callbacks (set by game.js to avoid circular imports)
// ─────────────────────────────────────────────────────────────

let _addStressCallback       = null;
let _doSmokeBreakCallback    = null;
let _unlockAchievementCallback = null;
let _refreshLocksCallback      = null;
let _refreshBadgesCallback     = null;
let _sequenceEndCallback       = null;  // one-shot: called when current dialogue sequence ends

function _handlePostActions(actions) {
    if (actions.giveCigarettes) {
        state.goods.cigarettes = (state.goods.cigarettes || 0) + actions.giveCigarettes;
    }
    if (actions.doSmokeBreak) {
        _doSmokeBreakCallback?.();
    }
}

export function setIntroCallbacks({ onAddStress, onSmokeBreak, onUnlockAchievements, onRefreshLocks, onRefreshBadges }) {
    if (onAddStress)           _addStressCallback          = onAddStress;
    if (onSmokeBreak)          _doSmokeBreakCallback       = onSmokeBreak;
    if (onUnlockAchievements)  _unlockAchievementCallback  = onUnlockAchievements;
    if (onRefreshLocks)        _refreshLocksCallback       = onRefreshLocks;
    if (onRefreshBadges)       _refreshBadgesCallback      = onRefreshBadges;
}
