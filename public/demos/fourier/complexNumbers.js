/**
Class structure for a complex number
- Has real and imaginary components
- Can add, subtract, multiply, divide, square, give the conjugate, modulus, and argument
**/
class Complex {
  // Constructor given both parts
  constructor(a, b) {
    this.re = a;
    this.im = b;
  }

  // Returns the output of addition with a given complex number
  Add(c) {
    let a = this.re + c.re;
    let b = this.im + c.im;
    return new Complex(a, b);
  }

  // Returns the output of subtraction with a given complex number
  Sub(c) {
    let a = this.re - c.re;
    let b = this.im - c.im;
    return new Complex(a, b);
  }

  // Returns the output of multiplication with a given complex number
  Mult(c) {
    let a = (this.re * c.re) - (this.im * c.im);
    let b = (this.re * c.im) + (this.im * c.re);
    let output = new Complex(a, b);
    return output;
  }

  // Returns the output of multiplication with a given scalar
  Scale(s) {
    return new Complex(this.re*s, this.im*s);
  }

  // Returns the output of division with a given complex number
  Div(other) {
    let a = this.re;
    let b = this.im;
    let c = other.re;
    let d = other.im;
    let r = (a*c - b*d) / (c*c + d*d);
    let i = (b*c - a*d) / (c*c + d*d);
    return new Complex(r, i);
  }

  // Returns the output of squaring the number
  Square() {
    let a = (this.re * this.re) - (this.im * this.im);
    let b = (2 * this.re * this.im);
    return new Complex(a, b);
  }

  // Returns the complex conjugate of the number
  Conjugate() {
    return new Complex(this.re, -this.im);
  }

  // Returns the modulus/absolute value of the number
  Mod() {
    return sqrt((this.re*this.re) + (this.im*this.im));
  }

  // Returns the angle the number makes with the positive real axis anti-clockwise
  Arg() {
    let sign = (this.im/abs(this.im));
    return sign * atan(abs(this.im/this.re));
  }

  // Returns a copy of this number
  Copy() {
    return new Complex(this.re, this.im);
  }

  // Print the values
  printMe() {
    console.log(this.re, this.im);
  }
}
