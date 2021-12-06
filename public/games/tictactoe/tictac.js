/**
* Create useful functions for use by the program
* - Check if 3 spots are equal to each other
**/
// Function to return 1 or -1 for use by board.checkForWinner();
function equals3(a, b, c) {
  return ((a == b && a == c) && a != 0);
}


/* Function to show the board to the screen */
function show(b) {
  // Clear the screen
  background(120);
  // Draw the grid lines
  stroke(0);
  strokeWeight(5);
  noFill();
  rect(width/2, height/2, b.fullSize, b.fullSize);
  line((width-b.spotSize)/2, (height-b.fullSize)/2, (width-b.spotSize)/2, (height+b.fullSize)/2);
  line((width+b.spotSize)/2, (height-b.fullSize)/2, (width+b.spotSize)/2, (height+b.fullSize)/2);
  line((width-b.fullSize)/2, (height-b.spotSize)/2, (width+b.fullSize)/2, (height-b.spotSize)/2);
  line((width-b.fullSize)/2, (height+b.spotSize)/2, (width+b.fullSize)/2, (height+b.spotSize)/2);
  for (let r = 0; r <= 2; r++) {
    for (let c = 0; c <= 2; c++) {
      if (b.grid[r][c] == 1) {
        ellipse(width/2 + (c-1)*b.spotSize, height/2 + (r-1)*b.spotSize, b.spotSize*0.7, b.spotSize*0.7);
      } else if (b.grid[r][c] == -1) {
        let spot = createVector(width/2 + (c-1)*b.spotSize, height/2 + (r-1)*b.spotSize);
        let p1 = spot.copy().sub(b.spotSize*0.35, b.spotSize*0.35);
        let p2 = spot.copy().add(b.spotSize*0.35, b.spotSize*0.35);
        line(p1.x, p1.y, p2.x, p2.y);
        line(p1.x, p2.y, p2.x, p1.y);
      }
    }
  }
}

/* Function to take a mouse input and return the board co-ordinates of the click */
function mouseToCoord(mX, mY, b) {
  let m = createVector(mX, mY);
  m.sub((width-b.fullSize)/2, (height-b.fullSize)/2);
  m.x = floor(m.x / b.spotSize);
  m.y = floor(m.y / b.spotSize);
  return m;
}



/**
* Create global variables for use in the program
* - Board object
* - Winner flag
* - Cpu object
**/
let board, winner, cpu;



/**
* Setup function is run once when the program starts
* - Initialise the canvas to put graphics on
* - Initialise the global variables
**/
function setup() {
  // Setup the canvas and its settings
  let info = document.getElementById("sketch-holder").getBoundingClientRect();
  let canvas = createCanvas(info.width, info.height);
  canvas.parent("sketch-holder");
  colorMode(RGB, 255, 255, 255, 100);
  ellipseMode(CENTER);
  rectMode(CENTER);
  // Initialise the global variables
  let size = min(width, height) * 0.8;
  board = new Board(size);
  winner = null;
  cpu = new Cpu();
  // Show the initial board
  show(board);
}



/**
* Mouse Pressed event is captured and runs this function
* - Turn mouse lcoation into grid co-ordinates
* - Place the piece on the clicked spot if valid
* - Automatically do the computer move when done
**/
function mousePressed() {
  if (board.currentPlayer != 0 && board.freeSpots > 0 && winner == null) {
    let choice = mouseToCoord(mouseX, mouseY, board);
    let done = board.place(choice.x, choice.y);
    // If the spot could not be filled then return, otherwise do computer
    if (!done) {
      return;
    }
    // If the player move just won, say so and return
    winner = board.checkForWinner();
    if (winner != null) {
      document.getElementById("tictac").innerHTML = "WINNER IS " + winner;
      show(board);
      return;
    }
    // If there are no moves left, return
    if (board.freeSpots == 0) {
      show(board);
      return;
    }
    // If here then cpu still has a move to make
    cpuMove = cpu.getMove(board.deepCopy());
    board.place(cpuMove[0], cpuMove[1]);
    // If the cpu move just won, say so and return
    winner = board.checkForWinner();
    if (winner != null) {
      document.getElementById("tictac").innerHTML = "WINNER IS " + winner;
      show(board);
      return;
    }
    show(board);
  }
}
