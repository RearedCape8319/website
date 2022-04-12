/**
 * CLASS STRUCTURE FOR A BLOB
 * - Made with a position and colour
 * - Can grow radius by 1
 * - Can test to see if intersecting other circles
 * - Can update the blob given an array of blobs
 * - Can be shown to the screen
 **/
class Blob {

  // Object constructor
  constructor(p, c) {
    this.position = p.copy();
    this.colour = c;
    this.radius = 1;
    this.growing = true;
  }

  // Method to grow the blob
  grow() {
    this.radius += 1;
  }

  // Method to test for intersecting another blob
  intersect(other) {
    let x1 = this.position.x;
    let x2 = other.position.x;
    let y1 = this.position.y;
    let y2 = other.position.y;
    if (dist(x1, y1, x2, y2) <= this.radius + other.radius) {
      this.growing = false;
      other.growing = false;
      createCircle();
    }
  }

  // Method to update the blob
  update(others) {
    if (!this.growing) {
      return;
    }
    for (let o of others) {
      if (o == this) {
        continue;
      }
      this.intersect(o);
    }
    if (this.growing) {
      this.grow();
    }
  }

  // Method to show the circle to the screen
  show() {
    noStroke();
    fill(this.colour);
    let pos = this.position.copy();
    pos.add(catOffset);
    ellipse(pos.x, pos.y, this.radius*2);
  }

}
