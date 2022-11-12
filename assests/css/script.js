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

