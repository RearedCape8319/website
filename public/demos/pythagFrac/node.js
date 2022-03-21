/**
 * CLASS STRUCTURE FOR A NODE IN THE TREE
 * - Made with two base corners
 * - Has four corners and the triangle tip as well as a size
 **/
class Node {

    // Constructor, given bottom corner positions, count of iteration depth, and angle offset
    constructor(pt1, pt2, iteration, extraAngle) {
      this.angle = atan2(pt2.y-pt1.y, pt2.x-pt1.x);
      this.size = dist(pt1.x, pt1.y, pt2.x, pt2.y);
      this.iteration = iteration;
      let top = pt1.copy();
      top.add(pt2);
      top.mult(0.5);
      this.corners = [pt1, pt2, pt2.copy(), top, pt1.copy()];
      let offset = createVector(cos(this.angle - PI/2), sin(this.angle - PI/2));
      offset.mult(this.size);
      this.corners[2].add(offset);
      this.corners[4].add(offset);
      let extraBit = sqrt(2)/2*sin(extraAngle) + 1;
      offset.mult(extraBit);
      this.corners[3].add(offset);
      if (iteration < maxIterations) {
        this.left = new Node(this.corners[4].copy(), this.corners[3].copy(), iteration+1, extraAngle);
        this.right = new Node(this.corners[3].copy(), this.corners[2].copy(), iteration+1, extraAngle);
      }
    }

    show() {
      stroke(0);
      strokeWeight(1);
      // noFill();
      fill(map(this.iteration, 1, maxIterations, 0, 360), 100, 100);
      beginShape();
      for (let i = 0; i < this.corners.length; i++) {
        let c = this.corners[i];
        vertex(c.x, c.y);
      }
      endShape(CLOSE);
      if (this.left != null) {
        this.left.show();
      }
      if (this.right != null) {
        this.right.show();
      }
    }

}
