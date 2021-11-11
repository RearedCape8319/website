/* Require the necessary dependencies */
const express = require("express");


/* Create the application object */
const app = express();

// Use the port given by heroku, if not available use 3000
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log("Listening on port " + port);
});

// Allow the app to serve static files to the user
app.use(express.static("public"));
