import { Editor } from "../components/editor";
import { EditorTab } from "../components/editor-tab";
import { PageWrapper } from "../components/page-wrapper";

export function EditorPage(){
  return(
    <PageWrapper>
      <EditorTab />
      <Editor />
    </PageWrapper>
  )
}