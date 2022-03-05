const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../../models/user')

passport.use(new LocalStrategy(User.authenticate()))
/*passport.use(new LocalStrategy(
    {usernameField:"email"},
    function(username, password, done) {
        return done(null, false, {message:'Unable to login'})
    }
));*/

passport.serializeUser(User.serializeUser())