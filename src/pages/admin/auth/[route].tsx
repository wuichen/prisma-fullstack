import React from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

const Route: React.FC = () => {
  const {
    query: { route },
  } = useRouter();
  let View;

  switch (route) {
    case 'login':
      View = dynamic(() => import('views/auth/login'));

      break;
    case 'register':
      View = dynamic(() => import('views/auth/register'));

      break;
    case 'request-password':
      View = dynamic(() => import('views/auth/request-password'));
      break;

    case 'reset-password':
      View = dynamic(() => import('views/auth/reset-password'));
      break;

    default:
      break;
  }
  return <View />;
};

export default Route;
