const { PrismaClient } = require('@prisma/client');
const fs = require('fs');

const prisma = new PrismaClient();

async function importFromJSON() {
  // pubterms.jsonファイルからデータを読み込む
  const pubtermsData = JSON.parse(fs.readFileSync('pubterms.json', 'utf8'));
  for (const data of pubtermsData) {
    await prisma.pubterms.create({ data });
  }

  // pubtopics.jsonファイルからデータを読み込む
  const pubtopicsData = JSON.parse(fs.readFileSync('pubtopics.json', 'utf8'));
  for (const data of pubtopicsData) {
    await prisma.pubtopics.create({ data });
  }

  // pubslides.jsonファイルからデータを読み込む
  const pubslidesData = JSON.parse(fs.readFileSync('pubslides.json', 'utf8'));
  for (const data of pubslidesData) {
    await prisma.pubslides.create({ data });
  }
}

importFromJSON()
  .then(() => {
    console.log('Data imported from JSON files');
  })
  .catch((error) => {
    console.error(error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });