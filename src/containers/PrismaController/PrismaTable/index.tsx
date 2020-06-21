import React, { useEffect, useState } from 'react';
import DynamicTable from './dynamicTable';
import { useQuery } from '@apollo/client';
import { GET_SCHEMA } from '../SchemaQueries';
import { ModelTableProps, ContextProps } from '..';
import { TableContext, defaultSettings } from './Context';
import decodeAccessToken from 'helper/decodeAccessToken';

const PrismaTable: React.FC<ModelTableProps> = (props) => {
  const [role, setRole] = useState(null);
  // TODO: find a better solution to generate company id in query

  const { data } = useQuery<{ getSchema: ContextProps['schema'] }>(GET_SCHEMA, {
    variables: {
      name: role,
    },
    skip: !role,
  });

  useEffect(() => {
    const decode = decodeAccessToken();

    if (decode?.permissions?.role) {
      setRole(decode.permissions.role);
    }
  }, []);

  if (role) {
    return (
      <TableContext.Provider
        value={{
          schema: data?.getSchema ?? {
            models: [],
            enums: [],
          },
          ...(props as any),
        }}
      >
        <DynamicTable model={props.model} />
      </TableContext.Provider>
    );
  } else {
    return null;
  }
};

PrismaTable.defaultProps = defaultSettings;

export { PrismaTable };
