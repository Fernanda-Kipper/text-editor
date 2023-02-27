import { useEffect } from "react"
import styled from "styled-components"

import { useEditorContext } from "../../hooks/useEditorContext"
import { useFile } from "../../hooks/useFile"
import { When } from "../when"
import { EditorHeader } from "./editor-header"
import { EditorPlayground } from "./editor-playground"
import { EditorPreview } from "./editor-preview"
import { toast } from 'react-toastify';

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
  const { setBody, setId, isPreviewMode } = useEditorContext()
  const { data, isError } = useFile(slug)

  useEffect(() => {
    if(!data?.body) return
    setBody(data.body)
  }, [data?.body, setBody])

  useEffect(() => {
    if(!data?.id) return
    setId(data.id)
  }, [slug, data?.id, setId])

  useEffect(() => {
    if(isError) toast.error("Erro ao carregar arquivo.")
  }, [isError])

  return (
    <EditorWrapper>
      <EditorHeader />
      <When expr={!isPreviewMode}>
        <EditorPlayground />
      </When>
      <When expr={isPreviewMode}>
        <EditorPreview />
      </When>
    </EditorWrapper>
  )
}