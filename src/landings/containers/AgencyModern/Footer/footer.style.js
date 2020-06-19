import styled from 'styled-components';
import { themeGet } from 'styled-system';
import { rgba } from 'polished';

const FooterWrapper = styled.footer`
  padding: 75px 0;
`;

export const FooterInner = styled.div`
  display: flex;
  @media only screen and (max-width: 991px) {
    flex-wrap: wrap;
  }
  > div {
    width: calc(100% / 5);
    @media only screen and (max-width: 991px) {
      width: calc(100% / 4);
      &:nth-child(1) {
        margin-right: 100px;
      }
      &:nth-child(2),
      &:nth-child(4) {
        margin-right: 70px;
      }
      &:nth-child(4),
      &:nth-child(5) {
        margin-top: 50px;
      }
    }
    @media only screen and (max-width: 768px) {
      &:nth-child(1) {
        margin-right: 60px;
      }
      &:nth-child(2),
      &:nth-child(4) {
        margin-right: 30px;
      }
      margin-right: 20px;
    }
    @media only screen and (max-width: 600px) {
      width: calc(100% / 2);
      margin-right: 0 !important;
    }
    @media only screen and (max-width: 480px) {
      width: 100%;
      margin-right: 0 !important;
    }
  }
`;

export const CopyrightInfo = styled.div`
  margin-right: 70px;
  p {
    font-size: 14px;
    line-height: 18px;
    margin-top: 24px;
    a {
      color: ${themeGet('colors.headingColor')};
    }
  }
  .copyright {
    color: ${rgba('#0f2137', 0.6)};
    margin-top: 20px;
  }
`;

export const FooterWidget = styled.div`
  h4 {
    font-family: DM Sans;
    letter-spacing: -0.5px;
    color: ${themeGet('colors.headingColor')};
    font-weight: 500;
    font-size: 18px;
    line-height: 30px;
  }
`;

export const Nav = styled.nav`
  a {
    color: ${rgba('#02073E', 0.8)};
    display: flex;
    align-items: center;
    font-size: 15px;
    line-height: 2.5;
    transition: 0.3s ease 0s;
    img {
      margin-right: 12px;
    }
    &:hover {
      color: ${themeGet('colors.primary')};
    }
  }
`;

export default FooterWrapper;
