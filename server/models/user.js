const mongoose = require("mongoose");

const passportLocalMongoose = require("passport-local-mongoose");
var Schema = mongoose.Schema;
const Session = new Schema({
  refreshToken: {
    type: String,
    default: "",
  },
});

var User = new Schema({
  name: String,
  status: {
    type: String,
    default: "active",
  },
  lastname: String,
  email: {
    type: String,
    allowNull: false,
  },
  role: {
    type: String,
    default: "user",
  },
  verified: {
    type: Boolean,
    default: false,
  },
  gender: {
    type: String,
    allowNull: false,
  },
  firstTime: {
    type: Boolean,
    default: true,
  },
  profilepic: {
    type: Array,
  },
  coverpic: {
    type: Array,
  },
  interests: {
    type: Array,
  },
  phone: {
    type: String,
  },
  address: {
    type: String,
  },
  bio: {
    type: String,
  },
  fblink: {
    type: String,
  },
  lilink: {
    type: String,
  },
  birthday: {
    type: Date,
  },
  confirmation: {
    code: {
      type: String,
    },
    date: {
      type: Date,
      default: new Date(),
    },
  },
  //auth & session
  authStrategy: {
    type: String,
    default: "local",
  },
  refreshToken: {
    type: [Session],
  },
  followers: [{ type: Schema.Types.ObjectId, ref: "users" }],
  followings: [{ type: Schema.Types.ObjectId, ref: "users" }],
});
//Remove refreshToken from the response
User.set("toJSON", {
  transform: function (doc, ret, options) {
    delete ret.refreshToken;
    return ret;
  },
});
mongoose.models = {};
User.plugin(passportLocalMongoose, { usernameField: "email" });

module.exports = mongoose.model("users", User);
