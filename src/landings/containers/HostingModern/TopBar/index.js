import React, { useState } from 'react';
import Link from 'next/link';
import { Icon } from 'react-icons-kit';
import { arrowRight } from 'react-icons-kit/feather/arrowRight';
import { closeCircled } from 'react-icons-kit/ionicons/closeCircled';

import Container from 'landings/common/src/components/UI/Container';
import Button from 'landings/common/src/components/Button';
import Image from 'landings/common/src/components/Image';
import gift from 'landings/common/src/assets/image/hostingModern/gift.png';
import TopBarWrapper, { TopbarInner, TopBarMobile, Wrapper } from './topbar.style';

const TopBar = () => {
  const [closeTopBar, setCloseTopBar] = useState(false);

  const handleClose = () => {
    setCloseTopBar(true);
  };

  return (
    <TopBarWrapper isHide={closeTopBar && closeTopBar}>
      <Container>
        <TopbarInner>
          <p className="caption">
            <Image src={gift} alt="gift icon" />
            Cyber monday sale begin, just grave the hot pricing
            <strong className="tlds">.COM $15 .NET $14 .ORG $19</strong>
          </p>

          <Link href="#">
            <a className="dealsLink">
              <span>See all deals</span>
              <Icon className="close" icon={arrowRight} size={14} />
            </a>
          </Link>
          <Button
            onClick={handleClose}
            className="closeTopBar"
            icon={<Icon className="close" icon={closeCircled} size={20} />}
          />
        </TopbarInner>
        <TopBarMobile>
          <Wrapper>
            <p className="caption">
              <Image src={gift} alt="gift icon" />
              <span>Cyber monday sale begin, just grave the hot pricing</span>
            </p>
            <p>
              <strong className="tlds">.COM $15 .NET $14 .ORG $19</strong>

              <Link href="#">
                <a className="dealsLink">
                  <span>See all deals</span>
                  <Icon className="close" icon={arrowRight} size={14} />
                </a>
              </Link>
            </p>
          </Wrapper>
          <Button
            onClick={handleClose}
            className="closeTopBar"
            icon={<Icon className="close" icon={closeCircled} size={20} />}
          />
        </TopBarMobile>
      </Container>
    </TopBarWrapper>
  );
};

export default TopBar;
