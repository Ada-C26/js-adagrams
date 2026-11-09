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
      let randomPosition = Math.floor(Math.random()* workingPool.length);

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
};

export const highestScoreFrom = (words) => {
  // Implement this method for wave 4
};
