var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/school")
var Schema = mongoose.Schema

StudentSchema = new Schema({
  name: String,
  age: Number
})

mongoose.model("Student", StudentSchema)
module.exports = mongoose;
