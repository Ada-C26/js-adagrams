const LETTER_POOL = {
  'A': 9,
  'B': 2,
  'C': 2,
  'D': 4,
  'E': 12,
  'F': 2,
  'G': 3,
  'H': 2,
  'I': 9,
  'J': 1,
  'K': 1,
  'L': 4,
  'M': 2,
  'N': 6,
  'O': 8,
  'P': 2,
  'Q': 1,
  'R': 6,
  'S': 4,
  'T': 6,
  'U': 4,
  'V': 2,
  'W': 2,
  'X': 1,
  'Y': 2,
  'Z': 1
};

export const drawLetters = () => {

  const hand = [];
  const pool = { ...LETTER_POOL };

  let total = totalNumberOfLetters(pool);

  while (hand.length < 10 && total > 0){
    const n = Math.floor(Math.random() * total) + 1;
    let count = 0;

    for (const [letter, frequency] of Object.entries(pool)) {
      count += frequency;

      if (n <= count){
        hand.push(letter);
        pool[letter] -= 1;
        total -= 1;
        break;
      }
    }
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


export const totalNumberOfLetters = (pool) => {
  let total = 0;
  for (const frequency of Object.values(pool)) {
    total += frequency;
  }

  return total;

};