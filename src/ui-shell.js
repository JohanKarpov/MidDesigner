// src/ui-shell.js — Overlay open/close, sidebar toggle, menu header population

import { state, saveState } from './state.js';
import { renderMenuContent } from './ui-orders.js';
import { buyGood, toggleCigsAutoBuy, recomputeGenerationCooldown, startAutogenTicker, startHeadhunterTicker, startAgentTicker, buyClothingItem, equipClothingItem, selectFullOutfit, buyPropertyItem, togglePropertyItem } from './economy.js';
import { sfx, startSpaceMusic, startHomeMusic, setMusicEnabled, setSfxEnabled, getMusicEnabled, getSfxEnabled, setMusicVolume, setSfxVolume, getMusicVolume, getSfxVolume, startVoice, stopVoice } from './audio.js';
import { getLang, setLang, t } from './i18n.js';
import { RESEARCH_TASKS, PROMOTION_TASKS, Config, PROPERTY_DATA } from './config.js';
import { updatePropertyLayers } from './ui-hud.js';

// ─────────────────────────────────────────────────────────────
// CH1 event hook (set by game.js to avoid circular imports)
// ─────────────────────────────────────────────────────────────

let _ch1EventHook = null;
export function setUpgradesCallbacks({ onCh1Event }) {
    if (onCh1Event) _ch1EventHook = onCh1Event;
}

const _narrativePopupQueue = [];
let _activeNarrativePopup = null;
const _unlockHighlightTimers = new WeakMap();
const _postChapterOneMenuFirstOpenComments = new Set([
    'chat_achievements_opened_once',
    'chat_shop_opened_once',
    'chat_shop_goods_opened_once',
    'chat_shop_property_opened_once',
    'chat_shop_clothes_opened_once',
    'chat_stats_opened_once',
    'chat_upgrades_menu_opened_once',
    'chat_research_category_opened_once',
    'chat_promotion_category_opened_once',
]);

function _markCommentShown(commentId) {
    if (!commentId) return false;
    if (!state.shownCharacterComments) state.shownCharacterComments = {};
    if (state.shownCharacterComments[commentId]) return false;
    state.shownCharacterComments[commentId] = true;
    saveState();
    return true;
}

function _normalizeMenuTutorialKey(category) {
    const key = String(category || '').trim();
    return key === 'promo' ? 'promotion' : key;
}

function _resolveNarrativeEntry(value) {
    if (typeof value === 'string') return value.trim();
    if (!value || typeof value !== 'object') return '';
    if (typeof value.locKey === 'string' && value.locKey.trim()) {
        return String(t(value.locKey) || '').trim();
    }
    const lang = getLang();
    return String(value[lang] || value.ru || value.en || '').trim();
}

function _getCommentEntries(value) {
    if (Array.isArray(value)) return value.map(_resolveNarrativeEntry).filter(Boolean);
    const entry = _resolveNarrativeEntry(value);
    return entry ? [entry] : [];
}

function _clearUnlockButtonHighlight(btn) {
    if (!btn) return;
    const timerId = _unlockHighlightTimers.get(btn);
    if (timerId) clearTimeout(timerId);
    _unlockHighlightTimers.delete(btn);
    btn.classList.remove('menu-btn-attention');
}

function _bindUnlockHighlightDismiss(btn) {
    if (!btn || btn.dataset.unlockHighlightBound === '1') return;
    btn.dataset.unlockHighlightBound = '1';
    btn.addEventListener('click', () => {
        _clearUnlockButtonHighlight(btn);
    });
}

function _highlightUnlockedButton(btn, durationMs = 5000) {
    if (!btn || btn.classList.contains('sbtn--locked')) return;
    _bindUnlockHighlightDismiss(btn);
    _clearUnlockButtonHighlight(btn);
    btn.classList.add('menu-btn-attention');
    const timerId = setTimeout(() => {
        _unlockHighlightTimers.delete(btn);
        btn.classList.remove('menu-btn-attention');
    }, durationMs);
    _unlockHighlightTimers.set(btn, timerId);
}

function _normalizeNarrativePopupRequest(payload, speakerKey = 'self') {
    if (Array.isArray(payload) || typeof payload === 'string') {
        return {
            lines: _getCommentEntries(payload),
            speakerKey,
            confirmAction: null,
            cancelAction: null,
            confirmLabel: '',
            cancelLabel: '',
            closeLabel: '',
            title: '',
            icon: '',
        };
    }

    const req = payload || {};
    return {
        lines: _getCommentEntries(req.lines ?? req.text),
        speakerKey: req.speakerKey || speakerKey,
        confirmAction: typeof req.onConfirm === 'function' ? req.onConfirm : null,
        cancelAction: typeof req.onCancel === 'function' ? req.onCancel : null,
        confirmLabel: String(req.confirmLabel || '').trim(),
        cancelLabel: String(req.cancelLabel || '').trim(),
        closeLabel: String(req.closeLabel || '').trim(),
        title: String(req.title || '').trim(),
        icon: String(req.icon || '').trim(),
    };
}

function _openNextNarrativePopup() {
    if (_activeNarrativePopup || !_narrativePopupQueue.length) return;

    const req = _narrativePopupQueue.shift();
    if (!req?.lines?.length) {
        requestAnimationFrame(_openNextNarrativePopup);
        return;
    }

    const container = document.querySelector('.game-container');
    if (!container) return;

    const lang = getLang();
    const speaker = window.NARRATIVE_COMMENTS?.speakers?.[req.speakerKey] || {};
    const titleText = req.title || speaker.name || 'ChatDJBT';
    const iconUrl = req.icon || speaker.icon || 'images/cinematic/chatdjbt-icon.png';
    const isConfirm = !!req.confirmAction;

    const backdrop = document.createElement('div');
    backdrop.className = 'chat-popup-backdrop deed-popup-backdrop';

    const popup = document.createElement('div');
    popup.className = `chat-popup deed-popup${isConfirm ? ' chat-popup--confirm' : ''}`;

    const closeBtn = document.createElement('button');
    closeBtn.className = 'deed-popup-close';
    closeBtn.type = 'button';
    closeBtn.textContent = '✕';
    popup.appendChild(closeBtn);

    const iconDiv = document.createElement('div');
    iconDiv.className = 'chat-popup-icon deed-popup-icon';
    iconDiv.style.backgroundImage = `url('${iconUrl}')`;
    popup.appendChild(iconDiv);

    const titleDiv = document.createElement('div');
    titleDiv.className = 'chat-popup-title deed-popup-title';
    titleDiv.textContent = titleText;
    popup.appendChild(titleDiv);

    const descDiv = document.createElement('div');
    descDiv.className = 'chat-popup-desc deed-popup-desc';
    popup.appendChild(descDiv);

    const progressDiv = document.createElement('div');
    progressDiv.className = 'chat-popup-progress';
    popup.appendChild(progressDiv);

    const actions = document.createElement('div');
    actions.className = 'chat-popup-actions';

    const cancelBtn = document.createElement('button');
    cancelBtn.type = 'button';
    cancelBtn.className = 'deed-popup-btn deed-popup-btn--locked chat-popup-btn chat-popup-btn--cancel';
    cancelBtn.textContent = req.cancelLabel || (lang === 'ru' ? 'ОСТАТЬСЯ' : 'STAY');

    const confirmBtn = document.createElement('button');
    confirmBtn.type = 'button';
    confirmBtn.className = 'deed-popup-btn deed-popup-btn--claim chat-popup-btn chat-popup-btn--confirm';
    confirmBtn.textContent = req.confirmLabel || (lang === 'ru' ? 'СБРОСИТЬ' : 'RESET');

    actions.appendChild(cancelBtn);
    actions.appendChild(confirmBtn);
    popup.appendChild(actions);

    const nextBtn = document.createElement('button');
    nextBtn.type = 'button';
    nextBtn.className = 'deed-popup-btn deed-popup-btn--claim chat-popup-btn chat-popup-btn--next';
    popup.appendChild(nextBtn);

    let lineIndex = 0;

    function finalize() {
        closeBtn.removeEventListener('click', handleClose);
        backdrop.removeEventListener('click', handleBackdrop);
        cancelBtn.removeEventListener('click', handleCancel);
        confirmBtn.removeEventListener('click', handleConfirm);
        nextBtn.removeEventListener('click', handleNext);
        backdrop.remove();
        popup.remove();
        _activeNarrativePopup = null;
        requestAnimationFrame(_openNextNarrativePopup);
    }

    function handleCancel() {
        finalize();
        req.cancelAction?.();
    }

    function handleConfirm() {
        finalize();
        req.confirmAction?.();
    }

    function handleClose() {
        if (isConfirm) handleCancel();
        else finalize();
    }

    function handleBackdrop(e) {
        if (e.target !== backdrop) return;
        handleClose();
    }

    function updatePopup() {
        const isLastLine = lineIndex >= req.lines.length - 1;
        descDiv.textContent = req.lines[lineIndex] || '';
        progressDiv.textContent = req.lines.length > 1 ? `${lineIndex + 1}/${req.lines.length}` : '';
        actions.classList.toggle('visible', isConfirm && isLastLine);
        nextBtn.classList.toggle('hidden', isConfirm && isLastLine);
        if (!isConfirm || !isLastLine) {
            nextBtn.textContent = isLastLine
                ? (req.closeLabel || (lang === 'ru' ? 'ПОНЯЛ' : 'OK'))
                : (lang === 'ru' ? 'ДАЛЬШЕ' : 'NEXT');
        }
    }

    function handleNext() {
        if (lineIndex < req.lines.length - 1) {
            lineIndex += 1;
            updatePopup();
            return;
        }
        finalize();
    }

    closeBtn.addEventListener('click', handleClose);
    backdrop.addEventListener('click', handleBackdrop);
    cancelBtn.addEventListener('click', handleCancel);
    confirmBtn.addEventListener('click', handleConfirm);
    nextBtn.addEventListener('click', handleNext);

    _activeNarrativePopup = { backdrop, popup };
    container.appendChild(backdrop);
    container.appendChild(popup);
    updatePopup();
}

function _enqueueNarrativePopup(payload, speakerKey = 'self') {
    const req = _normalizeNarrativePopupRequest(payload, speakerKey);
    if (!req.lines.length) return false;
    _narrativePopupQueue.push(req);
    _openNextNarrativePopup();
    return true;
}

window.__showNarrativePopup = (payload, speakerKey = 'self') => _enqueueNarrativePopup(payload, speakerKey);

function _playCommentSequence(lines, speakerKey = 'self') {
    if (!Array.isArray(lines) || !lines.length) return;
    const events = window.CH1_EVENTS || (window.CH1_EVENTS = {});
    events.__runtime_comment_sequence = {
        firedOnce: false,
        dialogue: lines.map(text => ({ type: 'dialog', speaker: speakerKey, text })),
        dialogueDelay: 0,
    };
    _ch1EventHook?.('__runtime_comment_sequence');
}

function _tryPlayFirstOpenComment(commentId) {
    if (!commentId) return false;
    if (state.shownCharacterComments?.[commentId]) return false;
    const lines = _getCommentEntries(window.NARRATIVE_COMMENTS?.firstOpen?.[commentId]);
    if (!lines.length) return false;
    _markCommentShown(commentId);
    _playCommentSequence(lines, 'self');
    return true;
}

function _tryPlayPostChapterOneMenuFirstOpenComment(commentId) {
    if (!commentId) return false;
    if (_postChapterOneMenuFirstOpenComments.has(commentId) && !state.chapter1Completed) return false;
    return _tryPlayFirstOpenComment(commentId);
}

function _canPlayPostTutorialNarrative() {
    return state.tutorialSkipped || state.completedStoryOrderIds?.includes('post_portfolio');
}

function _tryPlayMenuTutorialHubHint() {
    if (!_canPlayPostTutorialNarrative()) return false;
    if (state.tutorialSkipped) return false;
    if (state.menuTutorialSeen?.hub) return false;
    const lines = _getCommentEntries(window.NARRATIVE_COMMENTS?.menuTutorial?.hub);
    if (!lines.length) return false;
    state.menuTutorialSeen.hub = true;
    saveState();
    _playCommentSequence(lines, 'self');
    return true;
}

function _tryPlayMenuTutorialCategoryHint(category) {
    if (!_canPlayPostTutorialNarrative()) return false;
    if (state.tutorialSkipped) return false;
    const key = _normalizeMenuTutorialKey(category);
    if (!key || state.menuTutorialSeen?.[key]) return false;
    const lines = _getCommentEntries(window.NARRATIVE_COMMENTS?.menuTutorial?.categories?.[key]);
    if (!lines.length) return false;
    state.menuTutorialSeen[key] = true;
    saveState();
    _playCommentSequence(lines, 'self');
    return true;
}

function _tryPlayCategoryFirstOpenComment(category) {
    const key = _normalizeMenuTutorialKey(category);
    const canPlay = state.tutorialSkipped || !!state.menuTutorialSeen?.[key];
    if (!canPlay) return false;
    if (category === 'research') return _tryPlayPostChapterOneMenuFirstOpenComment('chat_research_category_opened_once');
    if (category === 'promo') return _tryPlayPostChapterOneMenuFirstOpenComment('chat_promotion_category_opened_once');
    return false;
}

function _openResetPromptPopup() {
    _tryPlayFirstOpenComment('chat_reset_prompt_once');

    // Check if chapter 1 was ever completed (survives resets)
    let chapter1EverCompleted = false;
    try {
        const chapData = JSON.parse(localStorage.getItem(Config.CHAPTERS_SAVE_KEY) || '{}');
        chapter1EverCompleted = !!chapData.chapter1;
    } catch (_) {}

    if (chapter1EverCompleted) {
        _openResetModePopup();
        return;
    }

    _enqueueNarrativePopup({
        lines: [getLang() === 'ru' ? 'Подтвердить сброс прогресса?' : 'Confirm progress reset?'],
        title: getLang() === 'ru' ? 'ESCAPE TO WILDERNESS' : 'ESCAPE TO WILDERNESS',
        confirmLabel: getLang() === 'ru' ? 'СБРОСИТЬ' : 'RESET',
        cancelLabel: getLang() === 'ru' ? 'ОСТАТЬСЯ' : 'STAY',
        onConfirm: () => {
            if (typeof window.__resetSave === 'function') window.__resetSave(true);
        },
        onCancel: () => {
            _tryPlayFirstOpenComment('chat_reset_cancel_once');
        },
    });
}

function _openResetModePopup() {
    const container = document.querySelector('.game-container');
    if (!container) return;
    const lang = getLang();
    const isRu = lang === 'ru';

    const backdrop = document.createElement('div');
    backdrop.className = 'chat-popup-backdrop deed-popup-backdrop';

    const popup = document.createElement('div');
    popup.className = 'chat-popup deed-popup chat-popup--confirm';

    const closeBtn = document.createElement('button');
    closeBtn.type = 'button';
    closeBtn.className = 'deed-popup-close';
    closeBtn.textContent = '✕';
    popup.appendChild(closeBtn);

    const iconDiv = document.createElement('div');
    iconDiv.className = 'chat-popup-icon deed-popup-icon';
    iconDiv.style.backgroundImage = "url('images/cinematic/chatdjbt-icon.png')";
    popup.appendChild(iconDiv);

    const titleDiv = document.createElement('div');
    titleDiv.className = 'chat-popup-title deed-popup-title';
    titleDiv.textContent = 'ESCAPE TO WILDERNESS';
    popup.appendChild(titleDiv);

    const descDiv = document.createElement('div');
    descDiv.className = 'chat-popup-desc deed-popup-desc';
    descDiv.textContent = isRu
        ? 'Ты уже прошёл первую главу. Начать с нуля или сразу со второй — с OutisticDigital и всеми открытыми меню?'
        : 'You have completed chapter 1. Start from scratch or skip straight to chapter 2?';
    popup.appendChild(descDiv);

    const actions = document.createElement('div');
    actions.className = 'chat-popup-actions visible';
    actions.style.cssText = 'display:flex;flex-direction:column;gap:8px;align-items:center;';

    const ch2Btn = document.createElement('button');
    ch2Btn.type = 'button';
    ch2Btn.className = 'deed-popup-btn deed-popup-btn--claim chat-popup-btn';
    ch2Btn.textContent = isRu ? 'ПЕРВЫЙ КОНТРАКТ' : 'FIRST CONTRACT';

    const scratchBtn = document.createElement('button');
    scratchBtn.type = 'button';
    scratchBtn.className = 'deed-popup-btn chat-popup-btn chat-popup-btn--cancel';
    scratchBtn.textContent = isRu ? 'С ЧИСТОГО ЛИСТА' : 'FRESH START';

    const cancelBtn = document.createElement('button');
    cancelBtn.type = 'button';
    cancelBtn.className = 'deed-popup-btn deed-popup-btn--locked chat-popup-btn';
    cancelBtn.textContent = isRu ? 'ОСТАТЬСЯ' : 'STAY';

    actions.appendChild(ch2Btn);
    actions.appendChild(scratchBtn);
    actions.appendChild(cancelBtn);
    popup.appendChild(actions);

    function close() { backdrop.remove(); popup.remove(); }
    function doCancel() { close(); _tryPlayFirstOpenComment('chat_reset_cancel_once'); }

    backdrop.addEventListener('click', e => { if (e.target === backdrop) doCancel(); });
    closeBtn.addEventListener('click', doCancel);
    cancelBtn.addEventListener('click', doCancel);
    scratchBtn.addEventListener('click', () => { close(); window.__resetSave?.(true, 'scratch'); });
    ch2Btn.addEventListener('click',     () => { close(); window.__resetSave?.(true, 'ch2'); });

    container.appendChild(backdrop);
    container.appendChild(popup);
}

// ─────────────────────────────────────────────────────────────
// Stats labels
// ─────────────────────────────────────────────────────────────

const STATS_ROWS = [
    { heading: 'Работа' },
    { key: 'completedOrders',          label: 'Заказов выполнено' },
    { key: 'failedOrders',             label: 'Заказов провалено' },
    { key: 'missedOrders',             label: 'Заказов пропущено' },
    { key: 'manualGenerations',        label: 'Генераций вручную' },
    { key: 'autogenGenerations',       label: 'Автогенераций' },
    { heading: 'Деньги' },
    { key: 'totalMoneyEarned',         label: 'Заработано',  fmt: 'money' },
    { key: 'totalMoneySpent',          label: 'Потрачено',   fmt: 'money' },
    { heading: 'Стресс' },
    { key: 'totalSmokeBreaks',         label: 'Перекуров' },
    { key: 'totalCigaretteButtsEarned',label: 'Бычков собрано' },
    { key: 'stressRelievedByCigarettes', label: 'Снято стресса' },
];

function _buildStatsRows(container) {
    container.innerHTML = '';
    const fmt = (v, type) => {
        if (type === 'money') return Number(v).toLocaleString('ru-RU') + ' ₽';
        return String(v ?? 0);
    };
    for (const row of STATS_ROWS) {
        if (row.heading) {
            const h = document.createElement('div');
            h.className = 'stats-section-heading';
            h.textContent = row.heading;
            container.appendChild(h);
        } else {
            const div = document.createElement('div');
            div.className = 'stats-row';
            div.innerHTML =
                `<span class="stats-row-label">${row.label}</span>` +
                `<span class="stats-row-value">${fmt(state.stats[row.key], row.fmt)}</span>`;
            container.appendChild(div);
        }
    }
}

// ─────────────────────────────────────────────────────────────
// Per-menu configuration
// ─────────────────────────────────────────────────────────────

const menuConfig = {
    orders: {
        title:     'BitTrick25',
        color:     '#46C1FF',
        statLabel: 'Fame:',
        showStars: true,
    },
    story: {
        title:     'Main Story',
        color:     '#EE4242',
        statLabel: 'Chapter: 1',
        showStars: false,
    },
    research: {
        title:     'Research',
        color:     '#79B742',
        statLabel: 'Research title',
        showStars: false,
    },
    promo: {
        title:     'Promotion',
        color:     '#35916D',
        statLabel: 'Fame:',
        showStars: true,
    },
};

// ─────────────────────────────────────────────────────────────
// applyMenuConfig — populate header of a cloned menu shell
// ─────────────────────────────────────────────────────────────

function applyMenuConfig(shell, name) {
    const cfg = menuConfig[name];
    if (!cfg) return;

    const titleEl = shell.querySelector('.menu-title');
    if (titleEl) titleEl.textContent = cfg.title;

    // Accent color on plates
    ['.name-plate', '.lvl-plate', '.menu-stat-bg'].forEach(sel => {
        const el = shell.querySelector(sel);
        if (el) el.style.background = cfg.color;
    });

    // Stat label
    const fameTextEl = shell.querySelector('.fame-text');
    if (fameTextEl) {
        fameTextEl.textContent = cfg.statLabel;
        fameTextEl.style.width = cfg.showStars ? '' : 'calc(var(--r) * 384)';
    }

    // Fame stars visibility
    const starsEl = shell.querySelector('.fame-stars');
    if (starsEl) starsEl.style.display = cfg.showStars ? '' : 'none';

    // Dynamic state fields
    const lvlEl = shell.querySelector('.lvl-text');
    if (lvlEl) lvlEl.textContent = 'Lvl: ' + state.level;

    const nameEl = shell.querySelector('.name-text');
    if (nameEl) nameEl.textContent = 'Name: ' + (state.playerName || 'Unknown');
}

// ─────────────────────────────────────────────────────────────
// Overlay open / close
// ─────────────────────────────────────────────────────────────

export function removeExistingOverlay() {
    document.querySelector('.menu-overlay.sandbox-menu')?.remove();
    removeSettingsOverlay();
    removeStatsOverlay();
    removeDeedsOverlay();
    removeShopOverlay();
    removeUpgradesOverlay();
}

// ─────────────────────────────────────────────────────────────
// Settings overlay
// ─────────────────────────────────────────────────────────────

function removeSettingsOverlay() {
    document.querySelector('.settings-overlay')?.remove();
}

// ─────────────────────────────────────────────────────────────
// Deeds overlay
// ─────────────────────────────────────────────────────────────

function removeDeedsOverlay() {
    document.querySelector('.deeds-screen')?.remove();
}

// ─────────────────────────────────────────────────────────────
// Achievement badges
// ─────────────────────────────────────────────────────────────

function _makeAchBadge() {
    const img = document.createElement('img');
    img.className = 'ach-badge';
    img.src = 'UI/icons/icon-alert.png';
    img.alt = '';
    return img;
}

/** Inject the persistent badge into #menu-btn and show/hide it. Call once at init. */
export function initAchievementBadges() {
    const menuBtn = document.getElementById('menu-btn');
    if (menuBtn && !menuBtn.querySelector('.ach-badge')) {
        menuBtn.appendChild(_makeAchBadge());
    }
    updateAchievementBadges();
}

/** Refresh all visible achievement badges (menu-btn, deeds-btn, deed cells). */
export function updateAchievementBadges() {
    const data    = window.ACHIEVEMENTS_DATA || [];
    const claimed = state.claimedAchievements || {};
    const hasAny  = data.some(a => !claimed[a.id] && a.condition && a.condition(state));

    // 1. Menu button
    document.querySelector('#menu-btn .ach-badge')?.classList.toggle('visible', hasAny);

    // 2. Deeds button inside settings (if open)
    document.querySelector('#settings-deeds-btn .ach-badge')?.classList.toggle('visible', hasAny);

    // 3. Per-cell badges in deeds grid (if open)
    document.querySelectorAll('.deed-cell[data-id]').forEach(cell => {
        const id  = cell.dataset.id;
        const ach = data.find(a => a.id === id);
        const isUnclaimed = !!ach && !claimed[id] && !!ach.condition && ach.condition(state);
        cell.querySelector('.ach-badge')?.classList.toggle('visible', isUnclaimed);
    });
}

function _claimAchievement(id, ach, btn) {
    if (!state.claimedAchievements) state.claimedAchievements = {};
    state.claimedAchievements[id] = true;

    // Apply reward — supports single rewardValue or array rewardValues
    const _rewards = ach.rewardValues ?? (ach.rewardValue ? [ach.rewardValue] : []);
    for (const { type, amount } of _rewards) {
        if      (type === 'funds')          state.funds           = state.funds.add(amount);
        else if (type === 'xp')             state.xp              = state.xp.add(amount);
        else if (type === 'skillPoints')    state.skillPoints     = (state.skillPoints  || 0) + amount;
        else if (type === 'expertPoints')   state.expertPoints    = (state.expertPoints || 0) + amount;
        else if (type === 'cigaretteButts') state.cigaretteButts  = (state.cigaretteButts || 0) + amount;
        // After funds reward: check 1000р milestone trigger
        if (type === 'funds' && !state.chapter1Completed && state.funds.gte(1000) && !state.ch1FiredEvents?.funds_reached_1000) {
            _ch1EventHook?.('funds_reached_1000');
        }
    }

    saveState();
    updateAchievementBadges();

    // Update popup button
    btn.textContent = 'ПОЛУЧЕНО';
    btn.className   = 'deed-popup-btn deed-popup-btn--claimed';
    btn.disabled    = true;

    // Update grid cell
    const cell = document.querySelector(`.deed-cell[data-id="${id}"]`);
    if (cell) {
        cell.classList.remove('deed-cell--unlocked');
        cell.classList.add('deed-cell--claimed');
        if (!cell.querySelector('.deed-cell-claimed-badge')) {
            const badge = document.createElement('div');
            badge.className = 'deed-cell-claimed-badge';
            cell.appendChild(badge);
        }
    }
}

function _buildDeedsGrid(grid) {
    grid.innerHTML = '';
    const data       = window.ACHIEVEMENTS_DATA || [];
    const claimedMap = state.claimedAchievements || {};

    for (const ach of data) {
        const unlocked = ach.condition ? ach.condition(state) : false;
        const claimed  = !!claimedMap[ach.id];
        const isHidden = !!ach.hidden;

        let status = 'locked';
        if (claimed)        status = 'claimed';
        else if (unlocked)  status = 'unlocked';

        const cell = document.createElement('button');
        cell.type = 'button';
        cell.className = `deed-cell deed-cell--${status}${isHidden && status === 'locked' ? ' deed-cell--hidden' : ''}`;
        cell.dataset.id = ach.id;
        cell.setAttribute('aria-label', isHidden && status === 'locked' ? '???' : ach.title);

        const icon = document.createElement('div');
        icon.className = 'deed-cell-icon';
        if (!isHidden || status !== 'locked') {
            icon.style.backgroundImage = `url('UI/achievements/${ach.id}.png')`;
        }
        cell.appendChild(icon);

        if (status === 'claimed') {
            const cb = document.createElement('div');
            cb.className = 'deed-cell-claimed-badge';
            cell.appendChild(cb);
        }

        // Alert badge — visible when unlocked+unclaimed
        cell.appendChild(_makeAchBadge());

        grid.appendChild(cell);
    }
}

function _openDeedPopup(screen, id, ach) {
    // Remove any existing popup
    screen.querySelector('.deed-popup-backdrop')?.remove();
    screen.querySelector('.deed-popup')?.remove();

    const claimedMap = state.claimedAchievements || {};
    const unlocked   = ach.condition ? ach.condition(state) : false;
    const claimed    = !!claimedMap[id];
    const isHidden   = !!ach.hidden;
    const showDetail = !isHidden || unlocked || claimed;

    let status = 'locked';
    if (claimed)       status = 'claimed';
    else if (unlocked) status = 'unlocked';

    // Backdrop
    const backdrop = document.createElement('div');
    backdrop.className = 'deed-popup-backdrop';
    backdrop.addEventListener('click', () => { backdrop.remove(); screen.querySelector('.deed-popup')?.remove(); });

    // Popup card
    const popup = document.createElement('div');
    popup.className = 'deed-popup';

    // Close button
    const closeBtn = document.createElement('button');
    closeBtn.className = 'deed-popup-close';
    closeBtn.type = 'button';
    closeBtn.textContent = '✕';
    closeBtn.addEventListener('click', () => { backdrop.remove(); popup.remove(); });
    popup.appendChild(closeBtn);

    // Icon
    const iconDiv = document.createElement('div');
    iconDiv.className = showDetail ? 'deed-popup-icon' : 'deed-popup-icon deed-popup-icon--hidden';
    if (showDetail) {
        iconDiv.style.backgroundImage = `url('UI/achievements/${id}.png')`;
        if (status === 'locked') iconDiv.style.filter = 'grayscale(1) opacity(0.5)';
    }
    popup.appendChild(iconDiv);

    // Title
    const titleDiv = document.createElement('div');
    titleDiv.className = 'deed-popup-title';
    titleDiv.textContent = showDetail ? ach.title : '???';
    popup.appendChild(titleDiv);

    // Description
    const descDiv = document.createElement('div');
    descDiv.className = 'deed-popup-desc';
    descDiv.textContent = showDetail ? ach.description : '???';
    popup.appendChild(descDiv);

    // Reward (only when details visible)
    if (showDetail && ach.rewardDisplay) {
        const rewardDiv = document.createElement('div');
        rewardDiv.className = 'deed-popup-reward';
        rewardDiv.textContent = ach.rewardDisplay;
        popup.appendChild(rewardDiv);
    }

    // Action button
    const actionBtn = document.createElement('button');
    actionBtn.type = 'button';
    if (claimed) {
        actionBtn.className = 'deed-popup-btn deed-popup-btn--claimed';
        actionBtn.textContent = 'ПОЛУЧЕНО';
        actionBtn.disabled = true;
    } else if (unlocked) {
        actionBtn.className = 'deed-popup-btn deed-popup-btn--claim';
        actionBtn.textContent = 'ПОЛУЧИТЬ';
        actionBtn.addEventListener('click', () => _claimAchievement(id, ach, actionBtn));
    } else {
        actionBtn.className = 'deed-popup-btn deed-popup-btn--locked';
        actionBtn.textContent = 'ЗАКРЫТО';
        actionBtn.disabled = true;
    }
    popup.appendChild(actionBtn);

    screen.appendChild(backdrop);
    screen.appendChild(popup);
}

function openDeedsMenu() {
    if (document.querySelector('.deeds-screen')) { removeDeedsOverlay(); return; }
    removeSettingsOverlay();

    const tpl = document.getElementById('tmpl-deeds-menu');
    if (!tpl) return;

    const node   = tpl.content.cloneNode(true);
    const screen = node.querySelector('.deeds-screen');

    // Build achievement grid
    const grid = screen.querySelector('.deeds-grid');
    if (grid) _buildDeedsGrid(grid);

    // Cell click → popup
    grid?.addEventListener('click', e => {
        const cell = e.target.closest('.deed-cell');
        if (!cell) return;
        const id  = cell.dataset.id;
        const ach = (window.ACHIEVEMENTS_DATA || []).find(a => a.id === id);
        if (!ach) return;
        _openDeedPopup(screen, id, ach);
    });

    // Back button
    screen.querySelector('.deeds-screen-back-btn')?.addEventListener('click', e => {
        e.stopPropagation();
        sfx('back');
        removeDeedsOverlay();
    });

    document.querySelector('.game-container').appendChild(screen);
    updateAchievementBadges();
    requestAnimationFrame(() => _tryPlayPostChapterOneMenuFirstOpenComment('chat_achievements_opened_once'));
}

// ─────────────────────────────────────────────────────────────
// Shop overlay
// ─────────────────────────────────────────────────────────────

let _lastShopTab = 'goods';

// ─────────────────────────────────────────────────────────────
// Clothing / Wardrobe data
// ─────────────────────────────────────────────────────────────

// Full costume overrides — each replaces the entire sprite set when selected.
// Sprites: images/PixelEgorus/Pix{tag}-Idle.png / Pix{tag}-Work.png / Pix{tag}-Smoke.png
// Add new entries here and drop corresponding sprites in images/PixelEgorus/
const FULL_OUTFITS = [
    { tag: null,     label: { ru: 'Кэжуал', en: 'Casual'  } },
    { tag: 'Clown',  label: { ru: 'Клоун',  en: 'Clown'   }, unlockKey: 'outfit_clown'  },
    { tag: 'Beach',  label: { ru: 'Пляж',   en: 'Beach'   }, unlockKey: 'outfit_beach'  },
    { tag: 'Office', label: { ru: 'Офис',   en: 'Office'  }, unlockKey: 'outfit_office' },
];

const CLOTHING_SLOTS = [
    {
        id: 'cap',    code: 'c',
        label: { ru: 'Кепка',    en: 'Cap' },
        variants: [
            { id: 1, label: { ru: 'Черная', en: 'Black' }, price: 0, startOwned: true },
        ],
    },
    {
        id: 'hoodie', code: 'h',
        label: { ru: 'Худи',     en: 'Hoodie' },
        variants: [
            { id: 1, label: { ru: 'Черное', en: 'Black' }, price: 0, startOwned: true },
        ],
    },
    {
        id: 'tshirt', code: 't',
        label: { ru: 'Футболка', en: 'T-Shirt' },
        variants: [
            { id: 1, label: { ru: 'Белая',  en: 'White' }, price: 800  },
            { id: 2, label: { ru: 'Черная', en: 'Black' }, price: 2500, unlockKey: 'tshirt_black'  },
            { id: 3, label: { ru: 'Минон',  en: 'Minon' }, price: 5000, unlockKey: 'tshirt_minon'  },
        ],
    },
    {
        id: 'pants',  code: 'p',
        label: { ru: 'Штаны',   en: 'Pants' },
        variants: [
            { id: 1, label: { ru: 'Серые',  en: 'Grey'   }, price: 0,     startOwned: true },
            { id: 2, label: { ru: 'Черные', en: 'Black'  }, price: 7000,  unlockKey: 'pants_black'  },
            { id: 3, label: { ru: 'Шорты',  en: 'Shorts' }, price: 10000, unlockKey: 'pants_shorts' },
        ],
    },
    {
        id: 'socks',  code: 's',
        label: { ru: 'Носки',   en: 'Socks' },
        variants: [
            { id: 1, label: { ru: 'Старые',  en: 'Old'   }, price: 0,    startOwned: true },
            { id: 2, label: { ru: 'Белые',   en: 'White' }, price: 1200, unlockKey: 'socks_white' },
            { id: 3, label: { ru: 'Черные',  en: 'Black' }, price: 1200, unlockKey: 'socks_black' },
            { id: 4, label: { ru: 'Розовые', en: 'Pink'  }, price: 1500, unlockKey: 'socks_pink'  },
        ],
    },
];

/** Build sprite URL for the wardrobe preview (always Idle state). */
function _getWardrobeSpriteUrl(selected) {
    const slots = ['cap', 'hoodie', 'tshirt', 'pants', 'socks'];
    const codes = { cap: 'c', hoodie: 'h', tshirt: 't', pants: 'p', socks: 's' };
    // Show outfit sprite only when t-shirt slot is filled
    if (selected?.tshirt == null) return 'images/PixelEgorus/PixE-Idle-1.png';
    const code = slots.map(id => `${codes[id]}${selected[id] ?? 1}`).join('-');
    return `images/PixelEgorus/PixE-Idle-${code}.png`;
}

// ─────────────────────────────────────────────────────────────
// Wardrobe tab renderer
// ─────────────────────────────────────────────────────────────

function _renderWardrobeTab(content) {
    const lang = getLang();

    // Local browse state: start at equipped variant index, or 0
    const browseIdxes = {};
    for (const slot of CLOTHING_SLOTS) {
        const equippedId = state.wardrobeSelected?.[slot.id];
        if (equippedId != null) {
            const idx = slot.variants.findIndex(v => v.id === equippedId);
            browseIdxes[slot.id] = idx >= 0 ? idx : 0;
        } else {
            browseIdxes[slot.id] = 0;
        }
    }
    let outfitBrowseIdx = Math.max(0, FULL_OUTFITS.findIndex(o => o.tag === (state.selectedOutfitTag ?? null)));

    // ── Wrapper ──────────────────────────────────────────────
    const wrap = document.createElement('div');
    wrap.className = 'wardrobe-wrap';

    // LEFT: character preview
    const previewCol = document.createElement('div');
    previewCol.className = 'wardrobe-preview-col';
    const previewImg = document.createElement('img');
    previewImg.className = 'wardrobe-preview-img';
    previewImg.alt = '';
    previewCol.appendChild(previewImg);
    wrap.appendChild(previewCol);

    // RIGHT: slot controls
    const slotsCol = document.createElement('div');
    slotsCol.className = 'wardrobe-slots-col';

    // Store refs for re-render
    const slotRows = {}; // slotId → { variantNameEl, statusRowEl }

    for (const slot of CLOTHING_SLOTS) {
        const slotEl = document.createElement('div');
        slotEl.className = 'wardrobe-slot';
        slotEl.classList.add('wardrobe-slot--clothing');

        const nameEl = document.createElement('div');
        nameEl.className = 'wardrobe-slot-name';
        nameEl.textContent = slot.label[lang] || slot.label.ru;
        slotEl.appendChild(nameEl);

        const controlsRow = document.createElement('div');
        controlsRow.className = 'wardrobe-slot-controls';

        const prevBtn = document.createElement('button');
        prevBtn.type = 'button';
        prevBtn.className = 'wardrobe-arrow';
        prevBtn.dataset.slot = slot.id;
        prevBtn.dataset.dir  = '-1';
        prevBtn.textContent  = '◄';

        const valueWrap = document.createElement('div');
        valueWrap.className = 'wardrobe-slot-value-wrap';

        const variantNameEl = document.createElement('div');
        variantNameEl.className = 'wardrobe-slot-value-name';

        const statusRowEl = document.createElement('div');
        statusRowEl.className = 'wardrobe-slot-status';

        valueWrap.appendChild(variantNameEl);
        valueWrap.appendChild(statusRowEl);

        const nextBtn = document.createElement('button');
        nextBtn.type = 'button';
        nextBtn.className = 'wardrobe-arrow';
        nextBtn.dataset.slot = slot.id;
        nextBtn.dataset.dir  = '1';
        nextBtn.textContent  = '►';

        controlsRow.appendChild(prevBtn);
        controlsRow.appendChild(valueWrap);
        controlsRow.appendChild(nextBtn);
        slotEl.appendChild(controlsRow);
        slotsCol.appendChild(slotEl);

        slotRows[slot.id] = { variantNameEl, statusRowEl };
    }

    // ── Full-outfit section ───────────────────────────────────
    const dividerEl = document.createElement('div');
    dividerEl.className = 'wardrobe-outfit-divider';
    dividerEl.textContent = lang === 'ru' ? '── Образы ──' : '── Outfits ──';
    slotsCol.appendChild(dividerEl);

    const outfitSlotEl = document.createElement('div');
    outfitSlotEl.className = 'wardrobe-slot';
    const outfitLabelEl = document.createElement('div');
    outfitLabelEl.className = 'wardrobe-slot-name';
    outfitLabelEl.textContent = lang === 'ru' ? 'Образ' : 'Outfit';
    outfitSlotEl.appendChild(outfitLabelEl);

    const outfitControlsRow = document.createElement('div');
    outfitControlsRow.className = 'wardrobe-slot-controls';

    const outfitPrevBtn = document.createElement('button');
    outfitPrevBtn.type = 'button';
    outfitPrevBtn.className = 'wardrobe-arrow';
    outfitPrevBtn.textContent = '◄';

    const outfitValueWrap = document.createElement('div');
    outfitValueWrap.className = 'wardrobe-slot-value-wrap';

    const outfitNameEl = document.createElement('div');
    outfitNameEl.className = 'wardrobe-slot-value-name';

    const outfitStatusEl = document.createElement('div');
    outfitStatusEl.className = 'wardrobe-slot-status';

    outfitValueWrap.appendChild(outfitNameEl);
    outfitValueWrap.appendChild(outfitStatusEl);

    const outfitNextBtn = document.createElement('button');
    outfitNextBtn.type = 'button';
    outfitNextBtn.className = 'wardrobe-arrow';
    outfitNextBtn.textContent = '►';

    outfitControlsRow.appendChild(outfitPrevBtn);
    outfitControlsRow.appendChild(outfitValueWrap);
    outfitControlsRow.appendChild(outfitNextBtn);
    outfitSlotEl.appendChild(outfitControlsRow);
    slotsCol.appendChild(outfitSlotEl);

    wrap.appendChild(slotsCol);
    content.appendChild(wrap);

    // ── Helpers defined after DOM is built ────────────────────

    function computePreviewSelected() {
        const sel = {};
        for (const slot of CLOTHING_SLOTS) {
            const idx     = browseIdxes[slot.id];
            const variant = slot.variants[idx];
            const isOwned = (state.wardrobeOwned?.[slot.id] || []).includes(variant.id);
            sel[slot.id] = isOwned ? variant.id : (state.wardrobeSelected?.[slot.id] ?? null);
        }
        return sel;
    }

    function updatePreview() {
        const browsedOutfit = FULL_OUTFITS[outfitBrowseIdx];
        if (browsedOutfit?.tag) {
            previewImg.src = `images/PixelEgorus/Pix${browsedOutfit.tag}-Idle.png`;
        } else {
            previewImg.src = _getWardrobeSpriteUrl(computePreviewSelected());
        }
    }

    function renderOneSlot(slotId) {
        const slot    = CLOTHING_SLOTS.find(s => s.id === slotId);
        if (!slot) return;
        const { variantNameEl, statusRowEl } = slotRows[slotId];
        const idx     = browseIdxes[slotId];
        const variant = slot.variants[idx];
        const isOwned = (state.wardrobeOwned?.[slotId] || []).includes(variant.id);
        const isWorn  = state.wardrobeSelected?.[slotId] === variant.id;

        variantNameEl.textContent = variant.label[lang] || variant.label.ru;
        statusRowEl.innerHTML = '';

        if (isOwned) {
            if (isWorn) {
                const badge = document.createElement('span');
                badge.className = 'wardrobe-status-worn';
                badge.textContent = lang === 'ru' ? 'Носишь' : 'Wearing';
                statusRowEl.appendChild(badge);
            } else {
                const btn = document.createElement('button');
                btn.type = 'button';
                btn.className = 'wardrobe-equip-btn';
                btn.textContent = lang === 'ru' ? 'Надеть' : 'Wear';
                btn.addEventListener('click', () => {
                    equipClothingItem(slotId, variant.id);
                    sfx('click');
                    renderAllSlots();
                    updatePreview();
                });
                statusRowEl.appendChild(btn);
            }
        } else {
            const isLocked = variant.unlockKey && !state.wardrobeUnlockedVariants?.[variant.unlockKey];
            if (isLocked) {
                const lockBadge = document.createElement('span');
                lockBadge.className = 'wardrobe-locked-badge';
                lockBadge.textContent = '🔒';
                statusRowEl.appendChild(lockBadge);
            } else {
                const priceEl = document.createElement('span');
                priceEl.className = 'wardrobe-price';
                priceEl.textContent = `${variant.price} ₽`;

                const buyBtn = document.createElement('button');
                buyBtn.type = 'button';
                buyBtn.className = 'wardrobe-buy-btn';
                if (state.funds.lt(variant.price)) {
                    buyBtn.disabled = true;
                    buyBtn.classList.add('wardrobe-buy-btn--disabled');
                }
                buyBtn.textContent = lang === 'ru' ? 'Купить' : 'Buy';
                buyBtn.addEventListener('click', () => {
                    if (buyClothingItem(slotId, variant.id, variant.price)) {
                        sfx('shop');
                        renderAllSlots();
                        updatePreview();
                    }
                });

                statusRowEl.appendChild(priceEl);
                statusRowEl.appendChild(buyBtn);
            }
        }
    }

    function renderAllSlots() {
        for (const slot of CLOTHING_SLOTS) renderOneSlot(slot.id);
    }

    function renderOutfitRow() {
        const outfit   = FULL_OUTFITS[outfitBrowseIdx];
        const isActive = (state.selectedOutfitTag ?? null) === outfit.tag;
        const isLocked = outfit.unlockKey && !state.wardrobeUnlockedOutfits?.[outfit.unlockKey];
        outfitNameEl.textContent = outfit.label[lang] || outfit.label.ru;
        outfitStatusEl.innerHTML = '';
        if (isLocked) {
            const badge = document.createElement('span');
            badge.className = 'wardrobe-locked-badge';
            badge.textContent = '🔒';
            outfitStatusEl.appendChild(badge);
        } else if (isActive) {
            const badge = document.createElement('span');
            badge.className = 'wardrobe-status-worn';
            badge.textContent = lang === 'ru' ? 'Надет' : 'Wearing';
            outfitStatusEl.appendChild(badge);
        } else {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'wardrobe-equip-btn';
            btn.textContent = lang === 'ru' ? 'Надеть' : 'Wear';
            btn.addEventListener('click', () => {
                selectFullOutfit(outfit.tag);
                sfx('click');
                slotsCol.classList.toggle('wardrobe-slots--outfit-override', outfit.tag != null);
                renderOutfitRow();
                renderAllSlots();
                updatePreview();
            });
            outfitStatusEl.appendChild(btn);
        }
        // Grey out individual slot controls when a full outfit is active
        slotsCol.classList.toggle('wardrobe-slots--outfit-override', state.selectedOutfitTag != null);
    }

    outfitPrevBtn.addEventListener('click', () => {
        outfitBrowseIdx = (outfitBrowseIdx - 1 + FULL_OUTFITS.length) % FULL_OUTFITS.length;
        renderOutfitRow(); updatePreview();
    });
    outfitNextBtn.addEventListener('click', () => {
        outfitBrowseIdx = (outfitBrowseIdx + 1) % FULL_OUTFITS.length;
        renderOutfitRow(); updatePreview();
    });

    // Arrow navigation via event delegation (clothing slots only)
    wrap.addEventListener('click', e => {
        const btn = e.target.closest('.wardrobe-arrow');
        if (!btn) return;
        const slotId = btn.dataset.slot;
        const dir    = Number(btn.dataset.dir);
        const slot   = CLOTHING_SLOTS.find(s => s.id === slotId);
        if (!slot) return;
        browseIdxes[slotId] = (browseIdxes[slotId] + dir + slot.variants.length) % slot.variants.length;
        renderOneSlot(slotId);
        updatePreview();
    });

    // Initial render
    renderAllSlots();
    renderOutfitRow();
    updatePreview();
}

const SHOP_GOODS_DATA = [
    { id: 'cigs',  title: 'Сигареты',  price: 120, icon: 'images/icons/icon-good-cigs.png',  desc: `+${20} сигарет в пачке.` },
    { id: 'energ', title: 'Энергетик', price: 180, icon: 'images/icons/icon-good-energ.png', desc: 'Генерация ×0.65. Стресс ×1.5.' },
    { id: 'borj',  title: 'Минералка',  price: 90,  icon: 'images/icons/icon-good-borj.png',  desc: 'Снимает эффект энергетика.' },
    { id: 'meds',  title: 'Витамины',   price: 220, icon: 'images/icons/icon-good-meds.png',  desc: 'Снимает энергетик + восстановление стресса ×2.' },
];

function removeShopOverlay() {
    document.querySelector('.shop-screen')?.remove();
}

// ─────────────────────────────────────────────────────────────
// Property tab renderer
// ─────────────────────────────────────────────────────────────

function _renderPropertyTab(content, screen) {
    content.innerHTML = '';

    for (const locData of PROPERTY_DATA) {
        // ── Location header ──────────────────────────────────
        const locHeader = document.createElement('div');
        locHeader.className = 'prop-location-header';

        const locTitle = document.createElement('div');
        locTitle.className = 'prop-location-title';
        locTitle.textContent = locData.title;
        locHeader.appendChild(locTitle);

        if (locData.description) {
            const locDesc = document.createElement('div');
            locDesc.className = 'prop-location-desc';
            locDesc.textContent = locData.description;
            locHeader.appendChild(locDesc);
        }

        content.appendChild(locHeader);

        // ── Items grid ───────────────────────────────────────
        const grid = document.createElement('div');
        grid.className = 'prop-items-grid';

        for (const itemData of locData.items) {
            const locState   = state.property?.locations?.[locData.id];
            const itemState  = locState?.items?.[itemData.id] || { purchased: false, active: false };
            const isPurchased = itemState.purchased;
            const isActive    = itemState.active;
            const canAfford   = state.funds.gte(itemData.price);

            const card = document.createElement('div');
            card.className = 'prop-item-card' + (isPurchased ? ' prop-item-card--owned' : '');

            // Preview thumbnail
            const thumb = document.createElement('img');
            thumb.className = 'prop-item-thumb';
            thumb.src = 'images/icons/icon-property-box.png';
            thumb.alt = itemData.title;
            card.appendChild(thumb);

            // Info row
            const info = document.createElement('div');
            info.className = 'prop-item-info';

            const nameEl = document.createElement('div');
            nameEl.className = 'prop-item-name';
            nameEl.textContent = itemData.title;
            info.appendChild(nameEl);

            const actionRow = document.createElement('div');
            actionRow.className = 'prop-item-actions';

            if (isPurchased) {
                // Toggle visibility button
                const toggleBtn = document.createElement('button');
                toggleBtn.type = 'button';
                toggleBtn.className = 'prop-toggle-btn' + (isActive ? ' prop-toggle-btn--on' : ' prop-toggle-btn--off');
                toggleBtn.textContent = isActive ? 'ВКЛ' : 'ВЫКЛ';
                toggleBtn.addEventListener('click', () => {
                    togglePropertyItem(locData.id, itemData.id);
                    updatePropertyLayers();
                    sfx('click');
                    // Re-render this tab in place
                    _renderPropertyTab(content, screen);
                });
                actionRow.appendChild(toggleBtn);
            } else {
                // Price
                const priceEl = document.createElement('div');
                priceEl.className = 'prop-item-price';
                priceEl.textContent = itemData.price.toLocaleString('ru-RU') + ' ₽';
                actionRow.appendChild(priceEl);

                // Buy button
                const buyBtn = document.createElement('button');
                buyBtn.type = 'button';
                buyBtn.className = 'prop-buy-btn' + (canAfford ? '' : ' prop-buy-btn--disabled');
                buyBtn.disabled = !canAfford;
                buyBtn.textContent = 'Купить';
                buyBtn.addEventListener('click', () => {
                    if (buyPropertyItem(locData.id, itemData.id, itemData.price)) {
                        updatePropertyLayers();
                        sfx('shop');
                        _renderPropertyTab(content, screen);
                    }
                });
                actionRow.appendChild(buyBtn);
            }

            info.appendChild(actionRow);
            card.appendChild(info);
            grid.appendChild(card);
        }

        content.appendChild(grid);
    }
}

function _makeGoodCard(item, screen) {
    const affordable     = state.funds.gte(item.price);
    const isEnergActive  = state.goods.energizerActive;
    const isMedsActive   = state.goods.vitaminsActive;
    let disabled = !affordable;
    if (item.id === 'energ' && isEnergActive) disabled = true;
    if (item.id === 'meds'  && isMedsActive)  disabled = true;

    const card = document.createElement('div');
    card.className = 'shop-good-card';
    card.dataset.id = item.id;

    // Icon
    const iconWrap = document.createElement('div');
    iconWrap.className = 'shop-good-icon-wrap';
    const img = document.createElement('img');
    img.src = item.icon; img.alt = ''; img.className = 'shop-good-icon';
    iconWrap.appendChild(img);

    // Info
    const info = document.createElement('div');
    info.className = 'shop-good-info';
    const titleEl = document.createElement('div');
    titleEl.className = 'shop-good-title';
    titleEl.textContent = item.title;
    const descEl = document.createElement('div');
    descEl.className = 'shop-good-desc';
    descEl.textContent = item.desc;
    info.appendChild(titleEl);
    info.appendChild(descEl);

    if (item.id === 'cigs') {
        const stock = document.createElement('div');
        stock.className = 'shop-good-stock';
        stock.textContent = `Запас: ${state.goods.cigarettes}`;
        info.appendChild(stock);
    }
    if ((item.id === 'energ' && isEnergActive) || (item.id === 'meds' && isMedsActive)) {
        const badge = document.createElement('span');
        badge.className = 'shop-good-active-badge';
        badge.textContent = 'АКТИВНО';
        info.appendChild(badge);
    }

    // Actions
    const actions = document.createElement('div');
    actions.className = 'shop-good-actions';
    const priceEl = document.createElement('div');
    priceEl.className = 'shop-good-price';
    priceEl.textContent = `${item.price} ₽`;
    const buyBtn = document.createElement('button');
    buyBtn.type = 'button';
    buyBtn.className = 'shop-good-buy-btn';
    buyBtn.disabled = disabled;
    if (disabled) buyBtn.classList.add('shop-good-buy-btn--disabled');
    buyBtn.textContent = 'Купить';
    buyBtn.addEventListener('click', () => {
        if (buyGood(item.id, item.price)) {
            sfx('shop');
            const content = screen.querySelector('.shop-body-content');
            _renderShopTab('goods', content, screen);
        }
    });
    actions.appendChild(priceEl);
    actions.appendChild(buyBtn);

    card.appendChild(iconWrap);
    card.appendChild(info);
    card.appendChild(actions);

    // Auto-buy row (cigs only)
    if (item.id === 'cigs') {
        const autoRow = document.createElement('div');
        autoRow.className = 'shop-autobuy-row';
        const autoLabel = document.createElement('span');
        autoLabel.className = 'shop-autobuy-label';
        autoLabel.textContent = 'Авто-покупка (+20 при 0):';
        const autoBtn = document.createElement('button');
        autoBtn.type = 'button';
        autoBtn.className = 'shop-autobuy-btn' + (state.goods.cigsAutoBuy ? ' active' : '');
        autoBtn.textContent = state.goods.cigsAutoBuy ? 'ВКЛ' : 'ВЫКЛ';
        autoBtn.addEventListener('click', () => {
            toggleCigsAutoBuy();
            autoBtn.classList.toggle('active', state.goods.cigsAutoBuy);
            autoBtn.textContent = state.goods.cigsAutoBuy ? 'ВКЛ' : 'ВЫКЛ';
        });
        autoRow.appendChild(autoLabel);
        autoRow.appendChild(autoBtn);
        card.appendChild(autoRow);
    }

    return card;
}

function _renderShopTab(tabId, content, screen) {
    content.innerHTML = '';
    const tabCommentMap = {
        goods: 'chat_shop_goods_opened_once',
        property: 'chat_shop_property_opened_once',
        clothes: 'chat_shop_clothes_opened_once',
    };
    _tryPlayPostChapterOneMenuFirstOpenComment(tabCommentMap[tabId]);
    if (tabId === 'goods') {
        const list = document.createElement('div');
        list.className = 'shop-goods-list';
        for (const item of SHOP_GOODS_DATA) {
            list.appendChild(_makeGoodCard(item, screen));
        }
        content.appendChild(list);
    } else if (tabId === 'clothes') {
        _renderWardrobeTab(content);
    } else {
        _renderPropertyTab(content, screen);
    }
}

function openShopMenu() {
    if (document.querySelector('.shop-screen')) { removeShopOverlay(); return; }
    document.querySelector('.menu-overlay.sandbox-menu')?.remove();
    removeSettingsOverlay();

    const tpl = document.getElementById('tmpl-shop-menu');
    if (!tpl) return;

    const node   = tpl.content.cloneNode(true);
    const screen = node.querySelector('.shop-screen');

    // Append to DOM first so render errors don't prevent the overlay from showing
    document.querySelector('.game-container').appendChild(screen);

    const content = screen.querySelector('.shop-body-content');
    const tabs    = screen.querySelectorAll('.shop-tab-btn');

    // Before chapter1 only the clothes tab is open
    const clothesOnly = !state.chapter1Completed;

    function selectTab(tabId) {
        if (clothesOnly && tabId !== 'clothes') return;
        _lastShopTab = tabId;
        tabs.forEach(t => {
            t.classList.toggle('shop-tab-btn--active', t.dataset.tab === tabId);
            if (clothesOnly) t.classList.toggle('shop-tab-btn--disabled', t.dataset.tab !== 'clothes');
        });
        _renderShopTab(tabId, content, screen);
    }

    tabs.forEach(tab => tab.addEventListener('click', () => selectTab(tab.dataset.tab)));
    // When clothes-only, always open on the clothes tab
    selectTab(clothesOnly ? 'clothes' : _lastShopTab);

    screen.querySelector('.shop-screen-back-btn')?.addEventListener('click', e => {
        e.stopPropagation();
        sfx('back');
        removeShopOverlay();
    });

    _tryPlayPostChapterOneMenuFirstOpenComment('chat_shop_opened_once');
}

// ─────────────────────────────────────────────────────────────
// Stats overlay
// ─────────────────────────────────────────────────────────────

function removeStatsOverlay() {
    document.querySelector('.stats-screen')?.remove();
}

function openStatsMenu() {
    if (document.querySelector('.stats-screen')) { removeStatsOverlay(); return; }
    removeSettingsOverlay();

    const tpl = document.getElementById('tmpl-stats-menu');
    if (!tpl) return;

    const node = tpl.content.cloneNode(true);
    const screen = node.querySelector('.stats-screen');

    // Populate rows
    const rows = screen.querySelector('.stats-rows');
    if (rows) _buildStatsRows(rows);

    screen.querySelector('.stats-screen-back-btn')?.addEventListener('click', e => {
        e.stopPropagation();
        sfx('back');
        removeStatsOverlay();
    });

    document.querySelector('.game-container').appendChild(screen);
    _tryPlayPostChapterOneMenuFirstOpenComment('chat_stats_opened_once');
}

function openSettingsMenu() {
    // Toggle
    if (document.querySelector('.settings-overlay')) {
        removeSettingsOverlay();
        return;
    }
    // Close any task menu first
    document.querySelector('.menu-overlay.sandbox-menu')?.remove();

    const tpl = document.getElementById('tmpl-settings-menu');
    if (!tpl) return;

    const node = tpl.content.cloneNode(true);
    const overlay = node.querySelector('.settings-overlay');

    // ── Back button ──
    overlay.querySelector('.settings-back-btn')?.addEventListener('click', e => {
        e.stopPropagation();
        sfx('back');
        removeSettingsOverlay();
    });

    // ── Music toggle ──
    const musicBtn = overlay.querySelector('#settings-music-btn');
    if (musicBtn) {
        musicBtn.setAttribute('aria-pressed', getMusicEnabled() ? 'true' : 'false');
        musicBtn.addEventListener('click', () => {
            const newOn = musicBtn.getAttribute('aria-pressed') === 'false';
            musicBtn.setAttribute('aria-pressed', newOn ? 'true' : 'false');
            setMusicEnabled(newOn);
            sfx('click');
        });
    }

    // ── SFX toggle ──
    const sfxBtn = overlay.querySelector('#settings-sfx-btn');
    if (sfxBtn) {
        sfxBtn.setAttribute('aria-pressed', getSfxEnabled() ? 'true' : 'false');
        sfxBtn.addEventListener('click', () => {
            const newOn = sfxBtn.getAttribute('aria-pressed') === 'false';
            sfxBtn.setAttribute('aria-pressed', newOn ? 'true' : 'false');
            setSfxEnabled(newOn);
            // Note: deliberately play click sound BEFORE potentially disabling SFX
            if (newOn) sfx('click');
        });
    }

    // ── Deeds / Stats ──
    const deedsBtn = overlay.querySelector('#settings-deeds-btn');
    if (deedsBtn && !deedsBtn.querySelector('.ach-badge')) {
        deedsBtn.appendChild(_makeAchBadge());
    }
    deedsBtn?.addEventListener('click', () => {
        sfx('click');
        openDeedsMenu();
    });
    updateAchievementBadges();
    overlay.querySelector('#settings-stats-btn')?.addEventListener('click', () => {
        sfx('click');
        openStatsMenu();
    });

    // ── Escape to Wilderness (reset) ──
    overlay.querySelector('#settings-restart-btn')?.addEventListener('click', () => {
        sfx('click');
        removeSettingsOverlay();
        _openResetPromptPopup();
    });

    // ── Volume sliders ──
    const musicSlider = document.createElement('input');
    musicSlider.type = 'range'; musicSlider.min = '0'; musicSlider.max = '1'; musicSlider.step = '0.01';
    musicSlider.value = getMusicVolume();
    musicSlider.className = 'settings-vol-slider settings-vol-slider--music';
    musicSlider.setAttribute('aria-label', 'Music volume');
    musicSlider.addEventListener('input', () => setMusicVolume(parseFloat(musicSlider.value)));
    overlay.appendChild(musicSlider);

    const sfxSlider = document.createElement('input');
    sfxSlider.type = 'range'; sfxSlider.min = '0'; sfxSlider.max = '1'; sfxSlider.step = '0.01';
    sfxSlider.value = getSfxVolume();
    sfxSlider.className = 'settings-vol-slider settings-vol-slider--sfx';
    sfxSlider.setAttribute('aria-label', 'SFX volume');
    sfxSlider.addEventListener('input', () => setSfxVolume(parseFloat(sfxSlider.value)));
    overlay.appendChild(sfxSlider);

    // ── Language toggle ──
    const langRow = document.createElement('div');
    langRow.className = 'settings-lang-row';
    ['ru', 'en'].forEach(lang => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.textContent = lang.toUpperCase();
        btn.className = 'settings-lang-btn' + (getLang() === lang ? ' settings-lang-btn--active' : '');
        if (lang === 'en') {
            btn.disabled = true;
            btn.classList.add('settings-lang-btn--locked');
        } else {
            btn.addEventListener('click', () => {
                setLang(lang);
                langRow.querySelectorAll('.settings-lang-btn').forEach(b => b.classList.remove('settings-lang-btn--active'));
                btn.classList.add('settings-lang-btn--active');
                sfx('click');
            });
        }
        langRow.appendChild(btn);
    });
    overlay.appendChild(langRow);

    document.querySelector('.game-container').appendChild(overlay);
}

// ─────────────────────────────────────────────────────────────
// Upgrades / Skill Tree overlay
// ─────────────────────────────────────────────────────────────

function removeUpgradesOverlay() {
    const screen = document.querySelector('.upgrades-screen');
    if (screen) {
        // Stop rAF loop before removal
        const rafId = screen.__upgradesRaf;
        if (rafId) cancelAnimationFrame(rafId);
        screen.__upgradesVpObserver?.disconnect();
        stopVoice();
        screen.remove();
        _ch1EventHook?.('ch1_upgrades_first_close');
    }
    startHomeMusic();
}

// ── 3-D projection helpers ────────────────────────────────────
// Convention: camera at z=cam.z looks toward NEGATIVE Z (objects at z < cam.z are in front).
// dz = cam.z - wz  (distance). Larger cam.z = zoomed out.
function _upgProject(wx, wy, wz, cam, focal, cx, cy) {
    const dz = cam.z - wz;
    if (dz <= 0.001) return null; // behind or on camera plane
    const scale = focal / dz;
    return {
        sx: cx + (wx - cam.x) * scale,
        sy: cy + (wy - cam.y) * scale,
        scale,
        dz,
    };
}

// ── Build visible node list ───────────────────────────────────
function _upgGetVisibleNodes(data, purchased) {
    const nodes  = data.nodes || [];
    const rootId = data.rootNodeId || 'core_designer';
    // Build adjacency map
    const adj = {};
    nodes.forEach(n => { if (n?.id) adj[n.id] = new Set(); });
    nodes.forEach(n => {
        if (!n?.id) return;
        (n.prerequisites || []).forEach(pid => {
            if (!adj[pid]) adj[pid] = new Set();
            adj[n.id].add(pid);
            adj[pid].add(n.id);
        });
    });

    // Determine forest visibility
    const forestNeeded = Math.max(1, Number(data.forestUnlockLevel) || 10);
    const forestVisible = (state.skillTree?.forestUnlockedPermanently) ||
                          (state.level >= forestNeeded);

    const visible = new Set([rootId]);
    const pSet = new Set(Object.entries(purchased || {})
        .filter(([,v]) => v).map(([k]) => k));

    pSet.forEach(id => {
        const node = nodes.find(n => n.id === id);
        if (!node) return;
        if (node.branch === 'forest' && !forestVisible) return;
        visible.add(id);
        (adj[id] || new Set()).forEach(nid => {
            const nb = nodes.find(n => n.id === nid);
            if (!nb) return;
            if (nb.branch === 'forest' && !forestVisible) return;
            visible.add(nid);
        });
    });

    return nodes.filter(n => {
        if (!n?.id || !visible.has(n.id)) return false;
        if (n.branch === 'forest' && !forestVisible) return false;
        return true;
    });
}

// ── Check if a node is purchaseable ──────────────────────────
function _upgNodeAvailability(node, purchased) {
    const p = purchased || {};
    // All prerequisites purchased (and at required tier if specified)?
    const prereqOk = (node.prerequisites || []).every(pid => {
        if (!p[pid]) return false;
        if (node.prerequisiteTiers?.[pid]) {
            return (state.skillTree?.tiers?.[pid] || 0) >= node.prerequisiteTiers[pid];
        }
        return true;
    });
    if (!prereqOk) {
        const lacking = (node.prerequisites || []).filter(pid => {
            if (!p[pid]) return true;
            if (node.prerequisiteTiers?.[pid]) return (state.skillTree?.tiers?.[pid] || 0) < node.prerequisiteTiers[pid];
            return false;
        });
        return { ok: false, reason: 'Требуется: ' + lacking.join(', ') };
    }
    // Level
    if (node.requirements?.level && state.level < node.requirements.level)
        return { ok: false, reason: 'Нужен уровень ' + node.requirements.level };
    // Research task
    if (node.requirements?.researchTaskCompleted) {
        const done = state.researchTaskCompletions?.[node.requirements.researchTaskCompleted];
        if (!done) return { ok: false, reason: 'Нужно: ' + (node.requirements.researchTaskTitle || node.requirements.researchTaskCompleted) };
    }
    // Smoked
    if (node.requirements?.smoked && (state.stats?.totalSmokeBreaks || 0) < node.requirements.smoked)
        return { ok: false, reason: `Нужно перекуров: ${node.requirements.smoked}` };
    // Chapter 1
    if (node.requirements?.chapter1Completed && !state.chapter1Completed)
        return { ok: false, reason: 'Требуется: Глава 1' };
    return { ok: true, reason: '' };
}

// ── Format costs string ───────────────────────────────────────
function _upgFormatCosts(costs) {
    if (!costs || !Object.keys(costs).length) return 'Бесплатно';
    const parts = [];
    if (costs.money)       parts.push(costs.money + ' ₽');
    if (costs.skillPoints) parts.push(costs.skillPoints + ' SP');
    if (costs.expertPoints) parts.push(costs.expertPoints + ' EP');
    if (costs.prestige)    parts.push(costs.prestige + ' Престиж');
    if (costs.butts)       parts.push(costs.butts + ' Бычков');
    return parts.join(' · ');
}

// ── Check if player can afford costs ─────────────────────────
function _upgCanAfford(costs) {
    if (!costs || !Object.keys(costs).length) return true;
    if (costs.money       && state.funds.lt(costs.money))       return false;
    if (costs.skillPoints && state.skillPoints < costs.skillPoints) return false;
    if (costs.expertPoints && (state.expertPoints || 0) < costs.expertPoints) return false;
    if (costs.prestige    && state.prestige    < costs.prestige)    return false;
    if (costs.butts       && state.cigaretteButts < costs.butts)    return false;
    return true;
}

// ── Tier helpers ─────────────────────────────────────────────
/** Max tiers for a node (1 for non-tiered nodes) */
function _upgNodeMaxTier(node) {
    return node.tiers ? node.tiers.length : 1;
}
/** Current tier for a node (0 = not purchased) */
function _upgNodeCurrentTier(nodeId) {
    return state.skillTree?.tiers?.[nodeId] || 0;
}
/** Tier definition for the NEXT purchase (null if maxed) */
function _upgGetNextTierDef(node) {
    const cur = _upgNodeCurrentTier(node.id);
    if (node.tiers) {
        return cur < node.tiers.length ? node.tiers[cur] : null;
    }
    // non-tiered node: costs/effects live on node itself
    return cur < 1 ? { costs: node.costs || {}, effects: node.effects || [], description: node.description || '' } : null;
}

function _upgPurchaseNode(nodeId, node) {
    const tierDef = _upgGetNextTierDef(node);
    if (!tierDef) return;
    const costs = tierDef.costs || {};
    if (costs.money)        state.funds          = state.funds.sub(costs.money);
    if (costs.skillPoints)  state.skillPoints    -= costs.skillPoints;
    if (costs.expertPoints) state.expertPoints    = Math.max(0, (state.expertPoints || 0) - costs.expertPoints);
    if (costs.prestige)     state.prestige       -= costs.prestige;
    if (costs.butts)        state.cigaretteButts -= costs.butts;
    if (!state.skillTree)
        state.skillTree = { purchased: {}, tiers: {}, viewport: { panX: 0, panY: 0, zoom: 1 }, forestUnlockedPermanently: false };
    if (!state.skillTree.tiers)     state.skillTree.tiers = {};
    if (!state.skillTree.purchased) state.skillTree.purchased = {};
    state.skillTree.tiers[nodeId] = (_upgNodeCurrentTier(nodeId)) + 1;
    state.skillTree.purchased[nodeId] = true; // backward compat: node is "purchased" when tier >= 1

    // Process effects that require immediate state side-effects
    for (const eff of (tierDef.effects || [])) {
        if (eff.type === 'unlock_research_task') {
            if (!state.unlockedSpecialTasks) state.unlockedSpecialTasks = {};
            state.unlockedSpecialTasks[eff.taskId] = true;
        }
        if (eff.type === 'forest_unlock') {
            state.skillTree.forestUnlockedPermanently = true;
        }
    }

    recomputeGenerationCooldown();
    startAutogenTicker();      // restart with updated interval if ai_autogen tier changed
    startHeadhunterTicker();   // restart with updated interval if ai_headhunter tier changed
    if (state.skillTree.purchased.ai_agent) startAgentTicker();  // start/restart agent income
    saveState();
}

// ── Re-apply all effects for already-purchased nodes (call after loadState) ──
export function reapplySkillTreeEffects() {
    if (!state.skillTree) state.skillTree = { purchased: {}, tiers: {}, viewport: { panX: 0, panY: 0, zoom: 1 }, forestUnlockedPermanently: false };
    if (!state.skillTree.viewport) state.skillTree.viewport = { panX: 0, panY: 0, zoom: 1 };
    if (!state.skillTree.purchased) state.skillTree.purchased = {};
    if (!state.skillTree.tiers)    state.skillTree.tiers = {};
    // Sync purchased map from tiers (for backward compat and new saves)
    for (const [id, tier] of Object.entries(state.skillTree.tiers)) {
        if (tier >= 1) state.skillTree.purchased[id] = true;
    }
    // Replay effects that require immediate state side-effects (load-time restore)
    const _allNodes = window.UPGRADES_DATA?.nodes || [];
    for (const node of _allNodes) {
        const currentTier = state.skillTree.tiers[node.id] || 0;
        if (currentTier < 1) continue;
        // Collect all effects from all purchased tiers
        for (let t = 1; t <= currentTier; t++) {
            const tierDef = node.tiers ? node.tiers[t - 1] : (t === 1 ? node : null);
            const effects = tierDef?.effects || [];
            for (const eff of effects) {
                if (eff.type === 'unlock_research_task') {
                    if (!state.unlockedSpecialTasks) state.unlockedSpecialTasks = {};
                    state.unlockedSpecialTasks[eff.taskId] = true;
                }
                if (eff.type === 'forest_unlock') {
                    state.skillTree.forestUnlockedPermanently = true;
                }
            }
        }
    }
    // cooldown-based effects are recalculated on-demand by recomputeGenerationCooldown().
    // stress_per_gen_reduction is also read on-demand — no replay needed.
}

// ── Popup ─────────────────────────────────────────────────────
function _upgOpenPopup(screen, nodeId, onPurchased) {
    // Remove existing
    screen.querySelector('.upgrades-popup-backdrop')?.remove();
    screen.querySelector('.upgrades-popup')?.remove();

    const data = window.UPGRADES_DATA || window.SKILL_TREE_DATA;
    if (!data) return;
    const node       = data.nodes.find(n => n.id === nodeId);
    if (!node) return;
    const purchased  = state.skillTree?.purchased || {};
    const curTier  = _upgNodeCurrentTier(nodeId);
    const maxTier  = _upgNodeMaxTier(node);
    const isMaxed  = curTier >= maxTier;
    const tierDef  = _upgGetNextTierDef(node);
    const isPurchased = curTier >= 1;
    const avail       = _upgNodeAvailability(node, purchased);
    const canBuy      = !isMaxed && avail.ok && _upgCanAfford(tierDef?.costs);

    const backdrop = document.createElement('div');
    backdrop.className = 'upgrades-popup-backdrop';
    backdrop.addEventListener('click', () => {
        backdrop.remove();
        screen.querySelector('.upgrades-popup')?.remove();
    });

    const popup = document.createElement('div');
    popup.className = 'upgrades-popup';

    // Close button
    const closeBtn = document.createElement('button');
    closeBtn.className = 'upgrades-popup-close';
    closeBtn.type = 'button';
    closeBtn.textContent = '✕';
    closeBtn.addEventListener('click', () => { backdrop.remove(); popup.remove(); });
    popup.appendChild(closeBtn);

    // Icon
    const icon = document.createElement('div');
    icon.className = 'upgrades-popup-icon' +
        (isMaxed ? ' upg-popup-icon--purchased' : (!avail.ok ? ' upg-popup-icon--locked' : ''));
    if (node.icon) icon.style.backgroundImage = `url('${node.icon}')`;
    popup.appendChild(icon);

    // Title (with tier badge for multi-tier nodes)
    const title = document.createElement('div');
    title.className = 'upgrades-popup-title';
    title.textContent = node.title || nodeId;
    if (maxTier > 1) {
        const badge = document.createElement('span');
        badge.className = 'upg-popup-tier-badge';
        badge.textContent = ` ${curTier}/${maxTier}`;
        title.appendChild(badge);
    }
    popup.appendChild(title);

    // Description (show next-tier description when not maxed)
    const descText = isMaxed ? node.description : (tierDef?.description || node.description);
    if (descText) {
        const desc = document.createElement('div');
        desc.className = 'upgrades-popup-desc';
        desc.textContent = descText;
        popup.appendChild(desc);
    }

    // Cost
    if (!isMaxed) {
        const cost = document.createElement('div');
        cost.className = 'upgrades-popup-cost';
        cost.textContent = 'Цена: ' + _upgFormatCosts(tierDef?.costs);
        popup.appendChild(cost);
    }

    // Requirement
    if (!isMaxed && !avail.ok) {
        const req = document.createElement('div');
        req.className = 'upgrades-popup-req';
        req.textContent = avail.reason;
        popup.appendChild(req);
    }

    // Buy / Upgrade / Maxed button
    const buyBtn = document.createElement('button');
    buyBtn.type = 'button';
    if (isMaxed) {
        buyBtn.className = 'upgrades-popup-buy-btn upg-purchased-label';
        buyBtn.textContent = maxTier > 1 ? 'Максимум' : 'Куплено';
        buyBtn.disabled = true;
    } else {
        buyBtn.className = 'upgrades-popup-buy-btn';
        buyBtn.textContent = curTier > 0 ? 'Улучшить' : 'Купить';
        buyBtn.disabled = !canBuy;
        buyBtn.addEventListener('click', () => {
            sfx('pop');
            _upgPurchaseNode(nodeId, node);
            backdrop.remove();
            popup.remove();
            if (node.isRoot || nodeId === (data.rootNodeId || 'core_designer')) {
                _tryPlayFirstOpenComment('chat_shop_root_upgrade_purchased_once');
            }
            if (onPurchased) onPurchased();
            _ch1EventHook?.('skill_node_purchased_' + nodeId);
            // Trigger flare on the freshly-rebuilt node element
            const nodeWrap = screen.querySelector(`[data-node-id="${nodeId}"]`);
            if (nodeWrap) {
                const nodeBtn = nodeWrap.querySelector('.upgrades-node') || nodeWrap;
                nodeBtn.classList.remove('purchase-flare');
                void nodeBtn.offsetWidth;
                nodeBtn.classList.add('purchase-flare');
                setTimeout(() => nodeBtn.classList.remove('purchase-flare'), 860);
            }
        });
    }
    popup.appendChild(buyBtn);

    // Fire CH1 blocked event when player opens popup for a locked node
    if (!isMaxed && !avail.ok) {
        if (nodeId === 'ai_autogen' && state.funds.gte(1000) && !state.ch1FiredEvents?.funds_reached_1000) {
            _ch1EventHook?.('funds_reached_1000');
        }
        _ch1EventHook?.('skill_node_blocked_' + nodeId);
    }

    screen.appendChild(backdrop);
    screen.appendChild(popup);
}

// ── Stars data ────────────────────────────────────────────────
function _upgInitStars(count = 500) {
    const stars = [];
    const nearCount = Math.floor(count * 0.22);  // ~22% close-camera stars
    for (let i = 0; i < count; i++) {
        const isNear = i < nearCount;
        stars.push({
            x:  (Math.random() - 0.5) * 4.0,
            y:  (Math.random() - 0.5) * 4.0,
            z:  isNear ? (0.10 + Math.random() * 0.28) : (0.50 + Math.random() * 1.90),
            vx: (Math.random() - 0.5) * (isNear ? 0.0004 : 0.0010),
            vy: (Math.random() - 0.5) * (isNear ? 0.0004 : 0.0010),
            twinkle:   Math.random() * Math.PI * 2,
            fadePhase: Math.random() * Math.PI * 2,
            fadeSpeed: 0.004 + Math.random() * 0.008,
            sizeSeed:  isNear ? (1.5 + Math.random() * 1.5) : (0.5 + Math.random() * 1.8),
            isNear,
        });
    }
    return stars;
}

// ── Upgrades first-open intro cinematic ──────────────────────
function runUpgradesIntro(screen) {
    if (state.upgradesIntroSeen) return;

    const wrap        = screen.querySelector('[data-upg-intro]');
    const singularity = screen.querySelector('[data-upg-singularity]');
    const shockwave   = screen.querySelector('[data-upg-shockwave]');
    const lineEl      = screen.querySelector('[data-upg-line]');
    const nextBtn     = screen.querySelector('[data-upg-next]');
    if (!wrap || !lineEl || !nextBtn) return;

    const lines = [
        t('upgrades_intro.line_01'),
        t('upgrades_intro.line_02'),
        t('upgrades_intro.line_03'),
        t('upgrades_intro.line_04'),
        t('upgrades_intro.line_05'),
        t('upgrades_intro.line_06'),
    ];

    wrap.hidden = false;
    screen.classList.add('intro-active');
    screen.classList.remove('intro-reveal', 'intro-finished');
    singularity?.classList.remove('visible', 'pulse', 'explode');
    shockwave?.classList.remove('explode');

    let cancelled = false;
    let typingTimeout = null;
    let isTyping = false;
    let typeResolve = null;

    function typeText(text) {
        return new Promise(resolve => {
            typeResolve = resolve;
            lineEl.textContent = '';
            isTyping = true;
            let i = 0;
            function tick() {
                if (cancelled) { resolve(); return; }
                if (i >= text.length) { isTyping = false; resolve(); return; }
                lineEl.textContent += text[i++];
                const delay = /[.!?,;]/.test(text[i - 1]) ? 38 : 18;
                typingTimeout = setTimeout(tick, delay);
            }
            tick();
        });
    }

    function finishTyping(text) {
        clearTimeout(typingTimeout);
        isTyping = false;
        lineEl.textContent = text;
        if (typeResolve) { const r = typeResolve; typeResolve = null; r(); }
    }

    function delay(ms) {
        return new Promise(resolve => { typingTimeout = setTimeout(resolve, ms); });
    }

    function waitClick(text) {
        return new Promise(async resolve => {
            if (cancelled) { resolve(); return; }
            startVoice('gg');
            await typeText(text);
            stopVoice();
            const handler = () => {
                if (cancelled) { nextBtn.removeEventListener('click', handler); resolve(); return; }
                if (isTyping) { finishTyping(text); stopVoice(); return; }
                nextBtn.removeEventListener('click', handler);
                resolve();
            };
            nextBtn.addEventListener('click', handler);
        });
    }

    function finish(markSeen) {
        cancelled = true;
        clearTimeout(typingTimeout);
        stopVoice();
        screen.classList.add('intro-finished');
        screen.classList.remove('intro-active');
        if (markSeen) {
            state.upgradesIntroSeen = true;
            saveState();
        }
        setTimeout(() => {
            screen.classList.remove('intro-reveal', 'intro-finished');
            wrap.hidden = true;
        }, 1200);
    }

    (async () => {
        await delay(400);
        if (cancelled) return;
        await waitClick(lines[0]);
        if (cancelled) return;
        await delay(250);
        if (cancelled) return;
        await waitClick(lines[1]);
        if (cancelled) return;
        await delay(300);
        if (cancelled) return;

        singularity?.classList.add('visible');
        await waitClick(lines[2]);
        if (cancelled) return;
        await delay(350);
        if (cancelled) return;

        singularity?.classList.add('pulse');
        await delay(700);
        if (cancelled) return;

        singularity?.classList.add('explode');
        shockwave?.classList.add('explode');
        screen.classList.add('intro-reveal');
        screen.__triggerUpgradesIntroBurst?.();
        await delay(380);
        if (cancelled) return;

        await waitClick(lines[3]);
        if (cancelled) return;
        await delay(240);
        if (cancelled) return;
        screen.__setCamTz?.(340);
        await waitClick(lines[4]);
        screen.__setCamTz?.(600);
        if (cancelled) return;
        await delay(260);
        if (cancelled) return;
        await waitClick(lines[5]);
        if (cancelled) return;

        await delay(800);
        finish(true);
    })();
}

// ── Main engine ───────────────────────────────────────────────
function openUpgradesMenu() {
    if (document.querySelector('.upgrades-screen')) { removeUpgradesOverlay(); return; }
    removeExistingOverlay();

    const tpl = document.getElementById('tmpl-upgrades-menu');
    if (!tpl) return;

    const node = tpl.content.cloneNode(true);
    const overlay = node.querySelector('.upgrades-screen') ?? node.firstElementChild;
    startSpaceMusic();

    const data = window.UPGRADES_DATA || window.SKILL_TREE_DATA;
    if (!data) { console.warn('[upgrades] UPGRADES_DATA not found'); return; }
    const rootNodeId = data.rootNodeId || 'core_designer';
    const rootNode = (data.nodes || []).find(n => n.id === rootNodeId);

    const screen = overlay;
    document.querySelector('.game-container').appendChild(screen);
    _ch1EventHook?.('ch1_upgrades_first_open');
    _tryPlayPostChapterOneMenuFirstOpenComment('chat_upgrades_menu_opened_once');

    // ── Camera state ──
    // cam.z = distance from scene; at 600 with focal=600 → scale=1 → 1 world-unit = 1px at min_dim=600.
    const cam = { x: 0, y: 0, z: 600, tz: 600,
                   anchorWX: null, anchorWY: null, anchorMX: 0, anchorMY: 0 };
    const CAM_Z_MIN = 280, CAM_Z_MAX = 2400;   // 280 = tightest allowed zoom-in
    const focal = 600;

    // ── Persistent star data ──
    const stars = _upgInitStars(820);

    // ── Bgimage layer cache ──
    const bgImages = [];
    const bgDefs = (data.bgLayers || []);
    bgDefs.forEach((def, idx) => {
        const img = new Image();
        img.src = def.src;
        // Per-layer wiggle phase seeds — random offsets so layers don't move in sync
        const wiggle = {
            phaseX: Math.random() * Math.PI * 2,
            phaseY: Math.random() * Math.PI * 2,
            phaseA: Math.random() * Math.PI * 2,  // alpha fluctuation phase
        };
        bgImages.push({ img, def, loaded: false, wiggle });
        img.onload = () => { bgImages[idx].loaded = true; };
    });

    let frameTime = 0;

    // ── Viewport cache — updated by ResizeObserver instead of every frame ──
    const _vp = { w: 1, h: 1, dpr: 1 };
    function _updateVp() {
        const rect = screen.getBoundingClientRect();
        _vp.w   = Math.max(1, Math.round(rect.width));
        _vp.h   = Math.max(1, Math.round(rect.height));
        _vp.dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
    }
    _updateVp();
    const _vpObserver = new ResizeObserver(_updateVp);
    _vpObserver.observe(screen);
    screen.__upgradesVpObserver = _vpObserver;

    // ── Canvas refs ──
    const starfieldCanvas = screen.querySelector('[data-upgrades-starfield]');
    const edgesCanvas     = screen.querySelector('[data-upgrades-edges]');
    const nodesLayer      = screen.querySelector('[data-upgrades-nodes]');
    const viewport        = screen.querySelector('[data-upgrades-viewport]');

    const sfCtx  = starfieldCanvas.getContext('2d', { alpha: false });
    const edCtx  = edgesCanvas.getContext('2d',     { alpha: true  });

    function updateIntroOrigin(vW, vH, f, cx, cy) {
        if (!rootNode) return;
        const proj = _upgProject(rootNode.x || 0, rootNode.y || 0, rootNode.z || 0, cam, f, cx, cy);
        if (!proj) return;
        screen.style.setProperty('--upgr-intro-origin-x', `${proj.sx}px`);
        screen.style.setProperty('--upgr-intro-origin-y', `${proj.sy}px`);
    }

    function triggerUpgradesIntroBurst(vW, vH, f, cx, cy) {
        if (!rootNode) return;
        const proj = _upgProject(rootNode.x || 0, rootNode.y || 0, rootNode.z || 0, cam, f, cx, cy);
        if (!proj) return;

        const particles = [];
        const count = 180;
        for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = 1.8 + Math.random() * 8.6;
            particles.push({
                x: proj.sx,
                y: proj.sy,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                life: 28 + Math.floor(Math.random() * 26),
                maxLife: 28 + Math.floor(Math.random() * 26),
                size: 1 + Math.random() * 3.4,
                hue: Math.random() < 0.7 ? '255,255,255' : '180,225,255',
            });
        }

        screen.__upgradesIntroBurst = {
            particles,
            ring: 1,
            flash: 1,
            width: vW,
            height: vH,
        };
    }

    screen.__triggerUpgradesIntroBurst = () => {
        const rect = screen.getBoundingClientRect();
        const vW = Math.max(1, Math.round(rect.width));
        const vH = Math.max(1, Math.round(rect.height));
        const cx = vW * 0.5;
        const cy = vH * 0.5;
        const f = focal * Math.min(vW, vH) / 600;
        triggerUpgradesIntroBurst(vW, vH, f, cx, cy);
    };

    // ── Resize canvases helper ──
    function resizeCanvas(canvas, w, h, dpr) {
        const pw = Math.floor(w * dpr), ph = Math.floor(h * dpr);
        if (canvas.width !== pw || canvas.height !== ph) {
            canvas.width = pw; canvas.height = ph;
        }
    }

    // ── Node DOM management ──
    let nodeEls = {}; // id → element

    function buildNodeEls() {
        nodesLayer.innerHTML = '';
        nodeEls = {};
        const purchased = state.skillTree?.purchased || {};
        const visibleNodes = _upgGetVisibleNodes(data, purchased);

        visibleNodes.forEach(node => {
            const curTier = _upgNodeCurrentTier(node.id);
            const maxTier = _upgNodeMaxTier(node);
            const avail   = _upgNodeAvailability(node, purchased);
            const cls = curTier >= maxTier ? 'upg-purchased' :
                        curTier > 0        ? 'upg-partial'   :
                        avail.ok           ? 'upg-available'  : 'upg-locked';

            const wrap = document.createElement('div');
            wrap.className = 'upgrades-node-wrap';
            wrap.dataset.nodeId = node.id;

            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = `upgrades-node ${cls}${node.isRoot ? ' upg-root' : ''}`;
            const img = document.createElement('img');
            img.src = node.icon || '';
            img.alt = node.title || '';
            img.draggable = false;
            btn.appendChild(img);

            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                _upgOpenPopup(screen, node.id, () => {
                    buildNodeEls();     // rebuild after purchase
                    updateHud();
                });
            });

            wrap.appendChild(btn);

            if (maxTier > 1) {
                const pips = document.createElement('div');
                pips.className = 'upg-tier-pips';
                for (let i = 0; i < maxTier; i++) {
                    const pip = document.createElement('span');
                    pip.className = 'upg-tier-pip' + (i < curTier ? ' upg-tier-pip--filled' : '');
                    pips.appendChild(pip);
                }
                wrap.appendChild(pips);
            }

            nodesLayer.appendChild(wrap);
            nodeEls[node.id] = wrap;
        });
    }

    // ── HUD update ──
    function updateHud() {
        const q  = sel => screen.querySelector(sel);
        const v  = (sel, val) => { const el = q(sel); if (el) el.textContent = val; };
        v('[data-upgrades-hud-money-val]',   state.funds.toNumber() < 1e15
            ? Math.max(0, Math.round(state.funds.toNumber())).toLocaleString('ru-RU') + ' ₽'
            : state.funds.toExponential(2) + ' ₽');
        v('[data-upgrades-hud-sp-val]',      Math.max(0, Math.round(state.skillPoints)));
        v('[data-upgrades-hud-prestige-val]',Math.max(0, Math.round(state.prestige)));
        v('[data-upgrades-hud-butts-val]',   Math.max(0, Math.round(state.cigaretteButts)));
    }

    // ── Frame render ──
    function renderFrame(ts) {
        if (!screen.isConnected) return;   // overlay was removed
        screen.__upgradesRaf = requestAnimationFrame(renderFrame);

        // ── Soft pan limits: spring back when not dragging and no zoom anchor active
        const PAN_LIMIT_X = 900;
        const PAN_LIMIT_Y = 1400;
        if (!isDragging && cam.anchorWX === null) {
            const snapX = Math.max(-PAN_LIMIT_X, Math.min(PAN_LIMIT_X, cam.x));
            const snapY = Math.max(-PAN_LIMIT_Y, Math.min(PAN_LIMIT_Y, cam.y));
            cam.x += (snapX - cam.x) * 0.07;
            cam.y += (snapY - cam.y) * 0.07;
        }

        // Spring zoom
        cam.z += (cam.tz - cam.z) * 0.085;

        frameTime += 1;
        const vW  = _vp.w;
        const vH  = _vp.h;
        const dpr = _vp.dpr;
        const cx  = vW * 0.5;
        const cy  = vH * 0.5;

        // ── Resize canvases ──
        resizeCanvas(starfieldCanvas, vW, vH, dpr);
        resizeCanvas(edgesCanvas,     vW, vH, dpr);

        // ── Focal scaled to viewport ──
        const f = focal * Math.min(vW, vH) / 600;
        updateIntroOrigin(vW, vH, f, cx, cy);

        // ── Zoom anchor: keeps the exact world point under cursor throughout the spring
        // Prevents pan jitter when cam.z is still travelling toward cam.tz
        if (cam.anchorWX !== null && !isDragging) {
            const scaleNow = f / cam.z;
            cam.x = cam.anchorWX - cam.anchorMX / scaleNow;
            cam.y = cam.anchorWY - cam.anchorMY / scaleNow;
            if (Math.abs(cam.z - cam.tz) < 0.5) cam.anchorWX = null;
        }

        // ────────── STARFIELD + BG LAYERS (starfield canvas) ──────
        sfCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
        sfCtx.imageSmoothingEnabled = false;   // pixel-perfect PNG layers
        sfCtx.fillStyle = '#000000';           // pure black — maximum star contrast
        sfCtx.fillRect(0, 0, vW, vH);

        // Zoom progress — used by stars DoF and BG layer blur/darken
        const REF_CAM_Z = 600;
        const t_out = Math.max(0, (cam.z - REF_CAM_Z) / (CAM_Z_MAX - REF_CAM_Z));
        const t_in  = Math.max(0, (REF_CAM_Z - cam.z) / (REF_CAM_Z - CAM_Z_MIN));

        // Stars drawn FIRST — BG layers use screen-blend and can only brighten them, never hide them.
        sfCtx.globalCompositeOperation = 'source-over';
        const focalStars  = Math.min(vW, vH) * 0.68;
        const camZoom     = 600 / Math.max(1, cam.z);           // 1.0 at default zoom
        const camPanX_px  = cam.x * f / Math.max(1, cam.z);     // cam.x in screen-pixels
        const camPanY_px  = cam.y * f / Math.max(1, cam.z);

        for (let i = 0; i < stars.length; i++) {
            const star = stars[i];
            star.x += star.vx;
            star.y += star.vy;
            star.z += Math.sin(frameTime * 0.008 + star.twinkle) * 0.0004;
            star.twinkle   += 0.009;
            star.fadePhase += star.fadeSpeed;

            if (star.z <= (star.isNear ? 0.06 : 0.16) || star.z > 2.5 || Math.abs(star.x) > 3.3 || Math.abs(star.y) > 3.3) {
                star.x  = (Math.random() - 0.5) * 2.8;
                star.y  = (Math.random() - 0.5) * 2.8;
                star.z  = star.isNear ? (0.10 + Math.random() * 0.28) : (0.55 + Math.random() * 1.75);
                star.vx = (Math.random() - 0.5) * (star.isNear ? 0.0004 : 0.0012);
                star.vy = (Math.random() - 0.5) * (star.isNear ? 0.0004 : 0.0012);
                star.twinkle   = Math.random() * Math.PI * 2;
                star.fadePhase = Math.random() * Math.PI * 2;
                star.fadeSpeed = 0.004 + Math.random() * 0.008;
                star.sizeSeed  = star.isNear ? (1.5 + Math.random() * 1.5) : (0.6 + Math.random() * 1.7);
            }

            const depth  = 1 / Math.max(0.08, star.z);
            // Zoom rush: near stars (high depth) spread from center when zooming in,
            // far stars barely move — gives the feeling of flying through the field
            const zoomRush = Math.pow(camZoom, 0.36 + depth * 0.052);
            const baseX  = star.x * focalStars * depth * zoomRush;
            const baseY  = star.y * focalStars * depth * zoomRush;
            // Pan parallax: near stars drift much faster than distant ones (real 3D)
            const parallaxScale = depth * 0.082;
            const sx = cx + baseX + camPanX_px * parallaxScale;
            const sy = cy + baseY + camPanY_px * parallaxScale;

            if (sx < -8 || sx > vW + 8 || sy < -8 || sy > vH + 8) continue;

            const twinkle = 0.58 + 0.42 * Math.sin(frameTime * 0.028 + star.twinkle);
            const fade    = 0.36 + 0.64 * (0.5 + 0.5 * Math.sin(star.fadePhase));
            const alpha   = Math.max(0.12, Math.min(1, (0.28 + depth * 0.52) * twinkle * fade));
            const size    = Math.max(1, Math.min(6, Math.round(star.sizeSeed + depth * 1.5)));

            // Star DoF blur: distant stars (high z) blur like far BG layer when zooming in,
            // near stars stay sharp always.
            // star.z range: 0.1 (near) … 2.5 (far). Normalise to 0→1 over z=0.5…2.5
            const starDepthT = Math.max(0, Math.min(1, (star.z - 0.5) / 2.0));
            const starBlur   = t_in * starDepthT * 3.5;   // max 3.5px for farthest stars at full zoom-in

            if (star.z < 0.35)      sfCtx.fillStyle = `rgba(255,255,230,${Math.min(1, alpha * 1.4).toFixed(3)})`;
            else if (star.z < 0.7)  sfCtx.fillStyle = `rgba(210,240,255,${alpha.toFixed(3)})`;
            else if (star.z < 1.4)  sfCtx.fillStyle = `rgba(255,255,255,${alpha.toFixed(3)})`;
            else                    sfCtx.fillStyle = `rgba(180,185,210,${alpha.toFixed(3)})`;

            if (starBlur > 0.4) {
                sfCtx.save();
                sfCtx.filter = `blur(${starBlur.toFixed(1)}px)`;
                sfCtx.fillRect(Math.round(sx), Math.round(sy), size, size);
                sfCtx.restore();
            } else {
                sfCtx.fillRect(Math.round(sx), Math.round(sy), size, size);
            }
        }

        // BG parallax PNG layers — perspective-correct: each layer sits at its worldZ depth.
        bgImages.forEach(({ img, def, loaded, wiggle }, layerIdx) => {
            if (!loaded) return;

            // Perspective depth
            const dz    = Math.max(1, cam.z + Math.abs(def.worldZ || 0));
            const refDz = REF_CAM_Z + Math.abs(def.worldZ || 0);

            // Wiggle: near layer (idx 2) gets 7× amplitude — visible float
            const wiggleAmpMul = layerIdx === 2 ? 7.0 : 1.0;
            const wiggleAmp    = Math.max(vW, vH) * 0.005 * wiggleAmpMul;
            const wiggleSpeed  = 0.0005;
            const wX = Math.sin(frameTime * wiggleSpeed + wiggle.phaseX) * wiggleAmp;
            const wY = Math.cos(frameTime * wiggleSpeed * 0.73 + wiggle.phaseY) * wiggleAmp;

            // Far layer (idx 0) is fully static — infinite-distance backdrop, no pan response.
            // Mid/near layers pan with perspective-correct depth.
            const offX = (layerIdx === 0 ? 0 : -cam.x * f / dz) + wX;
            const offY = (layerIdx === 0 ? 0 : -cam.y * f / dz) + wY;

            // Perspective scale, softened so layer never vanishes at extremes
            const perspScale  = refDz / dz;
            const scaleFactor = perspScale * 0.65 + 0.35;
            // Far layer (idx 0) drawn at 0.455 of base (was 0.65, -30% more)
            // Mid layer (idx 1) drawn at 0.85 of base
            const layerShrink = layerIdx === 0 ? 0.455 : layerIdx === 1 ? 0.85 : 1.0;
            const cover = Math.max(vW, vH) * 3.6 * scaleFactor * layerShrink;
            const aspect = (img.naturalWidth || 1) / Math.max(1, img.naturalHeight);
            const iw = aspect >= 1 ? cover         : cover * aspect;
            const ih = aspect >= 1 ? cover / aspect : cover;

            // Alpha fluctuation: near layer (idx 2) has strong breathing, mid has moderate, far is static
            const baseAlpha     = def.alpha ?? 0.7;
            const alphaFluctAmp = layerIdx === 0 ? 0.0 : layerIdx === 2 ? 0.16 : 0.08;
            const alphaFluct    = Math.sin(frameTime * 0.00012 + wiggle.phaseA) * alphaFluctAmp;
            let   finalAlpha    = Math.max(0.08, Math.min(1.0, baseAlpha + alphaFluct));
            // Far layer darkens when camera zooms very close ("past" it)
            if (layerIdx === 0) finalAlpha = Math.max(0.04, finalAlpha * (1 - t_in * 0.62));

            // Depth-of-field blur:
            // far(0): NO blur at max-out; ramps 0→9px as t_in goes 0.5→1.0
            // mid(1): blurs 0→3px as camera zooms in
            // near(2): always sharp
            const farBlur = layerIdx === 0 ? Math.max(0, (t_in - 0.5) / 0.5) * 9.0 : 0;
            const layerBlurPx = [
                farBlur,
                t_in  * 3.0,
                0,
            ][layerIdx] ?? 0;

            sfCtx.save();
            sfCtx.imageSmoothingEnabled    = false;
            sfCtx.globalAlpha              = finalAlpha;
            sfCtx.globalCompositeOperation = def.blend || 'screen';
            if (layerBlurPx > 0.3) sfCtx.filter = `blur(${layerBlurPx.toFixed(1)}px)`;
            sfCtx.drawImage(img, cx + offX - iw * 0.5, cy + offY - ih * 0.5, iw, ih);
            sfCtx.restore();
        });

        const burst = screen.__upgradesIntroBurst;
        if (burst?.particles?.length) {
            sfCtx.save();
            sfCtx.globalCompositeOperation = 'screen';
            for (let i = burst.particles.length - 1; i >= 0; i--) {
                const p = burst.particles[i];
                p.x += p.vx;
                p.y += p.vy;
                p.vx *= 0.985;
                p.vy *= 0.985;
                p.vy += 0.015;
                p.life -= 1;
                if (p.life <= 0) {
                    burst.particles.splice(i, 1);
                    continue;
                }
                const alpha = Math.max(0, p.life / p.maxLife);
                sfCtx.fillStyle = `rgba(${p.hue},${(alpha * 0.95).toFixed(3)})`;
                sfCtx.shadowBlur = 10;
                sfCtx.shadowColor = `rgba(${p.hue},${(alpha * 0.85).toFixed(3)})`;
                sfCtx.fillRect(p.x, p.y, p.size, p.size);
            }
            sfCtx.restore();

            burst.ring = Math.max(0, burst.ring - 0.045);
            burst.flash = Math.max(0, burst.flash - 0.075);
            if (burst.ring > 0.01) {
                const ringRadius = Math.min(vW, vH) * (0.08 + (1 - burst.ring) * 0.72);
                const ringAlpha = burst.ring * 0.35;
                const rootProj = rootNode ? _upgProject(rootNode.x || 0, rootNode.y || 0, rootNode.z || 0, cam, f, cx, cy) : null;
                if (rootProj) {
                    sfCtx.save();
                    sfCtx.globalCompositeOperation = 'screen';
                    sfCtx.strokeStyle = `rgba(255,255,255,${ringAlpha.toFixed(3)})`;
                    sfCtx.lineWidth = 2;
                    sfCtx.shadowBlur = 18;
                    sfCtx.shadowColor = `rgba(200,235,255,${(ringAlpha * 1.2).toFixed(3)})`;
                    sfCtx.beginPath();
                    sfCtx.arc(rootProj.sx, rootProj.sy, ringRadius, 0, Math.PI * 2);
                    sfCtx.stroke();
                    sfCtx.restore();
                }
            }
            if (burst.flash > 0.01) {
                sfCtx.save();
                sfCtx.globalCompositeOperation = 'screen';
                sfCtx.fillStyle = `rgba(255,255,255,${(burst.flash * 0.12).toFixed(3)})`;
                sfCtx.fillRect(0, 0, vW, vH);
                sfCtx.restore();
            }
            if (!burst.particles.length && burst.ring <= 0.01 && burst.flash <= 0.01) {
                screen.__upgradesIntroBurst = null;
            }
        }

        // ── Vignette — darkens edges for deep-space atmosphere
        {
            const vig = sfCtx.createRadialGradient(
                cx, cy, Math.min(vW, vH) * 0.08,
                cx, cy, Math.max(vW, vH) * 0.80
            );
            vig.addColorStop(0, 'rgba(0,0,0,0)');
            vig.addColorStop(1, 'rgba(0,0,0,0.72)');
            sfCtx.save();
            sfCtx.globalCompositeOperation = 'source-over';
            sfCtx.globalAlpha = 1;
            sfCtx.fillStyle   = vig;
            sfCtx.fillRect(0, 0, vW, vH);
            sfCtx.restore();
        }

        // Branch glow orbs (drawn at node world positions)
        const purchased   = state.skillTree?.purchased || {};
        const visibleNodes  = _upgGetVisibleNodes(data, purchased);
        const branches    = data.branches || {};
        const branchGlowR = Math.min(vW, vH) * 0.12;
        Object.values(branches).forEach(br => {
            if (!br.glowColor) return;
            const brNodes = visibleNodes.filter(n => n.branch === br.id);
            if (!brNodes.length) return;
            const sumX = brNodes.reduce((a, n) => a + (n.x || 0), 0) / brNodes.length;
            const sumY = brNodes.reduce((a, n) => a + (n.y || 0), 0) / brNodes.length;
            const proj = _upgProject(sumX, sumY, 0, cam, f, cx, cy);
            if (!proj) return;
            const glowR = branchGlowR * Math.max(0.4, Math.min(2.5, proj.scale)) * 1.5;
            const grad  = sfCtx.createRadialGradient(proj.sx, proj.sy, 0, proj.sx, proj.sy, glowR);
            const glowInner = br.glowColor.replace(/,\s*[\d.]+\)$/, ', 0.28)');
            grad.addColorStop(0,   glowInner);
            grad.addColorStop(1,   'rgba(0,0,0,0)');
            sfCtx.save();
            sfCtx.globalCompositeOperation = 'screen';
            sfCtx.globalAlpha = 1;
            sfCtx.fillStyle   = grad;
            sfCtx.beginPath();
            sfCtx.arc(proj.sx, proj.sy, glowR, 0, Math.PI * 2);
            sfCtx.fill();
            sfCtx.restore();
        });

        // ── Per-node purchased glow (small atmospheric halo under the node icon)
        visibleNodes.forEach(n => {
            if (!(state.skillTree?.purchased || {})[n.id]) return;
            const proj = _upgProject(n.x || 0, n.y || 0, n.z || 0, cam, f, cx, cy);
            if (!proj) return;
            const r    = Math.min(vW, vH) * 0.060 * Math.max(0.4, Math.min(2.5, proj.scale));
            const grad = sfCtx.createRadialGradient(proj.sx, proj.sy, 0, proj.sx, proj.sy, r);
            grad.addColorStop(0, 'rgba(61,189,112,0.50)');
            grad.addColorStop(1, 'rgba(0,0,0,0)');
            sfCtx.save();
            sfCtx.globalCompositeOperation = 'screen';
            sfCtx.globalAlpha = 1;
            sfCtx.fillStyle   = grad;
            sfCtx.beginPath();
            sfCtx.arc(proj.sx, proj.sy, r, 0, Math.PI * 2);
            sfCtx.fill();
            sfCtx.restore();
        });

        // ────────── EDGES (edges canvas) ──────────────────────────
        edCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
        edCtx.clearRect(0, 0, vW, vH);
        edCtx.lineWidth = Math.max(1, 2 * dpr * 0.5);
        edCtx.strokeStyle = 'rgba(232, 230, 219, 0.60)';
        edCtx.lineCap = 'round';

        visibleNodes.forEach(node => {
            const to   = _upgProject(node.x || 0, node.y || 0, node.z || 0, cam, f, cx, cy);
            if (!to) return;
            (node.prerequisites || []).forEach(pid => {
                const pNode = data.nodes.find(n => n.id === pid);
                if (!pNode) return;
                const from = _upgProject(pNode.x || 0, pNode.y || 0, pNode.z || 0, cam, f, cx, cy);
                if (!from) return;
                edCtx.beginPath();
                edCtx.moveTo(from.sx, from.sy);
                edCtx.lineTo(to.sx,   to.sy);
                edCtx.stroke();
            });
        });

        // ────────── NODE positions via projection ──────────────────
        visibleNodes.forEach(node => {
            const el = nodeEls[node.id];
            if (!el) return;
            const proj = _upgProject(node.x || 0, node.y || 0, node.z || 0, cam, f, cx, cy);
            if (!proj) { el.style.display = 'none'; return; }
            el.style.display   = '';
            el.style.left      = proj.sx + 'px';
            el.style.top       = proj.sy + 'px';
            // Scale = 1.0 at neutral cam.z=600; 2.0 when zoomed in to z=300; 0.5 when z=1200.
            el.style.setProperty('--unode-scale', Math.max(0.2, Math.min(4, 600 / proj.dz)).toFixed(3));
        });
    }

    // ── Initial build ──
    buildNodeEls();
    updateHud();
    screen.__setCamTz = (tz) => { cam.tz = Math.max(CAM_Z_MIN, Math.min(CAM_Z_MAX, tz)); };
    runUpgradesIntro(screen);

    // Camera already initialised above (cam.z=600); root at (0,0,0) projects to screen centre.

    // ── Back button ──
    screen.querySelector('.upgrades-back-btn')?.addEventListener('click', e => {
        e.stopPropagation();
        sfx('back');
        removeUpgradesOverlay();
    });

    // ── DRAG + PINCH ──────────────────────────────────────────
    let isDragging    = false;
    let lastPointers  = [];                // touch pointer cache

    function getCenter(pts) {
        const x = pts.reduce((s, p) => s + p.clientX, 0) / pts.length;
        const y = pts.reduce((s, p) => s + p.clientY, 0) / pts.length;
        return { x, y };
    }
    function getDist(pts) {
        if (pts.length < 2) return 0;
        const dx = pts[0].clientX - pts[1].clientX;
        const dy = pts[0].clientY - pts[1].clientY;
        return Math.hypot(dx, dy);
    }

    // Block touchmove on the viewport so Telegram doesn't intercept vertical
    // swipes as "swipe-to-minimize" while the user is panning the skill tree.
    viewport.addEventListener('touchstart', e => { e.preventDefault(); }, { passive: false });
    viewport.addEventListener('touchmove',  e => { e.preventDefault(); }, { passive: false });

    viewport.addEventListener('pointerdown', e => {
        if (screen.classList.contains('intro-active')) return;
        if (e.target.closest('.upgrades-node')) return;
        viewport.setPointerCapture(e.pointerId);
        lastPointers = [...lastPointers.filter(p => p.pointerId !== e.pointerId), e];
        isDragging = true;
        cam.anchorWX = null;   // release zoom anchor on manual drag
        viewport.classList.add('dragging');
    }, { passive: false });

    viewport.addEventListener('pointermove', e => {
        if (screen.classList.contains('intro-active')) return;
        if (!isDragging) return;
        const prev = lastPointers.find(p => p.pointerId === e.pointerId);
        const updated = [...lastPointers.filter(p => p.pointerId !== e.pointerId), e];

        if (lastPointers.length === 1 && updated.length === 1) {
            // Single pointer — pan
            const dx = e.clientX - (prev?.clientX || e.clientX);
            const dy = e.clientY - (prev?.clientY || e.clientY);
            const rect  = viewport.getBoundingClientRect();
            const fNow  = focal * Math.min(rect.width, rect.height) / 600;
            const scale = fNow / cam.z;
            cam.x -= dx / scale;
            cam.y -= dy / scale;
        } else if (lastPointers.length >= 2 && updated.length >= 2) {
            // Two pointers — zoom-to-pinch-center + pan
            const rect     = viewport.getBoundingClientRect();
            const fNow     = focal * Math.min(rect.width, rect.height) / 600;
            const vc_x     = rect.left + rect.width  * 0.5;
            const vc_y     = rect.top  + rect.height * 0.5;

            const prevPts  = lastPointers.slice(-2);
            const curPts   = updated.slice(-2);
            const prevCen  = getCenter(prevPts);
            const curCen   = getCenter(curPts);
            const prevDist = getDist(prevPts);
            const curDist  = getDist(curPts);

            if (prevDist > 1) {
                // World point under pinch center before zoom
                const pcx      = prevCen.x - vc_x;
                const pcy      = prevCen.y - vc_y;
                const oldScale = fNow / cam.z;
                const wx       = cam.x + pcx / oldScale;
                const wy       = cam.y + pcy / oldScale;

                // Apply zoom toward pinch center
                cam.z = Math.max(CAM_Z_MIN, Math.min(CAM_Z_MAX, cam.z * (prevDist / curDist)));

                // Reposition cam so pinch-center world point stays under pinch center
                const newScale = fNow / cam.z;
                cam.x = wx - pcx / newScale;
                cam.y = wy - pcy / newScale;

                // Also pan from pinch center translation
                cam.x -= (curCen.x - prevCen.x) / newScale;
                cam.y -= (curCen.y - prevCen.y) / newScale;
            }
        }

        lastPointers = updated;
    }, { passive: false });

    const endDrag = (e) => {
        lastPointers = lastPointers.filter(p => p.pointerId !== e.pointerId);
        if (!lastPointers.length) {
            isDragging = false;
            viewport.classList.remove('dragging');
        }
    };
    viewport.addEventListener('pointerup',     endDrag, { passive: true });
    viewport.addEventListener('pointercancel', endDrag, { passive: true });

    // Mouse wheel zoom — smooth accumulated target with smaller per-tick steps
    let _wheelAcc = 0;           // accumulated raw deltaY pixels for this gesture
    let _wheelRaf = 0;           // rAF id for draining the accumulator
    viewport.addEventListener('wheel', e => {
        if (screen.classList.contains('intro-active')) return;
        e.preventDefault();
        const rect = viewport.getBoundingClientRect();
        const fNow = focal * Math.min(rect.width, rect.height) / 600;

        // Normalise deltaY to line units (~16px per line, ~600px per page)
        let dy = e.deltaY;
        if      (e.deltaMode === 1) dy *= 16;   // DOM_DELTA_LINE
        else if (e.deltaMode === 2) dy *= 600;  // DOM_DELTA_PAGE

        _wheelAcc += dy;

        // Cursor in viewport space
        const mx = e.clientX - rect.left - rect.width  * 0.5;
        const my = e.clientY - rect.top  - rect.height * 0.5;

        // Apply accumulated zoom as a series of tiny steps for smoothness
        cancelAnimationFrame(_wheelRaf);
        const applyZoom = () => {
            if (Math.abs(_wheelAcc) < 0.5) { _wheelAcc = 0; return; }
            const chunk   = _wheelAcc * 0.14;
            _wheelAcc    -= chunk;
            const factor  = Math.exp(chunk * 0.0022);
            const rect2   = viewport.getBoundingClientRect();
            const fNow2   = focal * Math.min(rect2.width, rect2.height) / 600;
            // Lock world point under cursor using ACTUAL cam.z (not target) —
            // renderFrame will recompute cam.x/cam.y each frame to honour this anchor
            const scaleActual = fNow2 / cam.z;
            cam.anchorWX = cam.x + mx / scaleActual;
            cam.anchorWY = cam.y + my / scaleActual;
            cam.anchorMX = mx;
            cam.anchorMY = my;
            cam.tz = Math.max(CAM_Z_MIN, Math.min(CAM_Z_MAX, cam.tz * factor));
            _wheelRaf = requestAnimationFrame(applyZoom);
        };
        _wheelRaf = requestAnimationFrame(applyZoom);
    }, { passive: false });

    // ── Start render loop ──
    screen.__upgradesRaf = requestAnimationFrame(renderFrame);
}

export function openMenuOverlay(name) {
    // Don't re-open the same menu
    const existing = document.querySelector('.menu-overlay.sandbox-menu');
    if (existing && existing.dataset.menu === name) {
        removeExistingOverlay();
        return;
    }
    removeExistingOverlay();

    const tpl = document.getElementById('tmpl-menu');
    if (!tpl) return;

    const overlay = document.createElement('div');
    overlay.className = 'menu-overlay sandbox-menu';
    overlay.dataset.menu = name;

    const inner = document.createElement('div');
    inner.className = 'menu-overlay-inner';

    const node = tpl.content.cloneNode(true);
    const shell = node.querySelector('.menu-shell');
    if (shell) {
        shell.dataset.menu = name;
        applyMenuConfig(shell, name);
    }
    inner.appendChild(node);
    overlay.appendChild(inner);

    document.querySelector('.game-container').appendChild(overlay);
    // Must add .active AFTER appending — style.css: .menu-overlay { display:none }
    // .menu-overlay.active { display:flex }
    requestAnimationFrame(() => overlay.classList.add('active'));

    // Populate body with live content
    const body = overlay.querySelector('.menu-body');
    if (body) renderMenuContent(body, name);

    if (name === 'orders') {
        if (!_tryPlayMenuTutorialHubHint()) _tryPlayMenuTutorialCategoryHint('orders');
    } else {
        const playedTutorial = _tryPlayMenuTutorialCategoryHint(name);
        if (!playedTutorial) _tryPlayCategoryFirstOpenComment(name);
    }

    // Back button
    const footerBtn = overlay.querySelector('.menu-footer-btn');
    if (footerBtn) {
        footerBtn.addEventListener('click', e => {
            e.stopPropagation();
            sfx('back');
            removeExistingOverlay();
        });
    }

    // Click outside to close
    overlay.addEventListener('click', e => {
        if (e.target === overlay) removeExistingOverlay();
    });
}

// ─────────────────────────────────────────────────────────────
// Notification badges — one per sidebar button
// ─────────────────────────────────────────────────────────────

// Map: btn id → { category, slotIndex, sidebarId }
const BADGE_MAP = {
    'orders-btn':   { category: 'orders',   slot: 0, sidebar: 'right-sidebar' },
    'story-btn':    { category: 'story',    slot: 1, sidebar: 'right-sidebar' },
    'research-btn': { category: 'research', slot: 2, sidebar: 'right-sidebar' },
    'promo-btn':    { category: 'promo',    slot: 3, sidebar: 'right-sidebar' },
};

// Keep refs to created badge imgs keyed by btn id
const _badges = {};

/** Call after bindSidebars() to inject badge elements into each sidebar */
function initBadges() {
    for (const [id, cfg] of Object.entries(BADGE_MAP)) {
        const sidebar = document.getElementById(cfg.sidebar);
        if (!sidebar) continue;
        const img = document.createElement('img');
        img.className = 'sbtn-badge';
        img.src = 'UI/icons/icon-alert.png';
        img.alt = '';
        img.dataset.for = String(cfg.slot);
        sidebar.appendChild(img);
        _badges[id] = img;
    }
}

/** Count available (not active) orders for a given category */
function countAvailable(category) {
    if (category === 'research') {
        return RESEARCH_TASKS.filter(task => {
            if (!state.unlockedSpecialTasks?.[task.id]) return false;
            const completions = state.researchTaskCompletions?.[task.id] || 0;
            if (task.maxCompletions != null && completions >= task.maxCompletions) return false;
            if (state.activeOrder?.isSpecial && state.activeOrder?.specialTaskId === task.id) return false;
            return true;
        }).length;
    }

    if (category === 'promo') {
        return PROMOTION_TASKS.filter(task => {
            if (!state.unlockedSpecialTasks?.[task.id]) return false;
            const completions = state.researchTaskCompletions?.[task.id] || 0;
            if (task.maxCompletions != null && completions >= task.maxCompletions) return false;
            if (state.activeOrder?.isSpecial && state.activeOrder?.specialTaskId === task.id) return false;
            return true;
        }).length;
    }

    return state.orders.filter(o => {
        if (!o) return false;
        if (state.activeOrder?.id === o.id) return false;
        if (category === 'orders') return o.taskCategory === 'orders' || !o.taskCategory;
        return o.taskCategory === category;
    }).length;
}

/** Update .active on each sidebar's .sidebar-alert based on visible badges */
function syncSidebarAlerts() {
    for (const sidebarId of ['right-sidebar', 'left-sidebar']) {
        const sidebar = document.getElementById(sidebarId);
        if (!sidebar) continue;
        const alertEl = sidebar.querySelector('.sidebar-alert');
        if (!alertEl) continue;
        const hasVisible = !!sidebar.querySelector('.sbtn-badge.visible');
        alertEl.classList.toggle('active', hasVisible);
    }
}

/** Show/hide badges based on current state.orders. Call from onOrdersChanged. */
export function updateSidebarBadges() {
    for (const [id, cfg] of Object.entries(BADGE_MAP)) {
        const badge = _badges[id];
        if (!badge) continue;
        const hasNew = countAvailable(cfg.category) > 0;
        const wasVisible = badge.classList.contains('visible');
        badge.classList.toggle('visible', hasNew);
        if (hasNew && !wasVisible) sfx('alert');
    }
    syncSidebarAlerts();
}

// ─────────────────────────────────────────────────────────────
// bindSidebars — call once during game init
// ─────────────────────────────────────────────────────────────

export function bindSidebars() {
    // ── Sidebar 3-state toggle ──
    const STATES = ['icons', 'expanded', 'hidden'];

    function cycleState(sidebar) {
        const current = sidebar.dataset.state || 'icons';
        const nextIndex = (STATES.indexOf(current) + 1) % STATES.length;
        sidebar.dataset.state = STATES[nextIndex];
        syncSidebarAlerts();
    }

    const rightSidebar = document.getElementById('right-sidebar');
    const leftSidebar  = document.getElementById('left-sidebar');

    // ── Inject sidebar-alert dots ──
    for (const sidebar of [rightSidebar, leftSidebar]) {
        if (!sidebar) continue;
        const alertImg = document.createElement('img');
        alertImg.className = 'sidebar-alert';
        alertImg.src = 'UI/icons/icon-alert.png';
        alertImg.alt = '';
        alertImg.setAttribute('aria-hidden', 'true');
        sidebar.appendChild(alertImg);
    }

    document.getElementById('right-toggle')?.addEventListener('click', () => cycleState(rightSidebar));
    document.getElementById('left-toggle')?.addEventListener('click',  () => cycleState(leftSidebar));

    // Prevent sbtn clicks from triggering the sidebar toggle
    document.querySelectorAll('.sbtn').forEach(btn => {
        btn.addEventListener('click', e => e.stopPropagation());
    });

    // ── Menu button bindings ──
    const menuMap = {
        'orders-btn':        'orders',
        'story-btn':         'story',
        'research-btn':      'research',
        'promo-btn':         'promo',
        'ai-model-btn':      null,
        'network-btn':       null,
        'hardware-btn':      null,
        'deep-learning-btn': null,
    };

    // Menus that start locked and unlock via state.unlockedMenus
    const DYNAMIC_LOCK_MAP = {
        'research-btn': 'research',
        'promo-btn':    'promotion',
        'shop-btn':     'shop',
    };

    for (const [id, menuName] of Object.entries(menuMap)) {
        const btn = document.getElementById(id);
        if (!btn) continue;
        _bindUnlockHighlightDismiss(btn);
        if (!menuName) {
            // Permanently locked button
            btn.classList.add('sbtn--locked');
            btn.setAttribute('aria-disabled', 'true');
            const lockImg = document.createElement('img');
            lockImg.src = 'UI/icon-lock.png';
            lockImg.className = 'sbtn-lock-icon';
            lockImg.alt = '';
            lockImg.setAttribute('aria-hidden', 'true');
            btn.appendChild(lockImg);
            btn.addEventListener('click', e => e.stopPropagation());
            continue;
        }
        btn.addEventListener('click', e => {
            e.stopPropagation();
            if (btn.classList.contains('sbtn--locked')) return;
            sfx('click');
            openMenuOverlay(menuName);
            // Clear badge when user opens that menu
            if (_badges[id]) _badges[id].classList.remove('visible');
        });

        // Apply initial dynamic lock if not yet unlocked
        const dynKey = DYNAMIC_LOCK_MAP[id];
        const isLockedByStory = dynKey === '__chapter1__' ? !state.chapter1Completed : (dynKey && !state.unlockedMenus[dynKey]);
        if (dynKey && isLockedByStory) {
            btn.classList.add('sbtn--locked');
            btn.setAttribute('aria-disabled', 'true');
            const lockImg = document.createElement('img');
            lockImg.src = 'UI/icon-lock.png';
            lockImg.className = 'sbtn-lock-icon';
            lockImg.alt = '';
            lockImg.setAttribute('aria-hidden', 'true');
            btn.appendChild(lockImg);
        }
    }

    // ── Esc closes overlay ──
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') { removeExistingOverlay(); removeSettingsOverlay(); }
    });

    // ── Settings menu-btn ──
    document.getElementById('menu-btn')?.addEventListener('click', e => {
        e.stopPropagation();
        openSettingsMenu();
    });

    // ── Shop menu-btn ──
    document.getElementById('shop-btn')?.addEventListener('click', e => {
        e.stopPropagation();
        if (!state.chapter1Completed && !state.unlockedMenus.shop) return;
        openShopMenu();
    });

    // ── Upgrades menu-btn ──
    const upgradesBtnEl = document.getElementById('upgrades-btn');
    _bindUnlockHighlightDismiss(upgradesBtnEl);
    if (upgradesBtnEl && !state.unlockedMenus.upgrades) {
        upgradesBtnEl.classList.add('sbtn--locked');
        upgradesBtnEl.setAttribute('aria-disabled', 'true');
        const lockImg = document.createElement('img');
        lockImg.src = 'UI/icon-lock.png';
        lockImg.className = 'sbtn-lock-icon';
        lockImg.alt = '';
        lockImg.setAttribute('aria-hidden', 'true');
        upgradesBtnEl.appendChild(lockImg);
    }
    upgradesBtnEl?.addEventListener('click', e => {
        e.stopPropagation();
        if (!state.unlockedMenus.upgrades) return;
        openUpgradesMenu();
    });

    // ── Repeatable toggle (delegated) ──
    document.addEventListener('click', e => {
        const btn = e.target.closest('.task-repeatable');
        if (!btn) return;
        btn.dataset.active = btn.dataset.active === 'true' ? 'false' : 'true';
    });

    // ── Init badge elements ──
    initBadges();
    refreshSidebarLocks();
    updateSidebarBadges();
}

// ─────────────────────────────────────────────────────────────
// Dynamic sidebar locks — called after unlockMenus state changes
// ─────────────────────────────────────────────────────────────
const _SIDEBAR_LOCK_MAP = {
    'research-btn': 'research',
    'promo-btn':    'promotion',
    'upgrades-btn': 'upgrades',
    'shop-btn':     'shop',
};

export function refreshSidebarLocks() {
    for (const [id, menuKey] of Object.entries(_SIDEBAR_LOCK_MAP)) {
        const btn = document.getElementById(id);
        if (!btn) continue;
        _bindUnlockHighlightDismiss(btn);
        const isUnlocked = menuKey === '__chapter1__' ? !!state.chapter1Completed : !!state.unlockedMenus[menuKey];
        const isLocked   = btn.classList.contains('sbtn--locked');
        if (isUnlocked && isLocked) {
            btn.classList.remove('sbtn--locked');
            btn.removeAttribute('aria-disabled');
            btn.querySelector('.sbtn-lock-icon')?.remove();
            _highlightUnlockedButton(btn);
        } else if (!isUnlocked && !isLocked) {
            btn.classList.add('sbtn--locked');
            btn.setAttribute('aria-disabled', 'true');
            _clearUnlockButtonHighlight(btn);
            if (!btn.querySelector('.sbtn-lock-icon')) {
                const lockImg = document.createElement('img');
                lockImg.src = 'UI/icon-lock.png';
                lockImg.className = 'sbtn-lock-icon';
                lockImg.alt = '';
                lockImg.setAttribute('aria-hidden', 'true');
                btn.appendChild(lockImg);
            }
        } else if (!isUnlocked) {
            _clearUnlockButtonHighlight(btn);
        }
    }
}

// ─────────────────────────────────────────────────────────────
// Language picker — shown on first run before intro starts
// ─────────────────────────────────────────────────────────────

export function showLanguagePicker(onChosen) {
    const picker = document.createElement('div');
    picker.className = 'lang-picker-overlay';
    picker.innerHTML = `
        <div class="lang-picker-box">
            <div class="lang-picker-title">Choose Language / Выберите язык</div>
            <div class="lang-picker-btns">
                <button class="lang-picker-btn lang-picker-btn--locked" data-lang="en" disabled>English</button>
                <button class="lang-picker-btn" data-lang="ru">Русский</button>
            </div>
        </div>`;
    picker.querySelectorAll('.lang-picker-btn:not([disabled])').forEach(btn => {
        btn.addEventListener('click', () => {
            setLang(btn.dataset.lang);
            picker.remove();
            if (onChosen) onChosen();
        });
    });
    document.querySelector('.game-container')?.appendChild(picker);
}
