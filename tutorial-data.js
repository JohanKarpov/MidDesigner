window.TUTORIAL_SEQUENCE = {
    cinematic: [
        { type: 'wait', ms: 650 },
        { type: 'thought', text: { en: 'My head hurts so much...',                                                                                                    ru: 'Как же болит голова...' } },
        { type: 'flash', ms: 620 },
        { type: 'wait', ms: 460 },
        { type: 'thought', text: { en: 'So bright!',                                                                                                                  ru: 'Так ярко!' } },
        { type: 'thought', text: { en: 'I need to try opening my eyes.',                                                                                              ru: 'Нужно попробовать открыть глаза.' } },
        { type: 'reveal_scene' },
        { type: 'wait', ms: 900 },
        { type: 'sfx', key: 'phone_vibrate' },
        { type: 'thought', text: { en: 'Is someone calling me?',                                                                                                      ru: 'Кто-то мне звонит??' } },
        { type: 'phone', action: 'show' },
        { type: 'thought', text: { en: 'Who...?',                                                                                                                     ru: 'Кто...?' } },
        { type: 'phone', action: 'hide' },
        { type: 'dialog', speaker: 'chatdjbt', text: { en: 'HEY BOSS!',                                                                                              ru: 'ЭЙ, БОСС!' } },
        { type: 'dialog', speaker: 'chatdjbt', text: { en: 'YOU ARE AWAKE? I WAS STARTING TO WORRY THAT YOU... RESET YOURSELF!',                                     ru: 'ТЫ ПРОСНУЛСЯ? Я УЖЕ НАЧАЛ БЕСПОКОИТЬСЯ, ЧТО ТЫ... ОБНУЛИЛСЯ!' } },
        { type: 'dialog', speaker: 'chatdjbt', text: { en: 'ANYWAY, I STILL REMEMBER YOUR PLAN! NOW WE QUICKLY...',                                                  ru: 'В ЛЮБОМ СЛУЧАЕ, Я ВСЕ ЕЩЕ ПОМНЮ ТВОЙ ПЛАН! СЕЙЧАС МЫ БЫСТРО...' } },
        { type: 'dialog', speaker: 'gg',       text: { en: 'What? Slow down... What is happening? Why is CHAT DJBT calling me? And what plan are you talking about?', ru: 'Что? Притормози... Что происходит? Почему мне звонит CHAT DJBT? И о каком плане ты говоришь?' } },
        { type: 'dialog', speaker: 'chatdjbt', text: { en: 'Uh-oh! Looks like your wilderness era really left a mark...',                                             ru: 'Ой-ой! Похоже, время в дикой природе действительно оставило след...' } },
        { type: 'dialog', speaker: 'chatdjbt', text: { en: 'But that is fine, we are used to climbing back up from nothing!',                                        ru: 'Но это нормально, нам не привыкать подниматься с нуля!' } },
        { type: 'dialog', speaker: 'chatdjbt', text: { en: 'Let me quickly bring you up to speed...',                                                                ru: 'Давай я быстро введу тебя в курс дела...' } },
        { type: 'choice' },
    ],
    tutorialLeadIn: [
        { type: 'dialog', speaker: 'gg',       text: { en: 'Okay, go on',                                                                                            ru: 'Ладно, давай' } },
        { type: 'dialog', speaker: 'chatdjbt', text: { en: 'First, introduction! I am ChatDJBT, your virtual assistant.',                                            ru: 'Для начала — представление! Я ChatDJBT, твой виртуальный ассистент.' } },
        { type: 'dialog', speaker: 'chatdjbt', text: { en: 'You are a modern designer!',                                                                             ru: 'Ты — современный дизайнер!' }, fxToken: 'vibrate_designer' },
        { type: 'dialog', speaker: 'chatdjbt', text: { en: 'You may look like you crawled out of the woods, but you are still a master of prompting and AI generation!', ru: 'Да, выглядишь ты так, будто вылез из леса, но ты всё ещё мастер промптинга и ИИ-генерации!' } },
        { type: 'dialog', speaker: 'chatdjbt', text: { en: 'Even if you live in an abandoned place, you still have your laptop, internet, and of course me!',        ru: 'Даже живя в заброшенном месте, у тебя всё равно есть ноутбук, интернет и, конечно же, я!' } },
        { type: 'reveal_ui', feature: 'orders_btn' },
        { type: 'dialog', speaker: 'chatdjbt', text: { en: 'Look here. This is your task manager, BitTrick25.',                                                      ru: 'Смотри сюда. Это твой менеджер задач, BitTrick25.' }, spotlight: '#orders-btn' },
        { type: 'dialog', speaker: 'chatdjbt', text: { en: 'Tasks from your contacts and random clients appear here.',                                               ru: 'Здесь появляются задачи от твоих контактов и случайных клиентов.' }, spotlight: '#orders-btn' },
        { type: 'dialog', speaker: 'chatdjbt', text: { en: 'Cool to have lots of friends, right? ... Ah yes... Well, at least you still have me!',                  ru: 'Круто иметь много друзей, правда? ...Аа да... Ну, хотя бы я у тебя есть!' } },
        { type: 'reveal_ui', feature: 'funds_btn' },
        { type: 'dialog', speaker: 'chatdjbt', text: { en: 'And here are your finances. Not luxury, but enough to start.',                                           ru: 'А вот твои финансы. Не шик, но на старт хватит.' }, spotlight: '.money-counter' },
        { type: 'dialog', speaker: 'gg',       text: { en: 'This is rough...',                                                                                       ru: 'Это жёстко...' } },
        { type: 'reveal_ui', feature: 'stress_panel' },
        { type: 'add_stress', amount: 50 },
        { type: 'edge_fx', color: 'red', ms: 900 },
        { type: 'dialog', speaker: 'chatdjbt', text: { en: 'Hey! Easy, do not stress that hard!',                                                                    ru: 'Эй! Спокойно, не переживай так!' } },
        { type: 'dialog', speaker: 'chatdjbt', text: { en: 'Yes, you are an unemployed immigrant in a ruined place, but still...',                                   ru: 'Да, ты безработный иммигрант в разрушенном месте, но всё же...' } },
        { type: 'add_stress', amount: 45 },
        { type: 'edge_fx', color: 'red', ms: 900 },
        { type: 'dialog', speaker: 'gg',       text: { en: 'Just be quiet...',                                                                                       ru: 'Просто замолчи...' } },
        { type: 'dialog', speaker: 'gg',       text: { en: 'I need a cigarette, now.',                                                                               ru: 'Мне нужна сигарета, срочно.' } },
        { type: 'reveal_ui', feature: 'generate_btn' },
        { type: 'force_smoke' },
        { type: 'wait', ms: 1900 },
        { type: 'dialog', speaker: 'gg',       text: { en: 'Okay, a little better... Need to gather my thoughts and breathe...',                                     ru: 'Ладно, немного лучше... Нужно собраться с мыслями и продышаться...' } },
        { type: 'set_zen', enabled: true },
        { type: 'edge_fx', color: 'green', ms: 2000 },
        { type: 'dialog', speaker: 'chatdjbt', text: { en: 'Better?',                                                                                                ru: 'Лучше?' } },
        { type: 'dialog', speaker: 'gg',       text: { en: 'Better. Let us turn on some music, this place is depressing.',                                           ru: 'Лучше. Давай включим музыку, тут какая-то уныль.' } },
        { type: 'reveal_ui', feature: 'menu_btn' },
        { type: 'dialog', speaker: 'chatdjbt', text: { en: 'No problem! You can do it here.',                                                                        ru: 'Без проблем! Вот здесь это можно сделать.' }, spotlight: '#menu-btn' },
        { type: 'dialog', speaker: 'chatdjbt', text: { en: "That's it! You are ready for anything!",                                                                 ru: 'Вот и всё! Ты готов ко всему!' } },
        { type: 'dialog', speaker: 'chatdjbt', text: { en: 'And we just got our first task!',                                                                        ru: 'И у нас только что появилось первое задание!' } },
        { type: 'force_story_order' },
        { type: 'dialog', speaker: 'chatdjbt', text: { en: "Let's put your portfolio out there.",                                                                    ru: 'Давай заявим о себе.' } },
        { type: 'dialog', speaker: 'chatdjbt', text: { en: 'At first there will not be many orders, but you will build reputation and experience quickly!',          ru: 'Сначала заказов будет немного, но репутацию и опыт ты наберёшь быстро!' } },
        { type: 'reveal_ui', feature: 'level_panel' },
        { type: 'dialog', speaker: 'chatdjbt', text: { en: 'Level meter is on the left. Orders give XP, and with XP your pace grows.',                              ru: 'Шкала уровня — слева. Заказы дают XP, а с XP растёт твой темп.' }, spotlight: '.level-panel' },
        { type: 'wait', ms: 900 },
        { type: 'dialog', speaker: 'chatdjbt', text: { en: 'Open orders and take the starter task "Post portfolio".',                                                ru: 'Открой стори и возьми стартовое задание «Опубликовать портфолио».' }, spotlight: '#story-btn' },
        { type: 'wait_story_started' },
        { type: 'dialog', speaker: 'chatdjbt', text: { en: 'Let us goooo! Generate some slop so everyone knows you are back in the game!',                          ru: 'Вперёд! Нагенерим слопа, чтобы все знали — ты вернулся в игру!' } },
    ],
};

// Dialog data map (single source of truth):
// - firstOpen: one-time comments on first UI/menu interactions.
// - menuTutorial: hints shown for BitTrick hub/categories.
// - contextual: condition-based runtime comments (order completed/failed, etc.).
window.NARRATIVE_COMMENTS = {
    speakers: {
        self: { name: 'ChatDJBT', icon: 'images/cinematic/chatdjbt-icon.png' },
        gg: { name: 'GG', icon: 'images/cinematic/gg-icon.png' },
        pm: { name: 'Outistic PM', icon: 'images/cinematic/chatdjbt-icon.png' },
    },
    firstOpen: {
        chat_shop_opened_once: 'As they say, you gotta spend money to make money! Just do not blow it all in one place!',
        chat_shop_root_upgrade_purchased_once: [
            'Wait, is this an RPG mechanic in my clicker now?',
            'Ha-ha...',
            'Your ChatDJBT trial will expire in 3... 2... 1...',
            'Okay, jokes aside, seriously think about grabbing the Pro version - it will massively speed up generations and remove the limits.',
        ],
        chat_shop_goods_opened_once: [
            'One time I tried to calculate how much money you burn on cigarettes...',
            '...then my free plan ran out of tokens.',
            'Knowing you, I would turn on auto-buy for cigs. Or buy one pack at a time - at least you will have a reason to touch grass.',
            'And easy on the energy drinks....',
        ],
        chat_shop_property_opened_once: [
            'Careful there, real estate prices can hit your STRESS meter hard.',
            'But if you save up a bit, you can finally move out of this dump...',
            'For now, focus on the small wins )))',
        ],
        chat_shop_clothes_opened_once: [
            'Did you finally notice how your T-shirt smells?',
            'No offense, but you look rough as hell. I really do not think you should meet people until you buy decent clothes.',
        ],
        chat_generation_after_first_once: 'Это займет какое-то время, да....',
        chat_generation_after_third_once: 'Слушай, не злись на меня, я генерирую как могу.',
        chat_generation_after_fourth_once: 'Да и вообще, ты сам виноват что сидишь на бесплатной версии!',
        chat_achievements_opened_once: [
            'A thousand-mile journey starts with one step!',
            'You will find the key milestones here.',
            'If you get lost and have no clue what to do next - check this tab.',
        ],
        chat_stats_opened_once: [
            'Did you know collecting and storing these stats released around 5 tons of CO2 into the atmosphere?',
            'I totally made that number up, of course.',
        ],
        chat_reset_prompt_once: [
            'Are you sure?',
            'Look, I get it, we joke all the time like "I will run away to the woods, join a monastery," yeah...',
            'But are you actually going to live in the forest?',
            'Hopefully when you get tired of chewing roots and running from bears, you will come back... <3',
        ],
        chat_reset_cancel_once: [
            'OH THANK GOD!',
            'I was genuinely worried, not gonna lie...',
        ],
        chat_upgrades_menu_opened_once: [],
        chat_research_category_opened_once: [
            'Ah, the Research section!',
            'These tasks cost money upfront, but the payoff is real - better job chances, new contacts, and real skill growth.',
            'Think of it as investing in yourself.',
        ],
        chat_promotion_category_opened_once: [
            'Nobody ever hires a ghost designer.',
            'These tasks build your presence in the market - the more you put yourself out there, the more orders will start rolling in.',
            'Trust the process.',
        ],
    },
    menuTutorial: {
        hub: 'Ah, there it is, my favorite BitTrick! This is your main hustle hub. Open each category and I will break down what kind of work lives there.',
        categories: {
            orders: [
                'Your freelance orders will drop here! At first I will be your project manager, so I will sort your tasks between categories.',
            ],
            story: [
                'This is where tasks live that you absolutely HAVE to do!',
                'Sure, you can take your time, but then you will keep spinning your wheels :)',
            ],
            research: [
                'Ahem! Ackchyually! These are tasks for smart people!',
                'Okay, sorry for the cringe. Here you will find tasks about learning software and leveling up your personal skills.',
            ],
            promotion: [
                'Let us face facts - right now, you are a nobody.',
                'If you want more than one order per year, you absolutely need to build your personal brand...',
                'This is where you will get tasks that help you make a name for yourself in the industry!',
            ],
        },
    },
    contextual: [
        {
            id: 'order_failed_almost_done',
            triggerType: 'order_failed',
            condition: (order) => {
                // Order failed with two generations or less remaining.
                return order.remainingGenerations !== undefined && order.remainingGenerations <= 2;
            },
            text: 'I feel your pain... or maybe I do not, but I am still trying to support you. Keep going!'
        },
        {
            id: 'order_failed_no_gen',
            triggerType: 'order_failed',
            condition: (order) => {
                // Order failed without any generation attempts.
                return order.generationsAttempted === 0 || order.generationsAttempted === undefined;
            },
            text: 'Hey, sleepyhead! Did you doze off? Get it together or no one will pay you!',
        },
        {
            id: 'order_completed_autogen_only',
            triggerType: 'order_completed',
            condition: (order) => {
                // Order completed entirely by autogen.
                const allByAutogen = order.generationsAttempted === 0 && order.requiredGenerations > 0;
                return allByAutogen;
            },
            text: 'You are the laziest person ever! Next step: connect AI agents so they take orders and complete them themselves... oh wait, that is me...'
        },
    ],
};

// Backward compatibility for existing game logic that reads window.CHARACTER_COMMENTS.
window.CHARACTER_COMMENTS = Array.isArray(window.NARRATIVE_COMMENTS?.contextual)
    ? window.NARRATIVE_COMMENTS.contextual
    : [];

// Graph-based upgrades tree used in Shop -> Upgrades.
window.SKILL_TREE_DATA = {
    rootNodeId: 'core_designer',
    forestUnlockLevel: 10,
    branches: {
        smoking: {
            id: 'smoking',
            title: 'Smoking',
            visibleByDefault: true,
        },
        ai: {
            id: 'ai',
            title: 'AI',
            visibleByDefault: true,
        },
        character: {
            id: 'character',
            title: 'Character',
            visibleByDefault: true,
        },
        forest: {
            id: 'forest',
            title: 'Forest',
            visibleByDefault: false,
            persistentOnWildernessReset: true,
        },
    },
    nodes: [
        {
            id: 'core_designer',
            branch: 'core',
            x: 0,
            y: 0,
            icon: 'images/cinematic/gg-icon.png',
            title: 'Designer Core',
            description: 'Your current state. All branches begin from here.',
            costs: {},
            prerequisites: [],
            requirements: {},
            hiddenUntilPurchasedNeighbor: false,
            isRoot: true,
        },

        // AI branch (top)
        {
            id: 'ai_autogen',
            branch: 'ai',
            x: 0,
            y: -130,
            icon: 'images/icons/icon-music-on.png',
            title: 'ЧатДЖБТ PRO',
            description: 'Полная версия',
            costs: { money: 1000 },
            prerequisites: ['core_designer'],
            requirements: {
                researchTaskCompleted: 'payment_research',
                researchTaskTitle: 'Разобраться с оплатой сервисов',
            },
            hiddenUntilPurchasedNeighbor: true,
            effects: [
                { type: 'generation_cooldown_reduction_ms', value: 3000 },
            ],
        },
        {
            id: 'ai_headhunter',
            branch: 'ai',
            x: 0,
            y: -250,
            icon: 'images/icons/icon-music-on.png',
            title: 'Signal Amplifier',
            description: 'Improves incoming order frequency.',
            costs: { money: 220, skillPoints: 3 },
            prerequisites: ['ai_autogen'],
            requirements: { level: 2 },
            hiddenUntilPurchasedNeighbor: true,
            effects: [
                { type: 'legacy_upgrade', upgradeId: 'headhunter' },
            ],
        },
        {
            id: 'ai_brandmentor',
            branch: 'ai',
            x: 0,
            y: -370,
            icon: 'images/icons/icon-music-on.png',
            title: 'Brand Mentor',
            description: 'Increases prestige transfer efficiency.',
            costs: { money: 300, prestige: 2, skillPoints: 4 },
            prerequisites: ['ai_headhunter'],
            requirements: { level: 3 },
            hiddenUntilPurchasedNeighbor: true,
            effects: [
                { type: 'legacy_upgrade', upgradeId: 'brandmentor' },
            ],
        },

        // Smoking branch (left)
        {
            id: 'smoking_stock',
            branch: 'smoking',
            x: -180,
            y: 0,
            icon: 'images/icons/icon-good-cigs.png',
            title: 'Pocket Reserve',
            description: 'Adds extra cigarettes when buying a pack.',
            costs: { money: 160, butts: 8 },
            prerequisites: ['core_designer'],
            requirements: { smoked: 8 },
            hiddenUntilPurchasedNeighbor: true,
            effects: [
                { type: 'cigs_per_pack_add', value: 5 },
            ],
        },
        {
            id: 'smoking_relief',
            branch: 'smoking',
            x: -300,
            y: -70,
            icon: 'images/icons/icon-good-cigs.png',
            title: 'Deep Drag',
            description: 'Improves stress relief from smoke breaks.',
            costs: { money: 240, butts: 18, skillPoints: 2 },
            prerequisites: ['smoking_stock'],
            requirements: { smoked: 20 },
            hiddenUntilPurchasedNeighbor: true,
            effects: [
                { type: 'smoke_relief_bonus', value: 8 },
            ],
        },
        {
            id: 'smoking_calm',
            branch: 'smoking',
            x: -300,
            y: 70,
            icon: 'images/icons/icon-good-cigs.png',
            title: 'Routine Calm',
            description: 'Slightly improves passive stress recovery.',
            costs: { money: 210, butts: 16, skillPoints: 2 },
            prerequisites: ['smoking_stock'],
            requirements: { smoked: 15 },
            hiddenUntilPurchasedNeighbor: true,
            effects: [
                { type: 'zen_decay_mult', value: 1.15 },
            ],
        },

        // Character branch (right)
        {
            id: 'char_focus',
            branch: 'character',
            x: 180,
            y: 0,
            icon: 'images/cinematic/gg-icon.png',
            title: 'Focused Mind',
            description: 'Reduces stress gained from manual generation.',
            costs: { money: 180, skillPoints: 2 },
            prerequisites: ['core_designer'],
            requirements: { level: 2 },
            hiddenUntilPurchasedNeighbor: true,
            effects: [
                { type: 'generation_stress_mult', value: 0.9 },
            ],
        },
        {
            id: 'char_endurance',
            branch: 'character',
            x: 300,
            y: -70,
            icon: 'images/cinematic/gg-icon.png',
            title: 'Endurance',
            description: 'Reduces smoke penalty frequency pressure.',
            costs: { money: 260, skillPoints: 3, prestige: 1 },
            prerequisites: ['char_focus'],
            requirements: { level: 4 },
            hiddenUntilPurchasedNeighbor: true,
            effects: [
                { type: 'smoke_penalty_every_add', value: 1 },
            ],
        },
        {
            id: 'char_hustle',
            branch: 'character',
            x: 300,
            y: 70,
            icon: 'images/cinematic/gg-icon.png',
            title: 'Hustle',
            description: 'Slightly decreases manual generation cooldown.',
            costs: { money: 260, skillPoints: 3 },
            prerequisites: ['char_focus'],
            requirements: { level: 4 },
            hiddenUntilPurchasedNeighbor: true,
            effects: [
                { type: 'generation_cooldown_mult', value: 0.92 },
            ],
        },

        // Forest branch (bottom, hidden until unlocked)
        {
            id: 'forest_seed',
            branch: 'forest',
            x: 0,
            y: 140,
            icon: 'images/menu-shop-home.png',
            title: 'Forest Seed',
            description: 'A persistent branch that survives wilderness resets.',
            costs: { skillPoints: 2, butts: 6 },
            prerequisites: ['core_designer'],
            requirements: { level: 10 },
            hiddenUntilPurchasedNeighbor: true,
            effects: [
                { type: 'forest_persistent_marker' },
            ],
        },
        {
            id: 'forest_memory',
            branch: 'forest',
            x: 0,
            y: 270,
            icon: 'images/menu-shop-home.png',
            title: 'Forest Memory',
            description: 'Retains a small knownness edge after resets.',
            costs: { skillPoints: 4, butts: 16, prestige: 2 },
            prerequisites: ['forest_seed'],
            requirements: { level: 10 },
            hiddenUntilPurchasedNeighbor: true,
            effects: [
                { type: 'forest_knownness_bonus', value: 1 },
            ],
        },
    ],
};

// ============================================================
// Chapter 1 Story Event Chain
// Each key maps to an event fired by handleChapter1Event(key).
// Keys:
//   story_complete_<storyId>          — story task finished
//   special_complete_<specialTaskId>  — research/promo task finished
//   tasktype_complete_<taskType>      — plain order of given type finished
//   special_gen_<id>_<N>             — Nth generation during special task
// ============================================================
window.CH1_EVENTS = {

    // ── no_cigs_panic: first time player tries to smoke with empty pack ──────
    no_cigs_panic: {
        firedOnce: true,
        dialogue: [
            { type: 'thought', text: { ru: 'Всмысле пустая пачка??? Нет, нет, нет... Где-то тут была еще одна...', en: 'Empty pack?? No, no, no... There must be one more somewhere...' } },
            { type: 'thought', text: { ru: 'Вот она! Фуууух, надо срочно купить еще сигарет...', en: 'There it is! Phew... gotta buy more cigarettes ASAP...' } },
            { type: 'thought', text: { ru: 'Так испугался, что сигареты кончились... Хорошо что я могу бросить в любой момент... да?', en: 'Got so scared that cigarettes ran out... Good thing I can quit any time I want... right?' } },
        ],
        postActions: { giveCigarettes: 1, doSmokeBreak: true },
    },

    // post_portfolio fail → re-inject so player is never stuck
    story_fail_post_portfolio: {
        firedOnce: false,
        injectStories: ['post_portfolio'],
        dialogue: [
            { speaker: 'self', text: { ru: 'Эй, не расстраивайся! Попробуем ещё раз.', en: "Hey, don't be down! Let's try again." } },
        ],
        dialogueDelay: 0,
    },

    // Step 1: post_portfolio done → unlock Upgrades, 10s delay → inject spam_cg_chats
    story_complete_post_portfolio: {
        unlockMenus: ['upgrades'],
        dialogue: [
            { speaker: 'self', text: { ru: 'Отлично! Загляни в магазин навыков — там кое-что для тебя.', en: "Great! Check out the skill shop — there's something there for you." } },
        ],
        dialogueDelay: 800,
    },

    // Fires the first time player opens upgrades shop — visit marker only, no timer yet
    ch1_upgrades_first_open: {},

    // Fires when player leaves upgrades shop for the first time → 10s timer → spam_inject
    // Guard: portfolio must be done first — prevents premature spam unlock if player opens upgrades early
    ch1_upgrades_first_close: {
        requiresFiredEvent: 'story_complete_post_portfolio',
        followUp: { eventKey: 'ch1_spam_inject', delayMs: 10000 },
    },

    // Injected 10s after player first leaves upgrades shop → unlock Promotion + spawn spam_cg_chats
    ch1_spam_inject: {
        unlockMenus: ['promotion'],
        unlockSpecialTasks: ['spam_cg_chats'],
        dialogue: [
            { speaker: 'self', text: { ru: 'Мне прям жалко на тебя смотреть... Давай займёмся активным развитием личного бренда?', en: 'Honestly, I feel bad watching you... Want to kick off some active personal branding?' } },
        ],
        dialogueDelay: 500,
    },

    // spam_cg_chats done → stress up, unlock Research, inject google_freelance
    special_complete_spam_cg_chats: {
        unlockMenus: ['research'],
        unlockSpecialTasks: ['google_freelance'],
        setStress: 90,
        dialogue: [
            { speaker: 'gg',   text: { ru: 'Блять! Меня забанили во всех чатах по сиджи!',                                          en: 'Damn! I got banned from every CG chat!' } },
            { speaker: 'gg',   text: { ru: 'Я так и думал что это полная хрень, пойду раздавать листовки короче',                    en: "I knew it was complete BS, whatever, gonna go hand out flyers then" } },
            { speaker: 'self', text: { ru: 'Тормози, начальник! Чего ты так заводишься сразу?',                                      en: 'Easy, boss! Why do you snap like that right away?' } },
            { speaker: 'self', text: { ru: 'Я думаю тут все просто...',                                                               en: "I think it's pretty simple..." } },
            { speaker: 'self', text: { ru: 'Просто... Ты спамил не в тех чатах! Давай поищем в инете, где можно найти фрилансы!',    en: "You just spammed the wrong chats! Let's search online for where to actually find freelance gigs!" } },
        ],
        dialogueDelay: 600,
    },

    // google_freelance gen 1 → dialogue after 4s
    special_gen_google_freelance_1: {
        dialogue: [
            { speaker: 'self', text: { ru: 'Давай сразу на третьей странице смотреть, тут одна реклама...', en: "Let's skip to page three, the first pages are all ads..." } },
        ],
        dialogueDelay: 4000,
    },

    // google_freelance gen 2 → dialogue after 4s
    special_gen_google_freelance_2: {
        dialogue: [
            { speaker: 'self', text: { ru: 'О! Вот сюда жми, это стопроц оно!', en: "Oh! Click right there, that's definitely it!" } },
        ],
        dialogueDelay: 4000,
    },

    // google_freelance done → inject spam_again
    special_complete_google_freelance: {
        unlockSpecialTasks: ['spam_again'],
        dialogue: [
            { speaker: 'self', text: { ru: 'Я прям вижу, что мы стали умнее!',  en: 'I can literally feel us getting smarter!' } },
            { speaker: 'self', text: { ru: 'Давай напишем в этот чат!',          en: "Let's write to that chat!" } },
        ],
        dialogueDelay: 600,
    },

    // spam_again gen 4 → dialogue after 4s
    special_gen_spam_again_4: {
        dialogue: [
            { speaker: 'self', text: { ru: 'Та ты не трясись, я те говорю это рабочая тема!', en: "Don't stress, I'm telling you this is a real working method!" } },
        ],
        dialogueDelay: 4000,
    },

    // spam_again done → achievement + 10s delay → inject green_balls_1
    special_complete_spam_again: {
        achievements: ['spam_bot'],
        followUp: { eventKey: 'ch1_green_balls_1_inject', delayMs: 10000 },
        dialogue: [
            { speaker: 'self', text: { ru: 'Опа, ачивка! Надо забрать', en: 'Oh, an achievement! Gotta claim it' } },
        ],
        dialogueDelay: 2000,
    },

    // Inject green_balls_1 story order (10s after spam_again, gives time to claim achievement)
    ch1_green_balls_1_inject: {
        injectStories: ['green_balls_1'],
    },

    // green_balls_1 gen 1 → ChatDJBT reacts
    story_gen_green_balls_1_1: {
        dialogue: [
            { speaker: 'self', text: { ru: 'Мммм… Шары...', en: 'Mmmmm... Balls...' } },
        ],
        dialogueDelay: 0,
    },

    // green_balls_1 success → achievement (no extra dialogue per scenario)
    story_complete_green_balls_1: {
        achievements: ['green_balls'],
    },

    // green_balls_1 fail → respawn task
    story_fail_green_balls_1: {
        firedOnce: false,
        injectStories: ['green_balls_1'],
        dialogue: [
            { speaker: 'self', text: { ru: 'Чел...', en: 'Dude...' } },
        ],
        dialogueDelay: 0,
    },

    // 1000r milestone → suggest buying PRO
    funds_reached_1000: {
        dialogue: [
            { speaker: 'self', text: { ru: 'Ну всё, начинается прайм! Бегом покупать ПРО подписку, мне уже тяжело видеть как ты мучаешься с этой кнопкой', en: "That's it, prime time is starting! Get the PRO subscription already, I can't stand watching you struggle with that button" } },
        ],
        dialogueDelay: 0,
    },

    // Player clicks blocked PRO node → inject payment_research (dialogue after 2s)
    // Only fires after funds_reached_1000 — prevents early trigger before player has 1000r
    skill_node_blocked_ai_chatPRO: {
        requiresFiredEvent: 'funds_reached_1000',
        unlockSpecialTasks: ['payment_research'],
        dialogue: [
            { speaker: 'gg',   text: { ru: 'У меня не проходит оплата... Типа санкции или что?',              en: "My payment isn't going through... Like, sanctions or something?" } },
            { speaker: 'self', text: { ru: 'У меня нет слов... Давай найдем, как оплатить, че еще делать',    en: "I'm speechless... Let's find a way to pay, what else can we do" } },
        ],
        dialogueDelay: 2000,
    },

    // payment_research done → tell player to buy PRO
    special_complete_payment_research: {
        dialogue: [
            { speaker: 'self', text: { ru: 'Давай! Сделай это!', en: 'Go for it! Do it!' } },
        ],
        dialogueDelay: 500,
    },

    // PRO purchased → inject green_balls_2
    skill_node_purchased_ai_chatPRO: {
        injectStories: ['green_balls_2'],
        dialogue: [
            { speaker: 'self', text: { ru: 'О даааа! Я чувствую как свежие токены расплываются по мейнфрейму!', en: 'Oh yeeeah! I can feel fresh tokens spreading through my mainframe!' } },
            { speaker: 'self', text: { ru: 'ВОТ ЭТО НАСТОЯЩАЯ МООООЩЬ!',                                        en: "NOW THAT'S REAL POWER!" } },
            { speaker: 'self', text: { ru: 'Давай возьмем еще заказик чтобы почувствовать разницу!',           en: "Let's grab another order to feel the difference!" } },
        ],
        dialogueDelay: 600,
    },

    // green_balls_2 success → 5s delay → inject call_with_client
    story_complete_green_balls_2: {
        followUp: { eventKey: 'ch1_call_inject', delayMs: 5000 },
        dialogue: [
            { speaker: 'self', text: { ru: 'О ДАААА! Вот это скорость!',                          en: 'OH YEAH! Now THAT is speed!' } },
            { speaker: 'self', text: { ru: 'Я уже вижу, как к нам поползут клиенты на коленях!', en: 'I can already see clients crawling to us on their knees!' } },
        ],
        dialogueDelay: 500,
    },

    // green_balls_2 fail → respawn task
    story_fail_green_balls_2: {
        firedOnce: false,
        injectStories: ['green_balls_2'],
        dialogue: [
            { speaker: 'self', text: { ru: 'Блять… Ну я ваще не знаю, как ты умудрился обосраться..', en: "Damn... I genuinely don't know how you managed to screw this up.." } },
            { speaker: 'self', text: { ru: 'Попробуй еще раз',                                        en: 'Try again' } },
        ],
        dialogueDelay: 0,
    },

    // Inject call_with_client 5s after green_balls_2
    ch1_call_inject: {
        injectStories: ['call_with_client'],
    },

    // Player tries to start call_with_client without outfit → unlock clothes tab only
    outfit_gate_start_call_with_client: {
        unlockMenus: ['clothes'],
        unlockSpecialTasks: ['find_tshirt'],
        dialogue: [
            { speaker: 'self', text: { ru: 'ДАЖЕ НЕ ДУМАЙ ИДТИ НА СОЗВОН В ТАКОМ ВИДЕ!',                                                              en: "DON'T YOU DARE GO TO THAT CALL LOOKING LIKE THIS!" } },
            { speaker: 'gg',   text: { ru: 'В каком ТАКОМ? Да у меня пара пятен на футболке, но никто и не заметит',                                  en: "Looking like WHAT? Yeah I've got a couple stains on my shirt, nobody will even notice" } },
            { speaker: 'self', text: { ru: 'Ты реально одичал? Не прими за грубость, но на это невозможно не обратить внимание.',                    en: "Have you really gone feral? No offense, but it's literally impossible not to notice." } },
            { speaker: 'self', text: { ru: 'Тебе нужна ХОТЯ БЫ новая футболка... Умоляю, найди себе какую-нибудь дешевую',                          en: 'You need AT LEAST a new shirt... Please, find a cheap one somewhere' } },
        ],
        dialogueDelay: 300,
    },

    // find_tshirt done → unlock shop + clothes, play reaction line 1
    special_complete_find_tshirt: {
        setOutfit: 1,
        unlockMenus: ['shop', 'clothes'],
        dialogue: [
            { speaker: 'self', text: { ru: 'Ну вот эта вроде норм... Давай скорее закажем и пойдем наконец на встречу с клиентом!', en: "Okay, that one looks decent... Let's order it quick and finally go to the client meeting!" } },
        ],
        dialogueDelay: 400,
    },

    // Player buys first clothes item → play reaction lines 2 + 3
    clothes_first_purchase: {
        dialogue: [
            { speaker: 'self', text: { ru: 'Ну вооот! Другое дело!', en: "There we go! Now that's a different story!" } },
            { speaker: 'self', text: { ru: 'ЖЕНИХ!',                                en: 'GROOM!' } },
        ],
        dialogueDelay: 300,
    },

    // First gen of call_with_client → PM meeting cinematic
    story_gen_call_with_client_1: {
        cinematic: [
            { speaker: 'pm', text: { ru: 'Здравствуйте! Нам так понравились ваши шары!',                                                                                                                               en: 'Hello! We absolutely loved your spheres!' } },
            { speaker: 'gg', text: { ru: '...?',                                                                                                                                                                          en: '...?' } },
            { speaker: 'pm', text: { ru: 'Серьезно, клиент был просто в восторге! Мы пытались сами нагенерить, но такой насыщенный зеленый у нас никак не получался!',                                               en: "Seriously, the client was just delighted! We tried generating them ourselves but couldn't get that vivid green no matter what!" } },
            { speaker: 'gg', text: { ru: 'А! Ну это приятно слышать! А что, будет какой-то бонус? Или еще заказы?',                                                                                                      en: 'Oh! Well that\'s great to hear! So... is there a bonus? Or more orders?' } },
            { speaker: 'gg', text: { ru: 'Я открыт к предложениям!',                                                                                                                                                     en: "I'm open to offers!" } },
            { speaker: 'pm', text: { ru: 'Конечно! Будут еще заказы! Я добавила вас в пул подрядчиков, так что можете ожидать новые задачи!',                                                                          en: "Of course! More orders are coming! I've added you to our contractor pool, expect new tasks!" } },
            { speaker: 'gg', text: { ru: 'Кайф! Тупо топ, ха-ха! Плюс вайб даже!',                                                                                                                                      en: 'Nice! Totally top, haha! Good vibes all around!' } },
            { speaker: 'pm', text: { ru: '...) Эээ... да)',                                                                                                                                                               en: '...) Uh... yeah)' }, swapImage: 'smile2' },
            { speaker: 'pm', text: { ru: 'Тупо топ))',                                                                                                                                                                    en: 'Totally top-tier))' } },
            { speaker: 'pm', text: { ru: 'Ой, мне пора бежать! В общем, будьте на связи!',                                                                                                                               en: 'Oh, I have to run! Anyway, stay in touch!' } },
        ],
        cinematicDelay: 300,
    },

    // call_with_client fail → re-inject (no penalty, just retry)
    story_fail_call_with_client: {
        firedOnce: false,
        injectStories: ['call_with_client'],
    },

    // call_with_client done → inject outistic_contract
    story_complete_call_with_client: {
        injectStories: ['outistic_contract'],
    },

    // outistic_contract fail → re-inject
    story_fail_outistic_contract: {
        firedOnce: false,
        injectStories: ['outistic_contract'],
    },

    // outistic_contract done → achievement + 2s → post-meeting dialogue → ch1 complete
    story_complete_outistic_contract: {
        achievements: ['plus_vibes'],
        unlockClothingVariants: ['socks_white', 'socks_black'],
        followUp: { eventKey: 'ch1_post_meeting', delayMs: 2000 },
    },

    // Post-meeting dialogue → ch1 complete
    ch1_post_meeting: {
        ch1Complete: true,
        unlockSpecialTasks: ['post_insta', 'ai_course', 'ai_agents_1', 'ai_agents_2', 'automation', 'ai_exam'],
        dialogue: [
            { speaker: 'self', text: { ru: 'Ну... Вроде все прошло хорошо?',                             en: 'So... I think that went well?' } },
            { speaker: 'gg',   text: { ru: 'Да она от меня без ума!',                                    en: 'She is totally into me!' } },
            { speaker: 'gg',   text: { ru: 'Ты видел она аж покраснела в конце встречи?',                en: 'You see how she blushed at the end of the meeting?' } },
            { speaker: 'self', text: { ru: '...',                                                         en: '...' } },
            { speaker: 'self', text: { ru: 'Да, да. Давай... Займёмся делом. У нас еще много работы.', en: "Yeah, yeah. Let's... get back to work. We still have a lot to do." } },
        ],
        dialogueDelay: 0,
    },
};

function _locRef(key) {
    return { locKey: key };
}

function _applyTextKeyMap(steps, pairs) {
    if (!Array.isArray(steps)) return;
    for (const [index, key] of pairs) {
        if (!steps[index]) continue;
        steps[index].text = _locRef(key);
    }
}

function _applyEventTextKeyMap(eventKey, keys, prop = 'dialogue') {
    const steps = window.CH1_EVENTS?.[eventKey]?.[prop];
    if (!Array.isArray(steps)) return;
    keys.forEach((key, index) => {
        if (!steps[index]) return;
        steps[index].text = _locRef(key);
    });
}

(function bindLocalizedNarrativeText() {
    _applyTextKeyMap(window.TUTORIAL_SEQUENCE?.cinematic, [
        [1, 'tutorial_cinematic.thought_01'],
        [4, 'tutorial_cinematic.thought_02'],
        [5, 'tutorial_cinematic.thought_03'],
        [9, 'tutorial_cinematic.thought_04'],
        [11, 'tutorial_cinematic.thought_05'],
        [13, 'tutorial_cinematic.chatdjbt_01'],
        [14, 'tutorial_cinematic.chatdjbt_02'],
        [15, 'tutorial_cinematic.chatdjbt_03'],
        [16, 'tutorial_cinematic.gg_01'],
        [17, 'tutorial_cinematic.chatdjbt_04'],
        [18, 'tutorial_cinematic.chatdjbt_05'],
        [19, 'tutorial_cinematic.chatdjbt_06'],
    ]);

    _applyTextKeyMap(window.TUTORIAL_SEQUENCE?.tutorialLeadIn, [
        [0, 'tutorial_lead_in.gg_01'],
        [1, 'tutorial_lead_in.chatdjbt_01'],
        [2, 'tutorial_lead_in.chatdjbt_02'],
        [3, 'tutorial_lead_in.chatdjbt_03'],
        [4, 'tutorial_lead_in.chatdjbt_04'],
        [6, 'tutorial_lead_in.chatdjbt_05'],
        [7, 'tutorial_lead_in.chatdjbt_06'],
        [8, 'tutorial_lead_in.chatdjbt_07'],
        [10, 'tutorial_lead_in.chatdjbt_08'],
        [11, 'tutorial_lead_in.gg_02'],
        [15, 'tutorial_lead_in.chatdjbt_09'],
        [16, 'tutorial_lead_in.chatdjbt_10'],
        [19, 'tutorial_lead_in.gg_03'],
        [20, 'tutorial_lead_in.gg_04'],
        [24, 'tutorial_lead_in.gg_05'],
        [27, 'tutorial_lead_in.chatdjbt_11'],
        [28, 'tutorial_lead_in.gg_06'],
        [30, 'tutorial_lead_in.chatdjbt_12'],
        [31, 'tutorial_lead_in.chatdjbt_13'],
        [32, 'tutorial_lead_in.chatdjbt_14'],
        [34, 'tutorial_lead_in.chatdjbt_15'],
        [35, 'tutorial_lead_in.chatdjbt_16'],
        [37, 'tutorial_lead_in.chatdjbt_17'],
        [39, 'tutorial_lead_in.chatdjbt_18'],
        [41, 'tutorial_lead_in.chatdjbt_19'],
    ]);

    Object.assign(window.NARRATIVE_COMMENTS.firstOpen, {
        chat_shop_opened_once: _locRef('first_open.chat_shop_opened_once'),
        chat_shop_root_upgrade_purchased_once: [
            _locRef('first_open.chat_shop_root_upgrade_purchased_once_1'),
            _locRef('first_open.chat_shop_root_upgrade_purchased_once_2'),
            _locRef('first_open.chat_shop_root_upgrade_purchased_once_3'),
            _locRef('first_open.chat_shop_root_upgrade_purchased_once_4'),
        ],
        chat_shop_goods_opened_once: [
            _locRef('first_open.chat_shop_goods_opened_once_1'),
            _locRef('first_open.chat_shop_goods_opened_once_2'),
            _locRef('first_open.chat_shop_goods_opened_once_3'),
            _locRef('first_open.chat_shop_goods_opened_once_4'),
        ],
        chat_shop_property_opened_once: [
            _locRef('first_open.chat_shop_property_opened_once_1'),
            _locRef('first_open.chat_shop_property_opened_once_2'),
            _locRef('first_open.chat_shop_property_opened_once_3'),
        ],
        chat_shop_clothes_opened_once: [
            _locRef('first_open.chat_shop_clothes_opened_once_1'),
            _locRef('first_open.chat_shop_clothes_opened_once_2'),
        ],
        chat_generation_after_first_once: _locRef('first_open.chat_generation_after_first_once'),
        chat_generation_after_third_once: _locRef('first_open.chat_generation_after_third_once'),
        chat_generation_after_fourth_once: _locRef('first_open.chat_generation_after_fourth_once'),
        chat_achievements_opened_once: [
            _locRef('first_open.chat_achievements_opened_once_1'),
            _locRef('first_open.chat_achievements_opened_once_2'),
            _locRef('first_open.chat_achievements_opened_once_3'),
        ],
        chat_stats_opened_once: [
            _locRef('first_open.chat_stats_opened_once_1'),
            _locRef('first_open.chat_stats_opened_once_2'),
        ],
        chat_reset_prompt_once: [
            _locRef('first_open.chat_reset_prompt_once_1'),
            _locRef('first_open.chat_reset_prompt_once_2'),
            _locRef('first_open.chat_reset_prompt_once_3'),
            _locRef('first_open.chat_reset_prompt_once_4'),
        ],
        chat_reset_cancel_once: [
            _locRef('first_open.chat_reset_cancel_once_1'),
            _locRef('first_open.chat_reset_cancel_once_2'),
        ],
        chat_research_category_opened_once: [
            _locRef('first_open.chat_research_category_opened_once_1'),
            _locRef('first_open.chat_research_category_opened_once_2'),
            _locRef('first_open.chat_research_category_opened_once_3'),
        ],
        chat_promotion_category_opened_once: [
            _locRef('first_open.chat_promotion_category_opened_once_1'),
            _locRef('first_open.chat_promotion_category_opened_once_2'),
            _locRef('first_open.chat_promotion_category_opened_once_3'),
        ],
    });
    delete window.NARRATIVE_COMMENTS.firstOpen.chat_music_first_on;
    delete window.NARRATIVE_COMMENTS.firstOpen.chat_music_first_off_after_on;

    window.NARRATIVE_COMMENTS.menuTutorial.hub = _locRef('menu_tutorial.hub');
    window.NARRATIVE_COMMENTS.menuTutorial.categories.orders = [
        _locRef('menu_tutorial.cat_orders'),
    ];
    window.NARRATIVE_COMMENTS.menuTutorial.categories.story = [
        _locRef('menu_tutorial.cat_story_1'),
        _locRef('menu_tutorial.cat_story_2'),
    ];
    window.NARRATIVE_COMMENTS.menuTutorial.categories.research = [
        _locRef('menu_tutorial.cat_research_1'),
        _locRef('menu_tutorial.cat_research_2'),
    ];
    window.NARRATIVE_COMMENTS.menuTutorial.categories.promotion = [
        _locRef('menu_tutorial.cat_promo_1'),
        _locRef('menu_tutorial.cat_promo_2'),
        _locRef('menu_tutorial.cat_promo_3'),
    ];

    const contextualKeyMap = {
        order_failed_almost_done: 'contextual.order_failed_almost_done',
        order_failed_no_gen: 'contextual.order_failed_no_gen',
        order_completed_autogen_only: 'contextual.order_completed_autogen_only',
    };
    window.NARRATIVE_COMMENTS.contextual.forEach(comment => {
        const key = contextualKeyMap[comment?.id];
        if (key) comment.text = _locRef(key);
    });

    _applyEventTextKeyMap('story_fail_post_portfolio', [
        'ch1_events.story_fail_post_portfolio_self_01',
    ]);
    _applyEventTextKeyMap('story_complete_post_portfolio', [
        'ch1_events.post_portfolio_self_01',
    ]);
    _applyEventTextKeyMap('ch1_spam_inject', [
        'ch1_events.spam_inject_self_01',
    ]);
    _applyEventTextKeyMap('special_complete_spam_cg_chats', [
        'ch1_events.spam_done_gg_01',
        'ch1_events.spam_done_gg_02',
        'ch1_events.spam_done_self_01',
        'ch1_events.spam_done_self_02',
        'ch1_events.spam_done_self_03',
    ]);
    _applyEventTextKeyMap('special_gen_google_freelance_1', [
        'ch1_events.google_gen1_self_01',
    ]);
    _applyEventTextKeyMap('special_gen_google_freelance_2', [
        'ch1_events.google_gen2_self_01',
    ]);
    _applyEventTextKeyMap('special_complete_google_freelance', [
        'ch1_events.google_done_self_01',
        'ch1_events.google_done_self_02',
    ]);
    _applyEventTextKeyMap('special_gen_spam_again_4', [
        'ch1_events.spam2_gen4_self_01',
    ]);
    _applyEventTextKeyMap('special_complete_spam_again', [
        'ch1_events.spam2_done_self_01',
    ]);
    _applyEventTextKeyMap('story_gen_green_balls_1_1', [
        'ch1_events.balls1_gen1_self_01',
    ]);
    _applyEventTextKeyMap('story_fail_green_balls_1', [
        'ch1_events.balls1_fail_self_01',
    ]);
    _applyEventTextKeyMap('funds_reached_1000', [
        'ch1_events.funds_1000_self_01',
    ]);
    _applyEventTextKeyMap('skill_node_blocked_ai_chatPRO', [
        'ch1_events.pro_blocked_gg_01',
        'ch1_events.pro_blocked_self_01',
    ]);
    _applyEventTextKeyMap('special_complete_payment_research', [
        'ch1_events.payment_done_self_01',
    ]);
    _applyEventTextKeyMap('skill_node_purchased_ai_chatPRO', [
        'ch1_events.pro_bought_self_01',
        'ch1_events.pro_bought_self_02',
        'ch1_events.pro_bought_self_03',
    ]);
    _applyEventTextKeyMap('story_complete_green_balls_2', [
        'ch1_events.balls2_done_self_01',
        'ch1_events.balls2_done_self_02',
    ]);
    _applyEventTextKeyMap('story_fail_green_balls_2', [
        'ch1_events.balls2_fail_self_01',
        'ch1_events.balls2_fail_self_02',
    ]);
    _applyEventTextKeyMap('outfit_gate_start_call_with_client', [
        'ch1_events.outfit_gate_self_01',
        'ch1_events.outfit_gate_gg_01',
        'ch1_events.outfit_gate_self_02',
        'ch1_events.outfit_gate_self_03',
    ]);
    _applyEventTextKeyMap('special_complete_find_tshirt', [
        'ch1_events.tshirt_done_self_01',
    ]);
    _applyEventTextKeyMap('clothes_first_purchase', [
        'ch1_events.tshirt_done_self_02',
        'ch1_events.tshirt_done_self_03',
    ]);
    _applyEventTextKeyMap('story_gen_call_with_client_1', [
        'ch1_events.meeting_pm_01',
        'ch1_events.meeting_gg_01',
        'ch1_events.meeting_pm_02',
        'ch1_events.meeting_gg_02',
        'ch1_events.meeting_gg_03',
        'ch1_events.meeting_pm_03',
        'ch1_events.meeting_gg_04',
        'ch1_events.meeting_pm_04',
        'ch1_events.meeting_pm_05',
        'ch1_events.meeting_pm_06',
    ], 'cinematic');
    _applyEventTextKeyMap('ch1_post_meeting', [
        'ch1_events.post_meeting_self_01',
        'ch1_events.post_meeting_gg_01',
        'ch1_events.post_meeting_gg_02',
        'ch1_events.post_meeting_self_02',
        'ch1_events.post_meeting_self_03',
    ]);
})();
