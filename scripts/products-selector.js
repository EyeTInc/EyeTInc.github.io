var buttons = [];

var mouseY = -1;

var overlay;

//used to calculate the delta time for animation smoothness
var lastTime = -1;

function init() {
    // Add listeners
    buttons = document.querySelectorAll(".product-preview-button");

    for (let i = 0; i < buttons.length; i++) {
        let currentButton = buttons[i];
        currentButton.addEventListener("click", () => void openProduct(currentButton));
    }

    let colorSelector = document.getElementById("product-color-selector");

    //update mouse position
    // document.getElementById("main-product-image").addEventListener("mousedown", mousePositionUpdate);
    document.getElementById("product-color-selection-area").addEventListener("mousemove", mousePositionUpdate);

    overlay = document.getElementById("overlay-product-image");

    // runs the animations of the slider
    setInterval(() => updateColorSlider(colorSelector), 0)
}

function openProduct(button) {
    let background = document.getElementById("main-product-image");
    let overlay = document.getElementById("overlay-product-image");

    background.style.backgroundImage = "url('./images/" + button.id + ".jpg')";
    overlay.style.backgroundImage = "url('./images/" + button.id + "-o.png')";

    button.classList.add("clicked");

    for (let i = 0; i < buttons.length; i++) {
        if (buttons[i] !== button) {
            buttons[i].classList.remove("clicked");
        }
    }

    // Deal with descriptions
    document.getElementById(button.id + "-description").classList.remove("hidden");

    for (let i = 0; i < buttons.length; i++) {
        let description = document.getElementById(buttons[i].id + "-description");

        if (buttons[i] !== button && !description.classList.contains("hidden")) {
            description.classList.add("hidden");
        }
    }
}

function updateColorSlider(colorSelector) {
    if (mouseY == -1) return;

    let deltaTime = (Date.now() - lastTime) / 1000;
    if (deltaTime > 0.4) {
        deltaTime = 1/60;
    }

    let margin = 125;

    let borderObject = document.getElementById("color-selector-border");

    let localY = mouseY - margin;

    let targetHeight = localY / colorSelector.style.height * 100;
    //don't go over 100%
    if (targetHeight > 100) {
        targetHeight = 100;
    }


    //this is in the form of a percentage in a string
    let previousWidthFormatted = borderObject.style.marginTop;
    let previousWidth = previousWidthFormatted.slice(0, previousWidthFormatted.length - 2)
    if (isNaN(parseFloat(previousWidth))) {
        previousWidth = 0;
    }

    //interpolation is used to make it look smoother
    let lerpFactor = 10 * deltaTime;

    let distanceToTarget = (localY - parseFloat(previousWidth));

    let newHeight = parseFloat(previousWidth) + distanceToTarget * lerpFactor;

    if (newHeight < 11) {
        newHeight = 11;
    }
    if (newHeight > 332) {
        newHeight = 332;
    }

    borderObject.style.marginTop = newHeight + "px";

    overlay.style.filter = "hue-rotate(" + (newHeight / colorSelector.clientHeight * 360) + "deg)"

    lastTime = Date.now();
}

function mousePositionUpdate(ev) {
    //ev.buttons == 1
    if (ev.buttons == 1) {
        mouseY = ev.clientY;
    }
}

//run init on load
document.addEventListener("DOMContentLoaded", init);