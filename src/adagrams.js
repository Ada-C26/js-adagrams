const maxLetters = 10;
const extraPoints = 8;

export const drawLetters = () => {
  const letterDict = {
    'A': 9, 'B': 2, 'C': 2, 'D': 4,
    'E': 12, 'F': 2, 'G': 3, 'H': 2,
    'I': 9, 'J': 1, 'K': 1, 'L': 4,
    'M': 2, 'N': 6, 'O': 8, 'P': 2,
    'Q': 1, 'R': 6, 'S': 4, 'T': 6,
    'U': 4, 'V': 2, 'W': 2, 'X': 1,
    'Y': 2, 'Z': 1
  };
  const letterPool = [];

  for (const [letters, quantity] of Object.entries(letterDict)) {
    for (let i = 0; i < quantity; i++) {
      letterPool.push(letters);
    }
  }

  const playerLetters = [];

  while (playerLetters.length < maxLetters) {
    const randomNum = getRandomNum(0, (letterPool.length - 1));
    const letter = letterPool[randomNum];

    playerLetters.push(letter);

    letterPool.splice(randomNum, 1);
  }

  return playerLetters;
};


export const usesAvailableLetters = (input, lettersInHand) => {
  const copyBank = [];
  const capInput = input.toUpperCase();

  for (const letter of lettersInHand) {
    copyBank.push(letter);
  }

  for (const letter of capInput) {
    if (copyBank.includes(letter)) {
      const index = copyBank.indexOf(letter);
      copyBank.splice(index, 1);
    } else {
      return false;
    }
  }
  return true;
};


export const scoreWord = (word) => {
  const scoreDict = {
    'A': 1, 'B': 3, 'C': 3, 'D': 2,
    'E': 1, 'F': 4, 'G': 2, 'H': 4,
    'I': 1, 'J': 8, 'K': 5, 'L': 1,
    'M': 3, 'N': 1, 'O': 1, 'P': 3,
    'Q': 10, 'R': 1, 'S': 1, 'T': 1,
    'U': 1, 'V': 4, 'W': 4, 'X': 8,
    'Y': 4, 'Z': 10
  };
  const capWord = word.toUpperCase();

  let score = 0;

  for (const letter of capWord) {
    score += scoreDict[letter];
  }

  if (word.length >= 7) {
    score += 8;
  }

  return score;
};

export const highestScoreFrom = (words) => {
  // Implement this method for wave 4
};

const getRandomNum = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}