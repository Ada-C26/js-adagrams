// prettier-ignore
const LETTER_FREQ = {
  A: 9, B: 2, C: 2,
  D: 4, E: 12, F: 2,
  G: 3, H: 2, I: 9,
  J: 1, K: 1, L: 4,
  M: 2, N: 6, O: 8,
  P: 2, Q: 1, R: 6,
  S: 4, T: 6, U: 4,
  V: 2, W: 2, X: 1,
  Y: 2, Z: 1
};

// prettier-ignore
const SCORE_CHART = {
  A: 1, E: 1, I: 1,
  O: 1, U: 1, L: 1,
  N: 1, R: 1, S: 1,
  T: 1, D: 2, G: 2,
  B: 3, C: 3, M: 3,
  P: 3, F: 4, H: 4,
  V: 4, W: 4, Y: 4,
  K: 5, J: 8, X: 8,
  Q: 10, Z: 10
};

const NUM_TILES_ALLOWED_IN_HAND = 10;

const generateRandomInt = function (max) {
  return Math.floor(Math.random() * max);
};

const buildArrayFromFreq = function (freq) {
  const resultArray = [];
  for (const [item, count] of Object.entries(freq)) {
    for (let i = 0; i < count; i++) {
      resultArray.push(item);
    }
  }
  return resultArray;
};

const buildFreqFromArray = function (arr) {
  const resultFreq = {};
  for (let letter of arr) {
    letter = letter.toLowerCase();
    resultFreq[letter] = (resultFreq[letter] ?? 0) + 1;
  }
  return resultFreq;
};

export const drawLetters = () => {
  // Implement this method for wave 1
  const letterPool = buildArrayFromFreq(LETTER_FREQ);
  const drawnLetters = [];

  for (let i = 0; i < NUM_TILES_ALLOWED_IN_HAND; i++) {
    const lastInd = letterPool.length - 1;
    const randInd = generateRandomInt(lastInd);
    drawnLetters.push(letterPool[randInd]);
    [letterPool[lastInd], letterPool[randInd]] = [
      letterPool[randInd],
      letterPool[lastInd],
    ];
    letterPool.pop();
  }
  return drawnLetters;
};

export const usesAvailableLetters = (input, lettersInHand) => {
  const lettersInHandFreq = buildFreqFromArray(lettersInHand);

  for (const char of input.toLowerCase()) {
    if (!(char in lettersInHandFreq) || lettersInHandFreq[char] <= 0) {
      return false;
    } else {
      lettersInHandFreq[char] -= 1;
    }
  }
  return true;
};

export const scoreWord = (word) => {
  // Implement this method for wave 3
  let total = 0;

  for (const letter of word) {
    total += SCORE_CHART[letter.toUpperCase()] ?? 0;
  }
  if ([7, 8, 9, 10].includes(word.length)) {
    total += 8;
  }
  return total;
};

export const highestScoreFrom = (words) => {
  // Implement this method for wave 4'

  let word = '';
  let score = 0;

  for (let curWord of words) {
    let curScore = scoreWord(curWord);

    // new highest score found
    if (curScore > score) {
      score = curScore;
      word = curWord;
    } else if (curScore == score) {
      if ((curWord.length == 10) & (word.length != 10)) {
        score = curScore;
        word = curWord;
      } else if ((curWord.length < word.length) & (word.length != 10)) {
        score = curScore;
        word = curWord;
      }
    }
  }

  return { word, score };
};
