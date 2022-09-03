require("dotenv").config();
const { uploadFiles, deleteFiles } = require("../config/localfile"),
      { PrismaClient } = require("@prisma/client"),
      prisma = new PrismaClient();

module.exports = {
  async situationsList(req, res) {
    try{
      const situations = await prisma.situations.findMany({
        orderBy: { created_at: 'desc'}
      });
      await prisma.$disconnect;
      res.send(situations);
    }
    catch (err){
      await prisma.$disconnect;
      console.log(err.message);
      res.send("response catch!");
    };
  },
  async show(req, res) {
    try{
      const situation = await prisma.situations.findUnique({
        where: { id: req.params.situationId }
      });
      await prisma.$disconnect;
      res.send(situation);
    }
    catch (err){
      await prisma.$disconnect;
      console.log(err.message);
      res.send("response catch!");
    };
  },
  async createSituation(req, res) {
    try {
      const user = await prisma.users.findUnique({
        where: { id: req.user},
      });
      const receiveFiles = req.files,
            username = user.username;
      uploadFiles(receiveFiles, username);
      await prisma.situations.create({
        data:{
          title: req.body.title,
          content: req.body.content,
          img_url:
            "/api/images/" + username + "/" +
            receiveFiles[0].filename + "." +
            receiveFiles[0].originalname.split(".").slice(-1)[0],
          contributor: username,
        }
      });
      await prisma.$disconnect;
      console.log("finished!");
      res.send("create Situation!");
    }
    catch (err){
      await prisma.$disconnect;
      console.log(err.message);
      res.send("response catch!");
    };
  },
  async updateSituations(req, res) {
    try{
      const user = await prisma.users.findUnique({
        where: {id: req.user}
      });
      const username = user.username,
            receiveFiles = req.files;
      
      const situation = await prisma.situations.findUnique({
        where: { id: req.params.situationId }
      });
  
      await deleteFiles("./api/config/data" + situation.img_url.replace("/api/images", ""));
      await uploadFiles(receiveFiles, username);
  
      await prisma.situations.update({
        where:{ id: req.params.situationId },
        data:{
          title: req.body.title,
          content: req.body.content,
          img_url:
            "/api/images/" + username + "/" +
            receiveFiles[0].filename + "." +
            receiveFiles[0].originalname.split(".").slice(-1)[0],
          contributor: username
        }
      })
      await prisma.$disconnect;
      console.log("finished!");
      res.send("update Situation!");
    }
    catch (err){
      await prisma.$disconnect;
      console.log(err.message);
      res.send("response catch!");
    };
  },
  async userSituations(req, res) {
    try{
      const user = await prisma.users.findUnique({
        where: {id: req.user}
      });
      const situations = await prisma.situations.findMany({
        orderBy: { created_at: 'desc'},
        where: { contributor: user.username }
      })
      await prisma.$disconnect;
      res.send(situations);
    }
    catch (err){
      await prisma.$disconnect;
      console.log(err.message);
      res.send("response catch!");
    };
  },
  async deleteSituation(req, res) {
    try{
      const situation = await prisma.situations.findUnique({
        where: { id: req.params.situationId }
      });
      deleteFiles(
        "./api/config/data" 
        + situation.img_url.replace("/api/images", "")
      );
      await prisma.situations.delete({
        where: { id: req.params.situationId }
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
