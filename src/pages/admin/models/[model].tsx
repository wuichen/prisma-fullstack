import React from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { AuthGuard } from 'components/Guards';
import { Settings } from '@prisma-tools/admin/dist/Settings';

const Model: React.FC = () => {
  const {
    query: { model },
  } = useRouter();
  if (model === 'settings') {
    return (
      <AuthGuard>
        <Settings />
      </AuthGuard>
    );
  }
  const PageModel = dynamic(() => import(`views/models/${model}`));
  return (
    <AuthGuard>
      <PageModel />
    </AuthGuard>
  );
};

export default Model;
