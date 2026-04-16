window.ACHIEVEMENTS_DATA = [
    // ── Контракт ────────────────────────────────────────────
    {
        id: 'contractor',
        title: 'Контрактор',
        description: 'Подписал контракт.',
        rewardDisplay: '+1 Очко навыка',
        rewardValue: { type: 'skillPoints', amount: 1 },
        condition: (state) => !!(state.completedStoryOrderIds?.includes('outistic_contract')),
    },
    // ── Курс по ИИ ───────────────────────────────────────────
    {
        id: 'ai_course_1',
        title: 'Школьник',
        description: 'Прошёл курс по ИИ.',
        rewardDisplay: '+1 Очко навыка',
        rewardValue: { type: 'skillPoints', amount: 1 },
        condition: (state) => (state.researchTaskCompletions?.['ai_course'] || 0) >= 1,
    },
    {
        id: 'ai_course_5',
        title: 'Студент',
        description: 'Прошёл курс по ИИ.',
        rewardDisplay: '+3 Очка навыка',
        rewardValue: { type: 'skillPoints', amount: 3 },
        condition: (state) => (state.researchTaskCompletions?.['ai_course'] || 0) >= 5,
    },
    {
        id: 'ai_course_10',
        title: 'Учёный',
        description: 'Прошёл курс по ИИ.',
        rewardDisplay: '+5 Очков навыка',
        rewardValue: { type: 'skillPoints', amount: 5 },
        condition: (state) => (state.researchTaskCompletions?.['ai_course'] || 0) >= 10,
    },
    // ── Компьютерное зрение ──────────────────────────────────
    {
        id: 'ai_vis_unlocked',
        title: 'Смотри внимательно!',
        description: 'Открыл компьютерное зрение.',
        rewardDisplay: '+1 Очко экспертизы',
        rewardValue: { type: 'expertPoints', amount: 1 },
        condition: (state) => (state.skillTree?.tiers?.['ai_vis'] || 0) >= 1,
    },
    // ── Работа по контракту ──────────────────────────────────
    {
        id: 'outistic_work_5',
        title: 'Пол-ставки',
        description: 'Поработал по контракту.',
        rewardDisplay: '+5 000₽',
        rewardValue: { type: 'funds', amount: 5000 },
        condition: (state) => (state.researchTaskCompletions?.['outistic_work'] || 0) >= 5,
    },
    {
        id: 'outistic_work_10',
        title: 'Штатный сотрудник',
        description: 'Увлёкся работой по контракту.',
        rewardDisplay: '+15 000₽',
        rewardValue: { type: 'funds', amount: 15000 },
        condition: (state) => (state.researchTaskCompletions?.['outistic_work'] || 0) >= 10,
    },
    {
        id: 'outistic_work_20',
        title: 'Вахта',
        description: 'Это уже привязанность.',
        rewardDisplay: '+25 000₽',
        rewardValue: { type: 'funds', amount: 25000 },
        condition: (state) => (state.researchTaskCompletions?.['outistic_work'] || 0) >= 20,
    },
    {
        id: 'outistic_work_100',
        title: 'Артдиректор',
        description: 'Мне это нравится или это стокгольмский синдром?',
        rewardDisplay: '+50 000₽',
        rewardValue: { type: 'funds', amount: 50000 },
        condition: (state) => (state.researchTaskCompletions?.['outistic_work'] || 0) >= 100,
    },
    // ── Перекуры ─────────────────────────────────────────────
    {
        id: 'black_lungs',
        title: 'Черные лёгкие',
        description: 'Картинки на пачке сигарет вызывают ностальгию.',
        rewardDisplay: '+10 бычков',
        rewardValue: { type: 'cigaretteButts', amount: 10 },
        condition: (state) => (state.stats?.totalSmokeBreaks || 0) >= 25,
    },
    // ── Недвижимость ─────────────────────────────────────────
    {
        id: 'abandoned_full',
        title: 'Домовой',
        description: 'Обустроился в заброшке.',
        rewardDisplay: '+25 000₽  +1 EP',
        rewardValues: [
            { type: 'funds',        amount: 25000 },
            { type: 'expertPoints', amount: 1 },
        ],
        condition: (state) => {
            const loc = state.property?.locations?.abandoned;
            if (!loc?.items) return false;
            return ['floor', 'walls', 'ceiling', 'bed', 'carpet', 'window']
                .every(id => loc.items[id]?.purchased === true);
        },
    },
    // ── Стресс ───────────────────────────────────────────────
    {
        id: 'antistress',
        title: 'Антистресс',
        description: 'Ты умеешь выдохнуть.',
        rewardDisplay: '+1 Очко навыка',
        rewardValue: { type: 'skillPoints', amount: 1 },
        condition: (state) => (state.stats?.totalStressRelieved || 0) >= 500,
    },
    {
        id: 'relaxounce',
        title: 'Расслабоунс',
        description: 'Как же он кайфует.',
        rewardDisplay: '+5 Очков навыка',
        rewardValue: { type: 'skillPoints', amount: 5 },
        condition: (state) => (state.stats?.totalStressRelieved || 0) >= 5000,
    },
    // ── Автоген ──────────────────────────────────────────────
    {
        id: 'delegation',
        title: 'Делегирование',
        description: 'Наконец можно спокойно покурить.',
        rewardDisplay: '+5 000₽',
        rewardValue: { type: 'funds', amount: 5000 },
        condition: (state) => (state.stats?.autogenSuccesses || 0) >= 50,
    },
    {
        id: 'clumsy_intern',
        title: 'Криворукий стажер',
        description: 'Он ещё учится...',
        rewardDisplay: '+1 Очко экспертизы',
        rewardValue: { type: 'expertPoints', amount: 1 },
        condition: (state) => (state.stats?.autogenFailures || 0) >= 50,
    },
    // ── Гардероб ─────────────────────────────────────────────
    {
        id: 'stylyaga',
        title: 'Стиляга',
        description: 'Собрал сетик.',
        rewardDisplay: '+1 Очко навыка',
        rewardValue: { type: 'skillPoints', amount: 1 },
        condition: (state) => state.wardrobeSelected?.tshirt != null,
    },
    {
        id: 'wb_threat',
        title: 'Гроза ВБ-шки',
        description: 'Выкуп 100%.',
        rewardDisplay: '+3 Очка навыка',
        rewardValue: { type: 'skillPoints', amount: 3 },
        condition: (state) => {
            const owned = state.wardrobeUnlockedVariants || {};
            return !!(owned['tshirt_black'] && owned['tshirt_minon'] &&
                      owned['pants_black']  && owned['pants_shorts'] &&
                      owned['socks_white']  && owned['socks_black']  && owned['socks_pink']);
        },
    },
    // ── Жар ──────────────────────────────────────────────────
    {
        id: 'hot_gen',
        title: 'Горячо!',
        description: 'Ноутбук взлетает?',
        rewardDisplay: '+2 Очка навыка',
        rewardValue: { type: 'skillPoints', amount: 2 },
        condition: (state) => !!(state.stats?.genAtMaxHeatDone),
    },
    // ── Тёма ─────────────────────────────────────────────────
    {
        id: 'its_tema',
        title: 'Это Тёма!',
        description: 'Мяу Мяу Мяу!',
        rewardDisplay: '',
        rewardValue: null,
        condition: (state) => (state.stats?.temaCorrectPicks || 0) >= 1,
    },
    // ── Существующие ─────────────────────────────────────────
    {
        id: 'spam_bot',
        title: 'Спам-бот',
        description: 'Проспамь CG-чаты своим портфолио.',
        rewardDisplay: '+25 XP',
        rewardValue: { type: 'xp', amount: 25 },
        condition: (state) => !!(state.researchTaskCompletions && state.researchTaskCompletions['spam_cg_chats'] >= 1 && state.researchTaskCompletions['spam_again'] >= 1),
    },
    {
        id: 'green_balls',
        title: 'Шароёб',
        description: 'Сделай шарики зелёными для первого клиента.',
        rewardDisplay: '+100₽',
        rewardValue: { type: 'funds', amount: 100 },
        condition: (state) => !!(state.completedStoryOrderIds && state.completedStoryOrderIds.includes('green_balls_1')),
    },
    {
        id: 'plus_vibes',
        hidden: true,
        title: '+Vibes',
        description: 'Раздать кринжа.',
        rewardDisplay: '+1 Очко навыка',
        rewardValue: { type: 'skillPoints', amount: 1 },
        condition: (state) => !!state.chapter1Completed,
    },
];
