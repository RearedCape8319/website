/**
 * DECLARE GLOBAL VARIABLES FOR USE IN THE PROGRAM
 * - NUMBER OF LONGITUDE AND LATITUDE DIVISIONS
 * - Array of each point along the surface of the sphere
 * - Radius of the sphere
 * - Variables for animation
 **/
let lonSteps, latSteps;
let globe;
let radius;
let mchange, minc;



/**
 * SETUP FUNCTION RUNS ONCE AT PROGRAM START
 * - Setup screen and settings
 * - Initialise global variables
 **/
function setup () {
  // Setup screen
  let posinfo = document.getElementById("sketch-holder").getBoundingClientRect();
  let canvas = createCanvas(posinfo.width, posinfo.height, WEBGL);
  canvas.parent("sketch-holder");
  colorMode(HSB, 360, 100, 100, 100);

  // Initialise global variables for sphere
  lonSteps = 60;
  latSteps = 60;
  radius = 100;
  globe = [];

  // Initialise global variables for animating
  mchange = 0;
  minc = TWO_PI / 360;
}



/**
 * DRAW FUNCTION RUNS CONTINUOUSLY AFTER SETUP
 * - Draw the sphere to the screen
 **/
function draw() {
  background(0);
  rotateX(HALF_PI*3/5);
  rotateZ(mchange);

  // Update the points around the shape
  mchange += minc;
  let m = map(-cos(mchange), -1, 1, 0, 13);
  for (let i = 0; i <= latSteps; i++) {
    let lat = map(i, 0, latSteps, -HALF_PI, HALF_PI);
    let r2 = supershape(lat, m, 0.2, 1.7, 1.7, 1.0, 1.0);
    let row = [];
    for (let j = 0; j <= lonSteps; j++) {
      let lon = map(j, 0, lonSteps, -PI, PI);
      let r1 = supershape(lon, m, 0.2, 1.7, 1.7, 1.0, 1.0);
      row[j] = getPoint(r1, r2, lat, lon);
    }
    globe[i] = row;
  }

  // Show the points around the shape
  noStroke();
  for (let i = 0; i < latSteps; i++) {
    beginShape(TRIANGLE_STRIP);
    for (let j = 0; j < latSteps+1; j++) {
      fill((map(j, 0, latSteps, 0, 360) + i*8) % 360, 100, 100);
      let pt1 = globe[i][j];
      let pt2 = globe[i+1][j];
      vertex(pt1.x, pt1.y, pt1.z);
      vertex(pt2.x, pt2.y, pt2.z);
    }
    endShape();
  }

  // Update animation variables
  if (mchange > TWO_PI) {
    mchange %= TWO_PI;
  }
}



/**
 * DEFINE USEFUL FUNTIONS FOR THE PROGRAM
 * - Function to return the radius at a given angle
 * - Function to return the PVector point given 2 angles
 **/

// Function to get a radius from given parameters and an angle
function supershape(theta, m, n1, n2, n3, a, b) {
  let left = pow(abs(1/a * cos(m*theta/4)), n2);
  let right = pow(abs(1/b * sin(m*theta/4)), n3);
  let r = pow(left+right, -1.0/n1);
  return r;
}

// Function to get the point at 2 given angles and radii
function getPoint(r1, r2, la, lo) {
  let x = r1 * cos(lo) * r2 * cos(la);
  let y = r1 * sin(lo) * r2 * cos(la);
  let z = r2 * sin(la);
  let output = createVector(x, y, z);
  output.mult(radius);
  return output;
}
