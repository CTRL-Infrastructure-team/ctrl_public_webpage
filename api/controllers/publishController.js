require("dotenv").config();
const { PrismaClient } = require("@prisma/client"),
      prisma = new PrismaClient();

module.exports = {
  async recentTopics(req, res){
    try{
      const list = await prisma.pubtopics.findMany({
        where: {is_new: true},
        orderBy:{topic_date:'desc'}
      });
      await prisma.$disconnect
      res.send(list)
    }catch (err){
      await prisma.$disconnect;
      console.log(err.message);
      res.send("response catch!");
    };
  },
  async pastTopics(req, res){
    try{
      const list = await prisma.pubtopics.findMany({
        where: {is_new: false},
        orderBy:{topic_date:'desc'}
      });
      await prisma.$disconnect
      res.send(list)
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
