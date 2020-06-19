import styled from 'styled-components';

import media from 'landings/common/src/theme/narative/media';

const Section = styled.section<{
  relative?: string;
  hideOnDesktop?: boolean;
  hideOverflow?: boolean;
  narrow?: boolean;
}>`
  position: ${(p) => (p.relative ? 'relative' : 'static')};
  ${(p) => p.relative && 'z-index: 1;'};
  width: 100%;
  max-width: 1220px;
  margin: 0 auto;
  padding: 0 4rem;
  background: ${(p) => (p.background === 'dark' ? p.theme.colors.bg : 'transparent')};
  display: ${(p) => (p.hideOnDesktop ? 'none' : 'block')};
  ${(p) => p.hideOverflow && `overflow-x: hidden;`};

  ${media.desktop`
    max-width: 100%;
    display: ${(p) => (p.hideOnDesktop ? 'none' : 'block')};
  `};

  ${media.tablet`
    display: block;
    padding: ${(p) => (p.narrow ? '0 2rem' : '0 4rem')};
  `};

  ${media.phablet`
    max-width: 100%;
    ${(p) => p.hideOverflow && `overflow: hidden`};
  `};
`;

export default Section;
