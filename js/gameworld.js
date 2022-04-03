import {GameRenderer} from "./gamerenderer.js";
import {RenderConfig} from "./renderconfig.js";
import {Direction} from "./direction.js";
import {GameManager} from "./gamemanager.js";

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
 * @property {boolean} gravity Whether gravity is enabled.
 *
 * @property {boolean} rotating Whether the world is being rotated at the moment.
 *
 * @property rotateCounterClockwiseListener
 * @property rotateClockwiseListener
 * @property toggleGravityListener
 * */
export class GameWorld {
    /**
     * @param bodies A list of objects placed in the level.
     */
    constructor(bodies) {
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
        this.gravity = true;

        this.initialise(bodies);
    }

    // Populates the level and adds event listeners.
    initialise(bodies) {
        // Clones all the objects.
        for (const body of bodies) {
            Matter.Composite.add(this.engine.world, clone(body));
        }

        this.createWalls();
        this.hookListeners();
    }

    // Starts the physics and render engine.
    start() {
        this.runner = Matter.Runner.run(this.engine);
        this.renderer.run();
    }

    // Makes the walls of the level.
    createWalls() {
        const halfLevelSize = levelSize * 0.5;

        let ground =     Matter.Bodies.rectangle(0, -halfLevelSize, levelSize, 2, {isStatic: true, label: "ground"});
        let ceiling =    Matter.Bodies.rectangle(0, halfLevelSize, levelSize, 2, {isStatic: true, label: "ceiling"});
        let leftBound =  Matter.Bodies.rectangle(-halfLevelSize, 0, 2, levelSize, {isStatic: true, label: "left"});
        let rightBound = Matter.Bodies.rectangle(halfLevelSize, 0, 2, levelSize, {isStatic: true, label: "right"});

        Matter.Composite.add(this.engine.world, [ground, ceiling, leftBound, rightBound]);
    }
    /**
     * Rotates the world in a given direction by 90 degrees and blocks the buttons from being used in the process.
     *
     * @param {boolean} clockwise True for clockwise, false for counterclockwise.
     */
    onRotateButtonClick(clockwise) {
        // No rotations while rotating.
        if (this.rotating) return;

        const rotateCounterClockwiseButton = document.querySelector("#rotate-counterclockwise");
        const rotateClockwiseButton = document.querySelector("#rotate-clockwise");

        rotateCounterClockwiseButton.classList.add("disabled");
        rotateClockwiseButton.classList.add("disabled");

        this.rotate(clockwise).then(() => {
            rotateCounterClockwiseButton.classList.remove("disabled");
            rotateClockwiseButton.classList.remove("disabled");
        });
    }

    // Hooks event listeners to the game's controls.
    hookListeners() {
        this.rotateCounterClockwiseListener = (event) => {
            this.onRotateButtonClick(false);
        };
        document.querySelector("#rotate-counterclockwise").addEventListener("click", this.rotateCounterClockwiseListener);

        this.rotateClockwiseListener = (event) => {
            this.onRotateButtonClick(true);
        };
        document.querySelector("#rotate-clockwise").addEventListener("click", this.rotateClockwiseListener);

        this.toggleGravityListener = (event) => {
            if (event.target.classList.contains("enabled")) {
                event.target.classList.remove("enabled");
                this.setGravity(false);
            } else {
                event.target.classList.add("enabled");
                this.setGravity(true);
            }
        };
        document.querySelector("#toggle-gravity").addEventListener("click", this.toggleGravityListener);

        Matter.Events.on(this.engine, "collisionStart", (event) => {
            for (const pair of event.pairs) {
                const labelA = pair.bodyA.label;
                const labelB = pair.bodyB.label;

                // If the two objects have the same label.
                if (labelA === labelB && labelA !== "Rectangular Body") {
                    // Check if they are still in contact after 0.5 seconds, if so, win the game.
                    setTimeout(() => {
                        if (Matter.Collision.collides(pair.bodyA, pair.bodyB)) {
                            // Win the game.
                            this.win();
                        }
                    }, 1000);
                }
            }
        });
    }

    /**
     * Rotates the world in a given direction by 90 degrees.
     *
     * @param {boolean} clockwise True for clockwise, false for counterclockwise.
     *
     * @returns {Promise} Returns an empty promise after the rotation animation is complete.
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
        return new Promise((resolve, reject) => {
            this.renderer.rotateBy(Math.PI * 0.5 * (clockwise ? 1 : -1))
                // After the rotation completes, resume the engine and change the orientation and gravity.
                .then(() => {
                    // Get the new direction, when the direction rotates clockwise, the gravity rotates counterclockwise.
                    this.direction = clockwise ? Direction.nextCounterClockwise(this.direction) : Direction.nextClockwise(this.direction);

                    // Update gravity
                    this.engine.world.gravity.x = this.gravityVector.x;
                    this.engine.world.gravity.y = this.gravityVector.y;

                    // Resume the physics engine.
                    this.runner.enabled = true;

                    // Set rotating to release the restriction.
                    this.rotating = false;

                    resolve();
                });
        })
    }

    /**
     * Enables or disables gravity.
     *
     * @param {boolean} gravity Whether gravity will be enabled or not.
     */
    setGravity(gravity) {
        this.gravity = gravity;

        this.engine.world.gravity.x = this.gravityVector.x;
        this.engine.world.gravity.y = this.gravityVector.y;
    }

    /**
     * Returns the gravity vector of the world.
     */
    get gravityVector() {
        return this.gravity ? Direction.toVector(this.direction) : { x: 0, y: 0 };
    }

    /**
     * Unhooks all listeners and stops the physics engine.
     */
    dispose() {
        // Stops the physics engine.
        this.runner.enabled = false;

        // Clear the listeners.
        document.querySelector("#rotate-counterclockwise").removeEventListener("click", this.rotateCounterClockwiseListener);
        document.querySelector("#rotate-clockwise").removeEventListener("click", this.rotateClockwiseListener);
        document.querySelector("#toggle-gravity").removeEventListener("click", this.toggleGravityListener);

        this.renderer.dispose();
    }

    win() {
        GameManager.showProceedOverlay();
    }
}