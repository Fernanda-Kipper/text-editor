import styled from 'styled-components';
import { useNavigate } from 'react-router';
import { IoTrashOutline } from 'react-icons/io5'
import { RiHeart2Line, RiHeart2Fill } from 'react-icons/ri'

import { File } from '../types/file';
import { When } from './when';
import { FormatDate } from '../utils/format-date';
import { useEditFile } from '../hooks/useFileEdit';
import { useEditorContext } from '../hooks/useEditorContext';
import { useFileDelete } from '../hooks/useFileDelete';
import { LoadingScreen } from './loading-screen';

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
    
    color: var(--color-white);
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
    const { setId, setTitle } = useEditorContext()
    const navigate = useNavigate()
    const { updateFavorite, isLoading: isLoadingFavorite } = useEditFile()
    const { deleteFile, isLoading: isLoadingDelete } = useFileDelete()

    const handleOpen = () => {
        setId(file.id)
        setTitle(file.title)
        navigate(`/editor/${file.slug}`)
    }

    const handleFavorite = () => {
        updateFavorite({...file, favorite: !file.favorite})
    }

    const handleDelete = () => {
        deleteFile(file.id)
    }

    const formattedLastUpdate = FormatDate(Number(file.lastUpdated))

    if(isLoadingDelete || isLoadingFavorite) return <LoadingScreen />

    return(
        <Container>
            <div onClick={handleOpen}>
                <p>{file.title}</p>
                <span>last update: {formattedLastUpdate}</span>
            </div>
            <div className="buttons">
                <When expr={file.favorite}>
                    <RiHeart2Fill fontSize="28px" onClick={handleFavorite}/>
                </When>
                <When expr={!file.favorite}>
                    <RiHeart2Line fontSize="28px" onClick={handleFavorite}/> 
                </When>
                <IoTrashOutline fontSize="28px" onClick={handleDelete}/>
            </div>
        </Container>
    )
}