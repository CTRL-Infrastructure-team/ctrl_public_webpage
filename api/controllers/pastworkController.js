const { PastWork, PastWorkValidate } = require("../models/pastWork"),
  User = require("../models/user"),
  { uploadFiles, deleteFiles } = require("../config/localfile");
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
      })
      .catch(err => {
        console.log();
        res.send(err);
      });
  },
  createWork(req, res) {
    const receiveFiles = req.files;

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
      let username = user.username,
          receiveTwitterId = '';

      if(req.body.twitter === "true") {
        receiveTwitterId = user.twitter_id
      }

      let newWork = new PastWork({
        title: req.body.title,
        content: req.body.content,
        download_url:
          "/api/games/" + username + "/" +
          gameFile[0].filename + "." + 
          gameFile[0].originalname.split(".").slice(-1)[0],
        top_img_url:
          "/api/images/" + username + "/" +
          topImage[0].filename + "." + 
          topImage[0].originalname.split(".").slice(-1)[0],
        other_img_url: [
          "/api/images/" + username + "/" +
          otherImage[0].filename + "." + 
          otherImage[0].originalname.split(".").slice(-1)[0],
          "/api/images/" + username + "/" +
          otherImage[1].filename + "." + 
          otherImage[1].originalname.split(".").slice(-1)[0]
        ],
        contributor: username,
        twitter_id: receiveTwitterId
      });
      uploadFiles(receiveFiles, username);

      newWork.save(err => {
        if(err) {
          console.log(err);
        }
        res.send("push work!");
      });
    });
  },
  updateWork(req, res) {
    User.findById(req.user).then(user => {
      const id = req.params.pastWorkId,
            username = user.username,
            receiveFiles = req.files;

      let receiveTwitterId = '';
      
      if(req.body.twitter === "true") {
        receiveTwitterId = user.twitter_id;
      }

      PastWork.findById(id).then(work => {
        deleteFiles("./api/config/data" + work.top_img_url.replace("/api/images", ""));
        deleteFiles("./api/config/data" + work.download_url.replace("/api/games", ""));
        work.other_img_url.map(url => {
          deleteFiles("./api/config/data" + url.replace("/api/images", ""));
        });
        
        let topImage = receiveFiles.filter(file => {
          return file.fieldname === "topImage";
        }),
        otherImage = receiveFiles.filter(file => {
          return file.fieldname === "otherImage";
        }),
        gameFile = receiveFiles.filter(file => {
          return file.fieldname === "gameFile";
        });
        
        const data = {
          title: req.body.title,
          content: req.body.content,
          download_url:
            "/api/games/" + username + "/" +
            gameFile[0].filename + "." + 
            gameFile[0].originalname.split(".").slice(-1)[0],
          top_img_url:
            "/api/images/" + username + "/" +
            topImage[0].filename + "." + 
            topImage[0].originalname.split(".").slice(-1)[0],
          other_img_url: [
            "/api/images/" + username + "/" +
            otherImage[0].filename + "." + 
            otherImage[0].originalname.split(".").slice(-1)[0],
            "/api/images/" + username + "/" +
            otherImage[1].filename + "." + 
            otherImage[1].originalname.split(".").slice(-1)[0]
          ],
          contributor: username,
          twitter_id: receiveTwitterId
        };

        uploadFiles(receiveFiles, username);

        PastWork.findByIdAndUpdate(id, data, err => {
          if(err) {
            console.log(err);
          }
          res.send("update pastwork!");
        });
      });
    });
  },
  userPastWorks(req, res) {
    User.findById(req.user).then(user => {
      PastWork.find({ contributor: user.username })
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
  deleteWork(req, res) {
    let id = req.params.pastWorkId;

    PastWork.findById(id).then(work => {
      deleteFiles("./api/config/data" + work.top_img_url.replace("/api/images", ""));
      deleteFiles("./api/config/data" + work.download_url.replace("/api/games", ""));
      work.other_img_url.map(url => {
        deleteFiles("./api/config/data" + url.replace("/api/images", ""));
      });

      PastWork.findByIdAndDelete(id).then(result => {
        res.send('delete');
      })
    });
  },
  PastWorkValidate
};
