import React, { useState, useRef } from 'react';
import Fade from 'react-reveal/Fade';
import ScrollSpyMenu from 'landings/common/src/components/ScrollSpyMenu';
import Scrollspy from 'react-scrollspy';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import { Icon } from 'react-icons-kit';
import { androidMenu } from 'react-icons-kit/ionicons/androidMenu';
import { androidClose } from 'react-icons-kit/ionicons/androidClose';
import Logo from 'landings/common/src/components/UIElements/Logo';
import Button from 'landings/common/src/components/Button';
import Container from 'landings/common/src/components/UI/Container';
import NavbarWrapper, { MenuArea, MobileMenu } from './navbar.style';
import LogoImage from 'landings/common/src/assets/image/agencyModern/logo.png';

import data from 'landings/common/src/data/AgencyModern';

const Navbar = () => {
  const [mobileMenu, setMobileMenu] = useState(false);

  const scrollItems = [];

  data.leftMenuItems.forEach((item) => {
    scrollItems.push(item.path.slice(1));
  });

  const handleMobileMenu = () => {
    setMobileMenu(!mobileMenu);
  };

  const handleHandleMenuClose = () => {
    setMobileMenu(false);
  };

  return (
    <NavbarWrapper className="agencyModern-navbar navbar">
      <Container>
        <Logo href="/agencymodern" logoSrc={LogoImage} title="Crypto Modern" className="main-logo" />
        {/* end of logo */}

        <MenuArea>
          <ScrollSpyMenu className="menu-items menu-left" menuItems={data.leftMenuItems} offset={-84} />
          <ScrollSpyMenu className="menu-items menu-right" menuItems={data.rightMenuItems} offset={-84} />
          {/* end of main menu */}

          <Button
            className="menubar"
            icon={
              mobileMenu ? (
                <Icon style={{ color: '#02073E' }} className="bar" size={32} icon={androidClose} />
              ) : (
                <Fade>
                  <Icon style={{ color: '#02073E' }} className="close" icon={androidMenu} size={32} />
                </Fade>
              )
            }
            color="#0F2137"
            variant="textButton"
            onClick={handleMobileMenu}
          />
        </MenuArea>
      </Container>

      {/* start mobile menu */}
      <MobileMenu className={`mobile-menu ${mobileMenu ? 'active' : ''}`}>
        <Container>
          <Scrollspy className="menu" items={scrollItems} offset={-84} currentClassName="active">
            {data.mobileMenuItems.map((menu, index) => (
              <li key={`menu_key${index}`}>
                <AnchorLink href={menu.path} offset={menu.offset} onClick={handleHandleMenuClose}>
                  {menu.label}
                </AnchorLink>
              </li>
            ))}
          </Scrollspy>
        </Container>
      </MobileMenu>
      {/* end of mobile menu */}
    </NavbarWrapper>
  );
};

export default Navbar;
