const LETTER_POOL = new Map([
  ['A', 9], ['B', 2], ['C', 2], ['D', 4], ['E', 12], ['F', 2],
  ['G', 3], ['H', 2], ['I', 9], ['J', 1], ['K', 1], ['L', 4],
  ['M', 2], ['N', 6], ['O', 8], ['P', 2], ['Q', 1], ['R', 6],
  ['S', 4], ['T', 6], ['U', 4], ['V', 2], ['W', 2], ['X', 1],
  ['Y', 2], ['Z', 1],
]);

const HAND_SIZE = 10;

const SCORES = new Map([
  ['A', 1], ['B', 3], ['C', 3], ['D', 2], ['E', 1], ['F', 4],
  ['G', 2], ['H', 4], ['I', 1], ['J', 8], ['K', 5], ['L', 1],
  ['M', 3], ['N', 1], ['O', 1], ['P', 3], ['Q', 10], ['R', 1],
  ['S', 1], ['T', 1], ['U', 1], ['V', 4], ['W', 4], ['X', 8],
  ['Y', 4], ['Z', 10],
]);

const LENGTH_BONUS_POINTS = 8;
const WORD_LENGTH_MIN_FOR_BONUS = 7;

export const drawLetters = () => {
  const pool = createWeightedPool();
  const hand = [];

  for(let i = 0; i < HAND_SIZE; i++) {
    let index = Math.floor(Math.random() * pool.length);
    hand.push(pool[index]);
    [pool[index], pool[pool.length - 1]] = [pool[pool.length - 1], pool[index]];
    pool.pop();
  }
  return hand;
};

export const usesAvailableLetters = (input, lettersInHand) => {

  let availableLetters = new Map();
  for(let letter of lettersInHand){
    availableLetters.set(letter, (availableLetters.getOrInsert(letter, 0)) + 1);
  }

  for(let letter of input){
    if(!availableLetters.get(letter.toUpperCase())){
      return false;
    }
    availableLetters.set(letter.toUpperCase(), availableLetters.get(letter.toUpperCase()) - 1);
  }
  return true;
};

export const scoreWord = (word) => {
  let score = 0;
  for (let letter of word){
    score += SCORES.get(letter.toUpperCase());
  }
  if (word.length >= WORD_LENGTH_MIN_FOR_BONUS){
    score += LENGTH_BONUS_POINTS;
  }
  return score;
};

export const highestScoreFrom = (words) => {
  const scores = words.map(scoreWord);
  const highestScore = Math.max(...scores);
  const tiedWords = words.filter((_, i) => scores[i] === highestScore);

  return {word: breakTie(tiedWords), score: highestScore};
};

const breakTie = (tiedWords) => {
  const tenLetterWord = tiedWords.find((word) => word.length === HAND_SIZE);
  if(tenLetterWord) return tenLetterWord;

  return tiedWords.reduce((shortest, word) =>
    word.length < shortest.length ? word : shortest
  );
};

const createWeightedPool = () => {
  return [...LETTER_POOL].flatMap(([letter, count]) => Array(count).fill(letter));
};