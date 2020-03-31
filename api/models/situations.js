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
module.exports = {
  Situation: mongoose.model("Situation", SituationsSchema),
  SituationValidate: validateSituationSchema
};
