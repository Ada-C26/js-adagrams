const LETTER_SCORES = {
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
  Z: 10
};

const LETTER_POOL = {
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
  Z: 1
};


export const drawLetters = () => {
  const letters = [];
  const pool = [];

  for (const [letter, quantity] of Object.entries(LETTER_POOL)) {
    for (let i = 0; i < quantity; i++) {
      pool.push(letter);
    }
  }

  while (letters.length < 10) {
    const position = Math.floor(Math.random() * pool.length);
    const letter = pool[position];

    letters.push(letter);
    pool.splice(position, 1);
  }

  return letters;

};


export const usesAvailableLetters = (input, lettersInHand) => {
  const frequences = Object.create(null);
  for (const letter of lettersInHand) {
    frequences[letter] = (frequences[letter] ?? 0) + 1;
  }
  for (const letter of input.toUpperCase()) {
    if (!frequences[letter]) {
      return false;
    }
    frequences[letter]--;
  }
  return true;
};


export const scoreWord = (word) => {
  // Implement this method for wave 3
};

export const highestScoreFrom = (words) => {
  // Implement this method for wave 4
};
