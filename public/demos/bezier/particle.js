/**
* Particle class structure
* - Position
* - Velocity
* - Noise object and controls
* - Maximum speed
* - Size
**/

class Particle {

  // Constructor function to take in a position and setup object properties
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.nOff = 0;
    this.relOff = random(100);
    this.otherOff = random(1000);
    this.nInc = 0.005;
    this.maxSpeed = 2.5;
    this.size = 50;
    this.anchor = false;
  }

  // Method to update the position with noise
  update() {
    this.pos.x = noise(this.nOff + this.relOff, this.otherOff) * width;
    this.pos.y = noise(this.nOff, this.otherOff) * height;
    this.nOff += this.nInc;
  }

  // Method to explicitly move to a given position
  move(x, y) {
    this.pos.x = x;
    this.pos.y = y;
  }

  // Method to show the particle to the screen
  show(hue) {
    strokeWeight(this.size);
    if (this.anchor) {
      stroke(360);
    } else {
      stroke(hue, 100, 100, 40);
    }
    point(this.pos.x, this.pos.y);
  }
}
