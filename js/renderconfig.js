/**
 * Configures a GameRenderer.
 *
 * Drawing configurations.
 * @property {String} backgroundColour
 * @property {number} shapeLineWidth
 * @property {String} shapeStrokeColour
 *
 * @property {number} rotationAnimationDuration The amount of time it takes for the box to be rotated, in milliseconds.
 */
export class RenderConfig {
    constructor(backgroundColour, shapeLineWidth, shapeStrokeColour, rotationAnimationDuration) {
        this.backgroundColour = backgroundColour;
        this.shapeLineWidth = shapeLineWidth;
        this.shapeStrokeColour = shapeStrokeColour;

        this.rotationAnimationDuration = rotationAnimationDuration;
    }
}