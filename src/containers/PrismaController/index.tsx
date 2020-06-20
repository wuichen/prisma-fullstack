import React from 'react';
import { useRouter } from 'next/router';
import { PrismaTable } from './PrismaTable';
import jwtDecode from 'jwt-decode';

const Table: React.FC<{ model: string }> = ({ model }) => {
  const router = useRouter();
  const accessToken = localStorage.getItem('access_token');
  let query = router.query;
  const decode = jwtDecode(accessToken);
  if (decode.permissions?.companyId) {
    query = {
      ...query,
      Company: decode.permissions.companyId,
    };
  }
  return <PrismaTable model={model} push={router.push} query={query} />;
};

export default Table;
