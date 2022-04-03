import {RenderConfig} from "./renderconfig.js";
import {Interpolation} from "./interpolation.js";
import {levelSize} from "./gameworld.js";
/**
 * @property {HTMLCanvasElement} canvas
 * @property {Matter.Engine} engine
 * @property {RenderConfig} config
 *
 * @property {CanvasRenderingContext2D} context
 *
 * @property {number} canvasRotation The rotation of the game around the centre of the screen, in radians.
 *
 * @property {boolean} enabled Whether the renderer is enabled or not.
 * */
export class GameRenderer {
    /**
     * @param {HTMLCanvasElement} canvas
     * @param {Matter.Engine} engine
     * @param {RenderConfig} config
    * */
    constructor(canvas, engine, config) {
        this.canvas = canvas;
        this.engine = engine;
        this.config = config;

        this.context = canvas.getContext("2d");

        this.canvasRotation = 0;

        this.enabled = true;
    }

    // Draws the current bodies onto the canvas.
    render() {
        // Extract all bodies from the world.
        const bodies = Matter.Composite.allBodies(this.engine.world);

        this.context.save();
        // Move to the centre of the canvas.
        this.context.translate(this.canvas.width / 2, this.canvas.height / 2);
        // Rotate by the given rotation.
        this.context.rotate(this.canvasRotation);
        // Since the level will be rotating, the level's display size cannot exceed the shortest of the width and height
        // while it is rotating. When the square rotates, it takes the most horizontal/vertical space when it's
        // rotated 45 degrees, where its width/height is equal to its side length * sqrt(2).
        // We will additionally be leaving 10% space while rotating to make sure that the level is not too big.
        const scaleFactor = Math.min(this.canvas.width, this.canvas.height) * Math.SQRT1_2 / levelSize * 0.9;
        // Then scale the canvas by the given factor.
        this.context.scale(scaleFactor, scaleFactor);

        // Fill the background.
        this.context.fillStyle = this.config.backgroundColour;
        this.context.fillRect(-this.canvas.width / 2, -this.canvas.height / 2, this.canvas.width, this.canvas.height);

        // Go through all bodies.
        for (const body of bodies) {
            this.context.beginPath();

            const vertices = body.vertices;

            // First move to the first point of the shape.
            this.context.moveTo(vertices[0].x, vertices[0].y);

            // Then draw lines connecting the shape together.
            for (let i = 1; i < vertices.length; i++) {
                this.context.lineTo(vertices[i].x, vertices[i].y);
            }

            // And finally finish the line at the origin.
            this.context.lineTo(vertices[0].x, vertices[0].y);

            const render = body.render;
            this.context.fillStyle = render.fillStyle;
            this.context.strokeStyle = render.strokeStyle;
            this.context.lineWidth = render.lineWidth;
            // Draw the shape.
            this.context.stroke();
            this.context.fill();
        }

        // Reset the rotation.
        this.context.restore();
    }

    // Continuously renders the game.
    run() {
        this.render();
        if (this.enabled) {
            window.requestAnimationFrame(() => this.run());
        }
    }

    /**
     * Creates a smooth rotation to the target angle.
     *
     * @param {number} theta Rotation in radians, clockwise.
     *
     * @returns {Promise} Returns an empty promise when the rotation animation is finished.
     * */
    rotateTo(theta) {
        return new Promise((resolve, reject) => {
            // Start and end angles
            const start = this.canvasRotation, end = theta;

            // Mark the start and end time.
            const startTime = Date.now();

            // Set an interval to update the canvas rotation.
            const intervalHandle = setInterval(() => {
                // Stop interpolating after the time is up.
                if (Date.now() - startTime > this.config.rotationAnimationDuration) {
                    this.canvasRotation = end;
                    clearInterval(intervalHandle);

                    // Resolve the promise.
                    resolve();
                    return;
                }
                this.canvasRotation = Interpolation.log2
                    // Calculate the progress by dividing
                    .apply(start, end, (Date.now() - startTime) / this.config.rotationAnimationDuration);
            }, 30);
        })
    }

    /**
     * Smoothly rotates the scene by the target angle.
     *
     * @param {number} theta Rotation in radians, clockwise.
     *
     * @returns {Promise} Returns an empty promise when the rotation animation is finished.
     * */
    rotateBy(theta) {
        return this.rotateTo(this.canvasRotation + theta);
    }

    /**
     * Halts the rendering and unhooks all event listeners.
     */
    dispose() {
        this.enabled = false;
    }
}