const express = require("express"),
  app = express(),
  passport = require("passport"),
  session = require("express-session"),
  mongoose = require("mongoose"),
  passportLocal = require("./config/passport/local"),
  // auth = require('connect-ensure-login').ensureLoggedIn('/login'),
  multer = require("multer"),
  { validationResult } = require("express-validator"),
  upload = multer({ dest: "./api/config/cache/" });

const mailController = require("./controllers/mailController"),
  pastworkController = require("./controllers/pastworkController"),
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
    useUnifiedTopology: false
  });
} else {
  mongoose.connect("mongodb://localhost:27017/ctrlPublicSite", {
    useNewUrlParser: true,
    useUnifiedTopology: false
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

const commonValidateError = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.json({
      status: "error",
      error: errors.array()
    });
  }
  next();
};
app.use(passport.initialize());
app.use(passport.session());
passport.use(passportLocal);

passport.serializeUser((user, done) => {
  console.log(user);
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
app.get("/loginCheck", userController.check);

//situationMethods
app.get("/situations", situationController.situationsList);
app.post(
  "/situation",
  upload.any(),
  situationController.SituationValidate,
  commonValidateError,
  situationController.createSituation
);
app.get("/situations/:situationId", situationController.show);
app.get("/user/situations", situationController.userSituations);
app.delete("/situations/:situationId", situationController.deleteSituation);

//pastworkMethods
app.post("/pastworksearch", pastworkController.showSearch);
app.post(
  "/pastWork",
  upload.any(),
  pastworkController.PastWorkValidate,
  commonValidateError,
  pastworkController.createWork
);
app.get("/pastWork/:pastWorkId", pastworkController.show);
app.delete("/pastWork/:pastWorkId", pastworkController.deleteWork);
app.get("/pastWorks", pastworkController.worksList);
app.get("/user/pastWorks", pastworkController.userPastWorks);

//mailMethods
app.post(
  "/mail",
  mailController.validateMail,
  commonValidateError,
  mailController.sendMail,
  mailController.sendSlack
);

module.exports = {
  path: "/api/",
  handler: app
};
