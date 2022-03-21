/**
 * DECLARE GLOBAL VARIABLES
 * - o, B, p to best fit Greek terminology in mathematical definition
 * - "Time" increment for speed control
 * - Array of paths and path count
 * - Tiny nudge to input points
 * - Angle and increment
 * - Length of paths
 **/
let o, B, p;
let tInc;
let paths;
let pathCount;
let nudge;
let angle, aInc;
let pathLen;



/**
 * SETUP FUNCTION RUNS ONCE AT APPLICATION START
 **/
function setup() {
  // Setup canvas and settings
  let posinfo = document.getElementById("sketch-holder").getBoundingClientRect();
  let canvas = createCanvas(posinfo.width, posinfo.height, WEBGL);
  canvas.parent("sketch-holder");
  colorMode(HSB, 360, 100, 100, 100);

  // Initialise Lorenz variables
  o = 10.0;
  B = 8.0 / 3.0;
  p = 28.0;

  // Initialise time increment
  tInc = 0.006;

  // Initialise paths
  pathCount = 10;
  nudge = createVector(0.01, 0.01, 0.01);
  paths = [];
  for (let i = 0; i < pathCount; i++) {
    let tmp = createVector(-13, 15, 30);
    tmp.add(nudge.copy().mult(i));
    paths[i] = [];
    paths[i].push(tmp.copy());
  }

  // Initialise angle and increment
  angle = -4*PI/3;
  aInc = TWO_PI / 1500;

  // Initialise the length of each path
  pathLen = 600;
}



/**
 * DRAW FUNCTION RUNS CONTINUOUSLY AFTER SETUP
 * - Calculate next point for each path
 * - Draw all of the current points for each path
 * - Increment angle
 **/
function draw() {
  // Calculate next points
  for (let i = 0; i < pathCount; i++) {
    let pt = paths[i][paths[i].length - 1].copy();
    pt.x += dx(pt);
    pt.y += dy(pt);
    pt.z += dz(pt);
    paths[i].push(pt.copy());
    if (paths[i].length > pathLen) {
      paths[i].splice(0, 1);
    }
  }

  // Draw all paths of points
  rotateY(angle);
  background(0);
  noFill();
  for (let i = 0; i < pathCount; i++) {
    strokeWeight(2);
    beginShape();
    for (let j = 0; j < paths[i].length; j++) {
      // Stroke is unique for whichever path
      stroke(map(i, 0, pathCount, 0, 360), 100, 100, map(j, 0, paths[i].length, 0, 100));
      let pt = paths[i][j].copy();
      // Scaling for visuals
      pt.mult(6);
      vertex(pt.x, pt.y, pt.z);
    }
    endShape();

    // Draws the current points after path so they stand out
    strokeWeight(15);
    stroke(map(i, 0, pathCount, 0, 360), 100, 100);
    let pt = paths[i][paths[i].length - 1].copy();
    pt.mult(6);
    point(pt.x, pt.y, pt.z);
  }

  // Increment angle
  angle += aInc;
  angle %= TWO_PI;
}



/**
 * DEFINE USEFUL FUNCTIONS FOR THE PROGRAM
 * - The derivatives for each term given a point
 **/

// Derivative of x
function dx(pt) {
  return (o * (pt.y - pt.x)) * tInc;
}

// Derivative of y
function dy(pt) {
  return (pt.x*(p - pt.z) - pt.y) * tInc;
}

//Derivative of z
function dz(pt) {
  return (pt.x*pt.y - B*pt.z) * tInc;
}
