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
}



/**
* Draw function rund continuously after setup is complete
**/
function draw() {
  board.show();
}
