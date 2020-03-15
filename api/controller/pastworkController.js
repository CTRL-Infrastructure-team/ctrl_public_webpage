const pastWork = require("../model");
const mongoose = require("mongoose");

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

console.log(convert("あああ").hiragana());
const serchtest = convert("あアあ");
console.log(serchtest.hiragana().partMatch());
module.exports = {
  showSearch(req, res) {
    let serch = convert(req.body.serch);
    console.log(serch.katakana().partMatch(), serch.katakana());
    console.log(serch);

    pastWork
      .find({ title: serch.katakana().partMatch() })
      // .find({ content: serch })
      .limit(10)
      .exec((err, data) => {
        err ? console.log(err.message) : console.log(data[0]);
        res.send(err || data);
      });
  }
};
