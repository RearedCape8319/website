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
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ MINIMAX ALGORITHM
    // For now return a random move, assumes on exists
    let possible = b.possibleMoves();
    return random(possible);
  }


  /* Method to get the best scoring daughter board from the current one */
  minimaxVal(b) {
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ MINIMAX VAL ALGORITHM
  }


  /* Static evaluation function to get a score for any arbitrary board */
  staticEval(b) {
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ STATIC EVAL FUNCTION
  }


}
