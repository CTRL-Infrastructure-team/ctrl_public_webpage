const { Situation, SituationValidate } = require("../models/situations"),
  User = require("../models/user"),
  { uploadFiles, deleteFiles } = require("../config/localfile");
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
    console.log(situationId);
    Situation.findById(situationId).then(situation => {
      res.send(situation);
    });
  },
  async createSituation(req, res) {
    const receiveFiles = req.files;

    User.findById(req.user).then(user => {
      let username = user.username,
          newSituation = new Situation({
            title: req.body.title,
            content: req.body.content,
            img_url:
              "/api/images/" + username + "/" +
              receiveFiles[0].filename + "." +
              receiveFiles[0].originalname.split(".").slice(-1)[0],
            contributor: username,
            twitter_id: "@example"
          });

      uploadFiles(receiveFiles, username);

      newSituation.save(err => {
        if (err) {
          console.log(err);
        }
        res.send("response catch!");
      });
    });
  },
  updateSituations(req, res) {
    User.findById(req.user).then(user => {
      const id = req.params.situationId,
        username = user.username,
        receiveFiles = req.files;
      
      Situation.findById(id).then(situation => {
        deleteFiles("./api/config/data" + situation.img_url.replace("/api/images", ""));

        const data = {
          title: req.body.title,
          content: req.body.content,
          img_url:
            "/api/images/" + username + "/" +
            receiveFiles[0].filename + "." +
            receiveFiles[0].originalname.split(".").slice(-1)[0],
          contributor: username
        };

        uploadFiles(receiveFiles, username);
        Situation.findByIdAndUpdate(id, data, err => {
          if (err) {
            console.log(err);
          }
          res.send("update Situation!");
        });
      });
    });
  },
  userSituations(req, res) {
    User.findById(req.user).then(user => {
      Situation.find({ contributor: user.username })
        .sort({ createdAt: -1 })
        .then(data => {
          res.send(data);
        })
        .catch(err => {
          console.log(err);
          res.send();
        });
    })
    .catch(err => {
      console.log(err);
      res.send();
    });
  },
  deleteSituation(req, res) {
    const id = req.params.situationId;
    
    Situation.findById(id).then(situation => {
      deleteFiles("./api/config/data" + situation.img_url.replace("/api/images", ""));
      
      Situation.findByIdAndDelete(id).then(result => {
        res.send('delete');
      })
    });
  },
  SituationValidate: SituationValidate
};
