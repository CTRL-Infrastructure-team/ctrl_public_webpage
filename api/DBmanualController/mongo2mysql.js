const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const mongoose = require("mongoose");
var os = require("os");
var hostname = os.hostname();
const tl =
  hostname.includes("DESKTOP") ||
  hostname.includes("localhost") ||
  hostname.includes("MAC");
  
if (tl) {
  mongoose.connect("mongodb://localhost:27017/ctrlPublicSite", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
} else {
  mongoose.connect("mongodb://localhost:27017/ctrlPublicSite", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
}
mongoose.Promise = global.Promise;

const User = require("../models/user");
const { Situation, SituationValidate } = require("../models/situations")
const { PastWork, PastWorkValidate } = require("../models/pastWork")

migs2()

async function migs2() {
  //ユーザデータの移行
  const Uall = await User.find({});
  //await console.log(Uall);
  await Promise.all(
    Uall.map(async u =>{
      await console.log(u);
      await prisma.users.create({
        data:{
          username: u.username,
          password: u.password,
          twitter_id: u.twitter_id
        }
      })
    })
  );

  //活動報告の移行
  const Sall = await Situation.find({});
  //await console.log(Sall);
  await Promise.all(
    Sall.map(async s =>{
      await console.log(s);
      await prisma.situations.create({
        data:{
          created_at: s.createdAt,
          updated_at: s.updatedAt,
          contributor: s.contributor,
          title: s.title,
          content: s.content,
          img_url: s.img_url,
        }
      })
    })
  );
  
  //作品データの移行
  const Pall = await PastWork.find({});
  //await console.log(Pall);
  await Promise.all(
    Pall.map(async p =>{
      await console.log(p);
      await prisma.pastworks.create({
        data:{
          created_at: p.createdAt,
          updated_at: p.updatedAt,
          contributor:p.contributor,
          twitter_id:p.twitter_id,
          title:p.title,
          content:p.content,
          top_img_url:p.top_img_url,
          other_img_url_0:p.other_img_url[0],
          other_img_url_1:p.other_img_url[1],
          download_url:p.download_url,
        }
      })
    })
  );

  //DB通信の切断
  await prisma.$connect();
  await mongoose.disconnect();
}