import { createContext, ReactNode, useState } from "react";
import { v4 as uuidv4 } from 'uuid';

import { BlockTypes, Line } from "../types/line";

type EditorContextType = {
  addHeading1(): void
  addHeading2(): void
  addHeading3(): void
  addText(): void
  addBold(): void
  addItalic(): void
  addCode(): void
  addListEnum(): void
  addListBullet(): void
  addCheckbox(): void
  addLink(): void
  handlePreview(): void
  exportFile(): void
  content: Line[]
  setContent(value: Line[]): void
}

interface Props {
  children: ReactNode
}

export const EditorContext = createContext({} as EditorContextType)

export function EditorContextProvider({ children }: Props){
  const [content, setContent] = useState<Line[]>([
    { isEditing: true, content: 'Type your text here', type: "h1", uuid: uuidv4() }
  ])

  const addLine = (type: BlockTypes, lineContent: string) => {
    const allDisabled = content.map(line => ({ ...line, isEditing: false }))
    const newLine = { type, content: lineContent, isEditing: true, uuid: uuidv4() }

    setContent([...allDisabled, newLine])
  }

  const addHeading1 = () => {
    addLine('h1', '')
  }

  const addHeading2 = () => {
    addLine('h2', '')
  }

  const addHeading3 = () => {
    addLine('h3', '')
  }

  const addText = () => {
    addLine('t', '')
  }

  const addBold = () => {
    addLine('b', '')
  }

  const addItalic = () => {
    addLine('i', '')
  }

  const addCode = () => {
    addLine('code', '')
  }

  const addListEnum = () => {
    addLine('list-enum', '')
  }

  const addListBullet = () => {
    addLine('list-bullet', '')
  }

  const addLink = () => {
    addLine('link', '')
  }

  const addCheckbox = () => {
    addLine('checkbox', '')
  }
  
  const handlePreview = () => {}
  const exportFile = () => {}

  return(
    <EditorContext.Provider value={{
      addBold, 
      addCode, 
      addHeading1, 
      addHeading2, 
      addHeading3, 
      addItalic, 
      addText,
      addCheckbox,
      addLink,
      addListBullet,
      addListEnum,
      exportFile, 
      handlePreview,
      content,
      setContent}}
    >
      {children}
    </EditorContext.Provider>
  )
}