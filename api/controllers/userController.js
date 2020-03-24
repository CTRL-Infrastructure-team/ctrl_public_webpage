const passport = require("passport"),
  User = require("../models/user");

module.exports = {
  login: passport.authenticate("local", {
    // successRedirect: "/pastWorks/loginSample",
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
    res.send("logout success");
  },
  common(req, res) {
    if (req.user) {
      User.findById(req.user).then(result => {
        console.log(result);
      });
      res.send();
      } else {
      console.log("no user!");
      res.send();
    }
  }
};
