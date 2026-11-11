const letterPool = {
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

const scores = {
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

function getRandomIntInclusive(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
}

export const drawLetters = () => {
  // Implement this method for wave 1
  const letters = [];
  const drawnLetters = [];
  const numbersDrawn = [];

  for (const [letter, count] of Object.entries(letterPool)) {
    letters.push(...letter.repeat(count));
  }

  let handSize = 10;

  for (let i = 0; i < handSize; i++) {
    let number = getRandomIntInclusive(0, letters.length - 1);
    while (numbersDrawn.includes(number)) {
      number = getRandomIntInclusive(0, letters.length - 1);
    }
    numbersDrawn.push(number);
    drawnLetters.push(letters[number]);
  }

  return drawnLetters;
};

export const usesAvailableLetters = (input, lettersInHand) => {
  const lettersInHandCopy = {};
  input = input.toUpperCase();

  for (let letter of lettersInHand) {
    lettersInHandCopy[letter] = (lettersInHandCopy[letter] || 0) + 1;
  }

  for (let letter of input) {
    if ((lettersInHandCopy[letter] || 0) == 0) {
      return false;
    }

    lettersInHandCopy[letter] -= 1;
  }
  return true;
};

export const scoreWord = (word) => {
  // Implement this method for wave 3
  let score = 0;
  word = word.toUpperCase();
  let longWordBonusLengthMin = 7;
  let longWordBonus = 8;
  if (word.length >= longWordBonusLengthMin) {
    score += longWordBonus;
  }
  for (let letter of word) {
    score += scores[letter];
  }
  return score;
};

export const highestScoreFrom = (words) => {
  // Implement this method for wave 4
  let highestScore = 0;
  let highestScoringWord = '';
  let wordsWithHighestScore = [];

  for (let word of words) {
    let score = scoreWord(word);
    if (score > highestScore) {
      highestScore = score;
      highestScoringWord = word;
    } else if (score == highestScore) {
      wordsWithHighestScore.push(word);
    }
  }

  if (wordsWithHighestScore) {
    for (let word of wordsWithHighestScore) {
      if (word.length == 10 || word.length < highestScoringWord.length) {
        if (highestScoringWord.length != 10) {
          highestScoringWord = word;
        }
      }
    }
  }

  return { score: highestScore, word: highestScoringWord };
};
