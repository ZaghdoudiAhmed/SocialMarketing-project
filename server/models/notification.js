const mongoose = require("mongoose");

var Schema = mongoose.Schema;

var Notification = new Schema({
  text: { type: String },
  sender: { type: Schema.Types.ObjectId, ref: "users" },
  receiver: { type: Schema.Types.ObjectId, ref: "users" },
  Date_creation: { type: Date, default: Date.now },

  // type: { type: String },
});
module.exports = mongoose.model("notifications", Notification);
