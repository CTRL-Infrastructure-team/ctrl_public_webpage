const passport = require("passport"),
  User = require("../models/user");

module.exports = {
  login: passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/progress",
    // failureFlash: true,
    session: true
  }),
  create(req, res, next) {
    console.log("/api/users");

    // let receiveName = req.body.username,
    //     receivePassword = req.body.password,
    let receiveName = "cotton",
      receivePassword = "password",
      newUser = new User({
        username: receiveName,
        password: receivePassword
      });

    newUser.save(err => {
      res.redirect("/");
    });
  },
  logout(req, res) {
    req.logout();
    res.send("logout!!");
  },
  common(req, res, next) {
    if (req.session.user) {
      User.findById(id).lean.exec((err, result) => {});
    } else {
    }
  }
};
