// ── Sidebar 3-state toggle ──────────────────────────────────
// Cycle: "icons" → "expanded" → "hidden" → "icons" → ...
// Arrow is baked into the PNG; sidebar-bg div is the click target.

const STATES = ['icons', 'expanded', 'hidden'];

function cycleState(sidebar) {
    const current = sidebar.dataset.state || 'icons';
    const nextIndex = (STATES.indexOf(current) + 1) % STATES.length;
    sidebar.dataset.state = STATES[nextIndex];
}

const rightSidebar = document.getElementById('right-sidebar');
const leftSidebar  = document.getElementById('left-sidebar');

document.getElementById('right-toggle').addEventListener('click', () => cycleState(rightSidebar));
document.getElementById('left-toggle').addEventListener('click',  () => cycleState(leftSidebar));

// Prevent icon button clicks from toggling the sidebar
document.querySelectorAll('.sbtn').forEach(btn => {
    btn.addEventListener('click', e => e.stopPropagation());
});

// ── Toggle buttons ───────────────────────────────────────────
function bindToggle(btnId) {
    const btn = document.getElementById(btnId);
    if (!btn) return;
    btn.addEventListener('click', () => {
        const active = btn.dataset.active === 'true';
        btn.dataset.active = String(!active);
    });
}

bindToggle('agent-toggle');
bindToggle('autogen-toggle');

// Per-menu configuration: title, header accent color, stat label, show fame stars
const menuConfig = {
    orders: {
        title    : 'BitTrick25',
        color    : '#46C1FF',
        statLabel: 'Fame:',
        showStars: true
    },
    story: {
        title    : 'Main Story',
        color    : '#EE4242',
        statLabel: 'Chapter: 1',
        showStars: false
    },
    research: {
        title    : 'Research',
        color    : '#79B742',
        statLabel: 'Research title',
        showStars: false
    },
    promo: {
        title    : 'Promotion',
        color    : '#35916D',
        statLabel: 'Fame:',
        showStars: true
    }
};

// Apply per-menu config to a cloned shell
function applyMenuConfig(shell, name) {
    const cfg = menuConfig[name];
    if (!cfg) return;

    // Title
    const titleEl = shell.querySelector('.menu-title');
    if (titleEl) titleEl.textContent = cfg.title;

    // Accent color on plates
    ['.name-plate', '.lvl-plate', '.menu-stat-bg'].forEach(sel => {
        const el = shell.querySelector(sel);
        if (el) el.style.background = cfg.color;
    });

    // Stat label text
    const fameTextEl = shell.querySelector('.fame-text');
    if (fameTextEl) fameTextEl.textContent = cfg.statLabel;

    // Fame stars visibility; expand label when stars are hidden
    const starsEl = shell.querySelector('.fame-stars');
    if (starsEl) starsEl.style.display = cfg.showStars ? '' : 'none';
    if (fameTextEl) {
        fameTextEl.style.width = cfg.showStars
            ? ''                          // default from CSS (126px)
            : 'calc(var(--r) * 384)';     // full-width when no stars
    }
}

// Spawn task cards inside a menu body
function spawnSampleCards(body, count = 3, tplId = 'tmpl-task-card') {
    const tpl = document.getElementById(tplId);
    if (!tpl || !body) return;
    for (let i = 0; i < count; i++) {
        body.appendChild(tpl.content.cloneNode(true));
    }
}

// Generic overlay/menu system for sandbox
function removeExistingOverlay(){
    const existing = document.querySelector('.menu-overlay.sandbox-menu');
    if(existing) existing.remove();
}

function openMenuOverlay(name = 'menu'){
    removeExistingOverlay();

    const tpl = document.getElementById('tmpl-menu');
    const overlay = document.createElement('div');
    overlay.className = 'menu-overlay sandbox-menu';
    overlay.setAttribute('data-menu', name);

    const container = document.createElement('div');
    container.className = 'menu-overlay-inner';

    // clone template content
    const node = tpl.content.cloneNode(true);
    const shell = node.querySelector('.menu-shell');
    if (shell) {
        shell.dataset.menu = name;
        applyMenuConfig(shell, name);
    }
    container.appendChild(node);

    overlay.appendChild(container);
    document.querySelector('.game-container').appendChild(overlay);

    // Populate body with cards for applicable menus
    if (name === 'orders')   spawnSampleCards(overlay.querySelector('.menu-body'));
    if (name === 'story')    spawnSampleCards(overlay.querySelector('.menu-body'), 3, 'tmpl-task-card-story');
    if (name === 'research') spawnSampleCards(overlay.querySelector('.menu-body'), 3, 'tmpl-task-card-research');
    if (name === 'promo')    spawnSampleCards(overlay.querySelector('.menu-body'), 3, 'tmpl-task-card-promo');

    // footer button: closes the overlay
    const footerBtn = overlay.querySelector('.menu-footer-btn');
    if(footerBtn) footerBtn.addEventListener('click', (ev)=>{
        ev.stopPropagation();
        removeExistingOverlay();
    });
    overlay.addEventListener('click', (ev)=>{ if(ev.target === overlay) removeExistingOverlay(); });
}

// Close active menu on Esc
document.addEventListener('keydown', (ev) => {
    if (ev.key === 'Escape') removeExistingOverlay();
});

// Repeatable toggle — delegated, works for all promo cards
document.addEventListener('click', (ev) => {
    const btn = ev.target.closest('.task-repeatable');
    if (!btn) return;
    btn.dataset.active = btn.dataset.active === 'true' ? 'false' : 'true';
});

// Bind sidebar buttons to their menus
const menuMap = {
    // Right sidebar
    'orders-btn'  : 'orders',
    'story-btn'   : 'story',
    'research-btn': 'research',
    'promo-btn'   : 'promo',
    // Left sidebar
    'ai-model-btn'     : 'ai-model',
    'network-btn'      : 'network',
    'hardware-btn'     : 'hardware',
    'deep-learning-btn': 'deep-learning'
};

Object.keys(menuMap).forEach(id => {
    const el = document.getElementById(id);
    if(!el) return;
    el.addEventListener('click', (e)=>{ e.stopPropagation(); openMenuOverlay(menuMap[id]); });
});
