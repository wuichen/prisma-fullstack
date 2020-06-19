import React from 'react';
import { Icon } from 'react-icons-kit';
import { chevronRight } from 'react-icons-kit/feather/chevronRight';

import Container from 'landings/common/src/components/UI/Container';
import Heading from 'landings/common/src/components/Heading';
import Text from 'landings/common/src/components/Text';
import Image from 'landings/common/src/components/Image';
import Link from 'landings/common/src/components/Link';
import ourCustomer from 'landings/common/src/assets/image/agencyDigital/ourCustomer.png';
import Section, { SectionHeading, ContentWrapper } from './ourCustomer.style';

const OurCustomer = () => {
  return (
    <Section id="our-customer">
      <Container>
        <ContentWrapper>
          <SectionHeading>
            <Heading content="Company who also worked us" />
            <Text content="Every email, web page, and social media post makes an impression on your customers. With our software you can be confident it's impression." />
            <Link href="#">
              Explore Details <Icon icon={chevronRight} />
            </Link>
          </SectionHeading>
          <Image src={ourCustomer} className="illustration" alt="Company who also worked us" />
        </ContentWrapper>
      </Container>
    </Section>
  );
};

export default OurCustomer;
