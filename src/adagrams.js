const LETTER_POOL = {
  A: 9, B: 2, C: 2, D: 4, E: 12, F: 2, G: 3, H: 2, I: 9,
  J: 1, K: 1, L: 4, M: 2, N: 6, O: 8, P: 2, Q: 1, R: 6,
  S: 4, T: 6, U: 4, V: 2, W: 2, X: 1, Y: 2, Z: 1,
};

const LETTER_SCORES = {
  A: 1, B: 3, C: 3, D: 2, E: 1, F: 4, G: 2, H: 4, I: 1,
  J: 8, K: 5, L: 1, M: 3, N: 1, O: 1, P: 3, Q: 10, R: 1,
  S: 1, T: 1, U: 1, V: 4, W: 4, X: 8, Y: 4, Z: 10,
};

const HAND_SIZE = 10;
const LONG_WORD_BONUS_LENGTH_MIN = 7;
const LONG_WORD_BONUS_LENGTH_MAX = 10;
const LONG_WORD_BONUS = 8;

const buildTilePile = (pool) => {
  const tiles = [];
  for (const [letter, count] of Object.entries(pool)) {
    tiles.push(...Array(count).fill(letter));
  }
  return tiles;
};

const getLetterFrequency = (letters) => {
  const frequency = {};
  for (const letter of letters) {
    const key = letter.toUpperCase();
    frequency[key] = (frequency[key] ?? 0) + 1;
  }
  return frequency;
};

const containsFrequency = (outer, inner) => {
  for (const [letter, count] of Object.entries(inner)) {
    if ((outer[letter] ?? 0) < count) {
      return false;
    }
  }
  return true;
};

export const drawLetters = () => {
  const tiles = buildTilePile(LETTER_POOL);

  // Partial Fisher-Yates shuffle: swap each picked tile into the front of the
  // array so it can't be picked again, instead of removing it from the middle.
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

const beatsTiedWord = (word, best) => {
  if (best.length === HAND_SIZE) return false;
  if (word.length === HAND_SIZE) return true;
  return word.length < best.length;
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
