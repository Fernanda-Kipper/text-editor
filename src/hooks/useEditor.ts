import { useContext } from "react";
import { EditorContext } from "../context/editor-context";

export function useEditor(){
  return useContext(EditorContext)
}