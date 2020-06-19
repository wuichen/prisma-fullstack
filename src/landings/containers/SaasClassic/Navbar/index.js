import React, { useContext } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import NavbarWrapper from 'landings/common/src/components/Navbar';
import Drawer from 'landings/common/src/components/Drawer';
import Button from 'landings/common/src/components/Button';
import Logo from 'landings/common/src/components/UIElements/Logo';
import Box from 'landings/common/src/components/Box';
import HamburgMenu from 'landings/common/src/components/HamburgMenu';
import Container from 'landings/common/src/components/UI/Container';
import { DrawerContext } from 'landings/common/src/contexts/DrawerContext';

import { MENU_ITEMS } from 'landings/common/src/data/SaasClassic';
import ScrollSpyMenu from 'landings/common/src/components/ScrollSpyMenu';

import LogoImage from 'landings/common/src/assets/image/saasClassic/logo-white.png';
import LogoImageAlt from 'landings/common/src/assets/image/saasClassic/logo.png';

const Navbar = ({ navbarStyle, logoStyle, button, row, menuWrapper }) => {
  const { state, dispatch } = useContext(DrawerContext);

  // Toggle drawer
  const toggleHandler = () => {
    dispatch({
      type: 'TOGGLE',
    });
  };

  return (
    <NavbarWrapper {...navbarStyle} className="saas_navbar">
      <Container>
        <Box {...row}>
          <Logo href="#" logoSrc={LogoImage} title="Portfolio" logoStyle={logoStyle} className="main-logo" />
          <Logo href="#" logoSrc={LogoImageAlt} title="Portfolio" logoStyle={logoStyle} className="logo-alt" />
          <Box {...menuWrapper}>
            <ScrollSpyMenu className="main_menu" menuItems={MENU_ITEMS} offset={-70} />
            <Link href="#">
              <a className="navbar_button">
                <Button {...button} title="GET STARTED" />
              </a>
            </Link>
            <Drawer
              width="420px"
              placement="right"
              drawerHandler={<HamburgMenu barColor="#fff" />}
              open={state.isOpen}
              toggleHandler={toggleHandler}
            >
              <ScrollSpyMenu className="mobile_menu" menuItems={MENU_ITEMS} drawerClose={true} offset={-100} />
              <Link href="#">
                <a className="navbar_drawer_button">
                  <Button {...button} title="GET STARTED" />
                </a>
              </Link>
            </Drawer>
          </Box>
        </Box>
      </Container>
    </NavbarWrapper>
  );
};

Navbar.propTypes = {
  navbarStyle: PropTypes.object,
  logoStyle: PropTypes.object,
  button: PropTypes.object,
  row: PropTypes.object,
  menuWrapper: PropTypes.object,
};

Navbar.defaultProps = {
  navbarStyle: {
    minHeight: '70px',
    display: 'block',
  },
  row: {
    flexBox: true,
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  logoStyle: {
    maxWidth: ['120px', '130px'],
  },
  button: {
    type: 'button',
    fontSize: '13px',
    fontWeight: '700',
    borderRadius: '4px',
    pl: '15px',
    pr: '15px',
    colors: 'secondaryWithBg',
    minHeight: 'auto',
    height: '40px',
  },
  menuWrapper: {
    flexBox: true,
    alignItems: 'center',
  },
};

export default Navbar;
