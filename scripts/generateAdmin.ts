// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { buildSettingsSchema, generatePages, generateGraphql } from '@prisma-tools/admin/dist/generateAdmin';

const pageContent = `
import React from 'react';
import PrismaController from 'components/PrismaController';
const #{id}: React.FC = () => {
  return <PrismaController model="#{id}" />;
};
export default #{id};
`;

buildSettingsSchema();

generatePages({ outPut: 'src/pages/admin/models/', pageContent });

generateGraphql({ graphqlOutput: 'src/graphql/generated' });
