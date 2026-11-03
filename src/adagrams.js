const LETTER_POOL = {
  'A': 9, 'B': 2, 'C': 2, 'D': 4, 'E': 12, 'F': 2, 'G': 3, 'H': 2, 'I': 9, 'J': 1, 'K': 1, 'L': 4, 'M': 2,
  'N': 6, 'O': 8, 'P': 2, 'Q': 1, 'R': 6, 'S': 4, 'T': 6, 'U': 4, 'V': 2, 'W': 2, 'X': 1, 'Y': 2, 'Z': 1
};

const SCORE_CHART = {
  A: 1, E: 1, I: 1, O: 1, U: 1, L: 1, N: 1, R: 1, S: 1, T: 1,
  D: 2, G: 2,
  B: 3, C: 3, M: 3, P: 3,
  F: 4, H: 4, V: 4, W: 4, Y: 4,
  K: 5,
  J: 8, X: 8,
  Q: 10, Z: 10
};

//creating a function to get the letter pool based on the LETTER_POOL object.
//  This function will return an array of letters where each letter appears 
// as many times as its frequency in the LETTER_POOL.

export const getLetterPool = () => {
  const pool = [];
  for (const letter in LETTER_POOL) {
    const frequency = LETTER_POOL[letter];
    for (let i = 0; i < frequency; i++) {
      pool.push(letter);
    }
  }
  return pool;
};

const drawRandomLetterFromPool = (pool) => {
  const randomIndex = Math.floor(Math.random() * pool.length);
  const letter = pool[randomIndex];
  pool[randomIndex] = pool[pool.length - 1]; // Replace the drawn letter with the last letter in the pool
  pool.pop(); // Remove the last letter from the pool
  return letter;
};

export const drawLetters = () => {
  // Implement this method for wave 1
  const pool = getLetterPool();
  const hand = [];
  for (let i = 0; i < 10; i++) {
    hand.push(drawRandomLetterFromPool(pool));
  }
  return hand;
};

export const usesAvailableLetters = (input, lettersInHand) => {
  // Implement this method for wave 2
};

export const scoreWord = (word) => {
  // Implement this method for wave 3
};

export const highestScoreFrom = (words) => {
  // Implement this method for wave 4
};
