import styled from "styled-components"
import { GrBold, GrItalic, GrUnderline, GrList, GrOrderedList } from "react-icons/gr"
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp } from "react-icons/md"
import { useState } from "react";
import { When } from "./when";

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

    button {
        padding: 10px 4px;
        border-radius: 10px;
        border: 0;

        background: rgba(29, 30, 36, 0.5);
        color: white;

        cursor: pointer;
        
        transition: all 0.2s ease-in;

        svg {
            color: white;

            path { 
                stroke: white;
            }
        }

        &:hover{
            background: rgba(29, 30, 36, 0.8);
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
    padding: 10px 12px !important;

    display: flex;
    align-items: center;
    justify-content: center;

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
        background: rgba(29, 30, 36, 0.9);
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

    padding: 10px 12px !important;
    width: 100px;

    margin: 4px 0;

    animation: slide-in 0.25s ease-in-out both;

    font-size: 14px;
`

interface EditorHeaderProps {

}

export function EditorHeader(props : EditorHeaderProps){
    const [isTextOptionsOpen, setIsTextOptionsOpen] = useState(false);

    const handleOpen = () => {
        setIsTextOptionsOpen(prev => !prev);
    }

    return(
       <Header>
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
                <DropdownOption hidden={!isTextOptionsOpen}>Heading 1</DropdownOption>
                <DropdownOption hidden={!isTextOptionsOpen}>Heading 2</DropdownOption>
                <DropdownOption hidden={!isTextOptionsOpen}>Heading 3</DropdownOption>
           </Dropdown>
           <SmallButton>T</SmallButton>
           <SmallButton><GrBold size="24px"/></SmallButton>
           <SmallButton><GrItalic size="24px"/></SmallButton>
           <SmallButton><GrUnderline size="24px"/></SmallButton>
           <SmallButton><GrList size="24px"/></SmallButton>
           <SmallButton><GrOrderedList size="24px"/></SmallButton>
       </Header>
    )
}