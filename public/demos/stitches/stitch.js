/* Declare global variables */
let grid, labels, res, topLabel, sideLabel;


/* Setup function to run once before main loop */
function setup() {
  // Setup canvas and settings
  let posinfo = document.getElementById("sketch-holder").getBoundingClientRect();
  let canvas = createCanvas(posinfo.width, posinfo.height);
  canvas.parent("sketch-holder");
  rectMode(CORNER);

  // Initialise global variables
  res = 10;
  grid = new Grid(width, height, res);
  topLabel = [];
  sideLabel = [];
  for (let i = 0; i < res; i++) {
    topLabel.push(floor(random(2)));
    sideLabel.push(floor(random(2)));
  }

  // Show the pattern
  background(120);
  grid.show(sideLabel, topLabel);
}













// PLacehldere
