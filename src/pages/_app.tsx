import React from 'react';
import App from 'next/app';
import { ThemeProvider } from 'styled-components';
import { theme } from 'theme';
import { AuthProvider } from 'contexts/auth/auth.provider';
import { StickyProvider } from 'contexts/app/app.provider';
import { SearchProvider } from 'contexts/search/search.provider';
import { HeaderProvider } from 'contexts/header/header.provider';
import { LanguageProvider } from 'contexts/language/language.provider';

import AppLayout from 'containers/LayoutContainer/AppLayout';
import { useDeviceType } from 'helper/useDeviceType';
import { CartProvider } from 'contexts/cart/use-cart';
// Language translation files
import localEn from 'data/translation/en.json';
import localAr from 'data/translation/ar.json';
import localEs from 'data/translation/es.json';
import localDe from 'data/translation/de.json';
import localCn from 'data/translation/zh.json';
import localIl from 'data/translation/he.json';

// External CSS import here
import 'react-quill/dist/quill.snow.css';
import 'react-datepicker/dist/react-datepicker.css';
import 'rc-drawer/assets/index.css';
import 'rc-table/assets/index.css';
import 'rc-collapse/assets/index.css';
import 'react-multi-carousel/lib/styles.css';
import 'components/MultiCarousel/MultiCarousel.style.css';
import '@redq/reuse-modal/lib/index.css';
import { GlobalStyle } from 'styled/global.style';
import { parseCookies } from 'helper/parse-cookies';
import Layout from 'layouts/Admin';
import { ApolloProvider } from '@apollo/client';
import { useApollo } from 'api/apollo';

// Language translation Config
const messages = {
  en: localEn,
  ar: localAr,
  es: localEs,
  de: localDe,
  zh: localCn,
  he: localIl,
};
// need to provide types
export default function ExtendedApp({
  Component,
  pageProps,
  userAgent,
  locale,
  query,
  pathname,
}) {
  const apolloClient = useApollo(pageProps.initialApolloState);
  const deviceType = useDeviceType(userAgent);

  const ConditionalLayout = ({ children }) => {
    if (pathname) {
      if (pathname.includes('/admin')) {
        return <Admin>{children}</Admin>;
      }
      // else if (pathname.includes('/dashboard')) {
      //   return <Dashboard>{children}</Dashboard>;
      // } else if (pathname.includes('/landings')) {
      //   return <Landing>{children}</Landing>;
      // }
    }

    return <Shop>{children}</Shop>;
  };

  const Admin = ({ children }) => {
    return <Layout>{children}</Layout>;
  };

  const Shop = ({ children }) => {
    return (
      <ThemeProvider theme={theme}>
        <LanguageProvider messages={messages} initLocale={locale}>
          <CartProvider>
            <SearchProvider query={query}>
              <HeaderProvider>
                <StickyProvider>
                  <AuthProvider>
                    <>
                      <AppLayout deviceType={deviceType}>{children}</AppLayout>
                      <GlobalStyle />
                    </>
                  </AuthProvider>
                </StickyProvider>
              </HeaderProvider>
            </SearchProvider>
          </CartProvider>
        </LanguageProvider>
      </ThemeProvider>
    );
  };

  return (
    <ApolloProvider client={apolloClient}>
      <ConditionalLayout>
        <Component {...pageProps} deviceType={deviceType} />
      </ConditionalLayout>
    </ApolloProvider>
  );
}

ExtendedApp.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext);
  const { req, query, pathname } = appContext.ctx;
  const userAgent = req ? req.headers['user-agent'] : navigator.userAgent;
  const { locale } = parseCookies(req);
  return { ...appProps, userAgent, query, locale, pathname };
};

// import Head from 'next/head';
// import { AppProps } from 'next/app';
// import App from 'next/app';
// import * as React from 'react';
// import { NextPage } from 'next';
// import { useApollo } from 'api/apollo';
// import { ApolloProvider } from '@apollo/client';
// import Layout from 'layouts/Admin';

// // External CSS import here
// import 'rc-drawer/assets/index.css';
// import 'rc-table/assets/index.css';
// import 'rc-collapse/assets/index.css';
// import 'react-multi-carousel/lib/styles.css';
// import 'components/MultiCarousel/MultiCarousel.style.css';
// import '@redq/reuse-modal/lib/index.css';
// import 'react-quill/dist/quill.snow.css';
// import 'react-datepicker/dist/react-datepicker.css';

// const MyApp = ({ Component, pageProps, userAgent, locale, query }) => {
//   const apolloClient = useApollo(pageProps.initialApolloState);
//   const { pathname } = router;
//   const ConditionalLayout = ({ children }) => {
//     if (pathname) {
//       if (pathname.includes('/admin')) {
//         return <Layout>{children}</Layout>;
//       }
//       // else if (pathname.includes('/dashboard')) {
//       //   return <Dashboard>{children}</Dashboard>;
//       // } else if (pathname.includes('/landings')) {
//       //   return <Landing>{children}</Landing>;
//       // }
//     }
//     return <Shop>{children}</Shop>;
//   };
//   return (
//     <ApolloProvider client={apolloClient}>
//       <Head>
//         <title>Mercy</title>
//         <link rel="shortcut icon" href="/favicon.ico" />
//         <meta
//           name="viewport"
//           content="width=device-width, initial-scale=1, shrink-to-fit=no"
//         />
//       </Head>
//       <ConditionalLayout>
//         <Component {...pageProps} />
//       </ConditionalLayout>
//     </ApolloProvider>
//   );
// };
