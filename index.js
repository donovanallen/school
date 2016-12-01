var express = require("express");
var parser  = require("body-parser");
var hbs = require("express-handlebars");
var mongoose = require("./db/schema")
var app = express();

var Student = mongoose.model("Student")

app.set("port", process.env.PORT || 3001)
app.set('view engine', 'hbs')
app.engine(".hbs", hbs({
  extname:        ".hbs",
  partialsDir:    "views/",
  layoutsDir:     "views/",
  defaultLayout:  "layout"
}));
app.use("/assets", express.static("public"));
app.use(parser.json({extended: true}));


app.get("/", (req, res) => {
  res.render("schools");
});

app.get("/api/students", function(req, res) {
  Student.find({}).then(function(students){
    res.json(students)
  })
})

app.get("/api/students/:name", function(req, res) {
  Student.findOne({name:
  req.params.name}).then(function(student) {
    res.json(student)
  })
})

app.post("/api/students", function(req, res) {
  Student.create(req.body).then(function(student){
    res.json(student)
  })
})

app.put("/api/students/:name", function(req, res) {
  Student.findOneAndUpdate({name: req.params.name}, req.body, {new: true}).then(function(student) {
    res.json(student)
  })
})

app.delete("/api/students/:name", function(req, res) {
  Student.findOneAndRemove({name: req.params.name}).then(function() {
    res.json({ success: true })
  })
})


app.listen(3001, () => {
  console.log("Sweet");
})
