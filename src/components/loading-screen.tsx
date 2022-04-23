import styled from "styled-components"
import { Spinner } from "./spinner"

const Container = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(0,0,0,0.3);

    display: flex;
    align-items: center;
    justify-content: center;
`

export function LoadingScreen(){
   return(
       <Container>
           <Spinner/>
        </Container>
   )
}