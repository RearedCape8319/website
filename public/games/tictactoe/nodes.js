/* Class structure for a node in the search tree */
class Node {
  // Constructor function
  constructor(bs, pm, mx) {
    this.boardState = [[], [], []];
    for (let i = 0; i < bs.length; i++) {
      this.boardState[i] = bs[i].slice();
    }
    this.prevMove = pm;
    this.maximising = mx;
    this.value = this.staticEval();
  }

  // Static evaluation function
  staticEval() {
    // Check for a winner
    let win = checkWin(this.boardState);
    if (win != null) {
      if (!this.maximising) {
        win *= -1;
      }
      return win*10;
    }
    // If no winner, score based off available wins next turn
    let val = 0;
    // Check for close rows
    for (let row of this.boardState) {
      let sum = 0;
      for (let spot of row) {
        sum += spot;
      }
      if (abs(sum) == 2) {
        val += sum/abs(sum);
      }
    }
    // Check for close columns
    for (let col = 0; col < 3; col++) {
      let sum = 0;
      for (let row of this.boardState) {
        sum += row[col];
      }
      if (abs(sum) == 2) {
        val += sum/abs(sum);
      }
    }
    // Check the diagonals
    let sum = 0;
    sum += this.boardState[0][0];
    sum += this.boardState[1][1];
    sum += this.boardState[2][2];
    if (abs(sum) == 2) {
      val += sum/abs(sum);
    }
    sum = 0;
    sum += this.boardState[0][2];
    sum += this.boardState[1][1];
    sum += this.boardState[2][0];
    if (abs(sum) == 2) {
      val += sum/abs(sum);
    }
    // Flip value if minimising and return
    if (!this.maximising) {
      val *= -1;
    }
    return val;
  }
}



/* Functions for minimax to work */
function minimaxVal(node, depth) {
  if (depth == 0) {
    return node.value;
  }
  let nextMoves = allMoves(node.boardState);
  let daughters = [];
  if (node.maximising) {
    for (let nm of nextMoves) {
      daughters.push(new Node(modBoard(node.boardState, nm, 1), nm, !node.maximising));
      daughters[daughters.length-1].boardState[nm[0]][nm[1]] = 1;
    }
    let maxVal = minimaxVal(daughters[0], depth-1);
    for (let i = 1; i < daughters.length; i++) {
      let nv = minimaxVal(daughters[i], depth-1);
      if (nv > maxVal) {
        maxVal = nv;
      }
    }
    return maxVal;
  } else {
    for (let nm of nextMoves) {
      daughters.push(new Node(modBoard(node.boardState, nm, -1), nm, !node.maximising));
      daughters[daughters.length-1].boardState[nm[0]][nm[1]] = -1;
    }
    let minVal = minimaxVal(daughters[0], depth-1);
    for (let i = 1; i < daughters.length; i++) {
      let nv = minimaxVal(daughters[i], depth-1);
      if (nv < minVal) {
        minVal = nv;
      }
    }
    return minVal;
  }
}

function minimax(node, depth) {
  let nextMoves = allMoves(node.boardState);
  let daughters = [];
  if (node.maximising) {
    for (let nm of nextMoves) {
      daughters.push(new Node(modBoard(node.boardState, nm, 1), nm, !node.maximising));
      daughters[daughters.length-1].boardState[nm[0]][nm[1]] = 1;
    }
    let maxVal = minimaxVal(daughters[0], depth-1);
    let bestMove = daughters[0].prevMove;
    for (let i = 1; i < daughters.length; i++) {
      let nv = minimaxVal(daughters[i], depth-1);
      if (nv > maxVal) {
        maxVal = nv;
        bestMove = daughters[i].prevMove;
      }
    }
    return bestMove;
  } else {
    for (let nm of nextMoves) {
      daughters.push(new Node(modBoard(node.boardState, nm, -1), nm, !node.maximising));
      daughters[daughters.length-1].boardState[nm[0]][nm[1]] = -1;
    }
    let minVal = minimaxVal(daughters[0], depth-1);
    let bestMove = daughters[0].prevMove;
    for (let i = 1; i < daughters.length; i++) {
      let nv = minimaxVal(daughters[i], depth-1);
      if (nv < minVal) {
        minVal = nv;
        bestMove = daughters[i].prevMove;
      }
    }
    return bestMove;
  }
}
