const mongoose = require("mongoose"),
  { Schema } = mongoose,
  { checkSchema } = require("express-validator"),
  pastWorksSchama = new Schema(
    {
      title: {
        type: String,
        required: true
      },
      content: String,
      download_url: String,
      top_img_url: String,
      other_img_url: [
        {
          type: String
        }
      ],
      contributor: String,
      twitter_id: String,
      producer: String
    },
    { timestamps: true }
  ),
  validatePastWorkSchema = checkSchema({
    title: {
      in: ["body"],
      exists: true,
      errorMessage: "title is wrong",
      isLength: { options: { max: 15 }, errorMessage: "max 15words" }
    },
    content: {
      in: ["body"],
      exists: true,
      errorMessage: "content is wrong"
    }
  });

module.exports = {
  PastWork: mongoose.model("PastWork", pastWorksSchama),
  PastWorkValidate: validatePastWorkSchema
};
