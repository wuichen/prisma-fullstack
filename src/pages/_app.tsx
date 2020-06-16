import Head from 'next/head';
import { AppProps } from 'next/app';
import * as React from 'react';
import { NextPage } from 'next';
// External CSS import here

import 'react-quill/dist/quill.snow.css';
import 'react-datepicker/dist/react-datepicker.css';

import 'rc-drawer/assets/index.css';
import 'rc-table/assets/index.css';
import 'rc-collapse/assets/index.css';
import 'react-multi-carousel/lib/styles.css';
import 'components/MultiCarousel/MultiCarousel.style.css';
import '@redq/reuse-modal/lib/index.css';

const MyApp: NextPage<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>Prisma Admin</title>
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
};

export default MyApp;
