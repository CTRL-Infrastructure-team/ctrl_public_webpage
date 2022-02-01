const fs = require('fs');
require("dotenv").config();

module.exports = {
  getImg(req, res) {
    fs.readFile(
      `./api/config/data/${req.params.user}/${req.params.imagePath}`,
      (err, file) => {
        if (err) {
          console.log(err);
          res.end();
          return;
        }
        
        res.statusCode = 200;
        res.setHeader('Content-Type', 'image/png');
        res.write(file);
        res.end();
      }
    );
  },
  uploadImg(req, res) {},
  deleteImg(req, res) {},
  getFile(req, res) {
    fs.readFile(
        `./api/config/data/${req.params.user}/${req.params.gamePath}`,
        (err, file) => {
          if (err) {
            console.log(err);
            res.end();
            return;
          }
        //   res.writeHead(200, { 'Content-Type': 'image/png' });
          res.send(file);
        }
    );
  },
  uploadFile(req, res) {},
  deleteFile(req, res) {}
};
