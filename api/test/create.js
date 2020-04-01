const mongoose = require("mongoose");
var os = require("os");
var hostname = os.hostname();
const tl =
  hostname.includes("DESKTOP") ||
  hostname.includes("localhost") ||
  hostname.includes("MAC");
  
const userData = require('./user_data.json'),
      User = require("../models/user");

      if (tl) {
  mongoose.connect("mongodb://localhost:27017/ctrlPublicSite", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
} else {
  mongoose.connect("mongodb://localhost:27017/ctrlPublicSite", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
}
mongoose.Promise = global.Promise;


for(let slot of userData) {
  User.create(slot);
}

User
  .find({})
  .then(result => {
    console.log(result);
  });
