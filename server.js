/* Require the necessary modules for use by the server */
const express = require("express");


/* Create the application object, listen on the given port and serve static files */
const app = express();
// Use the heroku assigned port, if not available (local test) then use 3000
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
app.use(express.static("public"));
