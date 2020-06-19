import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import NavbarWrapper from 'landings/common/src/components/Navbar';
import Drawer from 'landings/common/src/components/Drawer';
import Logo from 'landings/common/src/components/UIElements/Logo';
import Box from 'landings/common/src/components/Box';
import HamburgMenu from 'landings/common/src/components/HamburgMenu';
import Container from 'landings/common/src/components/UI/Container';
import { DrawerContext } from 'landings/common/src/contexts/DrawerContext';
import { MENU_ITEMS } from 'landings/common/src/data/Ride';
import { MENU_LEFT_ITEMS } from 'landings/common/src/data/Ride';
import { MENU_RIGHT_ITEMS } from 'landings/common/src/data/Ride';
import ScrollSpyMenu from 'landings/common/src/components/ScrollSpyMenu';
import LogoImage from 'landings/common/src/assets/image/ride/logo.svg';

const Navbar = ({ navbarStyle, logoStyle, row, menuWrapper }) => {
  const { state, dispatch } = useContext(DrawerContext);

  // Toggle drawer
  const toggleHandler = () => {
    dispatch({
      type: 'TOGGLE',
    });
  };

  return (
    <NavbarWrapper {...navbarStyle}>
      <Container noGutter mobileGutter width="1200px">
        <Box {...row}>
          <Logo href="#" logoSrc={LogoImage} title="Portfolio" logoStyle={logoStyle} className="main-logo" />
          <Logo href="#" logoSrc={LogoImage} title="Portfolio" logoStyle={logoStyle} className="logo-alt" />
          <Box {...menuWrapper}>
            <ScrollSpyMenu className="main_menu menuLeft" menuItems={MENU_LEFT_ITEMS} offset={-70} />
            <ScrollSpyMenu className="main_menu menuRight" menuItems={MENU_RIGHT_ITEMS} offset={-70} />

            <Drawer
              width="420px"
              placement="right"
              drawerHandler={<HamburgMenu barColor="#3444f1" />}
              open={state.isOpen}
              toggleHandler={toggleHandler}
            >
              <ScrollSpyMenu className="mobile_menu" menuItems={MENU_ITEMS} drawerClose={true} offset={-100} />
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
    className: 'hosting_navbar',
    minHeight: '70px',
    display: 'block',
  },
  row: {
    flexBox: true,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
  },
  logoStyle: {
    maxWidth: ['120px', '130px'],
  },
  button: {
    type: 'button',
    fontSize: '16px',
    pl: '0',
    pr: '0',
    colors: 'primary',
    minHeight: 'auto',
  },
  menuWrapper: {
    flexBox: true,
    alignItems: 'center',
    width: '100%',
    justifyContent: 'flex-end',
  },
};

export default Navbar;
