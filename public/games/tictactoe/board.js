/**
* CLASS STRUCTURE FOR A BOARD
* - Store pieces, current player, number of free spots, size
* - Check for a winner
* - Place pieces
* - Return a deep copy (by value, not reference)
* - Return all possible moves
**/
class Board {

  /* Constructor function for when the original board is made */
  constructor(s) {
    // Setup object proeprties
    this.grid = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0]
    ];
    this.currentPlayer = 1;
    this.freeSpots = 9;
    this.fullSize = s;
    this.spotSize = s/3;
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
    // Return fasle to indicate invalid place request
    if (0 > x || x > 2 || 0 > y || y > 2) {
      return false;
    }
    if (this.grid[y][x] != 0) {
      return false;
    }
    this.grid[y][x] = this.currentPlayer;
    this.currentPlayer *= -1;
    this.freeSpots--;
    return true;
  }


  /* Method to return a deep copy of the board */
  deepCopy() {
    let b = [];
    for (let r = 0; r <= 2; r++) {
      b.push(this.grid[r].slice());
    }
    let copy = new Board(this.fullSize);
    copy.grid = b;
    copy.currentPlayer = this.currentPlayer;
    copy.freeSpots = this.freeSpots;
    return copy;
  }


  /* Method to return all posisble moves */
  possibleMoves() {
    let output = [];
    for (let r = 0; r <= 2; r++) {
      for (let c = 0; c <= 2; c++) {
        if (this.grid[r][c] == 0) {
          output.push([c, r]);
        }
      }
    }
    return output;
  }



}
