const mongoose = require("mongoose");
const { Schema } = mongoose;
const blog = require('../models/Blog')
const reply = require('../models/reply')
const comment = require('../models/Comment')
const user = mongoose.Schema({
    _id: Schema.Types.ObjectId,
  name: String,
  lastname: String,
  blog : [ { type: Schema.Types.ObjectId, ref: 'blog' }],
  Type: {
    type:String, 
    enum: ['user', 'specialist'],
    default: 'user'
  },
  reply :[{ type: Schema.Types.ObjectId, ref: 'reply' }],
comments :[{ type: Schema.Types.ObjectId, ref: 'comment' }],
  
  
});

module.exports =mongoose.model("user", user);;
