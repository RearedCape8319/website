/* Setup function is run once when the program starts */
function setup() {
  // Setup the canvas and its settings
  let info = document.getElementById("sketch-holder").getBoundingClientRect();
  let canvas = createCanvas(info.width, info.height);
  canvas.parent("sketch-holder");

  background(0);
  console.log("TO BE CREATED");
  document.getElementById("tictac").innerHTML = "TO BE CREATED";
}
