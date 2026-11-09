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

const SCORE_CHART = {
  1 : ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2 : ['D', 'G'],
  3 : ['B', 'C', 'M', 'P'],
  4 : ['F', 'H', 'V', 'W', 'Y'],
  5 : ['K'],
  8 : ['J', 'X'],
  10 : ['Q', 'Z']
};

export const getLetterPool = () => {
  const pool = [];
  for (const letter in LETTER_POOL) {
    const frequency = LETTER_POOL[letter];
    let count = 0;
    while (count < frequency) {
      pool.push(letter);
      count++;
    }
  }
  return pool;
};

const drawRandomLetterFromPool = (pool) => {
  const randomIndex = Math.floor(Math.random() * pool.length);
  const letter = pool[randomIndex];
  pool[randomIndex] = pool[pool.length - 1]; // Replace the drawn letter with the last letter in the pool
  pool.pop(); // Remove the last letter from the pool
  return letter;
};

export const drawLetters = () => {
  // Implement this method for wave 1
  const pool = getLetterPool();
  const hand = [];
  for (let i = 0; i < 10; i++) {
    hand.push(drawRandomLetterFromPool(pool));
  }
  return hand;
};

export const usesAvailableLetters = (input, lettersInHand) => {
  const handFreq = {};
  for (const letter of lettersInHand) {
    if (handFreq[letter]) {
      handFreq[letter] += 1;
    }
    else {
      handFreq[letter] = 1;
    }
  }
  for (const letter of input.toUpperCase()) {
    if(!handFreq[letter]) {
      return false;
    }
    handFreq[letter] -= 1;
  }
  return true;
};

export const scoreWord = (word) => {
  let total = 0;
  for (const letter of word.toUpperCase()) {
    for (const [score, letters] of Object.entries(SCORE_CHART)) {
      if (letters.includes(letter)) {
        total += Number(score);
        break;
      }
    }
  }
  const LONG_WORD_BONUS = 8;
  if (word.length >= 7 && word.length <= 10) {
    total += LONG_WORD_BONUS;
  }
  return total;
};

const chooseBestWord = (currentWord, currentScore, bestWord, bestScore) => {
  if (bestWord === '' || currentScore > bestScore) {
    return { word: currentWord, score: currentScore };
  }

  if (currentScore === bestScore) {
    const currentLength = currentWord.length;
    const bestLength = bestWord.length;

    if (currentLength === 10 && bestLength !== 10) {
      return { word: currentWord, score: currentScore };
    }
    if (bestLength !== 10 && currentLength < bestLength) {
      return { word: currentWord, score: currentScore };
    }
  }

  return { word: bestWord, score: bestScore };
};


export const highestScoreFrom = (words) => {
  if (!words || words.length === 0) {
    return null;
  }

  let bestWord = '';
  let bestScore = 0;

  for (const word of words) {
    const score = scoreWord(word);
    const result = chooseBestWord(word, score, bestWord, bestScore);
    bestWord = result.word;
    bestScore = result.score;
  }
  return { word: bestWord, score: bestScore };
};

