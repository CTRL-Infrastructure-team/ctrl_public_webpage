const { Situation, SituationValidate } = require("../models/situations"),
  User = require("../models/user"),
  { uploadFiles } = require("../config/openstack"),
  { validationResult } = require("express-validator");
require("dotenv").config();

module.exports = {
  situationsList(req, res) {
    Situation.find({})
      .sort({ createdAt: -1 })
      .then(situations => {
        res.send(situations);
      });
  },
  show(req, res) {
    let situationId = req.params.situationId;
    Situation.findById(situationId).then(situation => {
      res.send(situation);
    });
  },
  async createSituation(req, res) {
    const receiveFiles = req.files,
      requestPath = "situation";
    User.findById(req.user).then(user => {
      username = user.username;
      let newSituation = new Situation({
        title: req.body.title,
        content: req.body.content,
        img_url:
          process.env.CONOHA_STORAGE_URL +
          "ctrl-situations/" +
          receiveFiles[0].originalname,
        contributor: username,
        twitter_id: "@example"
      });
      uploadFiles(requestPath, receiveFiles);
      newSituation.save(err => {
        if (err) {
          console.log(err);
        }
        res.send("response catch!");
      });
    });
  },
  SituationValidate: SituationValidate
};
