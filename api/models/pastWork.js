const mongoose = require("mongoose"),
  { Schema } = mongoose,
  pastWorksSchama = new Schema(
    {
      title: {
        type: String,
        required: true
      },
      content: String,
      download_url: String,
      top_img_url: String,
      other_img_url: [{
         type: String 
      }],
      contributor: String,
      twitter_id: String,
      producer: String
      // contributor: { type: Schema.Types.ObjectId, ref: "User" },
      // twitter_id: { type: Schema.Types.ObjectId, ref: "User" }
    },
    { timestamps: true }
  );

module.exports = mongoose.model("PastWork", pastWorksSchama);
