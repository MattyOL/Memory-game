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
    { name: "", image: ""},
    { name: "", image: ""},
    { name: "", image: ""},
    { name: "", image: ""},
    { name: "", image: ""},
    { name: "", image: ""},
    { name: "", image: ""},
    { name: "", image: ""},
    { name: "", image: ""},
    { name: "", image: ""},
];
