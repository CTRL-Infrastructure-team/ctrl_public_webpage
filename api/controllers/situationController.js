const Situation = require("../models/situations");

module.exports = {
  show(req, res) {
    console.log("api/situations");
    Situation.find({}).then(situations => {
      res.send(situations);
    })
    // res.send("received data!")
  }
};
