var mouseX = -1;

var sliderImageWidth;

function init() {
    //make it the page width until the actual width is loaded
    sliderImageWidth = document.body.clientWidth

    let container = document.getElementById("slider-container")

    //set container to proper size
    let image = new Image();
    image.src = "images/before.jpg";
    image.onload = () => {
        sliderImageWidth = image.width;
        container.style.width = sliderImageWidth + "px"
    };

    //update mouse position
    container.addEventListener("mousemove", function(ev) {
        mouseX = ev.clientX;
        console.log(mouseX)
    });

    // runs the animations of the slider
    setInterval(updateSlider, 0)
}

//used to calculate the delta time for animation smoothness
var lastTime = -1;

function updateSlider() {
    if (mouseX == -1) return;

    let deltaTime = (Date.now() - lastTime) / 1000;
    if (deltaTime > 0.4) {
        deltaTime = 1/60;
    }

    let image = document.getElementById("before-image");
    let margin = 12;

    let localX = mouseX - (document.body.clientWidth / 2 - sliderImageWidth / 2 + margin)

    let targetWidth = localX / sliderImageWidth * 100;
    //don't go over 100%
    if (targetWidth > 100) {
        targetWidth = 100;
    }

    //this is in the form of a percentage in a string
    let previousWidthFormatted = image.style.width;
    let previousWidth = previousWidthFormatted.slice(0, previousWidthFormatted.length - 1)

    //interpolation is used to make it look smoother
    let lerpFactor = 10 * deltaTime;

    let distanceToTarget = (targetWidth - parseFloat(previousWidth));

    let newWidth = parseFloat(previousWidth) + distanceToTarget * lerpFactor;

    image.style.width = newWidth + "%";

    lastTime = Date.now();
}

//run init on load
document.addEventListener("DOMContentLoaded", init);