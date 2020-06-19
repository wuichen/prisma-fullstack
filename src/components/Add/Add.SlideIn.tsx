import React, { useEffect, useContext } from 'react';
import styled from 'styled-components';
import Transition from 'react-transition-group/Transition';

import Hidden from 'components/Hidden';
import { AddContext } from 'components/Add/Add.Context';

import media from 'landings/common/src/theme/narative/media';
import { scrollable } from 'utils';
import { ExIcon } from '../../icons/ui';
import { themeGet } from '@styled-system/theme-get';

import { theme } from 'landings/common/src/theme/narative';
import { GlobalStyles } from 'landings/common/src/theme/narative/global';

import { DefaultTheme, ThemeProvider } from 'styled-components';

function AddSlideIn({ children }) {
  const { showAdd, toggleAdd } = useContext(AddContext);

  useEffect(() => {
    if (showAdd) {
      scrollable('disable');

      function handleEscKeyPress(event: KeyboardEvent) {
        if (event.key === 'Escape') {
          toggleAdd(event);
        }
      }

      window.addEventListener('keydown', handleEscKeyPress);

      return () => window.removeEventListener('keydown', handleEscKeyPress);
    } else {
      scrollable('enable');
    }
  }, [showAdd]);

  return (
    <ThemeProvider theme={theme}>
      <Frame
        tabIndex={showAdd ? 0 : -1}
        aria-hidden={!showAdd}
        showAdd={showAdd}
      >
        <Mask isActive={showAdd} onClick={toggleAdd} />
        <CloseContainer
          onClick={toggleAdd}
          animation={showAdd}
          data-a11y="false"
        >
          <ExIcon />
          <Hidden>Close Add Form</Hidden>
        </CloseContainer>
        <SlideIn in={showAdd}>
          {showAdd && <FormContainer>{children}</FormContainer>}
        </SlideIn>
      </Frame>
      <GlobalStyles />
    </ThemeProvider>
  );
}

export default AddSlideIn;

const defaultStyle = {
  transform: 'translateY(100vh)',
};

const transitionStyles = {
  entering: { opacity: 0, transform: 'translateY(100vh)' },
  entered: { opacity: 1, transform: 'translateY(40px)' },
  exiting: { opacity: 1, transform: 'translateY(40px)' },
  exited: { opacity: 1, transform: 'translateY(100vh)' },
};

const SlideIn = ({ in: inProp, children }) => (
  <Transition in={inProp} timeout={0}>
    {(state) => (
      <SlideInContainer
        style={{
          ...defaultStyle,
          ...transitionStyles[state],
        }}
      >
        {children}
      </SlideInContainer>
    )}
  </Transition>
);

const Frame = styled.div<{ showAdd: boolean }>`
  position: relative;
  z-index: 99999999;
  opacity: ${(p) => (p.showAdd ? 1 : 0)};
  transition: opacity 0;
  ${(p) => !p.showAdd && `transition-delay: 0.7s`}
`;

const Mask = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  margin: 0 auto;
  width: 100%;
  height: 100%;
  background: rgba(17, 18, 22, 0.2);
  pointer-events: ${(p) => (p.isActive ? 'initial' : 'none')};
  opacity: ${(p) => (p.isActive ? 1 : 0)};
  transition: opacity ${(p) => (p.isActive ? '0.7s' : '0')}
    ${(p) => (p.isActive ? '0.3s' : '')};
`;

const SlideInContainer = styled.div`
	width: 100%;
	height: calc(100vh - 40px);
	top: 0px;
	right: 0px;
	padding-top: 125px;
	z-index: 9;
	position: fixed;
	overflow-y: scroll;
	transition: transform 1s cubic-bezier(0.19, 1, 0.22, 1);
	will-change: transform;
	border-top-left-radius: 20px;
	border-top-right-radius: 20px;
	background: #fff;
	backface-visibility: hidden;
	filter: blur(0);

	// ${media.tablet`
  //   display: none;
  //   opacity: 0;
  //   visibility: hidden;
  // `};
`;

const FormContainer = styled.div`
  position: relative;
  width: 100%;
  margin: 0 auto;
  background: #fff;
  z-index: 99999;
`;

const CloseContainer = styled.button`
	position: fixed;
	z-index: 1000;
	right: 0;
	left: 0;
	margin: 0 auto;
	top: 24px;
	cursor: pointer;
	border-radius: 50%;
	height: 40px;
	width: 40px;
	background: #fff;
	display: flex;
	align-items: center;
	justify-content: center;

	opacity: ${(p) => (p.animation ? 1 : 0)};
	transform: translateY(${(p) => (p.animation ? '0' : '-120px')});
	transition: transform 0.7s cubic-bezier(0.215, 0.61, 0.355, 1)
			${(p) => (p.animation ? '0.2s' : '0s')},
		opacity 0s linear ${(p) => (p.animation ? '0s' : '1s')};

	// ${media.tablet`
  //   display: none;
  // `};

	&::after {
		content: '';
		position: absolute;
		height: 40px;
		width: 40px;
		top: 0;
		border-radius: 50%;
		transform: scale(0.8);
		transition: all 200ms ${themeGet('transitions.in')};
	}

	&:hover::after {
		background: rgba(0, 0, 0, 0.03);
		transform: scale(1);
	}

	&[data-a11y='true']:focus {
		border: 2px solid ${themeGet('colors.purple')};
	}
`;
