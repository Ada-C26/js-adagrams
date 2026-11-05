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

const HAND_SIZE = 10;

export const helperPickRandomLetter = (pool) => {

  return Math.floor(Math.random() * pool.length);

};

export const drawLetters = () => {
  // Implement this method for wave 1
  const hand = [];
  const alphabetPool = [];

  for (const letter in LETTER_POOL) {
    for (let quantity = 0; quantity < LETTER_POOL[letter]; quantity++) {
      alphabetPool.push(letter);
    }
  }

  // console.log(alphabetPool);
  // while (hand.length < 10) 
  
  Array.from({ length: HAND_SIZE }).forEach(() => {
    const letterIndex = helperPickRandomLetter(alphabetPool);
    const lastIndex = alphabetPool.length - 1;
    [alphabetPool[letterIndex], alphabetPool[lastIndex]] = [alphabetPool[lastIndex], alphabetPool[letterIndex]];
    hand.push(alphabetPool.pop());
  })
  // console.log(hand);
  // console.log(alphabetPool.length);
  return hand;

};

// drawLetters();


export const usesAvailableLetters = (input, lettersInHand) => {
  // Implement this method for wave 2
};

export const scoreWord = (word) => {
  // Implement this method for wave 3
};

export const highestScoreFrom = (words) => {
  // Implement this method for wave 4
};
