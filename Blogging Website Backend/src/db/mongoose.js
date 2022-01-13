const mongoose = require('mongoose');
const validator = require('validator');

mongoose.connect('mongodb://127.0.0.1:27017/medium_clone');

const db = mongoose.connection;
db.once("open", function () {
  console.log("Connected successfully");
});
