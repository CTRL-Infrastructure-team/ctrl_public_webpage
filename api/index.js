const express = require("express"),
  app = express(),
  passport = require("passport"),
  session = require("express-session"),
  mongoose = require("mongoose"),
  passportLocal = require("./passport/local");

// const mailController = require("./controllers/mailController");
const pastworkController = require("./controllers/pastworkController"),
  situationController = require("./controllers/situationController"),
  userController = require("./controllers/userController");

mongoose.connect("mongodb://mongo:27017/ctrlPublicSite", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
mongoose.Promise = global.Promise;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize());
app.use(passport.session());
app.use(
  session({
    secret: "keyboard cat",
    resave: true,
    saveUninitialized: false
  })
);
passport.use(passportLocal);

// create show update delete

//userMethods
app.post("/login", userController.login);
app.post("/users/create", userController.create);
app.post("/logout", userController.logout);

//situationMethods

//pastworkMethods
app.post("/pastworksearch", pastworkController.showSearch);

//mailMethods
// app.post("/mail", mailController.sendMail);
module.exports = {
  path: "/api/",
  handler: app
};
