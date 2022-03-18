import { createContext, ReactNode, useState } from "react";
import { v4 as uuidv4 } from 'uuid';

import { LinesPrefixe, LinesSufixe } from "../constants/lines";
import { BlockTypes, Line } from "../types/line";

type EditorContextType = {
  
}

interface Props {
  children: ReactNode
}

export const EditorContext = createContext({} as EditorContextType)

export function EditorContextProvider({ children }: Props){
  
  return(
    <EditorContext.Provider value={{ }}
    >
      {children}
    </EditorContext.Provider>
  )
}