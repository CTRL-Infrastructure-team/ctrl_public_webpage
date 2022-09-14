const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const topics = require('./2022sTopic.json'),
      PD = require('./2022sPD.json');


//日付の記述について
//https://tc39.es/ecma262/#sec-date-time-string-format

execMig();

async function execMig(){
  
  let ids = [];
  //トピック作成
  for(t of topics){
    let c = await prisma.pubtopics.create({
      data:{
        topic_date: t.date,
        topic: t.topic,
        explanation: t.explanation
      }
    });
    ids.push(c.id);
  }
  
  //スライドURL登録
  for(i=0;i<ids.length;i++){
    for(p of PD){
      await prisma.pubtopics.update({
        where: {id: ids[i]},
        data: {
          slides: {
            create: {
              contributor_id: "",
              contributor: p.name,
              grade: p.grade,
              slide_url: p[topics[i].PDkey],
              title: "",
              explanation: ""
            },
          }
        }
      });
    }
  }

  //実行結果
  
  
  
  //DB切断
  await prisma.$disconnect;
}