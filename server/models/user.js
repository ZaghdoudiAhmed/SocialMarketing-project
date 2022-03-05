const mongoose = require('mongoose');

const passportLocalMongoose = require('passport-local-mongoose')
var Schema = mongoose.Schema;
const Session = new Schema({
    refreshToken: {
        type: String,
        default: "",
    },
})
var User = new Schema(
    {
        name : String,
        email : {
            type: String,
            allowNull: false,

        },
        //auth & session

        authStrategy: {
            type: String,
            default: "local",
        },
        points: {
            type: Number,
            default: 50,
        },
        refreshToken: {
            type: [Session],
        },
    });
//Remove refreshToken from the response
User.set("toJSON", {
    transform: function (doc, ret, options) {
        delete ret.refreshToken
        return ret
    },
})
User.plugin(passportLocalMongoose,{ usernameField : 'email' })

module.exports = mongoose.model('users', User);

