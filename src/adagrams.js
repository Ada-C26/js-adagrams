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
  Z: 1,
};

const LETTER_SCORES = {
  A: 1,
  B: 3,
  C: 3,
  D: 2,
  E: 1,
  F: 4,
  G: 2,
  H: 4,
  I: 1,
  J: 8,
  K: 5,
  L: 1,
  M: 3,
  N: 1,
  O: 1,
  P: 3,
  Q: 10,
  R: 1,
  S: 1,
  T: 1,
  U: 1,
  V: 4,
  W: 4,
  X: 8,
  Y: 4,
  Z: 10,
};


export const drawLetters = () => {
  
  const bag = [];
  for (const key of Object.keys(LETTER_POOL)) {
    for (let i = 0; i < LETTER_POOL[key]; i++) {
      bag.push(key);
    }
  }


  const hand = [];
  for (let i = 0; i < 10; i++) {
    const index = Math.floor(Math.random() * bag.length);
    hand.push(bag[index]);
    bag.splice(index, 1);
  }


  return hand;
};

export const usesAvailableLetters = (input, lettersInHand) => {
  const hand = [...lettersInHand];

  for (const letter of input.toUpperCase()) {
    const index = hand.indexOf(letter);

    if (index === -1) {
      return false;
    }

    hand.splice(index, 1);
  }

  return true;
};

export const scoreWord = (word) => {
  let sum = 0;

  for (const letter of word.toUpperCase()) {
    sum += LETTER_SCORES[letter];
  }

  if (word.length >= 7 && word.length <= 10) {
    sum += 8;
  }

  return sum;
};

export const highestScoreFrom = (words) => {
  // Implement this method for wave 4
};
