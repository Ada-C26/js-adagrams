const LETTER_POOL = {
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

const LETTER_VALUE = {
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
  Z: 10
};

export const drawLetters = () => {
  const letterpool = [];

  for (let char in LETTER_POOL) {
    for (let i = 0; i < LETTER_POOL[char]; i++) {
      letterpool.push(char)
    }
  }

  const hand = []
  
  while (hand.length < 10) {
    const randomindex = Math.floor(Math.random() * letterpool.length);
    const randomletter = letterpool.splice(randomindex, 1)[0];
    hand.push(randomletter);
  }

  return hand;
};

export const usesAvailableLetters = (input, lettersInHand) => {
  for (const char of input) {
    if (lettersInHand.includes(char.toUpperCase())) {
      const rmindex = lettersInHand.indexOf(char.toUpperCase());
      lettersInHand.splice(rmindex, 1);
    } else {
      return false;
    }
  }
  return true;
};

export const scoreWord = (word) => {
  let value = 0;
  for (const char of word) {
    value += LETTER_VALUE[char.toUpperCase()];
  } if (word.length > 6 && word.length < 11) {
    value += 8;
  }
  return value;
};

export const highestScoreFrom = (words) => {
  const words_value = {};
  for (const word of words) {
    let value = 0;
    for (const char of word) {
      value += LETTER_VALUE[char.toUpperCase()];
    } if (word.length > 6 && word.length < 11) {
      value += 8;
    } words_value[word] = value;
  } 

  let highest = Object.fromEntries([Object.entries(words_value)[0]]);
  for (const key in words_value) {
    if (words_value[key] > Object.values(highest)[0]) {
      highest = {[key]: words_value[key]};
    } else if (words_value[key] == Object.values(highest)[0]) {
      if (Object.keys(highest)[0].length >= 10) {
        continue;
      } if (key.length >= 10) {
        highest = {[key]: words_value[key]};
        continue;
      } if (key.length < Object.keys(highest)[0].length)
        highest = {[key]: words_value[key]};
    } 
  }  
  const [word, score] = Object.entries(highest)[0];
  const result = {score: score, word: word};
  return result
};

highestScoreFrom(['WWW','MMMM']);