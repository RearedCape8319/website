/**
Class structure for a rotating vector
- Made with a position (center) and a frequency (n)
- Has a position, frequency, scalar, child
- Can give its value at a given time, 0<=t<=1
**/
class Rotator {
  // Constructor function to make a new object
  constructor(pos, freq) {
    this.center = pos.Copy();
    this.n = freq;
    this.scalar = new Complex(random(-50, 50), random(-50, 50));
    this.child = null;
  }

  // Method to give this object a child object
  giveChild(c) {
    if (this.child == null) {
      this.child = c;
    } else {
      this.child.giveChild(c);
    }
  }

  // Method to get the value of the vector at a given time, 0<=t<=1
  value(t) {
    let angle = TWO_PI * this.n * t;
    let spin = new Complex(cos(angle), sin(angle));
    spin = spin.Mult(this.scalar);
    spin = spin.Add(this.center);
    return spin;
  }

  // Method to show the vector to the screen with a given time, 0<=t<=1
  show(t) {
    let len = this.scalar.Mod();
    stroke(360, 60);
    strokeWeight(1);
    noFill();
    ellipse(this.center.re, this.center.im, len*2, len*2);
    let tail = this.value(t);
    strokeWeight(3);
    line(this.center.re, this.center.im, tail.re, tail.im);
    if (this.child != null) {
      this.child.show(t);
    }
  }

  // Method to update centers
  update(pos, t) {
    if (pos != null) {
      this.center = pos.Copy();
    }
    if (this.child != null) {
      this.child.update(this.value(t), t);
    }
  }

  // Method to return final value of the tails
  finalVal(t) {
    if (this.child == null) {
      return this.value(t);
    }
    return this.child.finalVal(t);
  }

  // Method to update the scalar value
  updateScalar(p) {
    let sum = new Complex(0, 0);
    let pathLen = p.length;
    let step = 1.0 / pathLen;
    for (let n = 0; n < pathLen; n++) {
      let t = float(n) / pathLen;
      let angle = (-TWO_PI * this.n * t);
      let result = new Complex(cos(angle), sin(angle));
      let tmp = p[n];
      result = result.Mult(new Complex(tmp.x, tmp.y));
      sum = sum.Add(result);
    }
    sum = sum.Scale(step);
    this.scalar = sum;
    if (this.child == null) {
      return;
    }
    this.child.updateScalar(p);
  }
}
