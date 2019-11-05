"use-strict";

//run init on load
document.addEventListener("DOMContentLoaded", init);

var generateButton;

function init() {
    generateButton = document.getElementById("generate-number");

    generateButton.addEventListener("click", generateNumber);
}

function generateNumber() {
    let maxNumber = document.getElementById("random-cap").value;

    let winnerBox = document.getElementById("winner");

    console.log(winnerBox)

    winnerBox.innerText = Math.round(Math.random() * maxNumber);
}