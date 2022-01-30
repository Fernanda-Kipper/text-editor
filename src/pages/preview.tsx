import Markdown  from "markdown-to-jsx"
import styled from "styled-components"
import { EditorTab } from "../components/editor-tab"
import { PageWrapper } from "../components/page-wrapper"

import { useEditorContext } from "../hooks/useEditorContext"

const PreviewFile = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 8px;

  align-self: flex-start;
  justify-self: flex-start !important;
  padding: 32px;
  
  color: white;
  font-family: 'Roboto mono', sans-serif;

  code {
    background: rgba(0,0,0,0.3);
    color: white;
    padding: 8px;
    font-size: 14px;
    border-radius: 8px;
  }
  
`

export default function PreviewPage(){
  const { editorContent } = useEditorContext()
  return(
    <PageWrapper justify="flex-start">
      <EditorTab isPreview/>
      <PreviewFile>
        {editorContent.map(line => <Markdown >{line.content}</Markdown>)}
      </PreviewFile>
    </PageWrapper>
  )
}