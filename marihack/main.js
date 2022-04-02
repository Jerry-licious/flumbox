let engine = Matter.Engine.create();
let render = Matter.Render.create({
    element: document.body,  
    engine: engine
})

//add essencial obj
let ground = Matter.Bodies.rectangle(render.options.width/2, render.options.height, render.options.width + 10, 60, {isStatic: true}) //x, y, w, h
let ceiling = Matter.Bodies.rectangle(render.options.width/2, 0, render.options.width + 10, 60, {isStatic: true} )
let leftBound = Matter.Bodies.rectangle(0, render.options.height/2, 60, render.options.height + 10, {isStatic: true}) //x, y, w, h
let rightBound = Matter.Bodies.rectangle(render.options.width, render.options.height/2, 60, render.options.height + 10, {isStatic: true} )

let platform = Matter.Bodies.rectangle(150, 150, 60, 10, {isStatic: true})
let player = Matter.Bodies.circle(render.options.width - 50, render.options.height - 50, 25) //x, y, radius

//detect key event
document.addEventListener('keydown', (e) => {
    let pressedKey = e.key;
    if(pressedKey === 'a' || pressedKey === 'A') {
        engine.gravity.x = -1;
        engine.gravity.y = 0;
    } else if (pressedKey === 'w' || pressedKey === 'W') {
        engine.gravity.x = 0;
        engine.gravity.y = -1;
    } else if (pressedKey === 'd' || pressedKey === 'D') {
        engine.gravity.x = 1;
        engine.gravity.y = 0;
    } else if (pressedKey === 's' || pressedKey === 'S') {
        engine.gravity.x = 0;
        engine.gravity.y = 1;
    } else if (pressedKey === 'p' || pressedKey === 'P') {
        engine.gravity.x = 0;
        engine.gravity.y = 0;
        Matter.Body.setVelocity(player, {x:0, y:0})
    }
})

//detect Collision
setInterval(()=> {
    if(Matter.Collision.collides(player, platform) != null) {
        let objToBeRemoved = [player, platform] //add here
        Matter.Composite.remove(engine.world, objToBeRemoved)
        
    }
}, 17)
//render obj
Matter.World.add(engine.world, [ground, ceiling, leftBound, rightBound, platform, player]);
Matter.Runner.run(engine);
Matter.Render.run(render);
