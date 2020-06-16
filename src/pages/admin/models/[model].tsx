import React from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { AuthGuard } from 'components/Guards';
import { Settings } from '@prisma-tools/admin/dist/Settings';
import { withApollo } from 'api/client';
import Layout from 'layouts/Admin';
const Model: React.FC = () => {
  const {
    query: { model },
  } = useRouter();
  if (model === 'settings') {
    return (
      <Layout>
        <AuthGuard>
          <Settings />
        </AuthGuard>
      </Layout>
    );
  } else {
    const PageModel = dynamic(() => import(`views/models/${model}`));
    return (
      <Layout>
        <AuthGuard>
          <PageModel />
        </AuthGuard>
      </Layout>
    );
  }
};

export default withApollo(Model);
