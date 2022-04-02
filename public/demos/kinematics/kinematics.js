/**
 * DECLARE GLOBAL VARIABLES FOR THE PROGRAM
 * - Head node of the snake
 * - Count of total segments to have
 * - Fixed point and flag for enabling
 * - Toggle button location and diameter
 **/
let head;
let totalSegs;
let fixedPoint, isFixing;
let togglePos, toggleD;



/**
 * SETUP FUNCTION RUNS ONCE AT PROGRAM START
 * - Setup graphics and settings
 * - Initialise global variables
 **/
function setup() {

  // Setup graphics
  let posinfo = document.getElementById("sketch-holder").getBoundingClientRect();
  // if (posinfo.height > posinfo.width) {
  //   posinfo.height *= 0.85;
  // }
  let canvas = createCanvas(posinfo.width, posinfo.height);
  canvas.parent("sketch-holder");
  colorMode(HSB, 360, 100, 100, 100);

  // Initialise global variables
  isFixing = false;
  fixedPoint = createVector(width/2, height);
  totalSegs = 100;
  let len = sqrt(width*width + height*height) / (3 * totalSegs);
  head = new Segment(width/2, height/2, len);
  for (let i = 1; i < totalSegs; i++) {
    head.addChild(len);
  }
  togglePos = createVector(50, 50);
  toggleD = 70;
}



/**
 * DRAW FUNCTION RUNS CONTINUOUSLY AFTER SETUP
 * - Clear screen
 * - Update the segments
 * - Draw each segment
 * - Draw the toggle button
 **/
function draw() {

  // Clear screen
  background(0);

  // Update segments
  let diff = head.update(mouseX, mouseY);
  if (isFixing) {
    head.move(diff);
  }

  // Draw segments
  head.show(0, totalSegs);

  // Draw the toggle button
  fill(360);
  noStroke();
  ellipse(togglePos.x, togglePos.y, toggleD, toggleD);
  textSize(14);
  fill(0);
  text("Toggle fixed point", (togglePos.x-toggleD/3), (togglePos.y-toggleD/3), 2.1*toggleD/3, 2.1*toggleD/3);
}



/**
 * DEFINE FUNCTION TO HANDLE MOUSE PRESS
 **/
function mousePressed() {
  if (dist(mouseX, mouseY, togglePos.x, togglePos.y) <= toggleD/2) {
    isFixing = !isFixing;
  }
}
