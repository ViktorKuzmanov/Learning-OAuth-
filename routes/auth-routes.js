const router = require("express").Router();
const passport = require("passport");

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/logout", (req, res) => {
  // TODO: Handle with passport
  res.send("Loggin out");
});

// /auth/google route - Present the use with consent screen (on google button click)
router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

// This is the google strategy callback route. You are redirected after click allow (consent screen)
router.get("/google/redirect", passport.authenticate("google"), (req, res) => {
  // you can acess req.user here
  res.redirect("/profile");
});

module.exports = router;
