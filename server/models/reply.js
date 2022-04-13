const mongoose = require("mongoose");
const { Schema } = mongoose;

const reply = mongoose.Schema({
    _id: Schema.Types.ObjectId,
  desciption: String,
  date :Date,
  user :{ type: Schema.Types.ObjectId, ref: 'users' },
  user :{ type: Schema.Types.ObjectId, ref: 'users' },
  comment :{ type: Schema.Types.ObjectId, ref: 'commentaires' },

});

module.exports =mongoose.model("reply", reply);;
