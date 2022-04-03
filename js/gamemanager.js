import {GameWorld} from "./gameworld.js";

export const GameManager = {
    levels: [
        //lv 1
        [
            //Goal
            Matter.Bodies.rectangle(-155, 165, 50, 50, {
                isStatic: true,
                isSensor: true,
                label: 'detector',
                render: {
                    fillStyle: "white",
                    strokeStyle: "grey",
                    lineWidth: 6
                }
            }),
            //player
            Matter.Bodies.rectangle(100, 175, 50, 50, {
                // Use infinite moment of inertia to prevent rotation.
                inertia: Infinity,
                // Frictionless.
                friction: 0,
                label: 'detector',
                render: {
                    fillStyle: "grey",
                    lineWidth: 2
                }
            }),
            Matter.Bodies.rectangle(0, 200, 400, 20, {
                isStatic: true
            }),
            Matter.Bodies.rectangle(-190, 150, 20, 100, {
                isStatic: true
            })
        ],
        //lv 2
        [
            //Goal
            Matter.Bodies.rectangle(-25, 275, 50, 50, {
                isStatic: true,
                isSensor: true,
                label: 'detector1',
                render: {
                    fillStyle: "white",
                    strokeStyle: "grey",
                    lineWidth: 6
                }
            }),
            //player
            Matter.Bodies.rectangle(-225, 225, 50, 50, {
                inertia: Infinity,
                friction: 0,
                label: 'detector1', //for detection of goal
                render: {
                    fillStyle: "grey",
                    lineWidth: 2
                }
            }),
            //static obj
            Matter.Bodies.rectangle(-200, 275, 200, 50, {
                isStatic: true
            }),
            Matter.Bodies.rectangle(-100,100, 20, 400, {
                isStatic: true
            }),
            Matter.Bodies.rectangle(-100, -100, 100, 20, {
                isStatic: true
            }),
            Matter.Bodies.rectangle(-150, -275, 200, 20, {
                isStatic: true
            }),
            Matter.Bodies.rectangle(-60, -225, 20, 80, {
                isStatic: true
            }),
            Matter.Bodies.rectangle(200, -140, 20, 100, {
                isStatic: true
            }),
            Matter.Bodies.rectangle(150, 200, 100, 200, {
                isStatic: true
            })
        ],
        //lv 3
        [
        Matter.Bodies.rectangle(275, 275, 50, 50, {
            isStatic: true,
            isSensor: true,
            label: 'detector3',
            render: {
                strokeStyle: "grey",
                fillStyle: "white",
                lineWidth: 6
            }
        }),
            Matter.Bodies.rectangle(-150, 225, 50, 50, {
                // Use infinite moment of inertia to prevent rotation.
                inertia: Infinity,
                // Frictionless.
                friction: 0,
                label: 'detector3',
                render: {
                    fillStyle: "grey",
                    lineWidth: 2
                }
            }),
            Matter.Bodies.rectangle(-150, 150, 100, 50, {isStatic: true, label: '1'}),
            Matter.Bodies.rectangle(250, 125, 100, 50, {isStatic: true, label: '2'}),
            Matter.Bodies.rectangle(150, 286, 50, 25, {isStatic: true, label: '3'}),
            Matter.Bodies.rectangle(100, 175, 50, 199, {
                // Use infinite moment of inertia to prevent rotation.
                inertia: Infinity,
                // Frictionless.
                label: '4',
                friction: 0,
                render: {
                    fillStyle: "#d0d0d0"
                }
            }),
            Matter.Bodies.rectangle(190, 50, 225, 50, {
                // Use infinite moment of inertia to prevent rotation.
                inertia: Infinity,
                // Frictionless.
                friction: 0,
                label: '5',
                render: {
                    fillStyle: "#d0d0d0"
                }
            })
        ],
        //lv 4
        [
            Matter.Bodies.rectangle(-125, 150, 50, 50, {
                isStatic: true,
                isSensor: true,
                label: 'detector4',
                render: {
                    strokeStyle: "grey",
                    fillStyle: "white"
                }
            }),
            Matter.Bodies.rectangle(-150, -150, 50, 50, {
                // Use infinite moment of inertia to prevent rotation.
                inertia: Infinity,
                // Frictionless.
                friction: 0,
                label: 'detector4',
                render: {
                    fillStyle: "grey"
                }
            }),
            Matter.Bodies.rectangle(-100, 200, 100, 50, {isStatic: true, label: '1'}),
            Matter.Bodies.rectangle(200, -125, 50, 50, {isStatic: true, label: '2'}),
            Matter.Bodies.rectangle(125, 100, 100, 50, {isStatic: true, label: '3'}),
            Matter.Bodies.rectangle(-150, -100, 100, 50, {isStatic: true, label: '4'}),
            Matter.Bodies.rectangle(-175, 50, 50, 50, {isStatic: true, label: '5'})
        ],
        //lv 5
        [
            Matter.Bodies.rectangle(-25, 0, 50, 50, {
                isStatic: true,
                isSensor: true,
                label: 'detector2',
                render: {
                    strokeStyle: "grey",
                    fillStyle: "white"
                }
            }),
            Matter.Bodies.rectangle(0, 225, 50, 50, {
                // Use infinite moment of inertia to prevent rotation.
                inertia: Infinity,
                // Frictionless.
                friction: 0,
                label: 'detector2',
                render: {
                    fillStyle: "grey"
                }
            }),
            Matter.Bodies.rectangle(-100, 275, 50, 50, {isStatic: true, label: '1'}),
            Matter.Bodies.rectangle(-170, 200, 75, 200, {
                // Use infinite moment of inertia to prevent rotation.
                inertia: Infinity,
                // Frictionless.
                friction: 0,
                label: '2',
                render: {
                    fillStyle: "#d0d0d0"
                }
            }),
            Matter.Bodies.rectangle(275, 275, 50, 50, {isStatic: true, label: '3'}),
            Matter.Bodies.rectangle(-25, 50, 50, 50, {isStatic: true, label: '7'}),
            Matter.Bodies.rectangle(250, -275, 100, 50, {isStatic: true, label: '4'}),
            Matter.Bodies.rectangle(-275, -175, 50, 50, {isStatic: true, label: '5'}),
            Matter.Bodies.rectangle(-250, -250, 100, 100, {
                // Use infinite moment of inertia to prevent rotation.
                inertia: Infinity,
                // Frictionless.
                friction: 0,
                label: '6',
                render: {
                    fillStyle: "#d0d0d0"
                }
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
    initialise: function () {
        this.loadLevel(0);

        document.querySelector("#retry").addEventListener("click", () => {
            this.hideProceedOverlay();
            this.reload()
        });
        document.querySelector("#next-level").addEventListener("click", () => {
            this.hideProceedOverlay();
            this.nextLevel();
        });
    },
    showProceedOverlay: function () {
        document.querySelector(".proceed-overlay").classList.remove("hidden");
        // If this is the last level.
        if (this.currentLevel === this.levels.length - 1) {
            document.querySelector("#next-level").style.display = "none";
        }
    },
    hideProceedOverlay: function () {
        document.querySelector(".proceed-overlay").classList.add("hidden");
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