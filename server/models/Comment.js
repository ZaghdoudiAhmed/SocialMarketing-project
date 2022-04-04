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

module.exports =mongoose.model("comment", comment);;