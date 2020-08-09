const router = require("express").Router();

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/logout", (req, res) => {
  // TODO: Handle with passport
  res.send("Loggin out");
});

router.get("/google", (req, res) => {
  // TODO: handle with passport
  res.send("Loggin in with google");
});

module.exports = router;
