import React from 'react';
import { useEditor } from '@craftjs/core';
import { Card } from './user/Card';
import { Button } from './user/Button';
import { Text } from './user/Text';

export const Toolbox = () => {
  const { connectors } = useEditor();

  return (
    <div>
      <div>Drag to add</div>
      <div
        ref={(ref) =>
          connectors.create(ref, <Button text="Click me" size="small" />)
        }
      >
        Button
      </div>
      <div>Text</div>
      <div ref={(ref) => connectors.create(ref, <Card />)}>Card</div>
    </div>
  );
};
