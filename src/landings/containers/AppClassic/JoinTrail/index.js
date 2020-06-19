import React from 'react';
import Fade from 'react-reveal/Fade';
import Image from 'landings/common/src/components/Image';
import Text from 'landings/common/src/components/Text';
import Heading from 'landings/common/src/components/Heading';
import Button from 'landings/common/src/components/Button';
import JoinTrailArea, { ContentWrapper, ButtonGroup } from './joinTrail.style';

import { joinSlack } from 'landings/common/src/data/AppClassic';

const JoinTrail = () => {
  const { logo, title, description } = joinSlack;

  return (
    <JoinTrailArea id="trail">
      <ContentWrapper>
        <Fade up>
          <Image src={logo} alt="Slack" />
        </Fade>
        <Fade up delay={100}>
          <Heading content={title} />
        </Fade>
        <Fade up delay={200}>
          <Text content={description} />
        </Fade>
        <Fade up delay={300}>
          <ButtonGroup>
            <Button title="Join with Slack" />
            <Button title="Login with Email" variant="textButton" />
          </ButtonGroup>
        </Fade>
      </ContentWrapper>
    </JoinTrailArea>
  );
};

export default JoinTrail;
