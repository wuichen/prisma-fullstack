import React from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

const Model: React.FC = () => {
  const {
    query: { model },
  } = useRouter();
  const PageModel = dynamic(() => import(`views/models/${model}`));
  return <PageModel />;
};

export default Model;
