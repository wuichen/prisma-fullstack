import React from 'react';
import { useRouter } from 'next/router';
import { PrismaTable } from './PrismaTable';

const Table: React.FC<{ model: string }> = ({ model }) => {
  const router = useRouter();
  return <PrismaTable model={model} push={router.push} query={router.query} />;
};

export default Table;
