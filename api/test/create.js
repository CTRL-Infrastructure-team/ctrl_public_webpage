const axios = require("axios");
(async () => {
  const data = await axios.post("http://client:3000/api/users/create");
  console.log(data.data);
})();
