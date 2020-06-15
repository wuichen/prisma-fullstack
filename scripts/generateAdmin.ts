// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { buildSettingsSchema, generatePages, generateGraphql } from '@prisma-tools/admin/dist/generateAdmin';

const pageContent = `
import React from 'react';
import PrismaTable from 'components/PrismaTable';
const #{id}: React.FC = () => {
  return <PrismaTable model="#{id}" />;
};
export default #{id};
`;

buildSettingsSchema();

generatePages({ outPut: 'src/views/models/', pageContent });

generateGraphql({ graphqlOutput: 'src/graphql/generated' });
