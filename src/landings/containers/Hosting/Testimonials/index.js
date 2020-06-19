import React from 'react';
import PropTypes from 'prop-types';
import Box from 'landings/common/src/components/Box';
import Text from 'landings/common/src/components/Text';
import Heading from 'landings/common/src/components/Heading';
import Button from 'landings/common/src/components/Button';
import Image from 'landings/common/src/components/Image';
import Container from 'landings/common/src/components/UI/Container';
import GlideCarousel from 'landings/common/src/components/GlideCarousel';
import GlideSlide from 'landings/common/src/components/GlideCarousel/glideSlide';
import TestimonialSecWrapper, { ImageWrapper, TestimonialItem } from './testimonials.style';

import { TESTIMONIALS } from 'landings/common/src/data/Hosting/data';

const TestimonialSection = ({
  secTitleWrapper,
  secText,
  secHeading,
  reviewStyle,
  TestimonialMeta,
  nameStyle,
  designationStyle,
}) => {
  //Carousel Options
  const carouselOptions = {
    type: 'carousel',
    autoplay: 4000,
    perView: 2,
    gap: 30,
    animationDuration: 800,
    peek: {
      before: 390,
      after: 390,
    },
    breakpoints: {
      1800: {
        perView: 2,
        peek: {
          before: 220,
          after: 220,
        },
      },
      1400: {
        perView: 2,
        peek: {
          before: 160,
          after: 160,
        },
      },
      1200: {
        perView: 2,
        peek: {
          before: 100,
          after: 100,
        },
      },
      990: {
        perView: 2,
        peek: {
          before: 100,
          after: 100,
        },
      },
      800: {
        perView: 1,
        peek: {
          before: 120,
          after: 120,
        },
      },
      575: {
        perView: 1,
        peek: {
          before: 0,
          after: 0,
        },
      },
    },
  };

  return (
    <TestimonialSecWrapper id="testimonial_section">
      <Container fullWidth noGutter>
        <Box {...secTitleWrapper}>
          <Text {...secText} content="TESTIMONIALS " />
          <Heading {...secHeading} content="What’s clients say about us" />
        </Box>
        <GlideCarousel
          options={carouselOptions}
          nextButton={<Button icon={<i className="flaticon-next" />} variant="textButton" aria-label="next button" />}
          prevButton={
            <Button icon={<i className="flaticon-left-arrow" />} variant="textButton" aria-label="prev button" />
          }
        >
          <>
            {TESTIMONIALS.map((slideItem, index) => (
              <GlideSlide key={`testimonial-slide-${index}`}>
                <TestimonialItem className="testimonial_item">
                  <Text content={slideItem.review} {...reviewStyle} />
                  <Box {...TestimonialMeta}>
                    <ImageWrapper>
                      <Image src={slideItem.avatar} alt={`reviewer-image-${index}`} />
                    </ImageWrapper>
                    <Box>
                      <Heading content={slideItem.name} {...nameStyle} />
                      <Text content={slideItem.designation} {...designationStyle} />
                    </Box>
                  </Box>
                </TestimonialItem>
              </GlideSlide>
            ))}
          </>
        </GlideCarousel>
      </Container>
    </TestimonialSecWrapper>
  );
};

TestimonialSection.propTypes = {
  secTitleWrapper: PropTypes.object,
  secHeading: PropTypes.object,
  secText: PropTypes.object,
  reviewStyle: PropTypes.object,
  TestimonialMeta: PropTypes.object,
  nameStyle: PropTypes.object,
  designationStyle: PropTypes.object,
};

TestimonialSection.defaultProps = {
  secTitleWrapper: {
    mb: ['40px', '40px', '50px', '75px'],
  },
  secText: {
    as: 'span',
    display: 'block',
    textAlign: 'center',
    fontSize: '14px',
    letterSpacing: '0.15em',
    fontWeight: '700',
    color: '#eb4d4b',
    mb: '10px',
  },
  secHeading: {
    textAlign: 'center',
    fontSize: ['20px', '24px'],
    fontWeight: '400',
    color: 'headingColor',
    letterSpacing: '-0.025em',
    mb: '0',
  },
  reviewStyle: {
    fontSize: ['16px', '16px', '17px', '17px', '19px'],
    fontWeight: '300',
    color: '#343d48',
    lineHeight: '1.74',
    mb: ['30px', '30px', '30px', '40px', '55px'],
  },
  TestimonialMeta: {
    flexBox: true,
    alignItems: 'center',
  },
  nameStyle: {
    as: 'h3',
    fontSize: '16px',
    fontWeight: '500',
    color: '#0f2137',
    letterSpacing: '-0.025em',
    mb: '8px',
  },
  designationStyle: {
    fontSize: '14px',
    fontWeight: '400',
    color: '#6f7a87',
    mb: '0',
  },
};

export default TestimonialSection;
