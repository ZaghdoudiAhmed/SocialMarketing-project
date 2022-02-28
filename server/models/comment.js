const mongoose = require("mongoose");

var Schema = mongoose.Schema;

var Comment = new Schema({
  Body: String,
  Date_creation: { type: Date, default: Date.now },
  Likes: { type: Number, default: 0 },
  Dislikes: { type: Number, default: 0 },
  //  Creator: { type: Schema.Types.ObjectId, ref: "User" },
  Post_id: { type: Schema.Types.ObjectId, ref: "Post" },
});

module.exports = mongoose.model("comments", Comment);
