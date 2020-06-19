import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'react-icons-kit';
import { chevronRight } from 'react-icons-kit/feather/chevronRight';

import FeatureBlock from 'landings/common/src/components/FeatureBlock';
import Container from 'landings/common/src/components/UI/Container';
import Text from 'landings/common/src/components/Text';
import Link from 'landings/common/src/components/Link';
import Heading from 'landings/common/src/components/Heading';
import SectionWrapper, { FeatureWrapper } from './ultimateFeature.style';
import SectionHeading from '../SectionHeading';
import { features } from 'landings/common/src/data/HostingModern';

const UltimateFeature = () => {
  return (
    <SectionWrapper id="features">
      <Container>
        <SectionHeading mb="20px" slogan="Product features" title="Ultimate features that works" />

        <FeatureWrapper>
          {features.map((feature, index) => (
            <FeatureBlock
              key={index}
              icon={<img src={feature.icon} alt="ah" />}
              title={<Heading as="h4" content={feature.title} />}
              description={
                <React.Fragment>
                  <Text content={feature.desc} />
                  <Link href="#" className="learn__more">
                    Learn More <Icon icon={chevronRight} />
                  </Link>
                </React.Fragment>
              }
              className="ultimateFeature"
            />
          ))}
        </FeatureWrapper>
      </Container>
    </SectionWrapper>
  );
};

UltimateFeature.propTypes = {
  row: PropTypes.object,
  col: PropTypes.object,
};

UltimateFeature.defaultProps = {
  row: {
    flexBox: true,
    flexWrap: 'wrap',
    ml: ['-30px', '-30px', '-30px', '-25px', '-30px'],
    mr: ['-30px', '-30px', '-30px', '-25px', '-45px'],
  },
  col: {
    width: [1, 1 / 2, 1 / 2, 1 / 3],
  },
};

export default UltimateFeature;
