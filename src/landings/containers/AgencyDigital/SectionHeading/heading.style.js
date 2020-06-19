import styled from 'styled-components';
import { themeGet } from 'styled-system';

const HGroup = styled.hgroup`
  margin-bottom: ${props => props.mb ?? '50px'};
  text-align: ${props => props.textAlign ?? 'center'};
  h4 {
    color: ${themeGet('colors.slogan')};
    font-weight: 500;
    font-size: 16px;
    line-height: 40px;
    margin: 0;
  }
  h2 {
    color: ${themeGet('colors.textPrimary')};
    font-weight: 500;
    font-size: 24px;
    line-height: 50px;
    letter-spacing: -0.5px;
    margin: 0;
  }
`;

export default HGroup;
