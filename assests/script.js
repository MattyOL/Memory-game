const attempts = document.getElementById("attempts-count");
const timeValue = document.getElementById("time");
const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const gameContainer = document.querySelector(".game-container");
const resultElement = document.getElementById("result");
const controls = document.querySelector(".controls-area");
const homeArea = document.querySelector(".home");
const retryQuestionContainer = document.querySelector(
  ".retryQuestionContainer"
);
const username = document.getElementById("user-input");
const feedback = document.getElementById("feedback");
const submitBtn = document.getElementById("submit");
const resultArea = document.getElementById("result-area");
// const highScoreElement = document.getElementById('cc');

let cards;
let interval;
let firstCard = false;
let secondCard = false;
let indexOfLastEntry = 0;

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


//Initialize values and func calls
const initializer = () => {
  resultElement.innerText = "";
  winCount = 0;
  let cardValues = generateRandom();
  console.log(cardValues);
  matrixGenerator(cardValues);
};

function validateUserInput(user) {
  let errorMsg = "";

  // if no user input is inserted
  if (user == "") {
    errorMsg = "Please enter a Username";
  }
  // if user input is less than 3 characters
  else if (user.length <= Number(2)) {
    errorMsg = "Username must have 3 or more characters";
  }
  //
  else if (checkForSpecialCharacters(username.value)) {
    errorMsg = "Username cannot contain special characters";
  } else if (checkForNumbers(username.value)) {
    errorMsg = "Username cannot contain numbers";
  }

  // if errorMsg is not empty
  if (errorMsg != "") {
    // display errorMsg in feedback div on home page
    feedback.innerHTML = errorMsg;
    // adds functionality for screen readers to read error message
    // when it is displayed on screen
    username.setAttribute("data-has-error", "true");

    return false;
  }

  return true;
}

function checkForSpecialCharacters(username) {
  const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~£]/;

  if (specialChars.test(username)) {
    return true;
  }
  return false;
}

function checkForNumbers(username) {
  return /\d/.test(username);
}

function startGame() {
  if (validateUserInput(username.value)) {
    changePage(2); // Go to 2nd pagechangePage
    //window.location.replace(`index.html?user=${user}`);
  }
}

// Prevents page refresh on Enter key for form text input and calls getUserName function
if (document.getElementById("user-input") != null) {
  document
    .getElementById("user-input")
    .addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        event.preventDefault();
        startGame();
      }
    });
}
//For timer
let secondsValue = 0;
let minutesValue = 0;

const timeGenerator = () => {
  seconds += 1;
  //minutes logic
  if (seconds >= 60) {
    minutes += 1;
    seconds = 0;
  }
  //format time before displaying
  secondsValue = seconds < 10 ? `0${seconds}` : seconds;
  minutesValue = minutes < 10 ? `0${minutes}` : minutes;
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
            attemptsCount++; // Update Score by 1
            numberOfMatches++;

            //check if winCount ==half of cardValues
            if (winCount == Math.floor(cardValues.length / 2)) {
              resultElement.innerHTML = `<h2>You Won</h2>
            <h4>Moves: ${attemptsCount}</h4>`;

              const score = {
                name: username.value,
                score: attemptsCount,
                time: `${minutesValue}:${secondsValue}`,
              };

              highscoreArray.push(score);

              // Sorts the high score object
              highscoreArray.sort((a, b) => {
                return a.score - b.score;
              });

              // Finds what index the last high score was stored at
              indexOfLastEntry = highscoreArray.findIndex(
                (item) => item.score === score.score
              );
              changePage(4);
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

function displayResults(correctTotal) {
  let user = username.value;
  let score = attemptsCount;

  resultArea.classList.remove("hide");
  retryQuestionContainer.style.display = "none";

  // Create Table
  mytable =
    "<table class='table' id='table'>" +
    "<tr><th>Username</th><th>Time</th><th>Score</th></tr>";

  highscoreArray.sort((a, b) => {
    return a.score - b.score;
  });

  for (i = 0; i < highscoreArray.length; i++) {
    mytable +=
      "<tr class='trClass'><td id='highScoreName'>" +
      highscoreArray[i].name +
      "</td><td id='highScoreName'>" +
      highscoreArray[i].time +
      "</td><td>" +
      highscoreArray[i].score +
      "</td></tr>";
  }
  mytable += "</table>";
  document.getElementById("table").outerHTML = mytable;

  // Retrieve all Table rows
  let el = document.getElementsByClassName("trClass");
  // Highlight the user's last high score
  el[indexOfLastEntry].classList.add("highlight");
}

//Initial Time
var seconds = 0,
  minutes = 0;
//Initial Attempts and win count
var attemptsCount = 0;
var numberOfMatches = 0;
var winCount = 0;
// Highscore
let highscoreArray = Object.keys({});

// Each Case respresents each web page
function changePage(pageNo) {
  switch (pageNo) {
    // Home Page
    case 1:
      controls.classList.add("hide");
      retryQuestionContainer.style.display = "none";
      controls.classList.remove("hide");
      homeArea.classList.remove("hide");
      username.value = "";
      resultArea.style.display = "none";
      break;

    // Start Game
    case 2:
      attemptsCount = 0;
      seconds = 0;
      minutes = 0;
      //controls and buttons visibility
      controls.classList.add("hide");
      stopButton.classList.remove("hide");
      startButton.classList.add("hide");
      resultArea.style.display = "none";
      retryQuestionContainer.style.display = "none";
      //Start timer
      interval = setInterval(timeGenerator, 1000);
      //initial moves
      attempts.innerHTML = `<span>Attempts:</span> ${attemptsCount}`;
      initializer();
      break;

    // End Game - Ask User if they want to play again
    case 3:
      controls.classList.add("hide");
      homeArea.classList.add("hide");
      retryQuestionContainer.style.display = "flex";

      stopButton.classList.add("hide");
      startButton.classList.remove("hide");
      clearInterval(interval);
      break;

    // End Game - Show Highscores
    case 4:
      controls.classList.add("hide");
      homeArea.classList.add("hide");
      resultArea.style.display = "flex";
      displayResults();
      break;
    //
    case 5:
  }
}

function stopOrContinueGame(continueGame) {
  // Check if user wants to try again & keep highscore if they do
  if (!continueGame) {
    // if false
    highscoreArray = Object.keys({});
  }
  changePage(1);
}