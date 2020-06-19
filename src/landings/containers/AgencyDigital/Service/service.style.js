import styled from 'styled-components';
import { themeGet } from 'styled-system';

const Section = styled.div`
  background-color: #f9fbfd;
  padding: 100px 0 120px;

  @media screen and (max-width: 480px) {
    padding: 60px 0;
  }
`;

export const ServiceWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 1px;
  @media screen and (max-width: 411px) and (max-height: 823px) and (orientation: landscape) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media only screen and (width: 1366px) and (max-height: 700px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media screen and (max-width: 480px) {
    grid-template-columns: repeat(1, 1fr);
  }

  .react-reveal {
    border: 1px solid ${themeGet('colors.border')};
    box-sizing: content-box;
    width: 100%;
    height: 100%;
  }
  .serviceItem {
    padding: 50px 50px 60px;
    @media screen and (max-width: 480px) {
      padding: 25px 25px 20px;
    }
    transition: 0.3s ease 0s;
    position: relative;
    &::before {
      background-color: #fff;
      position: absolute;
      content: '';
      right: -1px;
      bottom: -1px;
      left: -1px;
      top: -1px;
      z-index: -1;
      opacity: 0;
      transition: 0.3s ease 0s;
    }
    &:hover {
      box-shadow: 0px 20px 50px rgba(59, 90, 136, 0.05);
      &::before {
        opacity: 1;
      }
    }
    .thumbnail {
      margin-bottom: 25px;
    }
    .title {
      font-weight: bold;
      font-size: 18px;
      line-height: 30px;
      color: #0f2137;
    }
    .excerpt {
      font-size: 16px;
      line-height: 30px;
      color: #343d48;
    }
    .learn_more a {
      font-weight: 500;
      font-size: 15px;
      line-height: 42px;
      display: inline-flex;
      align-items: center;
      color: ${themeGet('colors.linkColor')};
      i {
        line-height: 1;
        margin-left: 2px;
        transition: 0.3s ease 0s;
      }
      &:hover i {
        margin-left: 7px;
      }
    }
  }
`;

export default Section;
