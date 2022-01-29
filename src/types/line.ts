export enum BlockTypes { 
  'h1' = "H1",
  'h2' = "H2",
  'h3' = "H3",
  't' = "T",
  'b' = "B",
  'i' = "I",
  'code' = "CODE",
  'table' = "TABLE",
  'list-enum' = "LIST-ENUM",
  'list-bullet' = "LIST-BULLET",
  'link' = "LINK",
  'checkbox' = "CHECKBOX"
}

export type Line = {
  content: string;
  type: BlockTypes
  isEditing: boolean
  uuid: string
}