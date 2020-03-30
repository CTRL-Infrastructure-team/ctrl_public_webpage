const mongoose = require("mongoose"),
  { Schema } = mongoose,
  { checkSchema } = require("express-validator");
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
