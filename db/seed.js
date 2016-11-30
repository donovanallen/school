var mongoose =  require("./schema");
var seedData = require("./seeds")

var Student = mongoose.model("Student")

Student.remove({}).then(function() {
  Student.collection.insert(seedData).then(function() {
    process.exit();
  });
})
