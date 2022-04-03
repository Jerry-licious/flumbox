import {GameWorld} from "./gameworld.js";
import {GameManager} from "./gamemanager.js";

// Initialise the size of the canvas.
(function initialiseCanvas() {
    const canvas = document.querySelector("#game-canvas");

    // Correct the size of the canvas for the screen size.
    canvas.width = window.innerWidth * window.devicePixelRatio;
    canvas.height = window.innerHeight * window.devicePixelRatio;

    // Space between the drawn box and the left/right edges of the screen.
    const horizontalSpace = window.innerWidth - window.innerHeight / 2;
    // document.querySelector(".overlay").style.setProperty("--left-right-size", horizontalSpace);
})();

(function bindReloadButton() {
    document.querySelector("#reset").addEventListener("click", () => GameManager.reload());
})();

window.GameManager = GameManager;

GameManager.initialise();