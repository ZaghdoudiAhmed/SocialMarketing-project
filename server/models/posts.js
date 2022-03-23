const mongoose = require("mongoose");

var Schema = mongoose.Schema;

var Post = new Schema({
  Description: String,
  Date_creation: { type: Date, default: Date.now },
  Likes: { type: Array, default: [] },
  Dislikes: { type: Array, default: [] },
  Nbr_comments: { type: Number, default: 0 },
  Private: Boolean,
  // Views: [Schema.Types.ObjectId],
  Creator: { type: Schema.Types.ObjectId, ref: "users" },
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],

  Photo: String,
});

module.exports = mongoose.model("posts", Post);
