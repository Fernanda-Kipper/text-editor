import { useLocation } from "react-router-dom";
import styled from "styled-components";

import { AsideNav } from "../components/aside-nav";
import { FileItem } from "../components/file-item";
import { Loading } from "../components/loading";
import { PageWrapper } from "../components/page-wrapper";
import { When } from "../components/when";
import { useFiles } from "../hooks/useFiles";

const Content = styled.div` 
    padding: 48px 24px;
    flex: 1;
`

export function FileListPage(){
    const { pathname } = useLocation()
    const { files, favorites, isLoading } = useFiles()

    const shouldShowOnlyFav = pathname.includes('favorites')

    if(isLoading) return (
        <PageWrapper align="center" justify="center">
            <Loading />
        </PageWrapper>
    )

    return(
        <PageWrapper>
            <AsideNav />
            <Content>
                <When expr={shouldShowOnlyFav}>
                    {favorites?.map(file => <FileItem key={file.id} file={file}/>)}
                </When>
                <When expr={!shouldShowOnlyFav}>
                    {files?.map(file => <FileItem key={file.id} file={file}/>)} 
                </When>
            </Content>
        </PageWrapper>
    )
}