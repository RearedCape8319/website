/**
Class structure for a noise field
- Has a resolution, noise increment, position of top-left corner, size of field
- Can give a 2d array of noise values and 4 noise values for a given index and time
**/
class Field {
  // Constructor function to initialise the object
  constructor(r, ni, tl, s) {
    this.res = r;
    this.nInc = ni;
    this.pos = tl.copy();
    this.size = s;
    this.len = this.size / this.res;
  }

  // Method to return a grid of noise values for a given time
  allValues(time) {
    let grid = [];
    for (let i = 0; i <= this.res; i++) {
      let row = [];
      for (let j = 0; j <= this.res; j++) {
        row.push(noise(j*this.nInc, i*this.nInc, time));
      }
      grid.push(row);
    }
    return grid;
  }

  // Method to show the field to the screen at a given time
  show(time) {
    push();
    translate(this.pos.x, this.pos.y);
    strokeWeight(1);
    let grid = this.allValues(time);
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
        fill(map(grid[i][j], 0, 1, 0, 255));
        stroke(map(grid[i][j], 0, 1, 0, 255));
        rect(j*this.len, i*this.len, this.len, this.len);
        // strokeWeight(len);
        // point(j*len, i*len);
      }
    }
    pop();
  }

  // Method to show the marching squares to the screen at a given time
  march(time) {
    push();
    translate(this.pos.x, this.pos.y);
    stroke(255, 0, 0);
    strokeWeight(2);
    let grid = this.allValues(time);
    for (let i = 0; i < grid.length-1; i++) {
      for (let j = 0; j < grid[i].length-1; j++) {
        let a = round(grid[i][j]);
        let b = round(grid[i][j+1]);
        let c = round(grid[i+1][j+1]);
        let d = round(grid[i+1][j]);
        let n = this.BtoI(a, b, c, d);
        let A = createVector((j+0.5)*this.len, i*this.len);
        let B = createVector((j+1)*this.len, (i+0.5)*this.len);
        let C = createVector((j+0.5)*this.len, (i+1)*this.len);
        let D = createVector(j*this.len, (i+0.5)*this.len);
        if (n == 5 || n == 7 || n == 8) {
          line(A.x, A.y, D.x, D.y);
        }
        if (n == 4 || n == 10 || n == 11) {
          line(A.x, A.y, B.x, B.y);
        }
        if (n == 1 || n == 10 || n == 14) {
          line(C.x, C.y, D.x, D.y);
        }
        if (n == 2 || n == 5 || n == 13) {
          line(B.x, B.y, C.x, C.y);
        }
        if (n == 9 || n == 6) {
          line(A.x, A.y, C.x, C.y);
        }
        if (n == 3 || n == 12) {
          line(B.x, B.y, D.x, D.y);
        }
      }
    }
    pop();
  }

  // Method to turn 4 integers [0,1] into a number
  BtoI(a, b, c, d) {
    return a*8 + b*4 + c*2 + d;
  }

}
