import React from 'react';
import { Element, useEditor } from '@craftjs/core';
import { Container } from 'components/selectors/Container';
import { Text } from 'components/selectors/Text';
import { Video } from 'components/selectors/Video';
import { Button } from 'components/selectors/Button';

import SquareSvg from 'icons/craftjs/toolbox/rectangle.svg';
import TypeSvg from 'icons/craftjs/toolbox/text.svg';
import YoutubeSvg from 'icons/craftjs/toolbox/video-line.svg';
import ButtonSvg from 'icons/craftjs/toolbox/button.svg';
import { Img } from 'react-image';
import { InteriorBanner } from 'pages/design';
import styled from 'styled-components';

const ToolboxDiv = styled.div<{ enabled: boolean }>`
  transition: 0.4s cubic-bezier(0.19, 1, 0.22, 1);
  ${(props) => (!props.enabled ? `width: 0;` : '')}
  ${(props) => (!props.enabled ? `opacity: 0;` : '')}
`;

const Item = styled.div`
  svg {
    width: 22px;
    height: 22px;
    fill: #707070;
  }
`;

export const Toolbox = () => {
  const {
    enabled,
    connectors: { create },
  } = useEditor((state) => ({ enabled: state.options.enabled }));

  return (
    <ToolboxDiv
      enabled={enabled && enabled}
      className="toolbox transition w-12 border-r h-screen bg-white"
    >
      <div className="flex flex-col items-center pt-3">
        <div
          ref={(ref) =>
            create(
              ref,
              <Element
                canvas
                is={Container}
                background={{ r: 78, g: 78, b: 78, a: 1 }}
                color={{ r: 0, g: 0, b: 0, a: 1 }}
                height="300px"
                width="300px"
              ></Element>
            )
          }
        >
          <Item className="m-2 pb-2 cursor-pointer block">square</Item>
        </div>
        <div
          ref={(ref) =>
            create(ref, <Text fontSize="12" textAlign="left" text="Hi there" />)
          }
        >
          <Item className="m-2 pb-2 cursor-pointer block">text</Item>
        </div>
        <div ref={(ref) => create(ref, <InteriorBanner />)}>
          <Item className="m-2 pb-2 cursor-pointer block">button</Item>
        </div>
        <div ref={(ref) => create(ref, <Button />)}>
          <Item className="m-2 pb-2 cursor-pointer block">button</Item>
        </div>
        <div ref={(ref) => create(ref, <Video />)}>
          <Item className="m-2 pb-2 cursor-pointer block">youtube</Item>
        </div>
      </div>
    </ToolboxDiv>
  );
};
