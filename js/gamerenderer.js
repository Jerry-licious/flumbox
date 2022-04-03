import {RenderConfig} from "./renderconfig.js";
import {Interpolation} from "./interpolation.js";
/**
 * @property {HTMLCanvasElement} canvas
 * @property {Matter.Engine} engine
 * @property {RenderConfig} config
 *
 * @property {CanvasRenderingContext2D} context
 *
 * @property {number} canvasRotation The rotation of the game around the centre of the screen, in radians.
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
    }

    // Draws the current bodies onto the canvas.
    render() {
        // Extract all bodies from the world.
        const bodies = Matter.Composite.allBodies(this.engine.world);

        this.context.save();
        // Move to the centre of the canvas.
        this.context.translate(this.canvas.width / 2, this.canvas.height / 2);
        this.context.rotate(this.canvasRotation);
        // And move back to the origin.
        this.context.translate(-this.canvas.width / 2, -this.canvas.height / 2);

        // Fill the background.
        this.context.fillStyle = this.config.backgroundColour;
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.context.beginPath();

        // Go through all bodies.
        for (const body of bodies) {
            const vertices = body.vertices;

            // First move to the first point of the shape.
            this.context.moveTo(vertices[0].x, vertices[0].y);

            // Then draw lines connecting the shape together.
            for (let i = 1; i < vertices.length; i++) {
                this.context.lineTo(vertices[i].x, vertices[i].y);
            }

            // And finally finish the line at the origin.
            this.context.lineTo(vertices[0].x, vertices[0].y);
        }

        // Set the style of the strokes.
        this.context.lineWidth = this.config.shapeLineWidth;
        this.context.strokeStyle = this.config.shapeStrokeColour;

        // And outline the shapes.
        this.context.stroke();
        this.context.fillStyle = "black";
        this.context.fill();

        // Reset the rotation.
        this.context.restore();
    }

    // Continuously renders the game.
    run() {
        this.render();
        window.requestAnimationFrame(() => this.run());
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
            // Total number of miliseconds that the animation takes.
            const totalTime = 1000;

            // Set an interval to update the canvas rotation.
            const intervalHandle = setInterval(() => {
                // Stop interpolating after the time is up.
                if (Date.now() - startTime > totalTime) {
                    this.canvasRotation = end;
                    clearInterval(intervalHandle);

                    // Resolve the promise.
                    resolve();
                    return;
                }
                this.canvasRotation = Interpolation.log2
                    // Calculate the progress by dividing
                    .apply(start, end, (Date.now() - startTime) / totalTime);
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
}