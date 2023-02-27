import { presetPrompts } from '../presets/presets';

// get a random preset prompt:
export function random_PP (prompt) {
    const random_I = Math.floor(Math.random()*presetPrompts.length);
    const random_P = presetPrompts[random_I];

    // prevent identical back 2 back results:
    if (random_P === prompt) return random_PP(prompt);

    return random_P
};