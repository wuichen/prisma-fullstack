import React from 'react';
import { Container as OahContainer, Row, Col } from 'oah-ui';
import { Toolbox } from 'editor/Toolbox';
import { Container } from 'editor/user/Container';
import { Button } from 'editor/user/Button';
import { AgencyBannerSection } from 'editor/user/AgencyBannerSection';
import { InteriorBanner } from 'editor/user/InteriorBanner';

import { Card, CardBottom, CardTop } from 'editor/user/Card';
import { Text } from 'editor/user/Text';
import { SettingsPanel } from 'editor/SettingsPanel';
import { Editor, Frame, Element } from '@craftjs/core';
import { Topbar } from 'editor/Topbar';

export default function App() {
  return (
    <div style={{ margin: '0 auto', width: '800px' }}>
      <h1>Basic Page Editor</h1>
      <Editor
        resolver={{
          Card,
          Button,
          Text,
          Container,
          CardTop,
          CardBottom,
          AgencyBannerSection,
          InteriorBanner,
        }}
      >
        <Topbar />
        <div>
          <Frame>
            <Element canvas is={Container} padding={5} background="#eeeeee">
              <Card />
              <Button text="Click me" size="small" />
              <Text fontSize={20} text="Hi world!" />
              <Element canvas is={Container} padding={6} background="#999999">
                <Text size="small" text="It's me again!" />
              </Element>
            </Element>
          </Frame>
        </div>
        <div>
          <Toolbox />
          <SettingsPanel />
        </div>
      </Editor>
    </div>
  );
}
