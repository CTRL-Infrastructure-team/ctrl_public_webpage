// const pkgcloud = require("pkgcloud"),
//       { createReadStream, unlink } = require("fs");

// require('dotenv').config();

// const openstack = pkgcloud.storage.createClient({
//   provider: 'openstack',
//   username: process.env.CONOHA_USERNAME,
//   password: process.env.CONOHA_PASSWORD,
//   authUrl: process.env.CONOHA_AUTH_URL,
//   tenantId: process.env.CONOHA_TENANT_ID,
//   region: process.env.CONOHA_REGION
// });

// const requestJudge = (requestPath) => {
//   if(requestPath === 'situation') {
//     return 'ctrl-situations';
//   } else {
//     return 'ctrl-pastworks';
//   }
// };

// const fileNameModify = (requestPath, filePath) => {
//   if(requestPath === 'situation') {
//     return filePath.substring(93);
//   } else {
//     return filePath.substring(92);
//   }
// };

// module.exports = {
//   uploadFiles(requestPath, fileList, workIdentification) {
//     let containerName = requestJudge(requestPath);

//     openstack.createContainer({
//       name: containerName,
//       }, (err, container) => {
//         if(err) {
//           console.log(err);
//         }
//         fileList.map((file) => {
//           let uploadFile = createReadStream(file.path),
//           writeStream = openstack.upload({
//             container: container.name,
//             remote: workIdentification + file.originalname
//           });
          
//           writeStream.on('error', err => {
//             console.log(err.message);
//           });
          
//           writeStream.on('success', result => {
//             console.log("upload success!");
//             unlink( file.path, err => {
//               if(err) {
//                 console.log(err);
//               }
//               console.log('file removed!');
//             })
//           });
          
//           uploadFile.pipe(writeStream);
//         })
//       }
//     )
//   },
//   deleteFiles(requestPath, filePath) {
//     let containerName = requestJudge(requestPath),
//         fileName = fileNameModify(requestPath, filePath);

//     console.log("fileName", fileName);
//     console.log("containerName", containerName);
//     openstack.removeFile(containerName, fileName, (err, result) => {
//       console.log("result", result);
//     });
//   }
// };
