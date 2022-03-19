/**
 * DECLARE GLOBAL VARIABLES FOR USE IN THE PROGRAM
 * - Head node of the tree
 **/



/**
 * SETUP FUNCTION RUNS ONCE AT PROGRAM START
 * - Setup the canvas and settings
 **/
function setup() {
  let posInfo = document.getElementById("sketch-holder").getBoundingClientRect();
  let canvas = createCanvas(posInfo.width, posInfo.height);
  canvas.parent("sketch-holder");
  colorMode(HSB, 360, 100, 100, 100);
}



/**
 * DRAW FUNCTION RUNS CONTINUOUSLY AFTER SETUP
 **/
function draw() {
  background(frameCount % 360, 100, 100);
}
