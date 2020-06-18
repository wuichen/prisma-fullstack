import { createModules } from '@prisma-tools/graphql-modules';
import { mkdir } from "fs";

mkdir('src/api/modules/models', () => {
  createModules({
    onDelete: true,
    excludeCommon: true,
    modelsOutput: 'src/api/modules/models'
  });
});

