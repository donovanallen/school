var express = require("express");
var app = express();


app.get("/", (req, res) => {
  res.send("works")
})


app.listen(3001, () => {
  console.log("Sweet");
})
