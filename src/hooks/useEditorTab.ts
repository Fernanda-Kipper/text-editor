import { BlockTypes } from "../types/line"
import { useEditorContext } from "./useEditorContext"

export function useEditorTab() {
  const { addEditingLineBlockByType } = useEditorContext()

  return {
    addBold: () => addEditingLineBlockByType(BlockTypes.b),
    addCheckbox: () => addEditingLineBlockByType(BlockTypes.checkbox),
    addCode: () => addEditingLineBlockByType(BlockTypes.code),
    addHeading1: () => addEditingLineBlockByType(BlockTypes.h1),
    addHeading2: () => addEditingLineBlockByType(BlockTypes.h2),
    addHeading3: () => addEditingLineBlockByType(BlockTypes.h3),
    addItalic: () => addEditingLineBlockByType(BlockTypes.i),
    addLink: () => addEditingLineBlockByType(BlockTypes.link),
    addListBullet:() => addEditingLineBlockByType(BlockTypes["list-bullet"]),
    addListEnum: () => addEditingLineBlockByType(BlockTypes["list-enum"]),
    addText: () => addEditingLineBlockByType(BlockTypes.t),
    exportFile: () => {}
  }
}