import { useEffect, useState, RefObject } from 'react'
import { theme } from 'landings/common/src/theme/narative/theme'
import throttle from 'lodash/throttle'
import { useMotionValue, useInvertedScale } from 'framer-motion'
import { useDomEvent, MotionValue } from 'framer-motion'
import { spring } from 'popmotion'
import { mix } from '@popmotion/popcorn'
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock'
import { apiCall } from 'utils/api'
export { apiCall }

/**
 * Clamp a number between min and max
 *
 * @param {number} value The number you want clamped
 * @param {number} min
 * @param {number} max
 *
 * @example
 *    clamp(5, 1, 10) 5
 *    clamp(50, 1, 10) 10
 *    clamp(0.5, 1, 10) 1
 */
export const clamp = (value: number, min: number, max: number) =>
  value < min ? min : value > max ? max : value

/**
 * Create an array of numbers len elements long
 *
 * @param {number} start Start of you range
 * @param {number} len How many items of step 1 do you want in the range?
 * @param {number} step Defaults to incrementing every 1
 *
 * @example
 *    range(1, 5) [1, 2, 3, 4, 5]
 *    range(3, 5) [3, 4, 5, 6, 7]
 *    range(1, 5, 0.1) [1, 1.1, 1.2, 1.3, 1.4]
 */
export const range = (start: number, len: number, step: number = 1) =>
  len
    ? new Array(len)
      .fill(undefined)
      .map((_, i) => +(start + i * step).toFixed(4))
    : []

/**
 * Debounce a fn by a given number of ms
 *
 * @see {@link https://medium.com/@TCAS3/debounce-deep-dive-javascript-es6-e6f8d983b7a1}
 * @param {function} fn Function you want to debounce
 * @param {number} time Amount in ms to debounce. Defaults to 100ms
 * @returns {function} Your function debounced by given ms
 */
export const debounce = (fn: () => void, time = 100) => {
  let timeout: ReturnType<typeof setTimeout>

  return function () {
    const functionCall = () => fn.apply(this, arguments)

    clearTimeout(timeout)
    timeout = setTimeout(functionCall, time)
  }
}

/**
 * Extract from the theme a specific breakpoint size
 *
 * @param {string} name Name of the breakpoint we wish to retrieve
 *                      All options can be found in styles/theme
 *
 * @example
 *    getBreakpointFromTheme('tablet') 768
 */
export const getBreakpointFromTheme: (arg0: string) => number = (name) =>
  theme.breakpoints.find(([label, _]) => label === name)![1]

export const getWindowDimensions = (): { height: number; width: number } => {
  if (typeof window !== 'undefined') {
    const width =
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth

    const height =
      window.innerHeight ||
      document.documentElement.clientHeight ||
      document.body.clientHeight

    return {
      height,
      width,
    }
  }

  return {
    width: 0,
    height: 0,
  }
}

export function useResize() {
  const [dimensions, setDimensions] = useState({ width: 1280, height: 900 })

  useEffect(() => {
    setDimensions(getWindowDimensions())

    const handleResize = throttle(
      () => setDimensions(getWindowDimensions()),
      100,
    )

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return dimensions
}

/**
 * In some instances we want to render a reduced (static) version of a page, section,
 * or component in the browser. Because this is a static site and we don't have too much
 * control on the server we're using this to check on the client if we should serve
 * a reduced version.
 */
export function useReduced() {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const isFirefox = typeof InstallTrigger !== 'undefined'
    const motionPreference = window.matchMedia(
      '(prefers-reduced-motion: no-preference)',
    )
    const hasAPreferenceOnMotion = !motionPreference.matches

    if (isFirefox || hasAPreferenceOnMotion) {
      setReduced(true)
    }
  }, [])

  return reduced
}

/**
 * Enable or disable scrolling behavior. Particularly useful for mobile interactions
 * and toggling of different drawers.
 *
 * @param {string} action enable or disable
 *
 * @example
 *    scrollable('enable') Will allow the user to scroll again
 *    scrollable('disable') Will freeze the screen
 */
export const scrollable = (action: string) => {
  if (action.toLowerCase() === 'enable') {
    document.body.style.cssText = ''
  } else {
    document.body.style.overflow = 'hidden'
    document.body.style.height = '100%'
    document.body.style.position = 'relative'
  }
}

// If scrollable is not enough... you can use this lib
export const bodyScroll = (action: string, element?: HTMLElement) => {
  if (action.toLowerCase() === 'disable') {
    disableBodyScroll(element)
  } else {
    clearAllBodyScrollLocks()
  }
}

export function useScrollPosition() {
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const handleScroll = throttle(() => setOffset(window.pageYOffset), 16)
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return offset
}

/**
 * Used in componentDidMount to start an animation.
 * This avoids the annoying behaviour of triggering
 * and animation on mount but it not flowing correctly
 * due to fram timing.
 */
export function startAnimation(callback) {
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      callback()
    })
  })
}

/**
 * Returns the X and Y coordinates of a selected piece of Text.
 * This will always return the top left corner of the selection.
 */
export const getHighlightedTextPositioning = () => {
  let doc: any = window.document
  let sel = doc.selection
  let range
  let rects
  let rect: any = {}

  let x = 0
  let y = 0

  if (sel) {
    if (sel.type !== 'Control') {
      range = sel.createRange()
      range.collapse(true)
      x = range.boundingLeft
      y = range.boundingTop
    }
  } else if (window.getSelection) {
    sel = window.getSelection()
    if (sel.rangeCount) {
      range = sel.getRangeAt(0).cloneRange()

      if (range.getClientRects) {
        range.collapse(true)
        rects = range.getClientRects()

        if (rects.length > 0) {
          rect = rects[0]
        }

        x = rect.left
        y = rect.top
      }

      // Fall back to inserting a temporary element
      if (x === 0 && y === 0) {
        var span = doc.createElement('span')
        if (span.getClientRects) {
          // Ensure span has dimensions and position by
          // adding a zero-width space character
          span.appendChild(doc.createTextNode('\u200b'))
          range.insertNode(span)
          rect = span.getClientRects()[0]
          x = rect.left
          y = rect.top
          var spanParent = span.parentNode
          spanParent.removeChild(span)

          // Glue any broken text nodes back together
          spanParent.normalize()
        }
      }
    }
  }

  return { x, y }
}

export const getSelectionDimensions = () => {
  let doc: any = window.document
  let sel = doc.selection
  let range

  let width = 0
  let height = 0

  if (sel) {
    if (sel.type !== 'Control') {
      range = sel.createRange()
      width = range.boundingWidth
      height = range.boundingHeight
    }
  } else if (window.getSelection) {
    sel = window.getSelection()
    if (sel.rangeCount) {
      range = sel.getRangeAt(0).cloneRange()
      if (range.getBoundingClientRect) {
        var rect = range.getBoundingClientRect()
        width = rect.right - rect.left
        height = rect.bottom - rect.top
      }
    }
  }

  return { width, height }
}

export function getSelectionText() {
  let text = ''
  if (window.getSelection) {
    text = window.getSelection().toString()
  } else if (document.selection && document.selection.type != 'Control') {
    text = document.selection.createRange().text
  }
  return text
}

export function useActiveListItem(initial: number, list: any[]): number {
  const [active, setActive] = useState<number>(initial)
  const length: number = list.length

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      switch (event.key) {
        case 'ArrowUp':
          setActive((currentActive) => {
            if (currentActive === 0) return length - 1

            return currentActive - 1
          })
          break
        case 'ArrowDown':
          setActive((currentActive) => {
            if (currentActive === length - 1) return 0

            return currentActive + 1
          })
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [length])

  if (active >= length) {
    setActive(length - 1)
  }

  return active > 0 ? active : 0
}

export const animateByKeyframe = ({
  element,
  keyframes,
  progress,
  easing,
  delay,
  callback,
  action,
}: {
  element: HTMLElement
  keyframes: []
  progress: number
  delay?: number
  callback: () => {}
  easing?: string
  action?: string
}) => {
  const DURATION = 1000

  const options = {
    duration: DURATION,
    delay: delay || 0,
    fill: 'both',
    easing: easing || 'linear',
    direction: action === 'hide' ? 'reverse' : 'normal',
  }

  // @ts-ignore
  const animation = element.animate(keyframes, options)
  animation.currentTime = progress * DURATION
  animation.pause()

  if (DURATION === progress * DURATION) {
    animation.finish()
  }
  animation.addEventListener('finish', callback, { once: true })
}

/**
 * Avoid the stretch/squashing of border radius by using inverting them
 * throughout the component's layout transition.
 *
 * It would be possible to animate to/from different radius, for instance
 * in mobile mode from rounded to square for full-screen panels, by passing
 * the calculated inverted transform to `layoutTransition` when set as a function.
 *
 * Those inverted scales could be provided here to act as a `from` value,
 * then we can use Popcorn's `mix` function to get our
 *
 * @param radius
 */
export function useInvertedBorderRadius(radius: number) {
  const scaleX = useMotionValue(1)
  const scaleY = useMotionValue(1)
  const inverted = useInvertedScale({ scaleX, scaleY })
  const borderRadius = useMotionValue(`${radius}px`)

  useEffect(() => {
    function updateRadius() {
      const latestX = inverted.scaleX.get()
      const latestY = inverted.scaleY.get()
      const xRadius = latestX * radius + 'px'
      const yRadius = latestY * radius + 'px'

      borderRadius.set(`${xRadius} ${yRadius}`)
    }

    const unsubScaleX = inverted.scaleX.onChange(updateRadius)
    const unsubScaleY = inverted.scaleY.onChange(updateRadius)

    return () => {
      unsubScaleX()
      unsubScaleY()
    }
  }, [radius])

  return {
    scaleX,
    scaleY,
    borderTopLeftRadius: borderRadius,
    borderTopRightRadius: borderRadius,
    borderBottomLeftRadius: borderRadius,
    borderBottomRightRadius: borderRadius,
  }
}

interface Constraints {
  top: number
  bottom: number
}

/**
 * Calculate the top/bottom scroll constraints of a full-screen element vs the viewport
 */
export function useScrollConstraints(ref, measureConstraints: boolean) {
  const [constraints, setConstraints] = useState<Constraints>({
    top: 0,
    bottom: 0,
  })

  useEffect(() => {
    if (!measureConstraints) return

    const element = ref.current
    const viewportHeight = window.innerHeight
    const contentTop = element.offsetTop
    const contentHeight = element.offsetHeight
    const scrollableViewport = viewportHeight - contentTop * 2
    const top = Math.min(scrollableViewport - contentHeight, 0)

    setConstraints({ top, bottom: 0 })
  }, [measureConstraints])

  return constraints
}

interface Constraints {
  top: number
  bottom: number
}

// Absolute distance a wheel scroll event can travel outside of
// the defined constraints before we fire a "snap back" animation
const deltaThreshold = 5

// If wheel event fires beyond constraints, multiple the delta by this amount
const elasticFactor = 0.2

function springTo(value: MotionValue, from: number, to: number) {
  if (value.isAnimating()) return

  value.start((complete) => {
    const animation = spring({
      from,
      to,
      velocity: value.getVelocity(),
      stiffness: 400,
      damping: 40,
    }).start({
      update: (v: number) => value.set(v),
      complete,
    })

    return () => animation.stop()
  })
}

const debouncedSpringTo = debounce(springTo, 100)

/**
 * Re-implements wheel scroll for overlflow: hidden elements.
 *
 * Adds Apple Watch crown-style constraints, where the user
 * must continue to input wheel events of a certain delta at a certain
 * speed or the scrollable container will spring back to the nearest
 * constraint.
 *
 * Currently achieves this using event.deltaY and a debounce, which
 * feels pretty good during direct input but it'd be better to increase
 * the deltaY threshold during momentum scroll.
 *
 * TODOs before inclusion in Framer Motion:
 * - Detect momentum scroll and increase delta threshold before spring
 * - Remove padding hack
 * - Handle x-axis
 * - Perhaps handle arrow and space keyboard events?
 *
 * @param ref - Ref of the Element to attach listener to
 * @param y - MotionValue for the scrollable element - might be different to the Element
 * @param constraints - top/bottom scroll constraints in pixels.
 * @param isActive - `true` if this listener should fire.
 */
export function useWheelScroll(
  ref: RefObject<Element>,
  y: MotionValue<number>,
  constraints: Constraints | null,
  onWheelCallback: (e: WheelEvent) => void,
  isActive: boolean,
) {
  const onWheel = (event: WheelEvent) => {
    event.preventDefault()

    const currentY = y.get()
    let newY = currentY - event.deltaY
    let startedAnimation = false
    const isWithinBounds =
      constraints && newY >= constraints.top && newY <= constraints.bottom

    if (constraints && !isWithinBounds) {
      newY = mix(currentY, newY, elasticFactor)

      if (newY < constraints.top) {
        if (event.deltaY <= deltaThreshold) {
          springTo(y, newY, constraints.top)
          startedAnimation = true
        } else {
          debouncedSpringTo(y, newY, constraints.top)
        }
      }

      if (newY > constraints.bottom) {
        if (event.deltaY >= -deltaThreshold) {
          springTo(y, newY, constraints.bottom)
          startedAnimation = true
        } else {
          debouncedSpringTo(y, newY, constraints.bottom)
        }
      }
    }

    if (!startedAnimation) {
      y.stop()
      y.set(newY)
    }

    onWheelCallback(event)
  }

  useDomEvent(ref, 'wheel', isActive && onWheel, { passive: false })
}

export function getOffsetTop(element: any) {
  let offsetTop = 0
  while (element) {
    offsetTop += element.offsetTop
    element = element.offsetParent
  }
  return offsetTop
}
