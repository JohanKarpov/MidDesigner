# Global Roadmap

This file is the single source of truth for product direction and implementation sequencing.

## How We Use This
- Add candidate ideas and implementation proposals here first.
- Keep actionable items in question form to quickly decide: do / skip / postpone.
- Resolve roadmap items only through the question queue.
- After each answer, immediately update status, owner, and next action.

## Roadmap Sync Protocol
- When user asks to sync with roadmap, the assistant must first prepare a clarifying question pool before writing/editing code.
- The question pool must cover: scope, priority, acceptance criteria, dependencies, and what is explicitly out of scope.
- Work starts only after answers are mapped to decisions in `Current Sprint Questions` (accepted/deferred/rejected).
- Every accepted decision must get: owner, next action, and target file/module.
- After implementation, update `Decision Log` and `Change Log` in the same iteration.

Status legend:
- `open` - waiting for decision
- `accepted` - approved for implementation
- `deferred` - good idea, later
- `rejected` - intentionally not doing
- `done` - implemented

## Current Sprint Questions

| ID | Question | Status | Owner | Next Action |
|---|---|---|---|---|
| Q-001 | Should we show both real prestige and prestige pool as separate HUD counters (not only in stats)? | open | User | Decide keep in stats-only or move to HUD |
| Q-002 | Should locked requirements be one-line only, or allow two-line wrapped requirements for long conditions? | open | User | Pick strict one-line or wrapped format |
| Q-003 | Do we want category-specific icons for Research and Promotion cards instead of placeholders? | open | User | Confirm art direction and asset naming |
| Q-004 | Should each category remember last selected task when user returns from hub? | open | User | Decide preserve-per-tab selection memory |
| Q-005 | Should Story tasks always be no-time-limit, or allow timed story tasks later? | open | User | Decide story timing policy |
| Q-006 | Should we add milestone-based lock conditions (knownness, prestige pool threshold, completed tasks)? | open | User | Confirm lock-condition set for phase 2 |
| Q-007 | Should we schedule tutorial expansion v2 now (first-open tooltips/replies for more UI surfaces beyond BitTrick)? | accepted | User | Implement incremental tutorial hints in next content pass |
| Q-008 | Should we prioritize a dedicated ChatDJBT comment pack for more triggers (fail states, milestones, category outcomes)? | accepted | User | Prepare and integrate first extended comment set |
| Q-009 | IMPORTANT: Do we fix task cards UI/behavior before any new content work? | accepted | User | Run focused bugfix pass for task cards first |
| Q-010 | Should we run a dedicated content pass for Research and Promotion categories (new tasks, lock chains, rewards)? | accepted | User | Design and implement expanded task pools for both categories |
| Q-011 | Should we extend the Story branch with additional narrative tasks beyond the current starter chain? | accepted | User | Draft and implement the next story arc set |
| Q-012 | Should we redesign/expand the upgrades menu UX and structure (grouping, clarity, progression readability)? | done | User | Implemented grouped upgrades menu with progress summary and filters |
| Q-013 | Should we document and formalize progression logic (loops, formulas, unlock rules, pacing targets)? | accepted | User | Write a progression logic spec and align implementation with it |
| Q-014 | VERY IMPORTANT: Should we redesign the main game screen properly in Figma and then implement it as the new baseline UI? | accepted | User | Prepare Figma-first main-screen redesign scope and implementation checklist |
| Q-015 | Should we run a dedicated Goods/shop pass (item list, effects behavior, readability, balancing)? | accepted | User | Define Goods SKU list, effect rules, and integration checklist |
| Q-016 | Should we define a full upgrades unlock matrix (node list + unlock requirements + branch pacing)? | accepted | User | Produce v1 upgrade matrix and wire unlock requirements to gameplay conditions |
| Q-017 | Should we redesign Research loop for clearer intent/reward signaling and progression gates? | accepted | User | Draft Research v2 loop, labels, task taxonomy, and progression hooks |
| Q-018 | Should we rework Promotion + Prestige system to be more legible and strategically meaningful? | accepted | User | Define Promotion -> Prestige funnel and balancing targets |
| Q-019 | Should we redesign cigarette system (economy pressure, stress/zen interplay, UX clarity)? | accepted | User | Draft cigarettes v2 spec and implement balance pass with UI updates |
| Q-020 | Should Chapter 1 Story be completed up to free-play unlock endpoint? | accepted | User | Implement chapter progression to free-play handoff (Chapter 1 ending) |
| Q-021 | Should AI branch include node "ChatDJBT PRO" unlocked by specific Research task completion? | accepted | User | Add node with gate on research task "Разобраться с оплатой сервисов" |
| Q-022 | Should we add a new work source: classifieds board with low-quality/low-pay but infinite tasks and no execution deadline? | accepted | User | Define classifieds task pool, bad-quality modifiers, and endless no-deadline spawn rules |
| Q-023 | Should Promotion tasks become paid actions with a cashback economy loop (YouTube ads, donations, course sales, etc.)? | accepted | User | Design paid promotion sink + delayed cashback source model and integrate into Promotion/Prestige loop |
| Q-024 | Should we improve Stats and Achievements windows UX and add explicit Back buttons for both? | accepted | User | Redesign both overlays and add consistent Back-button navigation behavior |
| Q-025 | Should we implement an optional "quit smoking" mechanic — player can give up cigarettes for a permanent reward at the cost of losing stress relief? | deferred | User | Design withdrawal progression, penalty arc, and unlock condition when ready |
| Q-026 | Should ChatDJBT react with a dedicated comment line when cigarettes run out and withdrawal starts? | accepted | User | Write comment key + text, wire to nicotineWithdrawal trigger in startSmokeBreak |
| Q-027 | Should the character sprite switch to a separate "withdrawal" image while nicotineWithdrawal is active? | accepted | User | Add withdrawal character asset, wire swap in syncCharacterVisibility / updateStressUi |
| Q-028 | Should there be a "found a spare cig" random event that fires ~10 s into withdrawal, triggering a free smoke break and clearing the penalty? | accepted | User | Implement timed bonus event: 10 s timeout after withdrawal start, call startSmokeBreak, add spare-cig notification |
| Q-029 | Should we build a dedicated achievements interface for Chapter 2 — icon grid layout with locked/unlocked states, tied to narrative events? | accepted | User | Design icon grid layout, define Ch2 achievement set, wire to event system |
| Q-030 | Should we add full EN/RU localisation with a language switcher in settings — covering all dialogue, UI labels, task titles, and cinematic text? | accepted | User | Define localisation architecture (key-value files per locale), write full EN+RU content, wire switcher to all text rendering paths |
| Q-031 | Should we gate the "Go to the forest" (wilderness reset) option behind a story checkpoint — block it until the player reaches a certain point in Chapter 1 progression? | accepted | User | Define checkpoint condition (e.g. chapter1Completed or specific CH1 event fired), disable forest reset button and hide it before checkpoint is reached |
| Q-032 | Should we fix the Back buttons in Achievements and Stats windows — both currently lack a reliable back/close navigation path? | accepted | User | Add consistent Back button to both overlays, wire to close + return to hub view |
| Q-033 | Should the orders notification badge on the main screen reflect new tasks from Story, Research, and Promotion categories — not just regular orders? | accepted | User | Extend badge logic to count unlocked-and-unseen tasks across all four categories, wire to main-screen UI sprint |
| Q-034 | Should we create custom pixel-art textures and visual assets for the upgrades/skill tree menu to replace placeholder icons and improve visual identity? | accepted | User | Define asset list and style guide for upgrade menu textures; produce sprites per node category |
| Q-035 | Should we add secondary parallax sprite layers to the skill tree viewport — decorative objects moving at a different depth speed than the stars to reinforce spatial depth during panning? | accepted | User | Design sprite set, define per-layer parallax speed multipliers, integrate alongside existing starfield canvas |
| Q-036 | Should we fully rework the Autogenerator — economy, UX, toggle behavior, tick cost — as part of the new upgrade nodes pass? | accepted | User | Scope autogen rework within the upgrade node matrix sprint; freeze current cost at 0 until rework is delivered |

## Current Product Goals
- Build a clear 4-category task flow: Orders, Story, Research, Promotion.
- Keep progression understandable: virtual prestige pool -> real prestige transfer via story.
- Make menu UX pixel-consistent with BitTrick visual style and mobile-safe.
- Expand tutorial guidance with first-open contextual explanations for critical menus.
- Increase ChatDJBT reactive commentary coverage across gameplay states.
- Deepen content for Research and Promotion so each category has meaningful progression paths.
- Expand Story content with a longer multi-step narrative arc.
- Rework upgrades menu UX to better communicate power growth and decisions.
- Publish a clear progression logic document that maps systems, formulas, and unlock flow.
- Redesign the main game screen in Figma-first workflow and implement it as the primary UI baseline.
- Complete Goods/shop pass with clearer item effects and balancing.
- Define full upgrade list and unlock-condition matrix.
- Make Research progression more explicit and readable.
- Rework Promotion + Prestige into a clearer mid-game loop.
- Redesign cigarette system for better gameplay readability and pressure pacing.
- Deliver Chapter 1 to free-play transition endpoint.
- Add a new infinite low-tier classifieds task source with no work deadline.
- Turn Promotion into a paid activity with cashback-style returns and monetization outcomes.
- Polish Stats and Achievements windows UX and add dedicated Back buttons.
- Gate forest/wilderness reset behind a story checkpoint to prevent premature progression loss.
- Fix Back button navigation in Achievements and Stats windows.

## Deferred From Chat History (User Requested For Later)
- `deferred` Build a longer multi-step story progression chain across character growth (beyond current starter chain).
- `deferred` Run a broad global polish pass ("marafet") across existing systems and menus after core mechanics stabilize.
- `deferred` Expand research/promotion content into a full milestone-driven task lineup (current implementation is only seed tasks).
- `deferred` Add additional category-specific ChatDJBT conditional comments and progression reactions.

## Active Workstreams

### 1) Menu UX and Navigation
- `done` Two-level tasks menu architecture (hub screen + category screen).
- `done` Back button returns to category hub inside the overlay.
- `done` Start button becomes disabled/desaturated when no selectable task.
- `done` Fix hidden-view bug in two-level switching.
- `done` First pixel-polish pass for title/button/list alignment against Figma.
- `open` Final precision polish across common aspect ratios.
- `done` IMPORTANT: Fixed task cards rendering/interaction issues (layout, selection, lock-state consistency) in fixed layout baseline.

### 2) Task Categories and Availability
- `done` Strict category separation (orders/story/research/promotion).
- `done` Locked cards are visible but non-selectable.
- `done` Locked cards show `Blocked` + requirement line (`Need level N` / `Need upgrade`).
- `open` Expand lock conditions beyond level/upgrade (milestones, knownness, pool threshold).

### 3) Progression Economy
- `done` Base job chance starts at 0 and is not auto-restored to non-zero after tutorial.
- `done` Virtual prestige pool is tracked and saved.
- `done` Story tasks transfer from pool to real prestige (default ratio + per-story overrides).
- `done` Transfer ratio can be improved by upgrades.
- `open` Rebalance pool gain and transfer values for smoother early game pacing.

### 4) Content and Narrative
- `done` Tutorial line updated to: `Let's put your portfolio out there.`
- `accepted` Expand tutorial with additional first-open contextual explanations.
- `accepted` Add more ChatDJBT conditional comments for category-specific outcomes and fail-state reactions.
- `accepted` Define and implement a larger task chain for Research and Promotion categories.
- `accepted` Build additional Story tasks as the next narrative progression arc.

### 5) Upgrades and Progression Design
- `done` Rework upgrades menu structure and readability (grouping, labels, progression clarity).
- `accepted` Produce a dedicated progression logic document (economy loops, unlock rules, pacing targets, formulas).
- `accepted` Build full node matrix with unlock conditions and branch pacing.
- `accepted` Implement AI node concept: `ChatDJBT PRO`.
- `accepted` Gate `ChatDJBT PRO` by Research completion: `Разобраться с оплатой сервисов`.
- `accepted` Create custom pixel-art textures and visual assets for the upgrades/skill tree menu UI (replace placeholders, define style guide per node category).
- `accepted` Fully rework Autogenerator (economy, tick cost, toggle UX, upgrade interactions) as part of the new upgrade nodes pass. Tick cost frozen at 0 until rework is delivered (Q-036).

### 7) Goods and Cigarettes
- `accepted` Do full Goods pass: item list clarity, effect behavior, UX readability, and balancing.
- `accepted` Rework cigarette loop: pricing pressure, stress/zen interaction clarity, and progression role.
- `accepted` Add ChatDJBT comment triggered when cigarettes run out and nicotine withdrawal begins.
- `accepted` Add dedicated character withdrawal sprite, shown while nicotineWithdrawal is active.
- `accepted` Implement "found a spare cig" event: fires 10 s after withdrawal start, triggers free smoke break, clears withdrawal.
- `deferred` Optional mechanic: "quit smoking" — player voluntarily gives up cigarettes for a permanent bonus, with a withdrawal penalty arc before the payoff.

#### Cigarette Upgrade Branch (planned, not yet scheduled)
- `deferred` **Stub-out skill (tier 1):** Allow cancelling a smoke break early if stress hits 0 before the timer ends — cigarette is still consumed, butt still earned.
- `deferred` **Economy skill (tier 2, requires tier 1):** If less than 10% of the cigarette was smoked when cancelled, the cigarette is not consumed and no butt is added.
- `deferred` **Reduced compulsion — level 1:** Smoke break required only every 2 completed tasks instead of every task.
- `deferred` **Reduced compulsion — level 2:** Every 3 completed tasks.
- `deferred` **Reduced compulsion — level 3:** Every 5 completed tasks.
- `deferred` **Reduced compulsion — level 4 (max):** Smoke breaks are no longer forced after task completion; player smokes manually only.

### 8) Research / Promotion / Prestige
- `accepted` Make Research system more legible (task intent, action labels, reward signaling, gating).
- `accepted` Rework Promotion + Prestige loop for stronger strategic meaning and pacing.
- `accepted` Convert Promotion tasks into paid actions and add cashback channels (ads, donations, courses).

### 10) Classifieds Endless Work
- `accepted` Add a dedicated classifieds-board task source: low quality, low payout, infinite availability.
- `accepted` Classifieds tasks have no execution deadline and function as fallback grind content.

### 11) Stats and Achievements UX
- `accepted` Redesign Stats and Achievements overlays for clearer readability and structure.
- `accepted` Add explicit `Back` buttons to both windows with consistent menu navigation behavior.

### 12) Chapter 2 Achievements System
- `accepted` Design and implement a full achievements grid UI for Chapter 2: icon grid layout, locked/unlocked states, reward display.
- `accepted` Define the Chapter 2 achievement set tied to narrative events (mirroring CH1 pattern: spam_bot, green_balls, plus_vibes style).
- `accepted` Wire CH2_EVENTS achievements hooks using the same `handleChapter1Event`-style system.

### 13) Localisation (EN / RU)
- `accepted` Define localisation architecture: two locale files (`locale.en.js`, `locale.ru.js`) with flat key-value maps.
- `accepted` Write full Russian and English versions of all dialogue lines, cinematic text, task titles/descriptions, UI labels, and achievement copy.
- `done` Add a language switcher control in the settings UI (placeholder EN | RU text toggle, persists in separate localStorage key, survives game reset).
- `deferred` Replace EN/RU text labels on the language switcher with country flag icons.
- `accepted` Wire all text-rendering paths (dialogue, cinematic subtitles, task cards, overlays) to read from the active locale at render time.
- `accepted` Default locale = RU; persist player choice in save state.

### 9) Story Chapter 1 -> Free Play
- `accepted` Deliver Chapter 1 to free-play endpoint and formalize transition conditions.
- `accepted` Add fail/rollback rule for first major order checkpoint.

## Chapter 1 Narrative Draft (User Vision)

Story step sequence:
1. Tutorial
2. Portfolio
3. No orders
4. Promotion
5. Still no orders
6. Research
7. More promotion
8. First order
9. If success: unlock purchase of `ChatDJBT PRO`
10. If fail: rollback to step 7
11. Purchase `ChatDJBT PRO`
12. Research
13. Next order
14. Story cutscene
15. Buy new clothes
16. Sign contract with OutisticDigital

Upgrade node concept (AI branch):
- Node: `ChatDJBT PRO`
- Description: `Полная версия`
- Price: `1000р.`
- Previous upgrade: `core_designer`
- Unlock requirement: Research task `Разобраться с оплатой сервисов`

### 6) Main Screen UX
- `accepted` VERY IMPORTANT: Redesign the main game screen in Figma and implement it as the production baseline.
- `accepted` Extend the orders/tasks notification badge to include new unlocked tasks from Story, Research, and Promotion categories — not only regular orders.

### 14) Visual Depth and Art Assets
- `accepted` Add secondary parallax sprite layers to the skill tree panning viewport — decorative sprites at varying depth speeds alongside the existing starfield, reinforcing the sense of 3D space during panning.

## Decision Queue (Backlog Questions)

1. `open` Should we introduce tiered rewards by category completion streaks?
2. `open` Should research tasks be repeatable indefinitely or rotate from a deck?
3. `open` Should promotion tasks grant temporary multipliers in addition to pool gains?

## Accepted Next Steps (Execution Queue)
- `done` IMPORTANT: Fix task card bugs/regressions (layout, selection, lock state consistency) before new polish work.
- `accepted` Continue tutorial expansion with additional contextual guidance after card fixes.
- `accepted` Build balancing pass v1 for pool gain, transfer ratios, and special task rewards.
- `accepted` Add first extended lock-condition implementation if Q-006 is accepted.
- `accepted` Add first batch of category-specific ChatDJBT comments.
- `accepted` Expand Research and Promotion task content packs.
- `accepted` Add the next Story task arc after the current starter chain.
- `done` Rework upgrades menu UX and information architecture.
- `accepted` Write and adopt a progression logic specification document.
- `accepted` VERY IMPORTANT: Complete Figma-first redesign of the main game screen and ship the implementation baseline.
- `accepted` Extend task notification badge to cover Story, Research, and Promotion unlocked tasks (Q-033).
- `accepted` Execute Goods/shop pass and cigarettes-v2 pass as one balancing milestone.
- `accepted` Publish upgrade-node unlock matrix v1 (including `ChatDJBT PRO`).
- `accepted` Implement Chapter 1 free-play path with rollback rule at first major order gate.
- `accepted` Implement classifieds endless-board flow (infinite low-tier tasks, no execution timer).
- `accepted` Implement paid Promotion + cashback loop (ad spend -> delayed partial returns).
- `accepted` Implement Stats/Achievements overlay polish and Back-button navigation.
- `accepted` Create pixel-art texture/icon assets for the upgrades menu (Q-034).
- `accepted` Design and integrate secondary parallax sprite layers into the skill tree viewport for enhanced spatial depth (Q-035).
- `accepted` Fully rework Autogenerator within the upgrade nodes pass (Q-036): economy model, tick cost, toggle UX, and upgrade interactions.

## Decision Log
- 2026-04-04: Locked cards finalized as visible but non-selectable with `Blocked` + requirement text and gray styling.
- 2026-04-04: Start button behavior finalized as disabled/desaturated when no selectable task.
- 2026-04-04: Back button behavior finalized as return to category hub (not close overlay).
- 2026-04-04: Hub title finalized as static `BitTrick 25`.
- 2026-04-04: Default prestige transfer variable finalized at 10% with upgrade path.
- 2026-04-04: Prioritized as IMPORTANT: task card fixes ahead of additional content expansion.
- 2026-04-04: Accepted roadmap direction to continue tutorial expansion and increase ChatDJBT comment coverage.
- 2026-04-04: Accepted expansion of Research and Promotion task content as an active priority.
- 2026-04-04: Accepted creation of additional Story tasks beyond the current chain.
- 2026-04-04: Accepted upgrades menu rework and formal progression logic documentation.
- 2026-04-04: Completed IMPORTANT task-card stabilization pass (fixed-layout), including locked-label replacement rules, explicit selection policy, and infinite-lifetime expire-text hiding.
- 2026-04-04: Accepted VERY IMPORTANT priority to redesign the main game screen in Figma and implement it as the new baseline.
- 2026-04-04: Completed upgrades menu rework v1 (grouped cards, status badges, category filters, and progress summary panel).
- 2026-04-05: Accepted roadmap package for Goods pass, upgrades unlock matrix, Research clarity, Promotion/Prestige rework, cigarettes-v2, and Chapter 1 free-play endpoint.
- 2026-04-05: Accepted AI node concept `ChatDJBT PRO` gated by Research task `Разобраться с оплатой сервисов`.
- 2026-04-05: Accepted new endless classifieds work source (low-pay/low-quality, no deadline, infinite fallback tasks).
- 2026-04-05: Accepted paid Promotion redesign with cashback economy channels (ads/donations/courses).
- 2026-04-05: Accepted roadmap item to improve Stats/Achievements windows and add explicit Back buttons.

## Change Log
- 2026-04-04: Created roadmap file and initialized decision process with question queue.
- 2026-04-04: Added menu bug root cause and related accepted follow-ups.
- 2026-04-04: Migrated roadmap to question-driven sprint format with ownership and next actions.
- 2026-04-04: Added roadmap sync protocol and deferred feature backlog collected from chat history.
- 2026-04-04: Added accepted roadmap items for category task expansion, Story expansion, upgrades menu rework, and progression logic spec.
- 2026-04-04: Marked IMPORTANT task-card bugfix queue item as done after implementation pass.
- 2026-04-04: Added VERY IMPORTANT roadmap item for main-screen Figma redesign and implementation.
- 2026-04-04: Implemented upgrades menu UX rework v1 and marked Q-012 as done.
- 2026-04-05: Added Chapter 1 narrative draft and implementation goals for free-play handoff.
- 2026-04-05: Added accepted sprint questions Q-015..Q-021 for system and narrative rework package.
- 2026-04-06: Added Q-033 (task notification badge cross-category extension) to main screen UX sprint scope.
- 2026-04-05: Added accepted sprint questions Q-022..Q-023 for classifieds endless work and paid promotion cashback economy.
- 2026-04-05: Added accepted sprint question Q-024 for Stats/Achievements UX polish and Back-button support.
- 2026-04-06: Accepted Q-033 — extend task notification badge on main screen to include Story, Research, Promotion unlocked tasks; scoped to main screen UX sprint.
- 2026-04-06: Accepted Q-034 — create custom pixel-art textures and icons for upgrades/skill tree menu; asset list and style guide to be defined before production.
- 2026-04-06: Accepted Q-035 — add secondary parallax sprite layers to skill tree viewport alongside existing starfield; per-layer speed multipliers and sprite set to be designed.
- 2026-04-06: Accepted Q-036 — full Autogenerator rework scoped within upgrade nodes pass; AUTOGEN_TICK_COST frozen at 0 in the meantime.
