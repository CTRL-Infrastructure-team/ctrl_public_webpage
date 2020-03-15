const mongoose = require("mongoose"),
  { Schema } = mongoose;

const pastWorks = new Schema({
  time: Date,
  title: String,
  content: String,
  download_url: String,
  img_url: String,
  contributor: { type: Schema.Types.ObjectId, ref: "Users" },
  producer: { type: Schema.Types.ObjectId, ref: "Users" },
  twitter_id: { type: Schema.Types.ObjectId, ref: "Users" }
});

module.exports = mongoose.model("pastWork", pastWorks);
