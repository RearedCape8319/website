/* Declare global variables */
let res, len;
let size, offset;
let nScl, tVal, tInc;



/* Setup function to be ran once at program start */
function setup() {
  // Setup canvas
  let posinfo = document.getElementById("sketch-holder").getBoundingClientRect();
  let canvas = createCanvas(posinfo.width, posinfo.height);
  canvas.parent("sketch-holder");
  rectMode(CENTER);
  // colorMode(HSB, 360, 100, 100, 100);
  colorMode(RGB, 255, 255, 255, 255);

  // Initialise global variables
  res = 60;
  size = min(width, height) * 0.9;
  offset = createVector((width-size)/2, (height-size)/2);
  len = size / res;
  nScl = 0.008;
  tVal = 0;
  tInc = 0.005;
}



/* Draw function to be ran continuously after setup funciton */
function draw() {
  // Draw the noise values
  noStroke();
  for (let i = 0; i < res; i++) {
    for (let j = 0; j < res; j++) {
      let x = i*len + offset.x;
      let y = j*len + offset.y;
      // fill(noise(x, y) * 360, 100, 100);
      fill(noise(x*nScl, y*nScl, tVal) * 255);
      rect(x, y, len, len);
    }
  }

  // Increment time
  tVal += tInc;
}
