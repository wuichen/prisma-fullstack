import React from 'react';
import { useEditor, Element } from '@craftjs/core';
import { Container } from './user/Container';
import { Card } from './user/Card';
import { Button } from './user/Button';
import { Text } from './user/Text';
import { AgencyBannerSection } from './user/AgencyBannerSection';
import { InteriorBanner } from './user/InteriorBanner';

export const Toolbox = () => {
  const { connectors } = useEditor();

  return (
    <div>
      <p>Drag to add</p>
      <button
        ref={(ref) =>
          connectors.create(ref, <Button text="Click me" size="small" />)
        }
      >
        Button
      </button>
      <button
        ref={(ref) =>
          connectors.create(
            ref,
            <AgencyBannerSection text="Click me" size="small" />
          )
        }
      >
        AgencyBannerSection
      </button>
      <button
        ref={(ref) =>
          connectors.create(
            ref,
            <InteriorBanner text="Click me" size="small" />
          )
        }
      >
        InteriorBanner
      </button>
      <button ref={(ref) => connectors.create(ref, <Text text="Hi world" />)}>
        Text
      </button>
      <button
        ref={(ref) =>
          connectors.create(ref, <Element canvas is={Container} padding={20} />)
        }
      >
        Container
      </button>
      <button ref={(ref) => connectors.create(ref, <Card />)}>Card</button>
    </div>
  );
};
