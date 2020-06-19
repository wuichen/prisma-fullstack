import React from 'react';
import Link from 'next/link';
import Text from 'landings/common/src/components/Text';
import Heading from 'landings/common/src/components/Heading';
import Container from 'landings/common/src/components/UI/Container';
import BlockWrapper, { MilestoneCard, CounterWrapper, CounterItem } from './milestoneBlock.style';

import { milestoneData } from 'landings/common/src/data/Charity';

const MilestoneBlock = () => {
  const { title, amount, text, counterItems } = milestoneData;
  return (
    <Container id="milestone" width="1260px">
      <BlockWrapper>
        <MilestoneCard>
          <Text content={title} />
          <Heading content={amount} />
          <Text content={text} />
          <Link href="#1">
            <a className="learn__more-btn">
              <span className="hyphen" />
              <span className="btn_text">Meet our Donors</span>
            </a>
          </Link>
        </MilestoneCard>
      </BlockWrapper>
      <CounterWrapper>
        {counterItems.map((item) => (
          <CounterItem key={`counter_key${item.id}`}>
            <Heading as="h3" content={item.amount} />
            <Text content={item.title} />
          </CounterItem>
        ))}
      </CounterWrapper>
    </Container>
  );
};

export default MilestoneBlock;
