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
  },
  createSituation(req, res) {
    const filename = req.files[0].buffer.toString();
    console.log("filename", filename);

    User.findById(req.user).then(user => {
      username = user.username
    })

    let newSituation = new Situation({
      title: req.body.title,
      content: req.body.content,
      img_utl: '#',
      contributor: username,
      twitter_id: '@example'
    })
    
    newSituation.save(err => {
      console.log(err);
      res.send();
    });
  }
};
