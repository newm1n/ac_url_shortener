const express = require("express");
const app = express();
const port = 3000;

// routes setting
app.get("/", (req, res) => {
  res.send("HI");
});

// start and listen on the Express server
app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`);
});
