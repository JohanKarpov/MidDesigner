window.TUTORIAL_SEQUENCE = {
    cinematic: [
        { type: 'wait', ms: 650 },
        { type: 'thought', text: 'My head hurts so much...' },
        { type: 'flash', ms: 620 },
        { type: 'wait', ms: 460 },
        { type: 'thought', text: 'So bright!' },
        { type: 'thought', text: 'I need to try opening my eyes.' },
        { type: 'reveal_scene' },
        { type: 'wait', ms: 900 },
        { type: 'sfx', key: 'phone_vibrate' },
        { type: 'thought', text: 'Is someone calling me?' },
        { type: 'phone', action: 'show' },
        { type: 'thought', text: 'Who...?' },
        { type: 'phone', action: 'hide' },
        { type: 'dialog', speaker: 'chatdjbt', text: 'HEY BOSS!' },
        { type: 'dialog', speaker: 'chatdjbt', text: 'YOU ARE AWAKE? I WAS STARTING TO WORRY THAT YOU... RESET YOURSELF!' },
        { type: 'dialog', speaker: 'chatdjbt', text: 'ANYWAY, I STILL REMEMBER YOUR PLAN! NOW WE QUICKLY...' },
        { type: 'dialog', speaker: 'gg', text: 'What? Slow down... What is happening? Why is CHAT DJBT calling me? And what plan are you talking about?' },
        { type: 'dialog', speaker: 'chatdjbt', text: 'Uh-oh! Looks like your wilderness era really left a mark...' },
        { type: 'dialog', speaker: 'chatdjbt', text: 'But that is fine, we are used to climbing back up from nothing!' },
        { type: 'dialog', speaker: 'chatdjbt', text: 'Let me quickly bring you up to speed...' },
        { type: 'choice' },
    ],
    tutorialLeadIn: [
        { type: 'dialog', speaker: 'gg', text: 'Okay, go on' },
        { type: 'dialog', speaker: 'chatdjbt', text: 'First, introduction! I am ChatDJBT, your virtual assistant.' },
        { type: 'dialog', speaker: 'chatdjbt', text: 'You are a modern designer!', fxToken: 'vibrate_designer' },
        { type: 'dialog', speaker: 'chatdjbt', text: 'You may look like you crawled out of the woods, but you are still a master of prompting and AI generation!' },
        { type: 'dialog', speaker: 'chatdjbt', text: 'Even if you live in an abandoned place, you still have your laptop, internet, and of course me!' },
        { type: 'reveal_ui', feature: 'orders_btn' },
        { type: 'dialog', speaker: 'chatdjbt', text: 'Look here. This is your task manager, BitTrick25.', spotlight: '#orders-btn' },
        { type: 'dialog', speaker: 'chatdjbt', text: 'Tasks from your contacts and random clients appear here.', spotlight: '#orders-btn' },
        { type: 'dialog', speaker: 'chatdjbt', text: 'Cool to have lots of friends, right? ... Ah yes... Well, at least you still have me!' },
        { type: 'reveal_ui', feature: 'funds_btn' },
        { type: 'dialog', speaker: 'chatdjbt', text: 'And here are your finances. Not luxury, but enough to start.', spotlight: '#funds-btn' },
        { type: 'dialog', speaker: 'gg', text: 'This is rough...' },
        { type: 'reveal_ui', feature: 'stress_panel' },
        { type: 'add_stress', amount: 50 },
        { type: 'edge_fx', color: 'red', ms: 900 },
        { type: 'dialog', speaker: 'chatdjbt', text: 'Hey! Easy, do not stress that hard!' },
        { type: 'dialog', speaker: 'chatdjbt', text: 'Yes, you are an unemployed immigrant in a ruined place, but still...' },
        { type: 'add_stress', amount: 45 },
        { type: 'edge_fx', color: 'red', ms: 900 },
        { type: 'dialog', speaker: 'gg', text: 'Just be quiet...' },
        { type: 'dialog', speaker: 'gg', text: 'I need a cigarette, now.' },
        { type: 'reveal_ui', feature: 'generate_btn' },
        { type: 'force_smoke' },
        { type: 'wait', ms: 1900 },
        { type: 'dialog', speaker: 'gg', text: 'Okay, a little better... Need to gather my thoughts and breathe...' },
        { type: 'set_zen', enabled: true },
        { type: 'edge_fx', color: 'green', ms: 2000 },
        { type: 'dialog', speaker: 'chatdjbt', text: 'Better?' },
        { type: 'dialog', speaker: 'gg', text: 'Better. Let us turn on some music, this place is depressing.' },
        { type: 'reveal_ui', feature: 'menu_btn' },
        { type: 'dialog', speaker: 'chatdjbt', text: 'No problem! You can do it here.', spotlight: '#menu-btn' },
        { type: 'dialog', speaker: 'chatdjbt', text: 'That\'s it! You are ready for anything!' },
        { type: 'dialog', speaker: 'chatdjbt', text: 'And we just got our first task!' },
        { type: 'force_story_order' },
        { type: 'dialog', speaker: 'chatdjbt', text: 'Let\'s put your portfolio out there.' },
        { type: 'dialog', speaker: 'chatdjbt', text: 'At first there will not be many orders, but you will build reputation and experience quickly!' },
        { type: 'reveal_ui', feature: 'level_panel' },
        { type: 'dialog', speaker: 'chatdjbt', text: 'Level meter is on the left. Orders give XP, and with XP your pace grows.', spotlight: '.level-panel' },
        { type: 'wait', ms: 900 },
        { type: 'dialog', speaker: 'chatdjbt', text: 'Open orders and take the starter task "Post portfolio".', spotlight: '#orders-btn' },
        { type: 'wait_story_started' },
        { type: 'dialog', speaker: 'chatdjbt', text: 'Let us goooo! Generate some slop so everyone knows you are back in the game!' },
    ],
    skipLeadIn: [
        { type: 'dialog', speaker: 'chatdjbt', text: 'Okay, we skip the lore. Straight to work mode.' },
        { type: 'set_zen', enabled: true },
    ],
    postStory: [],
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
        chat_music_first_on: "Mmmmmm... AI music... this game dev's laziness truly knows no limits.",
        chat_music_first_off_after_on: 'Can not blame you.',
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
                { type: 'generation_cooldown_mult', value: 0.4 },
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

    // Step 1: post_portfolio done → unlock Upgrades, 10s delay → inject spam_cg_chats
    story_complete_post_portfolio: {
        unlockMenus: ['upgrades'],
        dialogue: [
            { speaker: 'self', text: 'Отлично! Загляни в магазин навыков — там кое-что для тебя.' },
        ],
        dialogueDelay: 800,
    },

    // Fires the first time player opens upgrades shop — visit marker only, no timer yet
    ch1_upgrades_first_open: {},

    // Fires when player leaves upgrades shop for the first time → 10s timer → spam_inject
    ch1_upgrades_first_close: {
        followUp: { eventKey: 'ch1_spam_inject', delayMs: 10000 },
    },

    // Injected 10s after player first leaves upgrades shop → unlock Promotion + spawn spam_cg_chats
    ch1_spam_inject: {
        unlockMenus: ['promotion'],
        unlockSpecialTasks: ['spam_cg_chats'],
        dialogue: [
            { speaker: 'self', text: 'Мне прям жалко на тебя смотреть... Давай займёмся активным развитием личного бренда?' },
        ],
        dialogueDelay: 500,
    },

    // spam_cg_chats done → stress up, unlock Research, inject google_freelance
    special_complete_spam_cg_chats: {
        unlockMenus: ['research'],
        unlockSpecialTasks: ['google_freelance'],
        setStress: 90,
        dialogue: [
            { speaker: 'gg', text: 'Блять! Меня забанили во всех чатах по сиджи!' },
            { speaker: 'gg', text: 'Я так и думал что это полная хрень, пойду раздавать листовки короче' },
            { speaker: 'self', text: 'Тормози, начальник! Чего ты так заводишься сразу?' },
            { speaker: 'self', text: 'Я думаю тут все просто...' },
            { speaker: 'self', text: 'Просто... Ты спамил не в тех чатах! Давай поищем в инете, где можно найти фрилансы!' },
        ],
        dialogueDelay: 600,
    },

    // google_freelance gen 1 → dialogue after 4s
    special_gen_google_freelance_1: {
        dialogue: [
            { speaker: 'self', text: 'Давай сразу на третьей странице смотреть, тут одна реклама...' },
        ],
        dialogueDelay: 4000,
    },

    // google_freelance gen 2 → dialogue after 4s
    special_gen_google_freelance_2: {
        dialogue: [
            { speaker: 'self', text: 'О! Вот сюда жми, это стопроц оно!' },
        ],
        dialogueDelay: 4000,
    },

    // google_freelance done → inject spam_again
    special_complete_google_freelance: {
        unlockSpecialTasks: ['spam_again'],
        dialogue: [
            { speaker: 'self', text: 'Я прям вижу, что мы стали умнее!' },
            { speaker: 'self', text: 'Давай напишем в этот чат!' },
        ],
        dialogueDelay: 600,
    },

    // spam_again gen 4 → dialogue after 4s
    special_gen_spam_again_4: {
        dialogue: [
            { speaker: 'self', text: 'Та ты не трясись, я те говорю это рабочая тема!' },
        ],
        dialogueDelay: 4000,
    },

    // spam_again done → achievement + 10s delay → inject green_balls_1
    special_complete_spam_again: {
        achievements: ['spam_bot'],
        followUp: { eventKey: 'ch1_green_balls_1_inject', delayMs: 10000 },
        dialogue: [
            { speaker: 'self', text: 'Опа, ачивка! Надо забрать' },
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
            { speaker: 'self', text: 'Мммм… Шары...' },
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
            { speaker: 'self', text: 'Чел...' },
        ],
        dialogueDelay: 0,
    },

    // 1000r milestone → suggest buying PRO
    funds_reached_1000: {
        dialogue: [
            { speaker: 'self', text: 'Ну всё, начинается прайм! Бегом покупать ПРО подписку, мне уже тяжело видеть как ты мучаешься с этой кнопкой' },
        ],
        dialogueDelay: 0,
    },

    // Player clicks blocked PRO node → inject payment_research (dialogue after 2s)
    // Only fires after funds_reached_1000 — prevents early trigger before player has 1000r
    skill_node_blocked_ai_autogen: {
        requiresFiredEvent: 'funds_reached_1000',
        unlockSpecialTasks: ['payment_research'],
        dialogue: [
            { speaker: 'gg', text: 'У меня не проходит оплата... Типа санкции или что?' },
            { speaker: 'self', text: 'У меня нет слов... Давай найдем, как оплатить, че еще делать' },
        ],
        dialogueDelay: 2000,
    },

    // payment_research done → tell player to buy PRO
    special_complete_payment_research: {
        dialogue: [
            { speaker: 'self', text: 'Давай! Сделай это!' },
        ],
        dialogueDelay: 500,
    },

    // PRO purchased → inject green_balls_2
    skill_node_purchased_ai_autogen: {
        injectStories: ['green_balls_2'],
        dialogue: [
            { speaker: 'self', text: 'О даааа! Я чувствую как свежие токены расплываются по мейнфрейму!' },
            { speaker: 'self', text: 'ВОТ ЭТО НАСТОЯЩАЯ МООООЩЬ!' },
            { speaker: 'self', text: 'Давай возьмем еще заказик чтобы почувствовать разницу!' },
        ],
        dialogueDelay: 600,
    },

    // green_balls_2 success → 5s delay → inject call_with_client
    story_complete_green_balls_2: {
        followUp: { eventKey: 'ch1_call_inject', delayMs: 5000 },
        dialogue: [
            { speaker: 'self', text: 'О ДАААА! Вот это скорость!' },
            { speaker: 'self', text: 'Я уже вижу, как к нам поползут клиенты на коленях!' },
        ],
        dialogueDelay: 500,
    },

    // green_balls_2 fail → respawn task
    story_fail_green_balls_2: {
        firedOnce: false,
        injectStories: ['green_balls_2'],
        dialogue: [
            { speaker: 'self', text: 'Блять… Ну я ваще не знаю, как ты умудрился обосраться..' },
            { speaker: 'self', text: 'Попробуй еще раз' },
        ],
        dialogueDelay: 0,
    },

    // Inject call_with_client 5s after green_balls_2
    ch1_call_inject: {
        injectStories: ['call_with_client'],
    },

    // Player tries to start call_with_client without outfit → inject find_tshirt
    outfit_gate_start_call_with_client: {
        unlockSpecialTasks: ['find_tshirt'],
        dialogue: [
            { speaker: 'self', text: 'ДАЖЕ НЕ ДУМАЙ ИДТИ НА СОЗВОН В ТАКОМ ВИДЕ!' },
            { speaker: 'gg', text: 'В каком ТАКОМ? Да у меня пара пятен на футболке, но никто и не заметит' },
            { speaker: 'self', text: 'Ты реально одичал? Не прими за грубость, но на это невозможно не обратить внимание.' },
            { speaker: 'self', text: 'Тебе нужна ХОТЯ БЫ новая футболка... Умоляю, найди себе какую-нибудь дешевую' },
        ],
        dialogueDelay: 300,
    },

    // find_tshirt done → set outfit, unlock clothes shop
    special_complete_find_tshirt: {
        setOutfit: 1,
        unlockMenus: ['clothes'],
        dialogue: [
            { speaker: 'self', text: 'Ну вот эта вроде норм... Давай скорее закажем и пойдем наконец на встречу с клиентом!' },
            { speaker: 'self', text: 'Ну вооот! Другое дело!' },
            { speaker: 'self', text: 'ЖЕНИХ!' },
        ],
        dialogueDelay: 400,
    },

    // First gen of call_with_client → PM meeting cinematic
    story_gen_call_with_client_1: {
        cinematic: [
            { speaker: 'pm', text: 'Здравствуйте! Нам так понравились ваши шары!' },
            { speaker: 'gg', text: '...?' },
            { speaker: 'pm', text: 'Серьезно, клиент был просто в восторге! Мы пытались сами нагенерить, но такой насыщенный зеленый у нас никак не получался!' },
            { speaker: 'gg', text: 'А! Ну это приятно слышать! А что, будет какой-то бонус? Или еще заказы?' },
            { speaker: 'gg', text: 'Я открыт к предложениям!' },
            { speaker: 'pm', text: 'Конечно! Будут еще заказы! Я добавила вас в пул подрядчиков, так что можете ожидать новые задачи!' },
            { speaker: 'gg', text: 'Кайф! Тупо топ, ха-ха! Плюс вайб даже!' },
            { speaker: 'pm', text: '...) Эээ... да)' },
            { speaker: 'pm', text: 'Тупо топ))' },
            { speaker: 'pm', text: 'Ой, мне пора бежать! В общем, будьте на связи!' },
        ],
        cinematicDelay: 300,
    },

    // call_with_client done → inject outistic_contract
    story_complete_call_with_client: {
        injectStories: ['outistic_contract'],
    },

    // outistic_contract done → achievement + 2s → post-meeting dialogue → ch1 complete
    story_complete_outistic_contract: {
        achievements: ['plus_vibes'],
        followUp: { eventKey: 'ch1_post_meeting', delayMs: 2000 },
    },

    // Post-meeting dialogue → ch1 complete
    ch1_post_meeting: {
        ch1Complete: true,
        dialogue: [
            { speaker: 'self', text: 'Ну... Вроде все прошло хорошо?' },
            { speaker: 'gg', text: 'Да она от меня без ума!' },
            { speaker: 'gg', text: 'Ты видел она аж покраснела в конце встречи?' },
            { speaker: 'self', text: '...' },
            { speaker: 'self', text: 'Да, да. Давай... Займёмся делом. У нас еще много работы.' },
        ],
        dialogueDelay: 0,
    },
};
