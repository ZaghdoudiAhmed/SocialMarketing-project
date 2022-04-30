const mongoose = require("mongoose");
const { Schema } = mongoose;
const reply = require('../models/reply')
const blog = require('../models/Blog')
const user = require('../models/User')
const comment = mongoose.Schema({
    _id: Schema.Types.ObjectId,
    subject : String,
  desciption: String,
  reply :[ { type: Schema.Types.ObjectId, ref: 'reply' }],
  blog :{ type: Schema.Types.ObjectId, ref: 'blog' },
  publisher :{ type: Schema.Types.ObjectId, ref: 'user' },
});

<<<<<<< HEAD
module.exports =mongoose.model("comment", comment);;
=======
module.exports = mongoose.model("comments", Comment);
>>>>>>> 82223093b13f008567710c889ae1bc1caefff2c8
