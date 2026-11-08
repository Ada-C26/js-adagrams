const LETTERPOOL = {
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
  let letters = [];

  for (const letter in LETTERPOOL) {
    const count = LETTERPOOL[letter];
    letters.push(...Array(count).fill(letter));
  }

  let lettersInHand = [];

  for (let i = 0; i < 10; i++) {
    const randomIndex = Math.floor(Math.random() * letters.length);
    lettersInHand.push(letters.splice(randomIndex, 1)[0]);
  }
  return lettersInHand;
};

export const usesAvailableLetters = (input, lettersInHand) => {
  let letters = [];

  for (const letter of lettersInHand) {
    letters.push(letter);
  }

  for (const letter of input) {
    const upperLetter = letter.toUpperCase();

    if (!letters.includes(upperLetter)) {
      return false;
    }
    letters.splice(letters.indexOf(upperLetter), 1);
  }
  return true;
};

export const scoreWord = (word) => {
  // Implement this method for wave 3
};

export const highestScoreFrom = (words) => {
  // Implement this method for wave 4
};
