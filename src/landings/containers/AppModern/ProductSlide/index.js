import React, { Fragment, useState, useEffect } from 'react';
import Link from 'next/link';
import Fade from 'react-reveal/Fade';
import Heading from 'landings/common/src/components/Heading';
import Image from 'landings/common/src/components/Image';
import GlideCarousel from 'landings/common/src/components/GlideCarousel';
import GlideSlide from 'landings/common/src/components/GlideCarousel/glideSlide';
import Swiper from 'react-id-swiper';
// import 'swiper/css/swiper.css';
import ProductSlideWrapper, {
  Container,
  CarouselArea,
  CircleLoader,
  MockupWrapper,
  SectionHeader,
} from './productSlide.style';

import { productData } from 'landings/common/src/data/AppModern';
import SlideMockup from 'landings/common/src/assets/image/appModern/screen.png';
const params = {
  slidesPerView: 5,
  centeredSlides: true,
  spaceBetween: 30,
  loop: true,
  autoplay: {
    delay: 2500,
  },
  grabCursor: true,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  breakpoints: {
    320: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
    768: {
      slidesPerView: 5,
      spaceBetween: 20,
    },
    1440: {
      slidesPerView: 5,
      spaceBetween: 20,
    },
  },
};
const ProductSlide = () => {
  const { carousel, slogan, title } = productData;

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
  }, []);
  return (
    <ProductSlideWrapper>
      <Container>
        <SectionHeader>
          <Fade up>
            <Heading as="h5" content={slogan} />
            <Heading content={title} />
          </Fade>
        </SectionHeader>
        <CarouselArea>
          {loading ? (
            <Fragment>
              <MockupWrapper>
                <Image src={SlideMockup} alt="mockup" />
              </MockupWrapper>
              <Swiper {...params}>
                {carousel.map((item, index) => (
                  <div key={index}>
                    <Link href={item.link} key={`productSlide--key${item.id}`}>
                      <a className="item_wrapper">
                        <Image src={item.thumb_url} alt={item.title} />
                      </a>
                    </Link>
                  </div>
                ))}
              </Swiper>
            </Fragment>
          ) : (
            <CircleLoader>
              <div className="circle"></div>
              <div className="circle"></div>
            </CircleLoader>
          )}
        </CarouselArea>
        {/* End of carousel section */}
      </Container>
    </ProductSlideWrapper>
  );
};

export default ProductSlide;
