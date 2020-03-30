const express = require("express"),
  app = express(),
  passport = require("passport"),
  session = require("express-session"),
  mongoose = require("mongoose"),
  passportLocal = require("./config/passport/local"),
  multer = require("multer");
  upload = multer({ dest: './api/config/cache/' })
// let storage = multer.diskStorage({
//   destination: (req, file, cb) => { cb(null, '/api/config/cache/') },
//   filename: (req, file, cb) => { cb(null, file.originalname) }
// });
// const upload = multer({ storage: storage });

const mailController = require("./controllers/mailController");
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
app.get("/situations", situationController.situationsList);
app.post("/situation", upload.any(), situationController.createSituation);
app.get("/situations/:situationId", situationController.show);
app.get("/user/situations", situationController.userSituations);

//pastworkMethods
app.post("/pastworksearch", pastworkController.showSearch);
app.post("/pastWork", upload.any(), pastworkController.createWork);
app.get("/pastWork/:pastWorkId", pastworkController.show);
app.get("/pastWorks", pastworkController.worksList);
app.get("/user/pastWorks", pastworkController.userPastWorks);

//mailMethods
app.post("/mail", mailController.sendMail, mailController.sendSlack);
module.exports = {
  path: "/api/",
  handler: app
};
