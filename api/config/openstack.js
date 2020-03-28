const pkgcloud = require("pkgcloud");

const openstack = pkgcloud.storage.createClient({
  provider: 'openstack',
  username: 'username',
  password: 'password',
  authUrl: 'service url'
});

module.exports = (fileList) => {
  openstack.createContainer({
    name: 'ctrl-situations',
    }, (err, container) => {
      if(err) {
        console.log(err);
      }
      let uploadFile = fs.createReadStream(fileList[0]),
      writeStream = openstack.upload({
        container: container.name,
        remote: fileList[0].originalname
      });

      writeStream.on('error', (err) => {
          console.log(err.message);
      });
      writeStream.on('success', (file) => {
          console.log("upload success!");
      });

      uploadFile.pipe(writeStream);
    }
  )
};
