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
  // Implement this method for wave 2
};

export const scoreWord = (word) => {
  // Implement this method for wave 3
};

export const highestScoreFrom = (words) => {
  // Implement this method for wave 4
};

const getRandomNum = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}