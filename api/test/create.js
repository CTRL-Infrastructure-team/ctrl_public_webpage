const userData = require('./user_data.json'),
      User = require("../medels/user");

for(let slot of userData) {
  User.create(slot);
}

User
  .find({})
  .then(result => {
    console.log(result);
  });
