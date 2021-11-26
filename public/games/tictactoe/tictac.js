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
function checkWin(b) {
  // Check rows
  for (let r = 0; r < 3; r++) {
    if (equals3(b[r][0], b[r][1], b[r][2]) && b[r][0] != 0) {
      return b[r][0];
    }
  }
  // Check columns
  for (let c = 0; c < 3; c++) {
    if (equals3(b[0][c], b[1][c], b[2][c]) && b[0][c] != 0) {
      return b[0][c];
    }
  }
  // Check diagonals
  if ((equals3(b[0][0], b[1][1], b[2][2]) || equals3(b[0][2], b[1][1], b[2][0])) && b[1][1] != 0) {
    return b[1][1];
  }
  // Default return null
  return null;
}

// Function to get all available spots on the board
function allMoves(b) {
  let all = [];
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (b[i][j] == 0) {
        all.push([i, j]);
      }
    }
  }
  return all;
}

// Funciton to get a random move and return it
function getMove() {
  let possible = allMoves();
  let index = floor(random(possible.length));
  return possible[index];
}

// Function to display game over message
function gameOver() {
  let output = "Winner is ";
  if (player == -1) {
    output += "O";
  } else {
    output += "X";
  }
  document.getElementById("tictac").value = output;
}

// Fucntion to return a copy of a modified board
function modBoard(b, m, p) {
  let newBoard = [];
  for (let r of b) {
    newBoard.push(r.slice());
  }
  newBoard[m[0]][m[1]] = p;
  return newBoard;
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
  if (winner != null || player != -1) {
    return;
  }
  // Turn the mouse position into a board index
  if (
    mouseX < (width-size)/2 || mouseX > width-((width-size)/2) ||
    mouseY < (height-size)/2 || mouseY > height-((height-size)/2)
  ) {
    return;
  }
  // Play the move if allowed
  let i = floor((mouseY - (height-size)/2) / (size/3));
  let j = floor((mouseX - (width-size)/2) / (size/3));
  if (board[i][j] != 0) {
    return
  }
  board[i][j] = -1;
  // Show the board
  show();
  // Check for winner
  winner = checkWin(board);
  if (winner != null) {
    gameOver();
    return;
  }
  // Get cpu move
  player *= -1;
  cpu = minimax(new Node(board, null, true), allMoves(board).length-1);
  console.log(cpu);
  board[cpu[0]][cpu[1]] = 1;
  player *= -1;
  // Show the board
  show();
  // Check for winner
  winner = checkWin(board);
  if (winner != null) {
    gameOver();
    return;
  }
}





















// placeholder
