/**
Declare global variables for use in the program
- The noise field
- Time counter and increment
**/
let field;
let time, tInc;



/**
Setup function to be ran once at program start
- Setup screen and settings
- Initialise global variables
**/
function setup() {
  // Setup canvas
  let posinfo = document.getElementById("sketch-holder").getBoundingClientRect();
  let canvas = createCanvas(posinfo.width, posinfo.height);
  canvas.parent("sketch-holder");
  rectMode(CENTER);
  colorMode(RGB, 255, 255, 255, 255);

  // Initialise the noise field
  let size = min(width, height) * 0.9;
  let offset = createVector((width-size)/2, (height-size)/2);
  field = new Field(40, 0.15, offset, size);

  // Initialise time
  time = 0;
  tInc = 0.005;
}



/**
Draw function runs continuously after setup
- Show the noise field
- Show the marching squares
- Increment time
**/
function draw() {
  // Show the noise field
  background(0);
  field.show(time);

  // Show the marching squares
  field.march(time);

  // Increment time
  time += tInc;
}
