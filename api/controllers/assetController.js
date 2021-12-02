const fs = require('fs');
require("dotenv").config();

module.exports = {
  getImg(req, res) {
    fs.readFile(
      `./api/config/data/${req.params.user}/${req.params.imagePath}`,
      (err, file) => {
        console.log(err);

        res.writeHead(200, { 'Content-Type': 'image/png' });
        res.end(file);
      }
    );
  },
  uploadImg(req, res) {},
  deleteImg(req, res) {},
  getFile(req, res) {},
  uploadFile(req, res) {},
  deleteFile(req, res) {}
};
