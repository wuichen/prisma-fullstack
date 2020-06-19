import React, { useState, useEffect } from 'react';
import Heading from 'landings/common/src/components/Heading';
import Container from 'landings/common/src/components/UI/Container';
import Carousel from './carousel';
import { SectionHeader, CircleLoader } from '../interior.style';
import SectionWrapper, { CarouselWrapper } from './testimonial.style';

import { testimonialData } from 'landings/common/src/data/Interior';

const Testimonial = () => {
  const { title, slogan, reviews } = testimonialData;
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
  }, []);

  return (
    <SectionWrapper id="testimonial">
      <Container width="1360px">
        <SectionHeader>
          <Heading as="h5" content={title} />
          <Heading content={slogan} />
        </SectionHeader>
        <CarouselWrapper>
          {loading ? (
            <Carousel data={reviews} />
          ) : (
            <CircleLoader className="alt">
              <div className="circle"></div>
              <div className="circle"></div>
            </CircleLoader>
          )}
        </CarouselWrapper>
      </Container>
    </SectionWrapper>
  );
};

export default Testimonial;
