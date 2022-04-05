const mongoose = require("mongoose");

var Schema = mongoose.Schema;

var Conversation = new Schema({
  members: {
    type: Array,
  },
});

module.exports = mongoose.model("conversations", Conversation);
