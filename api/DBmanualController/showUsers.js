const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

showUsers();

async function showUsers(){
  
  //実行結果
  const result = await prisma.users.findMany({
    orderBy: { created_at: 'desc'}
  });
  console.log(result);
  
  //DB切断
  await prisma.$disconnect;
}