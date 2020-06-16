import React from 'react';
import { Settings } from '@prisma-tools/admin/dist/Settings';
import { AuthGuard } from 'components/Guards';

const SettingsPage = () => {
  return (
    <AuthGuard>
      <Settings />
    </AuthGuard>
  );
};
export default SettingsPage;
