import fs from 'fs'
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function uploadSchema() {
  const schemaString = fs.readFileSync('/prisma/schema.json');

  await prisma.connect();


  await prisma.disconnect();

};

uploadSchema();



