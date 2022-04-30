const mongoose = require("mongoose");
var Schema = mongoose.Schema;
const donation = mongoose.Schema({
  title: String,
  donator: { type: Schema.Types.ObjectId, ref: "users" },
  description: String,
  location: String,
  state: String,
  image: String,
  category: String,
  datecre :Date,
});
module.exports = mongoose.model("donations", donation);
