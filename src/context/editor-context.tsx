import { createContext, ReactNode, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { LinesPrefixe, LinesSufixe } from "../constants/lines";

import { BlockTypes, Line } from "../types/line";

type EditorContextType = {
  exportFile(): void
  editorContent: Line[]
  updateLineBlockValue(oldLine: Line, newValue: string): void
  updateLineBlockEditByUUID(uuid: string): void
  deleteLineBlockByUUID(uuid: string): void
  addEditingLineBlockByType(type: BlockTypes): void
  duplicateLastLineBlock(): void
}

interface Props {
  children: ReactNode
}

export const EditorContext = createContext({} as EditorContextType)

const defaultText = { isEditing: true, content: '# Type your text here', type: BlockTypes.h1, uuid: uuidv4() }

export function EditorContextProvider({ children }: Props){
  const [editorContent, setEditorContent] = useState<Line[]>([defaultText])

  const updateLineBlockValue = (currentLine: Line, newValue: string) => {
    const newContent = editorContent.map(line => {
      if(line.uuid !== currentLine.uuid) return line
      return { ...line, content: newValue }
    })

    setEditorContent(newContent)
  }

  const addLineBlock = (oldContent: Line[], newLine: Line) => {
    setEditorContent([...oldContent, newLine])
  }

  const disableAllIsEditing = (content: Line[]) => {
    const allDisabled = content.map(line => ({ ...line, isEditing: false }))
    return allDisabled
  }

  const addEditingLineBlockByType = (type: BlockTypes) => {
    const allDisabled = disableAllIsEditing(editorContent)
    const newLineContent = LinesPrefixe[type] + LinesSufixe[type]
    const newLine = { type, content: newLineContent, isEditing: true, uuid: uuidv4() }

    addLineBlock(allDisabled, newLine)
  }

  const duplicateLastLineBlock = () => {
    const lastLineBlock = editorContent[editorContent.length -1]
    const newLineContent = LinesPrefixe[lastLineBlock.type] + LinesSufixe[lastLineBlock.type]
    const allDisabled = disableAllIsEditing(editorContent)

    addLineBlock(allDisabled, { ...lastLineBlock, content: newLineContent, uuid: uuidv4() })    
  } 

  const updateLineBlockEditByUUID = (uuid: string) => {
    const newContent = editorContent.map(line => {
      if(line.uuid === uuid) return {...line, isEditing: true }
      return {...line, isEditing: false }
    })

    setEditorContent(newContent)
  }

  const deleteLineBlockByUUID = (uuid: string) => {
    const newContent = editorContent.filter(line => line.uuid !== uuid)
    setEditorContent(newContent)
  }
  
  const exportFile = () => {}

  return(
    <EditorContext.Provider value={{
      exportFile, 
      editorContent,
      updateLineBlockValue,
      updateLineBlockEditByUUID,
      deleteLineBlockByUUID,
      addEditingLineBlockByType,
      duplicateLastLineBlock}}
    >
      {children}
    </EditorContext.Provider>
  )
}