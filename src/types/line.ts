export type Line = {
  text: string;
  type: 'h1' | 'h2' | 'h3' | 't' | 'b' | 'i' | 'code' | 'table' | 'list-enum' | 'list-bullet'
  isEditing: boolean
}