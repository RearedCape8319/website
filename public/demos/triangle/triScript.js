/* Declare global variables */
let dot;
let corners;


/* Setup function to run once before main loop */
function setup() {
  // Setup canvas
  let posinfo = document.getElementById("sketch-holder").getBoundingClientRect();
  let canvas = createCanvas(posinfo.width, posinfo.height, P2D);
  canvas.parent("sketch-holder");

  // Initialise global variables
  dot = createVector(random(width), random(height));
  let s = min(width, height) * 0.8;
  let h = s*sqrt(3)/2;
  corners = [
    createVector(width/2, (height - h)/2),
    createVector((width + s)/2, (height+h)/2),
    createVector((width - s)/2, (height+h)/2)
  ];

  // Draw the triangle and dot
  background(120);
  stroke(0);
  strokeWeight(5);
  noFill();
  beginShape();
    for (let p of corners) {
      vertex(p.x, p.y);
    }
  endShape(CLOSE);
  stroke(255);
  strokeWeight(2);
  point(dot.x, dot.y);
}


/* Draw function is the main loop that runs continuously until program ends */
function draw() {
  // Update the dot's location
  let target = random(corners);
  let dist = createVector(target.x - dot.x, target.y - dot.y);
  dist.mult(0.5);
  dot.x += dist.x;
  dot.y += dist.y;

  // Draw the dot
  stroke(255);
  strokeWeight(2);
  point(dot.x, dot.y);
}












// PLacehldere
