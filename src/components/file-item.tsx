import styled from 'styled-components';
import { useNavigate } from 'react-router';
import { IoTrashOutline } from 'react-icons/io5'
import { RiHeart2Line, RiHeart2Fill } from 'react-icons/ri'

import { File } from '../types/file';
import { When } from './when';
import { FormatDate } from '../utils/format-date';

interface Props {
    file: Omit<File, 'body'>
}

const Container = styled.div`
    width: 95%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 16px;

    cursor: pointer;

    background-color: var(--medium-gray);

    margin-bottom: 24px;
    padding: 16px;
    
    color: white;
    font-family: 'Montserrat', sans-serif;

    &:hover {
        background-color: rgba(49, 56, 63, 0.8)
;
    }

    p { 
        margin: 0px;
        font-weight: 600;
        font-size: 16px;
        line-height: 30px;
    }

    span { 
        font-weight: 400;
    }

    .buttons {
        display: flex;
        align-items: center;
        justify-content: center;

        svg + svg {
            margin-left: 16px;
        }
    }
`

export function FileItem({ file }: Props){
    const navigate = useNavigate()

    const handleOpen = () => {
        navigate(`/editor/${file.slug}`)
    }

    const formattedLastUpdate = FormatDate(Number(file.lastUpdated))

    return(
        <Container onClick={handleOpen}>
            <div>
                <p>{file.title}</p>
                <span>last update: {formattedLastUpdate}</span>
            </div>
            <div className="buttons">
                <When expr={file.favorite}>
                    <RiHeart2Fill fontSize="28px"/>
                </When>
                <When expr={!file.favorite}>
                    <RiHeart2Line fontSize="28px"/> 
                </When>
                <IoTrashOutline fontSize="28px"/>
            </div>
        </Container>
    )
}