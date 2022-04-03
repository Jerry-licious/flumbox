/**
 * An interpolation generates values between two points using different curve functions to obtain a smooth animation.
 */
export class Interpolation {
    constructor(interpolationFunction) {
        this.interpolationFunction = interpolationFunction;
    }

    /**
     @param {number} start Start of the interpolation.
     @param {number} end End of the interpolation.
     @param {number} progress Progress of the animation, between 0 and 1.
     @returns {number}
     * */
    apply(start, end, progress) {
        return start + (end - start) * this.interpolationFunction(progress);
    }
}

Interpolation.linear = new Interpolation((x) => x);
Interpolation.circleIn = new Interpolation((x) => 1 - Math.sqrt(1 - x * x));
Interpolation.circleOut = new Interpolation((x) => Math.sqrt(1 - (x - 1) * (x - 1)));
Interpolation.circleOut = new Interpolation((x) => Math.sqrt(1 - (x - 1) * (x - 1)));
Interpolation.log2 = new Interpolation((x) => Math.log2(x + 1));