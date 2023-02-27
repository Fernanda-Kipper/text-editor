import { useEffect } from "react"
import styled from "styled-components"

import { useEditorContext } from "../../hooks/useEditorContext"
import { EditorContainer } from "./editor-container";

const LINE_HEIGHT = 24;

const EditorArea = styled.textarea`
    max-width: 80%;
    width: 100%;
    margin: 0 auto 24px auto;
    padding: 16px 24px;
    border: 0;

    line-height: ${LINE_HEIGHT}px;

    display: block;
    text-align: start;

    white-space: pre-wrap;
    overflow-wrap: break-word;

    cursor: text;

    color: var(--color-white);
    font-family: "Source Serif Pro", serif;
    font-size: 18px;

    resize: none;

    background-color: transparent;
    outline: none;

    transition: all 0.2 linear;
`

export function EditorPlayground(){
    const { body, setBody } = useEditorContext()

    useEffect(() => {
        const textareaElement = document.getElementById("textarea")
        if(textareaElement?.scrollHeight && textareaElement.scrollHeight > 0){
            textareaElement.style.height = "inherit";
            textareaElement.style.height = `${textareaElement.scrollHeight}px`;
        }
    }, [body])

    return(
        <EditorContainer>
            <EditorArea
                id="textarea"
                data-testid="textarea"
                value={body}
                autoFocus
                onInput={e => setBody(e.currentTarget.value ?? "")} 
            >
            </EditorArea>
        </EditorContainer>
    )
}