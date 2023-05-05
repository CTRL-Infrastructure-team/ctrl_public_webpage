require("dotenv").config();
const { PrismaClient } = require("@prisma/client"),
      prisma = new PrismaClient();

module.exports = {
  //最近の進捗トピック一覧を取得
  async recentTopics(req, res){
    try{
      const list = await prisma.pubtopics.findMany({
        where: {pubterms_id: null},
        orderBy:{date:'desc'}
      });
      await prisma.$disconnect
      res.send(list)
    }catch (err){
      await prisma.$disconnect;
      console.log(err.message);
      res.send("response catch!");
    };
  },
  async pastTerms(req, res){
    try{
      const list = await prisma.pubterms.findMany({
        orderBy:{term:'desc'}
      });
      await prisma.$disconnect
      res.send(list)
    }catch (err){
      await prisma.$disconnect;
      console.log(err.message);
      res.send("response catch!");
    };
  },
  async oneTerm(req, res){
    try{
      const list = await prisma.pubterms.findUnique({
        where: {id: req.params.termId}
      });
      await prisma.$disconnect;
      console.log(list);
      res.send(list)
    }catch (err){
      await prisma.$disconnect;
      console.log(err.message);
      res.send("response catch!");
    };
  },
  async pastTermTopics(req, res){
    try{
      const list = await prisma.pubtopics.findMany({
        where: {pubterms_id: req.params.termId},
        orderBy:{date:'desc'}
      });
      await prisma.$disconnect;
      console.log(list);
      res.send(list);
    }catch (err){
      await prisma.$disconnect;
      console.log(err.message);
      res.send("response catch!");
    };
  },
  async oneTopic(req, res){
    try{
      const topic = await prisma.pubtopics.findUnique({
        where: {id: req.params.topicId}
      });
      await prisma.$disconnect
      res.send(topic)
    }catch (err){
      await prisma.$disconnect;
      console.log(err.message);
      res.send("response catch!");
    };
  },
  async slideList(req, res){
    try{
      const list = await prisma.pubslides.findMany({
        where: {pubtopics_id: req.params.topicId},
        orderBy:[
          {grade:'desc'},
          {contributor:'asc'}
        ]
      });
      await prisma.$disconnect
      res.send(list)
    }catch (err){
      await prisma.$disconnect;
      console.log(err.message);
      res.send("response catch!");
    };
  },
};
