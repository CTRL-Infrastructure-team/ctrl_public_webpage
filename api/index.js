const express = require("express");
const app = express();
// const mongoose = rewuire('mongoose');
// const mongoose = mongoose.Schema;
const mailController = require("./controller/mailController");
const pastworkController = require("./controller/pastworkController");
const mongoose = require("mongoose");
// var currentSituation = new Schema({
//     'date': Date,
//     'title': String,
//     'imgUrl': String,
//     '': String,
//     'Twitter': String
// });
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
mongoose.connect("mongodb://mongo:27017/User_db", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});
mongoose.Promise = global.Promise;
// app.get("/progress", function(req, res) {
//     var pastWorks = new Schema({
//         'date': Date,
//         'title': String,
//         'imgUrl': String,
//         '': String,
//         'Twitter': String
//     });
//     mongoose.connect('mongodb://127.0.0.1/strlPublicSite');
//     var pastWorks = mongoose.model('pastWorks', pastWorks);

//     pastWorks.find({}, function(err, result){
//         res.json();
//     })
// });
app.use((req, res, next) => {
  console.log(req.body, "res");
  next();
});

app.get("/", (req, res) => {
  res.send("sendOK");
});
app.post("/mail", mailController.sendMail);

app.post("/pastworksearch", pastworkController.showSearch);

module.exports = {
  path: "/api/",
  handler: app
};
