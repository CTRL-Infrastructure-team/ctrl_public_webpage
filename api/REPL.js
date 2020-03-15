const mongoose = require("mongoose"),
  pastWorks = require("./model");
const data = require("./data").pastWorks;
let testPastwork;
const pastworkController = require("./controller/pastworkController");

mongoose.connect("mongodb://mongo:27017/User_db", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});
mongoose.Promise = global.Promise;

pastWorks
  .remove({})
  .then(item => console.log(item.useNewUrlParser))
  .then(() => {
    for (let slot of data) {
      pastWorks.create(slot).then(data => {
        // console.log(data);
      });
    }
    return pastWorks.create(data[0]);
  })
  .then(() => {
    return pastWorks
      .find()
      .limit(4)
      .exec();
  })
  .then(data => {
    console.log(data);
  });
