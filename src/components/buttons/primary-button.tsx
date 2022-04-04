import styled from "styled-components";

export const PrimaryButton = styled.button<{color?: string}>`
    min-width: 152px;
    height: 50px;
    padding: 8px;

    background: var(--secondary-purple);
    border-radius: 8px;
    border: 0;

    cursor: pointer;

    font-family: "Montserrat", sans-serif;
    font-size: 18px;
    font-weight: 600;
    color: var(--color-white);

    display: flex;
    align-items: center;
    justify-content: space-evenly;

    transition: all 0.2s ease-in;

    path {
        stroke: ${(props) => props.color ?? "var(--color-white)"};
    }

    &:hover {
        background: var(--primary-purple)
    }
`