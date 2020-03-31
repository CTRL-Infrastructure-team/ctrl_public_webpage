const { Situation, SituationValidate } = require("../models/situations"),
  User = require("../models/user"),
  { uploadFiles, deleteFiles } = require("../config/openstack"),
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
      let username = user.username,
          situationIdentification = Math.random().toString(36).slice(-8),
          newSituation = new Situation({
            title: req.body.title,
            content: req.body.content,
            img_url:
              process.env.CONOHA_STORAGE_URL +
              "ctrl-situations/" +
              situationIdentification +
              receiveFiles[0].originalname,
            contributor: username,
            twitter_id: "@example"
          });
      uploadFiles(requestPath, receiveFiles, situationIdentification);
      newSituation.save(err => {
        if (err) {
          console.log(err);
        }
        res.send("response catch!");
      });
    });
  },
  userSituations(req, res) {
    User.findById(req.user).then(user => {
      Situation.find({ contributor: user.username })
        .sort({ createdAt: -1 })
        .then(data => {
        res.send(data);
      });
    });
  },
  deleteSituation(req, res) {
    let id = req.params.situationId,
        requestPath = "situation";
    Situation.findById(id).then(situation => {
      deleteFiles(requestPath, situation.img_url);
      Situation.findByIdAndDelete(id).then(result => {
        console.log("result", result);
        res.send('delete');
      })
    });
  },
  SituationValidate: SituationValidate
};
