import React from 'react';
import { NextPage } from 'next';
import Link from 'next/link';
// import { useQuery } from '@apollo/react-hooks';
// import { useQuery } from '@apollo/react-hooks';

import { useQuery } from 'graphql-hooks';

import { Modal } from '@redq/reuse-modal';
import { GET_LOGGED_IN_CUSTOMER } from 'graphql/query/customer.query';
import { ProfileProvider } from 'contexts/profile/profile.provider';
import SettingsContent from 'containers/Profile/Settings/Settings';
import {
  PageWrapper,
  SidebarSection,
  ContentBox,
} from 'containers/Profile/Profile.style';
import Sidebar from 'containers/Profile/Sidebar/Sidebar';
import { SEO } from 'components/seo';
import SiteFooter from 'components/SiteFooter/SiteFooter';
import { FormattedMessage } from 'react-intl';
// import { withApollo } from 'helper/apollo';
import { GraphQLClient, ClientContext } from 'graphql-hooks';
import ShopApp from 'layouts/Shop';
import { useDeviceType } from 'helper/useDeviceType';
import { useRouter } from 'next/router';
import { print } from 'graphql';
type Props = {
  deviceType?: {
    mobile: boolean;
    tablet: boolean;
    desktop: boolean;
  };
};
const ProfilePage: NextPage<Props> = ({ deviceType }) => {
  const { data, error, loading } = useQuery(print(GET_LOGGED_IN_CUSTOMER));
  if (!data || loading) {
    return <div>loading...</div>;
  }
  if (error) return <div>{error}</div>;
  return (
    <>
      <SEO title="Profile - PickBazar" description="Profile Details" />
      <ProfileProvider initData={data.me}>
        <Modal>
          <PageWrapper>
            <SidebarSection>
              <Sidebar />
            </SidebarSection>
            <ContentBox>
              <SettingsContent deviceType={deviceType} />
            </ContentBox>

            <SiteFooter style={{ marginTop: 50 }}>
              <FormattedMessage
                id="siteFooter"
                defaultMessage="Pickbazar is a product of"
              />
              &nbsp; <Link href="#">Redq, Inc.</Link>
            </SiteFooter>
          </PageWrapper>
        </Modal>
      </ProfileProvider>
    </>
  );
};

export default (props) => {
  const client = new GraphQLClient({
    url: '/api/graphql',
  });
  let userAgent, locale, query;
  let deviceType = { desktop: true, mobile: false, tablet: false };
  const router = useRouter();
  if (typeof document !== 'undefined') {
    userAgent = navigator.userAgent;

    // TODO: locale is usually fetched from session, but this one can only fetch from localstorage
    locale = localStorage.getItem('locale');
    query = router.query;
    deviceType = useDeviceType(userAgent);
    console.log('deviceType', deviceType);
  }
  return (
    <ClientContext.Provider value={client}>
      <ShopApp userAgent={userAgent} locale={locale} query={query}>
        <ProfilePage deviceType={deviceType} {...props} />
      </ShopApp>
    </ClientContext.Provider>
  );
};
