import {
  drawLetters,
  usesAvailableLetters,
  scoreWord
} from './src/adagrams.js';

const drawButton = document.querySelector('#drawButton');
const letterBank = document.querySelector('#letterBank');
const wordInput = document.querySelector('#wordInput');
const submitButton = document.querySelector('#submitButton');
const result = document.querySelector('#result');
const score = document.querySelector('#score');

let letters = [];

drawButton.addEventListener('click', () => {
  letters = drawLetters();
  letterBank.textContent = letters.join(' ');

  result.textContent = '';
  score.textContent = '';
});

submitButton.addEventListener('click', () => {
  const word = wordInput.value;

  if (word.trim() === '') {
    result.textContent = 'Please enter a word.';
    score.textContent = '';
    return;
  }

  if (usesAvailableLetters(word, letters)) {
    result.textContent = 'Valid word!';
    score.textContent = `Score: ${scoreWord(word)}`;
  } else {
    result.textContent = 'You cannot make that word with your letters.';
    score.textContent = '';
  }
});