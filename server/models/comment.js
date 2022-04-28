const mongoose = require("mongoose");

var Schema = mongoose.Schema;

var Comment = new Schema({
  Body: String,
  Date_creation: { type: Date, default: Date.now },
  Loves: { type: Array, default: [] },
  Angrys: { type: Array, default: [] },
  Creator: { type: Schema.Types.ObjectId, ref: "users" },
  Post_id: { type: Schema.Types.ObjectId, ref: "Post" },
  comments: [
    {
      Body: String,
      Date_creation: { type: Date, default: Date.now },
      Loves: { type: Array, default: [] },
      Angrys: { type: Array, default: [] },
      Post_id: { type: Schema.Types.ObjectId, ref: "Post" },
      Creator: { type: Schema.Types.ObjectId, ref: "users" },
    },
  ],
});

module.exports = mongoose.model("comments", Comment);
