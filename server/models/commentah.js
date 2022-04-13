const mongoose = require("mongoose");
const { Schema } = mongoose;
const comment = mongoose.Schema({
    _id: Schema.Types.ObjectId,
    subject : String,
  desciption: String,
  reply :[ { type: Schema.Types.ObjectId, ref: 'reply' }],
  blog :{ type: Schema.Types.ObjectId, ref: 'blog' },
  publisher :{ type: Schema.Types.ObjectId, ref: 'users' },
});

module.exports =mongoose.model("commentaire", comment);