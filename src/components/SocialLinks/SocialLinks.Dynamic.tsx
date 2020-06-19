import React from 'react';
import styled from 'styled-components';

import * as Social from '../../icons/social';
import media from 'landings/common/src/theme/narative/media';

interface SocialLinksProps {
  links: string[];
  fill?: string;
}

const icons = {
  dribbble: Social.DribbbleIcon,
  linkedin: Social.LinkedInIcon,
  twitter: Social.TwitterIcon,
  instagram: Social.InstagramIcon,
  github: Social.GithubIcon,
};

const getHostname = (url: string) => {
  return new URL(url.toLowerCase()).hostname.replace('www.', '').split('.')[0];
};

function SocialLinks({ links, fill = '#73737D' }: SocialLinksProps) {
  if (!links) return null;

  return (
    <>
      {links.map((url) => {
        const name = getHostname(url);
        const Icon = icons[name];

        if (!Icon) {
          throw new Error(`unsupported social link name=${name} / url=${url}`);
        }

        return (
          <SocialIconContainer
            key={url}
            target="_blank"
            rel="noopener"
            data-a11y="false"
            aria-label={`Link to ${url}`}
            href={url}
          >
            <Icon fill={fill} />
            <Hidden>Link to ${url}</Hidden>
          </SocialIconContainer>
        );
      })}
    </>
  );
}

export default SocialLinks;

const SocialIconContainer = styled.a`
  position: relative;
  margin-left: 3.2rem;
  text-decoration: none;
  max-width: 16px;

  &::after {
    content: '';
    position: absolute;
    width: 30px;
    height: 30px;
    top: -4px;
    left: -8px;
    cursor: pointer;
  }

  &:hover {
    svg {
      &:hover * {
        fill: ${(p) => p.theme.colors.primary};
      }
      * {
        transition: fill 0.25s var(--ease-in-out-quad);
      }
    }
  }

  &:first-of-type {
    margin-left: 0;
  }

  &:last-child {
    margin-right: 0;
  }

  &[data-a11y='true']:focus::after {
    content: '';
    position: absolute;
    left: -50%;
    top: -20%;
    width: 200%;
    height: 160%;
    border: 2px solid ${(p) => p.theme.colors.accent};
    background: rgba(255, 255, 255, 0.01);
    border-radius: 5px;
  }

  ${media.tablet`
    margin: 0 2.2rem;
  `};
`;

const Hidden = styled.span`
  width: 0px;
  height: 0px;
  visibility: hidden;
  opacity: 0;
  overflow: hidden;
  display: inline-block;
`;
