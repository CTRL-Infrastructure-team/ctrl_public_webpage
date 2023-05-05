const fs = require('fs');
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const term_data = require('./term_data.json');

//日付の記述について
//https://tc39.es/ecma262/#sec-date-time-string-format

createNewPub();

async function createNewPub(){
  
  //該当期間のtopic_idを取得
  const Topics = await prisma.pubtopics.findMany({
    where: {
      date: {
        gte: term_data.start_date, // topic_dateがstartDate以上
        lte: term_data.end_date, // topic_dateがendDate以下
      },
    },
    select: {
      id: true, // idを選択
    },
  });

  //pubtermsの新規登録
  const newTerm = await prisma.pubterms.create({
    data:{
      term: term_data.term,
      name: term_data.term_name,
      explanation: term_data.explanation,
    }
  });

  //リレーションの設定
  await prisma.pubtopics.updateMany({
    where: {
      id: {
        in: Topics.map(Topic => Topic.id)
      },
    },
    data: {
      pubterms_id: newTerm.id,
    },
  });

  //実行結果
  const result = await prisma.pubterms.findMany({});
  console.log(result);
  // console.log(Topics);
  //DB切断
  await prisma.$disconnect;
}