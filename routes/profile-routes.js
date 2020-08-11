const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("you are logged in this is your profile and your username is = " + req.user.username);
});

module.exports = router;
