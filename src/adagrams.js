export const drawLetters = () => {
  // create pool of letters
  const letterPool = {
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

  // create an array of letters based on the letter pool
  const availableLetters = [];
  for (const letter in letterPool) {
    for (let i = 0; i < letterPool[letter]; i++) {
      availableLetters.push(letter);
    }
  }

  // select 10 letters from the available letters
  const hand = [];
  for (let i = 0; i < 10; i++) {
    const randomIndex = Math.floor(Math.random() * availableLetters.length);
    const randomLetter = availableLetters[randomIndex];
    hand.push(randomLetter);
    availableLetters.splice(randomIndex, 1);
  }

  return hand;
};

export const usesAvailableLetters = (input, lettersInHand) => {
  // create a copy of the letters in hand to track usage
  const lettersCopy = [...lettersInHand];
  
  // check if each letter in the input is available in the letters in hand
  for (const letter of input) {
    const letterIndex = lettersCopy.indexOf(letter);
    if (letterIndex === -1) {
      return false; // when letter not found in hand
    }
    lettersCopy.splice(letterIndex, 1); // remove the used letter from the copy
  }
  return true;
};

export const scoreWord = (word) => {
  // create the score chart for each letter
  const letterScores = {
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
    Z: 10
  };

  let totalScore = 0;

  // calculate the score for each letter in the word
  for (const letter of word) {
    totalScore += letterScores[letter];
  }

  // add bonus points for words with length between 7 and 10
  if (word.length >= 7 && word.length <= 10) {
    totalScore += 8;
  }
  return totalScore;
};

export const highestScoreFrom = (words) => {
  // Implement this method for wave 4
};
