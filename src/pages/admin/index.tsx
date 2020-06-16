import React from 'react';
import { Settings } from '@prisma-tools/admin/dist/Settings';
import { withApollo } from 'api/client';

const SettingsPage = () => {
  return <Settings />;
};
export default withApollo(SettingsPage);
