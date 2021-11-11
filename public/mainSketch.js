/*
LANDING PAGE WILL HAVE A CIRCLE WOBBLING DUE TO NOISY RANDOMNESS
*/

/* Declare global variables */
// Values to travel trhough noise space
let nOffset, nInc;

// Values to travel around the cirlce
let tInc, spots, maxLen;

// Values to randomise colour of cirlce
let hOff, hInc;



/* Setup function runs once before main loop */
function setup() {
  // Setup the canvas inside the dedicated html element
  let posinfo = document.getElementById("sketch-holder").getBoundingClientRect();
  let canvas = createCanvas(posinfo.width, posinfo.height);
  canvas.parent("sketch-holder");

  // Initialise global variables and graphics
  colorMode(HSB, 360, 100, 100, 100);
  // stroke(0);
  // strokeWeight(5);
  noStroke();

  nOffset = 0;
  nInc = 0.008;
  tInc = 0.35;
  spots = 500;
  maxLen = min(width, height)/2 * 1;
  hOff = 0;
  hInc = 0.003;
}



/* Draw function acts as a main loop that runs continuously after setup finishes */
function draw() {
  // Clear the screen
  background(274, 96.1, 20);

  // Draw the circle of points
  fill(noise(hOff, 10)*360, 100, 100);
  beginShape();
  for (let i = 0; i < spots; i++) {
    let angle = (i/spots) * TWO_PI;
    let nX = (cos(angle)+1) * tInc;
    let nY = (sin(angle)+1) * tInc;
    let nVal = noise(nX + nOffset, nY) * maxLen;
    let x = cos(angle)*nVal + width/2;
    let y = sin(angle)*nVal + height/2;
    vertex(x, y);
  }
  endShape(CLOSE);

  // Increment the noise offset
  nOffset += nInc;
  hOff += hInc;
}
