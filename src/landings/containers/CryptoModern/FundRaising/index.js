import React from 'react';
import Text from 'landings/common/src/components/Text';
import Heading from 'landings/common/src/components/Heading';
import Image from 'landings/common/src/components/Image';
import Container from 'landings/common/src/components/UI/Container';
import SectionWrapper, { ContentWrapper } from './fundRaising.style';
import FundGraphImg from 'landings/common/src/assets/image/cryptoModern/fund-graph.png';
import GraphFeatureImg from 'landings/common/src/assets/image/cryptoModern/graph-feature.png';

const DesignedAndBuilt = () => {
  return (
    <SectionWrapper id="fund">
      <Container>
        <ContentWrapper>
          <div className="image">
            <Image src={FundGraphImg} alt="Graph Image" />
          </div>
          <div className="content">
            <Heading content="Fund raising allocation" />
            <Text content="Lorem ipsum dolor sit amet consectetur adipisicing elit sed eiu Lorem ipsum dolor sit ." />
            <Image src={GraphFeatureImg} alt="Graph Feature Image" />
          </div>
          <div className="gradientDiv"> </div>
        </ContentWrapper>
      </Container>
    </SectionWrapper>
  );
};

export default DesignedAndBuilt;
