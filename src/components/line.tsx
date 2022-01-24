import styled from "styled-components";
import { Line } from "../types/line";

interface Props {
  line: Line
}

const StyledLine = styled.div`
  color: white;
`

export function ContentLine({ line }: Props){
  return(
    <StyledLine>
      <p>
        {line.text}
      </p>
    </StyledLine>
  )
}