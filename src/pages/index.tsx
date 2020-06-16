// import { request } from 'graphql-request';
// import useSWR from 'swr';
// import { FindManyUserDocument } from 'generated';
// import { print } from 'graphql/language/printer';
import { useEffect, useState } from 'react';
import React from 'react';
import { useRouter } from 'next/router';
import { Modal } from '@redq/reuse-modal';
import { withApollo } from 'api/client';
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
          imageUrl={BannerImg}
        />

        {deviceType.desktop ? (
          <>
            <MobileCarouselDropdown>
              <StoreNav items={storeType} />
              <Sidebar type={platform} deviceType={deviceType} />
            </MobileCarouselDropdown>
            <OfferSection>
              <div style={{ margin: '0 -10px' }}>
                <Carousel deviceType={deviceType} data={OFFERS} />
              </div>
            </OfferSection>
            <MainContentArea>
              <SidebarSection>
                <Sidebar type={platform} deviceType={deviceType} />
              </SidebarSection>
              <ContentSection>
                <div ref={targetRef}>
                  <Products
                    type={platform}
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
            <Sidebar type={platform} deviceType={deviceType} />
            <OfferSection>
              <div style={{ margin: '0 -10px' }}>
                <Carousel deviceType={deviceType} data={OFFERS} />
              </div>
            </OfferSection>
            <ContentSection style={{ width: '100%' }}>
              <Products
                type={platform}
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

const IndexPage = ({ deviceType }) => {
  const [page, setPage] = useState(null);
  useEffect(() => {
    const { host } = window.location;
    let isDev = host.includes('localhost');
    let splitHost = host.split('.');
    if (
      (!isDev && splitHost.length === 3) ||
      (isDev && splitHost.length === 2)
    ) {
      let page = splitHost[0];
      if (page !== 'www') {
        setPage(page);
      }
    }
    setPage('grocery');
  });
  if (page) {
    return <HomePage platform={page} deviceType={deviceType} />;
  } else {
    return <div>loading</div>;
  }
};

export default withApollo(IndexPage);
