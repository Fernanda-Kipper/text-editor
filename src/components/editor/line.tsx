import { useEffect, useState } from "react"
import styled from "styled-components"

interface LineProps {
    line: string
    id: number
}

const LineContainer = styled.div`
    width: 80%;
    border-radius: 10px;
    margin: 0 auto 24px auto;
    padding: 16px 24px;
    border: 0;

    white-space: pre-line;
    word-break: break-word;

    cursor: pointer;

    color: var(--color-white);
    font-family: "Source Serif Pro", serif;
    font-size: 20px;

    background-color: transparent;

    transition: all 0.2 linear;

    &:focus, &:hover {
        background: rgba(38, 39, 48, 0.5);
        outline: none;
    }
`

const LineHeading = styled.input`
    border: 0;

    width: 80%;
    border-radius: 10px;
    margin: 0 auto 24px auto;
    padding: 16px 24px;
    border: 0;

    white-space: pre-line;
    word-break: break-word;

    cursor: pointer;

    color: var(--color-white);
    font-family: "Source Serif Pro", serif;
    font-size: 20px;

    background-color: transparent;

    transition: all 0.2 linear;

    &:focus, &:hover {
        background: rgba(38, 39, 48, 0.5);
        outline: none;
    }
`

const LineBold = styled(LineContainer)`
    font-weight: bold;
`

const LineHeading1 = styled(LineHeading)`
    font-weight: bold;
    font-size: 32px;
`

const LineHeading2 = styled(LineHeading)`
    font-weight: bold;
    font-size: 28px;
`

const LineHeading3 = styled(LineHeading)`
    font-weight: bold;
    font-size: 24px;
`

const LineItalic = styled(LineContainer)`
    font-style: italic;
`

const LineUnderline = styled(LineContainer)`
    text-decoration: underline;
`

export function Line(props : LineProps){
    const updateLine  = (value: string, num: number) => {}
    
    const lineTypeAndValue = props.line.split(';')
    const [value, setValue] = useState(lineTypeAndValue.slice(1, lineTypeAndValue.length + 1).join(";"))
    const lineType = lineTypeAndValue[0]

    useEffect(() => {
        updateLine(`${lineType};${value}`, props.id)
    }, [value])

    useEffect(() => {
        if(value !== " ") return
        console.log({value, lineType})
        document.getElementById(`editable-${props.id}`)?.focus();
    }, [])

    switch (lineType) {
        case "#":
            return <LineHeading1 autoFocus maxLength={100} value={value }onChange={e => setValue(e.target.value)}/>
        case "##":
            return <LineHeading2 autoFocus maxLength={100} value={value }onChange={e => setValue(e.target.value)}/>
        case "###":
            return <LineHeading3 autoFocus maxLength={100} value={value }onChange={e => setValue(e.target.value)}/>
        case "**":
            return (
                <LineBold id={`editable-${props.id}`} suppressContentEditableWarning={true} contentEditable="true" onBlur={e => setValue(e.currentTarget.textContent ?? "")}>
                    {value}
                </LineBold>
            )
        case "*":
            return (
                <LineItalic id={`editable-${props.id}`} suppressContentEditableWarning={true} contentEditable="true" onBlur={e => setValue(e.currentTarget.textContent ?? "")}>
                    {value}
                </LineItalic>
            )
        case "_":
            return (
                <LineUnderline id={`editable-${props.id}`} suppressContentEditableWarning={true} contentEditable="true" onBlur={e => setValue(e.currentTarget.textContent ?? "")}>
                    {value}
                </LineUnderline>
            )
        default: 
        return (
            <LineContainer id={`editable-${props.id}`} suppressContentEditableWarning={true} contentEditable="true" onBlur={e => setValue(e.currentTarget.textContent ?? "")}>
                {value}
            </LineContainer>
        )
    }
}