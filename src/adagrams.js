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

// Wave 1
export const drawLetters = () => {
  let letters = [];

  for (const letter in LETTER_POOL) {
    const count = LETTER_POOL[letter];

    for (let letterIndex = 0; letterIndex < count; letterIndex++) {
      letters = letters.concat([letter]);
    }
  }

  let hand = [];

  for (let drawNumber = 0; drawNumber < 10; drawNumber++) {
    const randomIndex = Math.floor(Math.random() * letters.length);

    const randomLetter = letters[randomIndex];

    let newLetters = [];

    for (let index = 0; index < letters.length; index++) {
      if (index !== randomIndex) {
        newLetters = newLetters.concat([letters[index]]);
      }
    }

    letters = newLetters;

    hand = hand.concat([randomLetter]);
  }

  return hand;
};

// Wave 2
export const usesAvailableLetters = (input, lettersInHand) => {
  let availableLetters = [];

  for (const letter of lettersInHand) {
    availableLetters = availableLetters.concat([letter.toUpperCase()]);
  }

  for (const letter of input.toUpperCase()) {
    let foundLetter = false;
    let foundIndex = -1;

    for (let letterIndex = 0; letterIndex < availableLetters.length; letterIndex++) {
      if (availableLetters[letterIndex] === letter) {
        foundLetter = true;
        foundIndex = letterIndex;
        break;
      }
    }

    if (foundLetter === false) {
      return false;
    }

    let newLetters = [];

    for (let letterIndex = 0; letterIndex < availableLetters.length; letterIndex++) {
      if (letterIndex !== foundIndex) {
        newLetters = newLetters.concat([availableLetters[letterIndex]]);
      }
    }

    availableLetters = newLetters;
  }

  return true;
};


// Wave 3
export const scoreWord = (word) => {
  return 0;
};

// Wave 4
export const highestScoreFrom = (words) => {
  return { word: "", score: 0 };
};
