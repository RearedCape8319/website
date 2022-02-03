/*
Define class structure for a game choice
- Has name, task, and can be completed
*/
class gameChoice {
  constructor(n, t) {
    this.name = n;
    this.task = t;
  }
}



/*
Delcare global variables for use in the application
- Array of each available choice represented by custom class
*/
let GAMES;
let current, currentIndex;



/*
Define the function to show the game array to the user, ran at start
*/
function show() {
  // Clear the list
  document.getElementById("gameList").innerHTML = "";

  // Show everything in the global array
  for (let i = 0; i < GAMES.length; i++) {
    let n = GAMES[i].name;
    // let t = GAMES[i].task;
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
function chooseGame(unbeaten) {
  // Clear output zone
  document.getElementById("outputZone").innerHTML = "";

  // Choose a random element from the GAMES array
  let choice = null;
  do {
    currentIndex = floor(random(GAMES.length));
    choice = GAMES[currentIndex];
    current = RECORDS[currentIndex];
  } while (choice.done && unbeaten);

  // Create output elements
  let nameP = document.createElement("p");
  let taskP = document.createElement("p");
  let doneP = document.createElement("p");
  let nameText = document.createTextNode("Game: " + choice.name);
  let taskText = document.createTextNode("Task: " + choice.task);
  let doneText = document.createTextNode("Completed: " + current.done);
  nameP.appendChild(nameText);
  taskP.appendChild(taskText);
  doneP.appendChild(doneText);

  // Populate output zone
  let host = document.getElementById("outputZone");
  host.appendChild(nameP);
  host.appendChild(taskP);
  host.appendChild(doneP);

  // Return positive output
  return true;
}



/*
Use the P5js setup function to run code when the application is opened
*/
function setup() {
  noCanvas();
  GAMES = [];
  RECORDS = [];
  current = null;
  currentIndex = -1;
  getGames();
}



/*
Function to delete a challenge
*/
async function removeRecord() {
  let curID = current._id;
  let data = {
    id: curID
  };
  let options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  };
  const response = await fetch("/removeRecord", options);
  const json = await response.json();
  console.log(json);
  current = null;
  currentIndex = -1;
  GAMES = [];
  RECORDS = [];
  getGames();
  document.getElementById("outputZone").innerHTML = "<p>Challenge Deleted!</p>";
}



/*
Function to mark a game as complete
*/
async function completed() {
  if (current == null || current.done) {
    return false;
  }
  let data = { query: current._id };
  let options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  };
  const response = await fetch("/completed", options);
  const json = await response.json();
  console.log(json);
  RECORDS[currentIndex].done = true;
  document.getElementById("outputZone").innerHTML = "<p>Challenge Accepted!</p>";
}



/*
Function to set all challenged to done=false
*/
async function openAll() {
  let options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    },
  };
  const response = await fetch("/openAll", options);
  const json = await response.json();
  console.log(json);
  document.getElementById("outputZone").innerHTML = "<p>All Challenges Open!</p>";
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
  GAMES = [];
  RECORDS = [];
  for (thing of json) {
    GAMES.push(thing.game);
    RECORDS.push(thing);
  }
  show();
}



/*
Declare a function for storing things on the database
*/
async function saveGame() {
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
  let userinput = new gameChoice(name, task)
  let data = {
    game: userinput,
    done: false
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
  getGames();
  document.getElementById("gameName").focus();
  document.getElementById("outputZone").innerHTML = "<p>Challenge Created!</p>";
}
