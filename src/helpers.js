
import { AVAILABLE_LETTER_COUNTS } from './adagrams.js';

export const getTotalLetters = (pool) => {
  return Object.values(pool).reduce((sum, quantity) => sum + quantity, 0);
};

export const drawSingleLetter = (pool) => {
  const totalLetters = getTotalLetters(pool);
  const randomPosition = Math.floor(Math.random() * totalLetters) + 1;
  let positionCounter = 0;

  for (const [letter, quantity] of Object.entries(pool)) {
    positionCounter += quantity;

    if (positionCounter < randomPosition) {
      continue;
    } else {
      pool[letter] -= 1;
      return letter;
    }
  }
};

export const usesAvailableLetters = (input, lettersInHand) => {
  const lettersDict = {};

  for (const letter of lettersInHand) {
    const lowerCaseLetter = letter.toLowerCase();
    lettersDict[lowerCaseLetter] = (lettersDict[lowerCaseLetter] || 0) + 1;
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

  if (word.length >= 7) {
    score += 8;
  }

  for (const letter of word.toUpperCase()) {
    let letterScore = LETTER_SCORE_VALUES[letter];
    score += letterScore;
  }

  return score;
};

export const handleTiedScore = (newWord, newLength, currentWord, currentLength) => {
  if (newLength === 10 && currentLength !== 10) {
    return { word: newWord, length: newLength };
  } else if (currentLength === 10) {
    return { word: currentWord, length: currentLength };
  } else if (newLength < currentLength) {
    return { word: newWord, length: newLength };
  }

  return { word: currentWord, length: currentLength };
};
