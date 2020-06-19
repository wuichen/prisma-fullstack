import React from 'react';
import Fade from 'react-reveal/Fade';
import Text from 'landings/common/src/components/Text';
import Heading from 'landings/common/src/components/Heading';
import Image from 'landings/common/src/components/Image';
import Container from 'landings/common/src/components/UI/Container';
import SectionWrapper, { ContentWrapper } from './privacy.style';
import Illustration from 'landings/common/src/assets/image/cryptoModern/illustration1.png';

const PrivacyPortal = () => {
  return (
    <SectionWrapper>
      <Container>
        <ContentWrapper>
          <div className="content">
            <Heading content="Privacy Preserving  Anonymous Funds  Protocol" />
            <Text content="Lorem ipsum dolor sit amet consectetur adipisicing elit sed eiu Lorem ipsum dolor sit amet consectetur adipisicing elit sed eiu" />
          </div>
          <div className="image">
            <Fade up>
              <Image src={Illustration} alt="Illustration Image" />
            </Fade>
          </div>
        </ContentWrapper>
      </Container>
    </SectionWrapper>
  );
};

export default PrivacyPortal;
