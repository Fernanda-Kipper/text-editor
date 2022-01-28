import { ChangeEvent, useRef, KeyboardEventHandler } from "react";
import styled from "styled-components";
import { LinesMaxLength } from "../constants/lines";
import { useEditor } from "../hooks/useEditor";
import { Line } from "../types/line";
import { When } from "./when";

const INITIAL_HEIGHT = 28

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
  font-family: 'Roboto mono', sans-serif;

  textarea, input{
    height: ${INITIAL_HEIGHT}px;
    overflow-y: hidden;
    width: 100%;
    resize: none;
    font-size: 18px;
    line-height: 24px;
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
  const { updateLineValue, addText, updateIsEditingByUUID } = useEditor()
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const increaseTextareaSize = () => {
    if(!textareaRef.current) return

    textareaRef.current.style.height = INITIAL_HEIGHT + 'px'
    textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px'
  }

  const onTextareaChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    increaseTextareaSize()
    updateLineValue(line, event?.target?.value)
  }

  const handleEnter = (event: KeyboardEvent) => {
    if(event.code !== 'Enter') return
    addText()
  }

  const handleEditMode = () => updateIsEditingByUUID(line.uuid)

  return(
    <StyledLine isEditing={line.isEditing} onClick={handleEditMode}>
      <div className="line-control"></div>
      <When expr={!LinesMaxLength[line.type]}>
        <textarea
          autoFocus={line.isEditing} 
          ref={textareaRef} 
          onInput={onTextareaChange}
          onKeyPress={handleEnter as unknown as KeyboardEventHandler}
        >
          {line.content}
        </textarea>
      </When>
      <When expr={LinesMaxLength[line.type]}>
        <input 
          autoFocus={line.isEditing} 
          value={line.content} 
          onKeyPress={handleEnter as unknown as KeyboardEventHandler}
          onChange={(ev) => updateLineValue(line, ev.target.value)}
        />
      </When>
    </StyledLine>
  )
}