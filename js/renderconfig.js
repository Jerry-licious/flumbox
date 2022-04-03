/**
 @property {String} backgroundColour
 @property {number} shapeLineWidth
 @property {String} shapeStrokeColour
 */
export class RenderConfig {
    constructor(backgroundColour, shapeLineWidth, shapeStrokeColour) {
        this.backgroundColour = backgroundColour;
        this.shapeLineWidth = shapeLineWidth;
        this.shapeStrokeColour = shapeStrokeColour;
    }
}