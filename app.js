import { drawLetters } from './src/adagrams.js';

const drawButton = document.querySelector('#drawButton');
const letterBank = document.querySelector('#letterBank');

drawButton.addEventListener('click', () => {
  const letters = drawLetters();

  letterBank.textContent = letters.join(' ');
});
