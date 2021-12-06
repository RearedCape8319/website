/**
* Class structure for a board
* - Created with a size
* - Player is in center-left of the board
* - Has a grid of spots
**/
class Board {

  /* Constructor function for creating a board of random squares */
  constructor(rows, columns) {
    this.grid = [];
    for (let r = 1; r <= rows; r++) {
      let row = [];
      for (let c = 1; c <= columns; c++) {
        row.push(null);
      }
      this.grid.push(row);
    }
    let midY = floor((rows-1) / 2);
    this.grid[midY][0] = new Pink();
    this.grid[midY][columns-1] = new Goal();
    this.r = rows;
    this.c = columns;
    this.spotSize = min(0.8*width/columns, 0.8*height/rows);
    this.playerPos = createVector(0, midY);
    this.generatePath();
    this.fillIn();
  }


  /* Method to show the board to the screen */
  show() {
    rectMode(CORNER);
    stroke(0);
    strokeWeight(1);
    // noStroke();
    let offset = createVector((width - this.c*this.spotSize) / 2, (height - this.r*this.spotSize) / 2);
    for (let r = 0; r < this.grid.length; r++) {
      for (let c = 0; c < this.grid[r].length; c++) {
        if (this.grid[r][c] == null) {
          continue;
        }
        fill(this.grid[r][c].colour);
        rect(offset.x + c*this.spotSize, offset.y + r*this.spotSize, this.spotSize, this.spotSize);
      }
    }
    ellipseMode(CENTER);
    let pos = offset.copy();
    pos.add((this.playerPos.x+0.5) * this.spotSize, (this.playerPos.y+0.5) * this.spotSize)
    fill(88, 88, 255);
    ellipse(pos.x, pos.y, this.spotSize*0.7, this.spotSize*0.7);
  }


  /* Method to generate the starting path */
  generatePath() {
    let current = this.playerPos.copy();
    let stack = [];
    let done = false;
    while (!done) {
      let possible = this.getNearby(current.copy(), stack, this.r, this.c);
      if (possible.length > 0) {
        let choice = random(possible);
        if (this.grid[choice.y][choice.x] instanceof Goal) {
          done = true;
        } else {
          stack.push(current.copy());
          let prev = this.grid[current.y][current.x];
          let spot = giveSpot(prev);
          current = choice.copy();
          this.grid[current.y][current.x] = spot;
        }
      } else {
        current = stack.pop();
      }
    }
  }


  /* Method to return positions next to a given spot, not including ones given */
  getNearby(loc, ignore, rows, cols) {
    let output = [];
    // Search the 8 surrounding squares from the given spot
    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        // Create a temporary copy of the new location
        let tmp = createVector(loc.x + x, loc.y + y);
        // Skip if the location has an index in the list of ignored locations
        if (ignore.indexOf(tmp) >= 0) {
          continue;
        }
        // Skip if one of the co-ordinates is negative
        if (tmp.y < 0 || tmp.x < 0 || tmp.y >= rows || tmp.x >= cols) {
          continue;
        }
        // Skip if both or neither offsets are 0 to skip current and diagonals
        if ((x == 0 && y == 0) || (x != 0 && y != 0)) {
          continue;
        }
        // If the spot is free, it is allowed to be included in the output
        if (this.grid[tmp.y][tmp.x] == null || this.grid[tmp.y][tmp.x] instanceof Goal) {
          output.push(tmp.copy());
        }
      }
    }
    return output;
  }


  /* Method to fill in the rest of the board */
  fillIn() {
    for (let r = 0; r < this.grid.length; r++) {
      for (let c = 0; c < this.grid[r].length; c++) {
        if (this.grid[r][c] == null) {
          this.grid[r][c] = giveSpot(null);
        }
      }
    }
  }




}
