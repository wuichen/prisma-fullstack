import React from 'react';
import Text from 'landings/common/src/components/Text';
import Heading from 'landings/common/src/components/Heading';
import BlogPost from 'landings/common/src/components/BlogPost';
import Container from 'landings/common/src/components/UI/Container';
import SectionWrapper, { SectionHeader, FeatureWrapper } from './workSection.style';

import { workData } from 'landings/common/src/data/Charity';

const WorkSection = () => {
  const { title, slogan, features } = workData;
  return (
    <SectionWrapper id="work">
      <Container width="1260px">
        <SectionHeader>
          <Heading content={title} />
          <Text content={slogan} />
        </SectionHeader>
        <FeatureWrapper>
          {features.map((item) => (
            <BlogPost
              key={`feature_key${item.id}`}
              thumbUrl={item.icon}
              title={item.title}
              excerpt={item.description}
            />
          ))}
        </FeatureWrapper>
      </Container>
    </SectionWrapper>
  );
};

export default WorkSection;
