import { createContext, ReactNode, useEffect, useState } from "react";
import { useEditFile } from "../hooks/useFileEdit";

type EditorContextType = {
  id: string,
  title: string,
  body?: string[],
  setId(id: string): void
  setTitle(title: string): void
  setBody(body: string[]): void
  addLine(line: string): void
  updateLine(line: string, index: number): void
  saveFile(): void
}

interface Props {
  children: ReactNode
}

export const EditorContext = createContext({} as EditorContextType)

export function EditorContextProvider({ children }: Props){
  const [id, setId] = useState("")
  const [title, setTitle] = useState("")
  const [savedBody, setSavedBody] = useState<string[]>()
  const [currentBody, setCurrentBody] = useState<string[]>()
  const { updateBody } = useEditFile()

  const addLine = (line: string) => {
    setCurrentBody(prev => {
      if(prev) return [...prev, line]
      return [line]
    })
  }

  const updateLine = (newValue: string, id: number) => {
    const updatedBody = currentBody?.map((value, index) => {
      if(index === id) return newValue
      return value
    })
    setCurrentBody(updatedBody)
  }

  const saveFile = () => {
    updateBody({ id, body: currentBody })
  }

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
      addLine,
      setBody: setSavedBody,
      updateLine,
      saveFile
    }}
    >
      {children}
    </EditorContext.Provider>
  )
}