"use-strict";

//run init on load
document.addEventListener("DOMContentLoaded", init);

var generateButton;

var animationRuns = 0;

function init() {
    generateButton = document.getElementById("generate-number");

    generateButton.addEventListener("click", startNumberAnimation);
}

function startNumberAnimation() {
    // start animation
    animationRuns = 0;

    stopFireworks();

    generateNumber();
}

function generateNumber() {
    let maxNumber = document.getElementById("random-cap").value;

    let winnerBox = document.getElementById("winner");

    winnerBox.innerText = Math.ceil(Math.random() * maxNumber);

    animationRuns++;

    if (animationRuns < 20) {
        setTimeout(generateNumber, 100);
    } else {
        // Winner found
        startFireworks();
    }
}

function startFireworks() {
    let objects = document.getElementsByClassName("fireworks-starter");

    for (let i = 0; i < objects.length; i++) {
        let currentObject = objects[i];

        setTimeout(() => currentObject.classList.add("fireworks"), i * 2000);
    }
}

function stopFireworks() {
    let objects = document.getElementsByClassName("fireworks-starter");

    for (let i = 0; i < objects.length; i++) {
        let currentObject = objects[i];

        currentObject.classList.remove("fireworks");
    }
}