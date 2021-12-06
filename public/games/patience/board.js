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
    let midY = floor(rows / 2);
    this.grid[midY][0] = new Pink();
    this.grid[midY][columns-1] = new Goal();
    this.r = rows;
    this.c = columns;
    this.spotSize = min(0.8*width/columns, 0.8*height/rows);
    this.playerPos = createVector(0, midY);
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

}
