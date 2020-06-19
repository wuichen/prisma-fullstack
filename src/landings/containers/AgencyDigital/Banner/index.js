import React from 'react';
import Fade from 'react-reveal/Fade';

import Text from 'landings/common/src/components/Text';
import Input from 'landings/common/src/components/Input';
import Image from 'landings/common/src/components/Image';
import Button from 'landings/common/src/components/Button';
import Heading from 'landings/common/src/components/Heading';
import Container from 'landings/common/src/components/UI/Container';
import Section, { ContentWrapper, BannerContent, Subscribe, SponsoredBy, ImageGroup } from './banner.style';

import paypal from 'landings/common/src/assets/image/agencyDigital/paypal.png';
import google from 'landings/common/src/assets/image/agencyDigital/google.png';
import dropbox from 'landings/common/src/assets/image/agencyDigital/dropbox.png';

const Banner = () => {
  return (
    <Section id="home">
      <Container width="1440px">
        <ContentWrapper>
          <BannerContent>
            <Fade up delay={100}>
              <Heading as="h1" content="A Creative way to grow your Exciting Business ideas" />
            </Fade>
            <Fade up delay={200}>
              <Text
                className="banner-caption"
                content="Get your blood tests delivered at let home collect sample from the victory of the managements that supplies best design system guidelines ever."
              />
            </Fade>
            <Fade up delay={300}>
              <Subscribe>
                <Input inputType="email" placeholder="Enter Email Address" iconPosition="left" aria-label="email" />
                <Button title="Subscribe" type="submit" />
              </Subscribe>
            </Fade>
            <Fade up delay={400}>
              <SponsoredBy>
                <Text className="sponsoredBy" content="Sponsored by:" />
                <ImageGroup>
                  <Image src={paypal} alt="Paypal" />
                  <Image src={google} alt="Google" />
                  <Image src={dropbox} alt="Dropbox" />
                </ImageGroup>
              </SponsoredBy>
            </Fade>
          </BannerContent>
        </ContentWrapper>
      </Container>
    </Section>
  );
};

export default Banner;
