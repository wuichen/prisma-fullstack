// import { request } from 'graphql-request';
// import useSWR from 'swr';
// import { FindManyUserDocument } from 'generated';
// import { print } from 'graphql/language/printer';
import { useEffect, useState } from 'react';
import React from 'react';
import { useRouter } from 'next/router';
import { Modal } from '@redq/reuse-modal';
// import { withApollo } from 'api/client';
import { SEO } from 'components/seo';
import StoreNav from 'components/StoreNav/StoreNav';
import Carousel from 'components/Carousel/Carousel';
import Banner from 'containers/Banner/Banner';
import Sidebar from 'containers/Sidebar/Sidebar';
import Products from 'containers/Products/Products';
import CartPopUp from 'containers/Cart/CartPopUp';
import {
  MainContentArea,
  SidebarSection,
  ContentSection,
  OfferSection,
  MobileCarouselDropdown,
} from 'styled/pages.style';
// Static Data Import Here
import OFFERS from 'data/offers';
import BannerImg from 'image/grocery.png';
import storeType from 'constants/storeType';
import { useFindOnePlatformQuery } from 'generated';
import { parseCookies } from 'helper/parse-cookies';
import ShopApp from 'layouts/Shop';
import { useDeviceType } from 'helper/useDeviceType';

// export default function Index() {
//   const { data, error } = useSWR(print(FindManyUserDocument), (query) =>
//     request('http://localhost:3000/api/graphql', query, {
//       where: { email: { equals: 'ichen' } },
//     })
//   );

//   if (error) return <div>Failed to load</div>;
//   if (!data) return <div>Loading...</div>;

//   const { findManyUser } = data;

//   return (
//     <div>
//       {findManyUser.map((user, i) => (
//         <div key={i}>{user.name}</div>
//       ))}
//     </div>
//   );
// }

// const platform = 'grocery';

function HomePage({ deviceType, platform }) {
  const { query } = useRouter();
  const targetRef = React.useRef(null);
  React.useEffect(() => {
    if ((query.text || query.category) && targetRef.current) {
      window.scrollTo({
        top: targetRef.current.offsetTop - 110,
        behavior: 'smooth',
      });
    }
  }, [query]);

  return (
    <>
      <SEO title="Grocery - PickBazar" description="Grocery Details" />
      <Modal>
        <Banner
          intlTitleId="groceriesTitle"
          intlDescriptionId="groceriesSubTitle"
          imageUrl={platform.bannerImg}
        />

        {deviceType.desktop ? (
          <>
            <MobileCarouselDropdown>
              <StoreNav items={storeType} />
              <Sidebar type={platform.slug} deviceType={deviceType} />
            </MobileCarouselDropdown>
            <OfferSection>
              <div style={{ margin: '0 -10px' }}>
                <Carousel deviceType={deviceType} data={OFFERS} />
              </div>
            </OfferSection>
            <MainContentArea>
              <SidebarSection>
                <Sidebar type={platform.slug} deviceType={deviceType} />
              </SidebarSection>
              <ContentSection>
                <div ref={targetRef}>
                  <Products
                    type={platform.slug}
                    deviceType={deviceType}
                    fetchLimit={16}
                  />
                </div>
              </ContentSection>
            </MainContentArea>
          </>
        ) : (
          <MainContentArea>
            <StoreNav items={storeType} />
            <Sidebar type={platform.slug} deviceType={deviceType} />
            <OfferSection>
              <div style={{ margin: '0 -10px' }}>
                <Carousel deviceType={deviceType} data={OFFERS} />
              </div>
            </OfferSection>
            <ContentSection style={{ width: '100%' }}>
              <Products
                type={platform.slug}
                deviceType={deviceType}
                fetchLimit={16}
              />
            </ContentSection>
          </MainContentArea>
        )}
        <CartPopUp deviceType={deviceType} />
      </Modal>
    </>
  );
}

const IndexPage = ({ sub, userAgent, query, locale }) => {
  const router = useRouter();
  const deviceType = useDeviceType(userAgent);
  const { data, loading, error } = useFindOnePlatformQuery({
    variables: {
      where: {
        slug: sub,
      },
    },
    skip: !sub,
  });
  // useEffect(() => {
  //   const { host } = window.location;
  //   let isDev = host.includes('localhost');
  //   let splitHost = host.split('.');
  //   if (
  //     (!isDev && splitHost.length === 3) ||
  //     (isDev && splitHost.length === 2)
  //   ) {
  //     let page = splitHost[0];
  //     if (page && page !== 'www') {
  //       setPage(page);
  //     }
  //   }
  // });
  if (error) {
    if (typeof window !== 'undefined') {
      window.location.replace('https://www.mercy-app.com');
    }
  }

  if (data && data.findOnePlatform) {
    return (
      <ShopApp userAgent={userAgent} query={query} locale={locale}>
        <HomePage platform={data.findOnePlatform} deviceType={deviceType} />
      </ShopApp>
    );
  }
  return <div>loading</div>;
};

IndexPage.getInitialProps = async (ctx: any) => {
  const { req, query } = ctx;
  const userAgent = req ? req.headers['user-agent'] : navigator.userAgent;
  const { locale } = parseCookies(req);

  let host;
  let sub = 'www';
  if (req && req.headers.host) {
    host = req.headers.host;
  }

  if (host) {
    if (host.includes('localhost')) {
      return { sub: 'furniture' };
    }
    sub = host.split('mercy-app')[0];
    if (sub) {
      sub = sub.split('.')[0];
    } else {
      sub = 'www';
    }
  }
  return { userAgent, query, locale, sub };
};

export default IndexPage;
