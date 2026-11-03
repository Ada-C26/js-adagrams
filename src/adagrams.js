// Implement this method for wave 1
export const drawLetters = () => {
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
    Z: 1,
  };

  const availableLetters = [];

  // Build the letter pool based on frequency
  for (const [letter, count] of Object.entries(letterPool)) {
    for (let i = 0; i < count; i++) {
      availableLetters.push(letter);
    }
  }

  const drawnLetters = [];

  // Randomly draw 10 letters without replacement
  for (let i = 0; i < 10; i++) {
    const randomIndex = Math.floor(Math.random() * availableLetters.length);

    const selectedLetter = availableLetters.splice(randomIndex, 1)[0];

    drawnLetters.push(selectedLetter);
  }

  return drawnLetters;
};

// Implement this method for wave 2
export const usesAvailableLetters = (input, lettersInHand) => {
  const availableLetters = [...lettersInHand];

  for (const letter of input) {
    const index = availableLetters.indexOf(letter);

    if (index === -1) {
      return false;
    }

    availableLetters.splice(index, 1);
  }

  return true;
};

// Implement this method for wave 3
export const scoreWord = (word) => {
  const letterScores = {
    A: 1,
    E: 1,
    I: 1,
    O: 1,
    U: 1,
    L: 1,
    N: 1,
    R: 1,
    S: 1,
    T: 1,
    D: 2,
    G: 2,
    B: 3,
    C: 3,
    M: 3,
    P: 3,
    F: 4,
    H: 4,
    V: 4,
    W: 4,
    Y: 4,
    K: 5,
    J: 8,
    X: 8,
    Q: 10,
    Z: 10,
  };

  let score = 0;
  const upperWord = word.toUpperCase();

  for (const letter of upperWord) {
    score += letterScores[letter];
  }

  if (upperWord.length >= 7 && upperWord.length <= 10) {
    score += 8;
  }

  return score;
};

// Implement this method for wave 4
export const highestScoreFrom = (words) => {
  if (words.length === 0) {
    return { word: '', score: 0 };
  }

  let bestWord = words[0];
  let bestScore = scoreWord(bestWord);

  for (const word of words) {
    const currentScore = scoreWord(word);

    if (currentScore > bestScore) {
      bestWord = word;
      bestScore = currentScore;
    } else if (currentScore === bestScore) {
      if (word.length === 10 && bestWord.length !== 10) {
        bestWord = word;
      } else if (
        word.length !== 10 &&
        bestWord.length !== 10 &&
        word.length < bestWord.length
      ) {
        bestWord = word;
      }
    }
  }

  return {
    word: bestWord,
    score: bestScore,
  };
};
