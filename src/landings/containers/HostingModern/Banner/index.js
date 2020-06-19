import React from 'react';
import Zoom from 'react-reveal/Zoom';

import Container from 'landings/common/src/components/UI/Container';
import Heading from 'landings/common/src/components/Heading';
import Text from 'landings/common/src/components/Text';
import Image from 'landings/common/src/components/Image';
import Input from 'landings/common/src/components/Input';
import Select from 'landings/common/src/components/Select';
import Button from 'landings/common/src/components/Button';

import BannerSection, {
  ContentWrapper,
  BannerContent,
  DomainChecker,
  DomainControl,
  BannerImage,
} from './banner.style';

import illustration from 'landings/common/src/assets/image/hostingModern/illustration.png';

const options = [
  { label: '.COM', value: 'dot-com' },
  { label: '.NET', value: 'dot-net' },
  { label: '.ORG', value: 'dot-org' },
];

const Banner = () => {
  return (
    <BannerSection id="home">
      <Container>
        <Zoom>
          <ContentWrapper>
            <BannerContent>
              <Heading as="h1" content="Built your business with a website" />
              <Text content="Get your tests delivered at let home collect sample from the victory of the managements that supplies best." />
              <DomainChecker>
                <DomainControl>
                  <Input inputType="text" placeholder="Your domain name" iconPosition="left" aria-label="domain" />
                  <Select
                    options={options}
                    defaultValue={options[0]}
                    id="domain"
                    components={{
                      IndicatorSeparator: () => null,
                    }}
                  />
                </DomainControl>
                <Button fullWidth title="Start for free" type="submit" />
              </DomainChecker>
            </BannerContent>
            <BannerImage>
              <Image src={illustration} alt="" />
            </BannerImage>
          </ContentWrapper>
        </Zoom>
      </Container>
    </BannerSection>
  );
};

export default Banner;
