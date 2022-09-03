require("dotenv").config();
const { uploadFiles, deleteFiles } = require("../config/localfile"),
      { PrismaClient } = require("@prisma/client"),
      prisma = new PrismaClient();

const convert = string => {
  return {
    katakana() {
      return string.replace(/[\u3041-\u3096]/g, function(match) {
        var chr = match.charCodeAt(0) + 0x60;
        return String.fromCharCode(chr);
      });
    },
    hiragana() {
      return string.replace(/[\u30a1-\u30f6]/g, function(match) {
        var chr = match.charCodeAt(0) - 0x60;
        return String.fromCharCode(chr);
      });
    }
  };
};

String.prototype.partMatch = function() {
  return new RegExp(this);
};

module.exports = {
  async showSearch(req, res) {
    try{
      let search = convert(req.body.search);
      let suggestion = await prisma.pastworks.findMany({
        take: 10,
        where: { title: search.katakana().partMatch()}
      });
      await prisma.$disconnect;
      res.send(suggestion);
    }
    catch (err){
      await prisma.$disconnect;
      console.log(err.message);
      res.send("response catch!");
    };
  },
  async show(req, res) {
    try{
      const work = await prisma.pastworks.findUnique({
        where: { id: req.params.pastWorkId }
      });
      await prisma.$disconnect;
      console.log(work);
      res.send(work);
    }
    catch (err){
      await prisma.$disconnect;
      console.log(err.message);
      res.send("response catch!");
    };
  },
  async worksList(req, res) {
    try{
      const works = await prisma.pastworks.findMany({
        orderBy: { created_at: 'desc'}
      });
      await prisma.$disconnect;
      res.send(works);
    }
    catch (err){
      await prisma.$disconnect;
      console.log(err.message);
      res.send("response catch!");
    };
  },
  async createWork(req, res) {
    try{
      const user = await prisma.users.findUnique({
        where: {id: req.user}
      });
      const receiveFiles = req.files,
            username = user.username,
            receiveTwitterId = req.body.twitter === "true" ? user.twitter_id : "";
      
      let topImage = receiveFiles.filter(file => {
        return file.fieldname === "topImage";
      }),
          otherImage = receiveFiles.filter(file => {
        return file.fieldname === "otherImage";
      }),
          gameFile = receiveFiles.filter(file => {
        return file.fieldname === "gameFile";
      });

      uploadFiles(receiveFiles, username);

      await prisma.pastworks.create({
        data:{
          title: req.body.title,
          content: req.body.content,
          download_url:
            "/api/games/" + username + "/" +
            gameFile[0].filename + "." + 
            gameFile[0].originalname.split(".").slice(-1)[0],
          top_img_url:
            "/api/images/" + username + "/" +
            topImage[0].filename + "." + 
            topImage[0].originalname.split(".").slice(-1)[0],
          other_img_url_0:
            "/api/images/" + username + "/" +
            otherImage[0].filename + "." + 
            otherImage[0].originalname.split(".").slice(-1)[0],
          other_img_url_1:
            "/api/images/" + username + "/" +
            otherImage[1].filename + "." + 
            otherImage[1].originalname.split(".").slice(-1)[0],
          contributor: username,
          twitter_id: receiveTwitterId
        }
      });
      await prisma.$disconnect;
      res.send("push work!");
    }
    catch (err){
      await prisma.$disconnect;
      console.log(err.message);
      res.send("response catch!");
    };
  },
  async updateWork(req, res) {
    try{
      const user = await prisma.users.findUnique({
        where: {id: req.user}
      });
      const work = await prisma.pastworks.findUnique({
        where: { id: req.params.pastWorkId }
      });
      
      deleteFiles("./api/config/data" + work.top_img_url.replace("/api/images", ""));
      deleteFiles("./api/config/data" + work.other_img_url_0.replace("/api/images", ""));
      deleteFiles("./api/config/data" + work.other_img_url_1.replace("/api/images", ""));
      deleteFiles("./api/config/data" + work.download_url.replace("/api/games", ""));
      
      const receiveFiles = req.files,
            username = user.username,
            receiveTwitterId = req.body.twitter === "true" ? user.twitter_id : "";
      
      let topImage = receiveFiles.filter(file => {
        return file.fieldname === "topImage";
      }),
          otherImage = receiveFiles.filter(file => {
        return file.fieldname === "otherImage";
      }),
          gameFile = receiveFiles.filter(file => {
        return file.fieldname === "gameFile";
      });
      
      uploadFiles(receiveFiles, username);

      await prisma.pastworks.update({
        where:{ id: req.params.pastWorkId },
        data:{
          title: req.body.title,
          content: req.body.content,
          download_url:
            "/api/games/" + username + "/" +
            gameFile[0].filename + "." + 
            gameFile[0].originalname.split(".").slice(-1)[0],
          top_img_url:
            "/api/images/" + username + "/" +
            topImage[0].filename + "." + 
            topImage[0].originalname.split(".").slice(-1)[0],
          other_img_url_0:
            "/api/images/" + username + "/" +
            otherImage[0].filename + "." + 
            otherImage[0].originalname.split(".").slice(-1)[0],
          other_img_url_1:
            "/api/images/" + username + "/" +
            otherImage[1].filename + "." + 
            otherImage[1].originalname.split(".").slice(-1)[0],
          contributor: username,
          twitter_id: receiveTwitterId
        }
      });
      await prisma.$disconnect;
      res.send("update pastwork!");
    }
    catch (err){
      await prisma.$disconnect;
      console.log(err.message);
      res.send("response catch!");
    };
  },
  async userPastWorks(req, res) {
    try{
      const user = await prisma.users.findUnique({
        where: {id: req.user}
      });
      const works = await prisma.pastworks.findMany({
        orderBy: { created_at: 'desc'},
        where: { contributor: user.username }
      });
      await prisma.$disconnect;
      await res.send(works);
    }
    catch (err){
      await prisma.$disconnect;
      console.log(err.message);
      res.send("response catch!");
    };
  },
  async deleteWork(req, res) {
    try{
      const work = await prisma.pastworks.findUnique({
        where: { id: req.params.pastWorkId }
      });
      deleteFiles("./api/config/data" + work.top_img_url.replace("/api/images", ""));
      deleteFiles("./api/config/data" + work.other_img_url_0.replace("/api/images", ""));
      deleteFiles("./api/config/data" + work.other_img_url_1.replace("/api/images", ""));
      deleteFiles("./api/config/data" + work.download_url.replace("/api/games", ""));
      
      await prisma.pastworks.delete({
        where: { id: req.params.pastWorkId }
      });
      await prisma.$disconnect;
      res.send('delete');
    }
    catch (err){
      await prisma.$disconnect;
      console.log(err.message);
      res.send("response catch!");
    };
  },
};
