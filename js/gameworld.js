import {GameRenderer} from "./gamerenderer.js";
import {RenderConfig} from "./renderconfig.js";

/**
 * @property {HTMLCanvasElement} canvas
 *
 * @property {Matter.Engine} engine Physics engine of the game.
 * @property {GameRenderer} renderer Renderer of the game.
 * */
export class GameWorld {
    constructor() {
        this.canvas = document.querySelector("#game-canvas");

        this.engine = Matter.Engine.create();
        this.renderer = new GameRenderer(
            this.canvas,
            this.engine,
            new RenderConfig(
                "white",
                1,
                "black"
            )
        );

        this.initialise();
        this.start();
    }

    // Populates the level and adds event listeners.
    initialise() {
        this.createWalls();
    }

    // Starts the physics and render engine.
    start() {
        Matter.Runner.run(this.engine);
        this.renderer.run();
    }

    // Makes the walls of the level.
    createWalls() {
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;

        // Since the level will be rotating, the level's size cannot exceed the shorter of the width and height
        // while it is rotating. When the square rotates, it takes the most horizontal/vertical space when it's
        // rotated 45 degrees, where its width/height is equal to its side length * sqrt(2).
        // We will additionally be leaving 10% space while rotating to make sure that the level is not too big.
        const levelSize = Math.max(this.canvas.width, this.canvas.height) * 0.9 / Math.SQRT2;
        const halfLevelSize = levelSize / 2;

        let ground =     Matter.Bodies.rectangle(centerX, centerY - halfLevelSize, levelSize, 2, {isStatic: true});
        let ceiling =    Matter.Bodies.rectangle(centerX, centerY + halfLevelSize, levelSize, 2, {isStatic: true});
        let leftBound =  Matter.Bodies.rectangle(centerX - halfLevelSize, centerY, 2, levelSize, {isStatic: true});
        let rightBound = Matter.Bodies.rectangle(centerX + halfLevelSize, centerY, 2, levelSize, {isStatic: true});

        Matter.World.add(this.engine.world, [ground, ceiling, leftBound, rightBound]);
    }
}