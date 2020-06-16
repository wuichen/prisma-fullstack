import React, { useContext } from 'react';
import { LayoutContext } from 'layouts/Admin';
import { useRouter } from 'next/router';

export const AuthGuard = ({ children }) => {
  const { me } = useContext(LayoutContext);
  const router = useRouter();
  if (router && !me && typeof document !== 'undefined') {
    router.push('/admin/auth/login');
  }
  return <>{children} </>;
};
