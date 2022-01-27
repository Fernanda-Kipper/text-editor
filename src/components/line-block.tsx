import { useRef } from "react";
import styled from "styled-components";
import { Line } from "../types/line";

const INITIAL_HEIGHT = 48

interface Props {
  line: Line
}

const StyledLine = styled.div<{ isEditing: boolean}>`
  color: white;
  background-color: ${props => props.isEditing ? 'rgba(77, 88, 99, 0.2)' : 'transparent'}; 
  padding: 8px;
  height: auto;
  width: 95%;
  margin: 0 auto;
  border-radius: 8px;

  textarea {
    height: ${INITIAL_HEIGHT}px;
    overflow-y: hidden;
    width: 100%;
    resize: none;
    font-size: 20px;
    color: white;
    border: 0;
    background: transparent;

    font-weight: 500;

    &:focus {
      outline: none;
    }
  }
`

export function LineBlock({ line }: Props){
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const onChange = () => {
    if(!textareaRef.current) return
    textareaRef.current.style.height = INITIAL_HEIGHT + 'px'
    textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px'
  }

  return(
    <StyledLine isEditing={line.isEditing}>
      <div className="line-control"></div>
      <textarea 
        autoFocus={line.isEditing} 
        ref={textareaRef} 
        onInput={onChange}
      >
        {'## ' + line.content}
      </textarea>
    </StyledLine>
  )
}