import { createGlobalStyle } from 'styled-components'
import { theme } from './theme'

/**
 * injectGlobal is technically an escape hatch provided by styled-components
 * that will enforce global cascading style rules which is against the whole
 * styled-components theory. This is where we define fronts, global resets,
 * and the very base styles.
 */
export const GlobalStyles = createGlobalStyle`
    /**
   * Thanks to Benjamin De Cock
   * https://gist.github.com/bendc/ac03faac0bf2aee25b49e5fd260a727d
   */
  :root {
    --ease-in-quad: cubic-bezier(.55, .085, .68, .53);
    --ease-in-cubic: cubic-bezier(.550, .055, .675, .19);
    --ease-in-quart: cubic-bezier(.895, .03, .685, .22);
    --ease-in-quint: cubic-bezier(.755, .05, .855, .06);
    --ease-in-expo: cubic-bezier(.95, .05, .795, .035);
    --ease-in-circ: cubic-bezier(.6, .04, .98, .335);

    --ease-out-quad: cubic-bezier(.25, .46, .45, .94);
    --ease-out-cubic: cubic-bezier(.215, .61, .355, 1);
    --ease-out-quart: cubic-bezier(.165, .84, .44, 1);
    --ease-out-quint: cubic-bezier(.23, 1, .32, 1);
    --ease-out-expo: cubic-bezier(.19, 1, .22, 1);
    --ease-out-circ: cubic-bezier(.075, .82, .165, 1);

    --ease-in-out-quad: cubic-bezier(.455, .03, .515, .955);
    --ease-in-out-cubic: cubic-bezier(.645, .045, .355, 1);
    --ease-in-out-quart: cubic-bezier(.77, 0, .175, 1);
    --ease-in-out-quint: cubic-bezier(.86, 0, .07, 1);
    --ease-in-out-expo: cubic-bezier(1, 0, 0, 1);
    --ease-in-out-circ: cubic-bezier(.785, .135, .15, .86);

    --ease-in-out-back: cubic-bezier(0.68, -0.55, 0.265, 1.55);
    --ease-out-back: cubic-bezier(0.175, 0.885, 0.32, 1.275);
    --ease-in-back: cubic-bezier(0.6, -0.28, 0.735, 0.045);
  }

  @font-face {
    font-family: '-apple-system',
    'BlinkMacSystemFont',
	  'San Francisco',
	  'Helvetica Neue',
    'Helvetica',
    'Ubuntu',
    'Roboto',
    'Noto',
    'Segoe UI',
    'Arial',
    sans-serif;
    font-weight: 400;
    font-style: normal;
  }

  *,
  *:before,
  *:after {
    box-sizing: inherit;
    margin: 0;
    padding: 0;
    font-size: inherit;
    -webkit-tap-highlight-color:  rgba(255, 255, 255, 0); 
  }

  :root {
    -ms-overflow-style: -ms-autohiding-scrollbar;
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
    cursor: default;
    font-size: 0.625rem;
    line-height: 1.4;
  }

  body {
    font-family: 'futura-pt',
    '-apple-system',
    'BlinkMacSystemFont',
	  'San Francisco',
	  'Helvetica Neue',
    'Helvetica',
    'Ubuntu',
    'Roboto',
    'Noto',
    'Segoe UI',
    'Arial',
    sans-serif;
    font-size: 1.6rem;
    margin: 0;
    color: ${theme.colors.black};
    background: #08080B;
    font-weight: 400;
    height: 100%;
  }

  button,
  a {
    text-decoration: none;
    cursor: pointer;
  }

  a {
    color: ${theme.colors.black};
  }

  a:focus {
    outline: none;
  }

  p {
    color: ${theme.colors.black};
    font-size: 1.8rem;
  }
  
  [hidden] {
    display: none;
  }

  [unselectable] {
    user-select: none;
  }

  audio,
  canvas,
  iframe,
  img,
  svg,
  video {
    vertical-align: middle;
  }


  select {
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    border: none;
    background-color: transparent;
    width: 100%;

    &::-ms-expand {
      display: none;
    }

    option {
      color: #262626;
    }
}


  input, textarea, select, button {
    font-family: '-apple-system',
    'BlinkMacSystemFont',
	  'San Francisco',
	  'Helvetica Neue',
    'Helvetica',
    'Ubuntu',
    'Roboto',
    'Noto',
    'Segoe UI',
    'Arial',
    sans-serif;

    &:-webkit-autofill {
      box-shadow: 0 0 0 1000px white inset !important;
    }
  }

  .underline {
    text-decoration: underline;
  }

  button,
  input,
  select,
  textarea {
    color: inherit;
    font-family: inherit;
    font-style: inherit;
    font-weight: inherit;
  }

  code,
  kbd,
  pre,
  samp {
    font-family: monospace;
  }

  fieldset,
  button {
    appearance: none;
    border: none;
    outline: none;
    background: transparent;
  }

  table {
    border-collapse: separate;
    border-spacing: 0;
  }

  audio:not([controls]) {
    display: none; 
  }

  details {
    display: block; 
  }

  input {
    color: $text-color;

    &:focus,
    &:active {
      outline: none;
    }

    &::-webkit-input-placeholder,
    &:-moz-placeholder,
    &::-moz-placeholder,
    &:-ms-input-placeholder, 
    &::-webkit-input-placeholder {
      color: rgba(0, 0, 0, 0.25);
    }

    &[type="number"] {
      width: auto;
    }

    &[type="search"] {
      -webkit-appearance: textfield;

      &::-webkit-search-cancel-button,
      &::-webkit-search-decoration {
        -webkit-appearance: none;
      }
    }
  }

  @media screen and (max-width: 768px) {
    .hide-on-mobile {
      visibility: hidden;
    }
  }























.screen {
  width: 100%;
  height: 100%;
}

.container {
  max-width: 990px;
  flex: 1 1 100%;
}


.date {
  color: var(--secondary);
  font-size: 14px;
  text-transform: uppercase;
}

header {
  border-bottom: 1px solid var(--divider);
  position: relative;
}

.avatar {
  background: var(--divider);
  border-radius: 50%;
  position: absolute;
  bottom: 12px;
  right: 0;
  overflow: hidden;
}

.avatar,
.avatar img {
  width: 40px;
  height: 40px;
}



.card-list {
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
}

.card {
  position: relative;
  padding: 25px;
  height: 470px;
  width: 390px;
  position: fixed;
  top: 0;
  left: 0;
  padding: 0;
  top: 0;
  display: flex;
  background: #000;

}

.card:nth-child(4n + 1),
.card:nth-child(4n + 4) {
  flex: 0 0 60%;
  max-width: 60%;
}

.card:nth-child(odd) {
  padding-left: 0;
}

.card:nth-child(even) {
  padding-right: 0;
}

.card-content-container {
  width: 100%;
  height: 100%;
  position: relative;
  display: block;
}

.card-content-container.open {
  top: 0;
  left: 0;
  right: 0;
  position: fixed;
  z-index: 1;
  overflow: hidden;
  padding: 40px 0;
  display: flex;
    align-items: center;
}

.card-content {
  position: relative;
  background: #000;
  overflow: hidden;
  width: 100%;
  height: 100%;
  margin: 0 auto;

}

.open .card-content {
  height: auto;
  max-width: 1140px;
  max-height: 630px;
  overflow: hidden;

}

.card-open-link {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.card-image-container {
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
  height: 420px;
  width: 100vw;
  transform: translateZ(0);
}

.title-container {
  position: absolute;
  top: 0;
  left: 0;
  max-width: 300px;
}



.category {
  color: #fff;
  font-size: 14px;
  text-transform: uppercase;
}

.overlay {
  z-index: 1;
  position: fixed;
  background: rgba(0, 0, 0, 0.8);
  top: 0;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 990px;
}

.overlay a {
  display: block;
  position: fixed;
  top: 0;
  bottom: 0;
  width: 100vw;
  left: 50%;

  transform: translateX(-50%);
}

.content-container {
  padding: 460px 35px 35px 35px;
  max-width: 700px;
  width: 90vw;
}



@media only screen and (max-width: 800px) {
  .card {
    flex: 0 0 50%;
    max-width: 50%;
  }

  .card:nth-child(4n + 1),
  .card:nth-child(4n + 4) {
    flex: 0 0 50%;
    max-width: 50%;
  }
}

@media only screen and (max-width: 600px) {
  .card {
    flex: 1 0 100%;
    max-width: 100%;
    padding-left: 0;
    padding-right: 0;
  }

  .card:nth-child(4n + 1),
  .card:nth-child(4n + 4) {
    flex: 1 0 100%;
    max-width: 100%;
  }

  .card-content-container.open {
    padding: 0;
  }
}

`
