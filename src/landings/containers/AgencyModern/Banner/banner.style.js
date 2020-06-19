import styled from 'styled-components';
import { rgba } from 'polished';
import { themeGet } from 'styled-system';

import bannerImg from 'landings/common/src/assets/image/agencyModern/banner.png';

const BannerWrapper = styled.div`
  overflow: hidden;
  background: ${rgba('#f0ded5', 0.6)} url(${bannerImg}) no-repeat right center / 60%;
  @media only screen and (max-width: 1440px) {
    background-size: 68%;
  }
  @media only screen and (max-width: 1366px) {
    background-size: 68%;
  }
  @media only screen and (max-height: 900px) and (max-width: 1600px) {
    background-size: 69%;
  }
  @media only screen and (max-width: 1280px) and (max-height: 610px) {
    background-size: 58%;
  }
  @media only screen and (max-height: 1366px) and (max-width: 1024px) and (orientation: portrait) and (-webkit-min-device-pixel-ratio: 1.5) {
    background-size: 78%;
  }
  @media only screen and (max-width: 1366px) and (max-height: 1024px) and (orientation: landscape) and (-webkit-min-device-pixel-ratio: 1.5) {
    background-size: 73%;
  }
  @media only screen and (max-width: 1024px) and (max-height: 768px) and (orientation: landscape) and (-webkit-min-device-pixel-ratio: 2) {
    background-size: 73%;
  }
  @media only screen and (max-width: 768px) {
    background-image: none;
  }
  @media only screen and (max-width: 480px) {
    padding-top: 0;
    min-height: auto;
  }
  > div.container {
    display: flex;
    align-items: center;
    min-height: 100vh;
    @media only screen and (max-width: 1440px) {
      min-height: 90vh;
    }
    @media only screen and (max-height: 1366px) and (max-width: 1024px) and (orientation: portrait) and (-webkit-min-device-pixel-ratio: 1.5) {
      min-height: 48vh;
    }
    @media only screen and (max-width: 1366px) and (max-height: 1024px) and (orientation: landscape) and (-webkit-min-device-pixel-ratio: 1.5) {
      min-height: 80vh;
    }
    @media only screen and (max-width: 1280px) and (max-height: 610px) {
      min-height: 100vh;
    }
    @media only screen and (max-width: 1024px) and (max-height: 768px) and (orientation: landscape) and (-webkit-min-device-pixel-ratio: 2) {
      min-height: 80vh;
    }
    @media only screen and (max-width: 768px) {
      min-height: 65vh;
    }
    @media only screen and (max-width: 767px) {
      min-height: 100vh;
    }
  }
`;

export const BannerContent = styled.div`
  max-width: 45%;
  width: 100%;
  @media only screen and (max-width: 768px) {
    max-width: 100%;
  }
  h1 {
    font-size: 50px;
    line-height: 1.65;
    font-weight: 700;
    color: ${themeGet('colors.menu', '#02073e')};
    margin-bottom: 24px;
    letter-spacing: -0.025em;
    @media only screen and (max-width: 1440px) {
      font-size: 36px;
      margin-top: 40px;
      margin-bottom: 20px;
    }
    @media only screen and (min-width: 1024px) and (max-width: 1440px) {
      margin-bottom: 32px;
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

  @media only screen and (max-width: 480px) {
    align-items: flex-start;
    flex-direction: column;
  }

  .sponsoredBy {
    color: ${rgba('#566272', 0.6)};
    font-size: 16px;
    margin-right: 21px;
    margin-bottom: 0;

    @media only screen and (max-width: 480px) {
      margin-bottom: 8px;
    }
  }
`;

export const ImageGroup = styled.div`
  display: flex;
  align-items: center;
  img {
    &:not(:last-child) {
      margin-right: 28px;
    }

    @media only screen and (max-width: 480px) {
      max-width: 27%;
    }
  }
`;

export default BannerWrapper;
