import styled from "styled-components"
import { useEditorContext } from "../../hooks/useEditorContext"
import { Line } from "./line"

const LinesContainer = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 100%;
    justify-content: center;
    height: 100%;
    margin-top: 40px;
`

export function EditorPlayground(){
    const { body } = useEditorContext()
    return(
        <LinesContainer>
            {body?.map((line, index) => <Line key={index} id={index} line={line} /> )}
        </LinesContainer>
    )
}