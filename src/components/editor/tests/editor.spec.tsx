import { render, waitFor, screen } from "@testing-library/react"
import { Editor } from "../editor";
import * as customFetcherFile from '../../../services/fetcher';
import { faker } from '@faker-js/faker';
import { QueryClient, QueryClientProvider } from "react-query";
import { EditorContext, EditorContextType } from "../../../context/editor-context";
import { ToastContainer } from "react-toastify";

const fetcherSpy = jest.spyOn(customFetcherFile, "customFetcher");

const setId = jest.fn();
const setBody = jest.fn();
const isPreviewMode = false;

const renderComponent = () => {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                retry: false
            }
        }
    });

    return render(
        <QueryClientProvider client={queryClient}>
            <EditorContext.Provider value={{
                setId,
                setBody,
                isPreviewMode
            } as unknown as EditorContextType}>
                <Editor/>
                <ToastContainer/>
            </EditorContext.Provider>
        </QueryClientProvider>
    )
}

describe("Editor", () => {
    beforeEach(() => {
        global.window = Object.create(window);
        Object.defineProperty(window, 'location', {
          value: {
            pathname: "/editor/slug-de-teste"
          }
        });
    })

    it("Should fetch file body and setBody successfully", async () => {
        fetcherSpy.mockResolvedValue({
                data: {
                    data: { 
                        file: {
                            body: "Testing body fetch",
                            id: faker.datatype.uuid(),
                        }
                    }
                },
                status: 200,
                statusText: "OK",
                headers: {},
                config: {}
            })

        renderComponent();

        await waitFor(() => expect(setBody).toHaveBeenCalled());
        await waitFor(() => expect(setBody).toHaveBeenCalledWith("Testing body fetch"));
    })

    it("Should show error message when fetch failed", async () => {
        fetcherSpy.mockRejectedValue({
                status: 500,
                statusText: "Internal Server Error",
                headers: {},
                config: {}
        })
        
        renderComponent();

        expect(await screen.findByText("Erro ao carregar arquivo.")).toBeTruthy();
    })
})