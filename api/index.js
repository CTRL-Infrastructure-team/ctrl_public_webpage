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

var os = require("os");
var hostname = os.hostname();
const tl =
  hostname.includes("DESKTOP") ||
  hostname.includes("localhost") ||
  hostname.includes("MAC");

if (tl) {
  mongoose.connect("mongodb://localhost:27017/ctrlPublicSite", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
} else {
  mongoose.connect("mongodb://mongo:27017/ctrlPublicSite", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
}
mongoose.Promise = global.Promise;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false
  })
);

app.use(passport.initialize());
app.use(passport.session());
passport.use(passportLocal);

passport.serializeUser((user, done) => {
  console.log(user)
  done(null, user.id);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

// create show update delete

//userMethods
app.post("/login", userController.login);
app.post("/users/create", userController.create);
app.post("/logout", userController.logout);
app.get("/userTest", userController.common);

//situationMethods

//pastworkMethods
app.post("/pastworksearch", pastworkController.showSearch);
app.get("/pastWork/:pastWorkId", pastworkController.show);
app.get('/pastWorks', pastworkController.worksList);

//mailMethods
// app.post("/mail", mailController.sendMail);
module.exports = {
  path: "/api/",
  handler: app
};
