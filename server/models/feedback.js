const mongoose = require("mongoose");
var Schema = mongoose.Schema;
const feedback = mongoose.Schema({
  from: { type: String },
  to: { type: String },
  messagefeedback: { type: String },
});
module.exports = mongoose.model("feedback", feedback);
