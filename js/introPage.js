let title = document.getElementById('title');
let startBtn = document.getElementById('startBtn');
title.style.animation = "titleAnimation 1000ms ease-in-out forwards";
setTimeout(()=> {
    startBtn.style.animation = "startBtnAnimation 1000ms ease-in-out forwards";
}, 200);

//Matter.js Background
//engine + Renderer
let engine = Matter.Engine.create();
let render = Matter.Render.create({
    element: document.querySelector("#intro-canvas-holder"),
    engine: engine,
    options: {
        wireframes: false,
        width: 1920,
        height: 1080,
        background: '#EAEAEA'
    }
});

//Objects
let ground = Matter.Bodies.rectangle(window.innerWidth, window.innerHeight + 0.1 * window.innerHeight, window.innerWidth * 2, 100, { isStatic: true });

//RNG Utility Function
const rng = function (min, max) {
    let range = max - min + 1;
    let num = Math.floor(Math.random() * range + min)
    return num;
}
//rectangle(x, y, sizex, sizey), x and y are the center of the object
//drop down boxes
for(let i = 0; i < 120; i++){
    setTimeout(()=> {
        let box = Matter.Bodies.rectangle(rng(80, window.innerWidth-80), -rng(50, 100), 80, 80, {
            angle: rng(0, 3),
            torque: rng(0, 3)
        });
        Matter.Composite.add(engine.world, box)
    }, rng(1000, 10000))
}

//Adding
Matter.Composite.add(engine.world, ground);

//Run
Matter.Render.run(render);
let runner = Matter.Runner.create();
Matter.Runner.run(runner, engine);
//Isolating the new canvas from the game canvas
let introCanvas = document.querySelector('#intro-canvas');
introCanvas.id="introCanvas";

const onDocumentClick = () => {
    let container = document.getElementById('container');
    Matter.Composite.remove(engine.world, ground);
    document.body.style.setProperty('background-color', 'rgba(234, 234, 234, 1)')
    container.style.animation = "outroAnimation 1800ms ease-in-out forwards"
    introCanvas.style.animation = "outroAnimation 1800ms ease-in-out forwards"
    introCanvas.style.position = "absolute"
    document.body.style.animation = "backGroundAnimation 1800ms ease-in-out forwards"
    setTimeout(()=>{
        container.remove()
        introCanvas.remove();

        // Show the game.
        document.querySelector(".intro").style.visibility = "hidden";
        document.querySelector(".game").style.visibility = "visible";
    }, 2000);

    document.removeEventListener('click', onDocumentClick);
};
//transition to next page
document.addEventListener('click', onDocumentClick);