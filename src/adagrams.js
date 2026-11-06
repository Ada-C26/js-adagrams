const LETTER_POOL = {
  'A': 9,
  'B': 2,
  'C': 2,
  'D': 4,
  'E': 12,
  'F': 2,
  'G': 3,
  'H': 2,
  'I': 9,
  'J': 1,
  'K': 1,
  'L': 4,
  'M': 2,
  'N': 6,
  'O': 8,
  'P': 2,
  'Q': 1,
  'R': 6,
  'S': 4,
  'T': 6,
  'U': 4,
  'V': 2,
  'W': 2,
  'X': 1,
  'Y': 2,
  'Z': 1
};

const SCORE_CHART = {
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

export const drawLetters = () => {

  const hand = [];
  const pool = { ...LETTER_POOL };

  let total = totalNumberOfLetters(pool);

  while (hand.length < 10 && total > 0){
    const n = Math.floor(Math.random() * total) + 1;
    let count = 0;

    for (const [letter, frequency] of Object.entries(pool)) {
      count += frequency;

      if (n <= count){
        hand.push(letter);
        pool[letter] -= 1;
        total -= 1;
        break;
      }
    }
  }
  return hand;
};

export const usesAvailableLetters = (input, lettersInHand) => {
  const lettersCopy = [...lettersInHand];

  for (const letter of input) {
    const upperLetter = letter.toUpperCase();

    const index = lettersCopy.indexOf(upperLetter);

    if (index !== -1) {
      lettersCopy.splice(index, 1);
    } else {
      return false;
    }
  }

  return true;
};

export const scoreWord = (word) => {
  let score = 0;

  if (word.length >= 7 && word.length <= 10) {
    score = 8;
  }

  for (const letter of word) {
    const upperLetter = letter.toUpperCase();
    score += SCORE_CHART[upperLetter];
  }

  return score;
};

export const highestScoreFrom = (words) => {
  let bestScore = 0;
  let bestWord = '';

  for (const word of words) {
    const score = scoreWord(word);

    if (score > bestScore) {
      bestScore = score;
      bestWord = word;
    } else if (score === bestScore) {
      if (word.length === 10 || bestWord.length === 10) {
        bestWord = word.length > bestWord.length ? word : bestWord;
      } else if (word.length < bestWord.length) {
        bestWord = word;
      }
    }
  }

  return {
    word: bestWord,
    score: bestScore
  };
};

export const totalNumberOfLetters = (pool) => {
  let total = 0;
  for (const frequency of Object.values(pool)) {
    total += frequency;
  }

  return total;

};