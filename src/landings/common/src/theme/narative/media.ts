import { css } from 'styled-components'

import theme from './theme'

/**
 * All breakpoints can be found inside of theme.breakpoints.
 * Each is turned in to a min + 1 and max-width version.
 *
 * There are also break points to cover coarse and fine pointer devices
 *
 * @example
 *
 *    ${media.phone` width: 100px; `};
 *    ${media.tablet_up` width: 200px; `};
 */

const media: Imedia = theme.breakpoints.reduce(
  (acc, [label, size], i) => ({
    ...acc,
    // max-width media query e.g. media.desktop
    [label]: (...args: TemplateStringsArray[]) => css`
      @media (max-width: ${size}px) {
        ${css(...args)};
      }
    `,
    // min-width media query e.g. media.desktop_up
    // This is the breakpoint prior's size +1
    [`${label}_up`]: (...args: TemplateStringsArray[]) => css`
      @media (min-width: ${theme.breakpoints[i - 1][1] + 1}px) {
        ${css(...args)};
      }
    `,
  }),
  {},
)

export default media
