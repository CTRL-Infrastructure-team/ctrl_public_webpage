const mongoose = require("mongoose"),
  { Schema } = mongoose,
  { checkSchema } = require("express-validator"),
  pastWorksSchema = new Schema(
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

pastWorksSchema.pre("save", function(next) {
  modifiedContent = this.content.replace(/\n/g,"<br>");
  this.content = modifiedContent;

  next();
});
  
module.exports = {
  PastWork: mongoose.model("PastWork", pastWorksSchema),
  PastWorkValidate: validatePastWorkSchema
};
