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

    background.style.backgroundImage = "url('./images/" + button.id + ".jpg')";

    button.classList.add("clicked");

    for (let i = 0; i < buttons.length; i++) {
        if (buttons[i] !== button) {
            buttons[i].classList.remove("clicked");
        }
    }
}

//run init on load
document.addEventListener("DOMContentLoaded", init);