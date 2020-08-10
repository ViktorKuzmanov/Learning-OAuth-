const express = require("express");
const authRoutes = require("./routes/auth-routes");
const passportSetup = require("./config/passport-setup");
const mongoose = require("mongoose");
const keys = require("./config/keys");
const cookieSession = require("cookie-session");
const passport = require("passport");

const app = express();

app.set("view engine", "ejs");

mongoose.connect(keys.mongoDB.dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use("/auth", authRoutes);
app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey],
  })
);

// Initialize passport
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.render("home");
});

app.listen(3000, () => {
  console.log("listening of port 3000");
});
