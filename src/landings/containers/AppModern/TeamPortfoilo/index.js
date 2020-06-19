import React, { useState } from 'react';
import Fade from 'react-reveal/Fade';
import Text from 'landings/common/src/components/Text';
import Heading from 'landings/common/src/components/Heading';
import Button from 'landings/common/src/components/Button';
import Image from 'landings/common/src/components/Image';
import Container from 'landings/common/src/components/UI/Container';
import SectionWrapper, { ContentWrapper } from './teamPortfolio.style';

import { teamportfolio } from 'landings/common/src/data/AppModern';

const TeamPortfoiloSection = () => {
  const { title, description, teammember } = teamportfolio;
  const [hover, setHover] = useState({
    active: 6, // active item when start
  });

  const handleMouseEnter = (index) => {
    setHover({
      active: index,
    });
  };

  return (
    <SectionWrapper id="team">
      <Container>
        <ContentWrapper>
          <div className="image">
            {teammember.map((item, index) => (
              <Fade up key={index}>
                <div
                  className={`item_wrapper ${hover.active === index ? 'active' : ''}`}
                  key={index}
                  onMouseEnter={() => {
                    setHover({
                      active: index,
                    });
                  }}
                  onMouseLeave={() => {
                    setHover({
                      active: index,
                    });
                  }}
                >
                  <div className="imageWrapper">
                    <Image src={item.img} alt={item.text} />
                  </div>
                  <Text className="author_name" content={item.text} />
                </div>
              </Fade>
            ))}
          </div>
          <div className="content">
            <Heading content={title} />
            <Text content={description} />
            <Button title="Learn More" />
          </div>
        </ContentWrapper>
      </Container>
    </SectionWrapper>
  );
};

export default TeamPortfoiloSection;
