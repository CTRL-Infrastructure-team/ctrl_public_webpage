const pkgcloud = require("pkgcloud"),
      { createReadStream } = require("fs"),
      { PassThrough } = require('stream');

require('dotenv').config();

const openstack = pkgcloud.storage.createClient({
  provider: 'openstack',
  username: process.env.CONOHA_USERNAME,
  password: process.env.CONOHA_PASSWORD,
  authUrl: process.env.CONOHA_AUTH_URL,
  tenantId: process.env.CONOHA_TENANT_ID,
  region: process.env.CONOHA_REGION
});

module.exports = (fileList) => {
  openstack.createContainer({
    name: 'ctrl-situations',
    }, (err, container) => {
      if(err) {
        console.log(err);
      }
      let uploadFile = createReadStream(fileList[0].path),
      writeStream = openstack.upload({
        container: container.name,
        remote: fileList[0].originalname
      });

      writeStream.on('error', (err) => {
          console.log(err.message);
      });
      writeStream.on('success', (file) => {
          console.log(file);
          console.log("upload success!");
      });

      uploadFile.pipe(writeStream);
    }
  )
};
