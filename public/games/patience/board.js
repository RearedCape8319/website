/**
* Class structure for a board
* - Created with a size
* - Player is in center-left of the board
* - Has a grid of spots
**/
class Board {

  // Constructor function for creating a board of random squares
  constructor(rows, columns) {
    this.grid = [];
    for (let r = 1; r <= rows; r++) {
      let row = [];
      for (let c = 1; c <= columns; c++) {
        row.push(new Pink());
      }
      this.grid.push(row);
    }
    let midY = floor(rows / 2);
    this.grid[midY][columns-1] = new Goal();
  }


  // Method to show the board to the screen
  show(maxWidth, maxHeight) {
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ TO DO
  }

}
