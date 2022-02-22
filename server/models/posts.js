const mongoose = require("mongoose");

var Schema = mongoose.Schema;

var Post = new Schema({
  Description: String,
  Date_creation: { type: Date, default: Date.now },
  Likes: { type: Number, default: 0 },
  Dislikes: { type: Number, default: 0 },
  Love: { type: Number, default: 0 },
  Nbr_comments: { type: Number, default: 0 },
  Private: Boolean,
  // Views: [Schema.Types.ObjectId],
  Creator: { type: String, required: true },
  //  Creator: { type: Schema.Types.ObjectId, ref: "User" },
  // comments: [{ body: "string", by: Schema.Types.ObjectId }],

  //  Shared: String,
  Photo: String,
  // Video : String,
  //Interessant: String,
});

module.exports = mongoose.model("posts", Post);
