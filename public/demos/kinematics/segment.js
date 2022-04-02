/**
 * CLASS STRUCTURE FOR A SEGMENT OF THE SNAKE
 **/
class Segment {

  // Object constructor
  constructor(x, y, l) {
    this.start = createVector(x, y);
    this.len = l;
    this.angle = 0;
    this.child = null;
  }

  // Method to calculate the segment's end point
  calculateEnd() {
    let output = createVector(0, 0);
    output.x = this.start.x + this.len*cos(this.angle);
    output.y = this.start.y + this.len*sin(this.angle);
    return output;
  }

  // Method to show the segment to the screen
  show(i, total) {
    stroke(map(float(i)/total, 0, 1, 0, 360), 100, 100);
    strokeWeight(map(float(i)/total, 0, 1, 15, 1));
    let end = this.calculateEnd();
    line(this.start.x, this.start.y, end.x, end.y);
    if (this.child != null) {
      this.child.show(i+1, total);
    }
  }

  // Method to add a child
  addChild(l) {
    if (this.child != null) {
      this.child.addChild(l);
    } else {
      let end = this.calculateEnd();
      this.child = new Segment(end.x, end.y, l);
    }
  }

  // Method to update the segment
  update(targetX, targetY) {
    let end = this.calculateEnd();
    let dir = createVector(end.x - targetX, end.y - targetY);
    this.angle = dir.heading();
    this.start.set(targetX, targetY);
    end = this.calculateEnd();
    if (this.child != null) {
      return this.child.update(end.x, end.y);
    }
    return createVector(fixedPoint.x - end.x, fixedPoint.y - end.y);
  }

  // Method to move all nodes
  move(m) {
    this.start.add(m);
    if (this.child != null) {
      this.child.move(m);
    }
  }

}
