import { useEffect, useState } from "react"
import styled from "styled-components"

import { useEditorContext } from "../../hooks/useEditorContext"

interface LineProps {
    line: string
    id: number
}

const LineContainer = styled.input`
    width: 80%;
    border-radius: 10px;
    margin: 0 auto 24px auto;
    padding: 16px 24px;
    border: 0;

    cursor: pointer;

    resize: none;
    height: auto;

    color: white;
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

const LineHeading1 = styled(LineContainer)`
    font-weight: bold;
    font-size: 32px;
`

const LineHeading2 = styled(LineContainer)`
    font-weight: bold;
    font-size: 28px;
`

const LineHeading3 = styled(LineContainer)`
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
    const { updateLine } = useEditorContext()
    
    const lineTypeAndValue = props.line.split(';')
    const [value, setValue] = useState(lineTypeAndValue.slice(1, lineTypeAndValue.length + 1).join(";"))
    const lineType = lineTypeAndValue[0]

    useEffect(() => {
        updateLine(`${lineType};${value}`, props.id)
    }, [value])

    switch (lineType) {
        case "#":
            return <LineHeading1 value={value} onChange={e => setValue(e.target.value)} type="textarea" autoFocus/>
        case "##":
            return <LineHeading2 value={value} onChange={e => setValue(e.target.value)} type="textarea" autoFocus/>
        case "###":
            return <LineHeading3 value={value} onChange={e => setValue(e.target.value)} type="textarea" autoFocus/>
        case "**":
            return <LineBold value={value} onChange={e => setValue(e.target.value)} type="textarea" autoFocus/>
        case "*":
            return <LineItalic value={value} onChange={e => setValue(e.target.value)} type="textarea" autoFocus/>
        case "_":
            return <LineUnderline value={value} onChange={e => setValue(e.target.value)} type="textarea" autoFocus/>
        default: 
            return <LineContainer value={value} onChange={e => setValue(e.target.value)} type="textarea" autoFocus/>
    }

}