import styled from 'styled-components'

export const PrimaryButton = styled.button`
  color: var(--primary-gray);
  background-color: white;
  border-radius: 8px;
  font-size: 24px;

  font-family: 'Roboto Mono';

  padding: 12px 24px;
  border: 0;

  min-width: 240px;

  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: space-around;

  gap: 8px;

  transition-timing-function: linear;
  transition-duration: 200ms;

  &:hover{
    opacity: 0.9;
    background: var(--purple);
    color: white;
  }
`