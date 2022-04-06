import styled from "styled-components"
import { GrBold, GrItalic, GrUnderline, GrList, GrOrderedList, GrSave } from "react-icons/gr"
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp } from "react-icons/md"
import { useState } from "react";
import { When } from "../when";
import { useEditorContext } from "../../hooks/useEditorContext";
import { PrimaryButton } from "../buttons/primary-button";

const Header = styled.header`
    background-color: var(--secondary-background);
    padding: 14px 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 80%;
    border-radius: 10px;
    margin: 0 auto;
    height: 60px;

    position: relative;

    div {
        align-self: flex-start;
        display: flex;
        align-items: center;
        justify-content: center;

        button {
            padding: 10px 4px;
            border-radius: 10px;
            border: 0;

            margin-right: 12px;

            background: rgba(29, 30, 36, 0.5);
            color: var(--color-white);

            cursor: pointer;
            
            transition: all 0.2s ease-in;

            svg {
                color: var(--color-white);

                path { 
                    stroke: var(--color-white);
                }
            }

            &:hover{
                background: rgba(29, 30, 36, 0.8);
            }
        }
    }
`

const SmallButton = styled.button`
    width: 54px;
    height: 54px;
    box-sizing: border-box;

    font-size: 18px;
`

const LargeButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: space-between;

    height: 54px;
    padding: 8px 12px !important;

    min-width: 120px;

    p {
        font-size: 14px;
        margin-right: 8px;
    }
`

const Dropdown = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    position: absolute;
    top: 80px;
    left: 24px;

    button {
        background: rgba(29, 30, 36, 1);
    }
`

const DropdownOption = styled.button<{ hidden: boolean}>`
    @keyframes slide-in {
        0% {
            opacity: 0;
            transform: translateY(-50px);
        }
        100% {
            opacity: 1;
            transform: translateY(0px);
        }
    }

    display: ${props => props.hidden ? 'none' : 'flex'};
    align-items: center;
    justify-content: center;

    padding: 12px;
    width: 120px;

    margin: 4px 0;

    animation: slide-in 0.25s ease-in-out both;

    font-size: 14px;
`

export function EditorHeader(){
    const { saveFile, setBody, body, addLine } = useEditorContext()
    const [isTextOptionsOpen, setIsTextOptionsOpen] = useState(false)

    const handleOpen = () => {
        setIsTextOptionsOpen(prev => !prev)
    }

    const getSelectionText = () => {
        const element = document.getElementById("textarea") as HTMLTextAreaElement
        let startPos = element?.selectionStart;
        let endPos = element?.selectionEnd;
        let selectedText = element.value.substring(startPos, endPos);
        return { startPos, endPos, selectedText }
    }

    const addHeading1 = () => {
        handleOpen()
        const { startPos, selectedText } = getSelectionText()
        if(!selectedText) {
            return setBody(body + "\n#")
        }
        let bodyArray = body?.split("")
        const newLine = "\n# " + selectedText
        bodyArray?.splice(startPos, selectedText.length, newLine)
        setBody(bodyArray?.join("") ?? "")
    }

    const addHeading2 = () => {
        handleOpen()
        const { startPos, selectedText } = getSelectionText()
        if(!selectedText) {
            return setBody(body + "\n##")
        }
        let bodyArray = body?.split("")
        const newLine = "\n## " + selectedText
        bodyArray?.splice(startPos, selectedText.length, newLine)
        setBody(bodyArray?.join("") ?? "")
    }

    const addHeading3 = () => {
        handleOpen()
        const { startPos, selectedText } = getSelectionText()
        if(!selectedText) {
            return setBody(body + "\n###")
        }
        let bodyArray = body?.split("")
        const newLine = "\n### " + selectedText
        bodyArray?.splice(startPos, selectedText.length, newLine)
        setBody(bodyArray?.join("") ?? "")
    }

    const addBold = () => {
        const { startPos, selectedText } = getSelectionText()
        if(!selectedText) {
            return setBody(body + "** **")
        }
        let bodyArray = body?.split("")
        const newLine = "**" + selectedText + "**"
        bodyArray?.splice(startPos, selectedText.length, newLine)
        setBody(bodyArray?.join("") ?? "")
    }

    const addItalic = () => {
        const { startPos, selectedText } = getSelectionText()
        if(!selectedText) {
            return setBody(body + "* *")
        }
        let bodyArray = body?.split("")
        const newLine = "*" + selectedText + "*"
        bodyArray?.splice(startPos, selectedText.length, newLine)
        setBody(bodyArray?.join("") ?? "")
    }

    const addUnderline = () => {
        const { startPos, selectedText } = getSelectionText()
        if(!selectedText) {
            return setBody(body + "_ _")
        }
        let bodyArray = body?.split("")
        const newLine = "_" + selectedText + "_"
        bodyArray?.splice(startPos, selectedText.length, newLine)
        setBody(bodyArray?.join("") ?? "")
    }

    return(
       <Header>
           <div>
            <LargeButton onClick={handleOpen}>
                    <p>Heading</p>
                    <When expr={!isTextOptionsOpen}>
                            <MdOutlineKeyboardArrowDown size="16px" color="white"/>
                    </When>
                    <When expr={isTextOptionsOpen}>
                            <MdOutlineKeyboardArrowUp size="16px" color="white"/>
                    </When>
                </LargeButton>
            <Dropdown>
                    <DropdownOption onClick={addHeading1} hidden={!isTextOptionsOpen}>Heading 1</DropdownOption>
                    <DropdownOption onClick={addHeading2} hidden={!isTextOptionsOpen}>Heading 2</DropdownOption>
                    <DropdownOption onClick={addHeading3} hidden={!isTextOptionsOpen}>Heading 3</DropdownOption>
            </Dropdown>
            <SmallButton onClick={addBold}><GrBold size="24px"/></SmallButton>
            <SmallButton onClick={addItalic}><GrItalic size="24px"/></SmallButton>
            <SmallButton onClick={addUnderline}><GrUnderline size="24px"/></SmallButton>
            <SmallButton><GrList size="24px"/></SmallButton>
            <SmallButton><GrOrderedList size="24px"/></SmallButton>
           </div>
           <PrimaryButton onClick={saveFile}>
               salvar
               <GrSave color="#FFF"/>
           </PrimaryButton>
       </Header>
    )
}