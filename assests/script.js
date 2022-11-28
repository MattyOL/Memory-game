var attempts = document.getElementById("attempts-count");
var timeValue = document.getElementById("time");
var startButton = document.getElementById("start");
var stopButton = document.getElementById("stop");
var gameContainer = document.querySelector(".game-container");
var resultElement = document.getElementById("result");
var controls = document.querySelector(".controls-area");
var gamescreenArea = document.querySelector(".gamescreen");
var retryQuestionContainer = document.querySelector(
  ".retryQuestionContainer"
);
var username = document.getElementById("user-input");
var feedback = document.getElementById("feedback");
var submitBtn = document.getElementById("submit");
var resultArea = document.getElementById("result-area");
// var highScoreElement = document.getElementById('cc');

var cards;
var interval;
var firstCard = false;
var secondCard = false;
var indexOfLastEntry = 0;

var items = [
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
function initializer() {
  resultElement.innerText = "";
  winCount = 0;
  var cardValues = generateRandom();
  console.log(cardValues);
  matrixGenerator(cardValues);
};

function validateUserInput(user) {
  var errorMsg = "";

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
    // display errorMsg in feedback div on gamescreen page
    feedback.innerHTML = errorMsg;
    // adds functionality for screen readers to read error message
    // when it is displayed on screen
    username.setAttribute("data-has-error", "true");

    return false;
  }

  return true;
}

function checkForSpecialCharacters(username) {
  var specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~£]/;

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
var secondsValue = 0;
var minutesValue = 0;

function timeGenerator() {
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
function attemptsCounter() {
  attemptsCount += 1;
  attempts.innerHTML = `<span>Attempts:</span>${attemptsCount}`;
};

//Pick random objects from the items array
var generateRandom = (size = 4) => {
  //temporary array
  var tempArray = [...items];
  //initializes cardValues array
  var cardValues = [];
  //size should be double (4*4 matrix)/2 since pairs of objects would exist
  size = (size * size) / 2;
  //Random object selection
  for (var i = 0; i < size; i++) {
    var randomIndex = Math.floor(Math.random() * tempArray.length);
    cardValues.push(tempArray[randomIndex]);
    //once selected remove the object from temp array
    tempArray.splice(randomIndex, 1);
  }
  return cardValues;
};
var matrixGenerator = (cardValues, size = 4) => {
  gameContainer.innerHTML = "";
  cardValues = [...cardValues, ...cardValues];

  //simple shuffle
  cardValues.sort(() => Math.random() - 0.5);
  console.log(cardValues);
  for (var i = 0; i < size * size; i++) {
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
          var secondCardValue = card.getAttribute("data-card-value");
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

              var score = {
                name: username.value,
                score: attemptsCount,
                time: `${minutesValue}:${secondsValue}`,
              };

              highscoreObject.push(score);

              // Sorts the high score object
              highscoreObject.sort((a, b) => {
                return a.score - b.score;
              });

              // Finds what index the last high score was stored at
              indexOfLastEntry = highscoreObject.findIndex(
                (item) => item.score === score.score
              );
              changePage(4);
            }
          } else {
            //if the cards dont match
            //flip the cards back to normal
            var [tempFirst, tempSecond] = [firstCard, secondCard];
            firstCard = false;
            secondCard = false;
            var delay = setTimeout(() => {
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
  var user = username.value;
  var score = attemptsCount;

  resultArea.classList.remove("hide");
  retryQuestionContainer.style.display = "none";

  // Create Table
  mytable =
    "<table class='table' id='table'>" +
    "<tr><th>Username</th><th>Time</th><th>Attempts</th></tr>";

  highscoreObject.sort((a, b) => {
    return a.score - b.score;
  });

  for (i = 0; i < highscoreObject.length; i++) {
    mytable +=
      "<tr class='trClass'><td id='highScoreName'>" +
      highscoreObject[i].name +
      "</td><td id='highScoreName'>" +
      highscoreObject[i].time +
      "</td><td>" +
      highscoreObject[i].score +
      "</td></tr>";
  }
  mytable += "</table>";
  document.getElementById("table").outerHTML = mytable;

  // Retrieve all Table rows
  var el = document.getElementsByClassName("trClass");
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
var highscoreObject = Object.keys({});

// Each Case respresents each web page
function changePage(pageNo) {
  switch (pageNo) {
    // Home Page
    case 1:
      controls.classList.add("hide");
      retryQuestionContainer.style.display = "none";
      controls.classList.remove("hide");
      gamescreenArea.classList.remove("hide");
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
      gamescreenArea.classList.add("hide");
      retryQuestionContainer.style.display = "flex";

      stopButton.classList.add("hide");
      startButton.classList.remove("hide");
      clearInterval(interval);
      break;

    // End Game - Show Highscores
    case 4:
      controls.classList.add("hide");
      gamescreenArea.classList.add("hide");
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
    highscoreObject = Object.keys({});
  }
  changePage(1);
}
