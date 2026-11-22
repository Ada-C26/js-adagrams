const LETTER_POOL = {
  A: 9,
  B: 2,
  C: 2,
  D: 4,
  E: 12,
  F: 2,
  G: 3,
  H: 2,
  I: 9,
  J: 1,
  K: 1,
  L: 4,
  M: 2,
  N: 6,
  O: 8,
  P: 2,
  Q: 1,
  R: 6,
  S: 4,
  T: 6,
  U: 4,
  V: 2,
  W: 2,
  X: 1,
  Y: 2,
  Z: 1,
};

const LETTER_SCORES = {
  A: 1,
  E: 1,
  I: 1,
  O: 1,
  U: 1,
  L: 1,
  N: 1,
  R: 1,
  S: 1,
  T: 1,
  D: 2,
  G: 2,
  B: 3,
  C: 3,
  M: 3,
  P: 3,
  F: 4,
  H: 4,
  V: 4,
  W: 4,
  Y: 4,
  K: 5,
  J: 8,
  X: 8,
  Q: 10,
  Z: 10,
};

export const drawLetters = () => {
  // make a bag with every tile in it, so the pool itself never changes
  const tileBag = [];
  for (const letter in LETTER_POOL) {
    const count = LETTER_POOL[letter];
    for (let i = 0; i < count; i++) {
      tileBag.push(letter);
    }
  }

  const hand = [];
  while (hand.length < 10) {
    const randomIndex = Math.floor(Math.random() * tileBag.length);
    const tile = tileBag[randomIndex];
    // take the tile out of the bag so it can't be drawn again
    tileBag.splice(randomIndex, 1);
    hand.push(tile);
  }

  return hand;
};

export const usesAvailableLetters = (input, lettersInHand) => {
  // copy the hand so we don't change the real one
  const lettersLeft = [];
  for (const letter of lettersInHand) {
    lettersLeft.push(letter);
  }

  for (const letter of input.toUpperCase()) {
    const index = lettersLeft.indexOf(letter);
    if (index === -1) {
      return false;
    }
    lettersLeft.splice(index, 1);
  }

  return true;
};

export const scoreWord = (word) => {
  let score = 0;

  for (const letter of word.toUpperCase()) {
    score += LETTER_SCORES[letter];
  }

  if (word.length >= 7) {
    score += 8;
  }

  return score;
};

export const highestScoreFrom = (words) => {
  let bestWord = words[0];
  let bestScore = scoreWord(bestWord);

  for (let i = 1; i < words.length; i++) {
    const word = words[i];
    const score = scoreWord(word);

    if (score > bestScore) {
      bestWord = word;
      bestScore = score;
    } else if (score === bestScore) {
      // if the scores tie, the 10 letter word wins. if there is no 10 letter word, the shorter one wins
      if (bestWord.length === 10) {
        continue;
      } else if (word.length === 10) {
        bestWord = word;
      } else if (word.length < bestWord.length) {
        bestWord = word;
      }
    }
  }

  return { word: bestWord, score: bestScore };
};
