const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("./keys");

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.google.clientID,
      clientSecret: keys.google.clientSecret,
      // This is the Authorized redirect URI we set up in Google Console (callback route)
      callbackURL: "/auth/google/redirect",
    },
    // This callback function is fired when user is redirected to callback route
    (accessToken, refreshToken, profile, cb) => {
      console.log("v1");
      console.log(profile);
    }
  )
);
