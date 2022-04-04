import styled from 'styled-components'

interface Props {
  justify?: string;
  align?: string;
}

export const PageWrapper = styled.div<Props>`
  position: relative;

  display: flex;
  flex-direction: row;
  align-items: ${props => props.align ? props.align : 'stretch'};
  justify-content: ${props => props.justify ? props.justify : 'flex-start'};

  width: 100%;
  height: 100%;
  min-height: 100vh;

  background-color: var(--primary-gray);
`