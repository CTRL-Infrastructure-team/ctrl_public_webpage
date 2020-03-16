const mongoose = require("mongoose"),
  pastWorks = require("../models/pastWork"),
  data = require("./data").pastWorks;
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
