const mongoose = require("mongoose");
const { Schema } = mongoose;
const reply = mongoose.Schema({
    _id: Schema.Types.ObjectId,
  desciption: String,
  date :Date,
<<<<<<< Updated upstream
  user :{ type: Schema.Types.ObjectId, ref: 'user' },
  comment :{ type: Schema.Types.ObjectId, ref: 'comment' },
=======
  user :{ type: Schema.Types.ObjectId, ref: 'users' },
  comment :{ type: Schema.Types.ObjectId, ref: 'commentaires' },
>>>>>>> Stashed changes
});

module.exports =mongoose.model("reply", reply);;