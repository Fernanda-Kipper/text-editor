import { createContext, ReactNode, useState } from "react";

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
  content: string
  setContent(value: string): void
}

interface Props {
  children: ReactNode
}

export const EditorContext = createContext({} as EditorContextType)

export function EditorContextProvider({ children }: Props){
  const addHeading1 = () => {}
  const addHeading2 = () => {}
  const addHeading3 = () => {}
  const addText = () => {}
  const addBold = () => {}
  const addItalic = () => {}
  const addCode = () => {}
  const handlePreview = () => {}
  const exportFile = () => {}
  const addListEnum = () => {}
  const addListBullet = () => {}
  const addLink = () => {}
  const addCheckbox = () => {}

  const [content, setContent] = useState('')

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