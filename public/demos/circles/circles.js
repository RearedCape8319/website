/**
 * DECLARE GLOBAL VARIABLES
 * - Noise field for every pixel and noise increment
 * - The array of circles
 * - Max attempts for making new circles and max count of circles
 * - Cat image and width and height
 **/
let noiseField, nInc, nSize;
let circles, circleCount;
let maxAttempts, maxCircles;
let catImg, catW, catH, catScl, catOffset;



/**
 * PRELOAD FUNCTION RUNS ONCE BEFORE SETUP
 * - Load the cat image
 **/
function preload() {
  catImg = loadImage("../../images/cat.jpg");
}



 /**
  * SETUP FUNCTION RUNS ONCE AT PROGRAM START
  * - Setup canvas and settings
  * - Initialise global variables
  **/
function setup() {

  // Create canvas
  let posinfo = document.getElementById("sketch-holder").getBoundingClientRect();
  let canvas = createCanvas(posinfo.width, posinfo.height);
  canvas.parent("sketch-holder");

  // Setup graphic settings
  colorMode(HSB, 360, 100, 100, 100);
  // colorMode(RGB, 255, 255, 255, 100);
  ellipseMode(CENTER);
  rectMode(CORNER);

  // Initialise noise field
  nInc = 0.2;
  nSize = 10;
  noiseField = [];
  for (let i = 0; i < height/nSize; i++) {
    let row = [];
    for (let j = 0; j < width/nSize; j++) {
      row.push(noise(j*nInc, i*nInc));
    }
    noiseField.push([...row]);
  }

  // Initialise cat image dimensions
  catScl = min(height/catImg.height, width/catImg.width);
  catW = floor(catImg.width * catScl);
  catH = floor(catImg.height * catScl);
  catImg.resize(catW, catH);
  catOffset = createVector((width - catW)/2, (height - catH)/2);

  // Initialise circles
  maxAttempts = 50;
  maxCircles = 3000;
  circleCount = 150;
  circles = [];
  for (let i = 0; i < circleCount; i++) {
    createCircle();
  }
}



/**
 * DRAW FUNCTION RUNS CONTINUOUSLY AFTER SETUP
 * - Clear the screen
 * - Show the circles
 * - Stop animating if needed
 **/
function draw() {

  // Clear the screen
  background(0);

  // Show all circles
  for (let c of circles) {
    c.update(circles);
    c.show();
  }

  // Stop animating
  if (circles.length >= maxCircles) {
    console.log("Too many circles");
    noLoop();
  }

  // image(catImg, catOffset.x, catOffset.y);
  if (frameRate() <= 0.5 && frameCount > 10) {
    console.log("Too slow");
    noLoop();
  }
}



/**
 * DEFINE USEFUL FUNCTIONS FOR THE PROGRAM
 * - Make a new circle
 **/
function createCircle() {
  let valid = false;
  let attempts = 0;
  pos = createVector();
  while (!valid) {
    valid = true;
    pos = createVector(random(catImg.width), random(catImg.height));
    attempts++;
    for (let c of circles) {
      if (dist(pos.x, pos.y, c.position.x, c.position.y) <= c.radius) {
        valid = false;
        break;
      }
    }
    if (attempts == maxAttempts) {
      console.log("Too many attempts");
      noLoop();
      return;
    }
  }
  let c = noiseField[floor(pos.y/nSize)][floor(pos.x/nSize)];
  c *= 360;
  c = color(c, 100, 100);
  // let c = catImg.get(pos.x, pos.y);
  circles.push(new Blob(pos.copy(), c));
}
