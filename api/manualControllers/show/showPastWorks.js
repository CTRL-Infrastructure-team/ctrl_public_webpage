const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

showWorks();

async function showWorks(){
  
  //実行結果
  const result = await prisma.pastworks.findMany({
    orderBy: { created_at: 'desc'}
  });
  console.log(result);
  
  //DB切断
  await prisma.$disconnect;
}