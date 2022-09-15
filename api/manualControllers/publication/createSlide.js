const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const newSlides = require('./slide_data.json');
const setting = require('./setting.json');


//日付の記述について
//https://tc39.es/ecma262/#sec-date-time-string-format

createNewPub();

async function createNewPub(){
  
  //登録
  for(s of newSlides){
    await prisma.pubtopics.update({
      where: {id: setting.id},
      data: {
        slides: {
          create: {
            contributor_id: "",
            contributor: s.name,
            grade: s.grade,
            slide_url: s.slide,
            title: "",
            explanation: ""
          },
        }
      }
    });
  }

  //実行結果
  
    //トピック
  const result_1 = await prisma.pubtopics.findUnique({
    where: {id: setting.id}
  });
  console.log(result_1);

    //URL
  const result_2 = await prisma.pubslides.findMany({
    where: {pubtopics_id: setting.id}
  });
  for(e of result_2){
    console.log("");
    console.log(e.contributor);
    if(e.slide_url !== ""){
      console.log(e.slide_url);
    }else{
      console.log("none");
    }
  }
  
  //DB切断
  await prisma.$disconnect;
}