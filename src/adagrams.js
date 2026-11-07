import {
  drawSingleLetter,
  scoreWord,
} from './helpers.js';

const AVAILABLE_LETTER_COUNTS = {
  A: 9, B: 2, C: 2, D: 4,
  E: 12, F: 2, G: 3, H: 2,
  I: 9, J: 1, K: 1, L: 4,
  M: 2, N: 6, O: 8, P: 2,
  Q: 1, R: 6, S: 4, T: 6,
  U: 4, V: 2, W: 2, X: 1,
  Y: 2, Z: 1
};

const LETTER_SCORE_VALUES = {
  A: 1, B: 3, C: 3, D: 2,
  E: 1, F: 4, G: 2, H: 4,
  I: 1, J: 8, K: 5, L: 1,
  M: 3, N: 1, O: 1, P: 3,
  Q: 10, R: 1, S: 1, T: 1,
  U: 1, V: 4, W: 4, X: 8,
  Y: 4, Z: 10
};


export const drawLetters = () => {
  const userList = [];
  const pool = { ...AVAILABLE_LETTER_COUNTS };

  while (userList.length < 10) {
    const letter = drawSingleLetter(pool);
    userList.push(letter);
  }

  return userList;
};

export const highestScoreFrom = (words) => {
  let highestScore = 0;
  let highestWord = '';
  let highestLength = 0;

  for (const word of words) {
    const score = scoreWord(word);
    const wordLength = word.length;

    if (score > highestScore) {
      highestScore = score;
      highestWord = word;
      highestLength = wordLength;
    } else if (score === highestScore) {
      const result = handleTiedScore(
        word,
        wordLength,
        highestWord,
        highestLength
      );

      highestWord = result.word;
      highestLength = result.length;
    }
  }

  return { word: highestWord, score: highestScore };
};




