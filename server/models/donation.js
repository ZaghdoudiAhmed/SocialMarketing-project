const mongoose = require("mongoose");
const donation = mongoose.Schema({
  title: String,
  donator: String,
  description: String,
  location: String,
  state: String,
  image: String,
  category: String,
  date :Date,
});
module.exports = mongoose.model("donations", donation);
