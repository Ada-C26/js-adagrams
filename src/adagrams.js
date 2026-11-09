export const drawLetters = () => {
  // Implement this method for wave 1
  const hand = [];
  const letterPool = {
    'A': 9, 'B': 2, 'C': 2, 'D': 4, 'E': 12, 'F': 2, 'G': 3, 'H': 2,
    'I': 9, 'J': 1, 'K': 1, 'L': 4, 'M': 2, 'N': 6, 'O': 8, 'P': 2,
    'Q': 1, 'R': 6, 'S': 4, 'T': 6, 'U': 4, 'V': 2, 'W': 2, 'X': 1,
    'Y': 2, 'Z': 1
  };

  const workingPool = [];

  for (const [letter, count] of Object.entries(letterPool)) {

    for (let i = 0; i < count; i++) {
      workingPool.push(letter);
    }
  }
  while (hand.length < 10) {
    let randomPosition = Math.floor(Math.random() * workingPool.length);

    let letter = workingPool[randomPosition];
    hand.push(letter);
    workingPool.splice(randomPosition, 1);
  }


  return hand;

};

export const usesAvailableLetters = (input, lettersInHand) => {
  // Implement this method for wave 2
  const frequencyMap = {};

  for (const letter of lettersInHand) {
    if (!frequencyMap[letter]) {
      frequencyMap[letter] = 0;
    }
    frequencyMap[letter] += 1;
  }

  const upperInput = input.toUpperCase();

  for (const letter of upperInput) {
    if (!frequencyMap[letter]) {
      return false;
    }
    frequencyMap[letter] -= 1;

  }
  return true;

};

export const scoreWord = (word) => {
  // Implement this method for wave 3


  let totalScore = 0
  const letterScores = {
    "A": 1, "E": 1, "I": 1, "O": 1, "U": 1, "L": 1, "N": 1, "R": 1, "S": 1, "T": 1,
    "D": 2, "G": 2,
    "B": 3, "C": 3, "M": 3, "P": 3,
    "F": 4, "H": 4, "V": 4, "W": 4, "Y": 4,
    "K": 5,
    "J": 8, "X": 8,
    "Q": 10, "Z": 10
  };
  const upperWord = word.toUpperCase();

  for (const letter of upperWord) {
    totalScore += letterScores[letter];
  }
  if (word.length >= 7 && word.length <= 10) {
    totalScore += 8;
  }

  return totalScore;
};





export const highestScoreFrom = (words) => {
  // Implement this method for wave 4
};
