import React from 'react';
import Fade from 'react-reveal/Fade';
import Text from 'landings/common/src/components/Text';
import Heading from 'landings/common/src/components/Heading';
import Button from 'landings/common/src/components/Button';
import Image from 'landings/common/src/components/Image';
import Container from 'landings/common/src/components/UI/Container';
import NormalClock from './timer';
const deadline = new Date(Date.parse(new Date()) + 12 * 24 * 60 * 60 * 1000);
import SectionWrapper, { ContentWrapper } from './countdown.style';

const CountDownSection = () => {
  return (
    <SectionWrapper>
      <Container>
        <ContentWrapper>
          <Heading content="Token Pre-sale starting in: " />
          <Fade up>
            <div className="timerCount">
              <NormalClock countdown={deadline} divider="true" />
            </div>
          </Fade>
          <Button className="primary" title="PRE-ORDER NOW" />
        </ContentWrapper>
      </Container>
    </SectionWrapper>
  );
};

export default CountDownSection;
