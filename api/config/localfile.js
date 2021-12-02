const fs = require('fs');

module.exports = {
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
    fs.unlinkSync(filePath);
  }
}