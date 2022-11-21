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
    { name: "blue", image: "./assests/images/blue.jpg"},
    { name: "burdundy", image: "./assests/images/burgundy.jpg"},
    { name: "darkred", image: "./assests/images/darkred.jpg"},
    { name: "green", image: "./assests/images/green.jpg"},
    { name: "grey", image: "./assests/images/grey.jpg"},
    { name: "lightoj", image: "./assests/images/lightoj.jpg"},
    { name: "purple", image: "./assests/images/purple.jpg"},
    { name: "springgreen", image: "./assests/images/springgreen.jpg"},
    { name: "tan", image: "./assests/images/tan.jpg"},
    { name: "teal", image: "./assests/images/teal.jpg"},
];


//Initial Time
let seconds = 0,
  minutes = 0;
//Initial Attempts and win count
let attemptsCount = 0,
  winCount = 0;
//Start game
startButton.addEventListener("click", () => {
  attemptsCount = 0;
  seconds = 0;
  minutes = 0;
  //controls and buttons visibility
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
* function is true and redirects to index.html page
*/
function getUserName() {

  let user = username.value;

  if (validateUserInput(user)) { 
      // redirects to index.html while storing username in url 
      window.location.replace(`index.html?user=${user}`);     
  }
}


// Prevents page refresh on Enter key for form text input and calls getUserName function
if (document.getElementById("user-input") != null) {
  document.getElementById("user-input").addEventListener("keydown", function(event) {
  if (event.key === 'Enter') {
          event.preventDefault();
          getUserName();
      }
  });
}
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
//For calculating Attempts
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
  console.log(cardValues);
  for (let i = 0; i < size * size; i++) { 
    
    gameContainer.innerHTML += `
     <div class="card-container" data-card-value="${cardValues[i].name}">
        <div class="card-before"><i class="fa-regular fa-hand-pointer"></i></div>
        <div class="card-after">
        <img src="${cardValues[i].image}" class="image"/></div>
     </div>
     `;
  }
  //Grid
  gameContainer.style.gridTemplateColumns = `repeat(${size},auto)`;
  //Cards
  cards = document.querySelectorAll(".card-container");
  cards.forEach((card) => {
    card.addEventListener("click", () => {
      //If selected card is not matched yet then only run (i.e already matched card when clicked would be ignored)
      if (!card.classList.contains("matched")) {
        //flip the cliked card
        card.classList.add("flipped");
        //if it is the firstcard (!firstCard since firstCard is initially false)
        if (!firstCard) {
          //so current card will become firstCard
          firstCard = card;
          //current cards value becomes firstCardValue
          firstCardValue = card.getAttribute("data-card-value");
        } else {
          //increment moves since user selected second card
          attemptsCounter();
          //secondCard and value
          secondCard = card;
          let secondCardValue = card.getAttribute("data-card-value");
          if (firstCardValue == secondCardValue) {
            //if both cards match add matched class so these cards would beignored next time
            firstCard.classList.add("matched");
            secondCard.classList.add("matched");
            //set firstCard to false since next card would be first now
            firstCard = false;
            //winCount increment as user found a correct match
            winCount += 1;
            //check if winCount ==half of cardValues
            if (winCount == Math.floor(cardValues.length / 2)) {
              result.innerHTML = `<h2>You Won</h2>
            <h4>Moves: ${attemptsCount}</h4>`;
              stopGame();
            }
          } else {
            //if the cards dont match
            //flip the cards back to normal
            let [tempFirst, tempSecond] = [firstCard, secondCard];
            firstCard = false;
            secondCard = false;
            let delay = setTimeout(() => {
              tempFirst.classList.remove("flipped");
              tempSecond.classList.remove("flipped");
            }, 900);
          }
        }
      }
    });
  });
};