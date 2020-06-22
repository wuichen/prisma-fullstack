import React from 'react';

import { useNode } from '@craftjs/core';

export const Button = ({ size, variant, color, text }) => {
  const {
    connectors: { connect, drag },
  } = useNode();
  return (
    <button>
      {text}-{size}-{variant}-{color}
    </button>
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

Button.craft = {
  props: ButtonDefaultProps,
  related: {
    settings: ButtonSettings,
  },
};
