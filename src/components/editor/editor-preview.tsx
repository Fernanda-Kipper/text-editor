import Markdown from 'markdown-to-jsx';
import styled from 'styled-components';

import { useEditorContext } from "../../hooks/useEditorContext"
import { EditorContainer } from './editor-container';


const PreviewContainer = styled.div`
    width: 80%;
    margin: 0 auto;

    display: flex;
    align-items: flex-start;
    flex-direction: column;
    justify-content: flex-start;
`

export function EditorPreview(){
    const { body } = useEditorContext()

    return(
        <EditorContainer>
            <PreviewContainer>
                <Markdown children={body ?? ""}></Markdown>
            </PreviewContainer>
        </EditorContainer>
    )
}