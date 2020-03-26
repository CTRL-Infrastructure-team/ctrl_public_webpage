const mongoose = require("mongoose"),
  { Schema } = mongoose,
  SituationsSchema = new Schema(
    {
      title: String,
      content: String,
      img_url: String,
      contributor: String,
      twitter_id: String
      // contributor: { type: Schema.Types.ObjectId, ref: "Users" },
      // twitter_id: { type: Schema.Types.ObjectId, ref: "Users" }
    },
    { timestamps: true }
  );

module.exports = mongoose.model("Situation", SituationsSchema);
