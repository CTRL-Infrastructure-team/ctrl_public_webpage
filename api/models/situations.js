const mongoose = require("mongoose"),
  { Schema } = mongoose,
  SituationsSchema = new Schema(
    {
      title: String,
      content: String,
      img_url: String,
      contributor: String,
      twitter_id: String
    },
    { timestamps: true }
  );

module.exports = mongoose.model("Situation", SituationsSchema);
