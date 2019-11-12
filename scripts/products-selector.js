var buttons = [];

function init() {
    // Add listeners
    buttons = document.querySelectorAll(".product-preview-button");

    for (let i = 0; i < buttons.length; i++) {
        let currentButton = buttons[i];
        currentButton.addEventListener("click", () => void openProduct(currentButton));
    }
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

//run init on load
document.addEventListener("DOMContentLoaded", init);