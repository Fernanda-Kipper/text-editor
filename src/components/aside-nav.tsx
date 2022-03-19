import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { RiInboxArchiveLine, RiHeart2Line, RiArrowRightCircleLine } from 'react-icons/ri'
import styled from "styled-components"

const Aside = styled.aside`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;

    @media(min-width: 768px){
        background-color: var(--secondary-background);
        padding: 48px 0px;
        width: 20%;
        min-width: 320px;
    }

    &.expanded {
        background-color: var(--secondary-background);
        padding: 48px 0px;
        width: 100%;
    }
`

const Nav = styled.nav<{ isActive: boolean }>`
    font-family: Montserrat, sans-serif;
    font-weight: semi-bold;
    font-size: 24px;
    color: white;

    display: flex;
    align-items: center;
    justify-content: flex-start;

    visibility: hidden;

    svg {
        margin-right: 8px;
    }

    padding: 24px 42px;
    background-color: ${(props) => props.isActive ? 'var(--secondary-purple)' : 'transparent'};
    cursor: pointer;

    &:hover {
        background-color: ${(props) => !props.isActive ? 'rgba(119, 71, 255, 0.1)' : ''};
    }

    &.expanded {
        visibility: visible;
    }

    @media(min-width: 768px){
        visibility: visible;
    }
`

const Button = styled.button`
    background-color: var(--primary-purple);
    color: white;
    height: 48px;
    width: 48px;
    font-size: 24px;
    font-weight: semi-bold;
    border: 0;
    border-radius: 48px;
    cursor: pointer;

    position: absolute;
    bottom: 24px;
    left: 24px;

    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
        background-color: rgba(119, 71, 255, 0.6);
    }

    &.add {
        visibility: hidden;
    }

    @media(min-width: 768px){
        &.add {
            visibility: visible;
        }

        &.expand {
            visibility: hidden;
        }
    }
`

export function AsideNav(){
    const [isExpanded, setIsExpanded] = useState(false)
    const { pathname } = useLocation()
    const navigate = useNavigate()

    const handleNewFile = () => {
        // post to API para criar novo arquivo
        const slug = 'fkjdfkj'
        navigate(`/editor/${slug}`)
    }

    const handleNavigate = (path: string) => {
        setIsExpanded(false)
        navigate(path)
    }

    const handleExpand = () => {
        setIsExpanded(prev => !prev)
    }

    return(
        <Aside className={isExpanded ? 'expanded' : ''}>
            <Nav
                className={isExpanded ? 'expanded' : ''}
                onClick={() => handleNavigate('/')} 
                isActive={pathname === '/'}
            >
                <RiInboxArchiveLine />
                All files
            </Nav>
            <Nav
                className={isExpanded ? 'expanded' : ''}
                onClick={() => handleNavigate('/favorites')} 
                isActive={pathname === '/favorites'}
            >
                <RiHeart2Line />
                Favorites
            </Nav>
            <Button className="add" onClick={handleNewFile}>
                +
            </Button>
            <Button className="expand" onClick={handleExpand}>
                <RiArrowRightCircleLine />
            </Button>
        </Aside>
    )
}
