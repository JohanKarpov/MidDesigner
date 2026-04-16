// src/ui-hud.js — Read state, write to HUD DOM elements

import { state } from './state.js';
import { Config } from './config.js';
import { playMainButtonLockedSfx, playMainButtonHeatStarsSfx, setMainButtonHeatSfxLevel } from './audio.js';
import { getLang, t } from './i18n.js';
import { stopRepeatableTask, setActiveOrderAutoRepeat, addStress, getEffectiveStressMax, tickSmokeRelief } from './economy.js';

// ─────────────────────────────────────────────────────────────
// Element cache — populated once by initHud()
// ─────────────────────────────────────────────────────────────

let el = {};

// ─────────────────────────────────────────────────────────────
// Module-level effect state
// ─────────────────────────────────────────────────────────────

let _stressState    = 'normal'; // 'normal' | 'low' | 'zero'
let _stressDisplayed = -1;      // smoothly interpolated stress %, -1 = uninitialised
let _heatLevel  = 0;            // 0..1 — current heat amount
let _heatTimer  = null;         // decay interval id

const PARTICLE_IMGS = Array.from({ length: 8 }, (_, i) => `UI/particles/stars-${i + 1}.png`);
const MIN_GEN_PARTICLE_COUNT = 20;
const MAX_GEN_PARTICLE_COUNT = 93;

const WORK_PARTICLE_IMGS = {
    orders:    'UI/particles/particle-order.png',
    story:     'UI/particles/particle-story.png',
    research:  'UI/particles/particle-research.png',
    promotion: 'UI/particles/particle-promo.png',
};

function resolveActionLabel(value, fallback = 'Работать') {
    if (typeof value === 'string' && value.trim()) return value.trim();
    if (!value || typeof value !== 'object') return fallback;
    if (typeof value.locKey === 'string' && value.locKey.trim()) {
        return String(t(value.locKey) || '').trim() || fallback;
    }
    const lang = getLang();
    return String(value[lang] || value.ru || value.en || '').trim() || fallback;
}

export function initHud() {
    el = {
        money:         document.getElementById('money-value'),
        prestige:      document.getElementById('prestige-value'),
        cig:           document.getElementById('cig-value'),
        xpFill:        document.querySelector('.xp-fill'),
        xpText:        document.querySelector('.xp-text'),
        lvlBadge:      document.querySelector('.lvl-badge'),
        stressBar:     document.querySelector('.bar--stress'),
        stressFill:    document.querySelector('.bar--stress .bar-fill'),
        timerFill:     document.querySelector('.task-timer-fill'),
        genBtn:        document.getElementById('generate-btn'),
        genLabel:      document.getElementById('gen-btn-label'),
        agentToggle:   document.getElementById('agent-toggle'),
        autogenToggle: document.getElementById('autogen-toggle'),
        character:         document.getElementById('character-sprite'),
        repeatBtn:         document.getElementById('task-repeat-btn'),
        researchPoolWrap:  document.getElementById('research-pool-wrap'),
        researchPoolFill:  document.getElementById('research-pool-fill'),
        researchPoolLabel: document.getElementById('research-pool-label'),
    };

    if (el.repeatBtn) {
        el.repeatBtn.addEventListener('click', () => {
            import('./audio.js').then(({ sfx }) => sfx('click')).catch(() => {});
            // Handle stop during smoke break between batches
            if (!state.activeOrder && state.pendingAutoRepeatSpecialTaskId) {
                delete state.pendingAutoRepeatSpecialTaskId;
                import('./state.js').then(({ saveState }) => saveState()).catch(() => {});
                updateAllHud();
                return;
            }
            if (!state.activeOrder) return;
            if (state.activeOrder.autoRepeat) {
                stopRepeatableTask();
            } else {
                setActiveOrderAutoRepeat(true);
            }
        });
    }

    // Inject heat glow div as first child of gen-btn (behind PNG via z-index:-1)
    if (el.genBtn) {
        el.genBtnImg = el.genBtn.querySelector('img');

        const heatEl = document.createElement('div');
        heatEl.className = 'gen-btn-heat';
        heatEl.setAttribute('aria-hidden', 'true');
        el.genBtn.insertBefore(heatEl, el.genBtn.firstChild);
        el.genHeat = heatEl;

        // Inject flash overlay — sits above PNG img, below label (DOM order)
        const flashEl = document.createElement('div');
        flashEl.className = 'gen-btn-flash';
        flashEl.setAttribute('aria-hidden', 'true');
        const label = el.genBtn.querySelector('.gen-btn-label');
        el.genBtn.insertBefore(flashEl, label || null);
        el.genFlash = flashEl;
    }
}

// ─────────────────────────────────────────────────────────────
// Formatters
// ─────────────────────────────────────────────────────────────

function formatLargeInt(n) {
    const d = n instanceof Decimal ? n : new Decimal(n);
    if (d.e < 6)  return d.toNumber().toLocaleString('ru-RU');
    if (d.e < 9)  return (d.toNumber() / 1e6).toFixed(1)  + 'M';
    if (d.e < 12) return (d.toNumber() / 1e9).toFixed(1)  + 'B';
    if (d.e < 15) return (d.toNumber() / 1e12).toFixed(1) + 'T';
    return d.toExponential(2);
}

function formatFunds(n) {
    // Decimal or number — pick readable format based on magnitude
    const d = n instanceof Decimal ? n : new Decimal(n);
    const e = d.e; // exponent (order of magnitude)
    if (e < 6)  return d.toNumber().toLocaleString('ru-RU') + ' ₽';
    if (e < 9)  return (d.toNumber() / 1e6).toFixed(2)  + ' млн ₽';
    if (e < 12) return (d.toNumber() / 1e9).toFixed(2)  + ' млрд ₽';
    if (e < 15) return (d.toNumber() / 1e12).toFixed(2) + ' трлн ₽';
    return d.toExponential(2) + ' ₽';
}

function _applyGenerateButtonFilter(btnState, cooldownProgress) {
    if (!el.genBtnImg) return;

    switch (btnState) {
        case 'smoke':
            el.genBtnImg.style.filter = 'sepia(0.7) saturate(0.5) brightness(0.6)';
            break;
        case 'idle':
            el.genBtnImg.style.filter = 'grayscale(0.7) brightness(0.6)';
            break;
        case 'cooldown': {
            const progress = Math.max(0, Math.min(1, cooldownProgress || 0));
            const saturation = 0.02 + progress * 0.98;
            const brightness = 0.68 + progress * 0.32;
            el.genBtnImg.style.filter = `saturate(${saturation.toFixed(3)}) brightness(${brightness.toFixed(3)})`;
            break;
        }
        default:
            el.genBtnImg.style.filter = 'none';
            break;
    }
}

// ─────────────────────────────────────────────────────────────
// Update functions
// ─────────────────────────────────────────────────────────────

export function updateAllHud() {
    if (el.money)    el.money.textContent    = formatFunds(state.funds);
    if (el.prestige) el.prestige.textContent = state.prestige;
    if (el.cig)      el.cig.textContent      = state.goods.cigarettes;

    // XP bar
    const xpPct = state.xpToNext.gt(0) ? state.xp.div(state.xpToNext).mul(100).toNumber().toFixed(1) : '0';
    if (el.xpFill) el.xpFill.style.width = xpPct + '%';
    if (el.xpText) el.xpText.textContent = formatLargeInt(state.xp) + ' / ' + formatLargeInt(state.xpToNext);

    // Level badge
    if (el.lvlBadge) el.lvlBadge.textContent = 'Lvl: ' + state.level;

    // Stress bar — apply gradual smoke relief, then lerp display value for smoothness
    tickSmokeRelief();
    const stressMax    = getEffectiveStressMax();
    const stressTarget = state.stress / stressMax * 100;
    if (_stressDisplayed < 0) {
        // First call: initialise without lerp
        _stressDisplayed = stressTarget;
    } else if (stressTarget > _stressDisplayed) {
        // Stress rising — track quickly so the player sees danger
        _stressDisplayed += (stressTarget - _stressDisplayed) * 0.45;
    } else {
        // Stress falling — smooth gradual animation
        _stressDisplayed += (stressTarget - _stressDisplayed) * 0.15;
        if (Math.abs(_stressDisplayed - stressTarget) < 0.04) _stressDisplayed = stressTarget;
    }
    if (el.stressFill) el.stressFill.style.width = _stressDisplayed.toFixed(2) + '%';
    _updateStressVis();

    // Generate button state
    if (el.genBtn) {
        const now = Date.now();
        const onCooldown = now < state.generationCooldownUntil;
        const isSmoking  = state.currentStatus === Config.STATUS.SMOKE;
        const noOrder    = !state.activeOrder;
        const cooldownRemainingMs = Math.max(0, state.generationCooldownUntil - now);
        const cooldownProgress = onCooldown && state.generationCooldownMs > 0
            ? Math.max(0, Math.min(1, 1 - (cooldownRemainingMs / state.generationCooldownMs)))
            : 0;

        const btnState = isSmoking ? 'smoke'
                       : noOrder   ? 'idle'
                       : onCooldown ? 'cooldown'
                       : 'ready';

        const _cigLungsActive = !!state.skillTree?.purchased?.cig_lungs;
        el.genBtn.disabled = (isSmoking && !_cigLungsActive) || noOrder || onCooldown;
        el.genBtn.dataset.state = btnState;
        el.genBtn.style.setProperty('--cooldown-progress', cooldownProgress.toFixed(3));
        _applyGenerateButtonFilter(btnState, cooldownProgress);

        const wasOnCooldown = !!el.genBtn._wasOnCooldown;
        if (wasOnCooldown && !onCooldown && !isSmoking && !noOrder) {
            el.genBtn.classList.remove('gen-btn--ready-pop');
            void el.genBtn.offsetWidth;
            el.genBtn.classList.add('gen-btn--ready-pop');
        }
        el.genBtn._wasOnCooldown = onCooldown;

        // Fade in/out based on whether a task is active (or pending after smoke break)
        const hasTask = !noOrder || !!state.pendingAutoRepeatSpecialTaskId;
        if (el.genBtn._hasTask !== hasTask) {
            el.genBtn._hasTask = hasTask;
            if (hasTask) {
                el.genBtn.style.transition = 'opacity 0.15s ease, transform 0.08s ease';
                el.genBtn.style.opacity = '1';
            } else {
                el.genBtn.style.transition = 'opacity 0.8s ease, transform 0.08s ease';
                el.genBtn.style.opacity = '0';
            }
        }

        if (el.genLabel) {
            if (isSmoking) {
                el.genLabel.textContent = 'Курим...';
            } else if (noOrder) {
                el.genLabel.textContent = 'Нет задачи';
            } else if (onCooldown) {
                el.genLabel.textContent = getLang() === 'ru' ? 'Загрузка...' : 'Loading...';
            } else {
                const order = state.activeOrder;
                const done = order.generationsAttempted;
                const total = order.requiredGenerations;
                const actionLabel = resolveActionLabel(order.generateActionLabel, 'Работать');
                el.genLabel.textContent = `${actionLabel} ${done}/${total}`;
            }
        }
    }

    // Autogen toggle state — only visible after ai_autogen (tier 1+) purchased
    if (el.autogenToggle) {
        const autogenUnlocked = (state.skillTree?.tiers?.ai_autogen || 0) >= 1;
        el.autogenToggle.hidden = !autogenUnlocked;
        el.autogenToggle.dataset.active = state.autogenEnabled ? 'true' : 'false';
    }

    // Repeat task button (Авто повтор / Закончить)
    if (el.repeatBtn) {
        const order = state.activeOrder;
        const hasPending = !!state.pendingAutoRepeatSpecialTaskId;
        // Show for active repeatable tasks OR during smoke break between batches
        if ((order?.isSpecial && order?.repeatable) || hasPending) {
            el.repeatBtn.hidden = false;
            if (order?.autoRepeat || hasPending) {
                el.repeatBtn.textContent = getLang() === 'ru' ? 'Закончить' : 'Stop';
                el.repeatBtn.dataset.mode = 'stop';
            } else {
                el.repeatBtn.textContent = getLang() === 'ru' ? 'Авто повтор' : 'Auto repeat';
                el.repeatBtn.dataset.mode = 'start';
            }
        } else {
            el.repeatBtn.hidden = true;
        }
    }

    // Task timer fill
    updateTaskTimerHud();

    // Research pool bar
    const pool = state.activeResearchPool;
    if (el.researchPoolWrap) {
        el.researchPoolWrap.classList.toggle('active', !!pool);
        if (pool && el.researchPoolFill) {
            const pct = pool.xp.div(pool.xpRequired).mul(100).toNumber();
            el.researchPoolFill.style.height = Math.min(100, pct).toFixed(1) + '%';
            if (el.researchPoolLabel) {
                el.researchPoolLabel.textContent = formatLargeInt(pool.xp) + ' / ' + formatLargeInt(pool.xpRequired);
            }
        }
    }

    // Character sprite
    updateCharacterSprite();

    // Property overlay layers
    updatePropertyLayers();
}

// ─────────────────────────────────────────────────────────────
// Character sprite helpers
// ─────────────────────────────────────────────────────────────

const _SPRITE_STATE_NAMES = { rest: 'Idle', work: 'Work', smoke: 'Smoke' };
const _SPRITE_SLOT_ORDER  = ['cap', 'hoodie', 'tshirt', 'pants', 'socks'];
const _SPRITE_SLOT_CODES  = { cap: 'c', hoodie: 'h', tshirt: 't', pants: 'p', socks: 's' };

/** Returns the sprite PNG path for a given game status and wardrobe selection map. */
export function getOutfitSpriteUrl(statusKey, selected) {
    const name = _SPRITE_STATE_NAMES[statusKey] || 'Idle';
    // Full costume override
    if (state.selectedOutfitTag) return `images/PixelEgorus/Pix${state.selectedOutfitTag}-${name}.png`;
    // Show outfit-based sprite only when a t-shirt is actually equipped.
    // Until then, use the old "dirty t-shirt" fallback sprite.
    if (selected?.tshirt == null) return `images/PixelEgorus/PixE-${name}-1.png`;
    const code = _SPRITE_SLOT_ORDER.map(id => `${_SPRITE_SLOT_CODES[id]}${selected[id] ?? 1}`).join('-');
    return `images/PixelEgorus/PixE-${name}-${code}.png`;
}

// Status → layout config (no more hardcoded src)
const SPRITE_CONFIG = {
    rest:  { width: '0.5',  left: '50%',  bottom: '10%', transform: 'translateX(-50%)' },
    work:  { width: '0.57', left: '30%',  bottom: '18%', transform: '' },
    smoke: { width: '0.48', left: '68%',  bottom: '18%', transform: '' },
};

export function updateCharacterSprite() {
    if (!el.character) return;
    const status = state.currentStatus || 'rest';
    const cfg    = SPRITE_CONFIG[status] || SPRITE_CONFIG.rest;
    const newSrc = getOutfitSpriteUrl(status, state.wardrobeSelected || {});
    el.character.src             = newSrc;
    el.character.style.width     = `calc(var(--container-width) * ${cfg.width})`;
    el.character.style.left      = cfg.left;
    el.character.style.transform = cfg.transform;
    // When bed is active and character is working, shift sprite slightly upward
    const _locId   = state.property?.activeLocationId || 'abandoned';
    const _bedOn   = state.property?.locations?.[_locId]?.items?.bed?.active ?? false;
    el.character.style.bottom = (status === 'work' && _bedOn) ? '24%' : cfg.bottom;
}

export function updateTaskTimerHud() {
    if (!el.timerFill) return;
    const order = state.activeOrder;
    if (!order || !order.startedAt || order.taskCategory !== Config.TASK_CATEGORIES.ORDERS) {
        el.timerFill.style.width = '0%';
        return;
    }
    const totalMs   = (order.durationSec || 60) * 1000;
    const elapsedMs = Date.now() - order.startedAt;
    const pct = Math.max(0, (1 - elapsedMs / totalMs) * 100).toFixed(1);
    el.timerFill.style.width = pct + '%';
}

/** Sync visibility of bg-layer <img> elements to property state. */
export function updatePropertyLayers() {
    const locationId = state.property?.activeLocationId || 'abandoned';
    const loc = state.property?.locations?.[locationId];
    if (!loc) return;
    for (const [itemId, itemState] of Object.entries(loc.items || {})) {
        const layerEl = document.getElementById(`bg-layer-${locationId}-${itemId}`);
        if (layerEl) layerEl.hidden = !(itemState.purchased && itemState.active);
    }
}

// ─────────────────────────────────────────────────────────────
// Ticker — call updateAllHud on interval
// ─────────────────────────────────────────────────────────────

let _hudTickerId = null;

export function startHudTicker() {
    if (_hudTickerId) clearInterval(_hudTickerId);
    _stressDisplayed = -1; // reset so first updateAllHud snaps without lerp
    _hudTickerId = setInterval(updateAllHud, 50);
}

export function stopHudTicker() {
    clearInterval(_hudTickerId);
    _hudTickerId = null;
}

// ─────────────────────────────────────────────────────────────
// Stress bar visibility (fades out at low/zero stress)
// ─────────────────────────────────────────────────────────────

function _updateStressVis() {
    const bar = el.stressBar;
    if (!bar) return;
    const fraction = state.stress / getEffectiveStressMax();

    if (state.stress <= 0) {
        if (_stressState !== 'zero') {
            _stressState = 'zero';
            bar.style.transition = 'opacity 2s ease';
            bar.style.opacity    = '0';
        }
    } else if (fraction < 0.15) {
        _stressState = 'low';
        bar.style.transition = 'opacity 0.4s ease';
        bar.style.opacity    = (fraction / 0.15).toFixed(3);
    } else {
        if (_stressState !== 'normal') {
            _stressState = 'normal';
            bar.style.transition = 'opacity 0.5s ease';
            bar.style.opacity    = '1';
        }
    }
}

// ─────────────────────────────────────────────────────────────
// Gen-button heat glow system
// ─────────────────────────────────────────────────────────────

export function getHeatLevel() { return _heatLevel; }

function _applyHeat() {
    if (el.genHeat) el.genHeat.style.opacity = _heatLevel.toFixed(3);
    setMainButtonHeatSfxLevel(_heatLevel);
}

function _startHeatDecay() {
    if (_heatTimer) return;
    _heatTimer = setInterval(() => {
        _heatLevel = Math.max(0, _heatLevel - 0.035);
        _applyHeat();
        if (_heatLevel <= 0) {
            clearInterval(_heatTimer);
            _heatTimer = null;
        }
    }, 100);
}

function _addHeat(amount) {
    _heatLevel = Math.min(1, _heatLevel + amount);
    _applyHeat();
    _startHeatDecay();
}

// ─────────────────────────────────────────────────────────────
// Particle burst on successful generation
// ─────────────────────────────────────────────────────────────

function _triggerFlash() {
    const f = el.genFlash;
    if (!f) return;
    // Snap to full, then transition out
    f.style.transition = 'none';
    f.style.opacity    = '1';
    requestAnimationFrame(() => requestAnimationFrame(() => {
        f.style.transition = 'opacity 0.4s ease-out';
        f.style.opacity    = '0';
    }));
}

function _spawnParticles() {
    const btn = el.genBtn;
    if (!btn) return 0;
    const container = btn.closest('.game-container') || document.body;
    const btnRect   = btn.getBoundingClientRect();
    const ctxRect   = container.getBoundingClientRect();
    const r         = ctxRect.width / 1080;                            // screen→canvas scale
    // More sparks at higher heat — _heatLevel is 0..1
    const baseCount = 20 + Math.floor(Math.random() * 12);             // 20–31 base
    const COUNT     = Math.round(baseCount * (1 + _heatLevel * 2));    // up to 3× at full heat
    const isMaxHeat = _heatLevel >= 0.85;

    // Sparks burst from any point along the button's upper surface
    const spawnLeft  = (btnRect.left - ctxRect.left) + btnRect.width * 0.08;
    const spawnWidth = btnRect.width * 0.84;
    const originY    = (btnRect.top  - ctxRect.top)  + btnRect.height * 0.35;

    const BASE_SIZE = r * 36; // 36 canvas-units at full scale

    for (let i = 0; i < COUNT; i++) {
        const img = document.createElement('img');
        img.className = 'gen-particle';
        img.src = PARTICLE_IMGS[Math.floor(Math.random() * PARTICLE_IMGS.length)];
        img.setAttribute('aria-hidden', 'true');

        const size    = BASE_SIZE * (0.15 + Math.random() * 0.85);     // 15% – 100% of base
        const originX  = spawnLeft + Math.random() * spawnWidth;        // spread across button
        const angle   = -Math.PI * (0.06 + Math.random() * 0.88);      // –11° to –162° (upper burst)
        const v0      = r * (260 + Math.random() * 360);               // fast initial speed
        const gravity = r * (550 + Math.random() * 550);               // arc strength (varies)
        const durBonus = isMaxHeat ? (200 + Math.random() * 200) : 0;  // longer life at max heat
        const dur     = 320 + Math.random() * 580 + durBonus;          // 320–900 base + bonus
        const vx      = Math.cos(angle) * v0;
        const vy      = Math.sin(angle) * v0;
        const rotDir  = Math.random() > 0.5 ? 1 : -1;
        const rotSpd  = r * (80 + Math.random() * 300);                // deg/s

        img.style.cssText = `left:${originX}px;top:${originY}px;width:${size.toFixed(1)}px;height:auto;opacity:1;`;
        if (isMaxHeat) img.style.filter = 'brightness(1.65) saturate(1.3)';
        container.appendChild(img);

        const delay = Math.random() * 60; // 0–60 ms micro-stagger for burst feel
        setTimeout(() => {
            const t0   = performance.now();
            const tick = (t) => {
                const elapsed = t - t0;
                const p       = Math.min(1, elapsed / dur);
                const t_s     = elapsed / 1000;

                // Physics: initial velocity + gravity pulling down
                const curX    = originX + vx * t_s;
                const curY    = originY + vy * t_s + 0.5 * gravity * t_s * t_s;

                // Fade: smooth, slightly slow-in at the end
                const opacity = Math.pow(1 - p, 1.2);
                // Slight shrink over lifetime
                const scale   = 0.6 + 0.4 * (1 - p * 0.7);
                const rot     = rotDir * rotSpd * t_s;

                img.style.left      = curX.toFixed(1) + 'px';
                img.style.top       = curY.toFixed(1) + 'px';
                img.style.opacity   = opacity.toFixed(3);
                img.style.transform = `scale(${scale.toFixed(3)}) rotate(${rot.toFixed(1)}deg)`;

                if (p < 1) requestAnimationFrame(tick);
                else       img.remove();
            };
            requestAnimationFrame(tick);
        }, delay);
    }

    return COUNT;
}

function _getHeatStarsVolumeScale(particleCount) {
    const clamped = Math.max(MIN_GEN_PARTICLE_COUNT, Math.min(MAX_GEN_PARTICLE_COUNT, particleCount || 0));
    return (clamped - MIN_GEN_PARTICLE_COUNT) / (MAX_GEN_PARTICLE_COUNT - MIN_GEN_PARTICLE_COUNT);
}

// ─────────────────────────────────────────────────────────────
// Work-type floating particle (near character sprite)
// ─────────────────────────────────────────────────────────────

function _spawnWorkParticle() {
    const char = el.character;
    if (!char || !state.activeOrder) return;

    const container = char.closest('.game-container') || document.body;
    const ctxRect   = container.getBoundingClientRect();
    const charRect  = char.getBoundingClientRect();
    const r         = ctxRect.width / 1080;

    // Spawn point as fraction of sprite's rendered size — adjust to taste
    const FX = 0.6;  // 0=left edge, 1=right edge
    const FY = 0.25; // 0=top edge,  1=bottom edge
    const spawnX = (charRect.left - ctxRect.left) + FX * charRect.width;
    const spawnY = (charRect.top  - ctxRect.top)  + FY * charRect.height;
    const size       = r * 96;
    const floatDist  = r * 32; // total upward travel across entire lifetime

    const category = state.activeOrder.taskCategory || 'orders';
    const src = WORK_PARTICLE_IMGS[category] || WORK_PARTICLE_IMGS.orders;

    const img = document.createElement('img');
    img.src = src;
    img.setAttribute('aria-hidden', 'true');
    img.style.cssText =
        `position:absolute;pointer-events:none;z-index:8;` +
        `width:${size.toFixed(1)}px;height:auto;` +
        `left:${(spawnX - size * 0.5).toFixed(1)}px;` +
        `top:${spawnY.toFixed(1)}px;` +
        `opacity:0;transform-origin:center center;`;
    container.appendChild(img);

    // ── Timeline (ms) ─────────────────────────────────────────
    const T_POP    = 110; // scale 0.3 → 1.2  + fade in
    const T_SETTLE =  80; // scale 1.2 → 1.0
    const T_HOLD   = 300; // hold opacity
    const T_FADE   = 180; // dissolve
    const T_TOTAL  = T_POP + T_SETTLE + T_HOLD + T_FADE;

    const t0 = performance.now();
    const tick = (now) => {
        const e = now - t0;
        let sc, op;

        // ── Vertical float runs from t=0 across the full lifetime ─
        const fp  = Math.min(1, e / T_TOTAL);
        const fep = 1 - Math.pow(1 - fp, 2.5); // easeOutPow — fast start, smooth stop
        const dy  = floatDist * fep;

        if (e < T_POP) {
            // Pop in: overshoot scale, fade in quickly
            const p = e / T_POP;
            const ep = 1 - Math.pow(1 - p, 2); // easeOutQuad
            sc = 0.3 + (1.22 - 0.3) * ep;
            op = Math.min(1, p * 2.5);
        } else if (e < T_POP + T_SETTLE) {
            // Settle: scale 1.22 → 1.0
            const p = (e - T_POP) / T_SETTLE;
            sc = 1.22 - 0.22 * p;
            op = 1;
        } else if (e < T_POP + T_SETTLE + T_HOLD) {
            // Hold: fully visible
            sc = 1;
            op = 1;
        } else if (e < T_TOTAL) {
            // Dissolve
            const p = (e - T_POP - T_SETTLE - T_HOLD) / T_FADE;
            sc = 1 + 0.06 * p;
            op = 1 - p;
        } else {
            img.remove();
            return;
        }

        img.style.opacity   = op.toFixed(3);
        img.style.transform = `scale(${sc.toFixed(3)})`;
        img.style.top       = (spawnY - dy).toFixed(1) + 'px';
        requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
}

// ─────────────────────────────────────────────────────────────
// Stress floating label (above character head)
// ─────────────────────────────────────────────────────────────

export function spawnStressParticle(amount) {
    const char = el.character;
    if (!char) return;

    const container = char.closest('.game-container') || document.body;
    const ctxRect   = container.getBoundingClientRect();
    const charRect  = char.getBoundingClientRect();
    const r         = ctxRect.width / 1080;

    // Spawn above the character's head (top-center of sprite)
    const spawnX = (charRect.left - ctxRect.left) + 0.5 * charRect.width;
    const spawnY = (charRect.top  - ctxRect.top)  + 0.08 * charRect.height;

    const label = amount != null ? `+${Math.round(amount)} stress` : '+stress';
    const floatDist = r * 48;

    const div = document.createElement('div');
    div.setAttribute('aria-hidden', 'true');
    div.textContent = label;
    div.style.cssText =
        `position:absolute;pointer-events:none;z-index:20;` +
        `font-family:inherit;font-size:${(r * 28).toFixed(1)}px;font-weight:700;` +
        `color:#ff4444;text-shadow:0 1px 4px #000,0 0 8px #ff0000;` +
        `white-space:nowrap;transform-origin:center bottom;` +
        `left:${spawnX.toFixed(1)}px;top:${spawnY.toFixed(1)}px;` +
        `transform:translateX(-50%);opacity:0;`;
    container.appendChild(div);

    const T_POP   = 130;
    const T_HOLD  = 320;
    const T_FADE  = 200;
    const T_TOTAL = T_POP + T_HOLD + T_FADE;

    const t0 = performance.now();
    const tick = (now) => {
        const e = now - t0;
        let sc, op;

        const fp  = Math.min(1, e / T_TOTAL);
        const fep = 1 - Math.pow(1 - fp, 2.5);
        const dy  = floatDist * fep;

        if (e < T_POP) {
            const p = e / T_POP;
            const ep = 1 - Math.pow(1 - p, 2);
            sc = 0.4 + (1.18 - 0.4) * ep;
            op = Math.min(1, p * 2.5);
        } else if (e < T_POP + T_HOLD) {
            sc = 1;
            op = 1;
        } else if (e < T_TOTAL) {
            const p = (e - T_POP - T_HOLD) / T_FADE;
            sc = 1;
            op = 1 - p;
        } else {
            div.remove();
            return;
        }

        div.style.opacity   = op.toFixed(3);
        div.style.transform = `translateX(-50%) scale(${sc.toFixed(3)})`;
        div.style.top       = (spawnY - dy).toFixed(1) + 'px';
        requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
}

// ─────────────────────────────────────────────────────────────
// Button bindings
// ─────────────────────────────────────────────────────────────

export function bindGenerateButton(onGenerate) {
    if (!el.genBtn) return;
    // Heat up on ANY press — pointerdown fires even on :disabled buttons
    el.genBtn.addEventListener('pointerdown', () => {
        _addHeat(0.1);
        const onCooldown = Date.now() < state.generationCooldownUntil;
        const hasActiveOrder = !!state.activeOrder;
        const isSmoking = state.currentStatus === Config.STATUS.SMOKE;
        if (onCooldown && hasActiveOrder && !isSmoking) {
            playMainButtonLockedSfx();
            let mashStress = 1.5;
            const _mashConfTier = state.skillTree?.tiers?.gg_conf || 0;
            if (_mashConfTier >= 1) mashStress = Math.max(0, mashStress - 2);
            if (_mashConfTier >= 2) mashStress = Math.max(0, mashStress - 3);
            if (_mashConfTier >= 3) mashStress = Math.max(0, mashStress - 5);
            if (mashStress > 0) addStress(mashStress);
        }
    });
    // Actual generation only when enabled
    el.genBtn.addEventListener('click', () => {
        if (!el.genBtn.disabled) {
            const _isSmoking = state.currentStatus === Config.STATUS.SMOKE;
            if (_isSmoking && state.skillTree?.purchased?.cig_lungs) {
                // cig_lungs: clicking during smoke reduces smoke duration (heat-based)
                _addHeat(0.15);
                const reduceMs = Math.round(_heatLevel * 800 + 200);
                state.smokeUntil = Math.max(Date.now() + 50, state.smokeUntil - reduceMs);
                _triggerFlash();
                updateAllHud();
            } else {
                _triggerFlash();
                const particleCount = _spawnParticles();
                playMainButtonHeatStarsSfx(_getHeatStarsVolumeScale(particleCount));
                _spawnWorkParticle();
                onGenerate();
                updateAllHud();
            }
        }
    });
}

export function bindAutogenToggle(onToggle) {
    if (!el.autogenToggle) return;
    el.autogenToggle.addEventListener('click', () => {
        state.autogenEnabled = !state.autogenEnabled;
        el.autogenToggle.dataset.active = state.autogenEnabled ? 'true' : 'false';
        if (onToggle) onToggle(state.autogenEnabled);
    });
}
