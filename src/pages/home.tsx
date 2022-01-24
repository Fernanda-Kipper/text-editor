import styled from 'styled-components';
import { useNavigate } from 'react-router'
import { HiHashtag, HiArrowNarrowRight } from "react-icons/hi";

import { PageWrapper } from "../components/page-wrapper";
import { PrimaryButton } from '../components/primary-button';

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  div {
    display: flex;
    align-items: center;
    justify-content: center;
    
    h1 {
    color: white;
    font-size: 48px;
    font-family: 'Roboto Mono', sans-serif;
    margin-left: 8px;
  }

    svg {
      color: white;
      font-size: 48px;
    }
  }

  p {
    color: var(--secondary-gray);
    font-size: 24px;
    font-weight: normal;
  }
`

export function Home(){
  const push = useNavigate();

  const goToHome = () => {
    push('/editor')
  }

  return(
    <PageWrapper justify="space-around">
      <LogoWrapper>
        <div>
          <HiHashtag/>
          <h1>ReadmeEditor</h1>
        </div>
        <p>Create amazing READMES for your repositories</p>
      </LogoWrapper>
      <PrimaryButton onClick={goToHome}>
        start
        <HiArrowNarrowRight/>
      </PrimaryButton>
    </PageWrapper>
  )
}