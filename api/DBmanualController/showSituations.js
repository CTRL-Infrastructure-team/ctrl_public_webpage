const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

showUser();

async function showUser(){
  
  //実行結果
  const result = await prisma.situations.findMany({
    orderBy: { created_at: 'desc'}
  });
  console.log(result);
  
  //DB切断
  await prisma.$disconnect;
}