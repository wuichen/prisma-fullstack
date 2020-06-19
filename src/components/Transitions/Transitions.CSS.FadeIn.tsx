import React from 'react'
import styled, { keyframes } from 'styled-components'

interface CSSFadeInProps {
  as?: string
  children: React.ReactChildren
}

function CSSFadeIn({ as, children }: CSSFadeInProps) {
  return <Transition as={as}>{children}</Transition>
}

export default CSSFadeIn

const fadein = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`

const Transition = styled.div`
  opacity: 0;
  animation: ${fadein} 0.6s linear forwards;
`
