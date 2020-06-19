import styled from 'styled-components';
import { rgba } from 'polished';
import { themeGet } from 'styled-system';
import illustration from 'landings/common/src/assets/image/agencyDigital/banner_illustration.png';

const Section = styled.section`
  @media only screen and (max-width: 1600px) {
    padding-bottom: 40px;
  }
`;

export const ContentWrapper = styled.div`
  background: transparent url(${illustration}) no-repeat right center / 64%;
  display: flex;
  align-items: center;
  min-height: 80vh;
  /* Portrait */
  @media only screen and (min-width: 1024px) and (max-height: 1366px) and (orientation: portrait) and (-webkit-min-device-pixel-ratio: 1.5) {
    min-height: 50vh;
  }
  @media only screen and (min-width: 1024px) and (max-height: 1366px) and (orientation: landscape) and (-webkit-min-device-pixel-ratio: 1.5) {
    min-height: 60vh;
  }
  @media only screen and (width: 1366px) and (max-height: 700px) {
    min-height: 82vh;
  }
  @media only screen and (min-device-width: 768px) and (max-device-width: 1024px) and (orientation: landscape) {
    background-size: 53%;
  }
  @media only screen and (max-width: 1280px) and (max-height: 610px) {
    background-size: 60%;
    min-height: 85vh;
  }
  @media only screen and (max-width: 768px) {
    background-image: none;
    min-height: 50vh;
  }
  @media only screen and (max-width: 480px) {
    min-height: 70vh;
  }
`;

export const Illustration = styled.div``;

export const BannerContent = styled.div`
  max-width: 36%;
  width: 100%;

  @media only screen and (max-width: 1366px) {
    max-width: 38%;
  }
  @media only screen and (max-width: 1280px) and (max-height: 610px) {
    max-width: 40%;
  }
  @media only screen and (min-device-width: 768px) and (max-device-width: 1024px) and (orientation: landscape) {
    max-width: 46%;
  }
  @media only screen and (max-width: 768px) {
    max-width: 100%;
  }
  h1 {
    font-family: Arvo;
    font-size: 48px;
    line-height: 70px;
    font-weight: 700;
    color: ${themeGet('colors.menu', '#02073e')};
    margin-bottom: 24px;
    letter-spacing: -1px;
    margin-top: 0;
    @media only screen and (max-width: 1440px) {
      font-size: 36px;
      margin-bottom: 20px;
      line-height: 55px;
    }
    @media only screen and (min-width: 1024px) and (max-height: 1366px) and (orientation: portrait) and (-webkit-min-device-pixel-ratio: 1.5) {
      line-height: 45px;
    }
    @media only screen and (min-width: 1024px) and (max-width: 1440px) {
      margin-bottom: 32px;
    }
    @media only screen and (min-device-width: 768px) and (max-device-width: 1024px) and (orientation: landscape) {
      font-size: 28px;
      line-height: 44px;
    }
    @media only screen and (max-width: 1024px) {
      font-size: 28px;
      margin-bottom: 20px;
    }
    @media only screen and (width: 1280px) {
      font-size: 32px;
      margin-bottom: 20px;
      line-height: 1.5;
    }
    @media only screen and (max-width: 768px) {
      font-size: 38px;
      margin-bottom: 30px;
    }
    @media only screen and (max-width: 480px) {
      font-size: 23px;
      margin-bottom: 20px;
      line-height: 40px;
    }
  }
  .banner-caption {
    color: ${themeGet('colors.paragraph', '#02073E')};
    font-size: 18px;
    line-height: 33px;
    font-weight: 400;
    margin-bottom: 0;
    @media only screen and (max-width: 1024px) {
      line-height: 33px;
    }
    @media only screen and (max-width: 768px) {
      margin-bottom: 40px;
    }
    @media only screen and (max-width: 480px) {
      font-size: 16px;
    }
  }
`;

export const Subscribe = styled.div`
  display: flex;
  margin-top: 40px;
  @media only screen and (max-width: 480px) {
    align-items: center;
  }
  .reusecore__input {
    width: 100%;
  }
  .field-wrapper {
    margin-right: 15px;
    input {
      font-family: DM Sans;
      font-size: 16px;
      min-height: 60px;
      padding: 0 24px;
      ::placeholder {
        color: ${rgba('#02073E', 0.4)};
        opacity: 1; /* Firefox */
      }
      &:focus {
        border-color: #ff825c;
      }

      @media only screen and (max-width: 1280px) {
        min-height: 50px;
      }
    }
  }
  button {
    background-color: #ff825c;
    min-width: 150px;

    @media only screen and (max-width: 480px) {
      min-width: 100px;
    }
  }
`;

export const SponsoredBy = styled.div`
  display: flex;
  align-items: center;
  margin-top: 35px;
  @media only screen and (min-width: 1024px) and (max-height: 1366px) and (orientation: portrait) and (-webkit-min-device-pixel-ratio: 1.5) {
    display: block;
  }
  @media only screen and (min-device-width: 768px) and (max-device-width: 1024px) and (orientation: landscape) {
    display: block;
    margin-top: 25px;
  }

  @media only screen and (max-width: 480px) {
    align-items: flex-start;
    flex-direction: column;
  }

  .sponsoredBy {
    color: ${rgba('#566272', 0.6)};
    font-size: 16px;
    margin-right: 21px;
    margin-bottom: 0;
    @media only screen and (min-width: 1024px) and (max-height: 1366px) and (orientation: portrait) and (-webkit-min-device-pixel-ratio: 1.5) {
      margin: 0 0 20px 0;
    }
    @media only screen and (min-device-width: 768px) and (max-device-width: 1024px) and (orientation: landscape) {
      margin: 0 0 15px 0;
    }
    @media only screen and (max-width: 480px) {
      margin-bottom: 15px;
    }
  }
`;

export const ImageGroup = styled.div`
  display: flex;
  align-items: center;
  img {
    &:not(:last-child) {
      margin-right: 23px;
    }

    @media only screen and (max-width: 480px) {
      max-width: 27%;
    }
  }
`;

export default Section;
