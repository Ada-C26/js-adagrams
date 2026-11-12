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

const LETTER_SCORES = {
  'A': 1,
  'B': 3,
  'C': 3,
  'D': 2,
  'E': 1,
  'F': 4,
  'G': 2,
  'H': 4,
  'I': 1,
  'J': 8,
  'K': 5,
  'L': 1,
  'M': 3,
  'N': 1,
  'O': 1,
  'P': 3,
  'Q': 10,
  'R': 1,
  'S': 1,
  'T': 1,
  'U': 1,
  'V': 4,
  'W': 4,
  'X': 8,
  'Y': 4,
  'Z': 10,
};

const HAND_SIZE = 10;

const getRandomIndex = (pool) => {
  return Math.floor(Math.random() * pool.length);
};

const createAlphabetPool = () => {
  const alphabetPool = [];

  for (const letter in LETTER_POOL) {
    for (let i = 0; i < LETTER_POOL[letter]; i++) {
      alphabetPool.push(letter);
    }
  }
  return alphabetPool;
};
export const drawLetters = () => {
  const hand = [];
  const alphabetPool = createAlphabetPool();

  for (let i = 0; i < HAND_SIZE; i++) {
    const letterIndex = getRandomIndex(alphabetPool);
    const lastIndex = alphabetPool.length - 1;
    [alphabetPool[letterIndex], alphabetPool[lastIndex]] =
    [alphabetPool[lastIndex], alphabetPool[letterIndex]];
    hand.push(alphabetPool.pop());
  }
  return hand;
};

export const usesAvailableLetters = (input, lettersInHand) => {
  const handFreq = {};

  for (const letter of lettersInHand) {
    const upperLetter = letter.toUpperCase();

    if (handFreq[upperLetter]) {
      handFreq[upperLetter] += 1;
    } 
    else {
      handFreq[upperLetter] = 1;
    } 
  }
  for (const letter of input.toUpperCase()) {
    if (!handFreq[letter]) {
      return false;
    }
    handFreq[letter] -= 1;
  }
  return true;
};

export const scoreWord = (word) => {
  let score = 0;
  for (const letter of word.toUpperCase()) {
    score += LETTER_SCORES[letter];
  }
  if (word.length >= 7) {
    if (word.length <= 10) {
      score += 8;
    }
  }
  return score;
};

export const highestScoreFrom = (words) => {
  if (words.length === 0) {
    return { word: '', score: 0 };
  }
   let currentWord = words[0];
   let currenScore = scoreWord(currentWord);

for (const word of words) {
  const score = scoreWord(word);
  if (score > currenScore) {
    currentWord = word;
    currenScore = score;
  } else if (score === currenScore) {
    if (word.length === 10) {
      if (currentWord.length !== 10) {
        currentWord = word;
      }
    } else if (currentWord.length !== 10){
      if (word.length < currentWord.length){
        currentWord = word;
      }
    }
  }
}
return { word: currentWord, score: currenScore};
};
