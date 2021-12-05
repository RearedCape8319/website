/**
* Create useful functions for use by the program
* - Check if 3 spots are equal to each other
**/
// Function to return 1 or -1 for use by board.checkForWinner();
function equals3(a, b, c) {
  return ((a == b && a == c) && a != 0);
}



/**
* Create global variables for use in the program
* - Board object
**/
let board;



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
  colorMode(HSB, 360, 100, 100, 100);
  ellipseMode(CENTER);
  rectMode(CENTER);
  // Initialise the board
  board = new Board();

  // TESTS FOR THE BOARD TO SEE IF IT WORKS
  moves = [
    [0, 0],
    [1, 0],
    [0, 1],
    [1, 1],
    [1, 2],
    [0, 2],
    [2, 0],
    [2, 2],
    [2, 1]
  ];
  for (let m of moves) {
    board.place(m[0], m[1]);
    winner = board.checkForWinner();
    console.log(m);
    console.log(winner);
  }
}
