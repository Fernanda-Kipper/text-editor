export type BlockTypes = 'h1' | 'h2' | 'h3' | 't' | 'b' | 'i' | 'code' | 'table' | 'list-enum' | 'list-bullet' | 'link' | 'checkbox'

export type Line = {
  content: string;
  type: BlockTypes
  isEditing: boolean
  uuid: string
}