import React, { Fragment } from 'react';
import Text from 'landings/common/src/components/Text';
import Image from 'landings/common/src/components/Image';
import Heading from 'landings/common/src/components/Heading';
import Container from 'landings/common/src/components/UI/Container';
import FeatureBlock from 'landings/common/src/components/FeatureBlock';
import GlideCarousel from 'landings/common/src/components/GlideCarousel';
import GlideSlide from 'landings/common/src/components/GlideCarousel/glideSlide';
import SectionWrapper, { CarouseWrapper, TextWrapper } from './appSlider.style';

import { appSlider } from 'landings/common/src/data/AppModern';

const AppSlider = () => {
  const { title, description, features, carousel } = appSlider;

  const glideOptions = {
    type: 'carousel',
    gap: 0,
    autoplay: 5000,
    perView: 1,
    animationDuration: 700,
  };

  return (
    <SectionWrapper>
      <Container>
        <CarouseWrapper>
          <GlideCarousel
            bullets={true}
            controls={false}
            numberOfBullets={3}
            options={glideOptions}
            carouselSelector="appFeatureSlider"
          >
            <Fragment>
              {carousel.map((item) => (
                <GlideSlide key={`feature-side--key${item.id}`}>
                  <Image src={item.image} alt={item.title} />
                </GlideSlide>
              ))}
            </Fragment>
          </GlideCarousel>
        </CarouseWrapper>
        <TextWrapper>
          <Heading content={title} />
          <Text content={description} />
          {features.map((item) => (
            <FeatureBlock
              key={`app-feature--key${item.id}`}
              iconPosition="left"
              icon={<img src={item.icon} alt={item.title} />}
              title={<Heading as="h3" content={item.title} />}
              description={<Text content={item.description} />}
            />
          ))}
        </TextWrapper>
      </Container>
    </SectionWrapper>
  );
};

export default AppSlider;
