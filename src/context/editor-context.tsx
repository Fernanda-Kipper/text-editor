import { createContext, ReactNode, useEffect, useState } from "react";
import { useEditFile } from "../hooks/useFileEdit";

export type EditorContextType = {
  id: string,
  title: string,
  body?: string,
  setId(id: string): void
  setTitle(title: string): void
  setBody(body: string): void
  saveFile(): void
  handlePreview(): void
  isPreviewMode: boolean,
  isErrorSavingFile: boolean
}

interface Props {
  children: ReactNode
}

export const EditorContext = createContext({} as EditorContextType)

export function EditorContextProvider({ children }: Props){
  const [id, setId] = useState("")
  const [title, setTitle] = useState("")
  const [savedBody, setSavedBody] = useState("")
  const [currentBody, setCurrentBody] = useState("")
  const [isPreviewMode, setIsPreviewMode] = useState(false)
  const { updateBody, isError } = useEditFile()

  const saveFile = () => {
    updateBody({ id, body: currentBody })
  }

  const handlePreview = () => setIsPreviewMode(prev => !prev)

  useEffect(() => {
    setCurrentBody(savedBody ?? [])
  }, [savedBody])
  
  return(
    <EditorContext.Provider value={{
      id, 
      setId, 
      title, 
      setTitle,
      body: currentBody,
      setBody: setSavedBody,
      saveFile,
      handlePreview,
      isPreviewMode,
      isErrorSavingFile: isError
    }}
    >
      {children}
    </EditorContext.Provider>
  )
}