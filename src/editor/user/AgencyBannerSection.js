import React from 'react';

import { useNode } from '@craftjs/core';
import { ThemeProvider } from 'styled-components';

import { agencyTheme } from 'landings/common/src/theme/agency';

import { ResetCSS } from 'landings/common/src/assets/css/style';

import {
  GlobalStyle,
  AgencyWrapper,
} from 'landings/containers/Agency/agency.style';
import BannerSection from 'landings/containers/Agency/BannerSection';

export const AgencyBannerSection = ({ size, variant, color, text }) => {
  const {
    connectors: { connect, drag },
  } = useNode();
  return (
    <ThemeProvider theme={agencyTheme}>
      <ResetCSS />

      <GlobalStyle />

      <AgencyWrapper>
        <BannerSection />
      </AgencyWrapper>
    </ThemeProvider>
  );
};

export const ButtonSettings = () => {
  const {
    actions: { setProp },
    props,
  } = useNode((node) => ({
    props: node.data.props,
  }));

  return (
    <div>
      <p>size</p>
      <button onClick={() => setProp((props) => (props.variant = 'small'))}>
        small
      </button>
      <button onClick={() => setProp((props) => (props.variant = 'medium'))}>
        medium
      </button>
      <button onClick={() => setProp((props) => (props.variant = 'large'))}>
        large
      </button>

      <p>variant</p>
      <button onClick={() => setProp((props) => (props.variant = 'small'))}>
        text
      </button>
      <button onClick={() => setProp((props) => (props.variant = 'medium'))}>
        outlined
      </button>
      <button onClick={() => setProp((props) => (props.variant = 'large'))}>
        contained
      </button>

      <p>color</p>
      <button onClick={() => setProp((props) => (props.variant = 'default'))}>
        default
      </button>
      <button onClick={() => setProp((props) => (props.variant = 'primary'))}>
        primary
      </button>
      <button onClick={() => setProp((props) => (props.variant = 'secondary'))}>
        secondary
      </button>
    </div>
  );
};

export const ButtonDefaultProps = {
  size: 'small',
  variant: 'contained',
  color: 'primary',
  text: 'Click me',
};

AgencyBannerSection.craft = {
  // props: ButtonDefaultProps,
  // related: {
  //   settings: ButtonSettings,
  // },
};
