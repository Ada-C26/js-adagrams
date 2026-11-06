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
  'Z': 1,
};

const POINTS_PER_LETTER = {
  'A' : 1,
  'B' : 3,
  'C' : 3,
  'D' : 2,
  'E' : 1,
  'F' : 4,
  'G' : 2,
  'H' : 4,
  'I' : 1,
  'J' : 8,
  'K' : 5,
  'L' : 1,
  'M' : 3,
  'N' : 1,
  'O' : 1,
  'P' : 3,
  'Q' : 10,
  'R' : 1,
  'S' : 1,
  'T' : 1,
  'U' : 1,
  'V' : 4,
  'W' : 4,
  'X' : 8,
  'Y' : 4,
  'Z' : 10
};

const HAND_SIZE = 10;
const LONG_WORD_BONUS_MIN_LENGTH = 7;

export const helperPickRandomLetter = (pool) => {

  return Math.floor(Math.random() * pool.length);

};

export const createAlphabetPool = () => {
  const alphabetPool = [];

  for (const letter in LETTER_POOL) {
    for (let quantity = 0; quantity < LETTER_POOL[letter]; quantity++) {
      alphabetPool.push(letter);
    }
  }
  return alphabetPool;
};

export const drawLetters = () => {

  const hand = [];
  const alphabetPool = createAlphabetPool();

  for (let i =0; i < HAND_SIZE; i++) {
    const letterIndex = helperPickRandomLetter(alphabetPool);
    const lastIndex = alphabetPool.length - 1;
    [alphabetPool[letterIndex], alphabetPool[lastIndex]] = [alphabetPool[lastIndex], alphabetPool[letterIndex]];
    hand.push(alphabetPool.pop());
  };

  return hand;

};

export const usesAvailableLetters = (input, lettersInHand) => {

  const copyLetterPool = {};

  for (const letter of lettersInHand) {
    const lowerCaseLetter = letter.toLowerCase();
    copyLetterPool[lowerCaseLetter] = (copyLetterPool[lowerCaseLetter] || 0) + 1;
  }

  for (const letter of input) {
    const lowerCaseInput = letter.toLowerCase();
    if (copyLetterPool[lowerCaseInput]) {
      copyLetterPool[lowerCaseInput] -= 1;
    }
    else {
      return false;
    }
  }
  return true;
};

export const scoreWord = (word) => {

  const wordInUpperCase = word.toUpperCase();
  let totalPoints = 0;

  if (wordInUpperCase.length >= LONG_WORD_BONUS_MIN_LENGTH) {
    totalPoints += 8;
  }

  for (const letter of wordInUpperCase) {
    totalPoints += POINTS_PER_LETTER[letter];
  }

  return totalPoints;
};

// export const highestScoreFrom = (words) => {
//   let highestScore = scoreWord(words[0]);
//   let winningWord = words[0];

//   for (let i = 1; i < words.length; i++) {

//     const scoreWordAtIndex = scoreWord(words[i]);
//     const wordAtIndex = words[i];

//     if (highestScore < scoreWordAtIndex) {
//       highestScore = scoreWordAtIndex;
//       winningWord = wordAtIndex;
//     }

//     else if (highestScore === scoreWordAtIndex) {
//       if (winningWord.length !== 10 && (wordAtIndex.length === 10 || wordAtIndex.length < winningWord.length)) {
//         winningWord = wordAtIndex;
//       }
//     };
//   }
//   return { 'score': highestScore, 'word': winningWord };
// };

export const highestScoreFrom = (words) => {

  // Get the highest score
  let maxScore = 0;
  for (const word of words) {
    const wordScore = scoreWord(word);
    if (wordScore > maxScore) {
      maxScore = wordScore;
    }
  }

  // See if there's any ties
  const tiedWords = [];
  for (const word of words) {
    if (scoreWord(word) == maxScore) {
      tiedWords.push(word);
    }
  }

  // If there is only one word with the highest score, return immediately
  if (tiedWords.length === 1) {
    return {'score': maxScore, 'word': tiedWords[0]};
  }

  // If it's a tie and there's two or more words with the highest score, first word to have 10 letters wins
  for (const word of tiedWords) {
    if (word.length === 10) {
      return {'score': maxScore, 'word': word};
    }
  }

  // If it's a tie and no words consists of 10 letters, the shortest one wins
  let winningWord = tiedWords[0];
  for (let i = 0; i < tiedWords.length; i++) {
    if (tiedWords[i].length < winningWord.length) {
      winningWord = tiedWords[i];
    }
  }
  return {'score': maxScore, 'word': winningWord};

};
