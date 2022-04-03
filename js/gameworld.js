import {GameRenderer} from "./gamerenderer.js";
import {RenderConfig} from "./renderconfig.js";
import {Direction} from "./direction.js";

// A level should always be 600 by 600.
export const levelSize = 600.0;

/**
 * A game world represents one level in the game. A level should always be 600 by 600 in size, with the origin
 * (0, 0) at its centre.
 *
 * @property {HTMLCanvasElement} canvas
 *
 * @property {Matter.Engine} engine Physics engine of the game.
 * @property {Matter.Runner} runner Runner of the physics engine.
 * @property {GameRenderer} renderer Renderer of the game.
 *
 * @property direction Direction of gravity.
 *
 * @property {boolean} rotating Whether the world is being rotated at the moment.
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
                "black",
                1000
            )
        );

        this.direction = Direction.Down;

        this.initialise();
        this.start();
    }

    // Populates the level and adds event listeners.
    initialise() {
        this.createWalls();
    }

    // Starts the physics and render engine.
    start() {
        this.runner = Matter.Runner.run(this.engine);
        this.renderer.run();
    }

    // Makes the walls of the level.
    createWalls() {
        const halfLevelSize = levelSize * 0.5;

        let ground =     Matter.Bodies.rectangle(0, -halfLevelSize, levelSize, 2, {isStatic: true});
        let ceiling =    Matter.Bodies.rectangle(0, halfLevelSize, levelSize, 2, {isStatic: true});
        let leftBound =  Matter.Bodies.rectangle(-halfLevelSize, 0, 2, levelSize, {isStatic: true});
        let rightBound = Matter.Bodies.rectangle(halfLevelSize, 0, 2, levelSize, {isStatic: true});

        let object =  Matter.Bodies.rectangle(0, 0, 50, 50, {
            // Use infinite moment of inertia to prevent rotation.
            inertia: Infinity,
            // Frictionless.
            friction: 0
        });

        Matter.World.add(this.engine.world, [ground, ceiling, leftBound, rightBound, object]);
    }

    /**
     * Rotates the world in a given direction by 90 degrees.
     *
     * @param {boolean} clockwise True for clockwise, false for counterclockwise.
     */
    rotate(clockwise) {
        if (this.rotating) {
            throw new Error("This world is currently being rotated.");
        }

        // Set rotating to true to block other rotation attempts.
        this.rotating = true;

        // Pause the physics engine when rotation starts.
        this.runner.enabled = false;
        // Rotate the renderer.
        this.renderer.rotateBy(Math.PI * 0.5 * (clockwise ? 1 : -1))
            // After the rotation completes, resume the engine and change the orientation and gravity.
            .then(() => {
                // Get the new direction, when the direction rotates clockwise, the gravity rotates counterclockwise.
                this.direction = clockwise ? Direction.nextCounterClockwise(this.direction) : Direction.nextClockwise(this.direction);

                // Update gravity
                const newGravityVector = Direction.toVector(this.direction);
                this.engine.world.gravity.x = newGravityVector.x;
                this.engine.world.gravity.y = newGravityVector.y;

                // Resume the physics engine.
                this.runner.enabled = true;

                // Set rotating to release the restriction.
                this.rotating = false;
            });
    }
}