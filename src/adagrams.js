//WAVE 1 - Build a hand of 10 random letters from the letter pool.

//unchangable letter pool
const LETTER_POOL = {
  A: 9, B: 2, C: 2, D: 4, E: 12, F: 2, G: 3, H: 2, I: 9,
  J: 1, K: 1, L: 4, M: 2, N: 6, O: 8, P: 2, Q: 1, R: 6,
  S: 4, T: 6, U: 4, V: 2, W: 2, X: 1, Y: 2, Z: 1,
};

//so the reader knows what 10 means
const HAND_SIZE = 10;

//helper function to convert LETTER_POOL into a bag of letters
const buildLetterBag = () => {
  const letterBag = [];
  //loop through LETTER_POOL and create an array. Assign letter & count const
  for (const [letter, count] of Object.entries(LETTER_POOL)) {
    //loo pthrough each letter count num of times, add to bag, increment.
    for (let i = 0; i < count; i++) {
      //add to bag.
      letterBag.push(letter);
    }
  }
  //returns the 98 individual letter strings
  return letterBag;
};

//pick 10 letters
export const drawLetters = () => {
  //fresh bag
  const letterBag = buildLetterBag();
  //array for players 10 letters
  const hand = [];
  //(Python vs. JavaScript for i in range(count): -> for (let i = 0; i < count; i++);
  for (let i = 0; i < HAND_SIZE; i++) {
    //randomIndex in bag made by (random decimal * 98) then round down
    const randomIndex = Math.floor(Math.random() * letterBag.length);
    //grab a letter by using .splice(randomIndex, only grab 1);
    const [letter] = letterBag.splice(randomIndex, 1);
    //.push like .append, adds it to the hand.
    hand.push(letter);
  }
  //returns an array of 10 chars
  return hand;
};


//Wave 2 check whether a word can be made from the letters in a hand

export const usesAvailableLetters = (input, lettersInHand) => {

  //object as counter
  const letterCounts = {};

  //loop over each item in array to make counter object
  for (const letter of lettersInHand) {
    //count for this letter is in counter or 0 + increment 1
    letterCounts[letter] = (letterCounts[letter] || 0) + 1;
  }

  //loop through the letters of the players input
  for (const letter of input) {
    //if input letter is not in our counter
    if (!letterCounts[letter]) {
      //stop, don't check the rest
      return false;
    }
    //decrement the letter that got used from the counter
    letterCounts[letter] -= 1;
  }
  //otherwise the word works
  return true;
};






export const scoreWord = (word) => {
  // Implement this method for wave 3
};

export const highestScoreFrom = (words) => {
  // Implement this method for wave 4
};
