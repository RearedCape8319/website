/**
 * DECLARE GLOBAL VARIABLES FOR THE PROGRAM
 * - Head node of the "snake"
 **/



/**
 * SETUP FUNCTION RUNS ONCE AT PROGRAM START
 * - Setup graphics canvas
 * - Initialise global variables
 **/
function setup() {
  let posinfo = document.getElementById("sketch-holder").getBoundingClientRect();
  let canvas = createCanvas(posinfo.width, posinfo.height);
  canvas.parent("sketch-holder");
}



/**
 * DRAW FUNCTION RUNS CONTINUOUSLY AFTER SETUP
 * - Redraw the background
 **/
function draw() {
  background(0);
}
