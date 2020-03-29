const Situation = require("../models/situations"),
      User = require("../models/user"),
      openstack = require("../config/openstack");
  
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
    const receiveFiles = req.files;
    openstack(receiveFiles);
    
    User.findById(req.user).then(user => {
      username = user.username;
      let newSituation = new Situation({
        title: req.body.title,
        content: req.body.inquery,
        img_url: 	`https://object-storage.tyo2.conoha.io/v1/nc_da8d3184995e4db49935a7971c8d6b03/ctrl-situations/${receiveFiles[0].originalname}`,
        contributor: username,
        twitter_id: '@example'
      })
      
      newSituation.save(err => {
        console.log(err);
        res.send("response catch!");
      });
    })

  }
};
