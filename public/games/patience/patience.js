/**
* Declare global variables for use in the program
* - The board object
* - A score of how many levels are beat
**/
let board, points;



/**
* Setup function is run once on program start
* - Randomly generate a path
* - Fill in the rest of the board
**/
function setup() {
  // Setup the canvas on the webpage
  let info = document.getElementById("sketch-holder").getBoundingClientRect();
  let canvas = createCanvas(info.width, info.height);
  canvas.parent("sketch-holder");
  // Initialise global variables
  board = new Board(5, 9);
  board.show();
  points = 0;
}



/**
* Function to detect a key press and handle player movement
* - Detect each arrow
* - Make each arrow move the player if valid spot
**/
function keyPressed() {
  let movement;
  switch (keyCode) {
    case RIGHT_ARROW:
      // console.log("RIGHT");
      movement = createVector(1, 0);
      break;
    case LEFT_ARROW:
      // console.log("LEFT");
      movement = createVector(-1, 0);
      break;
    case UP_ARROW:
      // console.log("UP");
      movement = createVector(0, -1);
      break;
    case DOWN_ARROW:
      // console.log("DOWN");
      movement = createVector(0, 1);
      break;
    default:
      movement = createVector(0, 0);
      break;
  }
  let pos = board.playerPos.copy();
  pos.add(movement);
  if (pos.x < 0 || pos.y < 0 || pos.x >= board.c || pos.y >= board.r) {
    console.log("out of bounds");
    return;
  }
  if ((board.grid[pos.y][pos.x] instanceof Water && board.playerOrange) || !(board.grid[pos.y][pos.x].walkable)) {
    console.log("blocked");
  } else {
    board.move(movement);
    if (board.checkWin()) {
      board = new Board(board.r, board.c);
      board.show();
    }
  }
}



/**
* Function to handle screen clicks so mobile users can make moves
**/
function mousePressed() {
  // Create two lines
  let y1 = height - (height/width)*mouseX;
  let y2 = (height/width)*mouseX;
  // See which segment of the screen was clicked
  let movement = createVector(0, 0);
  if (mouseY > y2 && mouseY > y1) {
    movement.y = 1;
  } else if (mouseY < y2 && mouseY < y1) {
    movement.y = -1;
  } else if (mouseY > y2 && mouseY < y1) {
    movement.x = -1;
  } else if (mouseY < y2 && mouseY > y1) {
    movement.x = 1;
  }
  board.move(movement);
}
