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
  A: 1, E: 1, I: 1, O: 1, U: 1,
  L: 1, N: 1, S: 1, T: 1, R: 1,
  D: 2, G: 2,
  B: 3, C: 3, M: 3, P: 3,
  F: 4, H: 4, V: 4, W: 4, Y: 4,
  K: 5,
  J: 8, X: 8,
  Q: 10, Z: 10,
};

const BONUS_LENGTH = 7;
const BONUS_POINTS = 8;



export const drawLetters = () => {
  const availableLetters = [];

  for (const [letter, quantity] of Object.entries(LETTER_POOL)) {
    for (let i = 0; i < quantity; i++) {
      availableLetters.push(letter);
    }
  }

  const drawnLetters = [];

  for (let i = 0; i < 10; i++) {
    const randomIndex = Math.floor(Math.random() * availableLetters.length);

    drawnLetters.push(availableLetters[randomIndex]);

    availableLetters.splice(randomIndex, 1);
  }

  return drawnLetters;
};



export const usesAvailableLetters = (input, lettersInHand) => {
  const letterCounts = new Map();

  for (const letter of lettersInHand) {
    const count = letterCounts.get(letter) || 0;
    letterCounts.set(letter, count + 1);
  }

  for (const letter of input) {
    const count = letterCounts.get(letter) || 0;

    if (count === 0) {
      return false;
    }

    letterCounts.set(letter, count - 1);
  }

  return true;
};



export const scoreWord = (word) => {
  const upperCaseWord = word.toUpperCase();
  let score = 0;

  for (const letter of upperCaseWord) {
    score += LETTER_SCORES[letter];
  }

  if (upperCaseWord.length >= BONUS_LENGTH) {
    score += BONUS_POINTS;
  }

  return score;
};



export const highestScoreFrom = (words) => {
  let bestWord = '';
  let bestScore = 0;

  for (const word of words) {
    const currentScore = scoreWord(word);

    // Rule 1: A higher score always wins.
    if (currentScore > bestScore) {
      bestWord = word;
      bestScore = currentScore;
    }

    // Rule 2: A 10-letter word wins a tie.
    else if (
      currentScore === bestScore &&
      word.length === 10 &&
      bestWord.length !== 10
    ) {
      bestWord = word;
      bestScore = currentScore;
    }

    // Rule 3: The shorter word wins a tie, unless it has 10 letters.
    else if (
      currentScore === bestScore &&
      word.length !== 10 &&
      bestWord.length !== 10 &&
      word.length < bestWord.length
    ) {
      bestWord = word;
      bestScore = currentScore;
    }
  }

  return {
    word: bestWord,
    score: bestScore,
  };
};