const Game = {
    config: {
        STATUS: {
            REST: 'rest',
            WORK: 'work',
            SMOKE: 'smoke',
        },
        SAVE_KEY: 'mid_designer_save',
        FOREST_SAVE_KEY: 'mid_designer_forest_progress',
        LANGUAGE_SAVE_KEY: 'mid_designer_lang',
        SAVE_VERSION: 1,
        BASE_JOB_CHANCE: 0,
        DEFAULT_PRESTIGE_TRANSFER_RATIO: 0.1,
        TASK_CATEGORIES: {
            ORDERS: 'orders',
            STORY: 'story',
            RESEARCH: 'research',
            PROMOTION: 'promotion',
        },
        JOB_SEARCH_MIN_MS: 100,
        JOB_SEARCH_SPAN_MS: 9900,
        JOB_SEARCH_K1_LEVEL: 25,
        JOB_SEARCH_K2_PRESTIGE: 40,
        JOB_SEARCH_K3_UPGRADE: 2,
        DEFAULT_UNLOCKED_TASK_TYPES: ['luck'],
        SHOP_CLOTHES: [
            {
                id: 'tshirt_basic',
                title: 'Свежая футболка',
                price: 800,
                outfitIndex: 1,
                iconUrl: 'images/icons/job/icon-job-story.png',
                description: 'Выглядишь как человек.',
            },
        ],
        ORDER_LIFETIME_TICK_MS: 200,
        ZEN_TICK_MS: 1000,
        SMOKE_DURATION_MS: 8000,
        EXPONENT_GROWTH: 1.12,
        PAYOUT_SCALE: 26,
        STRESS_MAX: 100,
        STRESS_PER_GENERATION: 10,
        ZEN_DECAY_MIN: 1,
        ZEN_DECAY_MAX: 3,
        CIGARETTE_RELIEF_MIN: 30,
        CIGARETTE_RELIEF_MAX: 50,
        AUTOGEN_TICK_MS: 5000,
        AUTOGEN_TICK_COST: 0,
        AUTOGEN_NO_CIGS_ADD_MS: 1000,
        AUTOGEN_NO_CIGS_MULT: 5,
        BASE_GENERATION_COOLDOWN_MS: 5000,
        ENERGIZER_COOLDOWN_MULT: 0.65,
        SHOP_CATEGORIES: {
            UPGRADES: 'upgrades',
            GOODS: 'goods',
            PROPERTY: 'property',
            CLOTHES: 'clothes',
        },
        SHOP_GOODS: [
            {
                id: 'cigs',
                title: 'Cigarettes',
                price: 120,
                iconUrl: 'images/icons/icon-good-cigs.png',
                description: '+25 cigarettes per pack.',
            },
            {
                id: 'energ',
                title: 'Energy Drink',
                price: 180,
                iconUrl: 'images/icons/icon-good-energ.png',
                description: 'Faster generation, x1.5 stress gain.',
            },
            {
                id: 'borj',
                title: 'Mineral Water',
                price: 90,
                iconUrl: 'images/icons/icon-good-borj.png',
                description: 'Clears Energizer effects.',
            },
            {
                id: 'meds',
                title: 'Vitamins',
                price: 220,
                iconUrl: 'images/icons/icon-good-meds.png',
                description: 'Clear Energizer + x2 stress recovery.',
            },
        ],
        CIGARETTES_PER_PACK: 25,
        MUSIC_DEFAULT_VOLUME: 0.2,
        MUSIC_CROSSFADE_SEC: 2.4,
        MUSIC_PLAYLIST: [
            'Cathedral of Broken Circuits.mp3',
            'Cathedral of Broken Circuits (1).mp3',
        ],
        STORY_ORDERS: [
            {
                id: 'post_portfolio',
                title: 'Опубликовать портфолио',
                taskType: 'story',
                taskCategory: 'story',
                priority: 100,
                generateActionLabel: 'Публиковать',
                durationSec: 65,
                generations: 5,
                requiredGenerations: 5,
                basePayout: 0,
                realPayout: 0,
                xpReward: 10,
                noFailPenalty: true,
                iconUrl: 'images/icons/job/icon-job-story.png',
                unlockTaskTypes: ['art', 'food', 'bot'],
                chanceBonus: 0.01,
                prestigeTransferRatio: 0.12,
                requiredLevel: 1,
            },
            {
                id: 'green_balls_1',
                title: 'Сгенеровать зеленые шары',
                taskType: 'balls',
                taskCategory: 'story',
                priority: 95,
                ch1Only: true,
                generateActionLabel: 'Работать',
                durationSec: 60,
                generations: 5,
                requiredGenerations: 5,
                basePayout: 800,
                realPayout: 800,
                xpReward: 10,
                noFailPenalty: true,
                iconUrl: 'images/icons/job/icon-job-story.png',
            },
            {
                id: 'green_balls_2',
                title: 'Клиент снова пишет про шарики',
                taskType: 'balls',
                taskCategory: 'story',
                priority: 95,
                ch1Only: true,
                generateActionLabel: 'Работать',
                durationSec: 60,
                generations: 5,
                requiredGenerations: 5,
                basePayout: 800,
                realPayout: 800,
                xpReward: 10,
                noFailPenalty: true,
                iconUrl: 'images/icons/job/icon-job-story.png',
            },
            {
                id: 'call_with_client',
                title: 'Звонок с OutisticDigital',
                taskType: 'call',
                taskCategory: 'story',
                priority: 95,
                ch1Only: true,
                generateActionLabel: 'Говорить',
                durationSec: 0,
                generations: 1,
                requiredGenerations: 1,
                basePayout: 0,
                realPayout: 0,
                xpReward: 0,
                noFailPenalty: true,
                iconUrl: 'images/icons/job/icon-job-story.png',
            },
            {
                id: 'outistic_contract',
                title: 'Подписать контракт с OutisticDigital',
                taskType: 'contract',
                taskCategory: 'story',
                priority: 95,
                ch1Only: true,
                generateActionLabel: 'Подписать',
                durationSec: 30,
                generations: 1,
                requiredGenerations: 1,
                basePayout: 0,
                realPayout: 0,
                xpReward: 0,
                noFailPenalty: true,
                iconUrl: 'images/icons/job/icon-job-story.png',
                unlockTaskTypes: ['out'],
            },
            {
                id: 'night_contacts',
                title: 'Предложить ночным клиентам',
                taskType: 'story',
                taskCategory: 'story',
                priority: 90,
                generateActionLabel: 'Предлагать',
                durationSec: 85,
                generations: 6,
                requiredGenerations: 6,
                basePayout: 140,
                realPayout: 220,
                iconUrl: 'images/icons/job/icon-job-story.png',
                unlockTaskTypes: ['casino', 'crypto', 'hh', 'bb'],
                chanceBonus: 0.015,
                prestigeTransferRatio: 0.14,
                requiredLevel: 3,
                requiredKnownness: 1,
                prerequisiteStoryId: 'outistic_contract',
            },
            {
                id: 'big_league_brief',
                title: 'Взять крупный агентский бриф',
                taskType: 'story',
                taskCategory: 'story',
                priority: 80,
                generateActionLabel: 'Создавать',
                durationSec: 105,
                generations: 8,
                requiredGenerations: 8,
                basePayout: 260,
                realPayout: 430,
                iconUrl: 'images/icons/job/icon-job-story.png',
                unlockTaskTypes: ['sb', 'medic', 'alph', 'fsb', 'msc', 'gov', 'gas', 'dark', 'crime', 'vfx', 'luck'],
                chanceBonus: 0.02,
                prestigeTransferRatio: 0.18,
                requiredLevel: 5,
                requiredPrestige: 2,
                requiredKnownness: 2,
                prerequisiteStoryId: 'night_contacts',
            },
        ],
        RESEARCH_TASKS: [
            {
                id: 'google_freelance',
                title: 'Загуглить..?',
                taskCategory: 'research',
                taskType: 'research',
                priority: 100,
                generateActionLabel: 'GOOGLE',
                durationSec: 30,
                requiredGenerations: 3,
                realPayout: 0,
                xpReward: 20,
                iconUrl: 'images/icons/job/icon-job-research.png',
                skillPointsReward: 1,
                maxCompletions: 1,
                hidden: true,
            },
            {
                id: 'payment_research',
                title: 'Разобраться с оплатой сервисов',
                taskCategory: 'research',
                taskType: 'research',
                priority: 90,
                generateActionLabel: 'Изучить',
                durationSec: 40,
                requiredGenerations: 3,
                realPayout: 0,
                xpReward: 0,
                iconUrl: 'images/icons/job/icon-job-research.png',
                skillPointsReward: 0,
                maxCompletions: 1,
                hidden: true,
            },
            {
                id: 'find_tshirt',
                title: 'Найти футболку',
                taskCategory: 'research',
                taskType: 'research',
                priority: 85,
                generateActionLabel: 'Искать',
                durationSec: 25,
                requiredGenerations: 1,
                realPayout: 0,
                xpReward: 10,
                iconUrl: 'images/icons/job/icon-job-research.png',
                skillPointsReward: 0,
                maxCompletions: 1,
                hidden: true,
            },
            {
                id: 'market_scan',
                title: 'Сканировать рынок тёплых лидов',
                taskCategory: 'research',
                taskType: 'research',
                priority: 80,
                generateActionLabel: 'Исследовать',
                durationSec: 35,
                requiredGenerations: 3,
                realPayout: -70,
                iconUrl: 'images/icons/job/icon-job-research.png',
                chanceBonus: 0.01,
                skillPointsReward: 2,
                maxCompletions: 4,
                hidden: true,
            },
            {
                id: 'trend_probe',
                title: 'Анализировать тренды по нише',
                taskCategory: 'research',
                taskType: 'research',
                priority: 70,
                generateActionLabel: 'Изучить',
                durationSec: 45,
                requiredGenerations: 4,
                realPayout: -100,
                iconUrl: 'images/icons/job/icon-job-research.png',
                lockedCondition: { type: 'level', value: 2 },
                chanceBonus: 0.012,
                skillPointsReward: 3,
                maxCompletions: 3,
                hidden: true,
            },
        ],
        PROMOTION_TASKS: [
            {
                id: 'spam_cg_chats',
                title: 'Спамить в CG чатах',
                taskCategory: 'promotion',
                taskType: 'spam',
                priority: 100,
                generateActionLabel: 'SPAM',
                durationSec: 50,
                requiredGenerations: 5,
                realPayout: 0,
                xpReward: 15,
                iconUrl: 'images/icons/job/icon-job-promo.png',
                skillPointsReward: 0,
                maxCompletions: 1,
                hidden: true,
            },
            {
                id: 'spam_again',
                title: 'Ещё поспамить',
                taskCategory: 'promotion',
                taskType: 'spam',
                priority: 90,
                generateActionLabel: 'SPAM',
                durationSec: 45,
                requiredGenerations: 5,
                realPayout: 0,
                xpReward: 15,
                iconUrl: 'images/icons/job/icon-job-promo.png',
                chanceBonus: 0.008,
                skillPointsReward: 0,
                maxCompletions: 1,
                hidden: true,
            },
            {
                id: 'showreel_push',
                title: 'Запустить продвижение шоурила',
                taskCategory: 'promotion',
                taskType: 'promotion',
                priority: 80,
                generateActionLabel: 'Продвигать',
                durationSec: 42,
                requiredGenerations: 4,
                realPayout: 95,
                iconUrl: 'images/icons/job/icon-job-promo.png',
                prestigePoolBonus: 10,
                hidden: true,
            },
            {
                id: 'agency_pitch',
                title: 'Предложить агентской сети контакты',
                taskCategory: 'promotion',
                taskType: 'promotion',
                priority: 60,
                generateActionLabel: 'Найти',
                durationSec: 54,
                requiredGenerations: 5,
                realPayout: 140,
                iconUrl: 'images/icons/job/icon-job-promo.png',
                lockedCondition: { type: 'upgrade', value: 'headhunter' },
                prestigePoolBonus: 18,
                hidden: true,
            },
        ],
        UPGRADES: [
            {
                id: 'autogen',
                title: 'Autogenerator',
                category: 'automation',
                requiredLevel: 1,
                price: 100,
                description: 'Performs 1 generation every 5 seconds during an active task, even during a smoke break.',
                effectLabel: '+1 generation every 5s',
            },
            {
                id: 'headhunter',
                title: 'Networking Boost',
                category: 'growth',
                requiredLevel: 2,
                price: 220,
                description: 'Raises search visibility by +1 (x), which speeds up incoming orders.',
                effectLabel: '+1 search visibility',
            },
            {
                id: 'brandmentor',
                title: 'Brand Mentor',
                category: 'prestige',
                requiredLevel: 3,
                price: 300,
                description: 'Improves prestige transfer from pool by +5%.',
                effectLabel: '+5% pool transfer',
            },
        ],
    },

    state: {
        currentStatus: 'rest',
        funds: 100,
        orders: [],
        selectedOrderId: null,
        activeOrder: null,
        templateDeck: [],
        spawnTimeoutId: null,
        orderLifetimeIntervalId: null,
        zenIntervalId: null,
        autogenIntervalId: null,
        job_chance: 0,
        storyChanceBonus: 0,
        skillPoints: 0,
        cigaretteButts: 0,
        expertPoints: 0,
        claimedAchievements: {},
        hasNewOrders: false,
        ordersMenuView: 'hub',
        ordersMenuTab: 'orders',
        shopMenuView: 'hub',
        shopMenuTab: 'goods',
        shopPausedByFullscreenMenu: false,
        level: 1,
        prestige: 0,
        virtualPrestigePool: 0,
        prestigeTransferRatioBonus: 0,
        knownness: 0,
        jobSearchUpgrade: 0,
        currentJobSearchIntervalMs: 0,
        xp: 0,
        xpToNext: 100,
        generationCooldownMs: 5000,
        generationStressMultiplier: 1,
        zenDecayMultiplier: 1,
        generationCooldownUntil: 0,
        stress: 0,
        smokeUntil: 0,
        smokeReliefRemaining: 0,
        smokeReliefPerMs: 0,
        smokeReliefLastTickAt: 0,
        smokeBreakCount: 0,
        nicotineWithdrawal: false,
        currentOutfit: 0,
        chapter1Completed: false,
        unlockedMenus: {
            upgrades: false,
            research: false,
            promotion: false,
            goods: false,
            clothes: false,
            property: false,
        },
        unlockedSpecialTasks: {},
        ch1FiredEvents: {},
        ch2FirstOrderCommentShown: false,
        zenEnabled: true,
        upgrades: {
            autogen: false,
            headhunter: false,
            brandmentor: false,
        },
        goods: {
            cigarettes: 25,
            cigsAutoBuy: false,
            energizerActive: false,
            vitaminsActive: false,
        },
        autogenEnabled: false,
        audio: {
            sfxEnabled: true,
            musicEnabled: false,
        },
        introStarted: false,
        introCompleted: false,
        tutorialMode: false,
        tutorialCompleted: false,
        tutorialSkipped: false,
        characterRevealed: false,
        tutorialUi: {
            orders_btn: false,
            funds_btn: false,
            menu_btn: false,
            level_panel: false,
            stress_panel: false,
            generate_btn: false,
            autogen_toggle: false,
            task_timer: false,
        },
        menuTutorialSeen: {
            hub: false,
            orders: false,
            story: false,
            research: false,
            promotion: false,
        },
        characterCommentMode: false,
        characterCommentOverlayForced: false,
        characterCommentOnClose: null,
        dialogActive: false,
        gamePausedByDialog: false,
        savedJobChanceBeforeTutorial: null,
        pausedOrderRemainingMs: 0,
        pausedSmokeRemainingMs: 0,
        pausedCooldownRemainingMs: 0,
        forcedStoryOrderId: null,
        pendingStoryOutro: false,
        completedStoryOrderIds: [],
        unlockedTaskTypes: ['luck'],
        tutorialWait: {
            waiting: false,
            type: null,
            menuOpened: false,
        },
        researchTaskCompletions: {},
        skillTree: {
            purchased: {},
            forestUnlockedPermanently: false,
            viewport: {
                zoom: 1,
                panX: 0,
                panY: 0,
            },
        },
        skillTreeEffects: {
            cigsPerPackBonus: 0,
            smokeReliefBonus: 0,
            generationStressMultiplierBonus: 1,
            generationCooldownMultiplierBonus: 1,
            zenDecayMultiplierBonus: 1,
            forestKnownnessBonus: 0,
        },
        stats: {
            completedOrders: 0,
            failedOrders: 0,
            totalMoneyEarned: 0,
            totalMoneySpent: 0,
            totalSmokeBreaks: 0,
            stressRelievedByCigarettes: 0,
            totalCigaretteButtsEarned: 0,
            totalCigaretteButtsSpent: 0,
            manualGenerations: 0,
            autogenGenerations: 0,
        },
        shownCharacterComments: {}, // { commentId: true } - отслеживает показанные реплики
        debugInstantGen: false,
        language: 'ru',
    },

    elems: {
        container: null,
        ordersBtn: null,
        fundsBtn: null,
        generateBtn: null,
        characterSprite: null,
        levelPanel: null,
        stressPanel: null,
        ordersMenu: null,
        shopMenu: null,
        statsMenu: null,
        mainMenuOverlay: null,
        achievementsMenu: null,
        menuBtn: null,
        closeButtons: null,
        startWorkBtn: null,
        ordersBackBtn: null,
        bittrickHubView: null,
        bittrickCategoryView: null,
        bittrickCategoryTitle: null,
        bittrickHubButtons: null,
        ordersList: null,
        ordersAlert: null,
        ordersValue: null,
        fundsValue: null,
        levelLabel: null,
        levelFill: null,
        stressLabel: null,
        stressFill: null,
        taskTimerPanel: null,
        taskTimerFill: null,
        currentTaskLabel: null,
        shopHubView: null,
        shopCategoryView: null,
        shopCategoryTitle: null,
        shopHubButtons: null,
        shopCategoryList: null,
        shopBackBtn: null,
        achievementsList: null,
        autogenTogglePanel: null,
        autogenToggle: null,
        autogenToggleLabel: null,
        sfxToggle: null,
        sfxIcon: null,
        musicToggle: null,
        musicIcon: null,
        achievementsOpenBtn: null,
        statsOpenBtn: null,
        statsPanel: null,
        resetProgressBtn: null,
        resetConfirm: null,
        confirmResetBtn: null,
        cancelResetBtn: null,
        debugFullResetBtn: null,
        debugInstantGenBtn: null,
        langBtnEn: null,
        langBtnRu: null,
        statsBackBtn: null,
        achievementsBackBtn: null,
        categoryCounters: null,
        shopCounters: null,
        shopDebugIntroBtn: null,
        cinematicOverlay: null,
        cinematicBlack: null,
        cinematicFlash: null,
        cinematicSplit: null,
        cinematicSkipBtn: null,
        phoneHand: null,
        thoughtBox: null,
        thoughtText: null,
        thoughtNextBtn: null,
        vnDialog: null,
        vnSpeakerIcon: null,
        vnSpeakerName: null,
        vnText: null,
        vnNextBtn: null,
        tutorialChoice: null,
        tutorialContinueBtn: null,
        tutorialSkipBtn: null,
        spotlightRing: null,
    },

    persist: {
        load() {
            let parsed;
            try {
                const raw = localStorage.getItem(Game.config.SAVE_KEY);
                if (!raw) return;
                parsed = JSON.parse(raw);
            } catch (error) {
                return;
            }

            if (!parsed || parsed.v !== Game.config.SAVE_VERSION) return;
            const safeNumber = (value, fallback) => (Number.isFinite(Number(value)) ? Number(value) : fallback);
            const safeBool = (value, fallback) => (typeof value === 'boolean' ? value : fallback);

            Game.state.funds = Math.round(safeNumber(parsed.funds, Game.state.funds));
            Game.state.level = Math.max(1, Math.round(safeNumber(parsed.level, Game.state.level)));
            Game.state.prestige = Math.max(0, Math.round(safeNumber(parsed.prestige, Game.state.prestige)));
            Game.state.virtualPrestigePool = Math.max(0, Math.round(safeNumber(parsed.virtualPrestigePool, Game.state.virtualPrestigePool)));
            Game.state.prestigeTransferRatioBonus = Math.max(0, safeNumber(parsed.prestigeTransferRatioBonus, Game.state.prestigeTransferRatioBonus));
            Game.state.knownness = Math.max(0, Math.round(safeNumber(parsed.knownness, Game.state.knownness)));
            Game.state.jobSearchUpgrade = Math.max(0, Math.round(safeNumber(parsed.jobSearchUpgrade, Game.state.jobSearchUpgrade)));
            Game.state.xp = Math.max(0, safeNumber(parsed.xp, Game.state.xp));
            Game.state.xpToNext = Math.max(1, Math.round(safeNumber(parsed.xpToNext, Game.state.xpToNext)));
            Game.state.stress = Game.actions.clamp(safeNumber(parsed.stress, Game.state.stress), 0, Game.config.STRESS_MAX);
            Game.state.smokeBreakCount = Math.max(0, Math.round(safeNumber(parsed.smokeBreakCount, Game.state.smokeBreakCount)));
            Game.state.nicotineWithdrawal = safeBool(parsed.nicotineWithdrawal, false);
            Game.state.currentOutfit = Math.max(0, Math.round(safeNumber(parsed.currentOutfit, 0)));
            Game.state.chapter1Completed = safeBool(parsed.chapter1Completed, false);
            const unlockedMenus = parsed.unlockedMenus;
            if (unlockedMenus && typeof unlockedMenus === 'object') {
                Object.keys(Game.state.unlockedMenus).forEach((k) => {
                    Game.state.unlockedMenus[k] = safeBool(unlockedMenus[k], false);
                });
            }
            if (Game.state.chapter1Completed) {
                Game.actions.startForcedOutSpawn();
            }
            const unlockedSpecialTasks = parsed.unlockedSpecialTasks;
            if (unlockedSpecialTasks && typeof unlockedSpecialTasks === 'object') {
                Game.state.unlockedSpecialTasks = { ...unlockedSpecialTasks };
            }
            const ch1FiredEvents = parsed.ch1FiredEvents;
            if (ch1FiredEvents && typeof ch1FiredEvents === 'object') {
                Game.state.ch1FiredEvents = { ...ch1FiredEvents };
            }
            Game.state.autogenEnabled = safeBool(parsed.autogenEnabled, Game.state.autogenEnabled);
            Game.state.storyChanceBonus = Math.max(0, safeNumber(parsed.storyChanceBonus, Game.state.storyChanceBonus));
            Game.state.skillPoints = Math.max(0, Math.round(safeNumber(parsed.skillPoints, Game.state.skillPoints)));
            Game.state.cigaretteButts = Math.max(0, Math.round(safeNumber(parsed.cigaretteButts, Game.state.cigaretteButts)));
            Game.state.expertPoints = Math.max(0, Math.round(safeNumber(parsed.expertPoints, Game.state.expertPoints)));

            const upgrades = parsed.upgrades;
            if (upgrades && typeof upgrades === 'object') {
                Game.state.upgrades.autogen = safeBool(upgrades.autogen, Game.state.upgrades.autogen);
                Game.state.upgrades.headhunter = safeBool(upgrades.headhunter, Game.state.upgrades.headhunter);
                Game.state.upgrades.brandmentor = safeBool(upgrades.brandmentor, Game.state.upgrades.brandmentor);
            }

            const unlockedTypes = Array.isArray(parsed.unlockedTaskTypes) ? parsed.unlockedTaskTypes : null;
            if (unlockedTypes) {
                const normalized = unlockedTypes
                    .map((item) => String(item || '').trim())
                    .filter((item) => item.length > 0);
                if (normalized.length) {
                    Game.state.unlockedTaskTypes = Array.from(new Set(normalized));
                }
            }

            const completedStories = Array.isArray(parsed.completedStoryOrderIds) ? parsed.completedStoryOrderIds : null;
            if (completedStories) {
                Game.state.completedStoryOrderIds = Array.from(new Set(completedStories.map((item) => String(item || '').trim()).filter(Boolean)));
            }

            const audio = parsed.audio;
            if (audio && typeof audio === 'object') {
                Game.state.audio.sfxEnabled = safeBool(audio.sfxEnabled, Game.state.audio.sfxEnabled);
                Game.state.audio.musicEnabled = safeBool(audio.musicEnabled, Game.state.audio.musicEnabled);
            }

            const goods = parsed.goods;
            if (goods && typeof goods === 'object') {
                Game.state.goods.cigarettes = Math.max(0, Math.round(safeNumber(goods.cigarettes, Game.state.goods.cigarettes)));
                Game.state.goods.cigsAutoBuy = safeBool(goods.cigsAutoBuy, Game.state.goods.cigsAutoBuy);
                Game.state.goods.energizerActive = safeBool(goods.energizerActive, Game.state.goods.energizerActive);
                Game.state.goods.vitaminsActive = safeBool(goods.vitaminsActive, Game.state.goods.vitaminsActive);
            }

            const shop = parsed.shop;
            if (shop && typeof shop === 'object') {
                const safeTab = String(shop.tab || '').trim();
                Game.state.shopMenuTab = safeTab || Game.state.shopMenuTab;
            }

            const researchTaskCompletions = parsed.researchTaskCompletions;
            if (researchTaskCompletions && typeof researchTaskCompletions === 'object') {
                Game.state.researchTaskCompletions = { ...researchTaskCompletions };
            }

            const skillTree = parsed.skillTree;
            if (skillTree && typeof skillTree === 'object') {
                if (skillTree.purchased && typeof skillTree.purchased === 'object') {
                    Game.state.skillTree.purchased = { ...skillTree.purchased };
                }
                Game.state.skillTree.forestUnlockedPermanently = safeBool(
                    skillTree.forestUnlockedPermanently,
                    Game.state.skillTree.forestUnlockedPermanently,
                );
                if (skillTree.viewport && typeof skillTree.viewport === 'object') {
                    Game.state.skillTree.viewport.zoom = safeNumber(skillTree.viewport.zoom, Game.state.skillTree.viewport.zoom);
                    Game.state.skillTree.viewport.panX = safeNumber(skillTree.viewport.panX, Game.state.skillTree.viewport.panX);
                    Game.state.skillTree.viewport.panY = safeNumber(skillTree.viewport.panY, Game.state.skillTree.viewport.panY);
                }
            }

            const skillTreeEffects = parsed.skillTreeEffects;
            if (skillTreeEffects && typeof skillTreeEffects === 'object') {
                Game.state.skillTreeEffects.cigsPerPackBonus = safeNumber(skillTreeEffects.cigsPerPackBonus, Game.state.skillTreeEffects.cigsPerPackBonus);
                Game.state.skillTreeEffects.smokeReliefBonus = safeNumber(skillTreeEffects.smokeReliefBonus, Game.state.skillTreeEffects.smokeReliefBonus);
                Game.state.skillTreeEffects.generationStressMultiplierBonus = safeNumber(skillTreeEffects.generationStressMultiplierBonus, Game.state.skillTreeEffects.generationStressMultiplierBonus);
                Game.state.skillTreeEffects.generationCooldownMultiplierBonus = safeNumber(skillTreeEffects.generationCooldownMultiplierBonus, Game.state.skillTreeEffects.generationCooldownMultiplierBonus);
                Game.state.skillTreeEffects.zenDecayMultiplierBonus = safeNumber(skillTreeEffects.zenDecayMultiplierBonus, Game.state.skillTreeEffects.zenDecayMultiplierBonus);
                Game.state.skillTreeEffects.forestKnownnessBonus = safeNumber(skillTreeEffects.forestKnownnessBonus, Game.state.skillTreeEffects.forestKnownnessBonus);
            }

            const tutorial = parsed.tutorial;
            if (tutorial && typeof tutorial === 'object') {
                Game.state.introCompleted = safeBool(tutorial.introCompleted, Game.state.introCompleted);
                Game.state.tutorialCompleted = safeBool(tutorial.completed, Game.state.tutorialCompleted);
                Game.state.tutorialSkipped = safeBool(tutorial.skipped, Game.state.tutorialSkipped);
                Game.state.characterRevealed = safeBool(tutorial.characterRevealed, Game.state.characterRevealed);

                const menuHints = tutorial.menuHints;
                if (menuHints && typeof menuHints === 'object') {
                    Game.state.menuTutorialSeen.hub = safeBool(menuHints.hub, Game.state.menuTutorialSeen.hub);
                    Game.state.menuTutorialSeen.orders = safeBool(menuHints.orders, Game.state.menuTutorialSeen.orders);
                    Game.state.menuTutorialSeen.story = safeBool(menuHints.story, Game.state.menuTutorialSeen.story);
                    Game.state.menuTutorialSeen.research = safeBool(menuHints.research, Game.state.menuTutorialSeen.research);
                    Game.state.menuTutorialSeen.promotion = safeBool(menuHints.promotion, Game.state.menuTutorialSeen.promotion);
                }
            }

            if (Game.state.tutorialSkipped) {
                Object.keys(Game.state.menuTutorialSeen).forEach((key) => {
                    Game.state.menuTutorialSeen[key] = true;
                });
            }

            const stats = parsed.stats;
            if (stats && typeof stats === 'object') {
                Game.state.stats.completedOrders = Math.max(0, Math.round(safeNumber(stats.completedOrders, Game.state.stats.completedOrders)));
                Game.state.stats.failedOrders = Math.max(0, Math.round(safeNumber(stats.failedOrders, Game.state.stats.failedOrders)));
                Game.state.stats.totalMoneyEarned = Math.max(0, Math.round(safeNumber(stats.totalMoneyEarned, Game.state.stats.totalMoneyEarned)));
                Game.state.stats.totalMoneySpent = Math.max(0, Math.round(safeNumber(stats.totalMoneySpent, Game.state.stats.totalMoneySpent)));
                Game.state.stats.totalSmokeBreaks = Math.max(0, Math.round(safeNumber(stats.totalSmokeBreaks, Game.state.stats.totalSmokeBreaks)));
                Game.state.stats.stressRelievedByCigarettes = Math.max(0, Math.round(safeNumber(stats.stressRelievedByCigarettes, Game.state.stats.stressRelievedByCigarettes)));
                Game.state.stats.totalCigaretteButtsEarned = Math.max(0, Math.round(safeNumber(stats.totalCigaretteButtsEarned, Game.state.stats.totalCigaretteButtsEarned)));
                Game.state.stats.totalCigaretteButtsSpent = Math.max(0, Math.round(safeNumber(stats.totalCigaretteButtsSpent, Game.state.stats.totalCigaretteButtsSpent)));
                Game.state.stats.manualGenerations = Math.max(0, Math.round(safeNumber(stats.manualGenerations, Game.state.stats.manualGenerations)));
                Game.state.stats.autogenGenerations = Math.max(0, Math.round(safeNumber(stats.autogenGenerations, Game.state.stats.autogenGenerations)));
            }

            const comments = parsed.shownCharacterComments;
            if (comments && typeof comments === 'object') {
                Game.state.shownCharacterComments = { ...comments };
            }

            const claimed = parsed.claimedAchievements;
            if (claimed && typeof claimed === 'object') {
                Game.state.claimedAchievements = { ...claimed };
            }

            try {
                const forestRaw = localStorage.getItem(Game.config.FOREST_SAVE_KEY);
                if (forestRaw) {
                    const forestParsed = JSON.parse(forestRaw);
                    if (forestParsed && typeof forestParsed === 'object') {
                        if (forestParsed.purchased && typeof forestParsed.purchased === 'object') {
                            Object.keys(forestParsed.purchased).forEach((nodeId) => {
                                if (forestParsed.purchased[nodeId]) {
                                    Game.state.skillTree.purchased[nodeId] = true;
                                }
                            });
                        }
                        if (typeof forestParsed.forestUnlockedPermanently === 'boolean') {
                            Game.state.skillTree.forestUnlockedPermanently = forestParsed.forestUnlockedPermanently;
                        }
                        if (forestParsed.skillTreeEffects && typeof forestParsed.skillTreeEffects === 'object') {
                            if (Number.isFinite(Number(forestParsed.skillTreeEffects.forestKnownnessBonus))) {
                                Game.state.skillTreeEffects.forestKnownnessBonus = Number(forestParsed.skillTreeEffects.forestKnownnessBonus);
                            }
                        }
                    }
                }
            } catch (error) {
                // Ignore forest branch restore errors.
            }
        },

        save() {
            const payload = {
                v: Game.config.SAVE_VERSION,
                funds: Math.round(Game.state.funds),
                level: Math.round(Game.state.level),
                prestige: Math.round(Game.state.prestige),
                virtualPrestigePool: Math.round(Game.state.virtualPrestigePool),
                prestigeTransferRatioBonus: Number(Game.state.prestigeTransferRatioBonus) || 0,
                knownness: Math.round(Game.state.knownness),
                jobSearchUpgrade: Math.round(Game.state.jobSearchUpgrade),
                xp: Math.round(Game.state.xp),
                xpToNext: Math.round(Game.state.xpToNext),
                stress: Math.round(Game.state.stress),
                smokeBreakCount: Math.round(Game.state.smokeBreakCount),
                nicotineWithdrawal: !!Game.state.nicotineWithdrawal,
                currentOutfit: Math.round(Game.state.currentOutfit || 0),
                chapter1Completed: !!Game.state.chapter1Completed,
                unlockedMenus: { ...Game.state.unlockedMenus },
                unlockedSpecialTasks: { ...Game.state.unlockedSpecialTasks },
                ch1FiredEvents: { ...Game.state.ch1FiredEvents },
                autogenEnabled: !!Game.state.autogenEnabled,
                storyChanceBonus: Number(Game.state.storyChanceBonus) || 0,
                skillPoints: Math.round(Math.max(0, Number(Game.state.skillPoints) || 0)),
                cigaretteButts: Math.round(Math.max(0, Number(Game.state.cigaretteButts) || 0)),
                upgrades: {
                    autogen: !!Game.state.upgrades.autogen,
                    headhunter: !!Game.state.upgrades.headhunter,
                    brandmentor: !!Game.state.upgrades.brandmentor,
                },
                unlockedTaskTypes: Array.isArray(Game.state.unlockedTaskTypes) ? Game.state.unlockedTaskTypes : [],
                completedStoryOrderIds: Array.isArray(Game.state.completedStoryOrderIds) ? Game.state.completedStoryOrderIds : [],
                tutorial: {
                    introCompleted: !!Game.state.introCompleted,
                    completed: !!Game.state.tutorialCompleted,
                    skipped: !!Game.state.tutorialSkipped,
                    characterRevealed: !!Game.state.characterRevealed,
                    menuHints: {
                        hub: !!Game.state.menuTutorialSeen.hub,
                        orders: !!Game.state.menuTutorialSeen.orders,
                        story: !!Game.state.menuTutorialSeen.story,
                        research: !!Game.state.menuTutorialSeen.research,
                        promotion: !!Game.state.menuTutorialSeen.promotion,
                    },
                },
                stats: {
                    completedOrders: Math.round(Game.state.stats.completedOrders),
                    failedOrders: Math.round(Game.state.stats.failedOrders),
                    totalMoneyEarned: Math.round(Game.state.stats.totalMoneyEarned),
                    totalMoneySpent: Math.round(Game.state.stats.totalMoneySpent),
                    totalSmokeBreaks: Math.round(Game.state.stats.totalSmokeBreaks),
                    stressRelievedByCigarettes: Math.round(Game.state.stats.stressRelievedByCigarettes),
                    totalCigaretteButtsEarned: Math.round(Game.state.stats.totalCigaretteButtsEarned),
                    totalCigaretteButtsSpent: Math.round(Game.state.stats.totalCigaretteButtsSpent),
                    manualGenerations: Math.round(Game.state.stats.manualGenerations),
                    autogenGenerations: Math.round(Game.state.stats.autogenGenerations),
                },
                audio: {
                    sfxEnabled: !!Game.state.audio.sfxEnabled,
                    musicEnabled: !!Game.state.audio.musicEnabled,
                },
                goods: {
                    cigarettes: Math.round(Math.max(0, Number(Game.state.goods.cigarettes) || 0)),
                    cigsAutoBuy: !!Game.state.goods.cigsAutoBuy,
                    energizerActive: !!Game.state.goods.energizerActive,
                    vitaminsActive: !!Game.state.goods.vitaminsActive,
                },
                shop: {
                    tab: String(Game.state.shopMenuTab || Game.config.SHOP_CATEGORIES.GOODS),
                },
                researchTaskCompletions: Game.state.researchTaskCompletions,
                skillTree: {
                    purchased: Game.state.skillTree.purchased,
                    forestUnlockedPermanently: !!Game.state.skillTree.forestUnlockedPermanently,
                    viewport: {
                        zoom: Number(Game.state.skillTree.viewport.zoom) || 1,
                        panX: Number(Game.state.skillTree.viewport.panX) || 0,
                        panY: Number(Game.state.skillTree.viewport.panY) || 0,
                    },
                },
                skillTreeEffects: {
                    cigsPerPackBonus: Number(Game.state.skillTreeEffects.cigsPerPackBonus) || 0,
                    smokeReliefBonus: Number(Game.state.skillTreeEffects.smokeReliefBonus) || 0,
                    generationStressMultiplierBonus: Number(Game.state.skillTreeEffects.generationStressMultiplierBonus) || 1,
                    generationCooldownMultiplierBonus: Number(Game.state.skillTreeEffects.generationCooldownMultiplierBonus) || 1,
                    zenDecayMultiplierBonus: Number(Game.state.skillTreeEffects.zenDecayMultiplierBonus) || 1,
                    forestKnownnessBonus: Number(Game.state.skillTreeEffects.forestKnownnessBonus) || 0,
                },
                shownCharacterComments: Game.state.shownCharacterComments,
                claimedAchievements: Game.state.claimedAchievements,
                expertPoints: Math.round(Math.max(0, Number(Game.state.expertPoints) || 0)),
            };

            try {
                localStorage.setItem(Game.config.SAVE_KEY, JSON.stringify(payload));
            } catch (error) {
                // Ignore storage errors to keep runtime stable.
            }
        },

        resetAll() {
            try {
                const forestNodeIds = Game.actions.getForestBranchNodeIds();
                const forestPurchased = {};
                forestNodeIds.forEach((nodeId) => {
                    if (Game.state.skillTree.purchased[nodeId]) {
                        forestPurchased[nodeId] = true;
                    }
                });

                const forestPayload = {
                    purchased: forestPurchased,
                    forestUnlockedPermanently: !!Game.state.skillTree.forestUnlockedPermanently,
                    skillTreeEffects: {
                        forestKnownnessBonus: Number(Game.state.skillTreeEffects.forestKnownnessBonus) || 0,
                    },
                };

                localStorage.setItem(Game.config.FOREST_SAVE_KEY, JSON.stringify(forestPayload));
                localStorage.removeItem(Game.config.SAVE_KEY);
            } catch (error) {
                // Ignore storage errors to keep runtime stable.
            }
            window.location.reload();
        },

        resetDebugAll() {
            try {
                localStorage.removeItem(Game.config.SAVE_KEY);
                localStorage.removeItem(Game.config.FOREST_SAVE_KEY);
            } catch (error) {
                // Ignore storage errors to keep runtime stable.
            }
            window.location.reload();
        },
    },

    audio: {
        _initialized: false,
        _playlist: [],
        _currentTrackIndex: 0,
        _primaryChannel: null,
        _secondaryChannel: null,
        _activeChannel: null,
        _inactiveChannel: null,
        _crossfadeToken: 0,
        _crossfading: false,
        _resumeHandler: null,

        init() {
            if (this._initialized) return;
            const source = Array.isArray(Game.config.MUSIC_PLAYLIST) ? Game.config.MUSIC_PLAYLIST : [];
            this._playlist = source
                .map((item) => String(item || '').trim())
                .filter(Boolean);

            if (!this._playlist.length) {
                this._initialized = true;
                return;
            }

            this._primaryChannel = this.createMusicChannel();
            this._secondaryChannel = this.createMusicChannel();
            this._activeChannel = this._primaryChannel;
            this._inactiveChannel = this._secondaryChannel;
            this._currentTrackIndex = 0;
            this.loadTrack(this._activeChannel, this._currentTrackIndex, 0);
            this._initialized = true;
            this.syncMusicEnabledState();
        },

        createMusicChannel() {
            const audio = new Audio();
            audio.preload = 'auto';
            audio.loop = false;
            audio.volume = 0;
            audio.addEventListener('timeupdate', () => {
                this.tryCrossfadeByTime(audio);
            });
            audio.addEventListener('ended', () => {
                this.forceNextTrack();
            });
            return audio;
        },

        buildTrackUrl(trackName) {
            return `sounds/music/${encodeURIComponent(trackName)}`;
        },

        loadTrack(channel, playlistIndex, startVolume) {
            if (!channel || !this._playlist.length) return;
            const normalizedIndex = ((playlistIndex % this._playlist.length) + this._playlist.length) % this._playlist.length;
            const trackName = this._playlist[normalizedIndex];
            const src = this.buildTrackUrl(trackName);
            if (channel.src !== src) {
                channel.src = src;
            }
            channel.currentTime = 0;
            channel.volume = Math.max(0, Math.min(1, Number(startVolume) || 0));
        },

        getTargetMusicVolume() {
            if (!Game.state.audio.musicEnabled) return 0;
            return Math.max(0, Math.min(1, Number(Game.config.MUSIC_DEFAULT_VOLUME) || 0.2));
        },

        attemptPlay(channel) {
            if (!channel) return;
            const result = channel.play();
            if (result && typeof result.catch === 'function') {
                result.catch(() => {
                    this.bindResumeOnUserGesture();
                });
            }
        },

        bindResumeOnUserGesture() {
            if (this._resumeHandler) return;
            this._resumeHandler = () => {
                this.unbindResumeOnUserGesture();
                if (!Game.state.audio.musicEnabled) return;
                this.syncMusicEnabledState();
            };

            document.addEventListener('pointerdown', this._resumeHandler, { once: true });
            document.addEventListener('keydown', this._resumeHandler, { once: true });
            document.addEventListener('touchstart', this._resumeHandler, { once: true });
        },

        unbindResumeOnUserGesture() {
            if (!this._resumeHandler) return;
            document.removeEventListener('pointerdown', this._resumeHandler);
            document.removeEventListener('keydown', this._resumeHandler);
            document.removeEventListener('touchstart', this._resumeHandler);
            this._resumeHandler = null;
        },

        syncMusicEnabledState() {
            if (!this._initialized || !this._activeChannel) return;
            if (!Game.state.audio.musicEnabled) {
                this.stopMusic();
                return;
            }
            this._activeChannel.volume = this.getTargetMusicVolume();
            this.attemptPlay(this._activeChannel);
        },

        stopMusic() {
            this._crossfading = false;
            this._crossfadeToken += 1;
            [this._primaryChannel, this._secondaryChannel].forEach((channel) => {
                if (!channel) return;
                channel.pause();
                channel.volume = 0;
            });
        },

        getNextTrackIndex() {
            if (!this._playlist.length) return 0;
            return (this._currentTrackIndex + 1) % this._playlist.length;
        },

        tryCrossfadeByTime(channel) {
            if (!Game.state.audio.musicEnabled) return;
            if (this._crossfading) return;
            if (channel !== this._activeChannel) return;
            if (!Number.isFinite(channel.duration) || channel.duration <= 0) return;
            const remaining = channel.duration - channel.currentTime;
            const threshold = Math.max(0.3, Number(Game.config.MUSIC_CROSSFADE_SEC) || 2.4);
            if (remaining <= threshold) {
                this.crossfadeToNextTrack();
            }
        },

        forceNextTrack() {
            if (!Game.state.audio.musicEnabled) return;
            if (this._crossfading) return;
            this.crossfadeToNextTrack();
        },

        crossfadeToNextTrack() {
            if (!this._activeChannel || !this._inactiveChannel || !this._playlist.length) return;
            if (this._crossfading) return;

            this._crossfading = true;
            this._crossfadeToken += 1;
            const token = this._crossfadeToken;
            const from = this._activeChannel;
            const to = this._inactiveChannel;
            const nextIndex = this.getNextTrackIndex();
            const targetVolume = this.getTargetMusicVolume();

            this.loadTrack(to, nextIndex, 0);
            this.attemptPlay(to);

            const fadeMs = Math.max(300, Math.round((Number(Game.config.MUSIC_CROSSFADE_SEC) || 2.4) * 1000));
            const startAt = performance.now();

            const step = (now) => {
                if (token !== this._crossfadeToken) return;
                const t = Math.min(1, (now - startAt) / fadeMs);
                const eased = 1 - Math.pow(1 - t, 3);
                from.volume = targetVolume * (1 - eased);
                to.volume = targetVolume * eased;

                if (t < 1) {
                    requestAnimationFrame(step);
                    return;
                }

                from.pause();
                from.currentTime = 0;
                from.volume = 0;
                to.volume = targetVolume;
                this._activeChannel = to;
                this._inactiveChannel = from;
                this._currentTrackIndex = nextIndex;
                this._crossfading = false;
            };

            requestAnimationFrame(step);
        },

        playSfx(key) {
            if (!Game.state.audio.sfxEnabled) return;
            if (key === 'phone_vibrate') {
                // Placeholder hook for real SFX asset.
                return;
            }
        },
    },

    ui: {
        applyDigitsTypography(root) {
            if (!root) return;

            const walker = document.createTreeWalker(
                root,
                NodeFilter.SHOW_TEXT,
                {
                    acceptNode(node) {
                        const text = node && node.nodeValue ? node.nodeValue : '';
                        if (!/\d/.test(text)) return NodeFilter.FILTER_REJECT;
                        const parent = node.parentElement;
                        if (!parent) return NodeFilter.FILTER_REJECT;
                        if (parent.closest('.digits')) return NodeFilter.FILTER_REJECT;
                        if (parent.tagName === 'SCRIPT' || parent.tagName === 'STYLE') return NodeFilter.FILTER_REJECT;
                        return NodeFilter.FILTER_ACCEPT;
                    },
                },
            );

            const textNodes = [];
            while (walker.nextNode()) {
                textNodes.push(walker.currentNode);
            }

            textNodes.forEach((node) => {
                const value = node.nodeValue;
                if (!value || !/\d/.test(value)) return;

                const parts = value.split(/(\d+)/);
                if (parts.length <= 1) return;

                const fragment = document.createDocumentFragment();
                parts.forEach((part) => {
                    if (!part) return;
                    if (/^\d+$/.test(part)) {
                        const span = document.createElement('span');
                        span.className = 'digits';
                        span.textContent = part;
                        fragment.appendChild(span);
                        return;
                    }
                    fragment.appendChild(document.createTextNode(part));
                });

                if (node.parentNode) {
                    node.parentNode.replaceChild(fragment, node);
                }
            });
        },

        setClass(element, className, add) {
            if (!element) return;
            element.classList.toggle(className, add);
        },

        updateText(element, value) {
            if (!element) return;
            element.textContent = String(value);
            this.applyDigitsTypography(element);
        },

        applyLayoutOverrides() {
            const overrides = window.LAYOUT_OVERRIDES;
            if (!overrides || !overrides.enabled) return;

            if (overrides.cssVariables && typeof overrides.cssVariables === 'object') {
                Object.keys(overrides.cssVariables).forEach((cssVar) => {
                    const value = overrides.cssVariables[cssVar];
                    if (value == null) return;
                    document.documentElement.style.setProperty(cssVar, String(value));
                });
            }

            const elements = overrides.elements;
            if (!elements || typeof elements !== 'object') return;

            Object.keys(elements).forEach((selector) => {
                const styleMap = elements[selector];
                if (!styleMap || typeof styleMap !== 'object') return;

                const nodes = document.querySelectorAll(selector);
                nodes.forEach((node) => {
                    Object.keys(styleMap).forEach((key) => {
                        const value = styleMap[key];
                        if (value == null) return;
                        node.style[key] = String(value);
                    });
                });
            });
        },

        setGenerateBtnVisible(visible) {
            const button = Game.elems.generateBtn;
            if (!button) return;
            this.setClass(button, 'visible', visible);
            this.setClass(button, 'hidden', !visible);
            if (!visible) {
                button.disabled = true;
                button.setAttribute('aria-disabled', 'true');
            }
        },

        setStatus(status) {
            const characterSprite = Game.elems.characterSprite;
            Game.state.currentStatus = status;

            if (!characterSprite) return;
            const outfit = Math.max(0, Math.round(Game.state.currentOutfit || 0));
            const outfitSuffix = outfit > 0 ? `-o${outfit}` : '';
            const sprite = (base) => {
                const withOutfit = base.replace('.png', `${outfitSuffix}.png`);
                return outfitSuffix ? withOutfit : base;
            };
            switch (status) {
                case Game.config.STATUS.REST:
                    characterSprite.src = sprite('images/PixelEgorus/PixE-Idle-1.png');
                    characterSprite.style.width = '';
                    characterSprite.style.left = '';
                    characterSprite.style.bottom = '';
                    break;
                case Game.config.STATUS.WORK:
                    characterSprite.src = sprite('images/PixelEgorus/PixE-Work-1.png');
                    characterSprite.style.width = 'calc(var(--container-width) * 0.57)';
                    characterSprite.style.left = '30%';
                    characterSprite.style.bottom = '18%';
                    break;
                case Game.config.STATUS.SMOKE:
                    characterSprite.src = sprite('images/PixelEgorus/PixE-Smoke-1.png');
                    characterSprite.style.width = 'calc(var(--container-width) * 0.48)';
                    characterSprite.style.left = '68%';
                    characterSprite.style.bottom = '18%';
                    break;
            }

            this.syncCharacterVisibility();
        },

        syncCharacterVisibility() {
            const characterSprite = Game.elems.characterSprite;
            if (!characterSprite) return;

            const shouldHide = Game.state.tutorialMode && !Game.state.characterRevealed;
            characterSprite.classList.toggle('character-hidden', shouldHide);
        },

        getTutorialFeatureElement(feature) {
            const map = {
                orders_btn: Game.elems.ordersBtn,
                funds_btn: Game.elems.fundsBtn,
                menu_btn: Game.elems.menuBtn,
                level_panel: Game.elems.levelPanel,
                stress_panel: Game.elems.stressPanel,
                generate_btn: Game.elems.generateBtn,
                autogen_toggle: Game.elems.autogenTogglePanel,
                task_timer: Game.elems.taskTimerPanel,
            };
            return map[feature] || null;
        },

        applyTutorialUiVisibility() {
            const reveal = Game.state.tutorialUi;
            const isTutorial = Game.state.tutorialMode;

            Object.keys(reveal).forEach((feature) => {
                const element = this.getTutorialFeatureElement(feature);
                if (!element) return;
                const shouldHide = isTutorial && !reveal[feature];
                element.classList.toggle('tutorial-feature-hidden', shouldHide);
            });
        },

        revealTutorialFeature(feature) {
            if (!Object.prototype.hasOwnProperty.call(Game.state.tutorialUi, feature)) return;
            Game.state.tutorialUi[feature] = true;
            this.applyTutorialUiVisibility();
        },

        revealAllTutorialFeatures() {
            Object.keys(Game.state.tutorialUi).forEach((feature) => {
                Game.state.tutorialUi[feature] = true;
            });
            this.applyTutorialUiVisibility();
        },

        triggerEdgeFx(type, durationMs) {
            if (!Game.elems.container) return;
            const className = type === 'green' ? 'edge-fx-green' : 'edge-fx-red';
            Game.elems.container.classList.remove('edge-fx-red', 'edge-fx-green');
            void Game.elems.container.offsetWidth;
            Game.elems.container.classList.add(className);
            window.setTimeout(() => {
                if (!Game.elems.container) return;
                Game.elems.container.classList.remove(className);
            }, Math.max(120, Number(durationMs) || 700));
        },

        updateLevelUi() {
            if (Game.elems.levelLabel) {
                this.updateText(Game.elems.levelLabel, `Lvl ${Game.state.level}`);
            }

            if (Game.elems.levelFill) {
                const ratio = Game.state.xpToNext > 0
                    ? Math.max(0, Math.min(1, Game.state.xp / Game.state.xpToNext))
                    : 0;
                Game.elems.levelFill.style.height = `${Math.round(ratio * 100)}%`;
            }
        },

        updateStressUi() {
            if (Game.elems.stressLabel) {
                this.updateText(Game.elems.stressLabel, `Stress ${Math.round(Game.state.stress)}/${Game.config.STRESS_MAX}`);
            }

            if (Game.elems.stressFill) {
                const ratio = Math.max(0, Math.min(1, Game.state.stress / Game.config.STRESS_MAX));
                Game.elems.stressFill.style.height = `${Math.round(ratio * 100)}%`;
            }
        },

        updateTaskTimerUi() {
            const panel = Game.elems.taskTimerPanel;
            const fill = Game.elems.taskTimerFill;
            const taskLabel = Game.elems.currentTaskLabel;
            const active = Game.state.activeOrder;

            if (!panel || !fill || !active) {
                this.setClass(panel, 'visible', false);
                this.setClass(panel, 'critical', false);
                this.setClass(taskLabel, 'visible', false);
                this.updateText(taskLabel, '');
                if (fill) {
                    fill.style.width = '100%';
                    fill.style.backgroundColor = 'hsl(120, 85%, 48%)';
                }
                return;
            }

            this.updateText(taskLabel, `Current task: ${active.title || 'Unknown'}`);
            this.setClass(taskLabel, 'visible', true);

            if (active.isStory || active.hasExecutionTimer === false) {
                this.setClass(panel, 'visible', false);
                this.setClass(panel, 'critical', false);
                fill.style.width = '100%';
                fill.style.backgroundColor = 'hsl(120, 85%, 48%)';
                return;
            }

            const now = Date.now();
            const total = Math.max(1, active.durationMs);
            const remain = Math.max(0, active.deadlineAt - now);
            const ratio = Math.max(0, Math.min(1, remain / total));
            const hue = Math.round(120 * ratio);

            fill.style.width = `${Math.round(ratio * 100)}%`;
            fill.style.backgroundColor = `hsl(${hue}, 85%, 48%)`;

            this.setClass(panel, 'visible', true);
            this.setClass(panel, 'critical', ratio <= 0.1);
        },

        setOrdersAlertVisible(visible) {
            if (!Game.elems.ordersAlert) return;
            this.setClass(Game.elems.ordersAlert, 'visible', visible);
        },

        renderGenerateButtonContent(button, actionText, progressText = '') {
            if (!button) return;
            const action = String(actionText || '').trim() || 'GENERATE';
            const progress = String(progressText || '').trim();
            button.innerHTML = `
                <span class="generate-btn-content">
                    <span class="generate-btn-action">${action}</span>
                    <span class="generate-btn-progress" ${progress ? '' : 'hidden'}>${progress}</span>
                </span>
            `;
            this.applyDigitsTypography(button);
        },

        refreshGenerateButton() {
            const button = Game.elems.generateBtn;
            if (!button) return;

            const smoking = Game.actions.isSmokingNow();
            const hasActiveOrder = !!Game.state.activeOrder;
            const now = Date.now();
            const isCooldown = Game.state.generationCooldownUntil > now;
            const isBlocked = smoking || isCooldown || Game.state.gamePausedByDialog;
            const shouldShow = smoking
                || hasActiveOrder
                || Game.state.currentStatus === Game.config.STATUS.WORK
                || Game.state.currentStatus === Game.config.STATUS.SMOKE;

            this.setGenerateBtnVisible(shouldShow);

            if (!shouldShow) {
                button.style.setProperty('--smoke-progress', '0');
                button.style.setProperty('--cooldown-progress', '0');
                this.setClass(button, 'smoking', false);
                this.setClass(button, 'cooldown-active', false);
                this.setClass(button, 'blocked', false);
                button.disabled = true;
                button.setAttribute('aria-disabled', 'true');
                this.renderGenerateButtonContent(button, 'GENERATE');
                return;
            }

            if (smoking) {
                const remaining = Math.max(0, Game.state.smokeUntil - now);
                const progress = 1 - remaining / Game.config.SMOKE_DURATION_MS;
                button.style.setProperty('--smoke-progress', String(Math.max(0, Math.min(1, progress))));
                button.style.setProperty('--cooldown-progress', '0');
                this.setClass(button, 'smoking', true);
                this.setClass(button, 'cooldown-active', false);
                this.setClass(button, 'blocked', true);
                button.disabled = true;
                button.setAttribute('aria-disabled', 'true');
                this.renderGenerateButtonContent(button, 'SMOKE BREAK...');
                return;
            }

            this.setClass(button, 'smoking', false);
            button.style.setProperty('--smoke-progress', '0');

            let cooldownProgress = 1;
            if (isCooldown) {
                const remaining = Game.state.generationCooldownUntil - now;
                cooldownProgress = 1 - remaining / Game.state.generationCooldownMs;
                this.setClass(button, 'cooldown-active', true);
            } else {
                this.setClass(button, 'cooldown-active', false);
            }

            this.setClass(button, 'blocked', isBlocked);
            button.disabled = isBlocked;
            button.setAttribute('aria-disabled', isBlocked ? 'true' : 'false');
            button.style.setProperty('--cooldown-progress', String(Math.max(0, Math.min(1, cooldownProgress))));

            const active = Game.state.activeOrder;
            if (active) {
                const done = active.requiredGenerations - active.remainingGenerations;
                const actionLabel = this.getGenerateActionLabelForOrder(active, 'button');
                this.renderGenerateButtonContent(button, actionLabel, `${done} / ${active.requiredGenerations}`);
            } else {
                this.renderGenerateButtonContent(button, 'GENERATE');
            }
        },

        getGenerateActionLabelForOrder(order, style = 'button') {
            const mode = String(style || 'button').toLowerCase();
            if (!order) return mode === 'meta' ? 'Generations' : 'GENERATE';

            const category = String(order.taskCategory || Game.config.TASK_CATEGORIES.ORDERS);
            const customLabel = String(order.generateActionLabel || '').trim();
            const allowCustom = (
                category === Game.config.TASK_CATEGORIES.STORY
                || category === Game.config.TASK_CATEGORIES.RESEARCH
                || category === Game.config.TASK_CATEGORIES.PROMOTION
            );

            let baseLabel = 'Generate';
            if (allowCustom && customLabel) {
                baseLabel = customLabel;
            } else if (category === Game.config.TASK_CATEGORIES.STORY) {
                baseLabel = 'Story';
            } else if (category === Game.config.TASK_CATEGORIES.RESEARCH) {
                baseLabel = 'Research';
            } else if (category === Game.config.TASK_CATEGORIES.PROMOTION) {
                baseLabel = 'Promote';
            }

            const compact = String(baseLabel).replace(/\s+/g, ' ').trim();
            const title = compact
                .split(' ')
                .filter(Boolean)
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                .join(' ');

            if (mode === 'meta') return title || 'Generations';
            return (title || 'Generate').toUpperCase();
        },

        getCategoryTitle(category) {
            if (category === Game.config.TASK_CATEGORIES.STORY) return 'Main Story';
            if (category === Game.config.TASK_CATEGORIES.RESEARCH) return 'Research';
            if (category === Game.config.TASK_CATEGORIES.PROMOTION) return 'Promotion';
            return 'Orders';
        },

        showOrdersHubView() {
            Game.state.ordersMenuView = 'hub';
            if (Game.elems.bittrickHubView) {
                Game.elems.bittrickHubView.hidden = false;
            }
            if (Game.elems.bittrickCategoryView) {
                Game.elems.bittrickCategoryView.hidden = true;
            }
        },

        showOrdersCategoryView(category) {
            const safeCategory = category || Game.config.TASK_CATEGORIES.ORDERS;
            Game.state.ordersMenuTab = safeCategory;
            Game.state.ordersMenuView = 'category';

            const selected = Game.state.orders.find((order) => order && order.id === Game.state.selectedOrderId);
            const selectedCategory = selected && selected.taskCategory ? selected.taskCategory : Game.config.TASK_CATEGORIES.ORDERS;
            const selectedLock = selected ? Game.actions.getOrderLockSnapshot(selected) : { isLocked: true };
            if (!selected || selectedCategory !== safeCategory || selectedLock.isLocked) {
                Game.state.selectedOrderId = null;
            }

            if (Game.elems.bittrickHubView) {
                Game.elems.bittrickHubView.hidden = true;
            }
            if (Game.elems.bittrickCategoryView) {
                Game.elems.bittrickCategoryView.hidden = false;
            }
            if (Game.elems.bittrickCategoryTitle) {
                this.updateText(Game.elems.bittrickCategoryTitle, this.getCategoryTitle(safeCategory));
            }

            this.renderOrdersList();
            this.syncStartWorkButtonState();
            this.renderCategoryCounters(safeCategory);
            Game.actions.tryShowOrdersCategoryTutorialHint(safeCategory);
            Game.actions.tryShowCategoryFirstOpenComment(safeCategory);
        },

        syncStartWorkButtonState() {
            const startBtn = Game.elems.startWorkBtn;
            if (!startBtn) return;

            const currentCategory = Game.state.ordersMenuTab || Game.config.TASK_CATEGORIES.ORDERS;
            const selected = Game.state.orders.find((order) => order && order.id === Game.state.selectedOrderId);
            const selectedLock = selected ? Game.actions.getOrderLockSnapshot(selected) : { isLocked: true };
            const canStart = !!(
                Game.state.ordersMenuView === 'category'
                && selected
                && !selectedLock.isLocked
                && (selected.taskCategory || Game.config.TASK_CATEGORIES.ORDERS) === currentCategory
            );

            startBtn.disabled = !canStart;
            startBtn.setAttribute('aria-disabled', canStart ? 'false' : 'true');
        },

        renderOrdersList() {
            const list = Game.elems.ordersList;
            if (!list) return;
            const now = Date.now();
            const currentCategory = Game.state.ordersMenuTab || Game.config.TASK_CATEGORIES.ORDERS;
            const selectedOrder = Game.state.orders.find((order) => order && order.id === Game.state.selectedOrderId);
            const selectedCategory = selectedOrder && selectedOrder.taskCategory
                ? selectedOrder.taskCategory
                : Game.config.TASK_CATEGORIES.ORDERS;
            const selectedLock = selectedOrder ? Game.actions.getOrderLockSnapshot(selectedOrder) : { isLocked: true };
            if (!selectedOrder || selectedLock.isLocked || selectedCategory !== currentCategory) {
                Game.state.selectedOrderId = null;
            }

            const scopedOrders = Game.state.orders.filter((order) => {
                const category = order && order.taskCategory ? order.taskCategory : Game.config.TASK_CATEGORIES.ORDERS;
                return category === currentCategory;
            });

            if (!scopedOrders.length) {
                list.innerHTML = '<p class="orders-empty">No tasks in this category yet</p>';
                this.syncStartWorkButtonState();
                return;
            }

            const cards = scopedOrders.map((order) => {
                const isStory = !!order.isStory;
                const lockSnapshot = Game.actions.getOrderLockSnapshot(order);
                const isLocked = !!lockSnapshot.isLocked;
                const selected = order.id === Game.state.selectedOrderId ? ' selected' : '';
                const iconClass = order.iconUrl ? ' has-image' : '';
                const hasInfiniteLifetime = !isStory && !Number.isFinite(Number(order.expiresAt));
                const remainingMs = (isStory || hasInfiniteLifetime) ? Number.POSITIVE_INFINITY : Math.max(0, order.expiresAt - now);
                const remainingSec = (isStory || hasInfiniteLifetime) ? null : Math.max(0, Math.ceil(remainingMs / 1000));
                const lifeProgress = !isStory && order.job_loss > 0
                    ? Math.min(1, Math.max(0, (order.job_loss * 1000 - remainingMs) / (order.job_loss * 1000)))
                    : 1;
                const expiringClass = !isStory && !hasInfiniteLifetime && remainingSec <= 3 ? ' near-expire' : '';
                const glowClass = order.isHighPayout ? ' order-icon-glow' : '';
                const iconStyle = order.iconUrl
                    ? ` style="background-image:url('${order.iconUrl}');"`
                    : '';
                const payoutRaw = Math.round(Number(order.realPayout) || 0);
                const payoutAbs = Math.abs(payoutRaw);
                const payoutClass = payoutRaw < 0 ? ' order-payout-negative' : '';
                const payoutOffsetClass = payoutRaw < 0 ? ' order-payout-with-cost' : '';
                const costLabelMarkup = payoutRaw < 0
                    ? '<div class="order-cost-label">cost:</div>'
                    : '';
                const category = String(order.taskCategory || Game.config.TASK_CATEGORIES.ORDERS);
                const categoryUsesActionLabel = (
                    category === Game.config.TASK_CATEGORIES.STORY
                    || category === Game.config.TASK_CATEGORIES.RESEARCH
                    || category === Game.config.TASK_CATEGORIES.PROMOTION
                );
                const generationsLabel = isLocked
                    ? 'Blocked'
                    : `${(categoryUsesActionLabel ? this.getGenerateActionLabelForOrder(order, 'meta') : 'Generations')}:`;
                const generationsValue = isLocked ? '' : `${order.requiredGenerations}`;
                const timeLabel = isLocked ? (lockSnapshot.reason || 'Need upgrade') : 'Time:';
                const timeValue = isLocked
                    ? ''
                    : ((isStory || hasInfiniteLifetime || order.hasExecutionTimer === false) ? 'No limit' : `${order.durationSec}s`);
                const lockClass = isLocked ? ' locked' : '';
                const lockLabelClass = isLocked ? ' locked-flag' : '';
                const reqLabelClass = isLocked ? ' locked-requirement' : '';
                const lockAria = isLocked ? `Locked task: ${lockSnapshot.reason || 'Need upgrade'}` : `Select order ${order.title}`;
                const tabIndex = isLocked ? -1 : 0;
                const role = isLocked ? 'article' : 'button';
                const generationsValueMarkup = generationsValue
                    ? `<strong class="order-meta-value">${generationsValue}</strong>`
                    : '';
                const timeValueMarkup = timeValue
                    ? `<strong class="order-meta-value">${timeValue}</strong>`
                    : '';
                let expireMarkup = '';
                if (isStory) {
                    expireMarkup = '<div class="order-expire order-expire-story" aria-label="Story order does not expire">Story</div>';
                } else if (!hasInfiniteLifetime) {
                    expireMarkup = `<div class="order-expire" aria-label="Expires in ${remainingSec} seconds">${remainingSec}</div>`;
                }
                return `
                    <article class="order-item${selected}${expiringClass}${lockClass}" style="--loss-progress:${lifeProgress};" data-order-id="${order.id}" data-locked="${isLocked ? 'true' : 'false'}" tabindex="${tabIndex}" role="${role}" aria-label="${lockAria}" aria-disabled="${isLocked ? 'true' : 'false'}">
                        <div class="order-left">
                            <div class="order-icon${iconClass}${glowClass}${expiringClass}" aria-hidden="true"${iconStyle}></div>
                            ${costLabelMarkup}
                            <div class="order-payout${payoutClass}${payoutOffsetClass}">${payoutAbs}₽</div>
                        </div>
                        <div class="order-main">
                            <h3 class="order-title">${order.title}</h3>
                            <div class="order-meta">
                                <p class="order-meta-row"><span class="order-meta-label${lockLabelClass}">${generationsLabel}</span>${generationsValueMarkup ? ` ${generationsValueMarkup}` : ''}</p>
                                <p class="order-meta-row"><span class="order-meta-label${reqLabelClass}">${timeLabel}</span>${timeValueMarkup ? ` ${timeValueMarkup}` : ''}</p>
                            </div>
                        </div>
                        ${expireMarkup}
                    </article>
                `;
            });

            list.innerHTML = cards.join('');
            this.applyDigitsTypography(list);
            this.syncStartWorkButtonState();
        },

        updateVisibleOrderTimersAndProgress() {
            const list = Game.elems.ordersList;
            if (!list) return;

            const cards = list.querySelectorAll('.order-item[data-order-id]');
            if (!cards.length) return;

            const now = Date.now();
            cards.forEach((card) => {
                const orderId = card.getAttribute('data-order-id');
                if (!orderId) return;

                const order = Game.state.orders.find((item) => item && item.id === orderId);
                if (!order) return;
                if (order.isLocked || order.isStory) return;

                const hasFiniteExpire = Number.isFinite(Number(order.expiresAt));
                if (!hasFiniteExpire) return;

                const expireEl = card.querySelector('.order-expire');
                const iconEl = card.querySelector('.order-icon');

                const remainingMs = Math.max(0, Number(order.expiresAt) - now);
                const remainingSec = Math.max(0, Math.ceil(remainingMs / 1000));
                const isNearExpire = remainingSec <= 3;

                const lifeProgress = Number(order.job_loss) > 0
                    ? Math.min(1, Math.max(0, ((Number(order.job_loss) * 1000) - remainingMs) / (Number(order.job_loss) * 1000)))
                    : 1;

                card.style.setProperty('--loss-progress', String(lifeProgress));
                card.classList.toggle('near-expire', isNearExpire);
                if (iconEl) {
                    iconEl.classList.toggle('near-expire', isNearExpire);
                }

                if (expireEl) {
                    expireEl.textContent = String(remainingSec);
                    expireEl.setAttribute('aria-label', `Expires in ${remainingSec} seconds`);
                }
            });
        },

        updateCounters() {
            const visibleOrdersCount = Game.state.orders.filter((order) => {
                if (!order) return false;
                const category = order.taskCategory || Game.config.TASK_CATEGORIES.ORDERS;
                return category === Game.config.TASK_CATEGORIES.ORDERS && !order.isLocked;
            }).length;

            this.updateText(Game.elems.ordersValue, visibleOrdersCount > 99 ? '99+' : visibleOrdersCount);
            this.updateText(Game.elems.fundsValue, `${Game.state.funds}₽`);
            this.renderHubCategoryAlerts();

            // Live-update counter values if the category-counters panel is currently rendered.
            if (Game.elems.categoryCounters) {
                const update = (id, val) => {
                    const el = Game.elems.categoryCounters.querySelector(`[data-counter="${id}"]`);
                    if (el) el.textContent = val;
                };
                update('virtualPrestigePool', Game.state.virtualPrestigePool);
                update('prestige', Game.state.prestige);
                update('skillPoints', Game.state.skillPoints);
                update('expertPoints', Game.state.expertPoints);
            }
            if (Game.elems.shopCounters) {
                const update = (id, val) => {
                    const el = Game.elems.shopCounters.querySelector(`[data-counter="${id}"]`);
                    if (el) el.textContent = val;
                };
                update('cigarettes', Game.state.goods.cigarettes);
                update('cigaretteButts', Game.state.cigaretteButts);
            }

            // Ch1: 1000r balance milestone — trigger pro upgrade hint
            if (!Game.state.chapter1Completed && Game.state.funds >= 1000) {
                Game.actions.handleChapter1Event('funds_reached_1000');
            }
        },

        renderHubCategoryAlerts() {
            const buttons = Game.elems.bittrickHubButtons;
            if (!buttons || !buttons.length) return;

            buttons.forEach((button) => {
                if (!button) return;
                const category = button.dataset.category || Game.config.TASK_CATEGORIES.ORDERS;
                const shouldShow = category !== Game.config.TASK_CATEGORIES.ORDERS
                    && Game.state.orders.some((order) => {
                        if (!order) return false;
                        const orderCategory = order.taskCategory || Game.config.TASK_CATEGORIES.ORDERS;
                        return orderCategory === category && !order.isLocked;
                    });

                button.classList.toggle('has-category-alert', shouldShow);
                button.setAttribute('data-has-alert', shouldShow ? 'true' : 'false');
            });
        },

        renderCategoryCounters(category) {
            const el = Game.elems.categoryCounters;
            if (!el) return;
            let html = '';
            if (category === Game.config.TASK_CATEGORIES.PROMOTION) {
                html = this._buildCounterPair(
                    'images/icons/icon-counter-prestige-pool.png', 'Prestige pool', 'virtualPrestigePool', Game.state.virtualPrestigePool,
                    'images/icons/icon-counter-prestige.png', 'Prestige', 'prestige', Game.state.prestige
                );
            } else if (category === Game.config.TASK_CATEGORIES.RESEARCH) {
                html = this._buildCounterPair(
                    'images/icons/icon-counter-skillpoint.png', 'Skill points', 'skillPoints', Game.state.skillPoints,
                    'images/icons/icon-counter-expertpoint.png', 'Expert points', 'expertPoints', Game.state.expertPoints
                );
            }
            el.innerHTML = html;
        },

        renderShopCounters(tab) {
            const el = Game.elems.shopCounters;
            if (!el) return;
            if (tab === Game.config.SHOP_CATEGORIES.GOODS) {
                el.innerHTML = this._buildCounterPair(
                    'images/icons/icon-counter-cig.png', 'Cigarettes', 'cigarettes', Game.state.goods.cigarettes,
                    'images/icons/icon-counter-cig-butt.png', 'Butts', 'cigaretteButts', Game.state.cigaretteButts
                );
            } else {
                el.innerHTML = '';
            }
        },

        _buildCounterPair(icon1, label1, id1, val1, icon2, label2, id2, val2) {
            const card = (icon, label, id, val) => `
                <div class="category-counter">
                    <img src="${icon}" alt="${label}" class="counter-icon">
                    <span class="counter-value" data-counter="${id}">${val}</span>
                </div>`;
            return card(icon1, label1, id1, val1) + card(icon2, label2, id2, val2);
        },

        getShopCategoryTitle(category) {
            if (category === Game.config.SHOP_CATEGORIES.UPGRADES) return 'UPGRADES';
            if (category === Game.config.SHOP_CATEGORIES.PROPERTY) return 'PROPERTY';
            if (category === Game.config.SHOP_CATEGORIES.CLOTHES) return 'CLOTHES';
            return 'GOODS';
        },

        showShopHubView() {
            Game.state.shopMenuView = 'hub';
            if (Game.elems.shopHubView) {
                Game.elems.shopHubView.hidden = false;
            }
            if (Game.elems.shopCategoryView) {
                Game.elems.shopCategoryView.hidden = true;
            }
            this.cancelSkillTreeIntroSequence();
            this.stopSkillTreeStarfield();
            this.setShopUpgradesFullscreenMode(false);
            this.setShopFullscreenPause(false);
            // Ch1: start 10s spam_inject timer after player leaves upgrades shop for the first time
            if (Game.state.ch1FiredEvents && Game.state.ch1FiredEvents['ch1_upgrades_first_open']) {
                Game.actions.handleChapter1Event('ch1_upgrades_first_close');
            }
        },

        showShopCategoryView(category) {
            const safeCategory = category || Game.config.SHOP_CATEGORIES.GOODS;
            Game.state.shopMenuView = 'category';
            Game.state.shopMenuTab = safeCategory;

            if (Game.elems.shopHubView) {
                Game.elems.shopHubView.hidden = true;
            }
            if (Game.elems.shopCategoryView) {
                Game.elems.shopCategoryView.hidden = false;
            }
            if (Game.elems.shopCategoryTitle) {
                this.updateText(Game.elems.shopCategoryTitle, this.getShopCategoryTitle(safeCategory));
            }

            const isUpgradesFullscreen = safeCategory === Game.config.SHOP_CATEGORIES.UPGRADES;
            this.setShopUpgradesFullscreenMode(isUpgradesFullscreen);
            if (!isUpgradesFullscreen) {
                this.cancelSkillTreeIntroSequence();
                this.stopSkillTreeStarfield();
            }

            const isFullscreenCategory = safeCategory !== Game.config.SHOP_CATEGORIES.GOODS;
            this.setShopFullscreenPause(isFullscreenCategory);
            if (safeCategory === Game.config.SHOP_CATEGORIES.UPGRADES) {
                this.getSkillTreeRuntime().userInteracted = false;
            }
            this.renderShopUpgrades();
            const shouldSuppressCategoryComment = safeCategory === Game.config.SHOP_CATEGORIES.UPGRADES
                && this.shouldPlaySkillTreeIntro();
            if (!shouldSuppressCategoryComment) {
                Game.actions.tryShowShopCategoryComment(safeCategory);
            }
            this.renderShopCounters(safeCategory);
            if (safeCategory === Game.config.SHOP_CATEGORIES.UPGRADES) {
                Game.actions.tryShowUpgradesMenuOpenComment();
                Game.actions.handleChapter1Event('ch1_upgrades_first_open');
            }
        },

        setShopUpgradesFullscreenMode(enabled) {
            const active = !!enabled;
            if (Game.elems.shopMenu) {
                Game.elems.shopMenu.classList.toggle('upgrades-fullscreen', active);
            }
            if (Game.elems.container) {
                Game.elems.container.classList.toggle('upgrades-fullscreen-active', active);
            }
        },

        setShopFullscreenPause(shouldPause) {
            if (Game.elems.shopMenu) {
                Game.elems.shopMenu.classList.toggle('shop-fullscreen-mode', !!shouldPause);
            }
            if (shouldPause) {
                if (!Game.state.shopPausedByFullscreenMenu && !Game.state.gamePausedByDialog) {
                    Game.actions.pauseGameLogic();
                    Game.state.shopPausedByFullscreenMenu = true;
                }
            } else if (Game.state.shopPausedByFullscreenMenu) {
                Game.actions.resumeGameLogic();
                Game.state.shopPausedByFullscreenMenu = false;
            }
        },

        renderShopGoodsList() {
            const list = Game.elems.shopCategoryList;
            if (!list) return;

            const goods = Array.isArray(Game.config.SHOP_GOODS) ? Game.config.SHOP_GOODS : [];
            if (!goods.length) {
                list.innerHTML = '<p class="orders-empty">No goods available</p>';
                return;
            }

            const cards = goods.map((item) => {
                const price = Math.max(0, Math.round(Number(item.price) || 0));
                const affordable = Game.state.funds >= price;

                let buyText = `Buy ${price}₽`;
                let disabled = !affordable;

                if (item.id === 'energ' && Game.state.goods.energizerActive) {
                    buyText = 'Active';
                    disabled = true;
                }
                if (item.id === 'meds' && Game.state.goods.vitaminsActive) {
                    buyText = 'Active';
                    disabled = true;
                }

                const itemClass = disabled ? ' disabled' : '';
                const cigarettesMeta = item.id === 'cigs'
                    ? `<p class="shop-good-meta">Stock: <strong>${Math.max(0, Math.round(Game.state.goods.cigarettes))}</strong></p>`
                    : '';
                const autoBuyMarkup = item.id === 'cigs'
                    ? `<button class="good-auto-buy-btn${Game.state.goods.cigsAutoBuy ? ' active' : ''}" type="button" data-good-action="toggle-cigs-auto">Auto-buy: ${Game.state.goods.cigsAutoBuy ? 'ON' : 'OFF'}</button>`
                    : '';

                return `
                    <article class="shop-good-card${itemClass}" data-good-id="${item.id}">
                        <div class="shop-good-icon-wrap">
                            <img class="shop-good-icon" src="${item.iconUrl}" alt="" aria-hidden="true">
                        </div>
                        <div class="shop-good-main">
                            <h3 class="shop-good-title">${item.title}</h3>
                            <p class="shop-good-desc">${item.description}</p>
                            ${cigarettesMeta}
                        </div>
                        <div class="shop-good-actions">
                            <p class="shop-good-price">${price}₽</p>
                            <button class="good-buy-btn" type="button" data-good-id="${item.id}" ${disabled ? 'disabled' : ''}>${buyText}</button>
                            ${autoBuyMarkup}
                        </div>
                    </article>
                `;
            }).join('');

            list.innerHTML = cards;
            this.applyDigitsTypography(list);
        },

        renderShopPlaceholder(category) {
            const list = Game.elems.shopCategoryList;
            if (!list) return;

            const text = category === Game.config.SHOP_CATEGORIES.UPGRADES
                ? 'Upgrades full-screen menu is in active development. We will build detailed screens in the next step.'
                : category === Game.config.SHOP_CATEGORIES.PROPERTY
                    ? 'Property selection screen placeholder. Design is in progress.'
                    : 'Clothes and appearance customization screen placeholder. Design is in progress.';

            list.innerHTML = `
                <section class="shop-placeholder-screen">
                    <p>${text}</p>
                </section>
            `;
        },

        getSkillTreeRuntime() {
            if (!this._skillTreeRuntime || typeof this._skillTreeRuntime !== 'object') {
                this._skillTreeRuntime = {
                    userInteracted: false,
                    selectedNodeId: null,
                    cameraAnimRaf: null,
                    cameraAnimating: false,
                };
            }
            return this._skillTreeRuntime;
        },

        getSkillTreeNodeCanvasPosition(root, nodeId) {
            if (!root) return null;
            const nodeBtn = root.querySelector(`.skill-tree-node[data-node-id="${String(nodeId || '').trim()}"]`);
            if (!nodeBtn) return null;
            const x = Number.parseFloat(nodeBtn.style.left || '');
            const y = Number.parseFloat(nodeBtn.style.top || '');
            if (!Number.isFinite(x) || !Number.isFinite(y)) return null;
            return { x, y };
        },

        async animateSkillTreeCameraToNode(root, nodeId, targetZoom = 1.08, durationMs = 620) {
            if (!root) return false;
            const runtime = this.getSkillTreeRuntime();
            const viewport = root.querySelector('.skill-tree-viewport');
            if (!viewport) return false;

            const pos = this.getSkillTreeNodeCanvasPosition(root, nodeId);
            if (!pos) return false;

            const viewW = Math.max(1, viewport.clientWidth);
            const viewH = Math.max(1, viewport.clientHeight);
            const fromZoom = this.clampSkillTreeZoom(Game.state.skillTree.viewport.zoom);
            const fromPanX = Number(Game.state.skillTree.viewport.panX) || 0;
            const fromPanY = Number(Game.state.skillTree.viewport.panY) || 0;
            const toZoom = this.clampSkillTreeZoom(targetZoom);
            const toPanX = (viewW * 0.5) - (pos.x * toZoom);
            const toPanY = (viewH * 0.5) - (pos.y * toZoom);

            if (runtime.cameraAnimRaf) {
                cancelAnimationFrame(runtime.cameraAnimRaf);
                runtime.cameraAnimRaf = null;
            }

            runtime.cameraAnimating = true;
            root.classList.add('camera-animating');

            const ease = (t) => 1 - Math.pow(1 - t, 3);
            const startedAt = performance.now();

            return new Promise((resolve) => {
                const frame = (now) => {
                    const elapsed = Math.max(0, now - startedAt);
                    const t = Math.min(1, elapsed / Math.max(1, durationMs));
                    const k = ease(t);

                    Game.state.skillTree.viewport.zoom = fromZoom + (toZoom - fromZoom) * k;
                    Game.state.skillTree.viewport.panX = fromPanX + (toPanX - fromPanX) * k;
                    Game.state.skillTree.viewport.panY = fromPanY + (toPanY - fromPanY) * k;
                    this.applySkillTreeTransform(root);

                    if (t >= 1) {
                        runtime.cameraAnimRaf = null;
                        runtime.cameraAnimating = false;
                        root.classList.remove('camera-animating');
                        resolve(true);
                        return;
                    }

                    runtime.cameraAnimRaf = requestAnimationFrame(frame);
                };

                runtime.cameraAnimRaf = requestAnimationFrame(frame);
            });
        },

        triggerSkillNodePurchaseEffect(root, nodeId) {
            if (!root) return;
            const nodeBtn = root.querySelector(`.skill-tree-node[data-node-id="${String(nodeId || '').trim()}"]`);
            if (!nodeBtn) return;

            nodeBtn.classList.remove('purchase-flare');
            void nodeBtn.offsetWidth;
            nodeBtn.classList.add('purchase-flare');
            window.setTimeout(() => {
                nodeBtn.classList.remove('purchase-flare');
            }, 820);
        },

        selectSkillTreeNode(root, nodeId) {
            if (!root) return;
            const runtime = this.getSkillTreeRuntime();
            const key = String(nodeId || '').trim();
            runtime.selectedNodeId = key || null;

            const nodeButtons = root.querySelectorAll('.skill-tree-node[data-node-id]');
            nodeButtons.forEach((btn) => {
                const id = String(btn.dataset.nodeId || '').trim();
                btn.classList.toggle('selected', !!key && id === key);
            });
        },

        clampSkillTreeZoom(value) {
            return Math.max(0.35, Math.min(2.8, Number(value) || 1));
        },

        applySkillTreeTransform(root) {
            if (!root) return;
            const canvas = root.querySelector('.skill-tree-canvas');
            if (!canvas) return;
            const zoom = this.clampSkillTreeZoom(Game.state.skillTree.viewport.zoom);
            const panX = Number(Game.state.skillTree.viewport.panX) || 0;
            const panY = Number(Game.state.skillTree.viewport.panY) || 0;
            canvas.style.transform = `translate(${panX}px, ${panY}px) scale(${zoom})`;
        },

        fitSkillTreeViewport(root) {
            if (!root) return;
            const viewport = root.querySelector('.skill-tree-viewport');
            const canvas = root.querySelector('.skill-tree-canvas');
            if (!viewport || !canvas) return;

            const viewW = Math.max(1, viewport.clientWidth);
            const viewH = Math.max(1, viewport.clientHeight);
            const sceneW = Math.max(1, Number(canvas.dataset.sceneWidth) || canvas.offsetWidth || 1);
            const sceneH = Math.max(1, Number(canvas.dataset.sceneHeight) || canvas.offsetHeight || 1);
            const rootCx = Number(canvas.dataset.rootCx);
            const rootCy = Number(canvas.dataset.rootCy);

            const targetZoom = this.clampSkillTreeZoom(Math.min(viewW / sceneW, viewH / sceneH) * 0.84);
            Game.state.skillTree.viewport.zoom = targetZoom;

            if (Number.isFinite(rootCx) && Number.isFinite(rootCy)) {
                // Keep the root node pinned to the visual center of the viewport.
                Game.state.skillTree.viewport.panX = (viewW * 0.5) - (rootCx * targetZoom);
                Game.state.skillTree.viewport.panY = (viewH * 0.5) - (rootCy * targetZoom);
            } else {
                Game.state.skillTree.viewport.panX = (viewW - sceneW * targetZoom) * 0.5;
                Game.state.skillTree.viewport.panY = (viewH - sceneH * targetZoom) * 0.5;
            }
            this.applySkillTreeTransform(root);
        },

        formatSkillNodeCosts(costs) {
            const normalized = costs && typeof costs === 'object' ? costs : {};
            const parts = [];
            if (normalized.money > 0) parts.push(`${normalized.money}₽`);
            if (normalized.prestige > 0) parts.push(`${normalized.prestige} prestige`);
            if (normalized.skillPoints > 0) parts.push(`${normalized.skillPoints} SP`);
            if (normalized.butts > 0) parts.push(`${normalized.butts} butts`);
            return parts.length ? parts.join(' + ') : 'Free';
        },

        openSkillTreeNodePopup(root, nodeId) {
            if (!root) return;
            const popup = root.querySelector('[data-skill-tree-popup]');
            if (!popup) return;

            const node = Game.actions.getSkillNode(nodeId);
            if (!node) {
                popup.hidden = true;
                return;
            }

            const availability = Game.actions.getSkillNodeAvailability(nodeId);
            const titleEl = popup.querySelector('[data-skill-popup-title]');
            const descEl = popup.querySelector('[data-skill-popup-desc]');
            const costEl = popup.querySelector('[data-skill-popup-cost]');
            const reqEl = popup.querySelector('[data-skill-popup-req]');
            const buyBtn = popup.querySelector('[data-skill-node-buy]');

            if (titleEl) titleEl.textContent = node.title || node.id;
            if (descEl) descEl.textContent = node.description || 'No description yet.';
            if (costEl) costEl.textContent = `Cost: ${this.formatSkillNodeCosts(availability.costs)}`;

            const reasons = Array.isArray(availability.reasons) ? availability.reasons : [];
            if (reqEl) {
                reqEl.textContent = reasons.length
                    ? `Locked: ${reasons.join(' | ')}`
                    : 'Ready to purchase';
            }

            if (buyBtn) {
                buyBtn.dataset.nodeId = node.id;
                if (availability.purchased) {
                    buyBtn.disabled = true;
                    buyBtn.textContent = 'Purchased';
                } else if (!availability.ok) {
                    buyBtn.disabled = true;
                    buyBtn.textContent = 'Unavailable';
                } else {
                    buyBtn.disabled = false;
                    buyBtn.textContent = 'Buy node';
                }
            }

            popup.hidden = false;
            this.selectSkillTreeNode(root, node.id);

            // Chapter 1 hook: fire when a blocked node is opened
            if (!availability.purchased && !availability.ok) {
                Game.actions.handleChapter1Event('skill_node_blocked_' + node.id);
            }
        },

        closeSkillTreeNodePopup(root) {
            if (!root) return;
            const popup = root.querySelector('[data-skill-tree-popup]');
            if (!popup) return;
            popup.hidden = true;
            this.selectSkillTreeNode(root, null);
        },

        shouldPlaySkillTreeIntro() {
            return !Game.state.shownCharacterComments.skill_tree_first_intro_seen;
        },

        markSkillTreeIntroSeen() {
            Game.state.shownCharacterComments.skill_tree_first_intro_seen = true;
            Game.persist.save();
        },

        setSkillTreeIntroLine(root, text) {
            if (!root) return;
            const lineEl = root.querySelector('[data-skill-intro-line]');
            if (!lineEl) return;
            const safeText = String(text || '').trim();
            if (!safeText) {
                if (Game.intro && Game.intro.typing && Game.intro.typing.targetElement === lineEl && typeof Game.intro.finishTypingInstant === 'function') {
                    Game.intro.finishTypingInstant();
                }
                lineEl.textContent = '';
                lineEl.classList.remove('visible');
                return;
            }
            lineEl.classList.add('visible');
            if (Game.intro && typeof Game.intro.typeText === 'function') {
                Game.intro.typeText(safeText, lineEl, { allowHtml: false });
            } else {
                lineEl.textContent = safeText;
            }
        },

        setSkillTreeIntroDialogVisible(root, visible) {
            if (!root) return;
            const dialogEl = root.querySelector('[data-skill-intro-dialog]');
            if (!dialogEl) return;
            const isVisible = !!visible;
            dialogEl.hidden = !isVisible;
            dialogEl.style.display = isVisible ? 'flex' : 'none';
            dialogEl.setAttribute('aria-hidden', isVisible ? 'false' : 'true');
        },

        positionSkillTreeIntroOrigin(root) {
            if (!root) return;
            const clamp01 = (value) => Math.max(0, Math.min(1, Number(value) || 0));
            const rootNode = root.querySelector('.skill-tree-node[data-node-root="true"]');
            const hostRect = root.getBoundingClientRect();
            if (!rootNode || hostRect.width <= 0 || hostRect.height <= 0) return;

            const nodeRect = rootNode.getBoundingClientRect();
            const x = clamp01(((nodeRect.left + nodeRect.width * 0.5) - hostRect.left) / hostRect.width);
            const y = clamp01(((nodeRect.top + nodeRect.height * 0.5) - hostRect.top) / hostRect.height);
            root.style.setProperty('--skill-intro-origin-x', `${(x * 100).toFixed(3)}%`);
            root.style.setProperty('--skill-intro-origin-y', `${(y * 100).toFixed(3)}%`);
        },

        waitSkillTreeIntroAdvance(root, token) {
            const runtime = this.getSkillTreeRuntime();
            const nextBtn = root ? root.querySelector('[data-skill-intro-next]') : null;
            if (!nextBtn) return Promise.resolve(true);

            return new Promise((resolve) => {
                const finish = (ok) => {
                    nextBtn.removeEventListener('click', onClick);
                    if (runtime.introAdvanceResolve === finish) {
                        runtime.introAdvanceResolve = null;
                    }
                    resolve(!!ok);
                };

                const onClick = () => {
                    if (runtime.skillTreeIntroToken !== token) {
                        finish(false);
                        return;
                    }
                    if (Game.intro && typeof Game.intro.isTyping === 'function' && Game.intro.isTyping()) {
                        Game.intro.finishTypingInstant();
                        return;
                    }
                    finish(true);
                };

                runtime.introAdvanceResolve = finish;
                nextBtn.addEventListener('click', onClick);
            });
        },

        waitSkillTreeIntroDelay(ms, token) {
            const runtime = this.getSkillTreeRuntime();
            return new Promise((resolve) => {
                if (runtime.introDelayTimerId) {
                    window.clearTimeout(runtime.introDelayTimerId);
                }
                runtime.introDelayTimerId = window.setTimeout(() => {
                    runtime.introDelayTimerId = null;
                    resolve(runtime.skillTreeIntroToken === token);
                }, Math.max(0, Number(ms) || 0));
            });
        },

        triggerSkillTreeStarBurst(power = 5, root = null) {
            const runtime = this.getSkillTreeRuntime();
            const clamp01 = (value) => Math.max(0, Math.min(1, Number(value) || 0));

            let originX = 0.5;
            let originY = 0.5;
            if (root) {
                const singularity = root.querySelector('[data-skill-intro-singularity]');
                const canvas = root.querySelector('[data-skill-starfield-canvas]');
                if (singularity && canvas) {
                    const sRect = singularity.getBoundingClientRect();
                    const cRect = canvas.getBoundingClientRect();
                    if (cRect.width > 0 && cRect.height > 0) {
                        originX = clamp01(((sRect.left + sRect.width * 0.5) - cRect.left) / cRect.width);
                        originY = clamp01(((sRect.top + sRect.height * 0.5) - cRect.top) / cRect.height);
                    }
                }
            }

            runtime.starCenterX = originX;
            runtime.starCenterY = originY;
            runtime.starMode = 'burst';
            runtime.starBurstFrames = Math.max(28, Math.round(34 + (Number(power) || 0) * 10));

            const stars = Array.isArray(runtime.stars) ? runtime.stars : [];
            for (let i = 0; i < stars.length; i += 1) {
                const star = stars[i];
                const angle = Math.random() * Math.PI * 2;
                const radial = 0.006 + Math.random() * 0.03;
                star.x = (Math.random() - 0.5) * 0.06;
                star.y = (Math.random() - 0.5) * 0.06;
                star.z = 0.95 + Math.random() * 0.46;
                star.vx = Math.cos(angle) * radial;
                star.vy = Math.sin(angle) * radial;
                star.vz = 0.012 + Math.random() * 0.024;
                star.twinkle = Math.random() * Math.PI * 2;
                star.fadePhase = Math.random() * Math.PI * 2;
                star.fadeSpeed = 0.006 + Math.random() * 0.01;
                star.sizeSeed = 0.6 + Math.random() * 1.7;
            }
        },

        stopSkillTreeStarfield() {
            const runtime = this.getSkillTreeRuntime();
            if (runtime.starfieldRaf) {
                cancelAnimationFrame(runtime.starfieldRaf);
            }
            runtime.starfieldRaf = null;
            runtime.starfieldRunning = false;
            runtime.starCanvas = null;
            runtime.starCtx = null;
            runtime.starMode = 'ambient';
            runtime.starCenterX = 0.5;
            runtime.starCenterY = 0.5;
        },

        cancelSkillTreeIntroSequence() {
            const runtime = this.getSkillTreeRuntime();
            runtime.skillTreeIntroToken = (Number(runtime.skillTreeIntroToken) || 0) + 1;
            if (runtime.introDelayTimerId) {
                window.clearTimeout(runtime.introDelayTimerId);
                runtime.introDelayTimerId = null;
            }
            if (typeof runtime.introAdvanceResolve === 'function') {
                const release = runtime.introAdvanceResolve;
                runtime.introAdvanceResolve = null;
                release(false);
            }
            if (runtime.introRoot) {
                runtime.introRoot.classList.remove('intro-active', 'intro-blackout', 'intro-center-only', 'intro-reveal');
                this.setSkillTreeIntroLine(runtime.introRoot, '');
                this.setSkillTreeIntroDialogVisible(runtime.introRoot, false);
            }
            runtime.introRunning = false;
            runtime.introRoot = null;
            if (Game.elems.shopMenu) {
                Game.elems.shopMenu.classList.remove('upgrades-intro-running');
            }
        },

        finishSkillTreeIntroSequence(root, options = {}) {
            const markSeen = options.markSeen !== false;
            const runtime = this.getSkillTreeRuntime();
            if (runtime.introDelayTimerId) {
                window.clearTimeout(runtime.introDelayTimerId);
                runtime.introDelayTimerId = null;
            }

            const targetRoot = root || runtime.introRoot;
            if (targetRoot) {
                this.setSkillTreeIntroLine(targetRoot, '');
                this.setSkillTreeIntroDialogVisible(targetRoot, false);
                targetRoot.classList.remove('intro-active', 'intro-blackout', 'intro-center-only');
                targetRoot.classList.add('intro-reveal');
            }

            runtime.introRunning = false;
            runtime.introRoot = null;
            if (markSeen) {
                this.markSkillTreeIntroSeen();
            }
            if (Game.elems.shopMenu) {
                Game.elems.shopMenu.classList.remove('upgrades-intro-running');
            }
        },

        ensureSkillTreeStarfield(root) {
            if (!root) return;
            const runtime = this.getSkillTreeRuntime();
            const canvas = root.querySelector('[data-skill-starfield-canvas]');
            if (!canvas) return;

            runtime.starCanvas = canvas;
            runtime.starCtx = canvas.getContext('2d', { alpha: true });
            runtime.starMode = runtime.starMode || 'ambient';
            runtime.starCenterX = Number.isFinite(Number(runtime.starCenterX)) ? Number(runtime.starCenterX) : 0.5;
            runtime.starCenterY = Number.isFinite(Number(runtime.starCenterY)) ? Number(runtime.starCenterY) : 0.5;
            runtime.starFieldTime = Number(runtime.starFieldTime) || 0;

            if (!Array.isArray(runtime.stars) || !runtime.stars.length) {
                const count = 540;
                runtime.stars = [];
                for (let i = 0; i < count; i += 1) {
                    runtime.stars.push({
                        x: (Math.random() - 0.5) * 2.8,
                        y: (Math.random() - 0.5) * 2.8,
                        z: 0.55 + Math.random() * 1.75,
                        vx: (Math.random() - 0.5) * 0.0012,
                        vy: (Math.random() - 0.5) * 0.0012,
                        vz: 0,
                        twinkle: Math.random() * Math.PI * 2,
                        fadePhase: Math.random() * Math.PI * 2,
                        fadeSpeed: 0.004 + Math.random() * 0.008,
                        sizeSeed: 0.6 + Math.random() * 1.7,
                    });
                }
            }

            if (runtime.starfieldRunning) return;
            runtime.starfieldRunning = true;

            const renderFrame = () => {
                const activeCanvas = runtime.starCanvas;
                const ctx = runtime.starCtx;
                if (!activeCanvas || !ctx) {
                    runtime.starfieldRunning = false;
                    return;
                }

                const rect = activeCanvas.getBoundingClientRect();
                const width = Math.max(1, Math.floor(rect.width));
                const height = Math.max(1, Math.floor(rect.height));
                const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
                if (activeCanvas.width !== Math.floor(width * dpr) || activeCanvas.height !== Math.floor(height * dpr)) {
                    activeCanvas.width = Math.floor(width * dpr);
                    activeCanvas.height = Math.floor(height * dpr);
                }

                ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
                ctx.clearRect(0, 0, width, height);

                runtime.starFieldTime += 1;
                const mode = runtime.starMode || 'ambient';
                if (mode === 'burst') {
                    runtime.starBurstFrames = (Number(runtime.starBurstFrames) || 0) - 1;
                    if (runtime.starBurstFrames <= 0) {
                        runtime.starMode = 'float';
                    }
                }

                const panX = Number(Game.state.skillTree.viewport.panX) || 0;
                const panY = Number(Game.state.skillTree.viewport.panY) || 0;
                const zoom = Number(Game.state.skillTree.viewport.zoom) || 1;
                const focal = Math.min(width, height) * 0.68;
                const originPxX = width * (Number(runtime.starCenterX) || 0.5);
                const originPxY = height * (Number(runtime.starCenterY) || 0.5);

                const stars = runtime.stars;
                for (let i = 0; i < stars.length; i += 1) {
                    const star = stars[i];
                    if (runtime.starMode === 'burst') {
                        star.x += Number(star.vx) || 0;
                        star.y += Number(star.vy) || 0;
                        star.z -= Number(star.vz) || 0;
                        star.vx *= 1.018;
                        star.vy *= 1.018;
                    } else {
                        star.x += (Number(star.vx) || 0) * 0.14;
                        star.y += (Number(star.vy) || 0) * 0.14;
                        star.z += Math.sin(runtime.starFieldTime * 0.01 + star.twinkle) * 0.00042;
                    }

                    star.twinkle += 0.01;
                    star.fadePhase += Number(star.fadeSpeed) || 0.005;

                    if (star.z <= 0.16 || star.z > 2.5 || Math.abs(star.x) > 3.3 || Math.abs(star.y) > 3.3) {
                        star.x = (Math.random() - 0.5) * 2.8;
                        star.y = (Math.random() - 0.5) * 2.8;
                        star.z = 0.58 + Math.random() * 1.7;
                        star.vx = (Math.random() - 0.5) * 0.0012;
                        star.vy = (Math.random() - 0.5) * 0.0012;
                        star.vz = 0;
                        star.twinkle = Math.random() * Math.PI * 2;
                        star.fadePhase = Math.random() * Math.PI * 2;
                        star.fadeSpeed = 0.004 + Math.random() * 0.008;
                        star.sizeSeed = 0.6 + Math.random() * 1.7;
                    }

                    const depth = 1 / Math.max(0.08, star.z);
                    const baseX = star.x * focal * depth;
                    const baseY = star.y * focal * depth;
                    const parallaxScale = (0.014 + depth * 0.018) * Math.max(0.7, zoom);
                    const sx = originPxX + baseX + panX * parallaxScale;
                    const sy = originPxY + baseY + panY * parallaxScale;

                    if (sx < -6 || sx > width + 6 || sy < -6 || sy > height + 6) {
                        continue;
                    }

                    const twinkle = 0.58 + 0.42 * Math.sin(runtime.starFieldTime * 0.028 + star.twinkle);
                    const fade = 0.36 + 0.64 * (0.5 + 0.5 * Math.sin(star.fadePhase));
                    const alphaBoost = runtime.starMode === 'burst' ? 1.28 : 1;
                    const alpha = Math.max(0.09, Math.min(1, (0.2 + depth * 0.45) * twinkle * fade * alphaBoost));
                    const size = Math.max(1, Math.min(5, Math.round((Number(star.sizeSeed) || 1) + depth * 1.25)));
                    ctx.fillStyle = `rgba(255, 255, 255, ${alpha.toFixed(3)})`;

                    if (runtime.starMode === 'burst' && Number.isFinite(star.lastSX) && Number.isFinite(star.lastSY)) {
                        ctx.strokeStyle = `rgba(255, 255, 255, ${(alpha * 0.42).toFixed(3)})`;
                        ctx.lineWidth = Math.max(1, size * 0.75);
                        ctx.beginPath();
                        ctx.moveTo(star.lastSX, star.lastSY);
                        ctx.lineTo(Math.round(sx), Math.round(sy));
                        ctx.stroke();
                    }

                    ctx.fillRect(Math.round(sx), Math.round(sy), size, size);
                    star.lastSX = Math.round(sx);
                    star.lastSY = Math.round(sy);
                }

                runtime.starfieldRaf = requestAnimationFrame(renderFrame);
            };

            runtime.starfieldRaf = requestAnimationFrame(renderFrame);
        },

        async runSkillTreeIntroSequence(root) {
            if (!root || !this.shouldPlaySkillTreeIntro()) return;

            const runtime = this.getSkillTreeRuntime();
            if (runtime.introRunning) return;
            runtime.skillTreeIntroToken = (Number(runtime.skillTreeIntroToken) || 0) + 1;
            const token = runtime.skillTreeIntroToken;
            runtime.introRunning = true;
            runtime.introRoot = root;

            if (Game.elems.shopMenu) {
                Game.elems.shopMenu.classList.add('upgrades-intro-running');
            }

            root.classList.add('intro-active', 'intro-blackout');
            this.positionSkillTreeIntroOrigin(root);
            this.setSkillTreeIntroDialogVisible(root, true);
            this.setSkillTreeIntroLine(root, '');

            const singularity = root.querySelector('[data-skill-intro-singularity]');
            const shockwave = root.querySelector('[data-skill-intro-shockwave]');
            if (singularity) {
                singularity.classList.remove('visible', 'pulse', 'explode');
            }
            if (shockwave) {
                shockwave.classList.remove('explode');
            }

            const stepDelay = (ms) => this.waitSkillTreeIntroDelay(ms, token);
            const stepLine = async (text) => {
                if (runtime.skillTreeIntroToken !== token) return false;
                this.setSkillTreeIntroLine(root, text);
                return this.waitSkillTreeIntroAdvance(root, token);
            };

            const abortIfNeeded = (ok) => {
                if (ok) return false;
                this.finishSkillTreeIntroSequence(root, { markSeen: false });
                return true;
            };

            if (abortIfNeeded(await stepDelay(420))) return;
            if (abortIfNeeded(await stepLine('Did I just go blind?'))) return;
            if (abortIfNeeded(await stepDelay(260))) return;

            if (abortIfNeeded(await stepLine('Hello? Why is everything black?'))) return;
            if (abortIfNeeded(await stepDelay(300))) return;

            if (singularity) {
                singularity.classList.add('visible');
            }
            if (abortIfNeeded(await stepLine('Well, that is it... the light at the end of the tunnel! Should have quit smoking!'))) return;
            if (abortIfNeeded(await stepDelay(360))) return;

            if (singularity) {
                singularity.classList.add('pulse');
            }
            if (abortIfNeeded(await stepDelay(740))) return;

            if (singularity) {
                singularity.classList.add('explode');
            }
            if (shockwave) {
                shockwave.classList.add('explode');
            }
            root.classList.add('intro-reveal', 'intro-center-only');
            this.triggerSkillTreeStarBurst(10, root);

            if (abortIfNeeded(await stepDelay(380))) return;

            if (abortIfNeeded(await stepLine('Wait, that is me!'))) return;
            if (abortIfNeeded(await stepDelay(240))) return;
            if (abortIfNeeded(await stepLine('Like... that is literally my head! In space...'))) return;
            if (abortIfNeeded(await stepDelay(260))) return;
            if (abortIfNeeded(await stepLine('Well... that is wild.'))) return;

            if (abortIfNeeded(await stepDelay(920))) return;
            this.finishSkillTreeIntroSequence(root, { markSeen: true });
        },

        bindSkillTreeInteractions(root) {
            if (!root) return;
            const viewport = root.querySelector('.skill-tree-viewport');
            if (!viewport) return;
            const runtime = this.getSkillTreeRuntime();

            const applyTransform = () => {
                this.applySkillTreeTransform(root);
            };

            root.addEventListener('click', (event) => {
                if (root.classList.contains('intro-active')) {
                    return;
                }
                if (runtime.cameraAnimating) return;
                const closeBtn = event.target.closest('[data-skill-node-close]');
                if (closeBtn) {
                    this.closeSkillTreeNodePopup(root);
                    return;
                }

                const buyBtn = event.target.closest('[data-skill-node-buy]');
                if (buyBtn) {
                    const nodeId = String(buyBtn.dataset.nodeId || '').trim();
                    if (!nodeId) return;
                    const purchased = Game.actions.buySkillNode(nodeId, { skipRender: true });
                    if (purchased) {
                        this.renderShopUpgrades();
                        const refreshedRoot = Game.elems.shopCategoryList
                            ? Game.elems.shopCategoryList.querySelector('[data-skill-tree-root]')
                            : null;
                        if (refreshedRoot) {
                            this.openSkillTreeNodePopup(refreshedRoot, nodeId);
                            this.animateSkillTreeCameraToNode(refreshedRoot, nodeId, 1.08, 620)
                                .then(() => {
                                    this.triggerSkillNodePurchaseEffect(refreshedRoot, nodeId);
                                });
                        }
                    }
                    return;
                }

                const nodeBtn = event.target.closest('.skill-tree-node[data-node-id]');
                if (nodeBtn) {
                    const nodeId = String(nodeBtn.dataset.nodeId || '').trim();
                    if (!nodeId) return;
                    this.openSkillTreeNodePopup(root, nodeId);
                    return;
                }
            });

            viewport.addEventListener('wheel', (event) => {
                if (root.classList.contains('intro-active')) return;
                if (runtime.cameraAnimating) return;
                event.preventDefault();
                runtime.userInteracted = true;
                const rect = viewport.getBoundingClientRect();
                const localX = event.clientX - rect.left;
                const localY = event.clientY - rect.top;
                const oldZoom = this.clampSkillTreeZoom(Game.state.skillTree.viewport.zoom);
                const zoomFactor = event.deltaY < 0 ? 1.12 : 0.9;
                const nextZoom = this.clampSkillTreeZoom(oldZoom * zoomFactor);
                if (Math.abs(nextZoom - oldZoom) < 0.0001) return;

                const worldX = (localX - Game.state.skillTree.viewport.panX) / oldZoom;
                const worldY = (localY - Game.state.skillTree.viewport.panY) / oldZoom;
                Game.state.skillTree.viewport.zoom = nextZoom;
                Game.state.skillTree.viewport.panX = localX - worldX * nextZoom;
                Game.state.skillTree.viewport.panY = localY - worldY * nextZoom;
                applyTransform();
            }, { passive: false });

            let dragging = false;
            let dragPointerId = null;
            let startX = 0;
            let startY = 0;
            let startPanX = 0;
            let startPanY = 0;

            viewport.addEventListener('pointerdown', (event) => {
                if (root.classList.contains('intro-active')) return;
                if (runtime.cameraAnimating) return;
                if (event.pointerType === 'mouse' && event.button !== 0) return;
                if (event.target.closest('.skill-tree-node') || event.target.closest('.skill-tree-popup')) return;
                dragging = true;
                dragPointerId = event.pointerId;
                runtime.userInteracted = true;
                startX = event.clientX;
                startY = event.clientY;
                startPanX = Game.state.skillTree.viewport.panX;
                startPanY = Game.state.skillTree.viewport.panY;
                viewport.classList.add('dragging');
                if (typeof viewport.setPointerCapture === 'function') {
                    viewport.setPointerCapture(event.pointerId);
                }
            });

            viewport.addEventListener('pointermove', (event) => {
                if (!dragging) return;
                if (dragPointerId !== null && event.pointerId !== dragPointerId) return;
                const dx = event.clientX - startX;
                const dy = event.clientY - startY;
                Game.state.skillTree.viewport.panX = startPanX + dx;
                Game.state.skillTree.viewport.panY = startPanY + dy;
                applyTransform();
            });

            const stopPointerDrag = (event) => {
                if (!dragging) return;
                if (dragPointerId !== null && event.pointerId !== dragPointerId) return;
                dragging = false;
                dragPointerId = null;
                viewport.classList.remove('dragging');
            };

            viewport.addEventListener('pointerup', stopPointerDrag);
            viewport.addEventListener('pointercancel', stopPointerDrag);

            let touchPan = null;
            let pinch = null;

            viewport.addEventListener('touchstart', (event) => {
                if (root.classList.contains('intro-active')) return;
                if (runtime.cameraAnimating) return;
                if (event.touches.length === 1) {
                    const t = event.touches[0];
                    touchPan = {
                        x: t.clientX,
                        y: t.clientY,
                        panX: Game.state.skillTree.viewport.panX,
                        panY: Game.state.skillTree.viewport.panY,
                    };
                    pinch = null;
                } else if (event.touches.length >= 2) {
                    const a = event.touches[0];
                    const b = event.touches[1];
                    const dx = b.clientX - a.clientX;
                    const dy = b.clientY - a.clientY;
                    pinch = {
                        distance: Math.hypot(dx, dy),
                        zoom: this.clampSkillTreeZoom(Game.state.skillTree.viewport.zoom),
                        midX: (a.clientX + b.clientX) * 0.5,
                        midY: (a.clientY + b.clientY) * 0.5,
                        panX: Game.state.skillTree.viewport.panX,
                        panY: Game.state.skillTree.viewport.panY,
                    };
                    touchPan = null;
                }
            }, { passive: true });

            viewport.addEventListener('touchmove', (event) => {
                if (root.classList.contains('intro-active')) return;
                if (runtime.cameraAnimating) return;
                if (event.touches.length === 1 && touchPan) {
                    event.preventDefault();
                    runtime.userInteracted = true;
                    const t = event.touches[0];
                    const dx = t.clientX - touchPan.x;
                    const dy = t.clientY - touchPan.y;
                    Game.state.skillTree.viewport.panX = touchPan.panX + dx;
                    Game.state.skillTree.viewport.panY = touchPan.panY + dy;
                    applyTransform();
                    return;
                }

                if (event.touches.length >= 2 && pinch) {
                    event.preventDefault();
                    runtime.userInteracted = true;
                    const a = event.touches[0];
                    const b = event.touches[1];
                    const rect = viewport.getBoundingClientRect();
                    const dx = b.clientX - a.clientX;
                    const dy = b.clientY - a.clientY;
                    const distance = Math.max(1, Math.hypot(dx, dy));
                    const localMidX = (a.clientX + b.clientX) * 0.5 - rect.left;
                    const localMidY = (a.clientY + b.clientY) * 0.5 - rect.top;

                    const oldZoom = pinch.zoom;
                    const nextZoom = this.clampSkillTreeZoom(pinch.zoom * (distance / Math.max(1, pinch.distance)));
                    const worldX = (localMidX - pinch.panX) / oldZoom;
                    const worldY = (localMidY - pinch.panY) / oldZoom;

                    Game.state.skillTree.viewport.zoom = nextZoom;
                    Game.state.skillTree.viewport.panX = localMidX - worldX * nextZoom;
                    Game.state.skillTree.viewport.panY = localMidY - worldY * nextZoom;
                    applyTransform();
                }
            }, { passive: false });

            viewport.addEventListener('touchend', () => {
                touchPan = null;
                pinch = null;
            });

            if (!runtime.userInteracted) {
                this.fitSkillTreeViewport(root);
            } else {
                this.applySkillTreeTransform(root);
            }
        },

        renderShopSkillTree() {
            const list = Game.elems.shopCategoryList;
            if (!list) return;

            const nodes = Game.actions.getSkillTreeNodes();
            const rootId = Game.actions.getSkillRootNodeId();
            if (!nodes.length) {
                list.innerHTML = '<p class="orders-empty">Skill tree data is missing</p>';
                return;
            }

            const visibleIds = new Set(Game.actions.getVisibleSkillNodeIds());
            visibleIds.add(rootId);
            const visibleNodes = nodes.filter((node) => node && visibleIds.has(node.id));

            const nodeRadius = 38;
            const pad = 140;
            const rootNode = nodes.find((node) => node && node.id === rootId) || null;
            const rootX = Number(rootNode?.x) || 0;
            const rootY = Number(rootNode?.y) || 0;

            // Keep the root node visually centered even when visible nodes are asymmetric.
            const maxDistX = Math.max(
                nodeRadius,
                ...visibleNodes.map((node) => Math.abs((Number(node.x) || 0) - rootX) + nodeRadius),
            );
            const maxDistY = Math.max(
                nodeRadius,
                ...visibleNodes.map((node) => Math.abs((Number(node.y) || 0) - rootY) + nodeRadius),
            );

            const minX = rootX - maxDistX;
            const maxX = rootX + maxDistX;
            const minY = rootY - maxDistY;
            const maxY = rootY + maxDistY;
            const sceneW = Math.max(520, Math.round((maxX - minX) + pad * 2));
            const sceneH = Math.max(520, Math.round((maxY - minY) + pad * 2));

            const toCanvas = (node) => {
                const cx = ((Number(node.x) || 0) - minX) + pad;
                const cy = ((Number(node.y) || 0) - minY) + pad;
                return { cx, cy };
            };

            const positionMap = {};
            visibleNodes.forEach((node) => {
                positionMap[node.id] = toCanvas(node);
            });

            const edges = [];
            visibleNodes.forEach((node) => {
                const prerequisites = Array.isArray(node.prerequisites) ? node.prerequisites : [];
                prerequisites.forEach((prevId) => {
                    if (!visibleIds.has(prevId)) return;
                    const a = positionMap[prevId];
                    const b = positionMap[node.id];
                    if (!a || !b) return;

                    const dx = b.cx - a.cx;
                    const dy = b.cy - a.cy;
                    const length = Math.max(1, Math.hypot(dx, dy));
                    const angle = Math.atan2(dy, dx) * 180 / Math.PI;
                    edges.push(`
                        <div class="skill-tree-edge" style="left:${a.cx}px; top:${a.cy}px; width:${length}px; transform:rotate(${angle}deg);"></div>
                    `);
                });
            });

            const rootPos = positionMap[rootId] || { cx: sceneW * 0.5, cy: sceneH * 0.5 };
            const getBranchCenter = (branchId, fallbackDx, fallbackDy) => {
                const branchNodes = visibleNodes.filter((node) => node && node.branch === branchId && positionMap[node.id]);
                if (!branchNodes.length) {
                    return { cx: rootPos.cx + fallbackDx, cy: rootPos.cy + fallbackDy };
                }
                const sum = branchNodes.reduce((acc, node) => {
                    acc.x += positionMap[node.id].cx;
                    acc.y += positionMap[node.id].cy;
                    return acc;
                }, { x: 0, y: 0 });
                return {
                    cx: sum.x / branchNodes.length,
                    cy: sum.y / branchNodes.length,
                };
            };

            const aiCenter = getBranchCenter('ai', 0, -170);
            const smokingCenter = getBranchCenter('smoking', -170, 55);
            const characterCenter = getBranchCenter('character', 170, 55);
            const branchGlowMarkup = `
                <div class="skill-tree-branch-glow ai" style="left:${aiCenter.cx}px; top:${aiCenter.cy}px;"></div>
                <div class="skill-tree-branch-glow smoking" style="left:${smokingCenter.cx}px; top:${smokingCenter.cy}px;"></div>
                <div class="skill-tree-branch-glow character" style="left:${characterCenter.cx}px; top:${characterCenter.cy}px;"></div>
            `;

            const selectedNodeId = this.getSkillTreeRuntime().selectedNodeId;
            const nodeMarkup = visibleNodes.map((node) => {
                const pos = positionMap[node.id];
                const purchased = Game.actions.isSkillNodePurchased(node.id);
                const availability = Game.actions.getSkillNodeAvailability(node.id);
                const stateClass = purchased ? ' purchased' : (availability.ok ? ' available' : ' locked');
                const icon = String(node.icon || '').trim() || 'images/icons/icon-sound-on.png';
                const isRootNode = node.id === rootId;
                const isSelected = selectedNodeId && node.id === selectedNodeId;
                return `
                    <button class="skill-tree-node${stateClass}${isRootNode ? ' root-core' : ''}${isSelected ? ' selected' : ''}" type="button" data-node-id="${node.id}" data-node-root="${isRootNode ? 'true' : 'false'}" style="left:${pos.cx}px; top:${pos.cy}px;" aria-label="${node.title || node.id}">
                        <img src="${icon}" alt="" aria-hidden="true">
                    </button>
                `;
            }).join('');

            list.innerHTML = `
                <section class="skill-tree-root" data-skill-tree-root>
                    <canvas class="skill-tree-starfield" data-skill-starfield-canvas aria-hidden="true"></canvas>
                    <div class="skill-tree-hud">
                        <span>Money: <strong>${Math.max(0, Math.round(Game.state.funds))}₽</strong></span>
                        <span>Prestige: <strong>${Math.max(0, Math.round(Game.state.prestige))}</strong></span>
                        <span>SP: <strong>${Math.max(0, Math.round(Game.state.skillPoints))}</strong></span>
                        <span>Butts: <strong>${Math.max(0, Math.round(Game.state.cigaretteButts))}</strong></span>
                    </div>
                    <div class="skill-tree-viewport" data-skill-tree-viewport>
                        <div class="skill-tree-canvas" data-scene-width="${sceneW}" data-scene-height="${sceneH}" data-root-cx="${rootPos.cx}" data-root-cy="${rootPos.cy}" style="width:${sceneW}px; height:${sceneH}px;">
                            <div class="skill-tree-branch-glows" aria-hidden="true">${branchGlowMarkup}</div>
                            <div class="skill-tree-edges">${edges.join('')}</div>
                            <div class="skill-tree-nodes">${nodeMarkup}</div>
                        </div>
                    </div>
                    <aside class="skill-tree-popup" data-skill-tree-popup hidden>
                        <h3 data-skill-popup-title>Node</h3>
                        <p data-skill-popup-desc></p>
                        <p class="skill-tree-popup-cost" data-skill-popup-cost></p>
                        <p class="skill-tree-popup-req" data-skill-popup-req></p>
                        <div class="skill-tree-popup-actions">
                            <button type="button" class="menu-action-btn" data-skill-node-buy>Buy node</button>
                            <button type="button" class="menu-action-btn" data-skill-node-close>Close</button>
                        </div>
                    </aside>
                    <div class="skill-tree-intro-layer" data-skill-intro-layer>
                        <div class="skill-tree-intro-singularity" data-skill-intro-singularity></div>
                        <div class="skill-tree-intro-shockwave" data-skill-intro-shockwave></div>
                        <div class="skill-tree-intro-dialog" data-skill-intro-dialog hidden>
                            <p class="skill-tree-intro-line" data-skill-intro-line></p>
                            <button type="button" class="dialog-next-btn" data-skill-intro-next>Next</button>
                        </div>
                    </div>
                </section>
            `;

            const root = list.querySelector('[data-skill-tree-root]');
            this.ensureSkillTreeStarfield(root);
            this.bindSkillTreeInteractions(root);
            if (this.shouldPlaySkillTreeIntro()) {
                this.runSkillTreeIntroSequence(root);
            } else if (root) {
                root.classList.add('intro-reveal');
                this.setSkillTreeIntroDialogVisible(root, false);
            }
        },

        renderUnlockedMenuButtons() {
            const locked = Game.state.unlockedMenus || {};
            // BitTrick hub buttons
            if (Game.elems.bittrickHubButtons) {
                Game.elems.bittrickHubButtons.forEach((btn) => {
                    const cat = btn.dataset.category;
                    if (cat && cat in locked) {
                        const isLocked = !locked[cat];
                        btn.classList.toggle('hub-btn--locked', isLocked);
                        btn.disabled = isLocked;
                    }
                });
            }
            // Shop hub buttons
            if (Game.elems.shopHubButtons) {
                Game.elems.shopHubButtons.forEach((btn) => {
                    const cat = btn.dataset.shopCategory;
                    if (cat && cat in locked) {
                        const isLocked = !locked[cat];
                        btn.classList.toggle('hub-btn--locked', isLocked);
                        btn.disabled = isLocked;
                    }
                });
            }
        },

        renderShopUpgrades() {
            const list = Game.elems.shopCategoryList;
            if (!list) return;

            const currentView = Game.state.shopMenuView || 'hub';
            if (currentView !== 'category') {
                list.innerHTML = '';
                return;
            }

            const category = Game.state.shopMenuTab || Game.config.SHOP_CATEGORIES.GOODS;
            if (category === Game.config.SHOP_CATEGORIES.GOODS) {
                this.renderShopGoodsList();
                return;
            }

            if (category === Game.config.SHOP_CATEGORIES.UPGRADES) {
                this.renderShopSkillTree();
                return;
            }

            this.renderShopPlaceholder(category);
        },

        renderAchievements() {
            const list = Game.elems.achievementsList;
            if (!list) return;
            const source = Array.isArray(window.ACHIEVEMENTS_DATA) ? window.ACHIEVEMENTS_DATA : [];
            if (!source.length) {
                list.innerHTML = '<p class="orders-empty">Nothing here yet</p>';
                return;
            }

            list.innerHTML = source.map((item) => {
                const claimed = !!Game.state.claimedAchievements[item.id];
                const unlocked = !claimed && typeof item.condition === 'function' && item.condition(Game.state);
                let stateClass = 'achievement-locked';
                let badge = '';
                let actionHtml = '';
                if (claimed) {
                    stateClass = 'achievement-claimed';
                    badge = '<span class="achievement-badge achievement-badge--claimed">Claimed</span>';
                } else if (unlocked) {
                    stateClass = 'achievement-unlocked';
                    badge = '<span class="achievement-badge achievement-badge--unlocked">Unlocked!</span>';
                    actionHtml = `<button class="achievement-claim-btn" data-achievement-id="${item.id}" type="button">Claim ${item.rewardDisplay || ''}</button>`;
                }
                return `
                    <article class="upgrade-item ${stateClass}">
                        <div class="achievement-header">
                            <h3 class="upgrade-title">${item.title}</h3>
                            ${badge}
                        </div>
                        <p class="upgrade-meta">${item.description}</p>
                        <p class="upgrade-meta">Reward: <strong>${item.rewardDisplay || '---'}</strong></p>
                        ${actionHtml}
                    </article>`;
            }).join('');

            list.addEventListener('click', (e) => {
                const btn = e.target.closest('.achievement-claim-btn');
                if (!btn) return;
                Game.actions.applyAchievementReward(btn.dataset.achievementId);
            }, { once: true });

            this.applyDigitsTypography(list);
        },

        renderAudioToggles() {
            if (Game.elems.sfxToggle) {
                Game.elems.sfxToggle.setAttribute('aria-pressed', Game.state.audio.sfxEnabled ? 'true' : 'false');
                Game.elems.sfxToggle.setAttribute('aria-label', Game.state.audio.sfxEnabled ? 'SFX On' : 'SFX Off');
            }
            if (Game.elems.sfxIcon) {
                Game.elems.sfxIcon.src = Game.state.audio.sfxEnabled
                    ? 'images/icons/icon-sound-on.png'
                    : 'images/icons/icon-sound-off.png';
            }
            if (Game.elems.musicToggle) {
                Game.elems.musicToggle.setAttribute('aria-pressed', Game.state.audio.musicEnabled ? 'true' : 'false');
                Game.elems.musicToggle.setAttribute('aria-label', Game.state.audio.musicEnabled ? 'Music On' : 'Music Off');
            }
            if (Game.elems.musicIcon) {
                Game.elems.musicIcon.src = Game.state.audio.musicEnabled
                    ? 'images/icons/icon-music-on.png'
                    : 'images/icons/icon-music-off.png';
            }
        },

        refreshLangToggle() {
            const lang = Game.state.language || 'ru';
            if (Game.elems.langBtnEn) Game.elems.langBtnEn.classList.toggle('active', lang === 'en');
            if (Game.elems.langBtnRu) Game.elems.langBtnRu.classList.toggle('active', lang === 'ru');
        },

        renderStats() {
            const panel = Game.elems.statsPanel;
            if (!panel) return;

            const stats = Game.state.stats;
            const formatInt = (value) => Math.max(0, Math.round(Number(value) || 0)).toLocaleString('en-US');
            const formatMoney = (value) => `${formatInt(value)}₽`;
            const searchMs = Math.max(1, Math.round(Number(Game.state.currentJobSearchIntervalMs) || Game.actions.getJobSearchIntervalMs()));
            const searchSec = (searchMs / 1000).toFixed(2);
            const transferPct = Math.round(Game.actions.getEffectivePrestigeTransferRatio() * 100);

            const sections = [
                {
                    title: 'Performance',
                    rows: [
                        ['Completed orders', formatInt(stats.completedOrders)],
                        ['Failed orders', formatInt(stats.failedOrders)],
                        ['Manual generations', formatInt(stats.manualGenerations)],
                        ['Auto generations', formatInt(stats.autogenGenerations)],
                    ],
                },
                {
                    title: 'Economy',
                    rows: [
                        ['Money earned', formatMoney(stats.totalMoneyEarned)],
                        ['Money spent', formatMoney(stats.totalMoneySpent)],
                        ['Job search interval', `${searchSec}s`],
                    ],
                },
                {
                    title: 'Prestige & Rep',
                    rows: [
                        ['Prestige', formatInt(Game.state.prestige)],
                        ['Prestige pool', formatInt(Game.state.virtualPrestigePool)],
                        ['Pool transfer', `${transferPct}%`],
                        ['Skill points', formatInt(Game.state.skillPoints)],
                        ['Expert points', formatInt(Game.state.expertPoints)],
                    ],
                },
                {
                    title: 'Habits',
                    rows: [
                        ['Cigarettes', formatInt(Game.state.goods.cigarettes)],
                        ['Cigarette butts', formatInt(Game.state.cigaretteButts)],
                        ['Smoke breaks', formatInt(stats.totalSmokeBreaks)],
                        ['Stress relieved', formatInt(stats.stressRelievedByCigarettes)],
                        ['Butts earned', formatInt(stats.totalCigaretteButtsEarned)],
                        ['Butts spent', formatInt(stats.totalCigaretteButtsSpent)],
                    ],
                },
            ];

            panel.innerHTML = sections.map(({ title, rows }) => `
                <div class="stats-section">
                    <h3 class="stats-section-title">${title}</h3>
                    ${rows.map(([label, value]) => `<div class="stats-row"><span class="stats-label">${label}</span><strong class="stats-value">${value}</strong></div>`).join('')}
                </div>
            `).join('');
            this.applyDigitsTypography(panel);
        },

        renderAutogenToggle() {
            const panel = Game.elems.autogenTogglePanel;
            const btn = Game.elems.autogenToggle;
            const label = Game.elems.autogenToggleLabel;
            if (!btn || !label) return;

            const purchased = !!Game.state.upgrades.autogen;
            const enabled = purchased && Game.state.autogenEnabled;

            if (panel) {
                panel.classList.toggle('visible', purchased);
            }

            btn.classList.toggle('on', enabled);
            btn.classList.toggle('off', !enabled);
            btn.classList.toggle('unavailable', !purchased);
            btn.disabled = !purchased;
            btn.setAttribute('aria-pressed', enabled ? 'true' : 'false');

            if (!purchased) {
                label.innerHTML = 'AUTO<br>LOCK';
                btn.setAttribute('aria-label', 'Autogen is unavailable until purchase');
                return;
            }

            label.innerHTML = enabled ? 'AUTO<br>ON' : 'AUTO<br>OFF';
            btn.setAttribute('aria-label', enabled ? 'AUTO enabled' : 'AUTO disabled');
        },

        openOverlay(overlay) {
            if (!overlay) return;
            if (Game.actions.isTutorialOverlayInteractionBlocked(overlay)) return;
            overlay.classList.add('active');
            overlay.setAttribute('aria-hidden', 'false');

             if (overlay === Game.elems.ordersMenu) {
                this.showOrdersHubView();
                Game.actions.tryShowOrdersHubTutorialHint();
            }

            if (overlay === Game.elems.shopMenu) {
                this.showShopHubView();
                this.renderShopUpgrades();
                Game.actions.tryShowShopOpenComment();
            }

            if (overlay === Game.elems.achievementsMenu) {
                Game.actions.checkAchievements();
                Game.actions.tryShowAchievementsOpenComment();
            }

            if (overlay === Game.elems.statsMenu) {
                Game.actions.tryShowStatsOpenComment();
            }

            if (overlay === Game.elems.mainMenuOverlay) {
                Game.intro.notify('menu_opened');
            } else if (overlay === Game.elems.ordersMenu) {
                Game.intro.notify('orders_opened');
            }
        },

        closeAllOverlays(overlays) {
            const wasMainOpen = !!(Game.elems.mainMenuOverlay && Game.elems.mainMenuOverlay.classList.contains('active'));
            const wasShopOpen = !!(Game.elems.shopMenu && Game.elems.shopMenu.classList.contains('active'));
            overlays.forEach((overlay) => {
                if (!overlay) return;
                overlay.classList.remove('active');
                overlay.setAttribute('aria-hidden', 'true');
            });

            if (wasShopOpen) {
                this.showShopHubView();
            }

            if (wasMainOpen) {
                Game.intro.notify('menu_closed');
            }
        },
    },

    intro: {
        queue: [],
        pointer: 0,
        doneCallback: null,
        flowId: 0,
        choiceResolved: false,
        typing: {
            active: false,
            timerId: null,
            fullText: '',
            htmlText: '',
            currentIndex: 0,
            targetElement: null,
            onDone: null,
            allowHtml: false,
        },

        setSkipButtonVisible(visible) {
            const button = Game.elems.cinematicSkipBtn;
            if (!button) return;
            button.style.display = visible ? '' : 'none';
            button.setAttribute('aria-hidden', visible ? 'false' : 'true');
        },

        startIfNeeded() {
            if (Game.state.tutorialCompleted) return;
            Game.state.introStarted = true;
            Game.state.tutorialMode = true;
            Game.state.characterRevealed = false;
            Object.keys(Game.state.tutorialUi).forEach((feature) => {
                Game.state.tutorialUi[feature] = false;
            });
            Game.state.savedJobChanceBeforeTutorial = Game.state.job_chance;
            Game.state.job_chance = 0;
            Game.state.zenEnabled = false;
            Game.ui.syncCharacterVisibility();
            Game.ui.applyTutorialUiVisibility();
            Game.persist.save();

            if (Game.elems.container) {
                Game.elems.container.classList.add('cinematic-mode');
            }
            this.setSkipButtonVisible(true);
            this.setCinematicBackdropMode('blackout', { ensureActive: true, resetLayers: true });

            this.play(Array.isArray(window.TUTORIAL_SEQUENCE?.cinematic) ? window.TUTORIAL_SEQUENCE.cinematic : [], null);
        },

        play(sequence, done) {
            this.flowId += 1;
            this.queue = sequence.slice();
            this.pointer = 0;
            this.doneCallback = typeof done === 'function' ? done : null;
            this.next();
        },

        scheduleForCurrentFlow(ms, callback) {
            const flowId = this.flowId;
            window.setTimeout(() => {
                if (this.flowId !== flowId) return;
                callback();
            }, Math.max(0, Number(ms) || 0));
        },

        next() {
            if (this.pointer >= this.queue.length) {
                if (this.doneCallback) {
                    const callback = this.doneCallback;
                    this.doneCallback = null;
                    callback();
                }
                return;
            }

            const step = this.queue[this.pointer];
            this.pointer += 1;
            this.runStep(step);
        },

        runStep(step) {
            if (!step || !step.type) {
                this.next();
                return;
            }

            if (step.type === 'set_zen') {
                Game.state.zenEnabled = !!step.enabled;
                this.next();
                return;
            }

            if (step.type === 'add_stress') {
                Game.actions.addStress(Number(step.amount) || 0);
                this.next();
                return;
            }

            if (step.type === 'edge_fx') {
                Game.ui.triggerEdgeFx(step.color || 'red', step.ms || 800);
                this.next();
                return;
            }

            if (step.type === 'force_smoke') {
                Game.actions.startSmokeBreak();
                this.next();
                return;
            }

            if (step.type === 'force_story_order') {
                Game.actions.ensureStoryOrderInQueue();
                Game.ui.renderOrdersList();
                Game.ui.updateCounters();
                this.next();
                return;
            }

            if (step.type === 'wait') {
                this.scheduleForCurrentFlow(step.ms, () => this.next());
                return;
            }

            if (step.type === 'flash') {
                if (Game.elems.cinematicFlash) {
                    const flashMs = Math.max(120, Number(step.ms) || 220);
                    Game.elems.cinematicFlash.classList.add('active');
                    this.scheduleForCurrentFlow(flashMs, () => {
                        Game.elems.cinematicFlash.classList.remove('active');
                        this.next();
                    });
                    return;
                }
                this.next();
                return;
            }

            if (step.type === 'reveal_ui') {
                if (Array.isArray(step.features)) {
                    step.features.forEach((feature) => Game.ui.revealTutorialFeature(feature));
                } else if (step.feature) {
                    Game.ui.revealTutorialFeature(step.feature);
                }
                this.next();
                return;
            }

            if (step.type === 'reveal_scene') {
                this.setCinematicBackdropMode('scene', { ensureActive: true });
                if (Game.elems.cinematicSplit) {
                    Game.elems.cinematicSplit.classList.add('active');
                }
                this.scheduleForCurrentFlow(1300, () => this.next());
                return;
            }

            if (step.type === 'phone') {
                if (!Game.elems.phoneHand) {
                    this.next();
                    return;
                }
                if (step.action === 'show') {
                    Game.elems.phoneHand.classList.add('visible');
                    Game.elems.phoneHand.classList.remove('to-ear');
                } else {
                    Game.elems.phoneHand.classList.add('to-ear');
                    this.scheduleForCurrentFlow(520, () => {
                        Game.elems.phoneHand.classList.remove('visible');
                    });
                }
                this.scheduleForCurrentFlow(300, () => this.next());
                return;
            }

            if (step.type === 'sfx') {
                Game.audio.playSfx(step.key);
                this.next();
                return;
            }

            if (step.type === 'thought') {
                this.openThought(step.text || '...');
                return;
            }

            if (step.type === 'dialog') {
                this.openDialog(step.speaker || 'mc', step.text || '', step.fxToken || null, step.spotlight || null);
                return;
            }

            if (step.type === 'choice') {
                this.openChoice();
                return;
            }

            if (step.type === 'wait_menu_cycle') {
                this.waitForMenuCycle(step.spotlight || '#menu-btn');
                return;
            }

            if (step.type === 'wait_story_started') {
                this.waitForStoryStarted();
                return;
            }

            this.next();
        },

        beginWait(type) {
            Game.state.tutorialWait.waiting = true;
            Game.state.tutorialWait.type = type;
        },

        endWait() {
            Game.state.tutorialWait.waiting = false;
            Game.state.tutorialWait.type = null;
            Game.state.tutorialWait.menuOpened = false;
        },

        waitForMenuCycle(spotlightSelector) {
            this.beginWait('menu_cycle');
            this.applySpotlight(spotlightSelector || '#menu-btn');
        },

        waitForStoryStarted() {
            this.beginWait('story_started');
            this.applySpotlight('#orders-btn');
        },

        notify(eventName) {
            if (!Game.state.tutorialWait.waiting) return;

            if (Game.state.tutorialWait.type === 'menu_cycle') {
                if (eventName === 'menu_opened') {
                    Game.state.tutorialWait.menuOpened = true;
                }
                if (eventName === 'menu_closed' && Game.state.tutorialWait.menuOpened) {
                    this.clearSpotlight();
                    this.endWait();
                    this.next();
                }
                return;
            }

            if (Game.state.tutorialWait.type === 'story_started' && eventName === 'story_started') {
                this.clearSpotlight();
                this.endWait();
                this.next();
                return;
            }

            if (Game.state.tutorialWait.type === 'story_started' && eventName === 'orders_opened') {
                this.clearSpotlight();
            }
        },

        openThought(text) {
            Game.actions.pauseGameLogic();
            Game.state.dialogActive = true;
            this.clearSpotlight();

            if (Game.elems.thoughtBox) {
                Game.elems.thoughtBox.classList.add('visible');
            }

            if (Game.elems.thoughtText) {
                this.typeText(text, Game.elems.thoughtText, { allowHtml: false });
            }
        },

        closeThought() {
            if (this.isTyping()) {
                this.finishTypingInstant();
                return;
            }
            if (!Game.state.dialogActive) return;
            if (Game.elems.thoughtBox) {
                Game.elems.thoughtBox.classList.remove('visible');
            }
            Game.state.dialogActive = false;
            Game.actions.resumeGameLogic();
            this.next();
        },

        openDialog(speaker, text, fxToken, spotlightSelector) {
            Game.actions.pauseGameLogic();
            Game.state.dialogActive = true;

            const isChat = speaker === 'chatdjbt';
            if (Game.elems.vnDialog) {
                Game.elems.vnDialog.classList.add('visible');
                Game.elems.vnDialog.classList.toggle('chat-theme', isChat);
                Game.elems.vnDialog.classList.toggle('gg-theme', !isChat);
            }
            if (Game.elems.vnSpeakerName) {
                Game.elems.vnSpeakerName.textContent = isChat ? 'ChatDJBT' : 'MC';
            }
            if (Game.elems.vnSpeakerIcon) {
                Game.elems.vnSpeakerIcon.src = isChat ? 'images/cinematic/chatdjbt-icon.png' : 'images/cinematic/gg-icon.png';
                Game.elems.vnSpeakerIcon.alt = isChat ? 'ChatDJBT icon' : 'MC icon';
            }
            if (Game.elems.vnText) {
                const parsedText = fxToken === 'vibrate_designer'
                    ? text.replace('designer', '<span class="token-vibrate">designer</span>')
                    : text;
                this.typeText(parsedText, Game.elems.vnText, { allowHtml: true });
            }

            this.applySpotlight(spotlightSelector);
        },

        closeDialog() {
            if (this.isTyping()) {
                this.finishTypingInstant();
                return;
            }
            if (!Game.state.dialogActive) return;
            if (Game.elems.vnDialog) {
                Game.elems.vnDialog.classList.remove('visible');
            }
            this.clearSpotlight();
            Game.state.dialogActive = false;
            Game.actions.resumeGameLogic();
            this.next();
        },

        openChoice() {
            Game.actions.pauseGameLogic();
            this.choiceResolved = false;
            if (Game.elems.tutorialChoice) {
                Game.elems.tutorialChoice.classList.add('visible');
                Game.elems.tutorialChoice.setAttribute('aria-hidden', 'false');
            }
        },

        choosePath(skip) {
            if (this.choiceResolved) return;
            this.choiceResolved = true;
            this.setSkipButtonVisible(false);
            if (Game.elems.tutorialChoice) {
                Game.elems.tutorialChoice.classList.remove('visible');
                Game.elems.tutorialChoice.setAttribute('aria-hidden', 'true');
            }
            this.clearSpotlight();

            Game.state.tutorialSkipped = !!skip;
            if (skip) {
                Game.actions.markAllMenuTutorialSeen();
                Game.ui.revealAllTutorialFeatures();
                Game.state.characterRevealed = true;
                Game.ui.syncCharacterVisibility();
                Game.actions.ensureStoryOrderInQueue();
                Game.ui.renderOrdersList();
                Game.ui.updateCounters();
            }
            const sequence = skip
                ? (window.TUTORIAL_SEQUENCE?.skipLeadIn || [])
                : (window.TUTORIAL_SEQUENCE?.tutorialLeadIn || []);

            this.play(sequence, () => {
                this.finishCinematicAndSpawnStoryOrder();
            });
        },

        skipToChoice() {
            this.flowId += 1;
            this.queue = [];
            this.pointer = 0;
            this.doneCallback = null;
            this.clearSpotlight();

            this.clearTypingTimer();
            if (this.typing.targetElement) {
                this.typing.targetElement.classList.remove('typing-cursor');
            }
            this.typing.active = false;
            this.typing.fullText = '';
            this.typing.htmlText = '';
            this.typing.allowHtml = false;
            this.typing.targetElement = null;
            this.typing.onDone = null;

            if (Game.elems.thoughtBox) {
                Game.elems.thoughtBox.classList.remove('visible');
            }
            if (Game.elems.vnDialog) {
                Game.elems.vnDialog.classList.remove('visible');
            }
            if (Game.elems.tutorialChoice) {
                Game.elems.tutorialChoice.classList.remove('visible');
                Game.elems.tutorialChoice.setAttribute('aria-hidden', 'true');
            }
            Game.state.dialogActive = false;
            this.choiceResolved = false;

            const sceneAlreadyOpened = !!(Game.elems.cinematicBlack && Game.elems.cinematicBlack.classList.contains('scene-opened'));
            if (!sceneAlreadyOpened) {
                this.setCinematicBackdropMode('scene', { ensureActive: true });
                if (Game.elems.cinematicSplit) {
                    Game.elems.cinematicSplit.classList.add('active');
                }

                window.setTimeout(() => {
                    if (Game.elems.cinematicSplit) {
                        Game.elems.cinematicSplit.classList.remove('active');
                    }
                    this.choosePath(true);
                }, 1300);
                return;
            }

            this.choosePath(true);
        },

        isTyping() {
            return !!this.typing.active;
        },

        clearTypingTimer() {
            if (this.typing.timerId) {
                window.clearTimeout(this.typing.timerId);
                this.typing.timerId = null;
            }
        },

        sanitizeForTypewriter(text) {
            const html = String(text || '');
            return html.replace(/<[^>]+>/g, '');
        },

        typeText(text, element, options = {}) {
            if (!element) return;

            this.clearTypingTimer();
            const allowHtml = !!options.allowHtml;
            const htmlText = allowHtml ? String(text || '') : '';
            const fullText = allowHtml ? this.sanitizeForTypewriter(text) : String(text || '');

            this.typing.active = true;
            this.typing.fullText = fullText;
            this.typing.htmlText = htmlText;
            this.typing.currentIndex = 0;
            this.typing.targetElement = element;
            this.typing.allowHtml = allowHtml;
            this.typing.onDone = typeof options.onDone === 'function' ? options.onDone : null;

            element.textContent = '';
            element.classList.add('typing-cursor');

            const tick = () => {
                if (!this.typing.active) return;
                this.typing.currentIndex += 1;
                element.textContent = this.typing.fullText.slice(0, this.typing.currentIndex);

                if (this.typing.currentIndex >= this.typing.fullText.length) {
                    this.finishTypingInstant();
                    return;
                }

                const char = this.typing.fullText[this.typing.currentIndex - 1];
                const delay = /[.,!?;:]/.test(char) ? 38 : 18;
                this.typing.timerId = window.setTimeout(tick, delay);
            };

            this.typing.timerId = window.setTimeout(tick, 12);
        },

        finishTypingInstant() {
            if (!this.typing.targetElement) return;

            this.clearTypingTimer();
            if (this.typing.allowHtml) {
                this.typing.targetElement.innerHTML = this.typing.htmlText;
            } else {
                this.typing.targetElement.textContent = this.typing.fullText;
            }
            this.typing.targetElement.classList.remove('typing-cursor');

            const done = this.typing.onDone;
            this.typing.active = false;
            this.typing.fullText = '';
            this.typing.htmlText = '';
            this.typing.allowHtml = false;
            this.typing.targetElement = null;
            this.typing.onDone = null;

            if (done) done();
        },

        applySpotlight(selector) {
            const ring = Game.elems.spotlightRing;
            if (!ring || !selector) {
                this.clearSpotlight();
                return;
            }

            const target = document.querySelector(selector);
            const overlay = Game.elems.cinematicOverlay;
            if (!target || !overlay) {
                this.clearSpotlight();
                return;
            }

            const targetRect = target.getBoundingClientRect();
            const overlayRect = overlay.getBoundingClientRect();
            const pad = 8;

            ring.style.left = `${Math.max(0, targetRect.left - overlayRect.left - pad)}px`;
            ring.style.top = `${Math.max(0, targetRect.top - overlayRect.top - pad)}px`;
            ring.style.width = `${Math.max(0, targetRect.width + pad * 2)}px`;
            ring.style.height = `${Math.max(0, targetRect.height + pad * 2)}px`;
            ring.classList.add('visible');
            overlay.classList.add('spotlight-on');
        },

        clearSpotlight() {
            if (Game.elems.spotlightRing) {
                Game.elems.spotlightRing.classList.remove('visible');
            }
            if (Game.elems.cinematicOverlay) {
                Game.elems.cinematicOverlay.classList.remove('spotlight-on');
            }
        },

        resetCinematicLayers() {
            if (Game.elems.cinematicSplit) {
                Game.elems.cinematicSplit.classList.remove('active');
            }
            if (Game.elems.cinematicFlash) {
                Game.elems.cinematicFlash.classList.remove('active');
            }
            if (Game.elems.phoneHand) {
                Game.elems.phoneHand.classList.remove('visible', 'to-ear');
            }
            this.clearSpotlight();
        },

        setCinematicBackdropMode(mode, options = {}) {
            const overlay = Game.elems.cinematicOverlay;
            const black = Game.elems.cinematicBlack;
            const ensureActive = options.ensureActive !== false;
            const resetLayers = !!options.resetLayers;

            if (resetLayers) {
                this.resetCinematicLayers();
            }

            if (overlay) {
                if (ensureActive) {
                    overlay.classList.add('active');
                    overlay.setAttribute('aria-hidden', 'false');
                } else {
                    overlay.classList.remove('active');
                    overlay.setAttribute('aria-hidden', 'true');
                }
            }

            if (!black) return;

            if (mode === 'scene' || mode === 'transparent') {
                black.classList.add('scene-opened');
                return;
            }

            black.classList.remove('scene-opened');
        },

        finishCinematicAndSpawnStoryOrder() {
            if (Game.state.introCompleted) return;
            Game.state.dialogActive = false;
            Game.actions.resumeGameLogic();
            this.setSkipButtonVisible(false);
            this.setCinematicBackdropMode('blackout', { ensureActive: false, resetLayers: true });
            if (Game.elems.container) {
                Game.elems.container.classList.remove('cinematic-mode');
            }

            Game.state.introCompleted = true;
            Game.actions.ensureStoryOrderInQueue();
            Game.ui.renderOrdersList();
            Game.ui.updateCounters();
            Game.persist.save();
        },

        playPostStoryOutro() {
            this.play(window.TUTORIAL_SEQUENCE?.postStory || [], () => {
                Game.actions.completeTutorialFlow();
            });
            this.setCinematicBackdropMode('transparent', { ensureActive: true, resetLayers: true });
        },
    },

    actions: {
        randomInt(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        },

        addMoneyEarned(amount) {
            const value = Math.max(0, Math.round(Number(amount) || 0));
            if (!value) return;
            Game.state.stats.totalMoneyEarned += value;
            Game.ui.renderStats();
        },

        addMoneySpent(amount) {
            const value = Math.max(0, Math.round(Number(amount) || 0));
            if (!value) return;
            Game.state.stats.totalMoneySpent += value;
            Game.ui.renderStats();
        },

        addSkillPoints(amount) {
            const value = Math.max(0, Math.round(Number(amount) || 0));
            if (!value) return;
            Game.state.skillPoints += value;
            Game.ui.renderStats();
        },

        addCigaretteButts(amount) {
            const value = Math.max(0, Math.round(Number(amount) || 0));
            if (!value) return;
            Game.state.cigaretteButts += value;
            Game.state.stats.totalCigaretteButtsEarned += value;
            Game.ui.renderStats();
        },

        clamp(value, min, max) {
            return Math.max(min, Math.min(max, value));
        },

        isSmokingNow() {
            return Date.now() < Game.state.smokeUntil;
        },

        isLogicPaused() {
            return Game.state.gamePausedByDialog;
        },

        isTutorialOverlayInteractionBlocked(overlay) {
            if (!overlay) return false;
            if (!Game.state.tutorialMode) return false;
            if (!Game.state.dialogActive) return false;

            return overlay === Game.elems.mainMenuOverlay
                || overlay === Game.elems.ordersMenu
                || overlay === Game.elems.shopMenu
                || overlay === Game.elems.achievementsMenu
                || overlay === Game.elems.statsMenu;
        },

        pauseGameLogic() {
            if (Game.state.gamePausedByDialog) return;
            const now = Date.now();

            if (Game.state.activeOrder) {
                const hasFiniteDeadline = Number.isFinite(Number(Game.state.activeOrder.deadlineAt));
                Game.state.pausedOrderRemainingMs = hasFiniteDeadline
                    ? Math.max(0, Game.state.activeOrder.deadlineAt - now)
                    : Number.POSITIVE_INFINITY;
            }
            Game.state.pausedSmokeRemainingMs = Math.max(0, Game.state.smokeUntil - now);
            Game.state.smokeReliefLastTickAt = now;
            Game.state.pausedCooldownRemainingMs = Math.max(0, Game.state.generationCooldownUntil - now);
            Game.state.gamePausedByDialog = true;
            Game.ui.refreshGenerateButton();
        },

        resumeGameLogic() {
            if (!Game.state.gamePausedByDialog) return;
            const now = Date.now();

            if (Game.state.activeOrder) {
                const remaining = Math.max(0, Game.state.pausedOrderRemainingMs);
                if (Number.isFinite(remaining)) {
                    Game.state.activeOrder.deadlineAt = now + remaining;
                    if (Number.isFinite(Number(Game.state.activeOrder.durationMs))) {
                        Game.state.activeOrder.startedAt = Game.state.activeOrder.deadlineAt - Game.state.activeOrder.durationMs;
                    }
                } else {
                    Game.state.activeOrder.deadlineAt = Number.POSITIVE_INFINITY;
                }
            }

            Game.state.smokeUntil = now + Math.max(0, Game.state.pausedSmokeRemainingMs);
            Game.state.smokeReliefLastTickAt = now;
            Game.state.generationCooldownUntil = now + Math.max(0, Game.state.pausedCooldownRemainingMs);

            Game.state.pausedOrderRemainingMs = 0;
            Game.state.pausedSmokeRemainingMs = 0;
            Game.state.pausedCooldownRemainingMs = 0;
            Game.state.gamePausedByDialog = false;
            Game.ui.refreshGenerateButton();
        },

        getEffectiveJobChance() {
            const levelFactor = 1 + (Game.state.level - 1) * 0.02;
            const prestigeFactor = 1 + Game.state.prestige * 0.025;
            const knownnessFactor = 1 + Game.state.knownness * 0.03;
            const boosted = (Game.state.job_chance + Game.state.storyChanceBonus) * levelFactor * prestigeFactor * knownnessFactor;
            return this.clamp(boosted, 0, 0.75);
        },

        getEffectivePrestigeTransferRatio() {
            const base = Number(Game.config.DEFAULT_PRESTIGE_TRANSFER_RATIO) || 0;
            const bonus = Number(Game.state.prestigeTransferRatioBonus) || 0;
            return this.clamp(base + bonus, 0, 1);
        },

        getSkillTreeData() {
            const data = window.SKILL_TREE_DATA;
            return data && typeof data === 'object' ? data : null;
        },

        getSkillTreeNodes() {
            const data = this.getSkillTreeData();
            return Array.isArray(data?.nodes) ? data.nodes : [];
        },

        getSkillNode(nodeId) {
            const key = String(nodeId || '').trim();
            if (!key) return null;
            return this.getSkillTreeNodes().find((node) => node && node.id === key) || null;
        },

        getSkillRootNodeId() {
            const data = this.getSkillTreeData();
            return String(data?.rootNodeId || 'core_designer');
        },

        getForestBranchNodeIds() {
            return this.getSkillTreeNodes()
                .filter((node) => node && node.branch === 'forest')
                .map((node) => node.id);
        },

        isSkillNodePurchased(nodeId) {
            return !!Game.state.skillTree.purchased[String(nodeId || '').trim()];
        },

        markSkillNodePurchased(nodeId) {
            const key = String(nodeId || '').trim();
            if (!key) return;
            Game.state.skillTree.purchased[key] = true;
        },

        getSkillTreeAdjacencyMap() {
            const nodes = this.getSkillTreeNodes();
            const map = {};
            nodes.forEach((node) => {
                if (!node?.id) return;
                map[node.id] = map[node.id] || new Set();
            });

            nodes.forEach((node) => {
                if (!node?.id) return;
                const prerequisites = Array.isArray(node.prerequisites) ? node.prerequisites : [];
                prerequisites.forEach((prevId) => {
                    if (!map[prevId]) {
                        map[prevId] = new Set();
                    }
                    map[node.id].add(prevId);
                    map[prevId].add(node.id);
                });
            });
            return map;
        },

        syncSkillTreeLegacyPurchases() {
            const mapping = {
                autogen: 'ai_autogen',
                headhunter: 'ai_headhunter',
                brandmentor: 'ai_brandmentor',
            };
            Object.keys(mapping).forEach((upgradeId) => {
                if (Game.state.upgrades[upgradeId]) {
                    this.markSkillNodePurchased(mapping[upgradeId]);
                }
            });
        },

        ensureForestUnlockByLevel() {
            const data = this.getSkillTreeData();
            const neededLevel = Math.max(1, Math.round(Number(data?.forestUnlockLevel) || 10));
            if (Game.state.level >= neededLevel) {
                Game.state.skillTree.forestUnlockedPermanently = true;
            }
        },

        isForestBranchVisible() {
            this.ensureForestUnlockByLevel();
            return !!Game.state.skillTree.forestUnlockedPermanently;
        },

        getVisibleSkillNodeIds() {
            const nodes = this.getSkillTreeNodes();
            if (!nodes.length) return [];

            const rootId = this.getSkillRootNodeId();
            const adjacency = this.getSkillTreeAdjacencyMap();
            const visible = new Set([rootId]);
            const purchased = new Set(
                Object.keys(Game.state.skillTree.purchased).filter((id) => Game.state.skillTree.purchased[id]),
            );

            const forestVisible = this.isForestBranchVisible();

            // Always keep purchased nodes and their neighbors visible.
            purchased.forEach((nodeId) => {
                const node = this.getSkillNode(nodeId);
                if (!node) return;
                if (node.branch === 'forest' && !forestVisible) return;

                visible.add(nodeId);
                const linked = adjacency[nodeId] || new Set();
                linked.forEach((nextId) => {
                    const nextNode = this.getSkillNode(nextId);
                    if (!nextNode) return;
                    if (nextNode.branch === 'forest' && !forestVisible) return;
                    visible.add(nextId);
                });
            });

            // Show any node that is currently available for purchase.
            nodes.forEach((node) => {
                if (!node?.id) return;
                if (node.branch === 'forest' && !forestVisible) return;
                const availability = this.getSkillNodeAvailability(node.id);
                if (availability.ok) {
                    visible.add(node.id);
                }
            });

            return nodes
                .filter((node) => {
                    if (!node?.id) return false;
                    if (node.branch === 'forest' && !forestVisible) return false;
                    return visible.has(node.id) || !!node.isRoot;
                })
                .map((node) => node.id);
        },

        evaluateSkillNodeRequirements(node) {
            if (!node) {
                return { ok: false, reasons: ['Node not found'] };
            }

            const reasons = [];
            const requirements = node.requirements && typeof node.requirements === 'object'
                ? node.requirements
                : {};

            const levelNeed = Math.max(0, Math.round(Number(requirements.level) || 0));
            if (levelNeed > 0 && Game.state.level < levelNeed) {
                reasons.push(`Need level ${levelNeed}`);
            }

            const prestigeNeed = Math.max(0, Math.round(Number(requirements.prestige) || 0));
            if (prestigeNeed > 0 && Game.state.prestige < prestigeNeed) {
                reasons.push(`Need prestige ${prestigeNeed}`);
            }

            const smokedNeed = Math.max(0, Math.round(Number(requirements.smoked) || 0));
            const smokedNow = Math.max(0, Math.round(Number(Game.state.stats.totalSmokeBreaks) || 0));
            if (smokedNeed > 0 && smokedNow < smokedNeed) {
                reasons.push(`Need ${smokedNeed} cigarettes smoked`);
            }

            if (requirements.forestUnlocked && !this.isForestBranchVisible()) {
                reasons.push('Forest branch is locked');
            }

            const researchTaskId = String(
                requirements.researchTaskCompleted
                || requirements.researchTaskId
                || '',
            ).trim();
            if (researchTaskId) {
                const done = this.getResearchTaskCompletions(researchTaskId) > 0;
                if (!done) {
                    const templates = Array.isArray(Game.config.RESEARCH_TASKS) ? Game.config.RESEARCH_TASKS : [];
                    const template = templates.find((item) => item && String(item.id || '').trim() === researchTaskId);
                    const displayName = String(template?.title || requirements.researchTaskTitle || researchTaskId).trim();
                    reasons.push(`Need research: ${displayName}`);
                }
            }

            const prerequisites = Array.isArray(node.prerequisites) ? node.prerequisites : [];
            prerequisites.forEach((prevId) => {
                if (!this.isSkillNodePurchased(prevId) && prevId !== this.getSkillRootNodeId()) {
                    const prev = this.getSkillNode(prevId);
                    reasons.push(`Need ${prev?.title || prevId}`);
                }
            });

            return {
                ok: reasons.length === 0,
                reasons,
            };
        },

        getSkillNodeCosts(node) {
            const source = node && typeof node.costs === 'object' ? node.costs : {};
            return {
                money: Math.max(0, Math.round(Number(source.money) || 0)),
                prestige: Math.max(0, Math.round(Number(source.prestige) || 0)),
                skillPoints: Math.max(0, Math.round(Number(source.skillPoints) || 0)),
                butts: Math.max(0, Math.round(Number(source.butts) || 0)),
            };
        },

        getSkillNodeAffordability(node) {
            const costs = this.getSkillNodeCosts(node);
            const reasons = [];
            if (Game.state.funds < costs.money) reasons.push('Not enough money');
            if (Game.state.prestige < costs.prestige) reasons.push('Not enough prestige');
            if (Game.state.skillPoints < costs.skillPoints) reasons.push('Not enough skill points');
            if (Game.state.cigaretteButts < costs.butts) reasons.push('Not enough butts');
            return {
                costs,
                affordable: reasons.length === 0,
                reasons,
            };
        },

        getSkillNodeAvailability(nodeId) {
            const node = this.getSkillNode(nodeId);
            if (!node) {
                return { ok: false, reasons: ['Node not found'], node: null, purchased: false, costs: this.getSkillNodeCosts(null) };
            }

            const purchased = this.isSkillNodePurchased(node.id);
            if (purchased) {
                return {
                    ok: false,
                    reasons: ['Already purchased'],
                    node,
                    purchased: true,
                    costs: this.getSkillNodeCosts(node),
                };
            }

            if (node.branch === 'forest' && !this.isForestBranchVisible()) {
                return {
                    ok: false,
                    reasons: ['Forest branch is hidden'],
                    node,
                    purchased: false,
                    costs: this.getSkillNodeCosts(node),
                };
            }

            const requirementCheck = this.evaluateSkillNodeRequirements(node);
            const affordability = this.getSkillNodeAffordability(node);
            const reasons = [...requirementCheck.reasons, ...affordability.reasons];

            return {
                ok: requirementCheck.ok && affordability.affordable,
                reasons,
                node,
                purchased: false,
                costs: affordability.costs,
            };
        },

        applySkillNodeEffects(node) {
            const effects = Array.isArray(node?.effects) ? node.effects : [];
            effects.forEach((effect) => {
                if (!effect || typeof effect !== 'object') return;

                if (effect.type === 'legacy_upgrade') {
                    const upgradeId = String(effect.upgradeId || '').trim();
                    if (!upgradeId || Game.state.upgrades[upgradeId]) return;
                    Game.state.upgrades[upgradeId] = true;
                    if (upgradeId === 'headhunter') {
                        Game.state.jobSearchUpgrade += 1;
                    }
                    if (upgradeId === 'brandmentor') {
                        Game.state.prestigeTransferRatioBonus += 0.05;
                    }
                    return;
                }

                if (effect.type === 'cigs_per_pack_add') {
                    Game.state.skillTreeEffects.cigsPerPackBonus += Math.max(0, Math.round(Number(effect.value) || 0));
                    return;
                }

                if (effect.type === 'smoke_relief_bonus') {
                    Game.state.skillTreeEffects.smokeReliefBonus += Math.max(0, Number(effect.value) || 0);
                    return;
                }

                if (effect.type === 'generation_stress_mult') {
                    Game.state.skillTreeEffects.generationStressMultiplierBonus *= Math.max(0.1, Number(effect.value) || 1);
                    return;
                }

                if (effect.type === 'generation_cooldown_mult') {
                    Game.state.skillTreeEffects.generationCooldownMultiplierBonus *= Math.max(0.1, Number(effect.value) || 1);
                    return;
                }

                if (effect.type === 'zen_decay_mult') {
                    Game.state.skillTreeEffects.zenDecayMultiplierBonus *= Math.max(0.1, Number(effect.value) || 1);
                    return;
                }

                if (effect.type === 'forest_knownness_bonus') {
                    Game.state.skillTreeEffects.forestKnownnessBonus += Math.max(0, Math.round(Number(effect.value) || 0));
                }
            });
        },

        buySkillNode(nodeId, options = {}) {
            const availability = this.getSkillNodeAvailability(nodeId);
            if (!availability.ok || !availability.node) return false;

            const costs = availability.costs;
            Game.state.funds -= costs.money;
            Game.state.prestige -= costs.prestige;
            Game.state.skillPoints -= costs.skillPoints;
            Game.state.cigaretteButts -= costs.butts;

            this.addMoneySpent(costs.money);
            Game.state.stats.totalCigaretteButtsSpent += costs.butts;

            this.markSkillNodePurchased(availability.node.id);
            this.applySkillNodeEffects(availability.node);
            this.ensureAutogenAffordable();
            this.refreshKnownness();
            this.updateJobSearchIntervalCache();
            this.applyGoodsModifiersFromState();

            this.handleChapter1Event('skill_node_purchased_' + availability.node.id);

            if (availability.node.id === this.getSkillRootNodeId()) {
                this.tryShowSkillRootPurchasedComment();
            }

            Game.ui.updateCounters();
            Game.ui.renderStats();
            Game.ui.renderAutogenToggle();
            if (!options || options.skipRender !== true) {
                Game.ui.renderShopUpgrades();
            }
            Game.persist.save();
            return true;
        },

        getKnownnessLevel() {
            const completedOrders = Math.max(0, Number(Game.state.stats.completedOrders) || 0);
            const byOrders = Math.floor(completedOrders / 10);
            const byLevel = Math.max(0, Math.floor((Game.state.level - 1) / 3));
            const byUpgrade = Math.max(0, Math.floor(Game.state.jobSearchUpgrade / 2));
            const byForest = Math.max(0, Math.round(Number(Game.state.skillTreeEffects.forestKnownnessBonus) || 0));
            return Math.max(0, byOrders + byLevel + byUpgrade + byForest);
        },

        refreshKnownness() {
            Game.state.knownness = this.getKnownnessLevel();
        },

        getJobSearchIntervalMs() {
            const a = Math.max(0, Number(Game.state.level) || 0);
            const b = Math.max(0, Number(Game.state.prestige) || 0);
            const x = Math.max(0, Number(Game.state.jobSearchUpgrade) || 0);
            const k1 = Game.config.JOB_SEARCH_K1_LEVEL;
            const k2 = Game.config.JOB_SEARCH_K2_PRESTIGE;
            const k3 = Game.config.JOB_SEARCH_K3_UPGRADE;
            const denominator = 1 + a / k1 + b / k2 + x / k3;
            const value = Game.config.JOB_SEARCH_MIN_MS + (Game.config.JOB_SEARCH_SPAN_MS / Math.max(1, denominator));
            return Math.round(this.clamp(value, Game.config.JOB_SEARCH_MIN_MS, Game.config.JOB_SEARCH_MIN_MS + Game.config.JOB_SEARCH_SPAN_MS));
        },

        updateJobSearchIntervalCache() {
            Game.state.currentJobSearchIntervalMs = this.getJobSearchIntervalMs();
            return Game.state.currentJobSearchIntervalMs;
        },

        isTaskUnlockedByCondition(condition) {
            if (!condition || typeof condition !== 'object') return true;

            if (condition.type === 'level') {
                return Game.state.level >= Math.max(1, Number(condition.value) || 1);
            }

            if (condition.type === 'upgrade') {
                const upgradeId = String(condition.value || '').trim();
                return !!(upgradeId && Game.state.upgrades[upgradeId]);
            }

            return true;
        },

        getTaskLockRequirementText(condition) {
            if (!condition || typeof condition !== 'object') return 'Need upgrade';
            if (condition.type === 'level') {
                return `Need level ${Math.max(1, Number(condition.value) || 1)}`;
            }
            if (condition.type === 'upgrade') {
                return 'Need upgrade';
            }
            return 'Need upgrade';
        },

        isOrderBlockedByFunds(order) {
            if (!order) return false;
            const category = order.taskCategory || Game.config.TASK_CATEGORIES.ORDERS;
            if (category !== Game.config.TASK_CATEGORIES.RESEARCH) return false;
            const payout = Number(order.realPayout) || 0;
            if (payout >= 0) return false;
            return Game.state.funds < Math.abs(Math.round(payout));
        },

        getOrderLockSnapshot(order) {
            if (!order) {
                return { isLocked: true, reason: 'Need upgrade' };
            }

            if (this.isOrderBlockedByFunds(order)) {
                return { isLocked: true, reason: 'Insufficient funds' };
            }

            if (order.isLocked) {
                return { isLocked: true, reason: String(order.lockRequirementText || '').trim() || 'Need upgrade' };
            }

            return { isLocked: false, reason: '' };
        },

        getResearchTaskCompletions(taskId) {
            const key = String(taskId || '').trim();
            if (!key) return 0;
            return Math.max(0, Math.round(Number(Game.state.researchTaskCompletions[key]) || 0));
        },

        isResearchTaskCompletionCapped(template) {
            if (!template || template.taskCategory !== Game.config.TASK_CATEGORIES.RESEARCH) return false;
            const cap = Math.max(0, Math.round(Number(template.maxCompletions) || 0));
            if (!cap) return false;
            return this.getResearchTaskCompletions(template.id) >= cap;
        },

        getResearchTaskCapText(template) {
            if (!template || template.taskCategory !== Game.config.TASK_CATEGORIES.RESEARCH) return '';
            const cap = Math.max(0, Math.round(Number(template.maxCompletions) || 0));
            if (!cap) return '';
            return 'Research exhausted';
        },

        getSpecialTaskLockText(template) {
            if (!template) return 'Need upgrade';
            if (this.isResearchTaskCompletionCapped(template)) {
                return this.getResearchTaskCapText(template) || 'Research exhausted';
            }
            if (!this.isTaskUnlockedByCondition(template.lockedCondition)) {
                return this.getTaskLockRequirementText(template.lockedCondition);
            }
            return '';
        },

        createSpecialTask(template, index) {
            const now = Date.now();
            const lockRequirementText = this.getSpecialTaskLockText(template);
            const requiredGenerations = Math.max(1, Number(template.requiredGenerations) || 1);
            const payout = Math.round(Number(template.realPayout) || 0);
            const hasExecutionTimer = template.hasExecutionTimer === true;
            return {
                id: `special-${template.taskCategory}-${template.id}-${index}`,
                specialTaskId: template.id,
                title: template.title,
                taskCategory: template.taskCategory,
                generateActionLabel: String(template.generateActionLabel || '').trim(),
                taskType: template.taskType || 'default',
                durationSec: Math.max(10, Number(template.durationSec) || 25),
                hasExecutionTimer,
                generations: requiredGenerations,
                requiredGenerations,
                basePayout: payout,
                realPayout: payout,
                iconUrl: template.iconUrl || this.getTaskTypeIcon(template.taskType || 'default'),
                isHighPayout: false,
                job_loss: null,
                spawnedAt: now,
                expiresAt: Number.POSITIVE_INFINITY,
                isStory: false,
                isSpecial: true,
                specialRewards: {
                    chanceBonus: Number(template.chanceBonus) || 0,
                    prestigePoolBonus: Number(template.prestigePoolBonus) || 0,
                    skillPoints: Math.max(0, Math.round(Number(template.skillPointsReward) || 0)),
                },
                maxCompletions: Math.max(0, Math.round(Number(template.maxCompletions) || 0)),
                isLocked: !!lockRequirementText,
                lockRequirementText,
                generationsAttempted: 0,
            };
        },

        syncSpecialTasksQueue() {
            const templates = [
                ...(Array.isArray(Game.config.RESEARCH_TASKS) ? Game.config.RESEARCH_TASKS : []),
                ...(Array.isArray(Game.config.PROMOTION_TASKS) ? Game.config.PROMOTION_TASKS : []),
            ];
            const unlockedSpecial = Game.state.unlockedSpecialTasks || {};

            templates.forEach((template, index) => {
                if (!template || !template.id || !template.taskCategory) return;
                // Hidden tasks only appear when explicitly unlocked
                if (template.hidden && !unlockedSpecial[template.id]) return;

                // Remove completed one-time tasks (maxCompletions reached)
                const cap = Math.max(0, Math.round(Number(template.maxCompletions) || 0));
                if (cap > 0 && this.getResearchTaskCompletions(template.id) >= cap) {
                    Game.state.orders = Game.state.orders.filter(
                        (order) => !(order && order.isSpecial && order.specialTaskId === template.id),
                    );
                    return;
                }

                const existing = Game.state.orders.find((order) => order && order.isSpecial && order.specialTaskId === template.id);
                const requirementText = this.getSpecialTaskLockText(template);

                if (existing) {
                    existing.isLocked = !!requirementText;
                    existing.lockRequirementText = requirementText;
                    existing.requiredGenerations = Math.max(1, Number(template.requiredGenerations) || existing.requiredGenerations || 1);
                    existing.realPayout = Math.round(Number(template.realPayout) || existing.realPayout || 0);
                    existing.durationSec = Math.max(10, Number(template.durationSec) || existing.durationSec || 25);
                    existing.generateActionLabel = String(template.generateActionLabel || '').trim();
                    existing.hasExecutionTimer = template.hasExecutionTimer === true;
                    existing.specialRewards = {
                        chanceBonus: Number(template.chanceBonus) || 0,
                        prestigePoolBonus: Number(template.prestigePoolBonus) || 0,
                        skillPoints: Math.max(0, Math.round(Number(template.skillPointsReward) || 0)),
                    };
                    existing.maxCompletions = Math.max(0, Math.round(Number(template.maxCompletions) || existing.maxCompletions || 0));
                    return;
                }

                Game.state.orders.push(this.createSpecialTask(template, index));
            });
        },

        getAvailableTemplates() {
            const templates = Array.isArray(window.ORDER_TEMPLATES) ? window.ORDER_TEMPLATES : [];
            const unlocked = Array.isArray(Game.state.unlockedTaskTypes) ? Game.state.unlockedTaskTypes : [];
            if (!templates.length) return [];
            const filtered = templates.filter((template) => {
                const taskType = String(template?.['task-type'] || template?.taskType || 'default');
                return unlocked.includes(taskType);
            });
            return filtered.length ? filtered : templates;
        },

        pickRandomTemplate() {
            const templates = this.getAvailableTemplates();
            if (!templates.length) {
                return {
                    title: 'Create a basic banner',
                    'task-type': 'out',
                    durationSec: [20, 30],
                    generations: [2, 4],
                    payout: [100, 180],
                };
            }
            return templates[this.randomInt(0, templates.length - 1)];
        },

        initializeTemplateDeck() {
            const templates = [...this.getAvailableTemplates()];
            for (let i = templates.length - 1; i > 0; i -= 1) {
                const j = this.randomInt(0, i);
                const temp = templates[i];
                templates[i] = templates[j];
                templates[j] = temp;
            }
            Game.state.templateDeck = templates;
        },

        pullTemplateFromDeck() {
            if (!Game.state.templateDeck.length) {
                this.initializeTemplateDeck();
            }
            return Game.state.templateDeck.pop() || this.pickRandomTemplate();
        },

        getStoryTemplate(storyId) {
            const storyCatalog = Array.isArray(Game.config.STORY_ORDERS) ? Game.config.STORY_ORDERS : [];
            return storyCatalog.find((item) => item && item.id === storyId) || null;
        },

        hasStoryInQueueOrActive(storyId) {
            if (!storyId) return false;
            const queued = Game.state.orders.some((order) => order && order.isStory && order.storyId === storyId);
            const active = !!(Game.state.activeOrder && Game.state.activeOrder.isStory && Game.state.activeOrder.storyId === storyId);
            return queued || active;
        },

        hasCompletedStory(storyId) {
            return Array.isArray(Game.state.completedStoryOrderIds)
                ? Game.state.completedStoryOrderIds.includes(storyId)
                : false;
        },

        restoreStoryQueue() {
            if (!Game.state.introCompleted) return;
            const storyCatalog = Array.isArray(Game.config.STORY_ORDERS) ? Game.config.STORY_ORDERS : [];
            const ch1Events = window.CH1_EVENTS || {};
            const firedEvents = Game.state.ch1FiredEvents || {};

            storyCatalog.forEach((template) => {
                if (!template || !template.id) return;
                if (this.hasCompletedStory(template.id)) return;
                if (this.hasStoryInQueueOrActive(template.id)) return;

                if (!template.ch1Only) {
                    // Non-ch1Only: re-add if the player already meets the conditions
                    if (this.canUnlockStoryOrder(template)) {
                        this.ensureStoryOrderInQueue(template.id);
                    }
                    return;
                }

                // ch1Only: re-inject if a firedOnce event that injects this story has already fired.
                // (firedOnce:false events are repeat-failure respawns — they don't indicate that
                //  the story was pending, so we skip them here.)
                const wasInjected = Object.entries(ch1Events).some(([key, cfg]) => {
                    if (cfg.firedOnce === false) return false;
                    if (!Array.isArray(cfg.injectStories)) return false;
                    if (!cfg.injectStories.includes(template.id)) return false;
                    return !!firedEvents[key];
                });

                if (wasInjected) {
                    this.ensureStoryOrderInQueue(template.id);
                }
            });
        },

        canUnlockStoryOrder(storyTemplate) {
            if (!storyTemplate || !storyTemplate.id) return false;
            if (!Game.state.tutorialCompleted && storyTemplate.id !== 'post_portfolio') return false;
            // Ch1-only stories are injected manually, never auto-queued
            if (storyTemplate.ch1Only) return false;
            if (this.hasCompletedStory(storyTemplate.id)) return false;
            if (this.hasStoryInQueueOrActive(storyTemplate.id)) return false;

            const requiredLevel = Math.max(1, Number(storyTemplate.requiredLevel) || 1);
            const requiredPrestige = Math.max(0, Number(storyTemplate.requiredPrestige) || 0);
            const requiredKnownness = Math.max(0, Number(storyTemplate.requiredKnownness) || 0);
            const requiredUpgrade = Math.max(0, Number(storyTemplate.requiredJobSearchUpgrade) || 0);

            if (Game.state.level < requiredLevel) return false;
            if (Game.state.prestige < requiredPrestige) return false;
            if (Game.state.knownness < requiredKnownness) return false;
            if (Game.state.jobSearchUpgrade < requiredUpgrade) return false;

            const prerequisiteStoryId = String(storyTemplate.prerequisiteStoryId || '').trim();
            if (prerequisiteStoryId && !this.hasCompletedStory(prerequisiteStoryId)) return false;

            const upgradeGate = String(storyTemplate.requiresUpgrade || '').trim();
            if (upgradeGate && !Game.state.upgrades[upgradeGate]) return false;

            return true;
        },

        tryQueueNextStoryOrder() {
            const storyCatalog = Array.isArray(Game.config.STORY_ORDERS) ? Game.config.STORY_ORDERS : [];
            const next = storyCatalog.find((template) => this.canUnlockStoryOrder(template));
            if (!next) return false;
            const queued = this.ensureStoryOrderInQueue(next.id);
            if (!queued) return false;
            Game.ui.renderOrdersList();
            Game.ui.updateCounters();
            Game.persist.save();
            return true;
        },

        showMeetingCinematic(lines, onDone) {
            const overlay = document.getElementById('meeting-cinematic');
            if (!overlay) {
                this.playDialogueSequence(lines, onDone);
                return;
            }
            this.pauseGameLogic();
            overlay.classList.add('active');
            overlay.setAttribute('aria-hidden', 'false');

            const contentEl = overlay.querySelector('.meeting-cinematic-content');
            const closeOverlay = () => {
                overlay.classList.remove('active');
                overlay.setAttribute('aria-hidden', 'true');
                this.resumeGameLogic();
                if (typeof onDone === 'function') onDone();
            };

            if (!Array.isArray(lines) || !lines.length) {
                closeOverlay();
                return;
            }

            const speakers = (window.NARRATIVE_COMMENTS && window.NARRATIVE_COMMENTS.speakers) || {};
            const dialogEl = overlay.querySelector('.meeting-cinematic-dialog');
            const speakerNameEl = overlay.querySelector('.meeting-cinematic-speaker');
            const speakerIconEl = overlay.querySelector('.meeting-cinematic-speaker-icon');
            const textEl = overlay.querySelector('.meeting-cinematic-text');

            const playLine = (index) => {
                if (index >= lines.length) {
                    closeOverlay();
                    return;
                }
                const entry = lines[index];
                const speakerKey = (typeof entry === 'object' && entry !== null) ? (entry.speaker || 'self') : 'self';
                const text = (typeof entry === 'object' && entry !== null) ? String(entry.text || '') : String(entry || '');
                const speakerData = speakers[speakerKey] || { name: 'ChatDJBT', icon: 'images/cinematic/chatdjbt-icon.png' };

                if (speakerNameEl) speakerNameEl.textContent = speakerData.name;
                if (speakerIconEl) { speakerIconEl.src = speakerData.icon; speakerIconEl.alt = speakerData.name; }
                if (textEl) Game.intro.typeText(text, textEl, { allowHtml: false });

                const onClick = () => {
                    if (Game.intro.isTyping()) {
                        Game.intro.finishTypingInstant();
                        return;
                    }
                    overlay.removeEventListener('click', onClick);
                    playLine(index + 1);
                };
                overlay.addEventListener('click', onClick);
            };
            playLine(0);
        },

        startForcedOutSpawn() {
            if (this._forcedOutSpawnInterval) return;
            const scheduleNext = () => {
                const delayMs = this.randomInt(40000, 80000);
                this._forcedOutSpawnInterval = setTimeout(() => {
                    this._forcedOutSpawnInterval = null;
                    const hasOut = Game.state.orders && Game.state.orders.some((o) => (o['task-type'] || o.taskType) === 'out');
                    const activeIsOut = Game.state.activeOrder && (Game.state.activeOrder['task-type'] || Game.state.activeOrder.taskType) === 'out';
                    if (!hasOut && !activeIsOut) {
                        const outTemplates = (window.ORDER_TEMPLATES || []).filter((t) => (t['task-type'] || t.taskType) === 'out');
                        if (outTemplates.length) {
                            const tpl = outTemplates[this.randomInt(0, outTemplates.length - 1)];
                            const saved = Game.state.templateDeck;
                            Game.state.templateDeck = [tpl];
                            this.spawnOneOrder();
                            Game.state.templateDeck = saved;
                        }
                    }
                    scheduleNext();
                }, delayMs);
            };
            scheduleNext();
        },

        unlockSpecialTask(taskId) {
            const key = String(taskId || '').trim();
            if (!key) return;
            if (!Game.state.unlockedSpecialTasks) Game.state.unlockedSpecialTasks = {};
            Game.state.unlockedSpecialTasks[key] = true;
            this.syncSpecialTasksQueue();
            Game.ui.renderOrdersList();
            Game.ui.updateCounters();
        },

        unlockMenu(menuKey) {
            if (!menuKey || !(menuKey in Game.state.unlockedMenus)) return;
            Game.state.unlockedMenus[menuKey] = true;
            Game.ui.renderUnlockedMenuButtons();
            Game.persist.save();
        },

        handleChapter1Event(eventKey) {
            if (Game.state.chapter1Completed) return;
            const ch1 = window.CH1_EVENTS || {};
            const cfg = ch1[eventKey];
            if (!cfg) return;

            // Fire-once gate
            if (!Game.state.ch1FiredEvents) Game.state.ch1FiredEvents = {};
            if (cfg.firedOnce !== false && Game.state.ch1FiredEvents[eventKey]) return;
            // Prerequisite check — must not mark as fired if requirements unmet
            if (cfg.requiresFiredEvent && !Game.state.ch1FiredEvents[cfg.requiresFiredEvent]) return;
            if (cfg.firedOnce !== false) Game.state.ch1FiredEvents[eventKey] = true;

            const doEvent = () => {
                // Unlock menus
                if (Array.isArray(cfg.unlockMenus)) {
                    cfg.unlockMenus.forEach((m) => this.unlockMenu(m));
                }
                // Unlock special tasks
                if (Array.isArray(cfg.unlockSpecialTasks)) {
                    cfg.unlockSpecialTasks.forEach((id) => this.unlockSpecialTask(id));
                }
                // Inject story orders
                if (Array.isArray(cfg.injectStories)) {
                    cfg.injectStories.forEach((id) => this.ensureStoryOrderInQueue(id));
                }
                // Unlock task types
                if (Array.isArray(cfg.unlockTaskTypes)) {
                    const set = new Set(Array.isArray(Game.state.unlockedTaskTypes) ? Game.state.unlockedTaskTypes : []);
                    cfg.unlockTaskTypes.forEach((t) => set.add(t));
                    Game.state.unlockedTaskTypes = Array.from(set);
                    this.initializeTemplateDeck();
                    this.startOrderSpawner();
                }
                // Set outfit
                if (Number.isFinite(cfg.setOutfit)) {
                    Game.state.currentOutfit = cfg.setOutfit;
                    Game.ui.setStatus(Game.state.currentStatus || Game.config.STATUS.REST);
                }
                // Set stress (raise to target if currently below)
                if (Number.isFinite(cfg.setStress)) {
                    if (Game.state.stress < cfg.setStress) {
                        Game.state.stress = cfg.setStress;
                    }
                }
                // Grant achievements
                if (Array.isArray(cfg.achievements)) {
                    cfg.achievements.forEach((id) => {
                        if (!Game.state.claimedAchievements) Game.state.claimedAchievements = {};
                        // Just mark as earned/claimable by checking condition at render time
                        Game.ui.renderAchievements();
                    });
                }
                // Chapter 1 completion
                if (cfg.ch1Complete) {
                    Game.state.chapter1Completed = true;
                    // Unlock all menus
                    Object.keys(Game.state.unlockedMenus).forEach((k) => {
                        Game.state.unlockedMenus[k] = true;
                    });
                    // Unlock all special tasks
                    const allSpecial = [
                        ...(Array.isArray(Game.config.RESEARCH_TASKS) ? Game.config.RESEARCH_TASKS : []),
                        ...(Array.isArray(Game.config.PROMOTION_TASKS) ? Game.config.PROMOTION_TASKS : []),
                    ];
                    allSpecial.forEach((t) => {
                        if (t && t.id) {
                            if (!Game.state.unlockedSpecialTasks) Game.state.unlockedSpecialTasks = {};
                            Game.state.unlockedSpecialTasks[t.id] = true;
                        }
                    });
                    Game.ui.renderUnlockedMenuButtons();
                    this.syncSpecialTasksQueue();
                    this.startForcedOutSpawn();
                    // Popup is shown via cinematic callback or fallback below
                }
                // Play dialogue sequence
                if (Array.isArray(cfg.dialogue)) {
                    setTimeout(() => {
                        this.playDialogueSequence(cfg.dialogue);
                    }, cfg.dialogueDelay || 500);
                }
                // Meeting cinematic
                if (Array.isArray(cfg.cinematic)) {
                    const showPopup = cfg.ch1Complete;
                    setTimeout(() => {
                        this.showMeetingCinematic(cfg.cinematic, showPopup ? () => {
                            const popup = document.getElementById('chapter-end-popup');
                            if (popup) {
                                this.pauseGameLogic();
                                popup.classList.add('active');
                                popup.setAttribute('aria-hidden', 'false');
                            }
                        } : null);
                    }, cfg.cinematicDelay || 200);
                } else if (cfg.ch1Complete) {
                    // No cinematic — show popup directly
                    setTimeout(() => {
                        const popup = document.getElementById('chapter-end-popup');
                        if (popup) {
                            this.pauseGameLogic();
                            popup.classList.add('active');
                            popup.setAttribute('aria-hidden', 'false');
                        }
                    }, 1500);
                }

                // Follow-up: schedule another event after a delay
                if (cfg.followUp && cfg.followUp.eventKey) {
                    const followUpKey = String(cfg.followUp.eventKey).trim();
                    const followUpDelay = Math.max(0, Number(cfg.followUp.delayMs) || 0);
                    if (followUpKey) {
                        setTimeout(() => this.handleChapter1Event(followUpKey), followUpDelay);
                    }
                }

                Game.ui.renderOrdersList();
                Game.ui.updateCounters();
                Game.persist.save();
            };

            doEvent();
        },

        applyStoryCompletionRewards(storyId) {
            const template = this.getStoryTemplate(storyId);
            if (!template) return;

            if (!Array.isArray(Game.state.completedStoryOrderIds)) {
                Game.state.completedStoryOrderIds = [];
            }
            if (!Game.state.completedStoryOrderIds.includes(storyId)) {
                Game.state.completedStoryOrderIds.push(storyId);
            }

            const unlockedBefore = new Set(Array.isArray(Game.state.unlockedTaskTypes) ? Game.state.unlockedTaskTypes : []);
            const unlockTaskTypes = Array.isArray(template.unlockTaskTypes) ? template.unlockTaskTypes : [];
            unlockTaskTypes.forEach((taskType) => {
                const key = String(taskType || '').trim();
                if (!key) return;
                unlockedBefore.add(key);
            });
            Game.state.unlockedTaskTypes = Array.from(unlockedBefore);

            const chanceBonus = Number(template.chanceBonus) || 0;
            if (chanceBonus > 0) {
                Game.state.storyChanceBonus += chanceBonus;
            }

            const transferFlat = Math.max(0, Math.round(Number(template.prestigeTransferFlat) || 0));
            const transferRatio = Number.isFinite(Number(template.prestigeTransferRatio))
                ? Number(template.prestigeTransferRatio)
                : this.getEffectivePrestigeTransferRatio();
            const pool = Math.max(0, Math.round(Number(Game.state.virtualPrestigePool) || 0));

            let transferAmount = 0;
            if (transferFlat > 0) {
                transferAmount = Math.min(pool, transferFlat);
            } else {
                transferAmount = Math.min(pool, Math.max(0, Math.round(pool * this.clamp(transferRatio, 0, 1))));
            }

            if (transferAmount > 0) {
                Game.state.virtualPrestigePool -= transferAmount;
                Game.state.prestige += transferAmount;
            }

            this.refreshKnownness();
            this.syncSpecialTasksQueue();
            this.initializeTemplateDeck();
            this.startOrderSpawner();

            // Chapter 1 event hook
            this.handleChapter1Event(`story_complete_${storyId}`);
        },

        onProgressionUpdated() {
            this.refreshKnownness();
            this.updateJobSearchIntervalCache();
            this.syncSpecialTasksQueue();
            this.sortOrdersByPriority();
            this.tryQueueNextStoryOrder();
            this.startOrderSpawner();
            Game.ui.renderOrdersList();
            Game.ui.renderStats();
        },

        getTaskTypeIcon(taskType) {
            const iconMap = window.TASK_TYPE_ICONS || {};
            return iconMap[taskType] || iconMap.default || '';
        },

        buildOrder(index) {
            const template = this.pullTemplateFromDeck();
            const sourceTitle = String(template.title || '');
            const payoutMin = template.payout[0];
            const payoutMax = template.payout[1];
            const basePayout = this.randomInt(payoutMin, payoutMax);
            const payoutRatio = payoutMax > payoutMin
                ? (basePayout - payoutMin) / (payoutMax - payoutMin)
                : 1;
            const taskType = template['task-type'] || template.taskType || 'default';
            const urgent = /^\s*(urgent:|срочно:)/i.test(sourceTitle);
            const jobLossSec = urgent ? 5 : this.randomInt(15, 30);
            const now = Date.now();
            const baseDuration = this.randomInt(template.durationSec[0], template.durationSec[1]);
            const baseGenerations = this.randomInt(template.generations[0], template.generations[1]);
            const scaledGenerations = Math.max(1, Math.ceil(baseGenerations * Game.state.level * Game.config.EXPONENT_GROWTH));
            const riskMultiplier = urgent ? 1.2 : 1;
            const realPayout = Math.max(
                1,
                Math.round(
                    (1 / Math.max(1, baseDuration)) *
                    (baseGenerations * Game.state.level) *
                    basePayout *
                    Game.config.PAYOUT_SCALE *
                    riskMultiplier
                )
            );

            return {
                id: `${Date.now()}-${index}-${Math.random().toString(16).slice(2, 8)}`,
                title: sourceTitle,
                taskCategory: Game.config.TASK_CATEGORIES.ORDERS,
                taskType,
                durationSec: baseDuration,
                generations: baseGenerations,
                requiredGenerations: scaledGenerations,
                basePayout,
                realPayout,
                iconUrl: this.getTaskTypeIcon(taskType),
                isHighPayout: payoutRatio >= 0.8,
                job_loss: jobLossSec,
                spawnedAt: now,
                expiresAt: now + jobLossSec * 1000,
                isLocked: false,
                lockRequirementText: '',
                generationsAttempted: 0, // Отслеживает генерации, сделанные игроком
            };
        },

        createStoryOrder(storyId = 'post_portfolio') {
            const now = Date.now();
            const storyCatalog = Array.isArray(Game.config.STORY_ORDERS) ? Game.config.STORY_ORDERS : [];
            const template = storyCatalog.find((item) => item && item.id === storyId) || storyCatalog[0] || {
                id: 'post_portfolio',
                title: 'Post portfolio',
                taskType: 'story',
                durationSec: 65,
                generations: 5,
                requiredGenerations: 5,
                basePayout: 0,
                realPayout: 0,
                iconUrl: 'images/icons/job/icon-job-story.png',
            };

            return {
                id: `story-${template.id}-${now}`,
                title: template.title,
                storyId: template.id,
                taskCategory: template.taskCategory || Game.config.TASK_CATEGORIES.STORY,
                generateActionLabel: String(template.generateActionLabel || '').trim(),
                taskType: template.taskType || 'story',
                durationSec: Number(template.durationSec) || 65,
                generations: Number(template.generations) || 5,
                requiredGenerations: Number(template.requiredGenerations) || Number(template.generations) || 5,
                basePayout: Math.max(0, Number(template.basePayout) || 0),
                realPayout: Math.max(0, Number(template.realPayout) || 0),
                iconUrl: template.iconUrl || 'images/icons/job/icon-job-story.png',
                isHighPayout: false,
                job_loss: null,
                spawnedAt: now,
                expiresAt: Number.POSITIVE_INFINITY,
                isStory: true,
                isLocked: false,
                lockRequirementText: '',
                generationsAttempted: 0, // Отслеживает генерации, сделанные игроком
                xpReward: Number.isFinite(template.xpReward) ? template.xpReward : undefined,
                noFailPenalty: !!template.noFailPenalty,
                ch1StoryId: template.id,
                priority: Number(template.priority) || 0,
            };
        },

        sortOrdersByPriority() {
            if (!Array.isArray(Game.state.orders) || !Game.state.orders.length) return;
            const categoryOrder = {
                [Game.config.TASK_CATEGORIES.ORDERS]: 0,
                [Game.config.TASK_CATEGORIES.STORY]: 1,
                [Game.config.TASK_CATEGORIES.RESEARCH]: 2,
                [Game.config.TASK_CATEGORIES.PROMOTION]: 3,
            };

            Game.state.orders.sort((a, b) => {
                const ca = a?.taskCategory || Game.config.TASK_CATEGORIES.ORDERS;
                const cb = b?.taskCategory || Game.config.TASK_CATEGORIES.ORDERS;
                const pa = categoryOrder[ca] ?? 9;
                const pb = categoryOrder[cb] ?? 9;
                if (pa !== pb) return pa - pb;
                if (!!a?.isLocked !== !!b?.isLocked) return a.isLocked ? 1 : -1;
                // Regular orders: oldest first (ascending spawnedAt).
                if (ca === Game.config.TASK_CATEGORIES.ORDERS) {
                    return (a?.spawnedAt || 0) - (b?.spawnedAt || 0);
                }
                // Story/Research/Promotion: highest task priority first.
                return (b?.priority ?? 0) - (a?.priority ?? 0);
            });
        },

        ensureStoryOrderInQueue(storyId = 'post_portfolio') {
            if (!storyId) return false;
            if (this.hasCompletedStory(storyId)) return false;
            if (this.hasStoryInQueueOrActive(storyId)) return false;
            const storyOrder = this.createStoryOrder(storyId);
            Game.state.orders.unshift(storyOrder);
            this.sortOrdersByPriority();
            if (storyId === 'post_portfolio' && !Game.state.tutorialCompleted) {
                Game.state.forcedStoryOrderId = storyOrder.id;
            }
            Game.state.selectedOrderId = storyOrder.id;
            Game.state.hasNewOrders = true;
            Game.ui.setOrdersAlertVisible(true);
            return true;
        },

        spawnOneOrder() {
            const newOrder = this.buildOrder(Game.state.orders.length + 1);
            Game.state.orders.unshift(newOrder);
            this.sortOrdersByPriority();
            if (!Game.state.selectedOrderId) {
                Game.state.selectedOrderId = newOrder.id;
            }
            Game.state.hasNewOrders = true;
            Game.ui.setOrdersAlertVisible(true);
            Game.ui.renderOrdersList();
            Game.ui.updateCounters();
            Game.ui.refreshGenerateButton();
        },

        trySpawnOrderByChance() {
            if (this.isLogicPaused()) return;
            if (Math.random() >= this.getEffectiveJobChance()) return;
            this.spawnOneOrder();
        },

        updateOrderLifetimes() {
            if (this.isLogicPaused()) return;
            const now = Date.now();

            this.processSmokeRelief(now);

            if (Game.state.activeOrder && now >= Game.state.activeOrder.deadlineAt) {
                this.failActiveOrder(Game.state.activeOrder.id);
            }

            if (Game.state.currentStatus === Game.config.STATUS.SMOKE && !this.isSmokingNow()) {
                if (Game.state.activeOrder) {
                    Game.ui.setStatus(Game.config.STATUS.WORK);
                } else {
                    Game.ui.setStatus(Game.config.STATUS.REST);
                }
                Game.persist.save();
            }

            if (!Game.state.orders.length) return;
            const activeId = Game.state.activeOrder ? Game.state.activeOrder.id : null;
            const beforeLength = Game.state.orders.length;

            Game.state.orders = Game.state.orders.filter((order) => {
                if (order.id === activeId) return true;
                if (order.isStory) return true;
                return order.expiresAt > now;
            });
            this.sortOrdersByPriority();

            if (!Game.state.orders.some((order) => order.id === Game.state.selectedOrderId)) {
                Game.state.selectedOrderId = null;
            }

            if (Game.state.orders.length !== beforeLength) {
                Game.ui.updateCounters();
                Game.ui.renderOrdersList();
                return;
            }

            Game.ui.updateVisibleOrderTimersAndProgress();
        },

        startOrderSpawner() {
            if (Game.state.spawnTimeoutId) {
                clearTimeout(Game.state.spawnTimeoutId);
                Game.state.spawnTimeoutId = null;
            }

            const initialDelay = Game.actions.updateJobSearchIntervalCache();

            const loop = () => {
                Game.actions.trySpawnOrderByChance();
                const delay = Game.actions.updateJobSearchIntervalCache();
                Game.state.spawnTimeoutId = setTimeout(loop, delay);
            };

            Game.state.spawnTimeoutId = setTimeout(loop, initialDelay);
        },

        startOrderLifetimeWatcher() {
            if (Game.state.orderLifetimeIntervalId) clearInterval(Game.state.orderLifetimeIntervalId);
            Game.state.orderLifetimeIntervalId = setInterval(() => {
                Game.actions.updateOrderLifetimes();
                Game.ui.refreshGenerateButton();
                Game.ui.updateTaskTimerUi();
            }, Game.config.ORDER_LIFETIME_TICK_MS);
        },

        startZenDecay() {
            if (Game.state.zenIntervalId) clearInterval(Game.state.zenIntervalId);
            Game.state.zenIntervalId = setInterval(() => {
                if (this.isLogicPaused()) return;
                if (!Game.state.zenEnabled) return;
                const baseCalm = this.randomInt(Game.config.ZEN_DECAY_MIN, Game.config.ZEN_DECAY_MAX);
                const calm = baseCalm * Math.max(1, Number(Game.state.zenDecayMultiplier) || 1);
                this.reduceStress(calm);
            }, Game.config.ZEN_TICK_MS);
        },

        selectOrder(orderId) {
            if (!orderId) return;
            const currentCategory = Game.state.ordersMenuTab || Game.config.TASK_CATEGORIES.ORDERS;
            const selected = Game.state.orders.find((order) => order.id === orderId);
            if (!selected) return;
            if ((selected.taskCategory || Game.config.TASK_CATEGORIES.ORDERS) !== currentCategory) return;
            const selectedLock = this.getOrderLockSnapshot(selected);
            if (selectedLock.isLocked) return;
            Game.state.selectedOrderId = selected.id;
            Game.ui.renderOrdersList();
        },

        startSelectedOrder() {
            if (Game.state.activeOrder) return;

            const currentCategory = Game.state.ordersMenuTab || Game.config.TASK_CATEGORIES.ORDERS;
            const categoryOrders = Game.state.orders.filter((order) => {
                const category = order && order.taskCategory ? order.taskCategory : Game.config.TASK_CATEGORIES.ORDERS;
                const lockSnapshot = this.getOrderLockSnapshot(order);
                return category === currentCategory && !lockSnapshot.isLocked;
            });

            const selected = categoryOrders.find((order) => order.id === Game.state.selectedOrderId);
            if (!selected) return;

            // Chapter 1 outfit gate: intercept story starts that require an outfit
            if (!Game.state.chapter1Completed) {
                const outfitGatedStories = ['call_with_client', 'outistic_contract'];
                if (outfitGatedStories.includes(selected.ch1StoryId) && (Game.state.currentOutfit || 0) < 1) {
                    this.handleChapter1Event('outfit_gate_start_' + selected.ch1StoryId);
                    return;
                }
            }

            const isStoryOrder = !!selected.isStory;
            const selectedCategory = selected.taskCategory || Game.config.TASK_CATEGORIES.ORDERS;
            const hasExecutionTimer = isStoryOrder
                ? false
                : (selectedCategory === Game.config.TASK_CATEGORIES.ORDERS
                    ? true
                    : selected.hasExecutionTimer === true);

            Game.state.orders = Game.state.orders.filter((order) => order.id !== selected.id);
            const nextInCategory = Game.state.orders.find((order) => {
                const category = order && order.taskCategory ? order.taskCategory : Game.config.TASK_CATEGORIES.ORDERS;
                const lockSnapshot = this.getOrderLockSnapshot(order);
                return category === currentCategory && !lockSnapshot.isLocked;
            });
            Game.state.selectedOrderId = nextInCategory ? nextInCategory.id : null;
            Game.ui.renderOrdersList();
            Game.ui.updateCounters();

            Game.ui.closeAllOverlays([Game.elems.mainMenuOverlay, Game.elems.ordersMenu, Game.elems.shopMenu, Game.elems.achievementsMenu, Game.elems.statsMenu]);

            const now = Date.now();
            const durationMs = (!hasExecutionTimer || isStoryOrder)
                ? Number.POSITIVE_INFINITY
                : selected.durationSec * 1000;
            Game.state.activeOrder = {
                id: selected.id,
                storyId: selected.storyId || null,
                specialTaskId: selected.specialTaskId || null,
                taskCategory: selected.taskCategory || Game.config.TASK_CATEGORIES.ORDERS,
                generateActionLabel: String(selected.generateActionLabel || '').trim(),
                isSpecial: !!selected.isSpecial,
                specialRewards: selected.specialRewards || null,
                title: selected.title,
                payout: selected.realPayout,
                remainingGenerations: selected.requiredGenerations,
                requiredGenerations: selected.requiredGenerations,
                startedAt: now,
                durationMs,
                deadlineAt: (!hasExecutionTimer || isStoryOrder) ? Number.POSITIVE_INFINITY : now + durationMs,
                isStory: isStoryOrder,
                hasExecutionTimer,
                generationsAttempted: selected.generationsAttempted || 0, // Сохранить счёт генераций игрока
                xpReward: Number.isFinite(selected.xpReward) ? selected.xpReward : undefined,
                noFailPenalty: !!selected.noFailPenalty,
                taskType: selected.taskType || null,
                ch1StoryId: selected.ch1StoryId || null,
            };

            if (isStoryOrder) {
                Game.intro.notify('story_started');
            }

            Game.ui.setStatus(Game.config.STATUS.WORK);
            Game.ui.refreshGenerateButton();
            Game.ui.updateTaskTimerUi();
        },

        registerGenerationStep() {
            if (this.isLogicPaused()) return;
            if (!Game.state.activeOrder) return;
            if (this.isSmokingNow()) return;
            if (Game.state.activeOrder.remainingGenerations <= 0) return;
            if (Date.now() < Game.state.generationCooldownUntil) return;

            const cooldownMs = Game.state.debugInstantGen
                ? Math.round(Game.state.generationCooldownMs / 20)
                : Game.state.generationCooldownMs;
            Game.state.generationCooldownUntil = Date.now() + cooldownMs;
            Game.state.activeOrder.remainingGenerations -= 1;
            Game.state.activeOrder.generationsAttempted += 1;
            Game.state.stats.manualGenerations += 1;
            Game.ui.renderStats();
            const stressStep = Game.config.STRESS_PER_GENERATION * Math.max(1, Number(Game.state.generationStressMultiplier) || 1);
            this.addStress(stressStep);
            Game.ui.refreshGenerateButton();
            this.tryShowManualGenerationMilestoneComment();

            if (Game.state.activeOrder && Game.state.activeOrder.remainingGenerations <= 0) {
                Game.actions.completeActiveOrder();
            } else if (Game.state.activeOrder) {
                // Per-generation Ch1 hooks
                const order = Game.state.activeOrder;
                const gen = (order.requiredGenerations - order.remainingGenerations);
                if (order.specialTaskId) {
                    this.handleChapter1Event(`special_gen_${order.specialTaskId}_${gen}`);
                }
                if (order.ch1StoryId) {
                    this.handleChapter1Event(`story_gen_${order.ch1StoryId}_${gen}`);
                }
            }
        },

        tryShowManualGenerationMilestoneComment() {
            const totalManual = Math.max(0, Math.round(Number(Game.state.stats.manualGenerations) || 0));
            if (!totalManual) return false;

            const milestones = {
                1: 'chat_generation_after_first_once',
                3: 'chat_generation_after_third_once',
                4: 'chat_generation_after_fourth_once',
            };

            const commentId = milestones[totalManual];
            if (!commentId) return false;
            return this.queueDelayedNarrativeComment(commentId, 4000);
        },

        queueDelayedNarrativeComment(commentId, delayMs = 4000) {
            const key = String(commentId || '').trim();
            if (!key) return false;
            if (Game.state.shownCharacterComments[key]) return false;

            if (!this._delayedNarrativeCommentTimers || typeof this._delayedNarrativeCommentTimers !== 'object') {
                this._delayedNarrativeCommentTimers = {};
            }

            if (this._delayedNarrativeCommentTimers[key]) return false;

            this._delayedNarrativeCommentTimers[key] = setTimeout(() => {
                if (this._delayedNarrativeCommentTimers) {
                    delete this._delayedNarrativeCommentTimers[key];
                }
                if (Game.state.shownCharacterComments[key]) return;
                const payload = this.getNarrativeCommentPayload(key);
                if (!payload) return;
                this.tryShowCommentOnce(key, payload);
            }, Math.max(0, Math.round(Number(delayMs) || 0)));

            return true;
        },

        completeActiveOrder() {
            const active = Game.state.activeOrder;
            if (!active) return;

            const durationMs = Math.max(1, active.durationMs);
            const elapsedMs = Math.max(0, Date.now() - active.startedAt);
            const riskRatio = this.clamp(elapsedMs / durationMs, 0, 1);
            const riskXpMultiplier = 1 + riskRatio * 0.6;
            const baseXp = Math.max(8, Math.round(active.requiredGenerations * 3 + active.payout * 0.03));
            const xpAward = Number.isFinite(active.xpReward) ? active.xpReward : Math.round(baseXp * riskXpMultiplier);

            const isStory = !!active.isStory;

            // Проверить триггеры персонажа перед очисткой заказа
            this.checkCharacterComments(active, 'order_completed');

            Game.state.funds += active.payout;
            Game.state.stats.completedOrders += 1;
            Game.ui.renderStats();
            if (active.payout >= 0) {
                this.addMoneyEarned(active.payout);
            } else {
                this.addMoneySpent(Math.abs(active.payout));
            }
            this.ensureAutogenAffordable();
            this.addExperience(xpAward);
            this.reduceStress(15);
            Game.state.activeOrder = null;

            if (isStory) {
                this.applyStoryCompletionRewards(active.storyId);
                if (active.storyId === 'post_portfolio') {
                    Game.state.pendingStoryOutro = true;
                }
                if (active.id === Game.state.forcedStoryOrderId) {
                    Game.state.forcedStoryOrderId = null;
                }
                this.tryQueueNextStoryOrder();
            } else {
                const poolGainByPayout = Math.max(1, Math.round((Number(active.payout) || 0) * 0.05));
                const specialPoolBonus = Math.max(0, Math.round(Number(active.specialRewards?.prestigePoolBonus) || 0));
                const totalPoolGain = poolGainByPayout + specialPoolBonus;
                Game.state.virtualPrestigePool += totalPoolGain;

                const specialChanceBonus = Number(active.specialRewards?.chanceBonus) || 0;
                if (specialChanceBonus > 0) {
                    Game.state.storyChanceBonus += specialChanceBonus;
                }

                if ((active.taskCategory === Game.config.TASK_CATEGORIES.RESEARCH || active.taskCategory === Game.config.TASK_CATEGORIES.PROMOTION) && active.specialTaskId) {
                    const key = String(active.specialTaskId || '').trim();
                    if (key) {
                        const current = this.getResearchTaskCompletions(key);
                        Game.state.researchTaskCompletions[key] = current + 1;
                    }
                }

                const skillPointsReward = Math.max(0, Math.round(Number(active.specialRewards?.skillPoints) || 0));
                if (skillPointsReward > 0) {
                    this.addSkillPoints(skillPointsReward);
                }

                this.syncSpecialTasksQueue();

                // Chapter 1 event hook for special tasks and regular orders
                const specialId = active.specialTaskId;
                if (specialId) {
                    this.handleChapter1Event(`special_complete_${specialId}`);
                } else if (active.taskType) {
                    this.handleChapter1Event(`tasktype_complete_${active.taskType}`);
                }

                // First order completed in Chapter 2 — delayed smoking remark
                if (
                    Game.state.chapter1Completed
                    && !Game.state.ch2FirstOrderCommentShown
                    && active.taskCategory === Game.config.TASK_CATEGORIES.ORDERS
                ) {
                    Game.state.ch2FirstOrderCommentShown = true;
                    setTimeout(() => {
                        this.playDialogueSequence([
                            { speaker: 'gg', text: 'I love smoking so much! I could sit and smoke all day!' },
                            { speaker: 'self', text: 'It scares me how much you smoke. But with your stress levels, I get it.' },
                        ]);
                    }, 800);
                }
            }

            Game.ui.updateCounters();
            Game.ui.updateTaskTimerUi();
            this.startSmokeBreak();
            Game.persist.save();
        },

        failActiveOrder(activeId) {
            const active = Game.state.activeOrder;
            if (!active || active.id !== activeId) return;

            // Проверить триггеры персонажа перед очисткой заказа
            this.checkCharacterComments(active, 'order_failed');

            // Ch1 story fail event hook
            if (!Game.state.chapter1Completed && active.ch1StoryId) {
                this.handleChapter1Event(`story_fail_${active.ch1StoryId}`);
            }

            const penalty = Math.round(Math.abs(active.payout) * 0.5);
            if (!active.noFailPenalty) {
                Game.state.funds -= penalty;
                this.addMoneySpent(penalty);
            }
            Game.state.stats.failedOrders += 1;
            Game.ui.renderStats();
            this.ensureAutogenAffordable();

            Game.state.activeOrder = null;
            Game.ui.updateCounters();
            Game.ui.updateTaskTimerUi();
            this.startSmokeBreak();
            Game.persist.save();
        },

        startSmokeBreak() {
            if (this.isSmokingNow()) return;

            if (Game.state.tutorialMode && !Game.state.characterRevealed) {
                Game.state.characterRevealed = true;
                Game.ui.syncCharacterVisibility();
            }

            this.consumeCigaretteForSmoke();

            this.addCigaretteButts(1);

            Game.state.smokeBreakCount += 1;
            Game.state.stats.totalSmokeBreaks += 1;
            Game.ui.renderStats();

            Game.state.smokeUntil = Date.now() + Game.config.SMOKE_DURATION_MS;
            const reliefBase = this.randomInt(Game.config.CIGARETTE_RELIEF_MIN, Game.config.CIGARETTE_RELIEF_MAX);
            const relief = reliefBase + Math.max(0, Number(Game.state.skillTreeEffects.smokeReliefBonus) || 0);
            Game.state.smokeReliefRemaining = relief;
            Game.state.smokeReliefPerMs = relief / Game.config.SMOKE_DURATION_MS;
            Game.state.smokeReliefLastTickAt = Date.now();
            Game.ui.setStatus(Game.config.STATUS.SMOKE);
            Game.ui.refreshGenerateButton();

            if (Game.state.pendingStoryOutro) {
                Game.state.pendingStoryOutro = false;
                window.setTimeout(() => {
                    Game.intro.playPostStoryOutro();
                }, 120);
            }

            Game.persist.save();
        },

        processSmokeRelief(now = Date.now()) {
            if (Game.state.nicotineWithdrawal) return;
            if (Game.state.smokeReliefRemaining <= 0) return;

            const smokeEnd = Game.state.smokeUntil;
            if (!smokeEnd) {
                Game.state.smokeReliefRemaining = 0;
                Game.state.smokeReliefPerMs = 0;
                Game.state.smokeReliefLastTickAt = 0;
                return;
            }

            const stillSmoking = now < smokeEnd;
            const lastTick = Game.state.smokeReliefLastTickAt || now;
            const effectiveNow = stillSmoking ? now : smokeEnd;
            const elapsedMs = Math.max(0, effectiveNow - lastTick);

            let reliefStep = elapsedMs * Game.state.smokeReliefPerMs;
            if (!stillSmoking) {
                reliefStep = Game.state.smokeReliefRemaining;
            }
            reliefStep = Math.min(Game.state.smokeReliefRemaining, Math.max(0, reliefStep));
            if (reliefStep <= 0) return;

            const stressBefore = Game.state.stress;
            Game.state.stress = this.clamp(Game.state.stress - reliefStep, 0, Game.config.STRESS_MAX);
            const stressReduced = Math.max(0, stressBefore - Game.state.stress);

            Game.state.stats.stressRelievedByCigarettes += stressReduced;
            Game.state.smokeReliefRemaining = Math.max(0, Game.state.smokeReliefRemaining - reliefStep);
            Game.state.smokeReliefLastTickAt = effectiveNow;

            Game.ui.updateStressUi();
            Game.ui.renderStats();

            if (!stillSmoking || Game.state.smokeReliefRemaining <= 0) {
                Game.state.smokeReliefRemaining = 0;
                Game.state.smokeReliefPerMs = 0;
                Game.state.smokeReliefLastTickAt = 0;
            }
        },

        addStress(amount) {
            Game.state.stress = this.clamp(Game.state.stress + amount, 0, Game.config.STRESS_MAX);
            Game.ui.updateStressUi();

            if (Game.state.stress >= Game.config.STRESS_MAX) {
                this.startSmokeBreak();
            }
            Game.persist.save();
        },

        checkCharacterComments(order, triggerType) {
            if (!window.CHARACTER_COMMENTS || !Array.isArray(window.CHARACTER_COMMENTS)) return;

            const matching = window.CHARACTER_COMMENTS.find((comment) => {
                if (!comment || comment.triggerType !== triggerType) return false;
                if (Game.state.shownCharacterComments[comment.id]) return false;
                if (typeof comment.condition !== 'function') return false;
                try {
                    return !!comment.condition(order);
                } catch (error) {
                    return false;
                }
            });

            if (matching) {
                Game.state.shownCharacterComments[matching.id] = true;
                Game.persist.save();
                Game.actions.showCharacterComment(matching.text);
                return true;
            }
            return false;
        },

        showCharacterComment(text, options = {}) {
            const alreadyInCommentMode = !!Game.state.characterCommentMode;
            if (!alreadyInCommentMode) {
                Game.actions.pauseGameLogic();
            }

            const onClose = typeof options.onClose === 'function' ? options.onClose : null;
            if (!alreadyInCommentMode) {
                let activatedOverlayForComment = false;
                if (Game.elems.cinematicOverlay && !Game.elems.cinematicOverlay.classList.contains('active')) {
                    Game.elems.cinematicOverlay.classList.add('active');
                    Game.elems.cinematicOverlay.setAttribute('aria-hidden', 'false');
                    activatedOverlayForComment = true;
                }
                Game.state.characterCommentOverlayForced = activatedOverlayForComment;
            }
            Game.state.characterCommentMode = true;
            Game.state.characterCommentOnClose = onClose;

            if (Game.elems.cinematicBlack) {
                Game.elems.cinematicBlack.classList.add('scene-opened');
            }

            if (Game.elems.vnDialog) {
                Game.elems.vnDialog.classList.add('visible');
                Game.elems.vnDialog.classList.add('chat-theme');
                Game.elems.vnDialog.classList.remove('gg-theme');
                Game.state.dialogActive = true;
            }

            if (Game.elems.vnSpeakerName) {
                Game.elems.vnSpeakerName.textContent = 'ChatDJBT';
            }
            if (Game.elems.vnSpeakerIcon) {
                Game.elems.vnSpeakerIcon.src = 'images/cinematic/chatdjbt-icon.png';
                Game.elems.vnSpeakerIcon.alt = 'ChatDJBT icon';
            }
            if (Game.elems.vnText) {
                Game.intro.typeText(text, Game.elems.vnText, { allowHtml: false });
            }
        },

        closeCharacterComment() {
            if (!Game.state.characterCommentMode) return false;

            if (Game.intro.isTyping()) {
                Game.intro.finishTypingInstant();
                return true;
            }

            const onClose = Game.state.characterCommentOnClose;
            Game.state.characterCommentOnClose = null;
            if (typeof onClose === 'function') {
                const keepDialogOpen = onClose() === true;
                if (keepDialogOpen) {
                    return true;
                }
            }

            if (Game.elems.vnDialog) {
                Game.elems.vnDialog.classList.remove('visible');
            }

            Game.state.dialogActive = false;
            Game.state.characterCommentMode = false;
            Game.actions.resumeGameLogic();

            if (Game.state.characterCommentOverlayForced && Game.elems.cinematicOverlay) {
                Game.elems.cinematicOverlay.classList.remove('active');
                Game.elems.cinematicOverlay.setAttribute('aria-hidden', 'true');
            }

            Game.state.characterCommentOverlayForced = false;
            return true;
        },

        showCharacterCommentSequence(lines) {
            if (!Array.isArray(lines) || !lines.length) return;
            const queue = lines.map((line) => String(line || '').trim()).filter(Boolean);
            if (!queue.length) return;

            const playLine = (index) => {
                if (index >= queue.length) return;
                const text = queue[index];
                const isLast = index >= queue.length - 1;
                this.showCharacterComment(text, {
                    onClose: () => {
                        if (isLast) {
                            return false;
                        }
                        playLine(index + 1);
                        return true;
                    },
                });
            };

            playLine(0);
        },

        playDialogueSequence(lines, onDone) {
            if (!Array.isArray(lines) || !lines.length) {
                if (typeof onDone === 'function') onDone();
                return;
            }
            const speakers = (window.NARRATIVE_COMMENTS && window.NARRATIVE_COMMENTS.speakers) || {};
            const playLine = (index) => {
                if (index >= lines.length) {
                    if (typeof onDone === 'function') onDone();
                    return;
                }
                const entry = lines[index];
                const speakerKey = (typeof entry === 'object' && entry !== null) ? (entry.speaker || 'self') : 'self';
                const text = (typeof entry === 'object' && entry !== null) ? String(entry.text || '') : String(entry || '');
                const speakerData = speakers[speakerKey] || speakers['self'] || { name: 'ChatDJBT', icon: 'images/cinematic/chatdjbt-icon.png' };
                const isLast = index >= lines.length - 1;

                // Override speaker info for this slide
                const afterSetup = () => {
                    if (Game.elems.vnSpeakerName) Game.elems.vnSpeakerName.textContent = speakerData.name;
                    if (Game.elems.vnSpeakerIcon) {
                        Game.elems.vnSpeakerIcon.src = speakerData.icon;
                        Game.elems.vnSpeakerIcon.alt = speakerData.name;
                    }
                };

                this.showCharacterComment(text, {
                    onClose: () => {
                        if (isLast) {
                            return false;
                        }
                        playLine(index + 1);
                        return true;
                    },
                });
                afterSetup();
            };
            playLine(0);
        },

        tryShowCommentOnce(commentId, payload) {
            const key = String(commentId || '').trim();
            if (!key) return false;
            if (Game.state.shownCharacterComments[key]) return false;
            if (Game.state.dialogActive) return false;

            Game.state.shownCharacterComments[key] = true;
            Game.persist.save();

            if (Array.isArray(payload)) {
                this.showCharacterCommentSequence(payload);
            } else {
                this.showCharacterComment(String(payload || ''));
            }
            return true;
        },

        getNarrativeCommentPayload(commentId) {
            const key = String(commentId || '').trim();
            if (!key) return null;
            const map = window.NARRATIVE_COMMENTS && window.NARRATIVE_COMMENTS.firstOpen;
            if (!map || typeof map !== 'object') return null;
            const payload = map[key];
            if (Array.isArray(payload)) {
                const lines = payload.map((line) => String(line || '').trim()).filter(Boolean);
                return lines.length ? lines : null;
            }
            const text = String(payload || '').trim();
            return text || null;
        },

        getMenuTutorialHubPayload() {
            const map = window.NARRATIVE_COMMENTS && window.NARRATIVE_COMMENTS.menuTutorial;
            if (!map || typeof map !== 'object') return null;
            const text = String(map.hub || '').trim();
            return text || null;
        },

        getMenuTutorialCategoryPayload(category) {
            const key = String(category || '').trim();
            if (!key) return null;
            const root = window.NARRATIVE_COMMENTS && window.NARRATIVE_COMMENTS.menuTutorial;
            const categories = root && root.categories;
            if (!categories || typeof categories !== 'object') return null;
            const payload = categories[key];
            if (!Array.isArray(payload)) return null;
            const lines = payload.map((line) => String(line || '').trim()).filter(Boolean);
            return lines.length ? lines : null;
        },

        tryShowShopOpenComment() {
            const payload = this.getNarrativeCommentPayload('chat_shop_opened_once');
            if (!payload) return false;
            return this.tryShowCommentOnce('chat_shop_opened_once', payload);
        },

        tryShowShopCategoryComment(category) {
            if (category === Game.config.SHOP_CATEGORIES.GOODS) {
                const payload = this.getNarrativeCommentPayload('chat_shop_goods_opened_once');
                if (!payload) return false;
                return this.tryShowCommentOnce('chat_shop_goods_opened_once', payload);
            }

            if (category === Game.config.SHOP_CATEGORIES.PROPERTY) {
                const payload = this.getNarrativeCommentPayload('chat_shop_property_opened_once');
                if (!payload) return false;
                return this.tryShowCommentOnce('chat_shop_property_opened_once', payload);
            }

            if (category === Game.config.SHOP_CATEGORIES.CLOTHES) {
                const payload = this.getNarrativeCommentPayload('chat_shop_clothes_opened_once');
                if (!payload) return false;
                return this.tryShowCommentOnce('chat_shop_clothes_opened_once', payload);
            }

            return false;
        },

        tryShowSkillRootPurchasedComment() {
            const key = 'chat_shop_root_upgrade_purchased_once';
            const payload = this.getNarrativeCommentPayload(key);
            if (!payload) return false;
            return this.tryShowCommentOnce(key, payload);
        },

        tryShowMusicToggleComment(enabledNow) {
            if (enabledNow) {
                const payload = this.getNarrativeCommentPayload('chat_music_first_on');
                if (!payload) return false;
                return this.tryShowCommentOnce('chat_music_first_on', payload);
            }

            if (!Game.state.shownCharacterComments.chat_music_first_on) return false;
            const payload = this.getNarrativeCommentPayload('chat_music_first_off_after_on');
            if (!payload) return false;
            return this.tryShowCommentOnce('chat_music_first_off_after_on', payload);
        },

        tryShowAchievementsOpenComment() {
            const payload = this.getNarrativeCommentPayload('chat_achievements_opened_once');
            if (!payload) return false;
            return this.tryShowCommentOnce('chat_achievements_opened_once', payload);
        },

        tryShowStatsOpenComment() {
            const payload = this.getNarrativeCommentPayload('chat_stats_opened_once');
            if (!payload) return false;
            return this.tryShowCommentOnce('chat_stats_opened_once', payload);
        },

        tryShowResetPromptComment() {
            const payload = this.getNarrativeCommentPayload('chat_reset_prompt_once');
            if (!payload) return false;
            return this.tryShowCommentOnce('chat_reset_prompt_once', payload);
        },

        tryShowResetCancelComment() {
            if (!Game.state.shownCharacterComments.chat_reset_prompt_once) return false;
            const payload = this.getNarrativeCommentPayload('chat_reset_cancel_once');
            if (!payload) return false;
            return this.tryShowCommentOnce('chat_reset_cancel_once', payload);
        },

        tryShowUpgradesMenuOpenComment() {
            const payload = this.getNarrativeCommentPayload('chat_upgrades_menu_opened_once');
            if (!payload) return false;
            return this.tryShowCommentOnce('chat_upgrades_menu_opened_once', payload);
        },

        tryShowCategoryFirstOpenComment(category) {
            // Only fire if the menuTutorial hint for this category was already seen
            // in a previous session — avoids showing two comments simultaneously.
            if (!Game.state.menuTutorialSeen[category]) return false;
            if (category === Game.config.TASK_CATEGORIES.RESEARCH) {
                const payload = this.getNarrativeCommentPayload('chat_research_category_opened_once');
                if (!payload) return false;
                return this.tryShowCommentOnce('chat_research_category_opened_once', payload);
            }
            if (category === Game.config.TASK_CATEGORIES.PROMOTION) {
                const payload = this.getNarrativeCommentPayload('chat_promotion_category_opened_once');
                if (!payload) return false;
                return this.tryShowCommentOnce('chat_promotion_category_opened_once', payload);
            }
            return false;
        },

        applyAchievementReward(id) {
            const source = Array.isArray(window.ACHIEVEMENTS_DATA) ? window.ACHIEVEMENTS_DATA : [];
            const achievement = source.find((a) => a.id === id);
            if (!achievement) return;
            if (Game.state.claimedAchievements[id]) return;
            if (typeof achievement.condition !== 'function' || !achievement.condition(Game.state)) return;

            const reward = achievement.rewardValue;
            if (reward) {
                if (reward.type === 'funds') {
                    Game.state.funds = Math.round(Game.state.funds + reward.amount);
                } else if (reward.type === 'xp') {
                    this.addExperience(reward.amount);
                } else if (reward.type === 'skillPoints') {
                    Game.state.skillPoints = Math.max(0, Math.round((Game.state.skillPoints || 0) + reward.amount));
                }
            }
            Game.state.claimedAchievements[id] = true;
            Game.persist.save();
            Game.ui.renderAchievements();
            Game.ui.updateCounters();
        },

        checkAchievements() {
            // Re-render to update unlocked/claimed states.
            Game.ui.renderAchievements();
        },

        markAllMenuTutorialSeen() {
            Object.keys(Game.state.menuTutorialSeen).forEach((key) => {
                Game.state.menuTutorialSeen[key] = true;
            });
            Game.persist.save();
        },

        tryShowOrdersHubTutorialHint() {
            if (Game.state.tutorialSkipped) return;
            if (Game.state.menuTutorialSeen.hub) return;
            if (Game.state.dialogActive) return;

            const payload = this.getMenuTutorialHubPayload();
            if (!payload) return;

            Game.state.menuTutorialSeen.hub = true;
            Game.persist.save();
            this.showCharacterComment(payload);
        },

        tryShowOrdersCategoryTutorialHint(category) {
            if (Game.state.tutorialSkipped) return;
            if (Game.state.dialogActive) return;

            const key = String(category || '').trim();
            const lines = this.getMenuTutorialCategoryPayload(key);
            if (!key || !lines || !lines.length) return;
            if (Game.state.menuTutorialSeen[key]) return;

            Game.state.menuTutorialSeen[key] = true;
            Game.persist.save();
            this.showCharacterCommentSequence(lines);
        },

        reduceStress(amount) {
            Game.state.stress = this.clamp(Game.state.stress - amount, 0, Game.config.STRESS_MAX);
            Game.ui.updateStressUi();
            Game.persist.save();
        },

        addExperience(value) {
            Game.state.xp += value;
            let levelChanged = false;
            while (Game.state.xp >= Game.state.xpToNext) {
                Game.state.xp -= Game.state.xpToNext;
                Game.state.level += 1;
                Game.state.xpToNext = Math.round(100 * Math.pow(Game.state.level, 1.16));
                this.addSkillPoints(Game.state.level * 2);
                levelChanged = true;
            }
            this.ensureForestUnlockByLevel();
            this.refreshKnownness();
            if (levelChanged) {
                this.onProgressionUpdated();
            }
            Game.ui.updateLevelUi();
            Game.ui.renderShopUpgrades();
            Game.persist.save();
        },

        ensureAutogenAffordable() {
            if (!Game.state.autogenEnabled) return;
            if (Game.state.funds >= Game.config.AUTOGEN_TICK_COST) return;
            Game.state.autogenEnabled = false;
            Game.ui.renderAutogenToggle();
        },

        applyGoodsModifiersFromState() {
            const baseCooldown = Math.max(250, Math.round(Number(Game.config.BASE_GENERATION_COOLDOWN_MS) || 5000));
            const energActive = !!Game.state.goods.energizerActive;
            const vitaminsActive = !!Game.state.goods.vitaminsActive;
            const cooldownBonus = Math.max(0.1, Number(Game.state.skillTreeEffects.generationCooldownMultiplierBonus) || 1);
            const stressBonus = Math.max(0.1, Number(Game.state.skillTreeEffects.generationStressMultiplierBonus) || 1);
            const zenBonus = Math.max(0.1, Number(Game.state.skillTreeEffects.zenDecayMultiplierBonus) || 1);

            Game.state.generationCooldownMs = energActive
                ? Math.max(250, Math.round(baseCooldown * (Number(Game.config.ENERGIZER_COOLDOWN_MULT) || 0.65)))
                : baseCooldown;
            Game.state.generationCooldownMs = Math.max(220, Math.round(Game.state.generationCooldownMs * cooldownBonus));
            Game.state.generationStressMultiplier = (energActive ? 1.5 : 1) * stressBonus;
            Game.state.zenDecayMultiplier = (vitaminsActive ? 2 : 1) * zenBonus;

            Game.ui.refreshGenerateButton();
        },

        clearEnergizerEffects() {
            Game.state.goods.energizerActive = false;
            this.applyGoodsModifiersFromState();
        },

        getCigarettesPerPack() {
            const base = Math.max(1, Math.round(Number(Game.config.CIGARETTES_PER_PACK) || 25));
            const bonus = Math.max(0, Math.round(Number(Game.state.skillTreeEffects.cigsPerPackBonus) || 0));
            return base + bonus;
        },

        tryAutoBuyCigarettesPack() {
            if (!Game.state.goods.cigsAutoBuy) return false;
            const cigsItem = (Game.config.SHOP_GOODS || []).find((item) => item && item.id === 'cigs');
            if (!cigsItem) return false;
            const price = Math.max(0, Math.round(Number(cigsItem.price) || 0));
            if (Game.state.funds < price) return false;

            Game.state.funds -= price;
            this.addMoneySpent(price);
            Game.state.goods.cigarettes += this.getCigarettesPerPack();
            Game.ui.updateCounters();
            return true;
        },

        consumeCigaretteForSmoke() {
            if (Game.state.goods.cigarettes <= 0) {
                this.tryAutoBuyCigarettesPack();
            }
            if (Game.state.goods.cigarettes > 0) {
                Game.state.goods.cigarettes = Math.max(0, Game.state.goods.cigarettes - 1);
                if (Game.state.nicotineWithdrawal) {
                    Game.state.nicotineWithdrawal = false;
                    this.startAutogenTicker();
                }
            } else {
                if (!Game.state.nicotineWithdrawal) {
                    Game.state.nicotineWithdrawal = true;
                    this.startAutogenTicker();
                }
            }
            if (Game.state.shopMenuView === 'category' && Game.state.shopMenuTab === Game.config.SHOP_CATEGORIES.GOODS) {
                Game.ui.renderShopUpgrades();
            }
        },

        buyGood(goodId) {
            const goods = Array.isArray(Game.config.SHOP_GOODS) ? Game.config.SHOP_GOODS : [];
            const good = goods.find((item) => item && item.id === goodId);
            if (!good) return;

            const price = Math.max(0, Math.round(Number(good.price) || 0));
            if (Game.state.funds < price) return;

            if (goodId === 'energ' && Game.state.goods.energizerActive) return;
            if (goodId === 'meds' && Game.state.goods.vitaminsActive) return;

            Game.state.funds -= price;
            this.addMoneySpent(price);

            if (goodId === 'cigs') {
                Game.state.goods.cigarettes += this.getCigarettesPerPack();
            } else if (goodId === 'energ') {
                Game.state.goods.energizerActive = true;
                this.applyGoodsModifiersFromState();
            } else if (goodId === 'borj') {
                this.clearEnergizerEffects();
            } else if (goodId === 'meds') {
                this.clearEnergizerEffects();
                Game.state.goods.vitaminsActive = true;
                this.applyGoodsModifiersFromState();
            }

            this.ensureAutogenAffordable();
            Game.ui.updateCounters();
            Game.ui.renderShopUpgrades();
            Game.persist.save();
        },

        toggleCigsAutoBuy() {
            Game.state.goods.cigsAutoBuy = !Game.state.goods.cigsAutoBuy;
            Game.ui.renderShopUpgrades();
            Game.persist.save();
        },

        buyUpgrade(upgradeId) {
            const upgrade = Game.config.UPGRADES.find((item) => item.id === upgradeId);
            if (!upgrade) return;
            if (Game.state.upgrades[upgrade.id]) return;
            if (Game.state.level < upgrade.requiredLevel) return;
            if (Game.state.funds < upgrade.price) return;

            Game.state.funds -= upgrade.price;
            this.addMoneySpent(upgrade.price);
            Game.state.upgrades[upgrade.id] = true;
            if (upgrade.id === 'headhunter') {
                Game.state.jobSearchUpgrade += 1;
            }
            if (upgrade.id === 'brandmentor') {
                Game.state.prestigeTransferRatioBonus += 0.05;
            }
            this.onProgressionUpdated();
            this.ensureAutogenAffordable();

            Game.ui.updateCounters();
            Game.ui.renderShopUpgrades();
            Game.ui.renderAutogenToggle();
            Game.persist.save();
        },

        toggleAutogen() {
            if (!Game.state.upgrades.autogen) return;
            if (!Game.state.autogenEnabled && Game.state.funds < Game.config.AUTOGEN_TICK_COST) return;

            Game.state.autogenEnabled = !Game.state.autogenEnabled;
            Game.ui.renderAutogenToggle();
            Game.persist.save();
        },

        processAutogenTick() {
            if (this.isLogicPaused()) return;
            if (!Game.state.upgrades.autogen || !Game.state.autogenEnabled) return;
            if (!Game.state.activeOrder) return;

            if (Game.state.funds < Game.config.AUTOGEN_TICK_COST) {
                Game.state.autogenEnabled = false;
                Game.ui.renderAutogenToggle();
                Game.persist.save();
                return;
            }

            Game.state.funds -= Game.config.AUTOGEN_TICK_COST;
            this.addMoneySpent(Game.config.AUTOGEN_TICK_COST);
            Game.ui.updateCounters();

            if (!Game.state.activeOrder || Game.state.activeOrder.remainingGenerations <= 0) return;

            Game.state.activeOrder.remainingGenerations -= 1;
            Game.state.stats.autogenGenerations += 1;
            Game.ui.renderStats();
            Game.ui.refreshGenerateButton();

            if (Game.state.activeOrder && Game.state.activeOrder.remainingGenerations <= 0) {
                this.completeActiveOrder();
            }
        },

        startAutogenTicker() {
            if (Game.state.autogenIntervalId) clearInterval(Game.state.autogenIntervalId);
            const tickMs = Game.state.nicotineWithdrawal
                ? (Game.config.AUTOGEN_TICK_MS + Game.config.AUTOGEN_NO_CIGS_ADD_MS) * Game.config.AUTOGEN_NO_CIGS_MULT
                : Game.config.AUTOGEN_TICK_MS;
            Game.state.autogenIntervalId = setInterval(() => {
                Game.actions.processAutogenTick();
            }, tickMs);
        },

        toggleSfx() {
            Game.state.audio.sfxEnabled = !Game.state.audio.sfxEnabled;
            Game.ui.renderAudioToggles();
            Game.persist.save();
        },

        toggleMusic() {
            Game.state.audio.musicEnabled = !Game.state.audio.musicEnabled;
            Game.audio.syncMusicEnabledState();
            this.tryShowMusicToggleComment(!!Game.state.audio.musicEnabled);
            Game.ui.renderAudioToggles();
            Game.persist.save();
        },

        completeTutorialFlow() {
            Game.state.tutorialMode = false;
            Game.state.tutorialCompleted = true;
            Game.state.introCompleted = true;
            Game.state.characterRevealed = true;
            Game.state.forcedStoryOrderId = null;
            Game.state.job_chance = Game.config.BASE_JOB_CHANCE;
            Game.state.savedJobChanceBeforeTutorial = null;
            Game.state.zenEnabled = true;
            this.onProgressionUpdated();
            Game.ui.syncCharacterVisibility();
            Game.ui.revealAllTutorialFeatures();
            Game.persist.save();

            if (Game.elems.cinematicOverlay) {
                Game.elems.cinematicOverlay.classList.remove('active');
                Game.elems.cinematicOverlay.setAttribute('aria-hidden', 'true');
            }
            if (Game.elems.cinematicSkipBtn) {
                Game.elems.cinematicSkipBtn.style.display = 'none';
                Game.elems.cinematicSkipBtn.setAttribute('aria-hidden', 'true');
            }
        },

        setupEventHandlers() {
            if (Game.elems.ordersBtn) {
                Game.elems.ordersBtn.addEventListener('click', () => {
                    Game.state.hasNewOrders = false;
                    Game.ui.setOrdersAlertVisible(false);
                    Game.ui.openOverlay(Game.elems.ordersMenu);
                });
            }

            if (Game.elems.fundsBtn) {
                Game.elems.fundsBtn.addEventListener('click', () => Game.ui.openOverlay(Game.elems.shopMenu));
            }

            if (Game.elems.menuBtn) {
                Game.elems.menuBtn.addEventListener('click', () => Game.ui.openOverlay(Game.elems.mainMenuOverlay));
            }

            if (Game.elems.closeButtons) {
                Game.elems.closeButtons.forEach((btn) => {
                    if (!btn) return;
                    btn.addEventListener('click', () => {
                        Game.ui.closeAllOverlays([Game.elems.mainMenuOverlay, Game.elems.ordersMenu, Game.elems.shopMenu, Game.elems.achievementsMenu, Game.elems.statsMenu]);
                    });
                });
            }

            if (Game.elems.startWorkBtn) {
                Game.elems.startWorkBtn.addEventListener('click', () => {
                    Game.actions.startSelectedOrder();
                });
            }

            if (Game.elems.ordersBackBtn) {
                Game.elems.ordersBackBtn.addEventListener('click', () => {
                    Game.ui.showOrdersHubView();
                });
            }

            if (Game.elems.statsBackBtn) {
                Game.elems.statsBackBtn.addEventListener('click', () => {
                    Game.ui.closeOverlay(Game.elems.statsMenu);
                });
            }

            if (Game.elems.achievementsBackBtn) {
                Game.elems.achievementsBackBtn.addEventListener('click', () => {
                    Game.ui.closeOverlay(Game.elems.achievementsMenu);
                });
            }

            if (Game.elems.bittrickHubButtons) {
                Game.elems.bittrickHubButtons.forEach((btn) => {
                    btn.addEventListener('click', () => {
                        const category = btn.dataset.category || Game.config.TASK_CATEGORIES.ORDERS;
                        if (category in Game.state.unlockedMenus && !Game.state.unlockedMenus[category]) return;
                        Game.ui.showOrdersCategoryView(category);
                    });
                });
            }

            if (Game.elems.shopHubButtons && Game.elems.shopHubButtons.length) {
                Game.elems.shopHubButtons.forEach((btn) => {
                    btn.addEventListener('click', () => {
                        const category = btn.dataset.shopCategory || Game.config.SHOP_CATEGORIES.GOODS;
                        if (category in Game.state.unlockedMenus && !Game.state.unlockedMenus[category]) return;
                        Game.ui.showShopCategoryView(category);
                    });
                });
            }

            if (Game.elems.shopDebugIntroBtn) {
                Game.elems.shopDebugIntroBtn.addEventListener('click', () => {
                    delete Game.state.shownCharacterComments.skill_tree_first_intro_seen;
                    Game.persist.save();
                    Game.ui.showShopCategoryView(Game.config.SHOP_CATEGORIES.UPGRADES);
                });
            }

            if (Game.elems.shopBackBtn) {
                Game.elems.shopBackBtn.addEventListener('click', () => {
                    Game.ui.showShopHubView();
                    Game.ui.renderShopUpgrades();
                });
            }

            if (Game.elems.shopCategoryList) {
                Game.elems.shopCategoryList.addEventListener('click', (event) => {
                    const autoBuyBtn = event.target.closest('.good-auto-buy-btn');
                    if (autoBuyBtn) {
                        Game.actions.toggleCigsAutoBuy();
                        return;
                    }

                    const goodButton = event.target.closest('.good-buy-btn');
                    if (goodButton) {
                        const goodId = String(goodButton.dataset.goodId || '').trim();
                        if (!goodId) return;
                        Game.actions.buyGood(goodId);
                        return;
                    }

                    const upgradeButton = event.target.closest('.upgrade-buy-btn');
                    if (upgradeButton) {
                        Game.actions.buyUpgrade(upgradeButton.dataset.upgradeId);
                    }
                });
            }

            if (Game.elems.autogenToggle) {
                Game.elems.autogenToggle.addEventListener('click', () => {
                    Game.actions.toggleAutogen();
                });
            }

            if (Game.elems.ordersList) {
                Game.elems.ordersList.addEventListener('click', (event) => {
                    const card = event.target.closest('.order-item');
                    if (!card) return;
                    if (card.dataset.locked === 'true') return;
                    Game.actions.selectOrder(card.dataset.orderId);
                });

                Game.elems.ordersList.addEventListener('keydown', (event) => {
                    if (event.key !== 'Enter' && event.key !== ' ') return;
                    const card = event.target.closest('.order-item');
                    if (!card) return;
                    if (card.dataset.locked === 'true') return;
                    event.preventDefault();
                    Game.actions.selectOrder(card.dataset.orderId);
                });
            }

            if (Game.elems.generateBtn) {
                Game.elems.generateBtn.addEventListener('click', () => {
                    Game.actions.registerGenerationStep();
                });
            }

            if (Game.elems.sfxToggle) {
                Game.elems.sfxToggle.addEventListener('click', () => Game.actions.toggleSfx());
            }

            if (Game.elems.musicToggle) {
                Game.elems.musicToggle.addEventListener('click', () => Game.actions.toggleMusic());
            }

            if (Game.elems.achievementsOpenBtn) {
                Game.elems.achievementsOpenBtn.addEventListener('click', () => {
                    Game.ui.openOverlay(Game.elems.achievementsMenu);
                });
            }

            if (Game.elems.statsOpenBtn) {
                Game.elems.statsOpenBtn.addEventListener('click', () => {
                    Game.ui.openOverlay(Game.elems.statsMenu);
                });
            }

            if (Game.elems.resetProgressBtn && Game.elems.resetConfirm) {
                Game.elems.resetProgressBtn.addEventListener('click', () => {
                    Game.elems.resetConfirm.hidden = false;
                    Game.actions.tryShowResetPromptComment();
                });
            }

            if (Game.elems.cancelResetBtn && Game.elems.resetConfirm) {
                Game.elems.cancelResetBtn.addEventListener('click', () => {
                    Game.elems.resetConfirm.hidden = true;
                    Game.actions.tryShowResetCancelComment();
                });
            }

            if (Game.elems.confirmResetBtn) {
                Game.elems.confirmResetBtn.addEventListener('click', () => {
                    Game.persist.resetAll();
                });
            }

            if (Game.elems.debugFullResetBtn) {
                Game.elems.debugFullResetBtn.addEventListener('click', () => {
                    Game.persist.resetDebugAll();
                });
            }

            if (Game.elems.langBtnEn) {
                Game.elems.langBtnEn.addEventListener('click', () => {
                    Game.state.language = 'en';
                    try { localStorage.setItem(Game.config.LANGUAGE_SAVE_KEY, 'en'); } catch (e) { /* ignore */ }
                    Game.ui.refreshLangToggle();
                });
            }

            if (Game.elems.langBtnRu) {
                Game.elems.langBtnRu.addEventListener('click', () => {
                    Game.state.language = 'ru';
                    try { localStorage.setItem(Game.config.LANGUAGE_SAVE_KEY, 'ru'); } catch (e) { /* ignore */ }
                    Game.ui.refreshLangToggle();
                });
            }

            if (Game.elems.debugInstantGenBtn) {
                Game.elems.debugInstantGenBtn.addEventListener('click', () => {
                    Game.state.debugInstantGen = !Game.state.debugInstantGen;
                    Game.elems.debugInstantGenBtn.classList.toggle('active', Game.state.debugInstantGen);
                    Game.elems.debugInstantGenBtn.title = Game.state.debugInstantGen ? 'Fast gen: ON (20x)' : 'Fast gen: OFF';
                    Game.state.generationCooldownUntil = 0;
                    Game.ui.refreshGenerateButton();
                });
            }

            if (Game.elems.thoughtNextBtn) {
                Game.elems.thoughtNextBtn.addEventListener('click', () => {
                    Game.intro.closeThought();
                });
            }

            if (Game.elems.vnNextBtn) {
                Game.elems.vnNextBtn.addEventListener('click', () => {
                    const closedCharacterComment = Game.actions.closeCharacterComment();
                    if (!closedCharacterComment) {
                        Game.intro.closeDialog();
                    }
                });
            }

            if (Game.elems.tutorialContinueBtn) {
                Game.elems.tutorialContinueBtn.addEventListener('click', () => {
                    Game.intro.choosePath(false);
                });
            }

            if (Game.elems.tutorialSkipBtn) {
                Game.elems.tutorialSkipBtn.addEventListener('click', () => {
                    Game.intro.choosePath(true);
                });
            }

            if (Game.elems.cinematicSkipBtn) {
                Game.elems.cinematicSkipBtn.addEventListener('click', () => {
                    Game.intro.skipToChoice();
                });
            }

            const chapterEndCloseBtn = document.getElementById('chapter-end-close-btn');
            if (chapterEndCloseBtn) {
                chapterEndCloseBtn.addEventListener('click', () => {
                    const popup = document.getElementById('chapter-end-popup');
                    if (popup) {
                        popup.classList.remove('active');
                        popup.setAttribute('aria-hidden', 'true');
                    }
                    Game.actions.resumeGameLogic();
                });
            }
        },
    },

    init() {
        this.elems.container = document.querySelector('.game-container');
        this.elems.ordersBtn = document.getElementById('orders-btn');
        this.elems.fundsBtn = document.getElementById('funds-btn');
        this.elems.generateBtn = document.getElementById('generate-btn');
        this.elems.characterSprite = document.getElementById('character-sprite');
        this.elems.levelPanel = document.querySelector('.level-panel');
        this.elems.stressPanel = document.querySelector('.stress-panel');

        this.elems.ordersMenu = document.getElementById('orders-menu');
        this.elems.shopMenu = document.getElementById('shop-menu');
        this.elems.statsMenu = document.getElementById('stats-menu');
        this.elems.mainMenuOverlay = document.getElementById('main-menu-overlay');
        this.elems.achievementsMenu = document.getElementById('achievements-menu');
        this.elems.menuBtn = document.getElementById('menu-btn');
        this.elems.closeButtons = document.querySelectorAll('.menu-close');
        this.elems.startWorkBtn = document.getElementById('start-work-btn');
        this.elems.ordersBackBtn = document.getElementById('orders-back-btn');
        this.elems.bittrickHubView = document.getElementById('bittrick-hub-view');
        this.elems.bittrickCategoryView = document.getElementById('bittrick-category-view');
        this.elems.bittrickCategoryTitle = document.getElementById('bittrick-category-title');
        this.elems.bittrickHubButtons = document.querySelectorAll('.bittrick-hub-btn');
        this.elems.ordersList = document.getElementById('orders-list');
        this.elems.ordersAlert = document.getElementById('orders-alert');
        this.elems.levelLabel = document.getElementById('level-label');
        this.elems.levelFill = document.getElementById('level-fill');
        this.elems.stressLabel = document.getElementById('stress-label');
        this.elems.stressFill = document.getElementById('stress-fill');
        this.elems.taskTimerPanel = document.getElementById('task-timer-panel');
        this.elems.taskTimerFill = document.getElementById('task-timer-fill');
        this.elems.currentTaskLabel = document.getElementById('current-task-label');
        this.elems.shopHubView = document.getElementById('shop-hub-view');
        this.elems.shopCategoryView = document.getElementById('shop-category-view');
        this.elems.shopCategoryTitle = document.getElementById('shop-category-title');
        this.elems.shopHubButtons = document.querySelectorAll('.shop-hub-btn');
        this.elems.shopDebugIntroBtn = document.getElementById('shop-debug-intro-btn');
        this.elems.debugInstantGenBtn = document.getElementById('debug-instant-gen-btn');
        this.elems.shopCategoryList = document.getElementById('shop-category-list');
        this.elems.shopBackBtn = document.getElementById('shop-back-btn');
        this.elems.achievementsList = document.getElementById('achievements-list');
        this.elems.autogenTogglePanel = document.getElementById('autogen-toggle-panel');
        this.elems.autogenToggle = document.getElementById('autogen-toggle');
        this.elems.autogenToggleLabel = document.getElementById('autogen-toggle-label');

        this.elems.ordersValue = document.getElementById('orders-value');
        this.elems.fundsValue = document.getElementById('funds-value');

        this.elems.sfxToggle = document.getElementById('sfx-toggle');
        this.elems.sfxIcon = document.getElementById('sfx-icon');
        this.elems.musicToggle = document.getElementById('music-toggle');
        this.elems.musicIcon = document.getElementById('music-icon');
        this.elems.achievementsOpenBtn = document.getElementById('achievements-open-btn');
        this.elems.statsOpenBtn = document.getElementById('stats-open-btn');
        this.elems.statsPanel = document.getElementById('stats-panel');
        this.elems.resetProgressBtn = document.getElementById('reset-progress-btn');
        this.elems.resetConfirm = document.getElementById('reset-confirm');
        this.elems.confirmResetBtn = document.getElementById('confirm-reset-btn');
        this.elems.cancelResetBtn = document.getElementById('cancel-reset-btn');
        this.elems.debugFullResetBtn = document.getElementById('debug-full-reset-btn');
        this.elems.langBtnEn = document.getElementById('lang-btn-en');
        this.elems.langBtnRu = document.getElementById('lang-btn-ru');
        this.elems.statsBackBtn = document.getElementById('stats-back-btn');
        this.elems.achievementsBackBtn = document.getElementById('achievements-back-btn');
        this.elems.categoryCounters = document.getElementById('category-counters');
        this.elems.shopCounters = document.getElementById('shop-counters');

        this.elems.cinematicOverlay = document.getElementById('cinematic-overlay');
        this.elems.cinematicBlack = document.getElementById('cinematic-black');
        this.elems.cinematicFlash = document.getElementById('cinematic-flash');
        this.elems.cinematicSplit = document.getElementById('cinematic-split');
        this.elems.cinematicSkipBtn = document.getElementById('cinematic-skip-btn');
        this.elems.phoneHand = document.getElementById('phone-hand');
        this.elems.thoughtBox = document.getElementById('thought-box');
        this.elems.thoughtText = document.getElementById('thought-text');
        this.elems.thoughtNextBtn = document.getElementById('thought-next-btn');
        this.elems.vnDialog = document.getElementById('vn-dialog');
        this.elems.vnSpeakerIcon = document.getElementById('vn-speaker-icon');
        this.elems.vnSpeakerName = document.getElementById('vn-speaker-name');
        this.elems.vnText = document.getElementById('vn-text');
        this.elems.vnNextBtn = document.getElementById('vn-next-btn');
        this.elems.tutorialChoice = document.getElementById('tutorial-choice');
        this.elems.tutorialContinueBtn = document.getElementById('tutorial-continue-btn');
        this.elems.tutorialSkipBtn = document.getElementById('tutorial-skip-btn');
        this.elems.spotlightRing = document.getElementById('spotlight-ring');

        this.persist.load();
        // Load language from its own isolated key (not affected by game resets)
        try {
            const savedLang = localStorage.getItem(this.config.LANGUAGE_SAVE_KEY);
            if (savedLang === 'en' || savedLang === 'ru') {
                this.state.language = savedLang;
            }
        } catch (e) { /* ignore */ }
        this.actions.syncSkillTreeLegacyPurchases();
        this.actions.ensureForestUnlockByLevel();
        this.actions.applyGoodsModifiersFromState();
        this.state.unlockedTaskTypes = Array.isArray(this.state.unlockedTaskTypes) && this.state.unlockedTaskTypes.length
            ? Array.from(new Set(this.state.unlockedTaskTypes))
            : [...this.config.DEFAULT_UNLOCKED_TASK_TYPES];
        this.actions.refreshKnownness();
        this.actions.updateJobSearchIntervalCache();
        this.ui.applyLayoutOverrides();
        if (this.state.tutorialCompleted) {
            this.state.characterRevealed = true;
            this.ui.revealAllTutorialFeatures();
        }
        this.actions.initializeTemplateDeck();
        this.actions.syncSpecialTasksQueue();
        this.actions.restoreStoryQueue();
        this.actions.sortOrdersByPriority();
        this.ui.updateCounters();
        this.ui.updateLevelUi();
        this.ui.updateStressUi();
        this.ui.updateTaskTimerUi();
        this.ui.renderAutogenToggle();
        this.ui.renderAchievements();
        this.ui.renderAudioToggles();
        this.audio.init();
        this.ui.showShopHubView();
        this.ui.renderShopUpgrades();
        this.ui.renderUnlockedMenuButtons();
        this.ui.renderStats();
        this.ui.refreshLangToggle();
        this.ui.setOrdersAlertVisible(false);
        this.ui.setStatus(this.config.STATUS.REST);
        this.ui.syncCharacterVisibility();
        this.ui.applyTutorialUiVisibility();
        this.ui.refreshGenerateButton();
        this.ui.showOrdersHubView();
        this.ui.applyDigitsTypography(document.body);

        this.actions.setupEventHandlers();
        this.actions.startOrderSpawner();
        this.actions.startOrderLifetimeWatcher();
        this.actions.startZenDecay();
        this.actions.startAutogenTicker();

        this.intro.startIfNeeded();
        this.persist.save();
    },
};

Game.init();
