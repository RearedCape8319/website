/**
* Declare global variables for use in the program
* - Array of points, as particles
* - Done flag for video saving
**/
let points;
let hue = 0;



/**
* Setup function to be run once at program start ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
* - Setup the canvas and settings
* - Initialise the points array
**/
function setup() {
  //Setup canvas
  let posInfo = document.getElementById("sketch-holder").getBoundingClientRect();
  let canvas = createCanvas(posInfo.width, posInfo.height, P2D);
  canvas.parent("sketch-holder");
  //fullScreen(P2D);
  colorMode(HSB, 360, 100, 100, 100);
  // frameRate(30);

  // Setup points array
  points = [];
  points.push(new Particle(0, height/2));
  let count = 4;
  for (let i = 0; i < count; i++) {
    points.push(new Particle(random(width), random(height)));
  }
  points.push(new Particle(width, height/2));
  points[0].anchor = true;
  points[points.length-1].anchor = true;
}



/**
* Draw loop to run continuously after setup ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
* - Update and show the particles
* - Draw the chosen curve
**/
function draw() {
  // Reset the background
  background(0);

  // Update and draw each particle
  //points.get(1).move(mouseX, mouseY);
  for (let i = 1; i < points.length-1; i++) {
    points[i].update();
  }

  // Draw the Bezier curve
  noFill();
  beginShape();
  for (let perc = 0; perc <= 1.0001; perc += 0.005) {
    //PVector temp = linearBezier(points.get(0), points.get(points.size()-1), perc);
    //PVector temp = quadraticBezier(points.get(0), points.get(1), points.get(points.size()-1), perc);
    let temp = recursiveBezier(points, perc);
    //stroke(360);
    stroke(hue, 100, 100);
    hue += 0.005;
    hue %= 360;
    strokeWeight(7);
    vertex(temp.x, temp.y);
  }
  endShape();

  // Draw the points
  for (let i = 0; i < points.length; i++) {
    points[i].show(map(i, 1, points.length-1, 0, 360));
  }
}



/**
* Functions for doing the Bezier curve stuff ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
* - Linear one
* - Quadratic one
* - Any size one?
**/

// Linear Bezier curve (a straight line)
function linearBezier(a, b, t) {
  return createVector(lerp(a.pos.x, b.pos.x, t), lerp(a.pos.y, b.pos.y, t));
}

// Quadratic Bezier curve (one control point)
function quadraticBezier(a, b, c, t) {
  let x1, x2, y1, y2;
  x1 = lerp(a.pos.x, b.pos.x, t);
  x2 = lerp(b.pos.x, c.pos.x, t);
  y1 = lerp(a.pos.y, b.pos.y, t);
  y2 = lerp(b.pos.y, c.pos.y, t);
  //stroke(map(t, 0, 1, 0, 360), 100, 100);
  //strokeWeight(2);
  //line(x1, y1, x2, y2);
  let tempX = lerp(x1, x2, t);
  let tempY = lerp(y1, y2, t);
  return createVector(tempX, tempY);
}

// Recursive Bezier curve (many control points)
function recursiveBezier(spots, t) {
  // Base Case
  if (spots.length == 3) {
    return quadraticBezier(spots[0], spots[1], spots[2], t);
  }
  let left = [];
  let right = [];
  for (let i = 0; i < spots.length-1; i++) {
    left.push(spots[i]);
    right.push(spots[i+1]);
  }
  let lSpot = recursiveBezier(left, t);
  let rSpot = recursiveBezier(right, t);
  stroke(map(t, 0, 1, 0, 360), 100, 100);
  strokeWeight(2);
  //for (int i = 0; i < spots.size()-2; i++) {
  //  float x1 = lerp(spots.get(i).pos.x, spots.get(i+1).pos.x, t);
  //  float x2 = lerp(spots.get(i+1).pos.x, spots.get(i+2).pos.x, t);
  //  float y1 = lerp(spots.get(i).pos.y, spots.get(i+1).pos.y, t);
  //  float y2 = lerp(spots.get(i+1).pos.y, spots.get(i+2).pos.y, t);
  //  line(x1, y1, x2, y2);
  //}
  let tempX = lerp(lSpot.x, rSpot.x, t);
  let tempY = lerp(lSpot.y, rSpot.y, t);
  return createVector(tempX, tempY);
}
