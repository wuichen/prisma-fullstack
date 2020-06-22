import Head from 'next/head';
import { AppProps } from 'next/app';
import * as React from 'react';
import { NextPage } from 'next';
import { useApollo } from 'api/apollo';
import { ApolloProvider } from '@apollo/client';
import Layout from 'layouts/Admin';
import Shop from 'layouts/Shop';

// External CSS import here
import 'rc-drawer/assets/index.css';
import 'rc-table/assets/index.css';
import 'rc-collapse/assets/index.css';
import 'react-multi-carousel/lib/styles.css';
import 'components/MultiCarousel/MultiCarousel.style.css';
import '@redq/reuse-modal/lib/index.css';
import 'react-quill/dist/quill.snow.css';
import 'react-datepicker/dist/react-datepicker.css';
import '@glidejs/glide/dist/css/glide.core.min.css';
import '@lourenci/react-kanban/dist/styles.css';

import { useDeviceType } from 'helper/useDeviceType';

const MyApp: NextPage<AppProps> = ({ Component, pageProps, router }) => {
  let userAgent;
  let locale = 'en';
  let deviceType = { desktop: true, mobile: false, tablet: false };
  if (typeof document !== 'undefined') {
    userAgent = navigator.userAgent;
    // TODO: locale is usually fetched from session, but this one can only fetch from localstorage
    locale = localStorage.getItem('locale');
    deviceType = useDeviceType(userAgent);
  }

  const apolloClient = useApollo(pageProps.initialApolloState);
  const { pathname } = router;

  return (
    <ApolloProvider client={apolloClient}>
      <Head>
        <title>Mercy</title>
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
      </Head>
      {pathname.includes('/admin') ? (
        <Layout>
          <Component deviceType={deviceType} {...pageProps} />
        </Layout>
      ) : pathname.includes('/design') ? (
        <>
          <Component deviceType={deviceType} {...pageProps} />
        </>
      ) : (
        <Shop locale={locale} deviceType={deviceType} query={router.query}>
          <Component deviceType={deviceType} {...pageProps} />
        </Shop>
      )}
    </ApolloProvider>
  );
};

export default MyApp;
