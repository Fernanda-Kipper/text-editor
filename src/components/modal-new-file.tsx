import styled from "styled-components"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router"

import { useCreateFile } from "../hooks/useCreateFile"
import { generateSlug } from "../utils/generate-slug"
import { When } from "./when"
import { LoadingScreen } from "./loading-screen"

const ModalOverlay = styled.div`
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.3);

    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
`

const Modal = styled.div`
    background-color: var(--medium-gray);
    padding: 24px;
    border-radius: 16px;

    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 90%;

    div {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 90%;
        margin: 8px 0;
    }

    label {
        font-size: 20px;
        color: var(--color-white);
        margin: 16px 0;
    }

    input {
        background-color: transparent;
        border: 0;
        border-bottom: 1px solid white;
        width: 90%;
        margin-bottom: 24px;
        outline: none;
        cursor: pointer;

        color: rgba(255,255,255,0.8);
        font-size: 16px;
        font-family: 'Montserrat', sans-serif;
        line-height: 24px;
    }

    @media(min-width: 868px){
        width: 60%;
        max-width: 600px;

        div {
            width: 70%;
            max-width: 450px;
        }

        label {
            font-size: 24px;
        }

        input {
            width: 70%;
            max-width: 450px;
        }
    }
`

const Button = styled.button`
    text-align: center;
    padding: 16px 24px;
    font-size: 24px;

    border: 0;
    width: 45%;
    background-color: transparent;
    border-radius: 8px;

    cursor: pointer;

    &.filled {
        background-color: var(--primary-purple);
        color: var(--color-white);
    }

    &.bordered {
        color: var(--primary-purple);
        border: 1px solid var(--primary-purple);
    }

    &.disabled {
        opacity: 0.5;
    }

    &:hover {
        box-shadow: 5px 5px 5px rgba(0, 0, 0,0.1);
    }
`

interface Props {
    isOpen: boolean
    handleClose(): void
}

export function ModalNewFile(props: Props){
    const [title, setTitle] = useState('')
    const navigate = useNavigate()
    const { mutate, data, isLoading } = useCreateFile()

    const handleCreate = async () => {
        const lastUpdated = new Date().getTime()
        const slug = generateSlug(title, lastUpdated)
        mutate({ slug, title, lastUpdated, body: []})
    }

    useEffect(() => {
        if(!data?.slug) return
        setTitle('')
        props.handleClose()
        navigate(`/editor/${data.slug}`)
    }, [data])

    if(isLoading) return <LoadingScreen />

    return(
        <When expr={!!props.isOpen}>
            <ModalOverlay>
                <Modal>
                    <label htmlFor="title">Enter your file name:</label>
                    <input 
                        name="title"
                        type="text"
                        onChange={(event) => 
                        setTitle(event.target.value)}
                    />
                    <div>
                        <Button className="bordered" onClick={props.handleClose}>discard</Button>
                        <Button disabled={!title.length} className={`filled ${title.length ? '' : 'disabled'}`} onClick={handleCreate}>create</Button>
                    </div>
                </Modal>
            </ModalOverlay>
        </When>
    )
}