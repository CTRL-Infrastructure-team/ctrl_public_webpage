const mongoose = require("mongoose"),
  { Schema } = mongoose,
  { checkSchema } = require("express-validator");
SituationsSchema = new Schema(
  {
    title: String,
    content: String,
    img_url: String,
    contributor: String
  },
  { timestamps: true }
);

const validateSituationSchema = checkSchema({
  title: {
    in: ["body"],
    exists: true,
    errorMessage: "title is wrong",
    isLength: { options: { max: 15 } }
  },
  content: {
    in: ["body"],
    exists: true,
    errorMessage: "content is wrong"
  }
});

SituationsSchema.pre("save", function(next) {
  modifiedContent = this.content.replace(/\n/g,"<br>");
  this.content = modifiedContent;

  next();
});

module.exports = {
  Situation: mongoose.model("Situation", SituationsSchema),
  SituationValidate: validateSituationSchema
};
