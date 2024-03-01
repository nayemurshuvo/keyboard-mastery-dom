// Enter key pressed count
let count = 0;
// landing page & score page bug fixing(before start playing kew was listenging)
let isGamePlayOn = false;

// adding audio
const audio = new Audio();

// Artboard BG dynamically change
const artBoard = document.getElementById("artBoard");
// modal
const modalBox = document.getElementById("modal-box");

// callback function when pressed a key (step 4)
function handleKeyboardKeyUpEvent(event) {
  if (isGamePlayOn == false) return;
  const playerPressed = event.key;
  // console.log("player pressed", playerPressed);

  /** 
  // Start the game if pressed Enter
  if (playerPressed === "Enter") {
    play();
    setTextElementValueById("current-life", 5 + 1);
    count++;
    if (count > 1) {
      gameOver();
    }
  }
*/

  // stop the game if pressed 'Esc'
  if (playerPressed === "Escape") {
    gameOver();
  }

  // key player is expected to press
  const currentAlphabetElement = document.getElementById("random-alphabet");
  const currentAlphabet = currentAlphabetElement.innerText;
  const expectedAlphabet = currentAlphabet.toLowerCase();

  // check right or wrong key pressed
  if (playerPressed === expectedAlphabet) {
    // console.log("you got a point!");

    // Add correct audio source
    audio.src = "../audio/correct.mp3";
    audio.play();

    const currentScore = getTextElementValueById("current-score");
    const updatedScore = currentScore + 1;
    setTextElementValueById("current-score", updatedScore);

    // start a new round
    removeBackgroundColorById(expectedAlphabet);
    continueGame();
  } else {
    // Add correct audio source
    audio.src = "../audio/wrong.mp3";
    audio.play();

    const currentLife = getTextElementValueById("current-life");
    const updatedLife = currentLife - 1;

    // percentage wise dynamic color
    const updatedLifePercentage = (updatedLife / 5) * 100;
    artBoard.style.background = `linear-gradient(#FFFFFFB3 ${updatedLifePercentage}%,red)`;

    setTextElementValueById("current-life", updatedLife);

    if (updatedLife === 0) {
      gameOver();
    }
  }
}

// keyboard event (step 3)
document.addEventListener("keyup", handleKeyboardKeyUpEvent);

// Start or Continue the game (step 2)
function continueGame() {
  // step -1: generate a random alphabet
  const alphabet = getARandomAlphabet();

  // set randomly generated alphabet to the screen
  const currentAlphabetElement = document.getElementById("random-alphabet");
  currentAlphabetElement.innerText = alphabet;

  // set background color
  setBackgroundColorById(alphabet);
}

// Enter the game (step 1)
function play() {
  // hide everything show only the playground
  hideElementById("home-screen");
  hideElementById("final-score"); // in case of play again
  showElementById("play-ground");

  // reset score and life
  setTextElementValueById("current-life", 5);
  setTextElementValueById("current-score", 0);

  isGamePlayOn = true;
  continueGame();
}

function gameOver() {
  hideElementById("play-ground");
  showElementById("final-score");
  // update final score
  // 1.get the final score
  const lastScore = getTextElementValueById("current-score");
  setTextElementValueById("last-score", lastScore);

  // clear the last selected alphabet highlight
  const currentAlphabet = getElementTextById("random-alphabet");
  // console.log(currentAlphabet);
  removeBackgroundColorById(currentAlphabet);
  isGamePlayOn = false;
  artBoard.style.background = "linear-gradient(#FFFFFFB3 100%,red)";
}

function modelOpen(event) {
  if (event.clientY < 10) {
    modalBox.style.display = "flex";
  }
}

function modalClose() {
  modalBox.style.display = "none";
}

document.body.onmousemove = modelOpen;
