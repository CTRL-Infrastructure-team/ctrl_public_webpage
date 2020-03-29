const Situation = require("../models/situations"),
      User = require("../models/user"),
      openstack = require("../config/openstack");
require('dotenv').config();

module.exports = {
  situationsList(req, res) {
    Situation.find({}).sort({ createdAt: -1 }).then(situations => {
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
    const receiveFiles = req.files,
          requestPath = 'situation';
    openstack(requestPath, receiveFiles);
    
    User.findById(req.user).then(user => {
      username = user.username;
      let newSituation = new Situation({
        title: req.body.title,
        content: req.body.inquery,
        img_url: process.env.CONOHA_STORAGE_URL	+ 'ctrl-situations/' + receiveFiles[0].originalname,
        contributor: username,
        twitter_id: '@example'
      });
      
      newSituation.save(err => {
        console.log(err);
        res.send("response catch!");
      });
    });
  }
};
