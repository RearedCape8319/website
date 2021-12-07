/**
* Declare global variables for use in the program
* - The board object
**/
let board;



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
  if (board.grid[pos.y][pos.x].walkable) {
    board.move(movement);
    if (board.checkWin()) {
      document.getElementById("pat").innerHTML = "YOU WIN";
    }
  } else {
    console.log("blocked");
  }
}
