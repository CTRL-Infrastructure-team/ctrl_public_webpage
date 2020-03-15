const mongoose = require("mongoose"),
  { Schema } = mongoose,
  bcrypt = require("bcrypt");
const UserSchema = new Schema({
  username: String,
  password: String,
  twitter_id: String
});

UserSchema.pre("save", function(next) {
  let user = this,
    hashed_password = bcrypt.hashSync(user.password, 10);

  user.password = hashed_password;
  next();
});

module.exports = mongoose.model("User", UserSchema);