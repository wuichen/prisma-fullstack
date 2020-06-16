import React from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { AuthGuard } from 'components/Guards';
const Model: React.FC = () => {
  const {
    query: { model },
  } = useRouter();
  const PageModel = dynamic(() => import(`views/models/${model}`));
  return (
    <AuthGuard>
      <PageModel />
    </AuthGuard>
  );
};

export default Model;
