const express = require("express"),
  app = express(),
  progress = require("./controllers/progress"),
  situations = require("./controllers/situations"),
  users = require("./controllers/users"),
  passport = require("passport"),
  session = require("express-session"),
  database = require("./models/models");

// const mailController = require("./controllers/mailController");
const pastworkController = require("./controllers/pastworkController");
const mongoose = require("mongoose");

let pastWorks = database.pastWorks;
currentSituation = database.currentSituation;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", progress);
app.use("/", situations);
app.use("/", users);
// require('./passport')(app);
const passportConfig = require("./passport");
passportConfig(app);
mongoose.connect("mongodb://mongo:27017/User_db", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});
// mongoose.Promise = global.Promise;

app.use(passport.session());
app.use(passport.initialize());

// app.post("/mail", mailController.sendMail);

app.post("/pastworksearch", pastworkController.showSearch);

module.exports = {
  path: "/api/",
  handler: app
};
