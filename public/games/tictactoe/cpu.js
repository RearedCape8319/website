/**
* CLASS STRUCTURE FOR A CPU
* - Method to get best next move
* - Method to get best scoring next board
**/
class Cpu {

  /* Constructor function to setup the cpu */
  constructor() {
    console.log("CPU CREATED");
  }


  /* Method to get the best move */
  getMove(b) {
    // let possible = b.possibleMoves();
    // return random(possible);
    let moves = b.possibleMoves();
    let daughterScores = [];
    for (let m of moves) {
      let daughter = b.deepCopy();
      daughter.place(m[0], m[1]);
      let score = this.minimaxVal(daughter);
      daughterScores.push(score);
    }
    let desiredScore = null;
    if (b.currentPlayer == 1) {
      desiredScore = max(daughterScores);
    } else if (b.currentPlayer == -1) {
      desiredScore = min(daughterScores);
    }
    let index = daughterScores.indexOf(desiredScore);
    return moves[index];
  }


  /* Method to get the best scoring daughter board from the current one */
  minimaxVal(b) {
    if (b.freeSpots == 0) {
      return this.staticEval(b);
    }
    let daughterScores = [];
    for (let m of b.possibleMoves()) {
      let daughter = b.deepCopy();
      daughter.place(m[0], m[1]);
      let score = this.minimaxVal(daughter);
      daughterScores.push(score);
    }
    if (b.currentPlayer == 1) {
      return max(daughterScores);
    } else if (b.currentPlayer == -1) {
      return min(daughterScores);
    }
    return Error("Board current player is not 1 or -1!");
  }


  /* Static evaluation function to get a score for any arbitrary board */
  staticEval(b) {
    let w = b.checkForWinner();
    if (w != null) {
      return w;
    }
    return 0;
  }


}
