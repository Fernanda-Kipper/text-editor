import styled from "styled-components";

export const RoundButton = styled.button`
    background-color: var(--primary-purple);
    color: var(--color-white);
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

    @media(min-width: 868px){
        &.expand {
            visibility: hidden;
        }
    }
`