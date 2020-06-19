import styled from 'styled-components';
import { themeGet } from 'styled-system';

const SectionWrapper = styled.div`
  padding: 75px 0;
  overflow: hidden;
  @media only screen and (max-width: 1024px) {
    padding: 20px 0 0;
  }
  @media only screen and (max-width: 768px) {
    padding: 0;
  }
  @media only screen and (max-width: 480px) {
    padding: 30px 0 25px;
  }
`;

export const ContentWrapper = styled.div`
  display: flex;
  align-items: center;
  @media only screen and (max-width: 768px) {
    flex-wrap: wrap;
  }
  .image {
    img {
      min-width: 580px;
      object-fit: contain;
      width: 100%;
      @media only screen and (max-width: 1024px) {
        min-width: 360px;
      }
      @media only screen and (min-width: 1024px) and (max-width: 1366px) {
        min-width: 480px;
      }
    }
  }
  .content {
    padding-left: 10px;
    @media only screen and (max-width: 768px) {
      margin-bottom: 50px;
      padding-left: 0px;
    }
    @media only screen and (max-width: 480px) {
      margin-bottom: 0px;
    }
    h2 {
      font-size: 36px;
      line-height: 60px;
      font-weight: 700;
      @media only screen and (max-width: 1440px) {
        margin-bottom: 15px;
        font-size: 38px;
      }
      @media only screen and (min-width: 1024px) and (max-width: 1366px) {
        font-size: 32px;
        line-height: 48px;
      }
      @media only screen and (min-width: 768px) and (max-width: 1024px) {
        margin-bottom: 15px;
        font-size: 24px;
        line-height: 40px;
      }
      @media only screen and (max-width: 768px) {
        font-size: 32px;
        max-width: 100%;
        text-align: left;
        line-height: 1.4;
      }
      @media only screen and (max-width: 480px) {
        font-size: 30px;
      }
    }
    p {
      font-size: 15px;
      line-height: 32px;
      @media only screen and (max-width: 768px) {
        max-width: 100%;
        text-align: left;
        line-height: 32px;
        margin: 28px 0;
        font-size: 18px;
      }
    }
    .accordion__item {
      background-color: #f6f8fb;
      border: 0;
      padding: 24px 32px;
      border-radius: 10px;
      margin-top: 20px;
      &.is__open {
        background-color: #fff;
        box-shadow: 0px 9px 30px rgba(69, 88, 157, 0.08);
      }
      @media only screen and (min-width: 768px) and (max-width: 1024px) {
        padding: 12px 26px;
      }
      h4 {
        font-family: DM Sans;
        font-size: 18px;
        line-height: 30px;
        margin-bottom: 0;
        font-weight: 400;
        @media only screen and (min-width: 768px) and (max-width: 1024px) {
          font-size: 16px;
          line-height: 24px;
        }
      }
      p {
        margin: 16px 0 0 0;
        @media only screen and (min-width: 768px) and (max-width: 1024px) {
          font-size: 14px;
          margin: 12px 0 4px 0;
        }
      }
    }
  }
`;

export default SectionWrapper;
