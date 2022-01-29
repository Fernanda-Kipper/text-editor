import { ChangeEvent, useRef, KeyboardEventHandler } from "react";
import styled from "styled-components";
import { LinesMaxLength } from "../constants/lines";
import { useEditorContext } from "../hooks/useEditorContext";
import { Line } from "../types/line";
import { When } from "./when";
import { AiOutlineDelete } from "react-icons/ai"

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
  position: relative;

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
  const { updateLineBlockValue, updateIsEditingByUUID, deleteLineBlockByUUID, addBrotherLineBlock } = useEditorContext()
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const increaseTextareaSize = () => {
    if(!textareaRef.current) return

    textareaRef.current.style.height = INITIAL_HEIGHT + 'px'
    textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px'
  }

  const onTextareaChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    increaseTextareaSize()
    updateLineBlockValue(line, event?.target?.value)
  }

  const handleEnter = (event: KeyboardEvent) => {
    if(event.code !== 'Enter') return
    addBrotherLineBlock()
  }

  const handleEditMode = () => updateIsEditingByUUID(line.uuid)
  const handleDelete = () => deleteLineBlockByUUID(line.uuid)

  return(
    <StyledLine isEditing={line.isEditing}>
      <AiOutlineDelete onClick={handleDelete} id="delete-btn"/>
      <div className="line-control"></div>
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