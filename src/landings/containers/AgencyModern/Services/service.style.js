import styled from 'styled-components';
import { themeGet } from 'styled-system';

const SectionWrapper = styled.section`
  width: 100%;
  padding: 81px 0;
  @media only screen and (max-width: 1440px) {
    padding: 70px 0;
  }
  @media only screen and (max-width: 1360px) {
    padding: 50px 0;
  }
  @media only screen and (max-width: 768px) {
    padding: 70px 0 40px;
  }
`;

export const SectionHeader = styled.header`
  text-align: center;
  margin-bottom: 60px;
  @media only screen and (max-width: 1440px) {
    margin-bottom: 50px;
  }
  @media only screen and (max-width: 991px) {
    margin-bottom: 40px;
  }

  h2 {
    font-size: 26px;
    font-weight: 700;
    line-height: 50px;
    font-family: 'B612';
    margin-bottom: 12px;
    @media only screen and (max-width: 1440px) {
      font-size: 36px;
    }
    @media only screen and (max-width: 1360px) {
      font-size: 34px;
    }
    @media only screen and (max-width: 991px) {
      font-size: 30px;
      margin-bottom: 10px;
    }
    @media only screen and (max-width: 767px) {
      font-size: 28px;
    }
    @media screen and (max-width: 480px) {
      line-height: 40px;
      margin-bottom: 30px;
    }
  }

  p {
    font-family: 'DM Sans';
    font-weight: 400;
    font-size: 15px;
    line-height: 35px;
    margin-bottom: 0;
    max-width: 500px;
    margin: 0 auto;
    width: 100%;
    @media only screen and (max-width: 1440px) {
      font-size: 16px;
      line-height: 32px;
    }
    @media only screen and (max-width: 991px) {
      font-size: 15px;
      line-height: 28px;
    }
  }
`;

export const ServiceWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  .react-reveal {
    width: calc(33.3333% - 30px);
    margin: 38px 0 0;
    @media only screen and (max-width: 991px) {
      width: calc(50% - 30px);
    }
    @media only screen and (max-width: 600px) {
      width: 100%;
    }
  }

  .service__item {
    display: flex;
    align-items: flex-start;

    .service__image {
      margin-right: 29px;
      flex-shrink: 0;
      @media only screen and (max-width: 1360px) {
        margin-right: 20px;
      }
    }

    .content {
      h3 {
        margin: 0 0 14px;
        font-family: 'DM Sans';
        font-weight: 700;
        font-size: 18px;
        line-height: 30px;
        @media only screen and (max-width: 1440px) {
          font-size: 22px;
          margin: 0 0 10px;
        }
        @media only screen and (max-width: 1360px) {
          font-size: 18px;
        }
      }

      p {
        margin: 0;
        font-family: 'DM Sans';
        font-size: 15px;
        line-height: 30px;
        color: ${themeGet('colors.text', '#294859')};
        @media only screen and (max-width: 1440px) {
          font-size: 16px;
        }
        @media only screen and (max-width: 1360px) {
          font-size: 15px;
          line-height: 26px;
        }
      }
    }
  }
`;

export default SectionWrapper;
