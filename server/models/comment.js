const mongoose = require("mongoose");

var Schema = mongoose.Schema;

var Comment = new Schema({
  Body: String,
  Date_creation: { type: Date, default: Date.now },
  Likes: { type: Number, default: 0 },
  Dislikes: { type: Number, default: 0 },
  Creator: { type: Schema.Types.ObjectId, ref: "users" },
  Post_id: { type: Schema.Types.ObjectId, ref: "Post" },
  comments: [
    {
      Body: String,
      Date_creation: { type: Date, default: Date.now },
      Likes: { type: Number, default: 0 },
      Dislikes: { type: Number, default: 0 },
      Post_id: { type: Schema.Types.ObjectId, ref: "Post" },
      Creator: { type: Schema.Types.ObjectId, ref: "users" },
    },
  ],
});

<<<<<<< Updated upstream
<<<<<<< HEAD
module.exports =mongoose.model("comment", comment);;
=======
module.exports = mongoose.model("comments", Comment);
>>>>>>> 82223093b13f008567710c889ae1bc1caefff2c8
=======
module.exports = mongoose.model("comments", Comment);
>>>>>>> Stashed changes
