import React, { Fragment } from 'react';
import styled from 'styled-components';
import settings from '../../settings';

import * as SocialIcons from '../../icons/social';
import media from 'landings/common/src/theme/narative/media';

const SocialLinks = ({ fill = 'white' }: { fill: string }) => (
  <Fragment>
    <SocialIconContainer
      target="_blank"
      rel="noopener"
      data-a11y="false"
      aria-label="Link to Twitter"
      href={settings.urls.twitter}
    >
      <SocialIcons.TwitterIcon fill={fill} />
    </SocialIconContainer>
    <SocialIconContainer
      target="_blank"
      rel="noopener"
      data-a11y="false"
      aria-label="Link to Dribbble"
      href={settings.urls.dribbble}
    >
      <SocialIcons.DribbbleIcon fill={fill} />
    </SocialIconContainer>
    <SocialIconContainer
      target="_blank"
      rel="noopener"
      data-a11y="false"
      aria-label="Link to Instagram"
      href={settings.urls.instagram}
    >
      <SocialIcons.InstagramIcon fill={fill} />
    </SocialIconContainer>
    <SocialIconContainer
      target="_blank"
      rel="noopener"
      data-a11y="false"
      aria-label="Link to LinkedIn"
      href={settings.urls.linkedin}
    >
      <SocialIcons.LinkedInIcon fill={fill} />
    </SocialIconContainer>
  </Fragment>
);

export default SocialLinks;

const SocialIconContainer = styled.a`
  position: relative;
  margin-left: 3.2rem;
  text-decoration: none;

  &:first-child {
    margin-left: 0;
  }

  &:last-child {
    margin-right: 0;
  }

  &[data-a11y='true']:focus::after {
    content: '';
    position: absolute;
    left: -50%;
    top: -10%;
    width: 200%;
    height: 120%;
    border: 2px solid ${(p) => p.theme.colors.purple};
    background: rgba(255, 255, 255, 0.01);
    border-radius: 5px;
  }

  ${media.tablet`
    margin: 0 2.2rem;
  `};
`;
