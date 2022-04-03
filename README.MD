![Screenshot|width=250px](./github/screenshot.png)

# Flumbox

[Marihacks 2021](marihacks.com) submission.

Flumbox is a puzzle game where you play as the _level_, not the box! The goal of the game is to move your box to the 
target location. Since you are the level, you will be controlling the _level_'s orientation and gravity rather than 
the box itself. Move everything at once, out of your way, and reach your goal!


### Technologies

We used HTML and CSS to display the Webpage itself and controls of the game. To simulate our physics, we have used 
[Matter.js](https://github.com/liabru/matter-js/blob/master/build/matter.js) as a physics library, and to have some 
creative liberty over the visual effects (in particular rotating), we have written our own renderer using the 
CanvasRenderingContext2D API built into the browser.


### Challenges

Among other things, the greatest challenge our group has faced was working with the physics library (Matter.js). We 
had to strike a balance between the physics engine's control over our mechanics and our own control over it. We had 
to nudge the physics engine itself on top of writing our own rendering engine to allow greater control over the 
game's rotation feature. We had to write our own collision detection for winning, and as the part of the code is 
particularly buggy due to both the limitations of the engine and of our abilities, we spent a lot of time designing 
and reworking levels such that they walk around the bugs of the base game while working around the clock to fix any 
bugs we have caught.

Our second major challenge was that the time limit meant that we could not fully polish our game and improve its 
user experience. The game only has a very basic introduction screen, with no tutorials and no great visual effects 
for transition between levels. It was difficult to coordinate UI design among the collaborators, as we were not 
using any UI framework, we had to work on different files and manually merge them together.
