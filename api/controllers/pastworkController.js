const PastWork = require("../models/pastWork");
const mongoose = require("mongoose");
const pkgcloud = require("pkgcloud");

const openstack = pkgcloud.storage.createClient({
  provider: 'openstack',
  username: 'username',
  password: 'password',
  authUrl: 'service url'
});

const writeStream = openstack.upload({
  container: 'container name',
  remote: 'remote file name'
});

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
    PastWork.find({}).then(result => {
      res.send(result)
    })
  },
  createWork(req, res) {
    let username

    User.findById(req.user).then(user => {
      username = user.username
    })

    let newWork = new PastWork({
      title: req.body.title,
      content: req.body.content,
      download_url: '#',
      img_utl: '#',
      contributor: username,
      twitter_id: '@example'
    })
    
    newWork.save(err => {
      console.log(err);
      res.send();
    });
  }
};
