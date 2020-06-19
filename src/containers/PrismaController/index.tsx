import React from 'react';
import { useRouter } from 'next/router';
import { PrismaTable } from './PrismaTable';
import jwtDecode from 'jwt-decode';
const Table: React.FC<{ model: string }> = ({ model }) => {
  const router = useRouter();
  const accessToken = localStorage.getItem('access_token');
  console.log(accessToken);
  if (!accessToken) {
    router.push('/admin/auth/login');
    return null;
  } else {
    const decode = jwtDecode(accessToken);
    console.log('ef', decode);
    if (!decode.permissions) {
      router.push('/admin/auth/entrance');
    }
    return (
      <PrismaTable model={model} push={router.push} query={router.query} />
    );
  }
};

export default Table;
