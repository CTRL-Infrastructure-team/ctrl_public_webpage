const passport = require("passport");

module.exports = {
  login: passport.authenticate("local", {
    successRedirect: "/edit/management",
    failureRedirect: "/login",
    session: true
  }),
  logout(req, res) {
    req.logout();
    res.send("logout success");
  },
  check(req, res) {
    console.log('req.user', req.user);
    res.json({ user: req.user });
  }
};
