const mongoose = require("mongoose");

var Schema = mongoose.Schema;

var Post = new Schema({
  Description: String,
  Date_creation: { type: Date, default: Date.now },
  Likes: { type: Array, default: [] },
  Dislikes: { type: Array, default: [] },
  Nbr_comments: { type: Number, default: 0 },
  Creator: { type: Schema.Types.ObjectId, ref: "users" },
  comments: [{ type: Schema.Types.ObjectId, ref: "comments" }],
  Photo: String,
  Epinglé: { type: Boolean, default: false },
});

module.exports = mongoose.model("posts", Post);
