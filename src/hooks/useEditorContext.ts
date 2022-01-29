import { useContext } from "react";
import { EditorContext } from "../context/editor-context";

export function useEditorContext(){
  return useContext(EditorContext)
}