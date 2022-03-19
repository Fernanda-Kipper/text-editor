import styled from 'styled-components';

import { File } from '../types/file';
import { RiHeart2Line, RiHeart2Fill } from 'react-icons/ri'

interface Props {
    file: Omit<File, 'body'>
}

const Container = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;

    background-color: var(--medium-gray);
`

export function FileItem({ file }: Props){
    return(
        <Container>
            <div>
                <p>{file.title}</p>
                <span>last update:{file.lastUpdated}</span>
            </div>
            <div>
                <RiHeart2Line/>
            </div>
        </Container>
    )
}