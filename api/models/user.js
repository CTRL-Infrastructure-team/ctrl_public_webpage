const mongoose = require("mongoose"),
  { Schema } = mongoose,
  bcrypt = require("bcrypt");
const UserSchema = new Schema({
  username: String,
  password: String,
  twitter_id: String,
  works: [{ type:  Schema.Types.ObjectId, ref: 'pastWorksSchama' }],
  situations: [{ type:  Schema.Types.ObjectId, ref: 'SituationsSchema'}],
  rentingBooks: [{ type:  Schema.Types.ObjectId, ref: 'BooksSchema' }]
});

UserSchema.pre("save", async function(next) {
  let user = this,
    hashed_password = await bcrypt.hashSync(user.password, 10);

  user.password = hashed_password;
  next();
});

module.exports = mongoose.model("User", UserSchema);
