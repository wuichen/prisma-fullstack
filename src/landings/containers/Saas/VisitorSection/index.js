import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Fade from 'react-reveal/Fade';
import Zoom from 'react-reveal/Zoom';
import Box from 'landings/common/src/components/Box';
import Text from 'landings/common/src/components/Text';
import Heading from 'landings/common/src/components/Heading';
import Button from 'landings/common/src/components/Button';
import Card from 'landings/common/src/components/Card';
import Image from 'landings/common/src/components/Image';
import FeatureBlock from 'landings/common/src/components/FeatureBlock';
import Container from 'landings/common/src/components/UI/Container';
import VisitorSectionWrapper, { SectionObject } from './visitor.style';

import ImageOne from 'landings/common/src/assets/image/saas/saasvisitor1.png';
import ImageBg from 'landings/common/src/assets/image/saas/visitor_bg.png';

const VisitorSection = ({ title, description, textArea, imageWrapper, btnStyle }) => {
  return (
    <VisitorSectionWrapper id="visitorSection">
      <SectionObject>
        <Card className="objectWrapper" {...imageWrapper}>
          <Zoom>
            <Image src={ImageBg} alt="BgImage" />
          </Zoom>
          <Card className="dashboardWrapper" {...imageWrapper}>
            <Fade left>
              <Image src={ImageOne} alt="VisitorDashboard1" />
            </Fade>
          </Card>
        </Card>
      </SectionObject>
      <Container>
        <Box {...textArea}>
          <FeatureBlock
            title={<Heading content="Make your website growth with next level visitors" {...title} />}
            description={
              <Text
                content="For Enhanced performance we use LiteSpeed Web Server, HTTP/2, PHP7. We make your website faster, which will help you to increase search ranking!."
                {...description}
              />
            }
            button={
              <Link href="#">
                <a>
                  <Button title="HOW IT WORKS" {...btnStyle} />
                </a>
              </Link>
            }
          />
        </Box>
      </Container>
    </VisitorSectionWrapper>
  );
};

VisitorSection.propTypes = {
  title: PropTypes.object,
  description: PropTypes.object,
  btnStyle: PropTypes.object,
};

VisitorSection.defaultProps = {
  textArea: {
    width: ['100%', '100%', '45%'],
    ml: [0, 0, '58%'],
  },
  imageWrapper: {
    boxShadow: 'none',
  },
  title: {
    fontSize: ['20px', '26px', '26px', '36px', '48px'],
    fontWeight: '400',
    color: '#0f2137',
    letterSpacing: '-0.010em',
    mb: '20px',
    maxWidth: ['100%', '100%', '100%', '440px', '440px'],
    lineHeight: '1.5',
  },
  description: {
    fontSize: '16px',
    color: '#343d48cc',
    lineHeight: '1.75',
    mb: '33px',
    maxWidth: ['100%', '100%', '100%', '440px', '440px'],
  },
  btnStyle: {
    minWidth: '156px',
    fontSize: '14px',
    fontWeight: '500',
    color: '#fff',
    borderRadius: '4px',
    pl: '22px',
    pr: '22px',
    colors: 'primaryWithBg',
  },
};

export default VisitorSection;
