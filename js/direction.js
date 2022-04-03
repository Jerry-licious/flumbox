// Represents a direction in the game.
export const Direction = {
    Up: Symbol("up"),
    Down: Symbol("down"),
    Left: Symbol("left"),
    Right: Symbol("right"),

    // Returns the direction as a vector, used to set gravity.
    toVector: function (direction) {
        switch (direction) {
            case this.Up:
                return { x: 0, y: -1 };
            case this.Down:
                return { x: 0, y: 1 };
            case this.Left:
                return { x: -1, y: 0 };
            case this.Right:
                return { x: 1, y: 0 };
            default:
                return { x: 0, y: 0 };
        }
    },
    // Returns the *clockwise* radian value of the direction.
    toRadians: function (direction) {
        switch (direction) {
            case this.Up:
                return 1.5 * Math.PI;
            case this.Down:
                return 0.5 * Math.PI;
            case this.Left:
                return Math.PI;
            case this.Right:
                return 0;
            default:
                return 0;
        }
    },
    // Returns the next clockwise direction.
    nextClockwise: function (direction) {
        switch (direction) {
            case this.Up:
                return this.Right;
            case this.Down:
                return this.Left;
            case this.Left:
                return this.Up;
            case this.Right:
                return this.Down;
            default:
                return this.Down;
        }
    },
    // Returns the next counter-clockwise direction.
    nextCounterClockwise: function (direction) {
        switch (direction) {
            case this.Up:
                return this.Left;
            case this.Down:
                return this.Right;
            case this.Left:
                return this.Down;
            case this.Right:
                return this.Up;
            default:
                return this.Down;
        }
    }
}