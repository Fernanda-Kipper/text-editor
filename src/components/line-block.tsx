import { ChangeEvent, useRef, KeyboardEventHandler } from "react";
import styled from "styled-components";
import { LinesMaxLength } from "../constants/lines";
import { useEditorContext } from "../hooks/useEditorContext";
import { Line } from "../types/line";
import { When } from "./when";
import { AiOutlineDelete } from "react-icons/ai"

const INITIAL_LINE_HEIGHT = 28

interface Props {
  line: Line
}

const StyledLine = styled.div<{ isEditing: boolean}>`
  color: white;
  background-color: ${props => props.isEditing ? 'rgba(77, 88, 99, 0.2)' : 'transparent'}; 
  padding: 8px;
  height: auto;
  width: 80%;
  margin: 4px auto;
  border-radius: 8px;
  font-family: 'Roboto mono', sans-serif;
  position: relative;
  
  &:hover {
    background-color: ${props => props.isEditing ? 'rgba(77, 88, 99, 0.2)' : 'rgba(77, 88, 99, 0.05)'};
    cursor: ${props => props.isEditing ? 'inherit' :'pointer'}; 
  }

  .line-control {
    #delete-btn {
      position: absolute;
      top: 0;
      right: 0;
      display: ${props => props.isEditing ? 'block' : 'none'}; 
      color: rgba(77, 88, 99, 0.9);
      font-size: 20px;
      margin: 4px;
      cursor: pointer;
    }
  }

  textarea, input {
    height: ${INITIAL_LINE_HEIGHT}px;
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
  const { updateLineBlockValue, updateLineBlockEditByUUID, deleteLineBlockByUUID, duplicateLastLineBlock } = useEditorContext()
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const onTextareaChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    increaseTextareaHeight()
    updateLineBlockValue(line, event?.target?.value)
  }

  const increaseTextareaHeight = () => {
    if(!textareaRef.current) return

    textareaRef.current.style.height = INITIAL_LINE_HEIGHT + 'px'
    textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px'
  }

  const handleEnter = (event: KeyboardEvent) => {
    if(event.code !== 'Enter') return
    duplicateLastLineBlock()
  }

  const handleEditMode = () => updateLineBlockEditByUUID(line.uuid)
  const handleDelete = () => deleteLineBlockByUUID(line.uuid)

  return(
    <StyledLine isEditing={line.isEditing}>
      <div className="line-control">
        <AiOutlineDelete onClick={handleDelete} id="delete-btn"/>
      </div>
      <When expr={!LinesMaxLength[line.type]}>
        <textarea
          onClick={handleEditMode}
          autoFocus={line.isEditing} 
          ref={textareaRef} 
          onInput={onTextareaChange}
          onKeyPress={handleEnter as unknown as KeyboardEventHandler}
          value={line.content}
        />
      </When>
      <When expr={LinesMaxLength[line.type]}>
        <input
          onClick={handleEditMode}
          autoFocus={line.isEditing} 
          value={line.content} 
          onKeyPress={handleEnter as unknown as KeyboardEventHandler}
          onChange={(ev) => updateLineBlockValue(line, ev.target.value)}
        />
      </When>
    </StyledLine>
  )
}