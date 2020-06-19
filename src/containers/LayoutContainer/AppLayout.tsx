import React, { useContext, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import Sticky from 'react-stickynode';
import Header from './Header/Header';
import { useStickyState } from 'contexts/app/app.provider';
import { LayoutWrapper } from './Layout.style';
import { isCategoryPage } from './is-home-page';
import AddSlideIn from 'components/Add/Add.SlideIn';
import CompanyForm from 'components/Add/Add.CompanyForm';
import { useMeQuery } from '../../generated';
import { AuthContext } from 'contexts/auth/auth.context';

const MobileHeader = dynamic(() => import('./Header/MobileHeader'), {
  ssr: false,
});

type LayoutProps = {
  className?: string;
  deviceType: {
    mobile: boolean;
    tablet: boolean;
    desktop: boolean;
  };
  token?: string;
};

const Layout: React.FunctionComponent<LayoutProps> = ({
  className,
  children,
  deviceType: { mobile, tablet, desktop },
  token,
}) => {
  const isSticky = useStickyState('isSticky');
  const { pathname } = useRouter();

  const isHomePage = isCategoryPage(pathname);
  const { authDispatch } = useContext<any>(AuthContext);

  const { data: userData, loading, refetch } = useMeQuery();

  useEffect(() => {
    if (userData?.me) {
      authDispatch({
        type: 'GET_ME',
        payload: {
          me: userData.me,
          refetch,
        },
      });
    }
  }, [loading, userData]);
  return (
    <LayoutWrapper className={`layoutWrapper ${className}`}>
      {(mobile || tablet) && (
        <Sticky enabled={isSticky} innerZ={1001}>
          <MobileHeader
            className={`${isSticky ? 'sticky' : 'unSticky'} ${
              isHomePage ? 'home' : ''
            }`}
            pathname={pathname}
          />
        </Sticky>
      )}

      {desktop && (
        <Sticky enabled={isSticky} innerZ={1001}>
          <MobileHeader
            className={`${isSticky ? 'sticky' : 'unSticky'} ${
              isHomePage ? 'home' : ''
            } desktop`}
            pathname={pathname}
          />
          <Header
            className={`${isSticky && isHomePage ? 'sticky' : 'unSticky'} ${
              isHomePage ? 'home' : ''
            }`}
            token={token}
            pathname={pathname}
          />
        </Sticky>
      )}
      {children}
      <AddSlideIn>
        <CompanyForm baseDelay={300} />
      </AddSlideIn>
    </LayoutWrapper>
  );
};

export default Layout;
