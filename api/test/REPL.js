const mongoose = require("mongoose"),
  pastWorks = require("../models/pastWork"),
  data = require("./data").pastWorks;

mongoose.connect("mongodb://localhost:27017/ctrlPublicSite", {
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
