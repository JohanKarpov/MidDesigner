// src/preload.js — Asset preloading to prevent first-render flicker
//
// BG layers (bg/bg-*.png) are already in game2.html as <img hidden> —
// the browser fetches them automatically, no need to duplicate here.
//
// Wardrobe character variants are lazy-loaded by ui-hud.js when the
// player selects them — no need to preload all 7 MB upfront.

const PRELOAD_IMAGES = [
    // ── Character sprites (base only — wardrobe variants load on demand) ──
    'images/PixelEgorus/PixE-Idle-1.png',
    'images/PixelEgorus/PixE-Work-1.png',
    'images/PixelEgorus/PixE-Smoke-1.png',

    // ── Minigen tiles ──
    'images/minigen-game/minigen-rocket-1.png',
    'images/minigen-game/minigen-rocket-2.png',
    'images/minigen-game/minigen-rocket-3.png',
    'images/minigen-game/minigen-cat-1.png',
    'images/minigen-game/minigen-cat-2.png',
    'images/minigen-game/minigen-cat-3.png',
    'images/minigen-game/minigen-burger-1.png',
    'images/minigen-game/minigen-burger-2.png',
    'images/minigen-game/minigen-burger-3.png',
    'images/minigen-game/minigen-mntn-1.png',
    'images/minigen-game/minigen-mntn-2.png',
    'images/minigen-game/minigen-mntn-3.png',
    'images/minigen-game/minigen-car-1.png',
    'images/minigen-game/minigen-car-2.png',
    'images/minigen-game/minigen-car-3.png',
    'images/minigen-game/minigen-palm-1.png',
    'images/minigen-game/minigen-palm-2.png',
    'images/minigen-game/minigen-palm-3.png',
    'images/minigen-game/minigen-clock-1.png',
    'images/minigen-game/minigen-clock-2.png',
    'images/minigen-game/minigen-clock-3.png',
    'images/minigen-game/minigen-piz-1.png',
    'images/minigen-game/minigen-piz-2.png',
    'images/minigen-game/minigen-piz-3.png',
    'images/minigen-game/minigen-sword-1.png',
    'images/minigen-game/minigen-sword-2.png',
    'images/minigen-game/minigen-sword-3.png',
    'images/minigen-game/minigen-duck-1.png',
    'images/minigen-game/minigen-duck-2.png',
    'images/minigen-game/minigen-duck-3.png',
    'images/minigen-game/minigen-ufo-1.png',
    'images/minigen-game/minigen-ufo-2.png',
    'images/minigen-game/minigen-ufo-3.png',
    'images/minigen-game/minigen-bimbo-1.png',
    'images/minigen-game/minigen-bimbo-2.png',
    'images/minigen-game/minigen-bimbo-3.png',
    'images/minigen-game/minigen-busya-1.png',
    'images/minigen-game/minigen-busya-2.png',
    'images/minigen-game/minigen-busya-3.png',
    'images/minigen-game/minigen-cabin-1.png',
    'images/minigen-game/minigen-cabin-2.png',
    'images/minigen-game/minigen-cabin-3.png',
    'images/minigen-game/minigen-camp-1.png',
    'images/minigen-game/minigen-camp-2.png',
    'images/minigen-game/minigen-camp-3.png',
    'images/minigen-game/minigen-castle-1.png',
    'images/minigen-game/minigen-castle-2.png',
    'images/minigen-game/minigen-castle-3.png',
    'images/minigen-game/minigen-coolcat-1.png',
    'images/minigen-game/minigen-coolcat-2.png',
    'images/minigen-game/minigen-coolcat-3.png',
    'images/minigen-game/minigen-lake-1.png',
    'images/minigen-game/minigen-lake-2.png',
    'images/minigen-game/minigen-lake-3.png',
    'images/minigen-game/minigen-mars-1.png',
    'images/minigen-game/minigen-mars-2.png',
    'images/minigen-game/minigen-mars-3.png',
    'images/minigen-game/minigen-ncity-1.png',
    'images/minigen-game/minigen-ncity-2.png',
    'images/minigen-game/minigen-ncity-3.png',
    'images/minigen-game/minigen-pup-1.png',
    'images/minigen-game/minigen-pup-2.png',
    'images/minigen-game/minigen-pup-3.png',
    'images/minigen-game/minigen-snsbeach-1.png',
    'images/minigen-game/minigen-snsbeach-2.png',
    'images/minigen-game/minigen-snsbeach-3.png',
    'images/minigen-game/minigen-snscar-1.png',
    'images/minigen-game/minigen-snscar-2.png',
    'images/minigen-game/minigen-snscar-3.png',
    'images/minigen-game/minigen-sushi-1.png',
    'images/minigen-game/minigen-sushi-2.png',
    'images/minigen-game/minigen-sushi-3.png',
    'images/minigen-game/minigen-tank-1.png',
    'images/minigen-game/minigen-tank-2.png',
    'images/minigen-game/minigen-tank-3.png',
    'images/minigen-game/minigen-tema-1.png',
    'images/minigen-game/minigen-tema-2.png',
    'images/minigen-game/minigen-tema-3.png',
    'images/minigen-game/minigen-grnballs1-1.png',
    'images/minigen-game/minigen-grnballs1-2.png',
    'images/minigen-game/minigen-grnballs1-3.png',
    'images/minigen-game/minigen-grnballs2-1.png',
    'images/minigen-game/minigen-grnballs2-2.png',
    'images/minigen-game/minigen-grnballs2-3.png',
    'images/minigen-game/minigen-grnballs3-1.png',
    'images/minigen-game/minigen-grnballs3-2.png',
    'images/minigen-game/minigen-grnballs3-3.png',
    'images/minigen-game/minigen-grnballs4-1.png',
    'images/minigen-game/minigen-grnballs4-2.png',
    'images/minigen-game/minigen-grnballs4-3.png',

    // ── Job icons ──
    'images/icons/job/icon-job-story.png',
    'images/icons/job/icon-job-out.png',
];

const PRELOAD_AUDIO = [
    'sounds/sfx/MainButton_v1.mp3',
    'sounds/sfx/MainButton_v1_Locked.mp3',
    'sounds/sfx/MainButton_v1_HEAT.mp3',
    'sounds/sfx/MainButton_v1_HEAT_Stars.mp3',
    'sounds/sfx/Smoking_Long.mp3',
    'sounds/sfx/Smoking_Short.mp3',
    'sounds/sfx/Pluck Notification 02.wav',
    'sounds/sfx/Simple Modern Click.wav',
];

export function preloadAssets() {
    for (const src of PRELOAD_IMAGES) {
        const img = new Image();
        img.src = src;
    }
    for (const src of PRELOAD_AUDIO) {
        const audio = new Audio();
        audio.preload = 'auto';
        audio.src = src;
    }
}
