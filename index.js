
var fs = require('fs')
var a = function* () {
  console.log("Starting")
  var file = yield fs.readFile("./config.json") // [1]
  console.log(file.toString())
};
a();