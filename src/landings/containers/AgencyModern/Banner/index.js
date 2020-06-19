import React from 'react';
import Fade from 'react-reveal/Fade';

import Text from 'landings/common/src/components/Text';
import Image from 'landings/common/src/components/Image';
import Button from 'landings/common/src/components/Button';
import Heading from 'landings/common/src/components/Heading';
import Input from 'landings/common/src/components/Input';
import Container from 'landings/common/src/components/UI/Container';
import BannerWrapper, { BannerContent, Subscribe, SponsoredBy, ImageGroup } from './banner.style';

import paypal from 'landings/common/src/assets/image/agencyModern/paypal.png';
import google from 'landings/common/src/assets/image/agencyModern/google.png';
import dropbox from 'landings/common/src/assets/image/agencyModern/dropbox.png';

const Banner = () => {
  return (
    <BannerWrapper id="home">
      <Container>
        <BannerContent>
          <Fade up delay={100}>
            <Heading as="h1" content="Build your audience &amp; grow your business online smarter" />
          </Fade>
          <Fade up delay={200}>
            <Text
              className="banner-caption"
              content="Agencies around the world are moving to the digital agencies. So, It is high time to introduce your agency digitaly. We respect our customer opinions and deals with them with perfect wireframing."
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
      </Container>
    </BannerWrapper>
  );
};

export default Banner;
