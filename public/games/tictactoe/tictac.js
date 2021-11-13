/* Declare global variables */
let board;
let player;
let winner;


/* Declare useful functions for use in the program */
// Function to return an array of all legal moves
function getLegalMoves(b) {
  let allowed = [];
  for (let y = 0; y < 3; y++) {
    for (let x = 0; x < 3; x++) {
      if (b[y][x] == 0) {
        allowed.push(createVector(x, y));
      }
    }
  }
  return allowed;
}

// Function to show the board and pieces to the canvas
function show(b) {
  background(120);
  stroke(0);
  strokeWeight(5);
  let l = (min(width, height)*0.8) / 3;
  let pTL = createVector((width/2)-(l*1.5), (height/2)-(l*1.5));
  // Draw grid
  line(pTL.x, pTL.y + l, pTL.x + 3*l, pTL.y + l);
  line(pTL.x, pTL.y + 2*l, pTL.x + 3*l, pTL.y + 2*l);
  line(pTL.x + l, pTL.y, pTL.x + l, pTL.y + 3*l);
  line(pTL.x + 2*l, pTL.y, pTL.x + 2*l, pTL.y + 3*l);
  // Draw pieces
  for (let y = 0; y < 3; y++) {
    for (let x = 0; x < 3; x++) {
      // Handle player O's
      if (b[y][x] == 1) {
        stroke(0, 255, 0);
        noFill();
        let p = createVector(pTL.x + l/2 + l*x, pTL.y + l/2 + l*y)
        ellipse(p.x, p.y, l*0.7, l*0.7)
      // Handle computer X's
      } else if (b[y][x] == -1) {
        stroke(255, 0, 0);
        let p = createVector(pTL.x + l/2 + l*x - l*0.35, pTL.y + l/2 + l*y - l*0.35);
        line(p.x, p.y, p.x + l*0.7, p.y + l*0.7);
        line(p.x, p.y + l*0.7, p.x + l*0.7, p.y);
      }
    }
  }
}

// Function to see if three things are equal
function equal3(a, b, c) {
  return (a == b && b == c);
}

// Function to check for a winner
function checkWin(b) {
  // Check rows
  for (let y = 0; y < 3; y++) {
    if (equal3(b[y][0], b[y][1], b[y][2]) && b[y][0] != 0) {
      return b[y][0];
    }
  }
  // Check columns
  for (let x = 0; x < 3; x++) {
    if (equal3(b[0][x], b[1][x], b[2][x]) && b[0][x] != 0) {
      return b[0][x];
    }
  }
  // Check diagonals
  if ((equal3(b[0][0], b[1][1], b[2][2]) || equal3(b[0][2], b[1][1], b[2][0])) && b[1][1] != 0) {
    return b[1][1];
  }
  // Indicate no-one has won yet if still here
  return 0;
}



/* Setup function is run once at the start of the program */
function setup() {
  // Setup canvas
  let posinfo = document.getElementById("sketch-holder").getBoundingClientRect();
  let canvas = createCanvas(posinfo.width, posinfo.height);
  canvas.parent("sketch-holder");

  // Initialise global variables
  ellipseMode(CENTER);
  colorMode(RGB, 255, 255, 255, 100);
  board = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
  ];
  player = 1;
  winner = 0;

  // Show the initial board
  show(board);
}


/* Function to detect and handle mouse press by the user */
function mousePressed() {
  // Check that the mouse is inside the play area and it is the users go
  let l = (min(width, height)*0.8) / 3;
  let pTL = createVector((width/2)-(l*1.5), (height/2)-(l*1.5));
  if (
    player == 1 &&
    mouseX > pTL.x && mouseX < pTL.x + 3*l &&
    mouseY > pTL.y && mouseY < pTL.y + 3*l
  ) {
    // Check mouse is choosing a free spot
    let p = createVector(floor((mouseX-pTL.x)/l), floor((mouseY-pTL.y)/l));
    if (board[p.y][p.x] == 0 && winner == 0) {
      // Put the player in that spot and pass play on
      board[p.y][p.x] = 1;
      player *= -1;
      show(board);
      winner = checkWin(board);
      // Output if wins
      if (winner == 1) {
        document.getElementById("tictac").innerHTML = "Winner is O";
      }

      // Do the computer move
      let legal = getLegalMoves(board);
      if (legal.length > 0 && winner == 0) {
        let current = new Node(true, board, legal.length, p);
        let cpu = minimax(current);
        board[cpu.y][cpu.x] = -1;
        player *= -1;
        show(board);
        winner = checkWin(board);
        // Output if wins
        if (winner != 0) {
          document.getElementById("tictac").innerHTML = "Winner is X";
        }
      }
    }
  }
}


/* The minimax algorithm to get the best computer move */
function minimax(n) {
  // Get all daughters
  let legal = getLegalMoves(n.board);
  let daughters = [];
  for (let move of legal) {
    let tmp = [];
    for (let i = 0; i < n.board.length; i++) {
      tmp[i] = n.board[i].splice();
    }
    let val = -1;
    if (n.maximising) {
      val = 1;
    }
    tmp[move.y][move.x] = val;
    daughters.push(new Node(!n.maximising, tmp, n.depth-1, move));
  }

  // If maximising, return best move
  if (n.maximising) {
    let bestNode = daughters[0];
    for (let d of daughters.slice(1)) {
      if (d.value > bestNode.value) {
        bestNode = d;
      }
    }
    console.log(bestNode);
    console.log(bestNode.prevMove);
    return bestNode.prevMove;
  // If minimising, return worst move
  } else {
    let worstNode = daughters[0];
    for (let d of daughters.slice(1)) {
      if (d.value < worstNode.value) {
        besworstNodetNode = d;
      }
    }
    console.log(worstNode);
    console.log(worstNode.prevMove);
    return worstNode.prevMove;
  }
}

// MinimaxVal algorithm to evaluate a node
function minimaxVal(n) {
  // If depth runs out (should be no legal moves here) then return score of board
  let legal = getLegalMoves(n.board);
  if (legal.length == 0) {
    return checkWin(n.board);
  }

  // Get all daughters
  let daughters = [];
  for (let move of legal) {
    let tmp = [];
    for (let i = 0; i < n.board.length; i++) {
      tmp[i] = n.board[i].slice();
    }
    let val = -1;
    if (n.maximising) {
      val = 1;
    }
    tmp[move.y][move.x] = val;
    daughters.push(new Node(!n.maximising, tmp, n.depth-1, move));
  }

  // If maximising, return best score
  if (n.maximising) {
    let bestScore = daughters[0].value;
    for (let d of daughters.slice(1)) {
      if (d.value > bestScore) {
        bestScore = d.value;
      }
    }
    return bestScore;
  // If minimising, return worst score
  } else {
    let worstScore = daughters[0].value;
    for (let d of daughters.slice(1)) {
      if (d.value < worstScore) {
        worstScore = d.value;
      }
    }
    return worstScore;
  }

}
