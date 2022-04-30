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
<<<<<<< HEAD
=======
//Remove refreshToken from the response
User.set("toJSON", {
  transform: function (doc, ret, options) {
    delete ret.refreshToken;
    return ret;
  },
});
mongoose.models = {}
User.plugin(passportLocalMongoose, { usernameField: "email" });
>>>>>>> 82223093b13f008567710c889ae1bc1caefff2c8

module.exports =mongoose.model("user", user);;
