import React from 'react';
import Fade from 'react-reveal/Fade';

import Container from 'landings/common/src/components/UI/Container';
import CheckBox from 'landings/common/src/components/Checkbox';
import Heading from 'landings/common/src/components/Heading';
import Button from 'landings/common/src/components/Button';
import Input from 'landings/common/src/components/Input';
import Image from 'landings/common/src/components/Image';
import Text from 'landings/common/src/components/Text';

import SectionWrapper, { FooterInner, Content, SubscriptionForm } from './subscribe.style';

import bg1 from 'landings/common/src/assets/image/agencyModern/cta/1.png';
import bg2 from 'landings/common/src/assets/image/agencyModern/cta/2.png';
import bg3 from 'landings/common/src/assets/image/agencyModern/cta/3.png';
import bg4 from 'landings/common/src/assets/image/agencyModern/cta/4.png';
import bg5 from 'landings/common/src/assets/image/agencyModern/cta/5.png';

const Subscribe = () => {
  return (
    <SectionWrapper>
      <Container>
        <FooterInner>
          <Content>
            <Heading as="h3" content="Like our service? Subscribe us" />
            <Text content="We have more than thousand of creative entrepreneurs and stat joining our business" />
          </Content>
          <SubscriptionForm>
            <div>
              <Input inputType="email" placeholder="Enter Email Address" iconPosition="left" aria-label="email" />
              <Button title="Subscribe" type="submit" />
            </div>
            <CheckBox id="remember" htmlFor="remember" labelText="Don’t provide any promotional message." />
          </SubscriptionForm>
        </FooterInner>
      </Container>
      <Image src={bg1} alt="bg1" className="illustration bg1" />
      <Image src={bg2} alt="bg2" className="illustration bg2" />
      <Image src={bg3} alt="bg3" className="illustration bg3" />
      <Image src={bg4} alt="bg4" className="illustration bg4" />
      <Image src={bg5} alt="bg5" className="illustration bg5" />
    </SectionWrapper>
  );
};

export default Subscribe;
