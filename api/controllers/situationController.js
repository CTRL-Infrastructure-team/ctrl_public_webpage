const Situation = require("../models/situations");

module.exports = {
  situationsList(req, res) {
    Situation.find({}).then(situations => {
      res.send(situations);
    })
  },
  show(req, res) {
    let situationId = req.params.situationId
    Situation.findById(situationId).then(situation => {
      res.send(situation);
    });
  }
};
