// src/state.js — Mutable game state + save/load

import { Config } from './config.js';

export const state = {
    // ── Status ──
    currentStatus: 'rest',   // 'rest' | 'work' | 'smoke'

    // ── Economy ── (Decimal fields — use .add/.sub/.gte etc.)
    funds: new Decimal(100),
    prestige: 0,
    virtualPrestigePool: 0,
    prestigeTransferRatioBonus: 0,
    knownness: 0,

    // ── Leveling ──
    level: 1,
    xp: new Decimal(0),
    xpToNext: new Decimal(100),
    skillPoints: 0,
    expertPoints: 0,

    // ── Orders ──
    orders: [],
    selectedOrderId: null,
    activeOrder: null,
    templateDeck: [],
    forcedStoryOrderId: null,
    completedStoryOrderIds: [],
    researchTaskCompletions: {},

    // ── Timers (internal interval IDs) ──
    spawnIntervalId: null,
    headhunterIntervalId: null,
    lifetimeIntervalId: null,
    autogenIntervalId: null,
    zenIntervalId: null,
    agentIntervalId: null,

    // ── Generation ──
    job_chance: 0,
    storyChanceBonus: 0,
    headhunterSpawnSec: 30,   // interval for headhunter-triggered spawns; ai_headhunter upgrades reduce this
    activeResearchPool: null, // { taskId, xp: Decimal, xpRequired: Decimal, rewardType, rewardAmount }
    generationCooldownMs: 5000,
    generationCooldownUntil: 0,
    autogenEnabled: false,

    // ── Stress & Smoking ──
    stress: 0,
    smokeUntil: 0,
    smokeBreakCount: 0,
    nicotineWithdrawal: false,
    smokeRelief: null,    // { total, applied, start, duration } — gradual relief over smoke duration
    cigaretteButts: 0,

    // ── Goods & Upgrades ──
    goods: {
        cigarettes: 25,
        cigsAutoBuy: false,
        energizerActive: false,
        vitaminsActive: false,
    },
    upgrades: {
        autogen: false,
        headhunter: false,
        brandmentor: false,
    },

    // ── Unlocks ──
    unlockedMenus: {
        upgrades: false,
        research: false,
        promotion: false,
        goods: false,
        clothes: false,
        property: false,
        shop: false,
    },
    unlockedTaskTypes: ['luck'],
    unlockedSpecialTasks: {},

    // ── Upgrades ──
    upgradesIntroSeen: false,
    skillTree: {
        purchased: {},
        tiers: {},   // nodeId → current tier level (1-based; 0 = not purchased)
        viewport: { panX: 0, panY: 0, zoom: 1 },
        forestUnlockedPermanently: false,
    },

    // ── Story / Chapter 1 ──
    chapter1Completed: false,
    chapter2Completed: false,
    ch1FiredEvents: {},
    pendingStoryOutro: false,

    // ── Intro / Tutorial ──
    language: 'ru',
    introStarted: false,
    introCompleted: false,
    tutorialMode: false,
    tutorialCompleted: false,
    tutorialSkipped: false,
    characterRevealed: false,
    tutorialWait: { waiting: false, type: null, menuOpened: false },
    menuTutorialSeen: {
        hub: false, orders: false, story: false, research: false, promotion: false,
    },
    shownCharacterComments: {},

    // ── Player ──
    playerName: null,
    currentOutfit: 0,

    // ── Wardrobe ──
    // owned: per-slot arrays of owned variant ids
    // selected: per-slot currently equipped variant id (null = not wearing this slot)
    // unlockedVariants: story-unlocked variant keys (e.g. 'socks_white')
    wardrobeOwned:    { cap: [1], hoodie: [1], tshirt: [], pants: [1], socks: [1] },
    wardrobeSelected: { cap: 1, hoodie: 1, tshirt: null, pants: 1, socks: 1 },
    wardrobeUnlockedVariants: {},
    selectedOutfitTag:        null,  // null = кэжуал; string = full outfit tag e.g. 'Clown'
    wardrobeUnlockedOutfits:  {},    // { 'Clown': true, ... }

    // ── Property ──
    // items: per-location per-item purchase + visibility state
    property: {
        activeLocationId: 'abandoned',
        locations: {
            abandoned: {
                items: {
                    floor:   { purchased: false, active: false },
                    walls:   { purchased: false, active: false },
                    ceiling: { purchased: false, active: false },
                    bed:     { purchased: false, active: false },
                    carpet:  { purchased: false, active: false },
                    window:  { purchased: false, active: false },
                },
            },
        },
    },

    // ── Mini-game ──
    miniGenTutorialSeen: false,
    miniGenPopupActive: false,

    // ── Agent income ──
    agentLastFundsSnapshot: new Decimal(0),

    // ── Neural payout stack (ai_neural) ──
    neuralStack: 0,

    // ── Smoke skip charges (cig_abst) ──
    smokeSkipCharges: 0,

    // ── Focus smoke-skip chance (gg_focus, 0→1) ──
    focusSkipChance: 0,

    // ── Post-smoke decay boost timestamp (cig_memory) ──
    postSmokeDecayBoostUntil: 0,

    // ── Stats ──
    stats: {
        completedOrders: 0,
        failedOrders: 0,
        missedOrders: 0,
        totalMoneyEarned: new Decimal(0),
        totalMoneySpent: new Decimal(0),
        totalSmokeBreaks: 0,
        stressRelievedByCigarettes: 0,
        totalStressRelieved: 0,
        totalCigaretteButtsEarned: 0,
        manualGenerations: 0,
        autogenGenerations: 0,
        autogenSuccesses: 0,
        autogenFailures: 0,
        genAtMaxHeatDone: false,
        temaCorrectPicks: 0,
    },

    // ── Achievements ──
    claimedAchievements: {},
};

// ─────────────────────────────────────────────────────────────
// Persistence
// ─────────────────────────────────────────────────────────────

const SKIP_KEYS = new Set([
    'spawnIntervalId', 'lifetimeIntervalId', 'autogenIntervalId', 'zenIntervalId', 'headhunterIntervalId', 'agentIntervalId',
    'templateDeck', 'activeOrder', 'selectedOrderId',
    // Transient intro flags — reset on every page load so intro can re-run if needed
    'introStarted',
    // Transient UI flags — must not persist across sessions
    'miniGenPopupActive',
]);

let _saveEnabled = true;

/** Call before wiping localStorage + reloading. Prevents any async ticker
 *  from re-writing the save in the event-loop gap before unload. */
export function disableSave() {
    _saveEnabled = false;
}

export function saveState() {
    if (!_saveEnabled) return;
    try {
        const payload = { v: Config.SAVE_VERSION };
        for (const key of Object.keys(state)) {
            if (!SKIP_KEYS.has(key)) payload[key] = state[key];
        }
        localStorage.setItem(Config.SAVE_KEY, JSON.stringify(payload));
    } catch (_) { /* silent — storage quota or private browsing */ }
}

export function loadState() {
    try {
        const raw = localStorage.getItem(Config.SAVE_KEY);
        if (!raw) return;
        const data = JSON.parse(raw);
        if (!data || data.v !== Config.SAVE_VERSION) return;

        for (const key of Object.keys(state)) {
            if (SKIP_KEYS.has(key)) continue;
            if (key in data) {
                // Deep-merge objects (goods, upgrades, unlockedMenus, stats, etc.)
                if (
                    data[key] !== null &&
                    typeof data[key] === 'object' &&
                    !Array.isArray(data[key]) &&
                    typeof state[key] === 'object' &&
                    !Array.isArray(state[key])
                ) {
                    Object.assign(state[key], data[key]);
                } else {
                    state[key] = data[key];
                }
            }
        }

        // Restore Decimal fields (JSON serializes them as strings)
        const _decimalFields = ['funds', 'xp', 'xpToNext', 'agentLastFundsSnapshot'];
        for (const f of _decimalFields) {
            if (state[f] !== undefined && !(state[f] instanceof Decimal))
                state[f] = new Decimal(state[f] ?? 0);
        }
        const _decimalStatFields = ['totalMoneyEarned', 'totalMoneySpent'];
        for (const f of _decimalStatFields) {
            if (state.stats[f] !== undefined && !(state.stats[f] instanceof Decimal))
                state.stats[f] = new Decimal(state.stats[f]);
        }
        // Restore activeResearchPool Decimal fields
        if (state.activeResearchPool) {
            if (!(state.activeResearchPool.xp instanceof Decimal))
                state.activeResearchPool.xp = new Decimal(state.activeResearchPool.xp || 0);
            if (!(state.activeResearchPool.xpRequired instanceof Decimal))
                state.activeResearchPool.xpRequired = new Decimal(state.activeResearchPool.xpRequired || 100);
        }

        // Restore language preference
        const savedLang = localStorage.getItem(Config.LANGUAGE_SAVE_KEY);
        if (savedLang) state.language = savedLang;

        // Migration: ensure start-owned wardrobe items are always present
        // (old saves had empty arrays before we added startOwned defaults)
        const _startOwned = { cap: [1], hoodie: [1], pants: [1], socks: [1] };
        for (const [slot, ids] of Object.entries(_startOwned)) {
            if (!Array.isArray(state.wardrobeOwned[slot])) state.wardrobeOwned[slot] = [];
            for (const id of ids) {
                if (!state.wardrobeOwned[slot].includes(id)) state.wardrobeOwned[slot].push(id);
            }
            if (state.wardrobeSelected[slot] == null) state.wardrobeSelected[slot] = ids[0];
        }
        if (!state.wardrobeUnlockedVariants) state.wardrobeUnlockedVariants = {};
        if (!state.wardrobeUnlockedOutfits)  state.wardrobeUnlockedOutfits  = {};

        // ── Post-load cleanup ────────────────────────────────────────────
        const _now = Date.now();

        // 1. Stale smoke status: if the smoke break ended while the tab was closed,
        //    reset to rest and clear any remaining gradual relief.
        if (state.currentStatus === 'smoke' && state.smokeUntil <= _now) {
            state.currentStatus = 'rest';
            // Apply any pending relief instantly rather than losing it
            if (state.smokeRelief) {
                const _remaining = state.smokeRelief.total - state.smokeRelief.applied;
                if (_remaining > 0) state.stress = Math.max(0, state.stress - _remaining);
                state.smokeRelief = null;
            }
        }

        // 2. smokeRelief with a stale start: re-anchor to now so the remaining relief
        //    plays out gradually from this moment instead of all at once.
        if (state.smokeRelief && state.currentStatus === 'smoke') {
            const _remaining = state.smokeRelief.total - state.smokeRelief.applied;
            const _timeLeft  = Math.max(1, state.smokeUntil - _now);
            state.smokeRelief = { total: _remaining, applied: 0, start: _now, duration: _timeLeft };
        }

        // 3. Remove pool orders that already expired while offline.
        //    (Lifetime ticker isn't running yet — this prevents stale orders flickering in UI.)
        state.orders = state.orders.filter(o => o.isStory || o.expiresAt === Infinity || o.expiresAt > _now);

        // 4. Ensure all new stats fields exist for old saves (Object.assign won’t add missing keys).
        const _statsDefaults = {
            missedOrders: 0, totalStressRelieved: 0,
            autogenSuccesses: 0, autogenFailures: 0,
            genAtMaxHeatDone: false, temaCorrectPicks: 0,
        };
        for (const [k, v] of Object.entries(_statsDefaults)) {
            if (state.stats[k] === undefined) state.stats[k] = v;
        }
    } catch (_) { /* corrupted save — start fresh */ }
}
