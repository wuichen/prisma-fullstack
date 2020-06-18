import { createTypes } from '@prisma-tools/nexus';

createTypes({
  modelsOutput: 'src/api/nexus/models',
  onDelete: true,
  nexusSchema: true,
  // excludeFieldsByModel: {
  //   User: ['password'],
  // },
  // excludeQueriesAndMutations: ['deleteMany', 'updateMany'],
});
