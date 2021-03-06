const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("./keys");
const User = require("../models/user-model");

//
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.google.clientID,
      clientSecret: keys.google.clientSecret,
      // This is the Authorized redirect URI we set up in Google Console (callback route)
      callbackURL: "/auth/google/redirect",
    },
    // This callback function is fired when user is redirected to callback route
    function (accessToken, refreshToken, profile, done) {
      // check if user already exists in our database
      User.findOne({ googleId: profile.id }).then((currentUser) => {
        if (currentUser) {
          // we already have the user in database
          done(null, currentUser);
        } else {
          // if we don't already have the user create it in our Database
          new User({
            username: profile.displayName,
            googleId: profile.id,
            thumbnail: profile._json.picture,
          })
            .save()
            .then((newUser) => {
              done(null, newUser);
            });
        }
      });
    }
  )
);
