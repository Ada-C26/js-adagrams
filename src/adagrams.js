const letterPool ={
  'A': 9,'B': 2, 'C': 2, 'D': 4, 'E': 12,
  'F': 2, 'G': 3, 'H': 2, 'I': 9, 'J': 1,
  'K': 1, 'L': 4, 'M': 2, 'N': 6, 'O': 8,
  'P': 2, 'Q': 1, 'R': 6, 'S': 4, 'T': 6,
  'U': 4, 'V': 2, 'W': 2, 'X': 1, 'Y': 2,
  'Z': 1
};

const scoreDict = {
  'A': 1, 'E': 1, 'I': 1, 'O': 1, 'U': 1,
  'L': 1, 'N': 1, 'R': 1, 'S': 1, 'T': 1,
  'D': 2, 'G': 2,'B': 3, 'C': 3, 'M': 3,
  'P': 3,'F': 4, 'H': 4, 'V': 4, 'W': 4,
  'Y': 4,'K': 5,'J': 8, 'X': 8,'Q': 10,
  'Z': 10
};

const buildLetterPool = () => {
  const letters = [];
  for (const [letter, count] of Object.entries(letterPool)) {
    for (let i = 0; i < count; i++) {
      letters.push(letter);
    }
  }
  return letters;
};

const countLetters = (letters) => {
  const count = {};
  for (const letter of letters) {
    count[letter] = (count[letter] || 0) + 1 ;
  }
  return count;
};

export const drawLetters = () => {

  const letters = buildLetterPool();
  const letterHand = [];
  for (let i = 0; i < 10; i++) {
    const randomIndex = Math.floor (Math.random() * letters.length);
    letterHand.push(letters[randomIndex]);
    [letters[randomIndex],letters[letters.length - 1]] = [letters[letters.length - 1], letters[randomIndex]];
    letters.pop();
  }
  return letterHand;
};

export const usesAvailableLetters = (input, lettersInHand) => {

  const countDict = countLetters(lettersInHand);
  for (const char of input.toUpperCase() ) {
    if (!countDict[char]) {
      return false;
    }
    countDict[char]--;
  }
  return true;
};

export const scoreWord = (word) => {

  let totalScore = 0;
  if (word.length >= 7 && word.length <= 10){
    totalScore += 8;
  }
  for (const letter of word.toUpperCase()){
    const score = scoreDict[letter] ?? 0;
    totalScore += score;
  }
  return totalScore;
};

export const highestScoreFrom = (words) => {

  let maxScore = -1 ;
  let maxWord = '';
  for (const word of words){
    const score = scoreWord(word);

    if (score > maxScore){
      maxScore = score;
      maxWord = word;
    } else if (score === maxScore){
      if (word.length === 10 && maxWord.length !== 10){
        maxWord = word;
      } else if(word.length !== 10 && maxWord.length !== 10){
        if (word.length < maxWord.length){
          maxWord = word;
        }
      }
    }
  }
  return ({
    word :maxWord,
    score : maxScore
  });
};
