import React, { useContext, useEffect } from 'react';
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
import storeType from 'constants/storeType';
import { useFindOnePlatformQuery } from 'generated';
import { PlatformContext } from 'contexts/platform/platform.context';

function HomePage({ deviceType, platform }) {
  const { query } = useRouter();
  const targetRef = React.useRef(null);
  const { dispatch, state: platformState } = useContext(PlatformContext);
  useEffect(() => {
    if ((query.text || query.category) && targetRef.current) {
      window.scrollTo({
        top: targetRef.current.offsetTop - 110,
        behavior: 'smooth',
      });
    }
  }, [query]);

  if (!platformState.platform && platform) {
    dispatch({
      type: 'SET',
      payload: {
        platform,
      },
    });
  }

  // useEffect(() => {
  //   if (!state.platform && platform) {
  //     dispatch({
  //       type: 'SET',
  //       payload: platform,
  //     });
  //   }
  // }, [state]);

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

const IndexPage = ({ sub, deviceType }) => {
  const { data, loading, error } = useFindOnePlatformQuery({
    variables: {
      where: {
        slug: sub,
      },
    },
    skip: !sub,
  });

  if (error) {
    if (typeof window !== 'undefined') {
      window.location.replace('https://www.mercy-app.com');
    }
  }

  if (data && data.findOnePlatform) {
    return <HomePage platform={data.findOnePlatform} deviceType={deviceType} />;
  }
  return <div>loading</div>;
};

IndexPage.getInitialProps = async (ctx: any) => {
  const { req } = ctx;

  let host;
  let sub = 'www';
  if (req && req.headers.host) {
    host = req.headers.host;
  }

  if (host) {
    if (host.includes('localhost')) {
      return { sub: 'grocery' };
    }
    sub = host.split('mercy-app')[0];
    if (sub) {
      sub = sub.split('.')[0];
    } else {
      sub = 'www';
    }
  }
  return { sub };
};

export default IndexPage;
