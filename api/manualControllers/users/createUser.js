const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const userData = require('./user_data.json');

createNewUser();

async function createNewUser(){
  
  //登録
  await Promise.all(
    userData.map(async n=>{
      let comp_pw = await bcrypt.hashSync(n.password, 10);
      await prisma.users.create({
        data:{
          username: n.username,
          password: comp_pw,
          twitter_id: n.twitter_id
        }
      });
    })
  );

  //実行結果
  const result = await prisma.users.findMany({});
  await console.log(result);
  
  //DB切断
  await prisma.$disconnect;
}