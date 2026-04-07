window.ACHIEVEMENTS_DATA = [
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
        title: '+Vibes',
        description: 'Раздать кринжа.',
        rewardDisplay: '+1 Очко навыка',
        rewardValue: { type: 'skillPoints', amount: 1 },
        condition: (state) => !!state.chapter1Completed,
    },
];
