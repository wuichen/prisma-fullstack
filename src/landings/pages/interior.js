import React, { Fragment } from 'react';
import Head from 'next/head';
import Sticky from 'react-stickynode';
import { ThemeProvider } from 'styled-components';
import { interiorTheme } from 'landings/common/src/theme/interior';
import { DrawerProvider } from 'landings/common/src/contexts/DrawerContext';
import Navbar from 'landings/containers/Interior/Navbar';
import Banner from 'landings/containers/Interior/Banner';
import Feature from 'landings/containers/Interior/Feature';
import AboutUs from 'landings/containers/Interior/AboutUs';
import Project from 'landings/containers/Interior/Project';
import Team from 'landings/containers/Interior/Team';
import News from 'landings/containers/Interior/News';
import Testimonial from 'landings/containers/Interior/Testimonial';
import Gallery from 'landings/containers/Interior/Gallery';
import Newsletter from 'landings/containers/Interior/Newsletter';
import Footer from 'landings/containers/Interior/Footer';
import { ResetCSS } from 'landings/common/src/assets/css/style';
import {
  GlobalStyle,
  InteriorWrapper,
  ContentWrapper,
} from 'landings/containers/Interior/interior.style';

export default () => {
  return (
    <ThemeProvider theme={interiorTheme}>
      <Fragment>
        <Head>
          <title>Interior | A react next landing page</title>
          <meta name="theme-color" content="#171717" />
          <meta name="description" content="React next landing page" />
          <meta
            name="keywords"
            content="React, React js, Next, Next js, Gatsby, Gatsby Js, Fast Landing, Modren Landing"
          />
          <link
            href="https://fonts.googleapis.com/css?family=Raleway:500,600&display=swap"
            rel="stylesheet"
          ></link>
          <link
            href="https://fonts.googleapis.com/css?family=Roboto:100,100i,300,300i,400,400i,500,500i,700,700i,900,900i"
            rel="stylesheet"
          />
        </Head>
        <ResetCSS />
        <GlobalStyle />

        {/* Start writing your markup from here. */}
        <InteriorWrapper>
          <Sticky top={0} innerZ={9999} activeClass="sticky-nav-active">
            <DrawerProvider>
              <Navbar />
            </DrawerProvider>
          </Sticky>
          <ContentWrapper>
            <Banner />
            <Feature />
            <AboutUs />
            <Project />
            <Team />
            <News />
            <Testimonial />
            <Gallery />
            <Newsletter />
          </ContentWrapper>
          <Footer />
        </InteriorWrapper>
        {/* End of markup section. */}
      </Fragment>
    </ThemeProvider>
  );
};
