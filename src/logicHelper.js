import { TIE_BREAK_WORD_LENGTH } from './constants.js';

export const buildTilePile = (pool) => {
  const tiles = [];
  for (const [letter, count] of Object.entries(pool)) {
    tiles.push(...Array(count).fill(letter));
  }
  return tiles;
};

export const getLetterFrequency = (letters) => {
  const frequency = {};
  for (const letter of letters) {
    const key = letter.toUpperCase();
    frequency[key] = (frequency[key] ?? 0) + 1;
  }
  return frequency;
};

export const containsFrequency = (outer, inner) => {
  for (const [letter, count] of Object.entries(inner)) {
    if ((outer[letter] ?? 0) < count) {
      return false;
    }
  }
  return true;
};

export const beatsTiedWord = (word, best) => {
  if (best.length === TIE_BREAK_WORD_LENGTH) return false;
  if (word.length === TIE_BREAK_WORD_LENGTH) return true;
  return word.length < best.length;
};
