import styled from "styled-components"

export const Spinner = styled.div`
    border-top: 2px solid var(--primary-purple);
    border-radius: 100%;
    height: 50px;
    width: 50px;

    @keyframes round {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }

    animation: round 0.5s infinite linear;
`