/*
Define class structure for a game choice
- Has name, task, and can be completed
*/
class gameChoice {
  constructor(n, t) {
    this.name = n;
    this.task = t;
    this.done = false;
  }

  chosen() {
    this.done = true;
  }
}



/*
Delcare global variables for use in the application
- Array of each available choice represented by custom class
*/
// let test1 = new gameChoice("Pog", "Champ");
// let test2 = new gameChoice("Hog", "Rider");
let choices = [];



/*
Define the function to run when the button is clicked to add a new game
*/
function newGame() {
  // Get name and task from user
  let name = document.getElementById("gameName").value;
  let task = document.getElementById("gameTask").value;

  // If a userinput is blank, return negative output and give user a prompt
  if (name == "" || task == "") {
    alert("Fill in both text boxes!");
    return false;
  }

  // If allowed to continue, clear input fields, add choice to array and database, reshow array
  document.getElementById("gameName").value = "";
  document.getElementById("gameTask").value = "";
  let addition = new gameChoice(name, task);
  choices.push(addition);
  saveGame(name, task);
  show();

  // Return positive output
  return true;
}



/*
Define the function to show the game array to the user, ran at start
*/
function show() {
  // Clear the list
  document.getElementById("gameList").innerHTML = "";

  // Show everything in the global array
  for (let i = 0; i < choices.length; i++) {
    let n = choices[i].name;
    // let t = choices[i].task;
    let newP = document.createElement("p");
    let text = document.createTextNode(n);
    newP.appendChild(text);
    let host = document.getElementById("gameList");
    host.appendChild(newP);
  }

  // Return positive output
  return true;
}



/*
Define the function to run when the button to choose a game is clicked
*/
function chooseGame() {
  // Clear output zone
  document.getElementById("outputZone").innerHTML = "";

  // Choose a random element from the choices array
  let choice = random(choices);

  // Create output elements
  let nameP = document.createElement("p");
  let taskP = document.createElement("p");
  let nameText = document.createTextNode(choice.name);
  let taskText = document.createTextNode(choice.task);
  nameP.appendChild(nameText);
  taskP.appendChild(taskText);

  // Populate output zone
  let host = document.getElementById("outputZone");
  host.appendChild(nameP);
  host.appendChild(taskP);

  // Return positive output
  return true;
}



/*
Use the P5js setup function to run code when the application is opened
*/
function setup() {
  noCanvas();
  getGames();
  show();
}


/*
Declare a function to get all existing games from database
*/
async function getGames() {
  let options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    },
  };
  const response = await fetch("/getAllGames", options);
  const json = await response.json();
  console.log(json);
}


/*
Declare a function for storing things on the database
*/
async function saveGame(name, task) {
  let userinput = new gameChoice(name, task)
  let data = {
    game: userinput
  };
  let options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  };
  const response = await fetch("/saveGame", options);
  const json = await response.json();
  console.log(json);
}
