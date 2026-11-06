import {
  LETTER_POOL,
  LETTER_SCORES,
  HAND_SIZE,
  LONG_WORD_BONUS_LENGTH_MIN,
  LONG_WORD_BONUS_LENGTH_MAX,
  LONG_WORD_BONUS,
} from './constants.js';
import {
  buildTilePile,
  getLetterFrequency,
  containsFrequency,
  beatsTiedWord,
} from './logicHelper.js';

export const drawLetters = () => {
  const tiles = buildTilePile(LETTER_POOL);
  const hand = [];

  for (let i = 0; i < HAND_SIZE; i++) {
    const j = i + Math.floor(Math.random() * (tiles.length - i));
    [tiles[i], tiles[j]] = [tiles[j], tiles[i]];
    hand.push(tiles[i]);
  }
  return hand;
};

export const usesAvailableLetters = (input, lettersInHand) => {
  const wordFrequency = getLetterFrequency(input);
  const handFrequency = getLetterFrequency(lettersInHand);
  return containsFrequency(handFrequency, wordFrequency);
};

export const scoreWord = (word) => {
  let score = 0;
  for (const letter of word.toUpperCase()) {
    score += LETTER_SCORES[letter] ?? 0;
  }

  if (
    word.length >= LONG_WORD_BONUS_LENGTH_MIN &&
    word.length <= LONG_WORD_BONUS_LENGTH_MAX
  ) {
    score += LONG_WORD_BONUS;
  }
  return score;
};

export const highestScoreFrom = (words) => {
  if (words.length === 0) {
    throw new Error('highestScoreFrom requires at least one word');
  }

  let best = null;
  for (const word of words) {
    const score = scoreWord(word);
    if (
      best === null ||
      score > best.score ||
      (score === best.score && beatsTiedWord(word, best.word))
    ) {
      best = { word, score };
    }
  }
  return best;
};
