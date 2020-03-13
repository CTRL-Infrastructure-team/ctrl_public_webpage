const express = require("express");
const app = express();
// const mongoose = rewuire('mongoose');
// const mongoose = mongoose.Schema;

const mailController = require("./controller/mailController");
// var currentSituation = new Schema({
//     'date': Date,
//     'title': String,
//     'imgUrl': String,
//     '': String,
//     'Twitter': String
// });

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

app.get("/mail", mailController.sendMail);

module.exports = {
  path: "/api/",
  handler: app
};
