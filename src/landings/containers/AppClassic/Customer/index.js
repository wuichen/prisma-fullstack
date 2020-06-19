import React from 'react';
import Text from 'landings/common/src/components/Text';
import Image from 'landings/common/src/components/Image';
import CustomerWrapper, { ImageWrapper } from './customer.style';

import { client } from 'landings/common/src/data/AppClassic';

const Customer = () => {
  return (
    <CustomerWrapper>
      <Text content="Trusted by companies like:" />
      <ImageWrapper>
        {client.map((item) => (
          <Image key={`client-key${item.id}`} src={item.image} alt={item.title} />
        ))}
      </ImageWrapper>
    </CustomerWrapper>
  );
};

export default Customer;
