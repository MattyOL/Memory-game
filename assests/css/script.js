const attempts = document.getElementById("attempts-count");
const timeValue = document.getElementById("time");
const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const gameContainer = document.querySelector(".game-container");
const result = document.getElementById("result");
const controls = document.querySelector(".controls-area");
const username = document.getElementById('user-input');
const feedback = document.getElementById('feedback');

let cards;
let interval;
let firstCard = false;
let secondCard = false;

const items = [
    { name: "slide1", image: "slide1.png"},
    { name: "burdundy", imag: "burgundy.jpg"},
    { name: "darkred", image: "darkred.jpg"},
    { name: "green", image: "green.jpg"},
    { name: "grey", image: "grey.jpg"},
    { name: "lightoj", image: "lightoj.jpg"},
    { name: "purple", images: "purple.jpg"},
    { name: "springgreen", image: "springgreen.jpg"},
    { name: "tan", image: "tan.jpg"},
    { name: "teal", image: "teal.jpg"},
];


//Initial Time
let seconds = 0,
  minutes = 0;
//Initial moves and win count
let attemptsCount = 0,
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
const attemptsCounter = () => {
  attemptsCount += 1;
  attempts.innerHTML = `<span>Attempts:</span>${attemptsCount}`;
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
  //simple shuffle
  cardValues.sort(() => Math.random() - 0.5);
  for (let i = 0; i < size * size; i++) { console.log(cardValues)
    
    gameContainer.innerHTML += `
     <div class="card-container" data-card-value="${cardValues[i].name}">
        <div class="card-before"><i class="fa-regular fa-hand-pointer"></i></div>
        <div class="card-after">
        <img src="${cardValues[i].image}" class="image"/></div>
     </div>
     `;
  }
  
//Start game
startButton.addEventListener("click", () => {
  attemptsCount = 0;
  seconds = 0;
  minutes = 0;
  //controls amd buttons visibility
  controls.classList.add("hide");
  stopButton.classList.remove("hide");
  startButton.classList.add("hide");
  //Start timer
  interval = setInterval(timeGenerator, 1000);
  //initial moves
  attempts.innerHTML = `<span>Attempts:</span> ${attemptsCount}`;
  initializer();
});
//Stop game
stopButton.addEventListener(
  "click",
  (stopGame = () => {
    controls.classList.remove("hide");
    stopButton.classList.add("hide");
    startButton.classList.remove("hide");
    clearInterval(interval);
  })
);
//Initialize values and func calls
const initializer = () => {
  result.innerText = "";
  winCount = 0;
  let cardValues = generateRandom();
  console.log(cardValues);
  matrixGenerator(cardValues);
};

function validateUserInput(user) {
    
  let errorMsg = '';

  // if no user input is inserted
  if (user == '') {

      errorMsg = "Please enter a Username";
  
  // if user input is less than 3 characters 
  } else if (user.length <= Number(2)) {

      errorMsg = "Username must have 3 or more characters";
  } 

  // if errorMsg is not empty
  if (errorMsg != '') {
      // display errorMsg in feedback div on home page
      feedback.innerHTML = errorMsg;
      // adds functionality for screen readers to read error message 
      // when it is displayed on screen
      username.setAttribute('data-has-error', 'true');
      
      return false;
  }
  
  return true;
}

/**
* Gets and stores user input if validateUserInput 
* function is true and redirects to quiz.html page
*/
function getUserName() {

  let user = username.value;

  if (validateUserInput(user)) { 
      // redirects to quiz.html while storing username in url 
      window.location.replace(`quiz.html?user=${user}`);     
  }
}