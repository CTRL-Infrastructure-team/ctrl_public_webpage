const fs = require('fs');

const mongoose = require("mongoose");
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
  mongoose.connect("mongodb://localhost:27017/ctrlPublicSite", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
}
mongoose.Promise = global.Promise;

const User = require("../models/user");
const { Situation, SituationValidate } = require("../models/situations")
const { PastWork, PastWorkValidate } = require("../models/pastWork")

f();
async function f(){
  const u = await User.find({});
  const s = await Situation.find({});
  const p = await PastWork.find({});
  fs.writeFileSync('users.json', JSON.stringify(u,null,"\t"));
  fs.writeFileSync('situations.json', JSON.stringify(s,null,"\t"));
  fs.writeFileSync('pastworks.json', JSON.stringify(p,null,"\t"));
  await mongoose.disconnect();
}