import React from 'react';
import Text from 'landings/common/src/components/Text';
import Heading from 'landings/common/src/components/Heading';
import Image from 'landings/common/src/components/Image';
import Container from 'landings/common/src/components/UI/Container';
import SectionWrapper, { ContentWrapper } from './designedAndBuilt.style';

import { designAndBuilt } from 'landings/common/src/data/AppModern';

const DesignedAndBuilt = () => {
  const { image, title, slogan, description } = designAndBuilt;

  return (
    <SectionWrapper>
      <Container>
        <ContentWrapper>
          <div className="content">
            <Heading as="h5" content={slogan} />
            <Heading content={title} />
            <Text content={description} />
          </div>
          <div className="image">
            <Image src={image} alt="Built Logo" />
          </div>
        </ContentWrapper>
      </Container>
    </SectionWrapper>
  );
};

export default DesignedAndBuilt;
