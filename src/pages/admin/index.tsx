import React from 'react';
import { Settings } from '@prisma-tools/admin/dist/Settings';
import { withApollo } from 'api/client';

import Layout from 'layouts/Admin';
const SettingsPage = () => {
  return (
    <Layout>
      <Settings />
    </Layout>
  );
};
export default withApollo(SettingsPage);
