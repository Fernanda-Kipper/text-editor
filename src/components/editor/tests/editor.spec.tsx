import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";
import { render, screen, waitFor } from '@testing-library/react';

import { EditorContextProvider } from "../../../context/editor-context";
import { Editor } from "../editor";

import * as customFetcher from '../../../services/fetcher';
import { ToastContainer } from "react-toastify";

const fetcherSpy = jest.spyOn(customFetcher, "customFetcher");

const renderComponent = () => {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                retry: false
            }
        }
    });
    return render(
        <BrowserRouter>
        <QueryClientProvider client={queryClient}>
            <EditorContextProvider>
                <Editor/>
                <ToastContainer/>
            </EditorContextProvider>
        </QueryClientProvider>
        </BrowserRouter>
    )
}

describe("Editor", () => {
    beforeAll(() => {
        fetcherSpy.mockClear();
    })

    it("should fetch and show correct file", async () => {
        window.location.pathname = "editor/12345";
        fetcherSpy.mockResolvedValue({
            data: {
                data: {
                    file: {
                        body: "Teste do fetch"
                    }
                }
            },
            status: 200,
            statusText: 'OK',
            headers: {},
            config: {}
        });
        renderComponent();

        await waitFor(() => 
            expect(screen.getByTestId("textarea").innerHTML).toBe("Teste do fetch")
        );
    });

    it("should show error when could not fetch file", async () => {
        fetcherSpy.mockRejectedValue(
            {
                status: 500,
                statusText: 'Internal Server Error',
            }
        );
        renderComponent();

        expect(await screen.findByText("Erro ao carregar arquivo.")).toBeTruthy()
    })
})