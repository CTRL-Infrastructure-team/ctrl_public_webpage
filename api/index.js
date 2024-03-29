const express = require("express"),
  app = express(),
  passport = require("passport"),
  session = require("express-session"),
  passportLocal = require("./config/passport/local"),
  multer = require("multer"),
  { validationResult } = require("express-validator"),
  upload = multer({ dest: "./api/config/data/" });

const mailController = require("./controllers/mailController"),
  pastworkController = require("./controllers/pastworkController"),
  situationController = require("./controllers/situationController"),
  publishController = require("./controllers/publishController"),
  userController = require("./controllers/userController"),
  assetController = require("./controllers/assetController");

const os = require("os");
const hostname = os.hostname();
const tl =
  hostname.includes("DESKTOP") ||
  hostname.includes("localhost") ||
  hostname.includes("MAC");

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
  console.log(errors.array());
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
app.post("/logout", userController.logout);
app.get("/loginCheck", userController.check);

app.get("/images/:user/:imagePath", assetController.getImg);
app.get("/games/:user/:gamePath", assetController.getFile);

//situationMethods
app.get("/situations", situationController.situationsList);
app.post(
  "/situation",
  upload.any(),
  commonValidateError,
  situationController.createSituation
);
app.get("/situations/:situationId", situationController.show);
app.get("/user/situations", situationController.userSituations);
app.put("/situations/:situationId", upload.any(), situationController.updateSituations);
app.delete("/situations/:situationId", situationController.deleteSituation);

//pastworkMethods
app.post("/pastworksearch", pastworkController.showSearch);
app.post(
  "/pastWork",
  upload.any(),
  commonValidateError,
  pastworkController.createWork
);
app.get("/pastWork/:pastWorkId", pastworkController.show);
app.put("/pastWork/:pastWorkId", upload.any(), pastworkController.updateWork);
app.delete("/pastWork/:pastWorkId", pastworkController.deleteWork);
app.get("/pastWorks", pastworkController.worksList);
app.get("/user/pastWorks", pastworkController.userPastWorks);

//publishMethods
app.get("/publication/recentTopics", publishController.recentTopics);
app.get("/publication/pastTerms", publishController.pastTerms);
app.get("/publication/term/:termId", publishController.oneTerm);
app.get("/publication/termTopics/:termId", publishController.pastTermTopics);
app.get("/publication/topic/:topicId", publishController.oneTopic);
app.get("/publication/slide/:topicId", publishController.slideList);

//mailMethods
app.post(
  "/mail",
  mailController.validateMail,
  commonValidateError,
  mailController.sendMail,
  mailController.sendDiscord
);

module.exports = {
  path: "/api/",
  handler: app
};
