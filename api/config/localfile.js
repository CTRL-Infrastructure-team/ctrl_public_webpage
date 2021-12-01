var fs = require('fs');
const requestJudge = (requestPath) => {
  if(requestPath === 'situation') {
    return 'ctrl-situations';
  } else {
    return 'ctrl-pastworks';
  }
};

const fileNameModify = (requestPath, filePath) => {
  if(requestPath === 'situation') {
    return filePath.substring(93);
  } else {
    return filePath.substring(92);
  }
};

module.exports = {
  // ファイル書き込み処理
  uploadFiles(requestPath, fileList, workIdentification) {
    let containerName = requestJudge(requestPath);
    fileList.map((file) => {
      fs.writeFile('./data/' + containerName + '/' + workIdentification + file.originalname, file, function (err) {
        if (err) {
          throw err;
        }
      });
    })
  },
  // ファイル削除処理
  deleteFiles(requestPath, filePath) {
    let containerName = requestJudge(requestPath),
        fileName = fileNameModify(requestPath, filePath);
  }
}