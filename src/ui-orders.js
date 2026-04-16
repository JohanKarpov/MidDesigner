// src/ui-orders.js — Render task cards into menu bodies

import { state } from './state.js';
import { Config, RESEARCH_TASKS, PROMOTION_TASKS, CONTRACT_TASKS } from './config.js';
import { isOrderStartLocked, startOrder, startSpecialTask, setActiveOrderAutoRepeat, startResearchPool } from './economy.js';
import { getLang, t } from './i18n.js';

// Active sub-tab for the Orders menu ('freelance' | 'contracts')
let _ordersSubTab = 'freelance';

function resolveActionLabel(value, fallback = 'Работать') {
    if (typeof value === 'string' && value.trim()) return value.trim();
    if (!value || typeof value !== 'object') return fallback;
    if (typeof value.locKey === 'string' && value.locKey.trim()) {
        return String(t(value.locKey) || '').trim() || fallback;
    }
    const lang = getLang();
    return String(value[lang] || value.ru || value.en || '').trim() || fallback;
}

function ensureStartLockIcon(startBtn) {
    if (!startBtn || startBtn.querySelector('.task-start-lock-icon')) return;
    const lockImg = document.createElement('img');
    lockImg.src = 'UI/icon-lock.png';
    lockImg.alt = '';
    lockImg.className = 'task-start-lock-icon';
    lockImg.setAttribute('aria-hidden', 'true');
    lockImg.style.display = 'none';
    startBtn.appendChild(lockImg);
}

function setStartLocked(startBtn, locked) {
    if (!startBtn) return;
    ensureStartLockIcon(startBtn);
    startBtn.classList.toggle('task-start-btn--locked', !!locked);
    startBtn.disabled = !!locked;
    startBtn.setAttribute('aria-disabled', locked ? 'true' : 'false');
    const lockIcon = startBtn.querySelector('.task-start-lock-icon');
    if (lockIcon) lockIcon.style.display = locked ? '' : 'none';
}

// ─────────────────────────────────────────────────────────────
// Category → icon mapping (UI/task-frame/)
// ─────────────────────────────────────────────────────────────

const CATEGORY_ICON = {
    orders:          'UI/task-frame/icon-job-base-order.png',
    story:           'UI/task-frame/icon-job-base-story.png',
    research:        'UI/task-frame/icon-job-base-research.png',
    research_one_time: 'UI/task-frame/icon-job-base-research_2.png',
    promo:           'UI/task-frame/icon-job-base-promo.png',
};

function setCardIcon(card, category) {
    const iconEl = card.querySelector('.task-job-icon');
    if (!iconEl) return;
    const src = CATEGORY_ICON[category] || CATEGORY_ICON.orders;
    iconEl.style.backgroundImage = `url('${src}')`;
}

const TEMPLATE_MAP = {
    orders:   'tmpl-task-card',
    story:    'tmpl-task-card-story',
    research: 'tmpl-task-card-research',
    promo:    'tmpl-task-card-promo',
    contract: 'tmpl-task-card-contract',
};

// ─────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────

function formatTimer(expiresAt) {
    if (!isFinite(expiresAt)) return '∞';
    const remaining = Math.max(0, expiresAt - Date.now());
    const totalSec = Math.ceil(remaining / 1000);
    const m = Math.floor(totalSec / 60).toString().padStart(2, '0');
    const s = (totalSec % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
}

// Format a static duration in seconds as MM:SS
function formatDuration(sec) {
    const totalSec = Math.round(sec || 0);
    const m = Math.floor(totalSec / 60).toString().padStart(2, '0');
    const s = (totalSec % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
}

function cloneTemplate(tplId) {
    const tpl = document.getElementById(tplId);
    if (!tpl) return null;
    const frag = tpl.content.cloneNode(true);
    return frag.querySelector('[class^="task-card"]') || frag.firstElementChild;
}

/**
 * Shrink the .task-name font-size so the text fits in one line.
 * Must be called after the card is appended to the DOM (needs layout).
 * Uses a requestAnimationFrame so the element has real dimensions.
 */
function fitTaskName(card) {
    const el = card.querySelector('.task-name');
    if (!el) return;
    requestAnimationFrame(() => {
        // Reset to CSS default so we measure from the top each time
        el.style.fontSize = '';
        el.style.whiteSpace = 'nowrap';

        const maxW = el.offsetWidth;
        if (!maxW) return;

        // Binary-search the largest font-size that fits
        let lo = 18, hi = parseFloat(getComputedStyle(el).fontSize) || 65;
        // If it already fits, do nothing
        if (el.scrollWidth <= maxW) return;

        for (let i = 0; i < 10; i++) {
            const mid = (lo + hi) / 2;
            el.style.fontSize = mid + 'px';
            if (el.scrollWidth <= maxW) lo = mid;
            else hi = mid;
        }
        el.style.fontSize = Math.floor(lo) + 'px';
    });
}

// ─────────────────────────────────────────────────────────────
// populateCard — map order fields onto card DOM elements
// ─────────────────────────────────────────────────────────────

function populateCard(card, order) {
    const set = (sel, val) => {
        const el = card.querySelector(sel);
        if (el) el.textContent = val;
    };

    const setProp = (sel, prop, val) => {
        const el = card.querySelector(sel);
        if (el) el[prop] = val;
    };

    set('.task-name', order.title || '');
    const actionLabel = resolveActionLabel(order.generateActionLabel, 'Работать');
    const actionCount = order.requiredGenerations || order.generations || 1;
    set('.task-job-desc', actionLabel + ' × ' + actionCount);

    // Payout
    set('.pay-funds .pay-value',    order.realPayout != null ? order.realPayout : '');
    const xpVal = order.xpReward != null
        ? order.xpReward
        : Math.round((order.realPayout || 0) * Config.XP_PER_PAYOUT_RATIO);
    set('.pay-xp .pay-value',       xpVal);
    set('.pay-prestige .pay-value', order.prestige || 0);

    // Timer — show allocated task duration (durationSec), not pool-expiry countdown
    set('.task-timer-value', formatDuration(order.durationSec));

    // Job icon — driven by category, not per-order iconUrl
    setCardIcon(card, order.taskCategory || 'orders');

    // Story extras
    if (order.taskCategory === Config.TASK_CATEGORIES.STORY) {
        const timerEl = card.querySelector('.task-timer');
        if (timerEl) timerEl.style.display = 'none';
        if (order.generateActionLabel) set('.task-card-desc', actionLabel);
    }

    // Dataset for event binding
    card.dataset.orderId = order.id;

    // Start button
    const startBtn = card.querySelector('.task-start-btn');
    if (startBtn) {
        const isLocked = isOrderStartLocked(order);
        setStartLocked(startBtn, isLocked);
        startBtn.addEventListener('click', e => {
            e.stopPropagation();
            import('./audio.js').then(({ sfx }) => sfx('pop')).catch(() => {});
            startOrder(order.id);
            // Return to main screen — remove open menu overlay
            document.querySelector('.menu-overlay.sandbox-menu')?.remove();
        });
    }
}

function populateResearchCard(card, task) {
    const set = (sel, val) => {
        const el = card.querySelector(sel);
        if (el) el.textContent = val;
    };

    set('.task-name', task.title || '');
    set('.task-stage', task.maxCompletions != null
        ? (state.researchTaskCompletions[task.id] || 0) + '/' + task.maxCompletions
        : '\u00d7' + (state.researchTaskCompletions[task.id] || 0));
    set('.task-job-desc', resolveActionLabel(task.generateActionLabel, 'Изучить'));

    if (task.repeatable) {
        const completions = state.researchTaskCompletions[task.id] || 0;
        const xpRequired = completions * 100 + 100;
        const startCost = task.realPayout < 0 ? Math.abs(task.realPayout) : 0;
        set('.task-price', startCost > 0 ? 'Цена: ' + startCost.toLocaleString('ru-RU') + ' ₽' : 'Бесплатно');
        const rewardLabel = task.expertPointsReward
            ? '+' + task.expertPointsReward + ' EP  |  XP: ' + xpRequired
            : (task.skillPointsReward ? '+' + task.skillPointsReward + ' SP  |  XP: ' + xpRequired : 'XP: ' + xpRequired);
        set('.task-card-desc', rewardLabel);
    } else {
        const costText = task.realPayout < 0 ? `${Math.abs(task.realPayout)} ₽` : 'Бесплатно';
        set('.task-price', 'Цена: ' + costText);
        set('.task-card-desc', task.skillPointsReward ? `+${task.skillPointsReward} skill pt` : '');
    }

    setCardIcon(card, task.repeatable ? 'research' : 'research_one_time');

    card.dataset.taskId = task.id;

    // Hide the auto-repeat toggle — not applicable for research cards
    const repeatableBtn = card.querySelector('.task-repeatable');
    if (repeatableBtn) repeatableBtn.style.display = 'none';

    const completions = state.researchTaskCompletions[task.id] || 0;
    const isMaxed = task.maxCompletions != null && completions >= task.maxCompletions;
    const startBtn = card.querySelector('.task-start-btn');
    if (startBtn) {
        setStartLocked(startBtn, false);
        if (isMaxed) {
            startBtn.textContent = 'Готово';
            startBtn.disabled = true;
        } else if (task.repeatable) {
            const isThisActive = state.activeResearchPool?.taskId === task.id;
            const poolBusy     = !!state.activeResearchPool && !isThisActive;
            if (isThisActive) {
                startBtn.textContent = 'В работе';
                startBtn.disabled = true;
            } else if (poolBusy) {
                startBtn.textContent = 'Занято';
                startBtn.disabled = true;
            } else {
                const startCost = task.realPayout < 0 ? Math.abs(task.realPayout) : 0;
                const canAfford = startCost === 0 || !state.funds.lt(startCost);
                if (!canAfford) {
                    startBtn.textContent = 'Нет денег';
                    startBtn.disabled = true;
                } else {
                    startBtn.textContent = 'Начать';
                    startBtn.addEventListener('click', e => {
                        e.stopPropagation();
                        import('./audio.js').then(({ sfx }) => sfx('pop')).catch(() => {});
                        startResearchPool(task.id);
                        document.querySelector('.menu-overlay.sandbox-menu')?.remove();
                    });
                }
            }
        } else {
            startBtn.addEventListener('click', e => {
                e.stopPropagation();
                import('./audio.js').then(({ sfx }) => sfx('pop')).catch(() => {});
                startSpecialTask(task.id);
                document.querySelector('.menu-overlay.sandbox-menu')?.remove();
            });
        }
    }
}

function populatePromoCard(card, task) {
    const set = (sel, val) => {
        const el = card.querySelector(sel);
        if (el) el.textContent = val;
    };

    set('.task-name', task.title || '');
    set('.task-job-desc', resolveActionLabel(task.generateActionLabel, 'Продвигать'));
    set('.pay-funds .pay-value', task.realPayout || 0);
    // Show direct prestige reward if present, else pool bonus
    set('.pay-prestige .pay-value', task.prestigeReward != null ? task.prestigeReward : (task.prestigePoolBonus || 0));
    set('.task-card-desc', task.repeatable ? (getLang() === 'ru' ? 'Бесконечно' : 'Repeatable') : '');

    setCardIcon(card, 'promo');

    card.dataset.taskId = task.id;

    const completions  = state.researchTaskCompletions[task.id] || 0;
    const isMaxed      = task.maxCompletions != null && completions >= task.maxCompletions;
    const isChapter1Locked = task.lockedCondition?.type === 'chapter1' && !state.chapter1Completed;

    const repeatableBtn = card.querySelector('.task-repeatable');
    if (repeatableBtn && task.repeatable) {
        repeatableBtn.style.display = '';
        repeatableBtn.dataset.active = 'false';
    } else if (repeatableBtn) {
        repeatableBtn.style.display = 'none';
    }

    const startBtn = card.querySelector('.task-start-btn');
    if (startBtn) {
        setStartLocked(startBtn, false);
        if (isChapter1Locked) {
            startBtn.textContent = '\ud83d\udd12';
            startBtn.disabled = true;
        } else if (isMaxed) {
            startBtn.textContent = '\u0413\u043e\u0442\u043e\u0432\u043e';
            startBtn.disabled = true;
        } else {
            startBtn.addEventListener('click', e => {
                e.stopPropagation();
                import('./audio.js').then(({ sfx }) => sfx('pop')).catch(() => {});
                const autoRepeat = repeatableBtn?.dataset.active === 'true';
                startSpecialTask(task.id, autoRepeat);
                document.querySelector('.menu-overlay.sandbox-menu')?.remove();
            });
        }
    }
}

function populateContractCard(card, task) {
    const set = (sel, val) => {
        const el = card.querySelector(sel);
        if (el) el.textContent = val;
    };

    set('.task-name', task.title || '');
    set('.task-job-desc', resolveActionLabel(task.generateActionLabel, 'Работать') + ' × ' + task.requiredGenerations);
    set('.pay-funds .pay-value', task.realPayout ? task.realPayout + ' ₽' : '—');
    set('.task-contractor', task.contractorName || '');

    setCardIcon(card, 'orders');
    card.dataset.taskId = task.id;

    const repeatableBtn = card.querySelector('.task-repeatable');
    if (repeatableBtn) {
        repeatableBtn.style.display = '';
        repeatableBtn.dataset.active = 'false';
    }

    const isActive = state.activeOrder?.specialTaskId === task.id;
    const startBtn = card.querySelector('.task-start-btn');
    if (startBtn) {
        if (isActive) {
            startBtn.textContent = 'В работе...';
            startBtn.disabled = true;
        } else if (state.activeOrder) {
            startBtn.textContent = 'Занято';
            startBtn.disabled = true;
        } else {
            startBtn.addEventListener('click', e => {
                e.stopPropagation();
                import('./audio.js').then(({ sfx }) => sfx('pop')).catch(() => {});
                const autoRepeat = repeatableBtn?.dataset.active === 'true';
                startSpecialTask(task.id, autoRepeat);
                document.querySelector('.menu-overlay.sandbox-menu')?.remove();
            });
        }
    }
}

export function renderMenuContent(bodyEl, menuName) {
    bodyEl.innerHTML = '';

    switch (menuName) {
        case 'orders': {
            const hasContracts = CONTRACT_TASKS.some(t => !!state.unlockedSpecialTasks?.[t.id]);

            // Tab bar is always shown; contracts tab is greyed out until unlocked
            {
                const shell = bodyEl.closest('.menu-shell');
                // Remove any tab bar left from a previous tab-switch render
                shell?.querySelector('.orders-tab-bar')?.remove();

                const tabBar = document.createElement('div');
                tabBar.className = 'orders-tab-bar';

                const makeTab = (key, label) => {
                    const btn = document.createElement('button');
                    btn.type = 'button';
                    btn.className = 'orders-tab-btn' + (_ordersSubTab === key ? ' orders-tab-btn--active' : '');
                    btn.textContent = label;
                    if (key === 'contracts' && !hasContracts) {
                        btn.disabled = true;
                        btn.classList.add('orders-tab-btn--locked');
                    } else {
                        btn.addEventListener('click', () => {
                            _ordersSubTab = key;
                            renderMenuContent(bodyEl, menuName);
                        });
                    }
                    return btn;
                };
                tabBar.appendChild(makeTab('freelance', 'Фриланс'));
                tabBar.appendChild(makeTab('contracts', 'Контракты'));
                // Place tab bar as sibling of bodyEl, inside the shell (above body)
                if (shell) {
                    shell.insertBefore(tabBar, bodyEl);
                } else {
                    bodyEl.prepend(tabBar);
                }
            }

            if (!hasContracts || _ordersSubTab === 'freelance') {
                const regularOrders = state.orders.filter(o =>
                    o.taskCategory === Config.TASK_CATEGORIES.ORDERS
                );
                if (regularOrders.length === 0) {
                    const msg = document.createElement('p');
                    msg.className = 'menu-empty-msg';
                    msg.textContent = 'Заказов пока нет...';
                    bodyEl.appendChild(msg);
                    break;
                }
                for (const order of regularOrders) {
                    const card = cloneTemplate(TEMPLATE_MAP.orders);
                    if (!card) continue;
                    populateCard(card, order);
                    bodyEl.appendChild(card);
                    fitTaskName(card);
                }
            } else {
                // contracts sub-tab
                const available = CONTRACT_TASKS.filter(t => !!state.unlockedSpecialTasks?.[t.id]);
                if (available.length === 0) {
                    const msg = document.createElement('p');
                    msg.className = 'menu-empty-msg';
                    msg.textContent = 'Нет активных контрактов';
                    bodyEl.appendChild(msg);
                    break;
                }
                for (const task of available) {
                    const card = cloneTemplate(TEMPLATE_MAP.contract);
                    if (!card) continue;
                    populateContractCard(card, task);
                    bodyEl.appendChild(card);
                    fitTaskName(card);
                }
            }
            break;
        }

        case 'story': {
            const storyOrders = state.orders.filter(o =>
                o.taskCategory === Config.TASK_CATEGORIES.STORY
            );
            if (storyOrders.length === 0) {
                const msg = document.createElement('p');
                msg.className = 'menu-empty-msg';
                msg.textContent = 'История продолжается...';
                bodyEl.appendChild(msg);
                break;
            }
            for (const order of storyOrders) {
                const card = cloneTemplate(TEMPLATE_MAP.story);
                if (!card) continue;
                populateCard(card, order);
                bodyEl.appendChild(card);
                fitTaskName(card);
            }
            break;
        }

        case 'research': {
            const available = RESEARCH_TASKS.filter(t =>
                !!state.unlockedSpecialTasks[t.id] && (
                    t.repeatable === true ||
                    t.maxCompletions == null ||
                    (state.researchTaskCompletions[t.id] || 0) < t.maxCompletions
                )
            );
            if (available.length === 0) {
                const msg = document.createElement('p');
                msg.className = 'menu-empty-msg';
                msg.textContent = 'Нет доступных исследований';
                bodyEl.appendChild(msg);
                break;
            }
            for (const task of available) {
                const card = cloneTemplate(TEMPLATE_MAP.research);
                if (!card) continue;
                populateResearchCard(card, task);
                bodyEl.appendChild(card);
                fitTaskName(card);
            }
            break;
        }

        case 'promo': {
            const available = PROMOTION_TASKS.filter(t =>
                !!state.unlockedSpecialTasks[t.id] && (
                    t.repeatable === true ||
                    t.maxCompletions == null ||
                    (state.researchTaskCompletions[t.id] || 0) < t.maxCompletions
                )
            );
            if (available.length === 0) {
                const msg = document.createElement('p');
                msg.className = 'menu-empty-msg';
                msg.textContent = 'Нет доступных активностей';
                bodyEl.appendChild(msg);
                break;
            }
            for (const task of available) {
                const card = cloneTemplate(TEMPLATE_MAP.promo);
                if (!card) continue;
                populatePromoCard(card, task);
                bodyEl.appendChild(card);
                fitTaskName(card);
            }
            break;
        }

        default:
            break;
    }
}

// ─────────────────────────────────────────────────────────────
// refreshOpenMenu — called after state.orders changes
// ─────────────────────────────────────────────────────────────

export function refreshOpenMenu() {
    const overlay = document.querySelector('.menu-overlay.sandbox-menu');
    if (!overlay) return;
    const menuName = overlay.dataset.menu;
    const body = overlay.querySelector('.menu-body');
    if (body && menuName) renderMenuContent(body, menuName);
}
