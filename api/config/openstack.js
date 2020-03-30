const pkgcloud = require("pkgcloud"),
      { createReadStream, unlink } = require("fs");

require('dotenv').config();

const openstack = pkgcloud.storage.createClient({
  provider: 'openstack',
  username: process.env.CONOHA_USERNAME,
  password: process.env.CONOHA_PASSWORD,
  authUrl: process.env.CONOHA_AUTH_URL,
  tenantId: process.env.CONOHA_TENANT_ID,
  region: process.env.CONOHA_REGION
});

module.exports = (requestPath, fileList) => {
  let containerName = '';
  if(requestPath === 'situation') {
    containerName = 'ctrl-situations';
  } else {
    containerName = 'ctrl-pastworks';
  }
  openstack.createContainer({
    name: containerName,
    }, (err, container) => {
      if(err) {
        console.log(err);
      }
      fileList.map((file) => {
        let uploadFile = createReadStream(file.path),
        writeStream = openstack.upload({
          container: container.name,
          remote: file.originalname
        });
        
        writeStream.on('error', err => {
          console.log(err.message);
        });
        
        writeStream.on('success', result => {
          console.log("upload success!");
          unlink( file.path, err => {
            if(err) {
              console.log(err);
            }
            console.log('file removed!');
          })
        });
        
        uploadFile.pipe(writeStream);
      })
    }
  )
};
