const fs = require('fs');

module.exports = {
  // ファイル読み取り処理
  getFiles(filePath) {
    fs.readFile(filePath, (err, data) => {
      if (err) throw err;
      return data;
    });
  },
  // ファイル書き込み処理
  uploadFiles(fileList, username) {
    fileList.map(file => {
      const path = file.destination + username + "/";

      if (!fs.existsSync(path)) {
        fs.mkdirSync(path);
      }
      
      fs.renameSync(
        file.path,
        path + file.filename + "." +
        file.originalname.split(".").slice(-1)[0]
      );
    });
  },
  // ファイル削除処理
  deleteFiles(filePath) {
    if (ts.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  }
};