import { useLocation, useNavigate } from 'react-router'
import { RiInboxArchiveLine, RiHeart2Line, RiPencilFill } from 'react-icons/ri'
import styled from "styled-components"

const Aside = styled.aside`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    padding: 48px 0px;
    width: 20%;

    background-color: var(--secondary-background);
`

const Nav = styled.nav<{ isActive: boolean }>`
    font-family: Montserrat, sans-serif;
    font-weight: semi-bold;
    font-size: 24px;
    color: white;

    display: flex;
    align-items: center;
    justify-content: flex-start;

    svg {
        margin-right: 8px;
    }

    padding: 24px 42px;
    background-color: ${(props) => props.isActive ? 'var(--secondary-purple)' : 'transparent'};
    cursor: pointer;

    &:hover {
        background-color: ${(props) => !props.isActive ? 'rgba(119, 71, 255, 0.1)' : ''};
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

    &:hover {
        background-color: rgba(119, 71, 255, 0.6);
    }
`

export function AsideNav(){
    const { pathname } = useLocation()
    const navigate = useNavigate()

    const handleNewFile = () => {
        // post to API para criar novo arquivo
        const slug = 'fkjdfkj'
        navigate(`/editor/${slug}`)
    }

    return(
        <Aside>
            <Nav  onClick={() => navigate('/')} isActive={pathname === '/'}>
                <RiInboxArchiveLine />
                All files
            </Nav>
            <Nav onClick={() => navigate('/favorites')} isActive={pathname === '/favorites'}>
                <RiHeart2Line />
                Favorites
            </Nav>
            <Button onClick={handleNewFile}>
                +
            </Button>
        </Aside>
    )
}