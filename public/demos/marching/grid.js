/**
* Class structure for a grid
* - Has node values
* - Can show node values to the screen
**/
class Grid {

  // Constructor function to setup the grid
  constructor(maxW, maxH, r) {
    this.fullSize = min(maxW, maxH) * 0.9;
    this.topLeft = createVector((maxW-this.fullSize)/2, (maxH-this.fullSize)/2);
    this.res = r;
    this.lineSize = this.fullSize / r;
  }


  // Method to show the grid to the screen
  show() {
    noStroke();
    for (let i = 0; i < this.res; i++) {
      for (let j = 0; j < this.res; j++) {
        let pos = this.topLeft.copy().add(createVector(j*this.lineSize, i*this.lineSize));
        let gVal = noise(j*nRes, i*nRes, tOff) * 255;
        fill(gVal);
        // let hVal = noise(j*nRes, i*nRes, tOff) * 360;
        // fill(hVal, 100, 100);
        rect(pos.x, pos.y, this.lineSize, this.lineSize);
      }
    }
  }
}
