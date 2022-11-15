const moves = document.getElementById("moves-count");
const timeValue = document.getElementById("timer");
const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const gameContainer= document.getElementById("game-area");
const result = document.getElementById("result");
const controls = document.querySelector("conrols-area");

let cards;
let interval;
let firstCard = false;
let secondCard = false;

const items = [
    { name: "blue", image: "blue.png"},
    { name: "burdundy", image: "burgundy.png"},
    { name: "darkred", image: "darkred.png"},
    { name: "green", image: "green.png"},
    { name: "grey", image: "grey.png"},
    { name: "lightoj", image: "lightoj.png"},
    { name: "purple", image: "purple.png"},
    { name: "springgreen", image: "springgreen.png"},
    { name: "tan", image: "tan.png"},
    { name: "teal", image: "teal.png"},
];

let seconds = 0;
    minutes = 0;

let moveCount = 0;
    winCount = 0;  

//For timer
const timeGenerator = () => {
    seconds += 1;
    //minutes logic
    if (seconds >= 60) {
      minutes += 1;
      seconds = 0;
    }
    //format time before displaying
    let secondsValue = seconds < 10 ? `0${seconds}` : seconds;
    let minutesValue = minutes < 10 ? `0${minutes}` : minutes;
    timeValue.innerHTML = `<span>Time:</span>${minutesValue}:${secondsValue}`;
  };
  //For calculating moves
const movesCounter = () => {
    movesCount += 1;
    moves.innerHTML = `<span>Moves:</span>${movesCount}`;
  };
  //Pick random objects from the items array
const generateRandom = (size = 4) => {
    //temporary array
    let tempArray = [...items];
    //initializes cardValues array
    let cardValues = [];
    //size should be double (4*4 matrix)/2 since pairs of objects would exist
    size = (size * size) / 2;
    //Random object selection
    for (let i = 0; i < size; i++) {
      const randomIndex = Math.floor(Math.random() * tempArray.length);
      cardValues.push(tempArray[randomIndex]);
      //once selected remove the object from temp array
      tempArray.splice(randomIndex, 1);
    }
    return cardValues;
  };
const matrixGenerator = (cardValues, size = 4) => {
    gameContainer.innerHTML = "";
    cardValues = [...cardValues, ...cardValues];
    // shuffle
    cardValues.sort(() => Math.random() - 0.5);
    for (let i = 0; i < size * size; i++) {
      
      gameContainer.innerHTML += `
       <div class="card-container" data-card-value="${cardValues[i].name}">
          <div class="card-before">?</div>
          <div class="card-after">
          <img src="${cardValues[i].image}" class="image"/></div>
       </div>
       `;
    } 