# Functional Containers To Design

Use this as a checklist in Figma. Prefer naming by exact selector.

## Scene Root
- `.game-container` (main canvas)
- `.top-bar`
- `#generate-btn`
- `#character-sprite`
- `.level-panel` + `#level-label` + `#level-fill`
- `.stress-panel` + `#stress-label` + `#stress-fill`
- `#autogen-toggle-panel` + `#autogen-toggle` + `#autogen-toggle-label`
- `#task-timer-panel` + `#task-timer-fill`

## Top Counters
- `#orders-btn` + `#orders-alert` + `#orders-value`
- `#funds-btn` + `#funds-value`
- `#menu-btn`

## Main Menu Overlay
- `#main-menu-overlay`
- `.menu-window`
- `.menu-content`
- Audio: `#sfx-toggle`, `#music-toggle`
- Progress actions: `#achievements-open-btn`, `#reset-progress-btn`
- Stats: `#stats-panel`
- Reset confirm: `#reset-confirm`, `#confirm-reset-btn`, `#cancel-reset-btn`
- About: `.about-section`, `.about-logo`, `.about-text`
- Close button: `.menu-close`

## Orders Overlay
- `#orders-menu`
- `#orders-list`
- `#start-work-btn`
- Dynamic card template container: `.order-item` (design style only)

## Shop Overlay
- `#shop-menu`
- `#shop-upgrades-list`
- Dynamic card template container: `.upgrade-item`, `.upgrade-buy-btn`

## Achievements Overlay
- `#achievements-menu`
- `#achievements-list`

## Cinematic / Tutorial
- `#cinematic-overlay`
- `#cinematic-black`
- `#cinematic-flash`
- `#cinematic-split`
- `#spotlight-ring`
- `#cinematic-skip-btn`
- `#phone-hand`
- `#thought-box`, `#thought-text`, `#thought-next-btn`
- `#vn-dialog`, `#vn-speaker-icon`, `#vn-speaker-name`, `#vn-text`, `#vn-next-btn`
- `#tutorial-choice`, `#tutorial-continue-btn`, `#tutorial-skip-btn`

## Reusable UI Tokens (optional)
- `.main-toggle`
- `.menu-action-btn`
- `.dialog-next-btn`
- `.choice-btn`
- `.counter`
