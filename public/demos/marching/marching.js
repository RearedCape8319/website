/* Declare global variables */
let tOff, tInc;
let grid, nodeCount, nRes;


/* Setup function to run once before main loop */
function setup() {
  // Setup canvas and settings
  let posinfo = document.getElementById("sketch-holder").getBoundingClientRect();
  let canvas = createCanvas(posinfo.width, posinfo.height, P2D);
  canvas.parent("sketch-holder");
  rectMode(CORNER);
  colorMode(RGB, 255, 255, 255, 100);
  // colorMode(HSB, 360, 100, 100, 100);

  // Initialise global variables
  tOff = 0;
  tInc = 0.01;
  nOff = 0;
  nInc = 0.01;
  nodeCount = 50;
  nRes = 15 / nodeCount;
  grid = new Grid(width, height, nodeCount);
}


/* Draw function is the main loop that runs continuously until program ends */
function draw() {
  background(120);
  // background(50);
  grid.show();
  tOff += tInc;
}












// PLacehldere
