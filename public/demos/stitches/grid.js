/**
* Class structure for a grid
* - Needs to have co-ordinate of top-left corner
* - Needs to have a total size and line size
* - Needs a method to show the grid with given labels
**/
class Grid {
  // Constructor function
  constructor(maxW, maxH, res) {
    this.totalSize = min(maxW, maxH) * 0.8;
    this.topLeft = createVector((maxW-this.totalSize)/2, (maxH-this.totalSize)/2);
    this.lineSize = this.totalSize / (res - 1);
    this.resolution = res;
  }

  show(labelH, labelV) {
    stroke(0);
    strokeWeight(10);
    for (let i = 0; i < this.resolution; i++) {
      for (let j = 0; j < this.resolution; j++) {
        let pos = createVector(this.topLeft.x + j*this.lineSize, this.topLeft.y + i*this.lineSize)
        point(pos.x, pos.y);
      }
    }
    strokeWeight(2);
    noFill();
    // rect(this.topLeft.x, this.topLeft.y, this.totalSize, this.totalSize);
    for (let i = 0; i <= min(labelH.length, this.resolution); i++) {
      for (let j = 0; j <= min(labelV.length, this.resolution); j++) {
        let pos = createVector(this.topLeft.x + (j * this.lineSize), this.topLeft.y + (i * this.lineSize));
        // Draw horizontal lines
        if ((labelH[i] == j % 2) && (j < this.resolution - 1)) {
          line(pos.x, pos.y, pos.x + this.lineSize, pos.y);
        }
        // Draw vertical lines
        if ((labelV[j] == i % 2) && (i < this.resolution - 1)) {
          line(pos.x, pos.y, pos.x, pos.y + this.lineSize);
        }
      }
    }
  }
}
