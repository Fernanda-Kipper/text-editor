import styled from 'styled-components'

interface Props {
  justify?: string;
}

export const PageWrapper = styled.div<Props>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: ${props => props.justify ? props.justify : 'center'};
  position: relative;

  width: 100%;
  height: 100%;
  min-height: 100vh;

  background-color: var(--primary-gray);
`