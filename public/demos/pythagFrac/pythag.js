/**
 * DECLARE GLOBAL VARIABLES FOR USE IN THE PROGRAM
 * - Head node of the tree
 * - Angle and increment
 * - Tree initial position and length
 * - Maximum number of iterations
 **/
let head;
let angle, aInc;
let treeX, treeY, len;
let maxIterations;



/**
 * SETUP FUNCTION RUNS ONCE AT PROGRAM START
 * - Setup the canvas and settings
 * - Initialise global variables
 **/
function setup() {
  let posInfo = document.getElementById("sketch-holder").getBoundingClientRect();
  let canvas = createCanvas(posInfo.width, posInfo.height);
  canvas.parent("sketch-holder");
  colorMode(HSB, 360, 100, 100, 100);

  angle = 0;
  aInc = PI/4 / 200;
  len = min(width/7, height/6);
  treeX = (width - 6*len) / 2 + (2.5 * len);
  treeY = height - (len);
  maxIterations = 10;
}



/**
 * DRAW FUNCTION RUNS CONTINUOUSLY AFTER SETUP
 **/
function draw() {
  background(0);
  head = new Node(createVector(treeX, treeY), createVector(treeX + len, treeY), 1, angle);
  head.show();
  angle += aInc;
  if (angle > 7*PI/24 || angle < 0) {
    aInc *= -1;
  }
}
