import styled from 'styled-components';

const Section = styled.section`
  padding: 90px 0;
  @media screen and (max-width: 480px) {
    padding: 50px 0;
  }
`;

export const ContentWrapper = styled.div`
  display: flex;
  @media screen and (max-width: 768px) {
    /* flex-direction: column-reverse; */
  }
`;

export const Content = styled.div`
  width: 38%;
  @media screen and (max-width: 768px) {
    width: 100%;
  }
  h2 {
    font-family: Arvo;
    font-weight: bold;
    font-size: 36px;
    line-height: 55px;
    letter-spacing: -0.5px;
    color: #0f2137;
    @media screen and (max-width: 480px) {
      font-size: 28px;
      line-height: 45px;
    }
  }
  p {
    font-size: 16px;
    line-height: 36px;
    color: #02073e;
  }
`;

export const Illustration = styled.figure`
  margin: 0;
  width: 62%;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const HelpBlock = styled.div`
  display: flex;
  align-items: center;
  margin-top: 30px;
  .icon {
    margin-right: 20px;
    min-width: 60px;
  }
  h4 {
    font-weight: bold;
    font-size: 18px;
    line-height: 30px;
    color: #0f2137;
    margin: 0;
  }
  p {
    font-size: 16px;
    line-height: 26px;
    color: #343d48;
    margin: 0;
  }
`;

export default Section;
