/* Declare global variables */
let board, player, winner, size;



/* Declare useful functions */
function equals3(a, b, c) {
  // Shorthand for checking three board locations
  return (a == b && a == c);
}

// Function to show the board on the screen
function show() {
  // Clear the screen
  background(75);
  // Go to the corner of the board to draw it
  push();
  translate((width-size)/2, (height-size)/2);
  stroke(0);
  strokeWeight(5);
  noFill();
  // Draw vertical and horizontal lines
  for (let xoff = size/3; xoff < size; xoff += size/3) {
    line(xoff, 0, xoff, size);
  }
  for (let yoff = size/3; yoff < size; yoff += size/3) {
    line(0, yoff, size, yoff);
  }
  // Draw circles and crosses
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      let tl = createVector((j+0.15)*size/3, (i+0.15)*size/3);
      let br = createVector((j+0.85)*size/3, (i+0.85)*size/3);
      if (board[i][j] == -1) {
        ellipse(tl.x, tl.y, br.x, br.y);
      } else if (board[i][j] == 1) {
        line(tl.x, tl.y, br.x, br.y);
        line(tl.x, br.y, br.x, tl.y);
      }
    }
  }
  pop();
}

// Function to check for a winner
function checkWin() {
  // Check rows
  for (let r = 0; r < 3; r++) {
    if (equals3(board[r][0], board[r][1], board[r][2]) && board[r][0] != 0) {
      return board[r][0];
    }
  }
  // Check columns
  for (let c = 0; c < 3; c++) {
    if (equals3(board[0][c], board[1][c], board[2][c]) && board[0][c] != 0) {
      return board[0][c];
    }
  }
  // Check diagonals
  if ((equals3(board[0][0], board[1][1], board[2][2]) || equals3(board[0][2], board[1][1], board[2][0])) && board[1][1] != 0) {
    return board[1][1];
  }
  // Default return null
  return null;
}

// Function to get all available spots on the board
function allMoves() {
  let all = [];
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] == 0) {
        all.push([i, j]);
      }
    }
  }
  return all;
}

// Funciton to get the best move and return it
function getMove() {
  let possible = allMoves();
  let index = floor(random(possible.length));
  return possible[index];
}



/* Setup function is run once when the program starts */
function setup() {
  // Setup the canvas and its settings
  let info = document.getElementById("sketch-holder").getBoundingClientRect();
  let canvas = createCanvas(info.width, info.height);
  canvas.parent("sketch-holder");
  colorMode(HSB, 360, 100, 100, 100);
  ellipseMode(CORNERS);

  // Initialise global variables
  board = [
    [0,0,0],
    [0,0,0],
    [0,0,0]
  ];
  player = -1;
  winner = null;
  size = min(width, height) * 0.8;

  // Show the board
  show();
}



/* Function to detect the mouse press of the user */
function mousePressed() {
  // Do nothing if the game is over or it is the computer's turn
  if (winner != null || player == 1) {
    return;
  }
  // Turn the mouse position into a board index
  if (
    mouseX < (width-size)/2 || mouseX > width-((width-size)/2) ||
    mouseY < (height-size)/2 || mouseY > height-((height-size)/2)
  ) {
    return;
  } else {
    // Play the move if allowed
    let i = floor((mouseY - (height-size)/2) / (size/3));
    let j = floor((mouseX - (width-size)/2) / (size/3));
    if (board[i][j] == 0) {
      board[i][j] = -1;
      player = 1;
      show();
      winner = checkWin();
      // After play, make the computer move if allowed
      if (winner == null) {
        let move = getMove();
        board[move[0]][move[1]] = 1;
        player = -1;
        show();
        winner = checkWin();
      }
    }
  }
  if (winner == 1) {
    document.getElementById("tictac").innerHTML = "X wins";
  } else if (winner == -1) {
    document.getElementById("tictac").innerHTML = "O wins";
  }
}





















// placeholder
