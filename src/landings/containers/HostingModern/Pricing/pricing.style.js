import styled from 'styled-components';
import { themeGet } from 'styled-system';
import { rgba } from 'polished';

const SectionWrapper = styled.section`
  /* background-color: red; */
  padding: 70px 0 150px;
  @media only screen and (min-width: 1024px) and (max-height: 1366px) and (orientation: portrait) and (-webkit-min-device-pixel-ratio: 1.5) {
    padding: 100px 0;
  }
`;

export const ContentWrapper = styled.section`
  display: flex;
  align-items: flex-end;
  /* flex-wrap: wrap; */

  @media only screen and (min-device-width: 768px) and (max-device-width: 1024px) and (orientation: landscape) {
    flex-wrap: initial;
  }
  @media only screen and (max-width: 768px) {
    flex-wrap: wrap;
  }
`;
export const PriceTable = styled.div`
  padding: 40px;
  max-width: 100%;
  margin: 0 auto;
  @media only screen and (max-width: 768px) {
    padding: 30px;
  }
  &.recommended {
    box-shadow: 0px 15px 50px rgba(91, 132, 193, 0.1);
    margin: 0 2px;
    border-radius: 10px;
    position: relative;
    padding-top: 75px;
    .rec-label {
      background-color: #52acff;
      position: absolute;
      top: 0;
      width: 100%;
      left: 0;
      min-height: 35px;
      display: flex;
      color: #fff;
      border-radius: 10px 10px 0 0;
      align-items: center;
      justify-content: center;
      text-transform: uppercase;
      font-size: 14px;
      line-height: 18px;
      font-weight: 700;
    }
    @media only screen and (max-width: 768px) {
      margin-top: 50px;
    }
  }
  .desc {
    font-size: 16px;
    line-height: 26px;
    color: ${themeGet('colors.text')};
  }
  .start-trial {
    border-radius: 5px;
    margin-top: 21px;
    margin-bottom: 26px;
    &.outlined {
      background-color: #fff;
      border: 1.5px solid ${rgba('#5b2b9d', 0.15)};
      color: ${themeGet('colors.primary')};
    }
  }
  .listItem {
    color: ${themeGet('colors.text')};
    display: flex;
    font-size: 16px;
    line-height: 26px;
    margin-top: 30px;
    i {
      margin-right: 12px;
    }
    &.disabled {
      color: ${rgba('#343D48', 0.5)};
    }
  }
`;

export const Price = styled.div`
  font-weight: bold;
  font-size: 26px;
  line-height: 34px;
  display: flex;
  letter-spacing: -0.55px;
  align-items: baseline;
  margin-top: 11px;
  span {
    font-size: 16px;
  }
`;

export default SectionWrapper;
