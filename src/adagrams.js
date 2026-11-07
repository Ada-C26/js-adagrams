import {
  LETTER_POOL,
  drawSingleLetter,
  LETTER_SCORES,
  handleTiedScore
} from './helpers.js';

// Wave 1
export const drawLetters = () => {
  const userList = [];
  const pool = { ...LETTER_POOL };

  while (userList.length < 10) {
    const letter = drawSingleLetter(pool);
    userList.push(letter);
  }

  return userList;
};

// Wave 2
export const usesAvailableLetters = (input, lettersInHand) => {
  const lettersDict = {};

  for (const letter of lettersInHand) {
    const lowerCaseLetter = letter.toLowerCase();

    lettersDict[lowerCaseLetter] =
      (lettersDict[lowerCaseLetter] || 0) + 1;
  }

  for (const letter of input) {
    const lowerCaseLetter = letter.toLowerCase();

    if (!lettersDict[lowerCaseLetter]) {
      return false;
    }

    lettersDict[lowerCaseLetter] -= 1;
  }

  return true;
};

export const scoreWord = (word) => {
  let score = 0;

  if (!word) {
    return 0;
  }

  if (word.length >= 7 && word.length <= 10) {
    score += 8;
  }

  for (const letter of word.toUpperCase()) {
    score += LETTER_SCORES[letter];
  }

  return score;
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

