import { render, screen } from "@testing-library/react"
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";
import { FileListPage } from "../file-list";
import * as useFilesFile from "../../hooks/useFiles"
import { faker } from "@faker-js/faker"
import * as routerDom from "react-router";

import "@testing-library/jest-dom";

const mockUseFiles = jest.spyOn(useFilesFile, "useFiles");
const mockUseLocation = jest.spyOn(routerDom, "useLocation");

const renderComponent = () => {
    const queryClient = new QueryClient();
    render(
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <FileListPage/>
            </BrowserRouter>
        </QueryClientProvider>
    )
}

describe("FileList", () => {
    beforeEach(() => {
        mockUseLocation.mockReturnValue({
            pathname: "/",
            state: undefined,
            key: "",
            search: "",
            hash: ""
        });
    })

    it("should render all files", () => {
        const title = faker.name.jobTitle()
        mockUseFiles.mockReturnValue({
                files: [{
                    id: faker.datatype.uuid(),
                    title: title,
                    slug: faker.datatype.uuid(),
                    lastUpdated: faker.date.weekday(),
                    favorite: true
                }],
                favorites: [],
                isLoading: false,
                isError: false,
        })
        renderComponent();

        expect(screen.getByText(title)).toBeInTheDocument();
    })

    it("should render all favorites when pathname is favorites", () => {
        mockUseLocation.mockReturnValue({
            pathname: "/favorites",
            state: undefined,
            key: "",
            search: "",
            hash: ""
        });
        const title = faker.name.jobTitle();
        mockUseFiles.mockReturnValue({
                files: [],
                favorites: [
                    {
                        id: faker.datatype.uuid(),
                        title: title,
                        slug: faker.datatype.uuid(),
                        lastUpdated: faker.date.weekday(),
                        favorite: true
                    }
                ],
                isLoading: false,
                isError: false,
        })
        renderComponent();

        expect(screen.getByText(title)).toBeInTheDocument();
    })

    it("should render loading when is loading", () => {
        mockUseFiles.mockReturnValue({
                files: [{
                    id: faker.datatype.uuid(),
                    title: faker.name.jobTitle(),
                    slug: faker.datatype.uuid(),
                    lastUpdated: faker.date.weekday(),
                    favorite: true
                }],
                favorites: [],
                isLoading: true,
                isError: false,
        })
        renderComponent();

        expect(screen.getByTestId("loading")).toBeInTheDocument();
    })

})