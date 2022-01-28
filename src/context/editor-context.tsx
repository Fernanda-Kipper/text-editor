import { createContext, ReactNode, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { LinesPrefixe, LinesSufixe } from "../constants/lines";

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
  updateLineValue(oldLine: Line, newValue: string): void
  isPreviewMode: boolean
  updateIsEditingByUUID(uuid: string): void
}

interface Props {
  children: ReactNode
}

export const EditorContext = createContext({} as EditorContextType)

export function EditorContextProvider({ children }: Props){
  const [isPreviewMode, setIsPreviewMode] = useState(false)
  const [content, setContent] = useState<Line[]>([
    { isEditing: true, content: 'Type your text here', type: "h1", uuid: uuidv4() }
  ])

  const updateLineValue = (oldLine: Line, newValue: string) => {
    const newContent = content.map(line => {
      if(line.uuid !== oldLine.uuid) return line
      return { ...line, content: newValue }
    })

    setContent(newContent)
  }

  const addLine = (type: BlockTypes, lineContent: string) => {
    const allDisabled = content.map(line => ({ ...line, isEditing: false }))
    const newLineContent = LinesPrefixe[type] + lineContent + LinesSufixe[type]
    const newLine = { type, content: newLineContent, isEditing: true, uuid: uuidv4() }

    setContent([...allDisabled, newLine])
  }

  console.log(content)

  const updateIsEditingByUUID = (uuid: string) => {
    const newContent = content.map(line => {
      if(line.uuid === uuid) return {...line, isEditing: true }
      return {...line, isEditing: false }
    })

    setContent(newContent)
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
    addLine('b', 'bold')
  }

  const addItalic = () => {
    addLine('i', 'italic')
  }

  const addCode = () => {
    addLine('code', 'write your code here')
  }

  const addListEnum = () => {
    addLine('list-enum', '')
  }

  const addListBullet = () => {
    addLine('list-bullet', '')
  }

  const addLink = () => {
    addLine('link', '[Link Name](url)')
  }

  const addCheckbox = () => {
    addLine('checkbox', '')
  }
  
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
      handlePreview: () => setIsPreviewMode(!isPreviewMode),
      content,
      setContent,
      updateLineValue,
      isPreviewMode,
      updateIsEditingByUUID}}
    >
      {children}
    </EditorContext.Provider>
  )
}