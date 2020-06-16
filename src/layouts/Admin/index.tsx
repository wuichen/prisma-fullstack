import React, { useEffect, useRef, useState } from 'react';
import { DefaultTheme, ThemeProvider } from 'styled-components';
import themes from './themes';
import {
  Layout,
  LayoutColumn,
  LayoutColumns,
  LayoutContainer,
  LayoutContent,
  Menu,
  MenuRefObject,
  Sidebar,
  SidebarBody,
  SidebarRefObject,
  Spinner,
} from 'oah-ui';
import icons from 'oah-eva-icon';

import Header from './Header';
import SimpleLayout from './SimpleLayout';
import menuItems from './menuItem';
import { MeQuery, MeQueryVariables, useMeQuery } from '../../generated';
import { ApolloQueryResult } from '@apollo/client';
import { useRouter } from 'next/router';
import Link from 'next/link';
import useSWR from 'swr';
import { GetSchemaDocument } from 'generated';
import { print } from 'graphql/language/printer';
import request from 'graphql-request';
interface ContextProps {
  me?: MeQuery['me'] | null;
  refetch?: (
    variables?: MeQueryVariables | undefined
  ) => Promise<ApolloQueryResult<MeQuery>>;
  children?: React.ReactNode;
}

const initialContext: ContextProps = {};

export const LayoutContext: React.Context<ContextProps> = React.createContext(
  initialContext
);

const LayoutPage: React.FC = ({ children }) => {
  const [theme, setTheme] = useState<DefaultTheme['name']>('dark');
  const sidebarRef = useRef<SidebarRefObject>(null);
  const menuRef = useRef<MenuRefObject>(null);
  const [menu, setMenu] = useState([]);
  const { data: userData, loading, refetch } = useMeQuery();
  const router = useRouter();

  const changeTheme = (newTheme: DefaultTheme['name']) => {
    setTheme(newTheme);
  };

  const authLayout = router.pathname.startsWith('/admin/auth');
  const adminLayout = router.pathname.startsWith('/admin');

  const { data: schemaData } = useSWR(print(GetSchemaDocument), (query) =>
    request('http://localhost:3000/api/graphql', query)
  );

  useEffect(() => {
    if (
      schemaData &&
      schemaData.getSchema &&
      schemaData.getSchema.models &&
      schemaData.getSchema.models.length > 0
    ) {
      setMenu([
        ...menuItems,
        {
          title: 'Models',
          icon: { name: 'layers-outline' },
          children: schemaData.getSchema.models.map((model) => {
            return {
              title: model.name,
              link: {
                href: `/admin/models/${model.name}`,
              },
            };
          }),
        },
      ]);
    }
  }, [schemaData]);

  return (
    <ThemeProvider theme={themes(theme)}>
      {loading ? (
        <Spinner size="Giant" status="Primary" />
      ) : (
        <LayoutContext.Provider
          value={{
            me: userData?.me,
            refetch,
          }}
        >
          <SimpleLayout />
          <Layout evaIcons={icons} className={authLayout ? 'auth-layout' : ''}>
            {!authLayout && (
              <Header
                theme={theme}
                changeTheme={changeTheme}
                toggleSidebar={() => sidebarRef.current?.toggle()}
              />
            )}
            <LayoutContainer>
              {!authLayout && adminLayout && menu && menu.length > 0 && (
                <Sidebar
                  ref={sidebarRef}
                  property="start"
                  containerFixed
                  responsive
                  className="menu-sidebar"
                >
                  <SidebarBody>
                    <Menu
                      nextJs
                      className="sidebar-menu"
                      Link={Link}
                      ref={menuRef}
                      items={menu}
                      currentPath={router.pathname}
                      toggleSidebar={() => sidebarRef.current?.hide()}
                    />
                  </SidebarBody>
                </Sidebar>
              )}
              <LayoutContent>
                <LayoutColumns>
                  <LayoutColumn className="main-content">
                    {children}
                  </LayoutColumn>
                </LayoutColumns>
              </LayoutContent>
            </LayoutContainer>
          </Layout>
        </LayoutContext.Provider>
      )}
    </ThemeProvider>
  );
};

export default LayoutPage;
