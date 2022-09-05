const wordContainer = document.getElementById("wordContainer");
const startButton = document.getElementById("startButton");
const usedLettersElement = document.getElementById("usedLetters");

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
ctx.canvas.width = 0;
ctx.canvas.height = 0;

const bodyParts = [
  [4, 2, 1, 1],
  [4, 3, 1, 2],
  [3, 5, 1, 1],
  [5, 5, 1, 1],
  [3, 3, 1, 1],
  [5, 3, 1, 1],
];

let selectedWord;
let usedLetters;
let mistakes;
let hits;

//agregar letra
const addLetter = (letter) => {
  const letterElement = document.createElement("span");
  letterElement.innerHTML = letter.toUpperCase();
  usedLettersElement.appendChild(letterElement);
};

//fin del juego
const endGame = () => {
  document.removeEventListener("keydown", letterEvent);
  startButton.style.display = "block";
};

//dibujar al ahorcado
const drawHangMan = () => {
  ctx.canvas.width = 120; //ancho
  ctx.canvas.height = 160; //alto
  ctx.scale(20, 20); //escalado de los pixeles
  ctx.clearRect(0, 0, canvas.width, canvas.height); //borrar
  ctx.fillStyle = "#d95d39"; //pintar
  ctx.fillRect(0, 7, 4, 1);
  ctx.fillRect(1, 0, 1, 8);
  ctx.fillRect(2, 0, 3, 1);
  ctx.fillRect(4, 1, 1, 1);
};

//seleccionar palabras aleatorias
const selectRandomWord = () => {
  let word = words[Math.floor(Math.random() * words.length)].toUpperCase();
  selectedWord = word.split("");
};

//pintar la palabra
const drawWord = () => {
  selectedWord.forEach((letter) => {
    const letterElement = document.createElement("span");
    letterElement.innerHTML = letter.toUpperCase();
    letterElement.classList.add("letter");
    letterElement.classList.add("hidden");
    wordContainer.appendChild(letterElement);
  });
};

//funcion al acertar las letras
const correctLetter = (letter) => {
  const { children } = wordContainer;
  for (let i = 0; i < children.length; i++) {
    if (children[i].innerHTML === letter) {
      children[i].classList.toggle("hidden");
      hits++;
    }
  }
  if (hits === selectedWord.length) endGame();
};

//agregar parte del cuerpo
const addBodyPart = (bodyPart) => {
  ctx.fillStyle = "#fff";
  ctx.fillRect(...bodyPart);
};

//funcion al fallar la letra
const wrongLetter = () => {
  addBodyPart(bodyParts[mistakes]);
  mistakes++;
  if (mistakes === bodyParts.length) endGame();
};

const letterInput = (letter) => {
  if (selectedWord.includes(letter)) {
    correctLetter(letter);
  } else {
    wrongLetter();
  }
  addLetter(letter);
  usedLetters.push(letter);
};

//evento al precionar letra
const letterEvent = (event) => {
  let newLetter = event.key.toUpperCase();
  if (newLetter.match(/^[a-zñ]$/i) && !usedLetters.includes(newLetter)) {
    letterInput(newLetter);
  }
};

//settear las variables del juego
const startGame = () => {
  usedLetters = [];
  mistakes = 0;
  hits = 0;
  wordContainer.innerHTML = "";
  usedLettersElement.innerHTML = "";
  startButton.style.display = "none";
  drawHangMan();
  selectRandomWord();
  drawWord();
  document.addEventListener("keydown", letterEvent);
};

startButton.addEventListener("click", startGame);
