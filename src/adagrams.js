/**
 * This helper function was created to help dynamically
 * calculate the number of letters from LETTER_POOL
 *
 * It calculates the total sum the numeric values of an object
 */
const sumValuesOfObject = (obj) => {
  let totalSum = 0;

  for (const key in obj) {
    totalSum += obj[key];
  }

  return totalSum;
};

// Wave 1
export const drawLetters = () => {
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
  const NUM_TILES_ALLOWED_IN_HAND = 10;

  const hand = [];
  let numLettersInPool = sumValuesOfObject(LETTER_POOL);

  while (hand.length < NUM_TILES_ALLOWED_IN_HAND) {
    let randomNum = Math.floor(Math.random() * numLettersInPool) + 1;
    let temp = 0;

    for(const letter in LETTER_POOL) {
      temp += LETTER_POOL[letter];

      if(temp >= randomNum) {
        hand.push(letter);
        LETTER_POOL[letter] -= 1;
        numLettersInPool -= 1;
        break;
      }
    }
  }

  return hand;
};


// Wave 2
export const usesAvailableLetters = (input, lettersInHand) => {

  const hand = {};
  for (const letter of lettersInHand) {
    hand[letter] = (hand[letter] || 0) + 1;
  }

  for (const letter of input.toUpperCase()) {
    if (!(letter in hand) || hand[letter] === 0) {
      return false;
    }
    hand[letter] -= 1;
  }

  return true;
};


// Wave 3
export const scoreWord = (word) => {

  const SCORE_DISTRIBUTION = {
    'A': 1, 'E': 1, 'I': 1, 'O': 1, 'U': 1, 'L': 1,
    'N': 1, 'R': 1, 'S': 1, 'T': 1, 'D': 2,
    'G': 2, 'B': 3, 'C': 3, 'M': 3, 'P': 3,
    'F': 4, 'H': 4, 'V': 4, 'W': 4, 'Y': 4,
    'K': 5, 'J': 8, 'X': 8, 'Q': 10, 'Z': 10
  };
  const BONUS_POINTS_FOR_LENGTH = 8;

  let score = 0;

  for (const letter of word.toUpperCase()) {
    if (letter in SCORE_DISTRIBUTION) {
      score += SCORE_DISTRIBUTION[letter];
    }
  }

  if (6 < word.length && word.length < 11) {
    score += BONUS_POINTS_FOR_LENGTH;
  }

  return score;
};

export const highestScoreFrom = (words) => {
  // Implement this method for wave 4
};
