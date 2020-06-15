import fs from 'fs'
import path from 'path'
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function createAdminSchema() {
  const rawData = fs.readFileSync(path.join(__dirname, '../prisma/schema.json'));
  const schemaString = JSON.stringify(JSON.parse(rawData))
  await prisma.connect();
  await prisma.roleSchema.create({
    data: {
      name: 'admin',
      json: schemaString
    }
  })

  await prisma.disconnect();

};

createAdminSchema();



