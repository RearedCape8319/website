/**
Declare global variables
- Max frequency to use and its increment
**/
let maxFreq = 1;
let freqInc = 1;
let drawPath = false;
let drawVectors = true;
let drawGuess = true;
let path = [];
let pathName;



/**
Setup function is run once at program start
- Setup screen and settings
- Initialise global variables
**/
function setup() {
  // Setup screen
  let posInfo = document.getElementById("sketch-holder").getBoundingClientRect();
  let canvas = createCanvas(posInfo.width, posInfo.height);
  canvas.parent("sketch-holder");
  colorMode(HSB, 360, 100, 100, 100);
  ellipseMode(CENTER);

  // Initialise the path
  if (path.length == 0) {
    getSquare();
  }

  // Initialise the rotating vectors
  let p = new Complex(0, 0);
  let f = 0;
  head = new Rotator(p, f);
  for (let f = 1; f <= maxFreq; f++) {
    head.giveChild(new Rotator(head.finalVal(0), f));
    head.giveChild(new Rotator(head.finalVal(0), -f));
  }
  head.updateScalar(path);

  // Initialise time and its increment for each frame
  time = 0;
  maxSamples = 200;
  tInc = 1.0 / maxSamples;

  // Initialise the guess of the path
  guess = [];
  currentIndex = 0;
}



/**
Draw function is run continuously after setup
- Draw the path
**/
function draw() {
  // Clear the background and translate
  background(0);
  translate(width/2, height/2);

  // Draw the path
  if (drawPath) {
    let ptCount = path.length;
    noFill();
    stroke(360, 25);
    strokeWeight(2);
    beginShape();
    for (let i = 0; i < ptCount; i++) {
      let pt = path[i];
      vertex(pt.x, pt.y);
    }
    endShape();
  }

  // Update the vectors and the guess path
  do {
    head.update(null, time);
    guess[currentIndex] = head.finalVal(time);
    // Increment time and current index
    time += tInc;
    time %= 1;
    currentIndex++;
    //} while (currentIndex < maxSamples);
  } while (false);

  // Draw the vectors
  if (drawVectors) {
    head.show(time);
  }

  // Say how many circles are showing
  fill(360);
  textSize(30);
  let s = "Number of circles: " + str((maxFreq*2)+1);
  text(s, -width/2 + 40, -height/2 + 80);
  s = "Drawing: " + pathName;
  text(s, -width/2 + 40, -height/2 + 160);

  // Draw the guess path
  if (drawGuess) {
    //stroke(map(currentIndex, maxSamples/10, maxSamples, 0, 360), 100, 100, 100);
    strokeWeight(3);
    noFill();
    beginShape();
    stroke(map(guess.length, 0, path.length, 0, 360), 100, 100);
    for (let i = 0; i < guess.length; i++) {
      let c = guess[i];
      vertex(c.re, c.im);
    }
    endShape();
  }

  // If all points have been calculated, reset current index, update nextFreq, re-setup the program
  if (currentIndex >= maxSamples) {
    currentIndex = 0;
    // maxFreq = (round(nextF((maxFreq*2)+1))-1)/2;
    maxFreq += freqInc;
    if (maxFreq >= 9999999 && maxFreq > 0) {
      // noLoop();
      maxFreq = 1;
    }
    setup();
  }
}



/**
Define useful functions for the program to use
- Function to return points array for the path
**/

// Function to return points along a square
function getSquare() {
  pathName = "Square";
  let len = min(width, height) * 0.35;
  let corners = [
    createVector(-len, -len),
    createVector(-len, len),
    createVector(len, len),
    createVector(len, -len),
  ];
  for (let i = 1; i < corners.length; i++) {
    for (let j = 0; j < 1; j += 0.01) {
      let x = lerp(corners[i%corners.length].x, corners[(i+1)%corners.length].x, j);
      let y = lerp(corners[i%corners.length].y, corners[(i+1)%corners.length].y, j);
      path.push(createVector(x, y));
    }
  }
}

// Function to return the next frequency according to a regression line
function nextF(f) {
  return round(-0.000428283934392227*f*f*f*f + 0.0386089963188692*f*f*f - 1.04523126486135*f*f + 11.5865025198886*f - 21.3601780699929);
}

// Function to return points along a pp shape
function getPP() {
  pathName = "Secret";
  let steps = 150;
  // Add ball 1
  for (let s = 0; s <= steps; s++) {
    let a = map(s, 0, float(steps), 0, 3*TWO_PI/4);
    let pt = createVector(cos(a), sin(a));
    pt.mult(50);
    pt.add(createVector(-50, (height/2)-125));
    path.push(pt);
  }
  // Add shaft 1
  for (let s = 0; s < steps; s++) {
    let perc = map(s, 0, steps, 0, 1);
    path.push(createVector(-50, lerp(100, -100, perc)));
  }
  // Add tip
  for (let s = 0; s < float(steps)/2; s++) {
    let a = map(s, 0, float(steps)/2, PI, TWO_PI);
    let pt = createVector(cos(a), sin(a));
    pt.mult(50);
    pt.add(createVector(0, -(height/2)+125));
    path.push(pt);
  }
  // Add shaft 2
  for (let s = 0; s < steps; s++) {
    let perc = map(s, 0, steps, 0, 1);
    path.push(createVector(50, lerp(-100, 100, perc)));
  }
  // Add ball 2
  for (let s = 0; s < steps; s++) {
    let a = map(s, 0, float(steps), 3*TWO_PI/4, 6*TWO_PI/4);
    let pt = createVector(cos(a), sin(a));
    pt.mult(50);
    pt.add(createVector(50, (height/2)-125));
    path.push(pt);
  }
}

// Function to return points along a heart
function getHeart() {
  pathName = "Heart";
  for (let a = 0; a <= TWO_PI; a += TWO_PI/500) {
    let pt = createVector(16*pow(sin(a), 3), 13*cos(a) - 5*cos(2*a) - 2*cos(3*a) - cos(4*a));
    pt.y = -pt.y;
    let myLimit = 0.8;
    let scale = min(width/32, height/30) * myLimit;
    path.push(createVector(pt.x * scale, pt.y * scale));
  }
}

// Method to swap the current path
function wantPath(n) {
  path = [];
  switch (n) {
    case 1:
      getSquare();
      break;
    case 2:
      getPP();
      break;
    case 3:
      getHeart();
      break;
    default:
      getSquare();
      break;
  }
  maxFreq = 1;
  setup();
}
