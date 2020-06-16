import React from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { withApollo } from 'api/client';

const Model: React.FC = () => {
  const {
    query: { model },
  } = useRouter();
  const PageModel = dynamic(() => import(`views/models/${model}`));
  return (
    <>
      <PageModel />
    </>
  );
};

export default withApollo(Model);
