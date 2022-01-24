import styled from "styled-components"

import { useEditor } from "../hooks/useEditor"

const EditorWrapper = styled.div`
  display: flex;
  flex-direction: column:
  height: 100%;
  flex: 1;
  align-items: flex-start;
  justify-content: flex-start;

  width: 100%;
  padding: 32px 0px;

  textarea {
    min-height: 90vh;
    width: 90%;
    margin: 0 auto;
    resize: none;
    font-size: 20px;
    color: white;
    background-color: transparent; 
    border: 0;

    font-weight: 500;

    &:focus {
      outline: none;
    }
  }
`

export function Editor(){
  const { content, setContent } = useEditor()

  return (
    <EditorWrapper>
      <textarea 
        autoFocus 
        value={content} 
        onChange={(event) => setContent(event.target.value)}
        placeholder="Type your text here"
      >
      </textarea>
    </EditorWrapper>
  )
}