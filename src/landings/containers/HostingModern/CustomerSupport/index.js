import React from 'react';
import Icon from 'react-icons-kit';
import { checkmarkCircled } from 'react-icons-kit/ionicons/checkmarkCircled';
import Container from 'landings/common/src/components/UI/Container';
import Image from 'landings/common/src/components/Image';
import Heading from 'landings/common/src/components/Heading';
import Text from 'landings/common/src/components/Text';
import List from 'landings/common/src/components/List';
import SectionWrapper, { ContentWrapper, Figure, Content, IconList } from './customerSupport.style';
import messenger from 'landings/common/src/assets/image/hostingModern/messenger.png';

const CustomerSupport = () => {
  return (
    <SectionWrapper>
      <Container>
        <ContentWrapper>
          <Figure>
            <Image src={messenger} alt="" />
          </Figure>
          <Content>
            <Heading content="Customer support is our main priority with their hundred percent satisfaction." />
            <Text content="Get your tests delivered at let home collect sample from the victory of the managments that supplies best design system guidelines ever." />

            <IconList>
              <List className="listItem" icon={<Icon icon={checkmarkCircled} size="18" />} text="Medical and vision" />
              <List className="listItem" icon={<Icon icon={checkmarkCircled} size="18" />} text="Life insurance" />
              <List className="listItem" icon={<Icon icon={checkmarkCircled} size="18" />} text="HSAs and FSAs" />
              <List className="listItem" icon={<Icon icon={checkmarkCircled} size="18" />} text="Commuter benefits" />
            </IconList>
          </Content>
        </ContentWrapper>
      </Container>
    </SectionWrapper>
  );
};

export default CustomerSupport;
