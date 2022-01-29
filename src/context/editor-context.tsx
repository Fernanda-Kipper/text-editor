import { createContext, ReactNode, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { LinesPrefixe, LinesSufixe } from "../constants/lines";

import { BlockTypes, Line } from "../types/line";

type EditorContextType = {
  exportFile(): void
  content: Line[]
  setContent(value: Line[]): void
  updateLineBlockValue(oldLine: Line, newValue: string): void
  updateIsEditingByUUID(uuid: string): void
  deleteLineBlockByUUID(uuid: string): void
  addEmptyIsEditingLine(type: BlockTypes): void
  addBrotherLineBlock(): void
}

interface Props {
  children: ReactNode
}

export const EditorContext = createContext({} as EditorContextType)

const defaultText = { isEditing: true, content: '# Type your text here', type: BlockTypes.h1, uuid: uuidv4() }

export function EditorContextProvider({ children }: Props){
  const [content, setContent] = useState<Line[]>([defaultText])

  const updateLineBlockValue = (currentLine: Line, newValue: string) => {
    const newContent = content.map(line => {
      if(line.uuid !== currentLine.uuid) return line
      return { ...line, content: newValue }
    })

    setContent(newContent)
  }

  const addLineBlock = (oldContent: Line[], newLine: Line) => {
    setContent([...oldContent, newLine])
  }

  const disableAllIsEditing = (content: Line[]) => {
    const allDisabled = content.map(line => ({ ...line, isEditing: false }))
    return allDisabled
  }

  const addEmptyIsEditingLine = (type: BlockTypes) => {
    const allDisabled = disableAllIsEditing(content)
    const newLineContent = LinesPrefixe[type] + LinesSufixe[type]
    const newLine = { type, content: newLineContent, isEditing: true, uuid: uuidv4() }

    addLineBlock(allDisabled, newLine)
  }

  const addBrotherLineBlock = () => {
    const lastLineBlock = content[content.length -1]
    const newLineContent = LinesPrefixe[lastLineBlock.type] + LinesSufixe[lastLineBlock.type]
    const allDisabled = disableAllIsEditing(content)

    addLineBlock(allDisabled, { ...lastLineBlock, content: newLineContent, uuid: uuidv4() })    
  } 

  const updateIsEditingByUUID = (uuid: string) => {
    const newContent = content.map(line => {
      if(line.uuid === uuid) return {...line, isEditing: true }
      return {...line, isEditing: false }
    })

    setContent(newContent)
  }

  const deleteLineBlockByUUID = (uuid: string) => {
    const newContent = content.filter(line => line.uuid !== uuid)
    setContent(newContent)
  }
  
  const exportFile = () => {}

  return(
    <EditorContext.Provider value={{
      exportFile, 
      content,
      setContent,
      updateLineBlockValue,
      updateIsEditingByUUID,
      deleteLineBlockByUUID,
      addEmptyIsEditingLine,
      addBrotherLineBlock}}
    >
      {children}
    </EditorContext.Provider>
  )
}