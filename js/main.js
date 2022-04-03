// module aliases
import {GameRenderer} from "./gamerenderer.js";
import {RenderConfig} from "./renderconfig.js";

const Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite;

// create an engine
const engine = Engine.create();

// create two boxes and a ground
const boxA = Bodies.rectangle(400, 200, 80, 80);
const boxB = Bodies.rectangle(450, 50, 80, 80);
const ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });

// add all of the bodies to the world
Composite.add(engine.world, [boxA, boxB, ground]);

const renderer = new GameRenderer(document.querySelector("#game-canvas"), engine,
    new RenderConfig("white", 1, "black")
);

renderer.run();

window.renderer = renderer;

// create runner
const runner = Runner.create();

// run the engine
Runner.run(runner, engine);