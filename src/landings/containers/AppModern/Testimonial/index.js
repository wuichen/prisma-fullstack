import React, { Fragment } from 'react';
import Fade from 'react-reveal/Fade';
import Text from 'landings/common/src/components/Text';
import Heading from 'landings/common/src/components/Heading';
import Button from 'landings/common/src/components/Button';
import Image from 'landings/common/src/components/Image';
import Container from 'landings/common/src/components/UI/Container';
import Rating from 'landings/common/src/components/Rating';
import GlideCarousel from 'landings/common/src/components/GlideCarousel';
import GlideSlide from 'landings/common/src/components/GlideCarousel/glideSlide';
import { SectionHeader } from '../appModern.style';
import SectionWrapper, { CarouselWrapper } from './testimonial.style';

import { testimonial } from 'landings/common/src/data/AppModern';

const Testimonial = () => {
  const { slogan, title, reviews } = testimonial;

  const glideOptions = {
    type: 'carousel',
    gap: 0,
    autoplay: 5000,
    perView: 2,
    animationDuration: 700,
    breakpoints: {
      991: {
        perView: 1,
      },
    },
  };

  return (
    <SectionWrapper id="testimonial">
      <Container>
        <SectionHeader>
          <Fade up>
            <Heading as="h5" content={slogan} />
            <Heading content={title} />
          </Fade>
        </SectionHeader>

        <CarouselWrapper>
          <Fade up delay={100}>
            <GlideCarousel
              options={glideOptions}
              nextButton={<Button icon={<i className="flaticon-next" />} aria-label="Next" variant="fab" />}
              prevButton={<Button icon={<i className="flaticon-left-arrow" />} aria-label="Prev" variant="fab" />}
            >
              <Fragment>
                {reviews.map((item) => (
                  <GlideSlide key={`testimonial--key${item.id}`}>
                    <div className="review-card">
                      <Heading as="h3" content={item.title} />
                      <Text content={item.description} />
                      <div className="card-footer">
                        <div className="image">
                          <Image src={item.avatar} alt="Client Image" />
                        </div>
                        <div className="reviewer-info">
                          <div className="content">
                            <Heading as="h4" content={item.name} />
                            <Text content={item.designation} />
                          </div>
                          <Rating rating={item.review} />
                        </div>
                      </div>
                    </div>
                  </GlideSlide>
                ))}
              </Fragment>
            </GlideCarousel>
          </Fade>
        </CarouselWrapper>
      </Container>
    </SectionWrapper>
  );
};

export default Testimonial;
