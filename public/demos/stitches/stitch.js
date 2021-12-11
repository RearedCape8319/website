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
  res = 15;
  grid = new Grid(width, height, res);

  // Show the pattern by calling the event handler that generates patterns
  mousePressed();
}



/* Function to handle mouse press event to generate new pattern */
function mousePressed() {
  topLabel = [];
  sideLabel = [];
  for (let i = 0; i < res; i++) {
    topLabel.push(floor(random(2)));
    sideLabel.push(floor(random(2)));
  }
  background(120);
  grid.show(sideLabel, topLabel);
}

function keyPressed() {
  if (key == "Enter" || key == " ") {
    mousePressed();
  }
}
