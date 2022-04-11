const mongoose = require("mongoose");
const { Schema } = mongoose;
const comment = require('../models/Comment')
const user = require('../models/User')
const reply = mongoose.Schema({
    _id: Schema.Types.ObjectId,
  desciption: String,
  date :Date,
  user :{ type: Schema.Types.ObjectId, ref: 'users' },
  comment :{ type: Schema.Types.ObjectId, ref: 'comment' },
});

module.exports =mongoose.model("reply", reply);;