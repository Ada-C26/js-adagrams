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
  Z: 1
};

const LETTER_VALUES = {
  A: 1,
  B: 3,
  C: 3,
  D: 2,
  E: 1,
  F: 4,
  G: 2,
  H: 4,
  I: 1,
  J: 8,
  K: 5,
  L: 1,
  M: 3,
  N: 1,
  O: 1,
  P: 3,
  Q: 10,
  R: 1,
  S: 1,
  T: 1,
  U: 1,
  V: 4,
  W: 4,
  X: 8,
  Y: 4,
  Z: 10
};

const BONUS_POINTS_FOR_LENGTH = 8;

// helper function
const buildLetterPool = () => {
  let letters = [];

  for (const letter in LETTER_POOL) {
    const count = LETTER_POOL[letter];
    letters.push(...Array(count).fill(letter));
  }
  return letters;
};

export const drawLetters = () => {
  let letters = buildLetterPool();
  let lettersInHand = [];

  for (let i = 0; i < 10; i++) {
    const randomIndex = Math.floor(Math.random() * letters.length);
    const lastLetter = letters.length - 1;

    [letters[randomIndex], letters[lastLetter]] = [letters[lastLetter], letters[randomIndex]];
    lettersInHand.push(letters.pop());
  }
  return lettersInHand;
};

export const usesAvailableLetters = (input, lettersInHand) => {
  const letterFrequencies = {};

  for (const letter of lettersInHand) {
    letterFrequencies[letter] = (letterFrequencies[letter] || 0) + 1;
  }

  for (const letter of input) {
    const upperLetter = letter.toUpperCase();

    if (!letterFrequencies[upperLetter] || letterFrequencies[upperLetter] === 0) {
      return false;
    }
    letterFrequencies[upperLetter] -= 1;
  }
  return true;
};

export const scoreWord = (word) => {
  let score = 0;

  for (const letter of word) {
    const upperLetter = letter.toUpperCase();
    score += LETTER_VALUES[upperLetter];
  }
  if (word.length >= 7 && word.length <= 10) {
    score += BONUS_POINTS_FOR_LENGTH;
  }
  return score;
};

export const highestScoreFrom = (words) => {
  let winningWord = words[0];
  let winningScore = scoreWord(winningWord);

  for (const word of words) {
    const currentScore = scoreWord(word);

    if (currentScore > winningScore) {
      winningWord = word;
      winningScore = currentScore;
    } else if (currentScore === winningScore) {
      if (winningWord.length !== 10 && (word.length === 10 || word.length < winningWord.length)) {
        winningWord = word;
        winningScore = currentScore;
      }
    }
  }
  return { word: winningWord, score: winningScore };
};