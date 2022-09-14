const fs = require('fs');
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const topic = require('./topic_data_example.json');

//日付の記述について
//https://tc39.es/ecma262/#sec-date-time-string-format

createNewPub();

async function createNewPub(){
  
  //登録
  await prisma.pubtopics.create({
    data:{
      topic_date: topic.date,
      topic: topic.title,
      explanation: topic.explanation
    }
  });

  //実行結果
  const result = await prisma.pubtopics.findMany({});
  console.log(result);

  //作成データのidを出力
  const topic_id = {
    "id": result.slice(-1)[0].id,
    "created_at": result.slice(-1)[0].created_at,
    "topic": result.slice(-1)[0].topic
  }
  fs.writeFileSync('setting.json', JSON.stringify(topic_id,null,"\t"));
  
  //DB切断
  await prisma.$disconnect;
}