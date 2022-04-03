import {GameWorld} from "./gameworld.js";

export const GameManager = {
    levels: [
        [
            Matter.Bodies.rectangle(100, 100, 50, 50, {
                // Use infinite moment of inertia to prevent rotation.
                inertia: Infinity,
                // Frictionless.
                friction: 0,
                label: "player"
            }),
            Matter.Bodies.rectangle(275, 275, 50, 50, {
                // Use infinite moment of inertia to prevent rotation.
                inertia: Infinity,
                // Frictionless.
                friction: 0,
                isStatic: true,
                isSensor: true,
                label: "player"
            })
        ]
    ],
    gameWorld: undefined,
    currentLevel: 0,
    // Index of the level.
    loadLevel: function (index) {
        this.currentLevel = index;

        if (this.gameWorld) {
            this.gameWorld.dispose();
        }

        this.resetButtonStatus();

        this.gameWorld = new GameWorld(this.levels[this.currentLevel]);
        this.gameWorld.start();
    },
    reload: function () {
        this.loadLevel(this.currentLevel);
    },
    resetButtonStatus: function () {
        if (!document.querySelector("#toggle-gravity").classList.contains("enabled")) {
            document.querySelector("#toggle-gravity").classList.add("enabled");
        }
    },
    nextLevel: function () {
        if (this.currentLevel < this.levels.length - 1) {
            this.loadLevel(this.currentLevel + 1);
        }
    }
}