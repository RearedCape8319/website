/**
 * DECLARE GLOBAL VARIABLES FOR THE PROGRAM
 * - Head node of the snake
 * - Count of total segments to have
 * - Fixed point and flag for enabling
 * - Toggle fixed button location and diameter
 * - Toggle length button location and diameter
 * - Indicate if snake or arm
 **/
let head;
let totalSegs;
let fixedPoint, isFixing;
let fixedPos, fixedD;
let lenPos, lenD;
let arm;



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
  totalSegs = 6;
  head = makeSnake(totalSegs);
  fixedPos = createVector(50, 50);
  fixedD = 70;
  lenPos = createVector(width-50, 50);
  lenD = 70;
  arm = true;
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

  // Draw the toggle fixed button
  fill(360);
  noStroke();
  ellipse(fixedPos.x, fixedPos.y, fixedD, fixedD);
  textSize(14);
  fill(0);
  text("Toggle fixed point", (fixedPos.x-fixedD/3), (fixedPos.y-fixedD/3), 2.1*fixedD/3, 2.1*fixedD/3);

  // Draw the toggle length button
  fill(360);
  noStroke();
  ellipse(lenPos.x, lenPos.y, lenD, lenD);
  textSize(14);
  fill(0);
  text("Toggle snake length", (lenPos.x-lenD/3), (lenPos.y-lenD/3), 2.1*lenD/3, 2.1*lenD/3);
}



/**
 * DEFINE FUNCTION TO HANDLE MOUSE PRESS
 **/
function mousePressed() {
  if (dist(mouseX, mouseY, fixedPos.x, fixedPos.y) <= fixedD/2) {
    isFixing = !isFixing;
  } else if (dist(mouseX, mouseY, lenPos.x, lenPos.y) <= lenD/2) {
    if (arm) {
      totalSegs = 100;
    } else {
      totalSegs = 6;
    }
    arm = !arm;
    head = makeSnake(totalSegs);
  }
}



/**
 * DEFINE FUNCTION TO MAKE A SNAKE
 **/
function makeSnake(n) {
  let len = dist(0, 0, width, height) * 0.5 / n;
  let head = new Segment(width/2, height/2, len);
  for (let i = 1; i < n; i++) {
    head.addChild(len);
  }
  return head;
}
