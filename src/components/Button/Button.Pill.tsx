import React from 'react'
import styled, { keyframes } from 'styled-components'

interface ButtonProps {
  text: string
  type?: string
  isSubmitting?: boolean
  onClick?: () => void
  mode?: 'light' | 'dark'
}

const ButtonPill = ({
  text,
  type,
  isSubmitting,
  onClick,
  mode = 'light',
}: ButtonProps) => (
  <StyledButton
    type={type || 'submit'}
    role="button"
    aria-label={text}
    onClick={onClick}
    mode={mode}
  >
    <span>{isSubmitting ? <Spinner /> : text}</span>
  </StyledButton>
)

export default ButtonPill

const StyledButton = styled.button<{ mode: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 360px;
  height: 50px;
  border: 1px solid
    ${(p) =>
      p.mode === 'dark' ? p.theme.colors.kepler : p.theme.colors.sirius};
  border-radius: 30px;
  background: ${(p) =>
    p.mode === 'dark' ? p.theme.colors.kepler : 'transparent'};
  color: ${(p) => p.theme.colors.sirius};
  font-weight: 600;
  font-size: 18px;
  transition: border-color 1s, background 0.2s ease;

  &:hover {
    background: ${(p) =>
      p.mode === 'dark' ? p.theme.colors.kepler : 'rgba(255,255,255,0.02)'};
  }
`

const blink = keyframes`
  0% { opacity: .2; }
  20% { opacity: 1; }
  100% { opacity: .2; }
`

const SpinnerContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  width: 20px;
  height: 20px;
`

const SpinnerDot = styled.span`
  position: relative;
  top: -13px;
  font-size: 5rem;
  line-height: 0;
  animation: ${blink} 1.4s infinite linear both;

  &:nth-child(2) {
    animation-delay: 0.2s;
  }

  &:nth-child(3) {
    animation-delay: 0.4s;
  }
`

export const Spinner = () => (
  <SpinnerContainer>
    <SpinnerDot>.</SpinnerDot>
    <SpinnerDot>.</SpinnerDot>
    <SpinnerDot>.</SpinnerDot>
  </SpinnerContainer>
)
