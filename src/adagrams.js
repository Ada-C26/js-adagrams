export const drawLetters = () => {
  // Implement this method for wave 1
  const letterPool ={
    'A': 9,'B': 2, 'C': 2, 'D': 4, 'E': 12,
    'F': 2, 'G': 3, 'H': 2, 'I': 9, 'J': 1,
    'K': 1, 'L': 4, 'M': 2, 'N': 6, 'O': 8,
    'P': 2, 'Q': 1, 'R': 6, 'S': 4, 'T': 6,
    'U': 4, 'V': 2, 'W': 2, 'X': 1, 'Y': 2,
    'Z': 1
  };
  const letters = [];
  for (const letter in letterPool){
    for (let i=0 ; i < letterPool[letter]; i++){
      letters.push(letter);
    }
  }
  let n = 0;
  const letterHand = [];
  while (n < 10) {
    const randomIndex = Math.floor (Math.random() * letters.length);
    const selected = letters.splice(randomIndex,1)[0];
    letterHand.push(selected);
    n += 1;
  }
  return letterHand;
};

export const usesAvailableLetters = (input, lettersInHand) => {
  // Implement this method for wave 2
  const word = input.toUpperCase();
  const countDict = {}

  for (const char of word){
    if (char in countDict){
      countDict[char]++;
    } else {
      countDict[char] = 1 ;
    }
  }

  for (const letter of lettersInHand) {
    if (letter in countDict) {
      countDict[letter]--;
    }
  }

  for(const count of Object.values(countDict)){
    if (count !== 0){
      return false;
    }
  }
  return true;
};

export const scoreWord = (word) => {
  // Implement this method for wave 3
  const scoreDict = {
    'A': 1, 'E': 1, 'I': 1, 'O': 1, 'U': 1,
    'L': 1, 'N': 1, 'R': 1, 'S': 1, 'T': 1,
    'D': 2, 'G': 2,
    'B': 3, 'C': 3, 'M': 3, 'P': 3,
    'F': 4, 'H': 4, 'V': 4, 'W': 4, 'Y': 4,
    'K': 5,
    'J': 8, 'X': 8,
    'Q': 10, 'Z': 10
  };
  word = word.toUpperCase();

  let totalScore = 0;
  if (word.length === 0){
    return totalScore;
  }
  if (word.length >= 7 && word.length <= 10){
    totalScore += 8;
  }
  for (const letter of word){
    const score = scoreDict[letter];
    totalScore += score;
  }
  return totalScore;
};

export const highestScoreFrom = (words) => {
  // Implement this method for wave 4
};
console.log(drawLetters());