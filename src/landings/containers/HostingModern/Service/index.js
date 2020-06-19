import React from 'react';
import Zoom from 'react-reveal/Zoom';

import Container from 'landings/common/src/components/UI/Container';

import SectionHeading from '../SectionHeading';
import ServiceSection, { ServiceWrapper, ServiceItem } from './service.style';
import { Services } from 'landings/common/src/data/HostingModern';

const Service = () => {
  return (
    <ServiceSection id="services">
      <Container>
        <SectionHeading slogan="Ideal solutions for you" title="Didn’t find what you were looking for?" />
        <ServiceWrapper>
          {Services.map((service) => (
            <ServiceItem key={service.id}>
              <Zoom delay={50 * service.id}>
                <h4>{service.title}</h4>
                <p>{service.price}</p>
              </Zoom>
            </ServiceItem>
          ))}
        </ServiceWrapper>
      </Container>
    </ServiceSection>
  );
};

export default Service;
