/* Require the necessary dependencies */
const express = require("express");
const app = express();

// Use the port given by heroku, if not available use 3000 to set up application object
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log("Listening on port " + port);
});

// Allow the app to serve static files to the user
app.use(express.static("public"));

// Use this I found online to allow saving to database with no problems
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
 if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, OPTIONS');
      res.header('Access-Control-Max-Age', 120);
      return res.status(200).json({});
  }
  next();
});

// Setup the database for game names and tasks
const Datastore = require("nedb");
const games = new Datastore("gameTasks.db");
games.loadDatabase();

// Declare a POST request to store a game
app.post("/saveGame", (request, response) => {
  console.log("Saving a game");
  const data = request.body;
  data.time = Date.now();
  games.insert(data);
  response.json(data);
});

// Declare a GET request to give all games
app.get("/getAllGames", (request, response) => {
  console.log("Giving all games");
  // database.find({}, (err, data) => {
  games.find({}).sort({time: -1}).exec(function (err, data) {
    if (err) {
      response.end();
      return;
    }
    response.json(data);
  });
});
