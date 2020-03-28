const Situation = require("../models/situations"),
      openstack = require("../config/openstack");

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
    const receiveFiles = req.files;
    let receiveTitle = req.body.title;
    console.log("title", receiveTitle);
    console.log("file", receiveFile);
    openstack(receiveFiles);
    res.send("response catch!");

    // User.findById(req.user).then(user => {
    //   username = user.username
    // })

    // let newSituation = new Situation({
    //   title: req.body.title,
    //   content: req.body.content,
    //   img_utl: '#',
    //   contributor: username,
    //   twitter_id: '@example'
    // })
    
    // newSituation.save(err => {
    //   console.log(err);
    //   res.send();
    // });
  }
};
