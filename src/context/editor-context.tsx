import { createContext, ReactNode, useEffect, useState } from "react";
import { useEditFile } from "../hooks/useFileEdit";

type EditorContextType = {
  id: string,
  title: string,
  body?: string,
  setId(id: string): void
  setTitle(title: string): void
  setBody(body: string): void
  saveFile(): void
  addLine(value: string): void
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
  const { updateBody } = useEditFile()

  const saveFile = () => {
    updateBody({ id, body: currentBody })
  }

  const addLine = () => {}

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
      addLine
    }}
    >
      {children}
    </EditorContext.Provider>
  )
}