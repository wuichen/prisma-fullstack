import React from 'react';
import { useNode } from '@craftjs/core';

export const Container = ({ background, padding, children }) => {
  const {
    connectors: { connect, drag },
  } = useNode();
  return (
    <div
      ref={(ref) => connect(drag(ref))}
      style={{ margin: '5px 0', background, padding: `${padding}px` }}
    >
      {children}
    </div>
  );
};

export const ContainerSettings = () => {
  const {
    background,
    padding,
    actions: { setProp },
  } = useNode((node) => ({
    background: node.data.props.background,
    padding: node.data.props.padding,
  }));

  return (
    <div>
      <p>Background</p>
      <button onClick={() => setProp((props) => (props.background = 'red'))}>
        red
      </button>

      <p>Padding</p>
      <input
        onChange={(e) => setProp((props) => (props.padding = e.target.value))}
        type="range"
        class="slider"
        id="myRange"
      />
    </div>
  );
};

export const ContainerDefaultProps = {
  background: '#ffffff',
  padding: 0,
};

Container.craft = {
  props: ContainerDefaultProps,
  related: {
    settings: ContainerSettings,
  },
};
