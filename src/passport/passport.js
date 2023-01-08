const passport = require("passport");
const Strategy = require("passport-local");

passport.use("register", new Strategy({
    passReqToCallback: true
}, (req, username, password, done) => {
    return false;
}));