function setup() {
  let posInfo = document.getElementById("sketch-holder").getBoundingClientRect();
  let canvas = createCanvas(posInfo.width, posInfo.height);
  canvas.parent("sketch-holder");
  background(0);
  fill(255);
  rectMode(CENTER);
  textFont("Comic Sans MS", 50);
  text("Pizza Pasta", width/3, height/3);
  console.log("ENTIRE MAIN PROGRAM NEEDS IMPLEMENTING");
}
