const mongoose = require("mongoose");

var Schema = mongoose.Schema;

var Message = new Schema({
  conversation_id: {
    type: Schema.Types.ObjectId,
    ref: "Conversation",
  },
  sender: { type: Schema.Types.ObjectId, ref: "users" },
  text: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("messages", Message);
