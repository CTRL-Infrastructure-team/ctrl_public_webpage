const { PastWork, PastWorkValidate } = require("../models/pastWork"),
  User = require("../models/user"),
  { uploadFiles } = require("../config/openstack");
require("dotenv").config();

const convert = string => {
  return {
    katakana() {
      return string.replace(/[\u3041-\u3096]/g, function(match) {
        var chr = match.charCodeAt(0) + 0x60;
        return String.fromCharCode(chr);
      });
    },
    hiragana() {
      return string.replace(/[\u30a1-\u30f6]/g, function(match) {
        var chr = match.charCodeAt(0) - 0x60;
        return String.fromCharCode(chr);
      });
    }
  };
};

String.prototype.partMatch = function() {
  return new RegExp(this);
};

module.exports = {
  showSearch(req, res) {
    let serch = convert(req.body.serch);

    PastWork.find({ title: serch.katakana().partMatch() })
      // .find({ content: serch })
      .limit(10)
      .exec((err, data) => {
        err ? console.log(err.message) : console.log(data[0]);
        res.send(err || data);
      });
  },
  show(req, res) {
    let id = req.params.pastWorkId;
    console.log(id, req.params);
    PastWork.findById(id).then(value => {
      console.log(value);
      res.send(value);
    });
  },
  worksList(req, res) {
    PastWork.find({})
      .sort({ createdAt: -1 })
      .then(result => {
        res.send(result);
      });
  },
  createWork(req, res) {
    const receiveFiles = req.files,
      requestPath = "pastwork";
    let topImage = receiveFiles.filter(file => {
        return file.fieldname === "topImage";
      }),
      otherImage = receiveFiles.filter(file => {
        return file.fieldname === "otherImage";
      }),
      gameFile = receiveFiles.filter(file => {
        return file.fieldname === "gameFile";
      });

    User.findById(req.user).then(user => {
      username = user.username;
      let newWork = new PastWork({
        title: req.body.title,
        content: req.body.content,
        download_url:
          process.env.CONOHA_STORAGE_URL +
          "ctrl-pastworks/" +
          gameFile[0].originalname,
        top_img_url:
          process.env.CONOHA_STORAGE_URL +
          "ctrl-pastworks/" +
          topImage[0].originalname,
        other_img_url: [
          process.env.CONOHA_STORAGE_URL +
            "ctrl-pastworks/" +
            otherImage[0].originalname,
          process.env.CONOHA_STORAGE_URL +
            "ctrl-pastworks/" +
            otherImage[1].originalname
        ],
        contributor: username,
        twitter_id: "@example"
      });
      uploadFiles(requestPath, receiveFiles);

      newWork.save(err => {
        console.log(err);
        res.send("push work!");
      });
    });
  },
  userPastWorks(req, res) {
    User.findById(req.user).then(user => {
      PastWork.find({ contributor: user.username }).then(data => {
        res.send(data);
      });
    });
  },
  deleteWork(req, res) {

    res.send('send');
  },
  PastWorkValidate
};
