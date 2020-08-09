require("dotenv").config();
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("./keys");

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.google.googleID,
      clientSecret: keys.google.googleSecret,
      // This is the Authorized redirect URI we set up in Google Console
      callbackURL: "/auth/google/redirect",
    },
    function (accessToken, refreshToken, profile, cb) {
      User.findOrCreate({ googleId: profile.id }, function (err, user) {
        return cb(err, user);
      });
    }
  )
);
