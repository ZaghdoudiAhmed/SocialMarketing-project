const mongoose = require("mongoose");

var Schema = mongoose.Schema;

var Story = new Schema({
  Date_creation: { type: Date, default: Date.now },
  Date_fin: { type: Date },
  Likes: { type: Array, default: [] },
  Loves: { type: Array, default: [] },
  url: String,
  Creator: { type: Schema.Types.ObjectId, ref: "users" },
  //active: { type: Boolean, default: true },
});

module.exports = mongoose.model("stories", Story);
