import styled from "styled-components";

import { AsideNav } from "../components/aside-nav";
import { FileItem } from "../components/file-item";
import { Loading } from "../components/loading";
import { PageWrapper } from "../components/page-wrapper";
import { When } from "../components/when";
import { useFiles } from "../hooks/useFiles";

const Content = styled.div` 
    padding: 48px 24px;
`

export function AllFilesPage(){
    const { data, isLoading } = useFiles();

    return(
        <PageWrapper>
            <AsideNav />
            <When expr={isLoading}>
                <Loading />
            </When>
            <When expr={!isLoading}>
                <Content>
                    {data?.files?.map(file => <FileItem file={file}/>)} 
                </Content>
            </When>
        </PageWrapper>
    )
}