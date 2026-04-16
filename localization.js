// ============================================================
// GAME LOCALIZATION DATA
// Только словарь реплик и UI-строк.
// Runtime helper functions/import API живут в src/i18n.js.
// Все реплики всех персонажей сгруппированы по секциям.
// Заполните пустые строки ("") для перевода.
//
// Персонажи:
//   chatdjbt  = ChatDJBT (ИИ-ассистент)
//   gg        = GG (игрок)
//   pm        = Outistic PM (менеджер агентства)
//   [thought] = внутренний монолог GG (без имени на экране)
//
// Источники:
//   TUTORIAL_SEQUENCE.cinematic       → секция tutorial_cinematic
//   TUTORIAL_SEQUENCE.tutorialLeadIn  → секция tutorial_lead_in
//   TUTORIAL_SEQUENCE.skipLeadIn      → секция tutorial_skip
//   src/ui-shell.js upgrades intro    → секция upgrades_intro
//   NARRATIVE_COMMENTS.firstOpen      → секция first_open
//   NARRATIVE_COMMENTS.menuTutorial   → секция menu_tutorial
//   NARRATIVE_COMMENTS.contextual     → секция contextual
//   CH1_EVENTS                        → секция ch1_events
//   script.js (hardcoded)             → секция misc
// ============================================================

window.GAME_STRINGS = {

    // ============================================================
    // РАЗДЕЛ 1: Вступительная кинематика (мысли + первые диалоги)
    // Источник: TUTORIAL_SEQUENCE.cinematic
    // ============================================================
    tutorial_cinematic: {
        // [thought] = внутренний монолог GG
        thought_01:        { en: "My head hurts so much...",                                                                                                     ru: "Как же болит голова..." },
        thought_02:        { en: "So bright!",                                                                                                                   ru: "Так ярко!" },
        thought_03:        { en: "I need to try opening my eyes.",                                                                                               ru: "Нужно попробовать открыть глаза." },
        thought_04:        { en: "Is someone calling me?",                                                                                                       ru: "Кто-то мне звонит??" },
        thought_05:        { en: "Who...?",                                                                                                                      ru: "Кто...?" },

        // Диалоги
        chatdjbt_01:       { en: "HEY BOSS!",                                                                                                                    ru: "ЭЙ, БОСС!" },
        chatdjbt_02:       { en: "YOU ARE AWAKE? I WAS STARTING TO WORRY THAT YOU... RESET YOURSELF!",                                                          ru: "ТЫ ПРОСНУЛСЯ? Я УЖЕ НАЧАЛ БЕСПОКОИТЬСЯ, ЧТО ТЫ... ОБНУЛИЛСЯ!" },
        chatdjbt_03:       { en: "ANYWAY, I STILL REMEMBER YOUR PLAN! NOW WE QUICKLY...",                                                                       ru: "В ЛЮБОМ СЛУЧАЕ, Я ВСЕ ЕЩЕ ПОМНЮ ТВОЙ ПЛАН! СЕЙЧАС МЫ БЫСТРО..." },
        gg_01:             { en: "What? Slow down... What is happening? Why is CHAT DJBT calling me? And what plan are you talking about?",                     ru: "Что? Притормози... Что происходит? Почему мне звонит CHAT DJBT? И о каком плане ты говоришь?" },
        chatdjbt_04:       { en: "Uh-oh! Looks like your wilderness era really left a mark...",                                                                  ru: "Ой-ой! Похоже, время в дикой природе действительно оставило след..." },
        chatdjbt_05:       { en: "But that is fine, we are used to climbing back up from nothing!",                                                              ru: "Но это нормально, нам не привыкать подниматься с нуля!" },
        chatdjbt_06:       { en: "Let me quickly bring you up to speed...",                                                                                      ru: "Давай я быстро введу тебя в курс дела..." },
    },

    // ============================================================
    // РАЗДЕЛ 2: Туториал — полная версия (выбор "Okay, go on")
    // Источник: TUTORIAL_SEQUENCE.tutorialLeadIn
    // ============================================================
    tutorial_lead_in: {
        gg_01:             { en: "Okay, go on",                                                                                                                  ru: "Ладно, давай" },
        chatdjbt_01:       { en: "First, introduction! I am ChatDJBT, your virtual assistant.",                                                                  ru: "Для начала — представление! Я ChatDJBT, твой виртуальный ассистент." },
        chatdjbt_02:       { en: "You are a modern designer!",                                                                                                   ru: "Ты — современный дизайнер!" },
        chatdjbt_03:       { en: "You may look like you crawled out of the woods, but you are still a master of prompting and AI generation!",                  ru: "Да, выглядишь ты так, будто вылез из леса, но ты всё ещё мастер промптинга и ИИ-генерации!" },
        chatdjbt_04:       { en: "Even if you live in an abandoned place, you still have your laptop, internet, and of course me!",                             ru: "Хоть ты и живешь в заброшке, у тебя всё равно есть ноутбук, интернет и, конечно же, я!" },
        chatdjbt_05:       { en: "Look here. This is your task manager, BitTrick25.",                                                                            ru: "Смотри сюда. Это твой таск-менеджер, BitTrick25." },
        chatdjbt_06:       { en: "Tasks from your contacts and random clients appear here.",                                                                     ru: "Здесь появляются задачи от твоих контактов и случайных клиентов." },
        chatdjbt_07:       { en: "Cool to have lots of friends, right? ... Ah yes... Well, at least you still have me!",                                        ru: "Круто иметь много друзей, правда? ...Аа да... Ну, зато у тебя есть я!" },
        chatdjbt_08:       { en: "And here are your finances. Not luxury, but enough to start.",                                                                 ru: "А здесь твои финансы. Не шик, но на старт хватит." },
        gg_02:             { en: "This is rough...",                                                                                                             ru: "Это треш..." },
        chatdjbt_09:       { en: "Hey! Easy, do not stress that hard!",                                                                                         ru: "Эй! Спокойно, не переживай так!" },
        chatdjbt_10:       { en: "Yes, you are an unemployed immigrant in a ruined place, but still...",                                                        ru: "Да, ты безработный иммигрант в заброшке, но всё же..." },
        gg_03:             { en: "Just be quiet...",                                                                                                             ru: "Просто помолчи..." },
        gg_04:             { en: "I need a cigarette, now.",                                                                                                     ru: "Мне нужна сигарета, срочно." },
        gg_05:             { en: "Okay, a little better... Need to gather my thoughts and breathe...",                                                          ru: "Ладно, немного лучше... Нужно собраться с мыслями и продышаться..." },
        chatdjbt_11:       { en: "Better?",                                                                                                                      ru: "Лучше?" },
        gg_06:             { en: "Better. Let us turn on some music, this place is depressing.",                                                                 ru: "Лучше. Давай включим музыку, тут какая-то уныль." },
        chatdjbt_12:       { en: "No problem! You can do it here.",                                                                                              ru: "Без проблем! Вот здесь это можно сделать." },
        chatdjbt_13:       { en: "That's it! You are ready for anything!",                                                                                       ru: "Вот и всё! Ты готов ко всему!" },
        chatdjbt_14:       { en: "And we just got our first task!",                                                                                              ru: "И у тебя только что появилось первое задание!" },
        chatdjbt_15:       { en: "Let's put your portfolio out there.",                                                                                          ru: "Давай заявим о себе." },
        chatdjbt_16:       { en: "At first there will not be many orders, but you will build reputation and experience quickly!",                               ru: "Сначала заказов будет немного, но репутацию и опыт ты наберёшь быстро!" },
        chatdjbt_17:       { en: "Level meter is on the left. Orders give XP, and with XP your pace grows.",                                                    ru: "Шкала уровня — сверху. Заказы дают опыт, а с опытом ты станешь сильнее." },
        chatdjbt_18:       { en: "Open story and take the starter task \"Post portfolio\".",                                                                     ru: "Открой меню истории и возьми стартовое задание «Опубликовать портфолио»." },
        chatdjbt_19:       { en: "Let us goooo! Generate some slop so everyone knows you are back in the game!",                                                ru: "Вперёд! Нагенерь слопа, чтобы все знали — ты вернулся в игру!" },
    },

    // ============================================================
    // РАЗДЕЛ 3: Туториал — пропуск (выбор "Skip")
    // Источник: TUTORIAL_SEQUENCE.skipLeadIn
    // ============================================================
    tutorial_skip: {
        chatdjbt_01:       { en: "Okay, we skip the lore. Straight to work mode.",                                                                               ru: "Ладно, пропускаем лор. Сразу в режим работы." },
    },

    // ============================================================
    // РАЗДЕЛ 3.5: Интро первого входа в апгрейды
    // Источник: src/ui-shell.js runUpgradesIntro()
    // ============================================================
    upgrades_intro: {
        line_01:          { en: 'Did I just go blind?',                                                                                                            ru: 'Я что, ослеп?' },
        line_02:          { en: 'Hello? Why is everything black?',                                                                                                  ru: 'Алло? Почему всё чёрное?' },
        line_03:          { en: 'Well, that is it... the light at the end of the tunnel! Should have quit smoking!',                                               ru: 'Ну всё, это конец... Свет в конце тоннеля! Надо было бросать курить!' },
        line_04:          { en: 'Wait, that is me!',                                                                                                                ru: 'Подожди, это же я!' },
        line_05:          { en: 'Like... that is literally my head! In space...',                                                                                   ru: 'Ну типа... Реально моя голова! В КОСМОСЕ...' },
        line_06:          { en: 'Well... that tracks.',                                                                                                             ru: 'Ну... внатуре.' },
    },

    // ============================================================
    // РАЗДЕЛ 4: Разовые комментарии на открытие меню/событий
    // Источник: NARRATIVE_COMMENTS.firstOpen
    // Тип: строки или массивы строк (одна реплика или цепочка)
    // ============================================================
    first_open: {
        // Открытие магазина
        chat_shop_opened_once:                   { en: "As they say, you gotta spend money to make money! Just do not blow it all in one place!",                ru: "Как говорится, чтобы зарабатывать деньги, надо их тратить! Только не потрать всё за раз." },

        // Первая покупка апгрейда
        chat_shop_root_upgrade_purchased_once_1: { en: "Wait, is this an RPG mechanic in my clicker now?",                                                       ru: "Подождите, это что, RPG механика в моём кликере?" },
        chat_shop_root_upgrade_purchased_once_2: { en: "Ha-ha...",                                                                                               ru: "Ха-ха..." },
        chat_shop_root_upgrade_purchased_once_3: { en: "Your ChatDJBT trial will expire in 3... 2... 1...",                                                      ru: "Пробный период ChatDJBT истекает через 3... 2... 1..." },
        chat_shop_root_upgrade_purchased_once_4: { en: "Okay, jokes aside, seriously think about grabbing the Pro version - it will massively speed up generations and remove the limits.", ru: "Ладно, шутки в сторону, серьёзно подумай насчёт Про-версии — она резко ускорит генерации и снимет ограничения." },

        // Открытие вкладки товаров
        chat_shop_goods_opened_once_1:           { en: "One time I tried to calculate how much money you burn on cigarettes...",                                  ru: "Однажды я пытался подсчитать, сколько денег ты сжигаешь на сигаретах..." },
        chat_shop_goods_opened_once_2:           { en: "...then my free plan ran out of tokens.",                                                                 ru: "...потом у меня закончились токены на бесплатной версии." },
        chat_shop_goods_opened_once_3:           { en: "Knowing you, I would turn on auto-buy for cigs. Or buy one pack at a time - at least you will have a reason to touch grass.", ru: "Зная тебя, я бы включил автопокупку сигарет. Ну, либо бери по одной пачке — хоть будет повод выйти из дома." },
        chat_shop_goods_opened_once_4:           { en: "And easy on the energy drinks....",                                                                       ru: "И поменьше энергетиков...." },

        // Открытие недвижимости
        chat_shop_property_opened_once_1:        { en: "Careful there, real estate prices can hit your STRESS meter hard.",                                       ru: "Осторожно, цены на недвижимость могут серьёзно ударить по шкале СТРЕССА." },
        chat_shop_property_opened_once_2:        { en: "But if you save up a bit, you can finally move out of this dump...",                                     ru: "Но если немного накопить, можно наконец съехать из этой дыры..." },
        chat_shop_property_opened_once_3:        { en: "For now, focus on the small wins )))",                                                                    ru: "Пока сосредоточься на маленьких победах )))" },

        // Открытие одежды
        chat_shop_clothes_opened_once_1:         { en: "Did you finally notice how your T-shirt smells?",                                                        ru: "Ты наконец почуял запах своей футболки?" },
        chat_shop_clothes_opened_once_2:         { en: "No offense, but you look rough as hell. I really do not think you should meet people until you buy decent clothes.", ru: "Без обид, но выглядишь ты жутковато. Я правда не думаю, что тебе стоит встречаться с людьми, пока не купишь нормальную одежду." },

        // Генерации
        chat_generation_after_first_once:        { en: "Yeah, it's going to take a while....",                                                                    ru: "Это займет какое-то время, да...." },
        chat_generation_after_third_once:        { en: "Hey, don't be mad at me, I'm generating as fast as I can.",                                              ru: "Слушай, не злись на меня, я генерирую как могу." },
        chat_generation_after_fourth_once:       { en: "And honestly, it's your own fault for sticking with the free version!",                                   ru: "Да и вообще, ты сам виноват что сидишь на бесплатной версии!" },

        // Достижения
        chat_achievements_opened_once_1:         { en: "A thousand-mile journey starts with one step!",                                                          ru: "Дорогу осилит идущий!" },
        chat_achievements_opened_once_2:         { en: "You will find the key milestones here.",                                                                  ru: "Здесь ты найдёшь ключевые вехи." },
        chat_achievements_opened_once_3:         { en: "If you get lost and have no clue what to do next - check this tab.",                                     ru: "Если потеряешься и не будешь знать, что делать дальше — загляни сюда." },

        // Статистика
        chat_stats_opened_once_1:               { en: "Did you know collecting and storing these stats released around 5 tons of CO2 into the atmosphere?",      ru: "А ты знал, что сбор и хранение этой статистики выбросили в атмосферу около 5 тонн CO2?" },
        chat_stats_opened_once_2:               { en: "I totally made that number up, of course.",                                                                ru: "Я, конечно же, взял эту цифру из головы." },

        // Сброс прогресса — запрос подтверждения
        chat_reset_prompt_once_1:               { en: "Are you sure?",                                                                                            ru: "Ты уверен?" },
        chat_reset_prompt_once_2:               { en: "Look, I get it, we joke all the time like \"I will run away to the woods, join a monastery,\" yeah...",   ru: "Слушай, я понимаю, мы постоянно шутим — «убегу в лес, пойду в монастырь», ну там..." },
        chat_reset_prompt_once_3:               { en: "But are you actually going to live in the forest?",                                                        ru: "Но ты реально собрался жить в лесу?" },
        chat_reset_prompt_once_4:               { en: "Hopefully when you get tired of chewing roots and running from bears, you will come back... <3",          ru: "Надеюсь, когда надоест жевать коренья и бегать от медведей, ты вернёшься... <3" },

        // Отмена сброса
        chat_reset_cancel_once_1:               { en: "OH THANK GOD!",                                                                                            ru: "СЛАВА БОГУ!" },
        chat_reset_cancel_once_2:               { en: "I was genuinely worried, not gonna lie...",                                                                 ru: "Я правда переживал, честно..." },

        // Открытие исследований
        chat_research_category_opened_once_1:   { en: "Ah, the Research section!",                                                                               ru: "А, раздел Исследований!" },
        chat_research_category_opened_once_2:   { en: "These tasks cost money upfront, but the payoff is real - better job chances, new contacts, and real skill growth.", ru: "Задания здесь требуют денег вперёд, но отдача реальная — лучшие шансы на заказы, новые контакты и настоящий рост навыков." },
        chat_research_category_opened_once_3:   { en: "Think of it as investing in yourself.",                                                                    ru: "Считай это инвестицией в себя." },

        // Открытие продвижения
        chat_promotion_category_opened_once_1:  { en: "Nobody ever hires a ghost designer.",                                                                     ru: "Дизайнера-призрака никто не нанимает." },
        chat_promotion_category_opened_once_2:  { en: "These tasks build your presence in the market - the more you put yourself out there, the more orders will start rolling in.", ru: "Эти задания строят твоё присутствие на рынке — чем больше ты заявляешь о себе, тем больше заказов начнёт приходить." },
        chat_promotion_category_opened_once_3:  { en: "Trust the process.",                                                                                       ru: "Доверяй процессу." },
    },

    // ============================================================
    // РАЗДЕЛ 5: Подсказки по меню задач (BitTrick)
    // Источник: NARRATIVE_COMMENTS.menuTutorial
    // ============================================================
    menu_tutorial: {
        hub:             { en: "Ah, there it is, my favorite BitTrick! This is your main hustle hub.                                                                         ", ru: "А, вот он — мой любимый BitTrick! Это твой главный рабочий хаб." },
        cat_orders:      { en: "Your freelance orders will drop here! At first I will be your project manager, so I will sort your tasks between categories.",                  ru: "Сюда упадут твои фриланс-заказы! Сначала я буду твоим проджект-менеджером, так что буду оповещать о новых задачах." },
        cat_story_1:     { en: "This is where tasks live that you absolutely HAVE to do!",                                                                                     ru: "Вот здесь живут задания, которые ты ОБЯЗАН выполнить!" },
        cat_story_2:     { en: "Sure, you can take your time, but then you will keep spinning your wheels :)",                                                                 ru: "Можно не торопиться, конечно, но тогда так и будешь топтаться на месте :)" },
        cat_research_1:  { en: "Ahem! Ackchyually! These are tasks for smart people!",                                                                                        ru: "Кхм! ЭКЧУАЛИ! Это задания для умных людей!" },
        cat_research_2:  { en: "Okay, sorry for the cringe. Here you will find tasks about learning software and leveling up your personal skills.",                          ru: "Лан, сори за кринж. Здесь ты найдёшь задачи по изучению программ и прокачке личных навыков." },
        cat_promo_1:     { en: "Let us face facts - right now, you are a nobody.",                                                                                             ru: "Давай смотреть правде в глаза — сейчас ты никто." },
        cat_promo_2:     { en: "If you want more than one order per year, you absolutely need to build your personal brand...",                                               ru: "Если хочешь больше одного заказа в год, ты обязан прокачать личный бренд..." },
        cat_promo_3:     { en: "This is where you will get tasks that help you make a name for yourself in the industry!",                                                   ru: "Здесь ты получишь задания, которые помогут заявить о себе в индустрии!" },
    },

    // ============================================================
    // РАЗДЕЛ 6: Контекстные комментарии (по событиям игры)
    // Источник: NARRATIVE_COMMENTS.contextual
    // ============================================================
    contextual: {
        // Заказ провален — почти завершён (осталось ≤2 генераций)
        order_failed_almost_done:   { en: "I feel your pain... or maybe I do not, but I am still trying to support you. Keep going!",                            ru: "Чувствую твою боль... или не чувствую, но всё равно стараюсь тебя поддержать. Давай!" },

        // Заказ провален — ни одной генерации
        order_failed_no_gen:        { en: "Hey, sleepyhead! Did you doze off? Get it together or no one will pay you!",                                          ru: "Эй, соня! Задремал? Возьми себя в руки, а то никто тебе не заплатит!" },

        // Заказ выполнен автогеном без единого ручного клика
        order_completed_autogen_only: { en: "You are the laziest person ever! Next step: connect AI agents so they take orders and complete them themselves... oh wait, that is me...", ru: "Ты — самый ленивый человек на свете! Следующий шаг: подключить ИИ-агентов, чтобы они сами брали и выполняли заказы... ой, подожди, это же я..." },
    },

    // ============================================================
    // РАЗДЕЛ 7: События Главы 1 (CH1_EVENTS)
    // Источник: window.CH1_EVENTS в tutorial-data.js
    // ============================================================
    ch1_events: {

        // --- story_fail_post_portfolio ---
        story_fail_post_portfolio_self_01:       { ru: "Эй, не расстраивайся! Попробуем ещё раз.",                                                                en: "Hey, don't be down! Let's try again." },

        // --- story_complete_post_portfolio ---
        post_portfolio_self_01:              { ru: "Отлично! Загляни в магазин навыков — там кое-что для тебя.",                                                  en: "Great! Check out the skill shop — there's something there for you." },

        // --- ch1_spam_inject (через 10с после выхода из апгрейдов) ---
        spam_inject_self_01:                 { ru: "Мне прям жалко на тебя смотреть... Давай займёмся активным развитием личного бренда?",                       en: "Honestly, I feel bad watching you... Want to kick off some active personal branding?" },

        // --- special_complete_spam_cg_chats ---
        spam_done_gg_01:                     { ru: "Блять! Меня забанили во всех чатах по сиджи!",                                                                en: "Damn! I got banned from every CG chat!" },
        spam_done_gg_02:                     { ru: "Я так и знал что это полная хрень, пойду раздавать листовки короче",                                         en: "I knew it was complete BS, whatever, gonna go hand out flyers then" },
        spam_done_self_01:                   { ru: "Тормози, начальник! Чего ты так заводишься сразу?",                                                           en: "Easy, boss! Why do you snap like that right away?" },
        spam_done_self_02:                   { ru: "Я думаю тут все просто...",                                                                                    en: "I think it's pretty simple..." },
        spam_done_self_03:                   { ru: "Просто... Ты спамил не в тех чатах! Давай поищем в инете, где можно найти фрилансы!",                        en: "You just spammed the wrong chats! Let's search online for where to actually find freelance gigs!" },

        // --- special_gen_google_freelance_1 ---
        google_gen1_self_01:                 { ru: "Давай сразу на третьей странице смотреть, тут одна реклама...",                                               en: "Let's skip to page three, the first pages are all ads..." },

        // --- special_gen_google_freelance_2 ---
        google_gen2_self_01:                 { ru: "О! Вот сюда жми, это стопроц оно!",                                                                           en: "Oh! Click right there, that's definitely it!" },

        // --- special_complete_google_freelance ---
        google_done_self_01:                 { ru: "Я прям вижу, что мы стали умнее!",                                                                           en: "I can literally feel us getting smarter!" },
        google_done_self_02:                 { ru: "Давай напишем в этот чат!",                                                                                   en: "Let's write to that chat!" },

        // --- special_gen_spam_again_4 ---
        spam2_gen4_self_01:                  { ru: "Та ты не трясись, я те говорю это рабочая тема!",                                                             en: "Don't stress, I'm telling you this is a real working method!" },

        // --- special_complete_spam_again ---
        spam2_done_self_01:                  { ru: "Опа, ачивка! Надо забрать",                                                                                   en: "Oh, an achievement! Gotta claim it" },

        // --- story_gen_green_balls_1_1 ---
        balls1_gen1_self_01:                 { ru: "Мммм… Шары...",                                                                                               en: "Mmmmm... Balls..." },

        // --- story_fail_green_balls_1 ---
        balls1_fail_self_01:                 { ru: "Чел...",                                                                                                       en: "Dude..." },

        // --- funds_reached_1000 ---
        funds_1000_self_01:                  { ru: "Ну всё, начинается прайм! Бегом покупать ПРО подписку, мне уже тяжело видеть как ты мучаешься с этой кнопкой", en: "That's it, prime time is starting! Get the PRO subscription already, I can't stand watching you struggle with that button" },

        // --- skill_node_blocked_ai_chatPRO ---
        pro_blocked_gg_01:                   { ru: "У меня не проходит оплата... Типа санкции или что?",                                                          en: "My payment isn't going through... Like, sanctions or something?" },
        pro_blocked_self_01:                 { ru: "У меня нет слов... Давай найдем, как оплатить, че еще делать",                                               en: "I'm speechless... Let's find a way to pay, what else can we do" },

        // --- special_complete_payment_research ---
        payment_done_self_01:                { ru: "Давай! Сделай это!",                                                                                           en: "Go for it! Do it!" },

        // --- skill_node_purchased_ai_chatPRO ---
        pro_bought_self_01:                  { ru: "О даааа! Я чувствую как свежие токены расплываются по мейнфрейму!",                                           en: "Oh yeeeah! I can feel fresh tokens spreading through my mainframe!" },
        pro_bought_self_02:                  { ru: "ВОТ ЭТО НАСТОЯЩАЯ МОООЩЬ!",                                                                                  en: "NOW THAT'S REAL POWER!" },
        pro_bought_self_03:                  { ru: "Давай возьмем еще заказик чтобы почувствовать разницу!",                                                      en: "Let's grab another order to feel the difference!" },

        // --- story_complete_green_balls_2 ---
        balls2_done_self_01:                 { ru: "О ДАААА! Вот это скорость!",                                                                           en: "OH YEAH! Now THAT is speed!" },
        balls2_done_self_02:                 { ru: "Я уже вижу, как к нам поползут клиенты на коленях!",                                                          en: "I can already see clients crawling to us on their knees!" },

        // --- story_fail_green_balls_2 ---
        balls2_fail_self_01:                 { ru: "Блять… Ну я вааще не знаю, как ты умудрился обосраться..",                                                     en: "Damn... I genuinely don't know how you managed to screw this up.." },
        balls2_fail_self_02:                 { ru: "Попробуй еще раз",                                                                                             en: "Try again" },

        // --- outfit_gate_start_call_with_client ---
        outfit_gate_self_01:                 { ru: "ДАЖЕ НЕ ДУМАЙ ИДТИ НА СОЗВОН В ТАКОМ ВИДЕ!",                                                                  en: "DON'T YOU DARE GO TO THAT CALL LOOKING LIKE THIS!" },
        outfit_gate_gg_01:                   { ru: "В каком ТАКОМ? Да у меня пара пятен на футболке, но никто и не заметит",                                      en: "Looking like WHAT? Yeah I've got a couple stains on my shirt, nobody will even notice" },
        outfit_gate_self_02:                 { ru: "Ты реально одичал? Не прими за грубость, но на это невозможно не обратить внимание.",                        en: "Have you really gone feral? No offense, but it's literally impossible not to notice." },
        outfit_gate_self_03:                 { ru: "Тебе нужна ХОТЯ БЫ новая футболка... Умоляю, найди себе какую-нибудь дешевую",                               en: "You need AT LEAST a new shirt... Please, find a cheap one somewhere" },

        // --- special_complete_find_tshirt ---
        tshirt_done_self_01:                 { ru: "Ну вот эта вроде норм... Давай скорее закажем и пойдём наконец на встречу с клиентом!",                       en: "Okay, that one looks decent... Let's order it quick and finally go to the client meeting!" },
        tshirt_done_self_02:                 { ru: "Ну вооот! Другое дело!",                                                                                       en: "There we go! Now that's a different story!" },
        tshirt_done_self_03:                 { ru: "ЖЕНИХ!",                                                                                                       en: "GROOM!" },

        // --- story_gen_call_with_client_1 (meeting cinematic) ---
        meeting_pm_01:                       { ru: "Здравствуйте! Нам так понравились ваши шары!",                                                                 en: "Hello! We absolutely loved your spheres!" },
        meeting_gg_01:                       { ru: "...?",                                                                                                         en: "...?" },
        meeting_pm_02:                       { ru: "Серьезно, клиент был просто в восторге! Мы пытались сами нагенерить, но такой насыщенный зелёный у нас никак не получался!", en: "Seriously, the client was just delighted! We tried generating them ourselves but couldn't get that vivid green no matter what!" },
        meeting_gg_02:                       { ru: "А! Ну это приятно слышать! А что, будет какой-то бонус? Или ещё заказы?",                                    en: "Oh! Well that's great to hear! So... is there a bonus? Or more orders?" },
        meeting_gg_03:                       { ru: "Я открыт к предложениям!",                                                                                     en: "I'm open to offers!" },
        meeting_pm_03:                       { ru: "Конечно! Будут ещё заказы! Я добавила вас в пул подрядчиков, так что можете ожидать новые задачи!",           en: "Of course! More orders are coming! I've added you to our contractor pool, expect new tasks!" },
        meeting_gg_04:                       { ru: "Кайф! Тупо топ, ха-ха! Плюс вайб даже!",                                                                      en: "Nice! Totally top, haha! Good vibes all around!" },
        meeting_pm_04:                       { ru: "...) Эээ... да)",                                                                                               en: "...) Uh... yeah)" },
        meeting_pm_05:                       { ru: "Тупо топ))",                                                                                                    en: "Totally top-tier))" },
        meeting_pm_06:                       { ru: "Ой, мне пора бежать! В общем, будьте на связи!",                                                               en: "Oh, I have to run! Anyway, stay in touch!" },

        // --- ch1_post_meeting (финал главы 1) ---
        post_meeting_self_01:                { ru: "Ну... Вроде все прошло хорошо?",                                                                               en: "So... I think that went well?" },
        post_meeting_gg_01:                  { ru: "Да она от меня без ума!",                                                                                      en: "She is totally into me!" },
        post_meeting_gg_02:                  { ru: "Ты видел она аж покраснела в конце встречи?",                                                          en: "You see how she blushed at the end of the meeting?" },
        post_meeting_self_02:                { ru: "...",                                                                                                           en: "..." },
        post_meeting_self_03:                { ru: "Да, да. Давай... Займёмся делом. У нас ещё много работы.",                                                     en: "Yeah, yeah. Let's... get back to work. We still have a lot to do." },
    },

    // ============================================================
    // РАЗДЕЛ 8: Разные реплики, прошитые прямо в script.js
    // ============================================================
    misc: {
        // Реплики после первого курения (script.js ~line 5384)
        smoking_gg_01:   { en: "I love smoking so much! I could sit and smoke all day!",                                                                           ru: "Как же я люблю курить! Мог бы сидеть и курить весь день!" },
        smoking_self_01: { en: "It scares me how much you smoke. But with your stress levels, I get it.",                                                          ru: "Меня пугает, как много ты куришь. Но при твоём уровне стресса — понимаю." },
    },

};
