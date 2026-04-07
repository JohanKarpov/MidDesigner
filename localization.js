// ============================================================
// GAME LOCALIZATION FILE
// Все реплики всех персонажей, сгруппированные по секциям.
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
        thought_01:        { en: "My head hurts so much...",                                                                                                     ru: "" },
        thought_02:        { en: "So bright!",                                                                                                                   ru: "" },
        thought_03:        { en: "I need to try opening my eyes.",                                                                                               ru: "" },
        thought_04:        { en: "Is someone calling me?",                                                                                                       ru: "" },
        thought_05:        { en: "Who...?",                                                                                                                      ru: "" },

        // Диалоги
        chatdjbt_01:       { en: "HEY BOSS!",                                                                                                                    ru: "" },
        chatdjbt_02:       { en: "YOU ARE AWAKE? I WAS STARTING TO WORRY THAT YOU... RESET YOURSELF!",                                                          ru: "" },
        chatdjbt_03:       { en: "ANYWAY, I STILL REMEMBER YOUR PLAN! NOW WE QUICKLY...",                                                                       ru: "" },
        gg_01:             { en: "What? Slow down... What is happening? Why is CHAT DJBT calling me? And what plan are you talking about?",                     ru: "" },
        chatdjbt_04:       { en: "Uh-oh! Looks like your wilderness era really left a mark...",                                                                  ru: "" },
        chatdjbt_05:       { en: "But that is fine, we are used to climbing back up from nothing!",                                                              ru: "" },
        chatdjbt_06:       { en: "Let me quickly bring you up to speed...",                                                                                      ru: "" },
    },

    // ============================================================
    // РАЗДЕЛ 2: Туториал — полная версия (выбор "Okay, go on")
    // Источник: TUTORIAL_SEQUENCE.tutorialLeadIn
    // ============================================================
    tutorial_lead_in: {
        gg_01:             { en: "Okay, go on",                                                                                                                  ru: "" },
        chatdjbt_01:       { en: "First, introduction! I am ChatDJBT, your virtual assistant.",                                                                  ru: "" },
        chatdjbt_02:       { en: "You are a modern designer!",                                                                                                   ru: "" },
        chatdjbt_03:       { en: "You may look like you crawled out of the woods, but you are still a master of prompting and AI generation!",                  ru: "" },
        chatdjbt_04:       { en: "Even if you live in an abandoned place, you still have your laptop, internet, and of course me!",                             ru: "" },
        chatdjbt_05:       { en: "Look here. This is your task manager, BitTrick25.",                                                                            ru: "" },
        chatdjbt_06:       { en: "Tasks from your contacts and random clients appear here.",                                                                     ru: "" },
        chatdjbt_07:       { en: "Cool to have lots of friends, right? ... Ah yes... Well, at least you still have me!",                                        ru: "" },
        chatdjbt_08:       { en: "And here are your finances. Not luxury, but enough to start.",                                                                 ru: "" },
        gg_02:             { en: "This is rough...",                                                                                                             ru: "" },
        chatdjbt_09:       { en: "Hey! Easy, do not stress that hard!",                                                                                         ru: "" },
        chatdjbt_10:       { en: "Yes, you are an unemployed immigrant in a ruined place, but still...",                                                        ru: "" },
        gg_03:             { en: "Just be quiet...",                                                                                                             ru: "" },
        gg_04:             { en: "I need a cigarette, now.",                                                                                                     ru: "" },
        gg_05:             { en: "Okay, a little better... Need to gather my thoughts and breathe...",                                                          ru: "" },
        chatdjbt_11:       { en: "Better?",                                                                                                                      ru: "" },
        gg_06:             { en: "Better. Let us turn on some music, this place is depressing.",                                                                 ru: "" },
        chatdjbt_12:       { en: "No problem! You can do it here.",                                                                                              ru: "" },
        chatdjbt_13:       { en: "That's it! You are ready for anything!",                                                                                       ru: "" },
        chatdjbt_14:       { en: "And we just got our first task!",                                                                                              ru: "" },
        chatdjbt_15:       { en: "Let's put your portfolio out there.",                                                                                          ru: "" },
        chatdjbt_16:       { en: "At first there will not be many orders, but you will build reputation and experience quickly!",                               ru: "" },
        chatdjbt_17:       { en: "Level meter is on the left. Orders give XP, and with XP your pace grows.",                                                    ru: "" },
        chatdjbt_18:       { en: "Open orders and take the starter task \"Post portfolio\".",                                                                    ru: "" },
        chatdjbt_19:       { en: "Let us goooo! Generate some slop so everyone knows you are back in the game!",                                                ru: "" },
    },

    // ============================================================
    // РАЗДЕЛ 3: Туториал — пропуск (выбор "Skip")
    // Источник: TUTORIAL_SEQUENCE.skipLeadIn
    // ============================================================
    tutorial_skip: {
        chatdjbt_01:       { en: "Okay, we skip the lore. Straight to work mode.",                                                                               ru: "" },
    },

    // ============================================================
    // РАЗДЕЛ 4: Разовые комментарии на открытие меню/событий
    // Источник: NARRATIVE_COMMENTS.firstOpen
    // Тип: строки или массивы строк (одна реплика или цепочка)
    // ============================================================
    first_open: {
        // Открытие магазина
        chat_shop_opened_once:                   { en: "As they say, you gotta spend money to make money! Just do not blow it all in one place!",                ru: "" },

        // Первая покупка апгрейда
        chat_shop_root_upgrade_purchased_once_1: { en: "Wait, is this an RPG mechanic in my clicker now?",                                                       ru: "" },
        chat_shop_root_upgrade_purchased_once_2: { en: "Ha-ha...",                                                                                               ru: "" },
        chat_shop_root_upgrade_purchased_once_3: { en: "Your ChatDJBT trial will expire in 3... 2... 1...",                                                      ru: "" },
        chat_shop_root_upgrade_purchased_once_4: { en: "Okay, jokes aside, seriously think about grabbing the Pro version - it will massively speed up generations and remove the limits.", ru: "" },

        // Открытие вкладки товаров
        chat_shop_goods_opened_once_1:           { en: "One time I tried to calculate how much money you burn on cigarettes...",                                  ru: "" },
        chat_shop_goods_opened_once_2:           { en: "...then my free plan ran out of tokens.",                                                                 ru: "" },
        chat_shop_goods_opened_once_3:           { en: "Knowing you, I would turn on auto-buy for cigs. Or buy one pack at a time - at least you will have a reason to touch grass.", ru: "" },
        chat_shop_goods_opened_once_4:           { en: "And easy on the energy drinks....",                                                                       ru: "" },

        // Открытие недвижимости
        chat_shop_property_opened_once_1:        { en: "Careful there, real estate prices can hit your STRESS meter hard.",                                       ru: "" },
        chat_shop_property_opened_once_2:        { en: "But if you save up a bit, you can finally move out of this dump...",                                     ru: "" },
        chat_shop_property_opened_once_3:        { en: "For now, focus on the small wins )))",                                                                    ru: "" },

        // Открытие одежды
        chat_shop_clothes_opened_once_1:         { en: "Did you finally notice how your T-shirt smells?",                                                        ru: "" },
        chat_shop_clothes_opened_once_2:         { en: "No offense, but you look rough as hell. I really do not think you should meet people until you buy decent clothes.", ru: "" },

        // Музыка
        chat_music_first_on:                     { en: "Mmmmmm... AI music... this game dev's laziness truly knows no limits.",                                   ru: "" },
        chat_music_first_off_after_on:           { en: "Can not blame you.",                                                                                      ru: "" },

        // Генерации
        chat_generation_after_first_once:        { en: "",                                                                                                        ru: "Это займет какое-то время, да...." },
        chat_generation_after_third_once:        { en: "",                                                                                                        ru: "Слушай, не злись на меня, я генерирую как могу." },
        chat_generation_after_fourth_once:       { en: "",                                                                                                        ru: "Да и вообще, ты сам виноват что сидишь на бесплатной версии!" },

        // Достижения
        chat_achievements_opened_once_1:         { en: "A thousand-mile journey starts with one step!",                                                          ru: "" },
        chat_achievements_opened_once_2:         { en: "You will find the key milestones here.",                                                                  ru: "" },
        chat_achievements_opened_once_3:         { en: "If you get lost and have no clue what to do next - check this tab.",                                     ru: "" },

        // Статистика
        chat_stats_opened_once_1:               { en: "Did you know collecting and storing these stats released around 5 tons of CO2 into the atmosphere?",      ru: "" },
        chat_stats_opened_once_2:               { en: "I totally made that number up, of course.",                                                                ru: "" },

        // Сброс прогресса — запрос подтверждения
        chat_reset_prompt_once_1:               { en: "Are you sure?",                                                                                            ru: "" },
        chat_reset_prompt_once_2:               { en: "Look, I get it, we joke all the time like \"I will run away to the woods, join a monastery,\" yeah...",   ru: "" },
        chat_reset_prompt_once_3:               { en: "But are you actually going to live in the forest?",                                                        ru: "" },
        chat_reset_prompt_once_4:               { en: "Hopefully when you get tired of chewing roots and running from bears, you will come back... <3",          ru: "" },

        // Отмена сброса
        chat_reset_cancel_once_1:               { en: "OH THANK GOD!",                                                                                            ru: "" },
        chat_reset_cancel_once_2:               { en: "I was genuinely worried, not gonna lie...",                                                                 ru: "" },

        // Открытие исследований
        chat_research_category_opened_once_1:   { en: "Ah, the Research section!",                                                                               ru: "" },
        chat_research_category_opened_once_2:   { en: "These tasks cost money upfront, but the payoff is real - better job chances, new contacts, and real skill growth.", ru: "" },
        chat_research_category_opened_once_3:   { en: "Think of it as investing in yourself.",                                                                    ru: "" },

        // Открытие продвижения
        chat_promotion_category_opened_once_1:  { en: "Nobody ever hires a ghost designer.",                                                                     ru: "" },
        chat_promotion_category_opened_once_2:  { en: "These tasks build your presence in the market - the more you put yourself out there, the more orders will start rolling in.", ru: "" },
        chat_promotion_category_opened_once_3:  { en: "Trust the process.",                                                                                       ru: "" },
    },

    // ============================================================
    // РАЗДЕЛ 5: Подсказки по меню задач (BitTrick)
    // Источник: NARRATIVE_COMMENTS.menuTutorial
    // ============================================================
    menu_tutorial: {
        hub:             { en: "Ah, there it is, my favorite BitTrick! This is your main hustle hub. Open each category and I will break down what kind of work lives there.", ru: "" },
        cat_orders:      { en: "Your freelance orders will drop here! At first I will be your project manager, so I will sort your tasks between categories.",                  ru: "" },
        cat_story_1:     { en: "This is where tasks live that you absolutely HAVE to do!",                                                                                     ru: "" },
        cat_story_2:     { en: "Sure, you can take your time, but then you will keep spinning your wheels :)",                                                                 ru: "" },
        cat_research_1:  { en: "Ahem! Ackchyually! These are tasks for smart people!",                                                                                        ru: "" },
        cat_research_2:  { en: "Okay, sorry for the cringe. Here you will find tasks about learning software and leveling up your personal skills.",                          ru: "" },
        cat_promo_1:     { en: "Let us face facts - right now, you are a nobody.",                                                                                             ru: "" },
        cat_promo_2:     { en: "If you want more than one order per year, you absolutely need to build your personal brand...",                                               ru: "" },
        cat_promo_3:     { en: "This is where you will get tasks that help you make a name for yourself in the industry!",                                                   ru: "" },
    },

    // ============================================================
    // РАЗДЕЛ 6: Контекстные комментарии (по событиям игры)
    // Источник: NARRATIVE_COMMENTS.contextual
    // ============================================================
    contextual: {
        // Заказ провален — почти завершён (осталось ≤2 генераций)
        order_failed_almost_done:   { en: "I feel your pain... or maybe I do not, but I am still trying to support you. Keep going!",                            ru: "" },

        // Заказ провален — ни одной генерации
        order_failed_no_gen:        { en: "Hey, sleepyhead! Did you doze off? Get it together or no one will pay you!",                                          ru: "" },

        // Заказ выполнен автогеном без единого ручного клика
        order_completed_autogen_only: { en: "You are the laziest person ever! Next step: connect AI agents so they take orders and complete them themselves... oh wait, that is me...", ru: "" },
    },

    // ============================================================
    // РАЗДЕЛ 7: События Главы 1 (CH1_EVENTS)
    // Источник: window.CH1_EVENTS в tutorial-data.js
    // ============================================================
    ch1_events: {

        // --- story_complete_post_portfolio ---
        post_portfolio_self_01:              { ru: "Отлично! Загляни в магазин навыков — там кое-что для тебя.",                                                  en: "" },

        // --- ch1_spam_inject (через 10с после выхода из апгрейдов) ---
        spam_inject_self_01:                 { ru: "Мне прям жалко на тебя смотреть... Давай займёмся активным развитием личного бренда?",                       en: "" },

        // --- special_complete_spam_cg_chats ---
        spam_done_gg_01:                     { ru: "Блять! Меня забанили во всех чатах по сиджи!",                                                                en: "" },
        spam_done_gg_02:                     { ru: "Я так и думал что это полная хрень, пойду раздавать листовки короче",                                         en: "" },
        spam_done_self_01:                   { ru: "Тормози, начальник! Чего ты так заводишься сразу?",                                                           en: "" },
        spam_done_self_02:                   { ru: "Я думаю тут все просто...",                                                                                    en: "" },
        spam_done_self_03:                   { ru: "Просто... Ты спамил не в тех чатах! Давай поищем в инете, где можно найти фрилансы!",                        en: "" },

        // --- special_gen_google_freelance_1 ---
        google_gen1_self_01:                 { ru: "Давай сразу на третьей странице смотреть, тут одна реклама...",                                               en: "" },

        // --- special_gen_google_freelance_2 ---
        google_gen2_self_01:                 { ru: "О! Вот сюда жми, это стопроц оно!",                                                                           en: "" },

        // --- special_complete_google_freelance ---
        google_done_self_01:                 { ru: "Я прям вижу, что мы стали умнее!",                                                                            en: "" },
        google_done_self_02:                 { ru: "Давай напишем в этот чат!",                                                                                   en: "" },

        // --- special_gen_spam_again_4 ---
        spam2_gen4_self_01:                  { ru: "Та ты не трясись, я те говорю это рабочая тема!",                                                             en: "" },

        // --- special_complete_spam_again ---
        spam2_done_self_01:                  { ru: "Опа, ачивка! Надо забрать",                                                                                   en: "" },

        // --- story_gen_green_balls_1_1 ---
        balls1_gen1_self_01:                 { ru: "Мммм… Шары...",                                                                                               en: "" },

        // --- story_fail_green_balls_1 ---
        balls1_fail_self_01:                 { ru: "Чел...",                                                                                                       en: "" },

        // --- funds_reached_1000 ---
        funds_1000_self_01:                  { ru: "Ну всё, начинается прайм! Бегом покупать ПРО подписку, мне уже тяжело видеть как ты мучаешься с этой кнопкой", en: "" },

        // --- skill_node_blocked_ai_autogen ---
        pro_blocked_gg_01:                   { ru: "У меня не проходит оплата... Типа санкции или что?",                                                          en: "" },
        pro_blocked_self_01:                 { ru: "У меня нет слов... Давай найдем, как оплатить, че еще делать",                                               en: "" },

        // --- special_complete_payment_research ---
        payment_done_self_01:                { ru: "Давай! Сделай это!",                                                                                           en: "" },

        // --- skill_node_purchased_ai_autogen ---
        pro_bought_self_01:                  { ru: "О даааа! Я чувствую как свежие токены расплываются по мейнфрейму!",                                           en: "" },
        pro_bought_self_02:                  { ru: "ВОТ ЭТО НАСТОЯЩАЯ МООООЩЬ!",                                                                                  en: "" },
        pro_bought_self_03:                  { ru: "Давай возьмем еще заказик чтобы почувствовать разницу!",                                                      en: "" },

        // --- story_complete_green_balls_2 ---
        balls2_done_self_01:                 { ru: "О ДАААА! Вот это скорость!",                                                                                   en: "" },
        balls2_done_self_02:                 { ru: "Я уже вижу, как к нам поползут клиенты на коленях!",                                                          en: "" },

        // --- story_fail_green_balls_2 ---
        balls2_fail_self_01:                 { ru: "Блять… Ну я ваще не знаю, как ты умудрился обосраться..",                                                     en: "" },
        balls2_fail_self_02:                 { ru: "Попробуй еще раз",                                                                                             en: "" },

        // --- outfit_gate_start_call_with_client ---
        outfit_gate_self_01:                 { ru: "ДАЖЕ НЕ ДУМАЙ ИДТИ НА СОЗВОН В ТАКОМ ВИДЕ!",                                                                  en: "" },
        outfit_gate_gg_01:                   { ru: "В каком ТАКОМ? Да у меня пара пятен на футболке, но никто и не заметит",                                      en: "" },
        outfit_gate_self_02:                 { ru: "Ты реально одичал? Не прими за грубость, но на это невозможно не обратить внимание.",                        en: "" },
        outfit_gate_self_03:                 { ru: "Тебе нужна ХОТЯ БЫ новая футболка... Умоляю, найди себе какую-нибудь дешевую",                               en: "" },

        // --- special_complete_find_tshirt ---
        tshirt_done_self_01:                 { ru: "Ну вот эта вроде норм... Давай скорее закажем и пойдем наконец на встречу с клиентом!",                       en: "" },
        tshirt_done_self_02:                 { ru: "Ну вооот! Другое дело!",                                                                                       en: "" },
        tshirt_done_self_03:                 { ru: "ЖЕНИХ!",                                                                                                       en: "" },

        // --- story_gen_call_with_client_1 (meeting cinematic) ---
        meeting_pm_01:                       { ru: "Здравствуйте! Нам так понравились ваши шары!",                                                                 en: "" },
        meeting_gg_01:                       { ru: "...?",                                                                                                         en: "" },
        meeting_pm_02:                       { ru: "Серьезно, клиент был просто в восторге! Мы пытались сами нагенерить, но такой насыщенный зеленый у нас никак не получался!", en: "" },
        meeting_gg_02:                       { ru: "А! Ну это приятно слышать! А что, будет какой-то бонус? Или еще заказы?",                                    en: "" },
        meeting_gg_03:                       { ru: "Я открыт к предложениям!",                                                                                     en: "" },
        meeting_pm_03:                       { ru: "Конечно! Будут еще заказы! Я добавила вас в пул подрядчиков, так что можете ожидать новые задачи!",           en: "" },
        meeting_gg_04:                       { ru: "Кайф! Тупо топ, ха-ха! Плюс вайб даже!",                                                                      en: "" },
        meeting_pm_04:                       { ru: "...) Эээ... да)",                                                                                               en: "" },
        meeting_pm_05:                       { ru: "Тупо топ))",                                                                                                    en: "" },
        meeting_pm_06:                       { ru: "Ой, мне пора бежать! В общем, будьте на связи!",                                                               en: "" },

        // --- ch1_post_meeting (финал главы 1) ---
        post_meeting_self_01:                { ru: "Ну... Вроде все прошло хорошо?",                                                                               en: "" },
        post_meeting_gg_01:                  { ru: "Да она от меня без ума!",                                                                                      en: "" },
        post_meeting_gg_02:                  { ru: "Ты видел она аж покраснела в конце встречи?",                                                                  en: "" },
        post_meeting_self_02:                { ru: "...",                                                                                                           en: "" },
        post_meeting_self_03:                { ru: "Да, да. Давай... Займёмся делом. У нас еще много работы.",                                                     en: "" },
    },

    // ============================================================
    // РАЗДЕЛ 8: Разные реплики, прошитые прямо в script.js
    // ============================================================
    misc: {
        // Реплики после первого курения (script.js ~line 5384)
        smoking_gg_01:   { en: "I love smoking so much! I could sit and smoke all day!",                                                                           ru: "" },
        smoking_self_01: { en: "It scares me how much you smoke. But with your stress levels, I get it.",                                                          ru: "" },
    },

};
