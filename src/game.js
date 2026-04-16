// src/game.js — Entry point. Wires all modules together.

import { Config }                                                           from './config.js';
import { loadState, saveState, disableSave, state }                       from './state.js';
import { showMiniGenPopup, shouldShowMiniGen }                             from './minigen.js';
import {
    startSpawnTicker, startLifetimeTicker, startAutogenTicker, startZenTicker, startHeadhunterTicker,
    startAgentTicker,
    registerGenerationStep, registerGenerationStepWithResult,
    setEconomyCallbacks, addStress, doSmokeBreak, recomputeGenerationCooldown,
    stopAllTickers,
}                                                                           from './economy.js';
import { bindSidebars, updateSidebarBadges,
         initAchievementBadges, updateAchievementBadges,
         showLanguagePicker, setUpgradesCallbacks, refreshSidebarLocks,
         reapplySkillTreeEffects }                                          from './ui-shell.js';
import { refreshOpenMenu }                                                  from './ui-orders.js';
import {
    initHud, updateAllHud, startHudTicker,
    bindGenerateButton, bindAutogenToggle, spawnStressParticle, getHeatLevel,
}                                                                           from './ui-hud.js';
import { initIntro, startIfNeeded, fireCh1Event, setIntroCallbacks }        from './intro.js';
import { initAudio, startHomeMusic }                                        from './audio.js';
import { preloadAssets }                                                    from './preload.js';

// ─────────────────────────────────────────────────────────────
// Telegram WebApp init
// ─────────────────────────────────────────────────────────────
(function initTelegramWebApp() {
    const tg = window.Telegram?.WebApp;
    if (!tg) return;
    tg.ready();
    // Expand to full screen (SDK 7.7+)
    if (typeof tg.requestFullscreen === 'function') tg.requestFullscreen();
    else tg.expand();
    // Disable swipe-down-to-close gesture
    if (typeof tg.disableVerticalSwipes === 'function') tg.disableVerticalSwipes();
})();

console.log('[game] module imports resolved OK');

// ── Manual generation batch bonus (ai_batch tiers: cumulative +1/+1/+2/+5/+10) ──
function _getManualBatchBonus() {
    const _increments = [0, 1, 1, 2, 5, 10];
    let _total = 0;
    const _t = Math.min(state.skillTree?.tiers?.ai_batch || 0, 5);
    for (let i = 1; i <= _t; i++) _total += _increments[i];
    return _total;
}

// ── Autogen step (handles minigen popup + batch bonus) ──────────────

/** Returns current auto-choice timer in ms (driven by ai_autogen tier 1 + ai_autoboost tiers). */
function _getMinigenChoiceTimerMs() {
    const tiers = state.skillTree?.tiers || {};
    // ai_autoboost overrides the base 3000ms set by ai_autogen tier 1
    const boostTier = Math.min(tiers.ai_autoboost || 0, 5);
    if (boostTier >= 5) return 250;
    if (boostTier >= 4) return 500;
    if (boostTier >= 3) return 1000;
    if (boostTier >= 2) return 2000;
    if (boostTier >= 1) return 2500;
    // No ai_autoboost — use ai_autogen tier 1 base value
    if ((tiers.ai_autogen || 0) >= 1) return 3000;
    return 0;
}

/**
 * Called by the autogen ticker instead of registerGenerationStep.
 * Handles minigen popup (or instant pick when timer=0) + batch bonus.
 * @param {number} batchBonus  Extra generations beyond the first.
 */
async function _autogenStep(batchBonus = 0) {
    if (!state.activeOrder) return;
    const timerMs = _getMinigenChoiceTimerMs();

    if (timerMs === 0) {
        // Instant: no popup, just count as correct
        registerGenerationStepWithResult('correct', true);
    } else {
        state.miniGenPopupActive = true;
        let result;
        try {
            result = await showMiniGenPopup({
                allowedTags: state.activeOrder?.miniGenTags,
                autoSelectMs: timerMs,
            });
        } finally {
            state.miniGenPopupActive = false;
        }
        registerGenerationStepWithResult(result, true);
    }

    // Batch bonus: extra gens — each runs its own minigen round
    for (let i = 0; i < batchBonus; i++) {
        if (!state.activeOrder) break;
        state.generationCooldownUntil = 0;
        if (timerMs === 0) {
            registerGenerationStepWithResult('correct', true);
        } else {
            state.miniGenPopupActive = true;
            let batchResult;
            try {
                batchResult = await showMiniGenPopup({
                    allowedTags: state.activeOrder?.miniGenTags,
                    autoSelectMs: timerMs,
                });
            } finally {
                state.miniGenPopupActive = false;
            }
            registerGenerationStepWithResult(batchResult, true);
        }
    }
}

// ─────────────────────────────────────────────────────────────
// Init
// ─────────────────────────────────────────────────────────────

function step(n, label, fn) {
    try {
        console.log(`[game] step ${n}: ${label}`);
        fn();
        console.log(`[game] step ${n} OK`);
    } catch (err) {
        const msg = `[game] CRASH at step ${n} (${label}): ${err.message}\n${err.stack}`;
        console.error(msg);
        // Show visible error overlay so user doesn't need DevTools
        const div = document.createElement('div');
        div.style.cssText = 'position:fixed;inset:0;z-index:9999;background:#1a0000;color:#ff4d4d;' +
            'font:14px monospace;padding:16px;white-space:pre-wrap;overflow:auto;pointer-events:auto;';
        div.textContent = '⚠ GAME INIT ERROR\n\n' + msg;
        document.body.appendChild(div);
        throw err;
    }
}

function init() {
    console.log('[game] init() start — module loaded OK');

    step(0,  'preloadAssets',        () => preloadAssets());
    step(1,  'loadState',            () => loadState());
    step(1.1,'reapplySkillTreeEffects', () => reapplySkillTreeEffects());
    step(1.2,'recomputeGenerationCooldown', () => recomputeGenerationCooldown());
    step(1.5,'initAudio',            () => initAudio());
    step(2,  'initHud',              () => initHud());
    step(3,  'initIntro',            () => initIntro());
    step(4,  'setEconomyCallbacks',  () => setEconomyCallbacks({
        onOrdersChanged: () => { refreshOpenMenu(); updateSidebarBadges(); },
        onStateChanged:  updateAllHud,
        onCh1Event:      fireCh1Event,
        onStressAdded:   spawnStressParticle,
        onNoCigs:        () => fireCh1Event('no_cigs_panic'),
        onAutogenStep:   _autogenStep,
    }));
    step(5,  'setIntroCallbacks',    () => setIntroCallbacks({
        onAddStress:          amount => addStress(amount),
        onSmokeBreak:         () => doSmokeBreak(),
        onUnlockAchievements: ids => { void ids; updateAchievementBadges(); },
        onRefreshLocks:       refreshSidebarLocks,
        onRefreshBadges:      updateSidebarBadges,
    }));
    step(5.5,'setUpgradesCallbacks', () => setUpgradesCallbacks({
        onCh1Event: fireCh1Event,
    }));
    step(6,  'bindSidebars',         () => bindSidebars());
    step(6.5,'initAchievementBadges',() => initAchievementBadges());
    step(7,  'bindGenerateButton',   () => bindGenerateButton(async () => {
        const label = state.activeOrder?.generateActionLabel;
        if (label && shouldShowMiniGen(label)) {
            if (getHeatLevel() >= 0.98) state.stats.genAtMaxHeatDone = true;
            const result = await showMiniGenPopup({ allowedTags: state.activeOrder?.miniGenTags });
            registerGenerationStepWithResult(result);
            // ai_batch: extra manual gens per press — each gets its own minigen round
            const _batch = _getManualBatchBonus();
            for (let i = 0; i < _batch; i++) {
                if (!state.activeOrder) break;
                state.generationCooldownUntil = 0;
                const _batchResult = await showMiniGenPopup({ allowedTags: state.activeOrder?.miniGenTags });
                registerGenerationStepWithResult(_batchResult);
            }
            // ai_heat: bonus gen chance based on current heat level
            if ((state.skillTree?.tiers?.ai_heat || 0) >= 1 && state.activeOrder) {
                const _heatChance = 0.1 + getHeatLevel() * 0.9;
                if (Math.random() < _heatChance) {
                    state.generationCooldownUntil = 0;
                    registerGenerationStepWithResult('correct');
                }
            }
        } else {
            if (getHeatLevel() >= 0.98) state.stats.genAtMaxHeatDone = true;
            registerGenerationStep(false);
            // ai_batch: extra manual gens per press (no minigen)
            const _batch = _getManualBatchBonus();
            for (let i = 0; i < _batch; i++) {
                if (!state.activeOrder) break;
                state.generationCooldownUntil = 0;
                registerGenerationStep(false);
            }
            // ai_heat: bonus gen chance
            if ((state.skillTree?.tiers?.ai_heat || 0) >= 1 && state.activeOrder) {
                const _heatChance = 0.1 + getHeatLevel() * 0.9;
                if (Math.random() < _heatChance) {
                    state.generationCooldownUntil = 0;
                    registerGenerationStep(false);
                }
            }
        }
    }));
    step(8,  'bindAutogenToggle',    () => bindAutogenToggle(() => {}));
    step(9,  'updateAllHud',         () => updateAllHud());
    step(10, 'startHudTicker',       () => startHudTicker());
    step(11, 'startSpawnTicker',     () => startSpawnTicker());
    step(12, 'startLifetimeTicker',  () => startLifetimeTicker());
    step(13, 'startAutogenTicker',   () => startAutogenTicker());
    step(14, 'startZenTicker',       () => startZenTicker());
    step(14.5,'startHeadhunterTicker',() => startHeadhunterTicker());
    step(14.8,'startAgentTicker',     () => startAgentTicker());

    // Show language picker on first run (no saved language preference)
    const startGame = () => {
        step(15, 'startIfNeeded',    () => startIfNeeded());
        step(16, 'startHomeMusic',   () => startHomeMusic());
        console.log('[game] init() complete — all steps passed');
    };
    if (!localStorage.getItem(Config.LANGUAGE_SAVE_KEY)) {
        showLanguagePicker(startGame);
    } else {
        startGame();
    }
}

// ─────────────────────────────────────────────────────────────
// Auto-save
// ─────────────────────────────────────────────────────────────

setInterval(saveState, 30_000);
setInterval(updateAchievementBadges, 500);

function _onVisibilityChange() {
    if (document.visibilityState === 'hidden') saveState();
}
document.addEventListener('visibilitychange', _onVisibilityChange);

// ─────────────────────────────────────────────────────────────
// Version check — shown before init() if build version changed
// ─────────────────────────────────────────────────────────────

function _checkBuildVersion(onContinue) {
    const stored  = localStorage.getItem(Config.BUILD_VERSION_KEY);
    const current = Config.BUILD_VERSION;
    const hasSave = !!localStorage.getItem(Config.SAVE_KEY);

    // Fresh install — no existing save, nothing to break
    if (!hasSave) {
        localStorage.setItem(Config.BUILD_VERSION_KEY, current);
        onContinue();
        return;
    }

    // Has save and version matches — all good
    if (stored === current) {
        onContinue();
        return;
    }

    // Has save but version is missing or outdated — show warning.
    // This covers players who played before version tracking was added (stored === null)
    // AND players on a genuinely outdated build.

    // Versions differ — show warning popup
    const isRu = (localStorage.getItem(Config.LANGUAGE_SAVE_KEY) || 'ru') === 'ru';
    const container = document.querySelector('.game-container') || document.body;

    const backdrop = document.createElement('div');
    backdrop.style.cssText = 'position:absolute;inset:0;z-index:99998;background:rgba(0,0,0,0.85);display:flex;align-items:center;justify-content:center;';

    const box = document.createElement('div');
    box.style.cssText = 'background:#1a1a2e;border:1px solid #ff4d4d;border-radius:8px;padding:24px 20px;max-width:320px;width:90%;display:flex;flex-direction:column;gap:14px;font-family:\'Tiny5\',monospace;color:#eee;text-align:center;';

    const title = document.createElement('div');
    title.style.cssText = 'font-size:16px;color:#ff4d4d;letter-spacing:1px;';
    title.textContent = isRu ? '⚠ ОБНОВЛЕНИЕ ИГРЫ' : '⚠ GAME UPDATED';

    const desc = document.createElement('div');
    desc.style.cssText = 'font-size:11px;line-height:1.6;color:#ccc;';
    desc.textContent = isRu
        ? `Версия изменилась с ${stored} на ${current}.\n\nВозможны конфликты с существующим сохранением. Рекомендуем сбросить прогресс для стабильной работы.`
        : `Version changed from ${stored} to ${current}.\n\nYour save may conflict with the new version. A full reset is recommended for stability.`;

    const btnContinue = document.createElement('button');
    btnContinue.type = 'button';
    btnContinue.style.cssText = 'padding:10px;background:#2a2a4a;border:1px solid #555;border-radius:4px;color:#eee;font-family:\'Tiny5\',monospace;font-size:12px;cursor:pointer;';
    btnContinue.textContent = isRu ? 'ПРОДОЛЖИТЬ С СОХРАНЕНИЕМ' : 'KEEP SAVE & CONTINUE';

    const btnReset = document.createElement('button');
    btnReset.type = 'button';
    btnReset.style.cssText = 'padding:10px;background:#3a1a1a;border:1px solid #ff4d4d;border-radius:4px;color:#ff4d4d;font-family:\'Tiny5\',monospace;font-size:12px;cursor:pointer;';
    btnReset.textContent = isRu ? 'ПОЛНЫЙ СБРОС' : 'FULL RESET';

    box.appendChild(title);
    box.appendChild(desc);
    box.appendChild(btnContinue);
    box.appendChild(btnReset);
    backdrop.appendChild(box);
    container.appendChild(backdrop);

    btnContinue.addEventListener('click', () => {
        localStorage.setItem(Config.BUILD_VERSION_KEY, current);
        backdrop.remove();
        onContinue();
    });

    btnReset.addEventListener('click', () => {
        if (typeof window.__resetSave === 'function') {
            backdrop.remove();
            window.__resetSave(false);
        } else {
            // Fallback: clear keys and reload
            [Config.SAVE_KEY, Config.FOREST_SAVE_KEY, Config.CHAPTERS_SAVE_KEY].forEach(k => localStorage.removeItem(k));
            localStorage.setItem(Config.BUILD_VERSION_KEY, current);
            location.reload();
        }
    });
}

// ─────────────────────────────────────────────────────────────
// Dev helpers (accessible from browser console)
// ─────────────────────────────────────────────────────────────

// ─────────────────────────────────────────────────────────────
// Chapter 2 quick-start: pre-built save that mirrors end of ch1
// ─────────────────────────────────────────────────────────────

function _buildChapter2SaveData() {
    return {
        v: Config.SAVE_VERSION,

        // Economy
        funds: '500',
        prestige: 0, virtualPrestigePool: 0, prestigeTransferRatioBonus: 0, knownness: 0,

        // Leveling
        level: 1, xp: '0', xpToNext: '100', skillPoints: 1, expertPoints: 0,

        // Orders
        orders: [], forcedStoryOrderId: null,
        completedStoryOrderIds: ['post_portfolio', 'green_balls_1', 'green_balls_2', 'call_with_client', 'outistic_contract'],
        researchTaskCompletions: { payment_research: 1, google_freelance: 1 },

        // Generation
        job_chance: 0, storyChanceBonus: 0,
        headhunterSpawnSec: 30,
        activeResearchPool: null,
        generationCooldownMs: 5000, generationCooldownUntil: 0,
        autogenEnabled: false,

        // Stress & Smoking
        stress: 0, smokeUntil: 0, smokeBreakCount: 0,
        nicotineWithdrawal: false, cigaretteButts: 0,

        // Goods
        goods: { cigarettes: 25, cigsAutoBuy: false, energizerActive: false, vitaminsActive: false },
        upgrades: { autogen: false, headhunter: false, brandmentor: false },

        // Menus — all unlocked (ch1Complete sets all to true)
        unlockedMenus: {
            upgrades: true, research: true, promotion: true,
            goods: true, clothes: true, property: true, shop: true,
        },
        unlockedTaskTypes: ['luck'],

        // Unlocked special tasks for ch2
        unlockedSpecialTasks: {
            outistic_work: true,
            post_insta:    true,
            ai_course:     true,
            ai_agents_1:   true,
            ai_agents_2:   true,
            automation:    true,
            ai_exam:       true,
        },

        // Skill tree — ai_chatPRO purchased
        upgradesIntroSeen: true,
        skillTree: {
            purchased: { core_designer: true, ai_chatPRO: true },
            tiers: { core_designer: 1, ai_chatPRO: 1 },
            viewport: { panX: 0, panY: 0, zoom: 1 },
            forestUnlockedPermanently: false,
        },

        // Story / chapter flags
        chapter1Completed: true,
        chapter2Completed: false,
        ch1FiredEvents: {
            no_cigs_panic: true,
            story_fail_post_portfolio: true,
            story_complete_post_portfolio: true,
            ch1_upgrades_first_open: true,
            ch1_upgrades_first_close: true,
            ch1_spam_inject: true,
            special_complete_spam_cg_chats: true,
            special_gen_google_freelance_1: true,
            special_gen_google_freelance_2: true,
            special_complete_google_freelance: true,
            special_gen_spam_again_4: true,
            special_complete_spam_again: true,
            ch1_green_balls_1_inject: true,
            story_gen_green_balls_1_1: true,
            story_complete_green_balls_1: true,
            story_fail_green_balls_1: true,
            funds_reached_1000: true,
            skill_node_blocked_ai_chatPRO: true,
            special_complete_payment_research: true,
            skill_node_purchased_ai_chatPRO: true,
            story_complete_green_balls_2: true,
            story_fail_green_balls_2: true,
            ch1_call_inject: true,
            outfit_gate_start_call_with_client: true,
            special_complete_find_tshirt: true,
            clothes_first_purchase: true,
            story_gen_call_with_client_1: true,
            story_fail_call_with_client: true,
            story_complete_call_with_client: true,
            story_fail_outistic_contract: true,
            story_complete_outistic_contract: true,
            ch1_post_meeting: true,
        },
        pendingStoryOutro: false,

        // Intro / tutorial — all done
        language: 'ru',
        introCompleted: true,
        tutorialMode: false,
        tutorialCompleted: true,
        tutorialSkipped: true,
        characterRevealed: true,
        tutorialWait: { waiting: false, type: null, menuOpened: false },
        menuTutorialSeen: { hub: true, orders: true, story: true, research: true, promotion: true },
        shownCharacterComments: {
            chat_generation_after_first_once:  true,
            chat_generation_after_third_once:  true,
            chat_generation_after_fourth_once: true,
        },
        miniGenTutorialSeen: true,
        miniGenPopupActive: false,

        // Player
        playerName: null, currentOutfit: 0,

        // Wardrobe — t-shirt and socks variants unlocked by ch1
        wardrobeOwned:    { cap: [1], hoodie: [1], tshirt: [1], pants: [1], socks: [1] },
        wardrobeSelected: { cap: 1,   hoodie: 1,   tshirt: 1,   pants: 1,   socks: 1   },
        wardrobeUnlockedVariants: { socks_white: true, socks_black: true },
        selectedOutfitTag: null,
        wardrobeUnlockedOutfits: {},

        // Agent income
        agentLastFundsSnapshot: '0',

        // Per-mechanic state
        neuralStack: 0, smokeSkipCharges: 0, focusSkipChance: 0, postSmokeDecayBoostUntil: 0,

        // Stats — fresh for new run
        stats: {
            completedOrders: 0, failedOrders: 0,
            totalMoneyEarned: '0', totalMoneySpent: '0',
            totalSmokeBreaks: 0, stressRelievedByCigarettes: 0,
            totalCigaretteButtsEarned: 0,
            manualGenerations: 0, autogenGenerations: 0,
        },

        claimedAchievements: {},
    };
}

window.__resetSave = (skipNativePrompt = false, mode = 'scratch') => {
    if (!skipNativePrompt && !confirm('Уйти в лес и сбросить всё?')) return;
    // 1. Prevent any in-flight async ticker from re-saving after we wipe
    disableSave();
    // 2. Stop all tickers so no more completeOrder/saveState can be called
    stopAllTickers();
    // 3. Preserve keys that survive reset
    const chaptersRaw = localStorage.getItem(Config.CHAPTERS_SAVE_KEY);
    const langRaw     = localStorage.getItem(Config.LANGUAGE_SAVE_KEY);
    // 4. Wipe all localStorage keys for this game
    localStorage.clear();
    // 5. Restore surviving keys
    if (chaptersRaw) localStorage.setItem(Config.CHAPTERS_SAVE_KEY, chaptersRaw);
    if (langRaw)     localStorage.setItem(Config.LANGUAGE_SAVE_KEY, langRaw);
    // 6. For ch2 mode — write pre-built chapter 2 start save
    if (mode === 'ch2') {
        localStorage.setItem(Config.SAVE_KEY, JSON.stringify(_buildChapter2SaveData()));
    }
    // 7. Detach visibility handler (belt-and-suspenders)
    document.removeEventListener('visibilitychange', _onVisibilityChange);
    // 8. Navigate (location.replace skips Back-button BFCache)
    location.replace(location.pathname);
};

// ─────────────────────────────────────────────────────────────
// Boot
// ─────────────────────────────────────────────────────────────

_checkBuildVersion(() => init());
