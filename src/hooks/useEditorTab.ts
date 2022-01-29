import { BlockTypes } from "../types/line"
import { useEditorContext } from "./useEditorContext"

export function useEditorTab() {
  const { addEmptyIsEditingLine } = useEditorContext()

  return {
    addBold: () => addEmptyIsEditingLine(BlockTypes.b),
    addCheckbox: () => addEmptyIsEditingLine(BlockTypes.checkbox),
    addCode: () => addEmptyIsEditingLine(BlockTypes.code),
    addHeading1: () => addEmptyIsEditingLine(BlockTypes.h1),
    addHeading2: () => addEmptyIsEditingLine(BlockTypes.h2),
    addHeading3: () => addEmptyIsEditingLine(BlockTypes.h3),
    addItalic: () => addEmptyIsEditingLine(BlockTypes.i),
    addLink: () => addEmptyIsEditingLine(BlockTypes.link),
    addListBullet:() => addEmptyIsEditingLine(BlockTypes["list-bullet"]),
    addListEnum: () => addEmptyIsEditingLine(BlockTypes["list-enum"]),
    addText: () => addEmptyIsEditingLine(BlockTypes.t),
    exportFile: () => {}
  }
}