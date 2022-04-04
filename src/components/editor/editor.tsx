import { useEffect } from "react"
import styled from "styled-components"

import { useEditorContext } from "../../hooks/useEditorContext"
import { useFile } from "../../hooks/useFile"
import { EditorHeader } from "./editor-header"
import { EditorPlayground } from "./editor-playground"

const EditorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  flex: 1;
  align-items: flex-start;
  justify-content: flex-start;

  width: 100%;
  padding: 32px 0px;
`

export function Editor(){
  const slug = window.location.pathname.split('/')[2]
  const { setBody, setId } = useEditorContext()
  const { data } = useFile(slug)

  useEffect(() => {
    if(!data?.body) return
    setBody(data.body)
  }, [data?.body, setBody])

  useEffect(() => {
    if(!data?.id) return
    setId(data.id)
  }, [slug, data?.id, setId])

  return (
    <EditorWrapper>
      <EditorHeader />
      <EditorPlayground />
    </EditorWrapper>
  )
}