
const poolLetters = {'A': 9, 'B': 2, 'C': 2, 'D': 4, 'E': 12, 'F': 2, 'G': 3, 'H': 2, 'I': 9, 
    'J': 1, 'K': 1, 'L': 4, 'M': 2, 'N': 6, 'O': 8, 'P': 2, 'Q': 1, 'R': 6,
    'S': 4, 'T': 6, 'U': 4, 'V': 2, 'W': 2, 'X': 1, 'Y': 2, 'Z': 1};

const letterScores = { A: 1, E: 1, I: 1, O: 1, U: 1,
L: 1, N: 1, R: 1, S: 1, T: 1, D: 2, G: 2, B: 3, C: 3, M: 3, P: 3, F: 4, H: 4, V: 4, W: 4, Y: 4,
K: 5, J: 8, X: 8,Q: 10, Z: 10 };

const HAND_SIZE = 10;

// function that draws 10 letters from the pool of letters and returns an array of those letters
export const drawLetters = () => {
  const lettersDrawnArray = [];
  const availableLetters = [];

  Object.entries(poolLetters).forEach(([letter, quantity]) => {
    for (let i = 0; i < quantity; i++) {
      availableLetters.push(letter);
    }
  });

  for (let i = 0; i < HAND_SIZE; i++) {
    const randomIndex = Math.floor(Math.random() * availableLetters.length);
    const drawnLetter = availableLetters.splice(randomIndex, 1)[0];

    lettersDrawnArray.push(drawnLetter);
  }
  return lettersDrawnArray;
};

// function that checks if the input word can be made from the letters in hand
export const usesAvailableLetters = (input, lettersInHand) => {

  const availableLetters = [...lettersInHand];

  for (const letter of input.toUpperCase()) {
    const letterIndex = availableLetters.indexOf(letter);
    if (letterIndex === -1) {
      return false;
    }
    availableLetters.splice(letterIndex, 1);

  }
  return true;

};
//calculates the score of a word based on letter values and length bonuses
export const scoreWord = (word) => {
  let totalScore = 0;

  for (const letter of word.toUpperCase()) {
    totalScore += letterScores[letter];
  }

  if (word.length >= 7 && word.length <= HAND_SIZE) {
    totalScore += 8;
  }

  return totalScore;
};

// Helper function to determine if a word should win in the case of a tie
//Returns true if the new word should replace the current highest-scoring word.
//Returns false if we should keep the current word

const checkTiedWords = (word, highestWord) => {
  if (word.length === HAND_SIZE && highestWord.length !== HAND_SIZE) {
    return true;
  } else if (highestWord.length !== HAND_SIZE && word.length < highestWord.length) {
    return true;
  }
  return false;
};

export const highestScoreFrom = (words) => {
  let highestWord = '';
  let highestScore = 0;

  // Iterate through the array of words to find the highest scoring word
  for (const word of words) {
    const currentScore = scoreWord(word);
    // If the current score is higher than the highest score, update the highest word and score
    if (currentScore > highestScore) {
      highestWord = word;
      highestScore = currentScore;
    // If the current score is equal to the highest score, check for tie-breaking conditions
    } else if (currentScore === highestScore) {
      if (checkTiedWords(word, highestWord)) {
        highestWord = word;
      }
    }
  }

  return {
    word: highestWord,
    score: highestScore
  };
};
