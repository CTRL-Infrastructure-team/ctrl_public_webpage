const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function exportToJSON() {
  // pubtermsテーブルからデータを取得してJSONファイルに書き出す
  const pubterms = await prisma.pubterms.findMany();
  require('fs').writeFileSync('pubterms.json', JSON.stringify(pubterms, null, 2));

  // pubtopicsテーブルからデータを取得してJSONファイルに書き出す
  const pubtopics = await prisma.pubtopics.findMany();
  require('fs').writeFileSync('pubtopics.json', JSON.stringify(pubtopics, null, 2));

  // pubslidesテーブルからデータを取得してJSONファイルに書き出す
  const pubslides = await prisma.pubslides.findMany();
  require('fs').writeFileSync('pubslides.json', JSON.stringify(pubslides, null, 2));
}

exportToJSON()
  .then(() => {
    console.log('Data exported to JSON files');
  })
  .catch((error) => {
    console.error(error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });