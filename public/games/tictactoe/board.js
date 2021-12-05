/**
* CLASS STRUCTURE FOR A BOARD
* - Store pieces, current player, and number of free spots
* - Check for a winner
* - Place pieces
* - Return a deep copy (by value, not reference)
**/
class Board {

  /* Constructor function is run when objects are created */
  constructor() {
    // Setup object proeprties
    this.grid = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0]
    ];
    this.currentPlayer = 1;
    this.freeSpots = 9;
  }


  /* Method to check for a winner, return 1 for player, -1 for computer, 0 for draw, null for no-one */
  checkForWinner() {
    // Check rows
    for (let r = 0; r <= 2; r++) {
      if (equals3(this.grid[r][0], this.grid[r][1], this.grid[r][2])) {
        return this.grid[r][0];
      }
    }
    // Check columns
    for (let c = 0; c <= 2; c++) {
      if (equals3(this.grid[0][c], this.grid[1][c], this.grid[2][c])) {
        return this.grid[0][c];
      }
    }
    // Check diagonals
    if (equals3(this.grid[0][0], this.grid[1][1], this.grid[2][2]) || equals3(this.grid[0][2], this.grid[1][1], this.grid[2][0])) {
      return this.grid[1][1];
    }
    // Check for draw
    if (this.freeSpots == 0) {
      return 0;
    }
    // Else, return null to indicate no winner or draw
    return null;
  }


  /* Method to place pieces on the board */
  place(x, y) {
    // Only place it if the given co-ordinates are between [0, 3]
    if (0 <= x && x <= 2 && 0 <= y && y <= 2) {
      this.grid[y][x] = this.currentPlayer;
      this.currentPlayer *= -1;
      this.freeSpots--;
    }
  }



}
