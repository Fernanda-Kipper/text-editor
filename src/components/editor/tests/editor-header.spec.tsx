import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";
import { EditorHeader } from '../editor-header';

import { render, screen, fireEvent } from '@testing-library/react';
import { EditorContext, EditorContextType  } from "../../../context/editor-context";
import { EditorPlayground } from "../editor-playground";

const saveFile = jest.fn();
const setBody = jest.fn();
const handlePreview = jest.fn();
const body = "Testando"

const renderComponent = () => {
    const queryClient = new QueryClient();
    return render(
        <BrowserRouter>
        <QueryClientProvider client={queryClient}>
            <EditorContext.Provider value={{
                saveFile,
                setBody,
                handlePreview,
                body
            } as unknown as EditorContextType}>
                <EditorHeader />
                <EditorPlayground/>
            </EditorContext.Provider>
        </QueryClientProvider>
        </BrowserRouter>
    )
}

describe("EditorHeader", () => {
    it.each([["heading-1", "#"], ["heading-2", "##"], ["heading-3", "###"]])
    ("Should add heading element on body", (testId, value) => {
        renderComponent();

        const btn = screen.getByTestId(testId);
        fireEvent.click(btn);

        const expected = `Testando\n${value}`;

        expect(setBody).toHaveBeenCalledWith(expected);
    })

    it.each([["bold", "** **"], ["italic", "* *"], ["block", "> "]])
    ("Should add common element on body", (testId, value) => {
        renderComponent();

        const btn = screen.getByTestId(testId);
        fireEvent.click(btn);

        const expected = `Testando${value}`;

        expect(setBody).toHaveBeenCalledWith(expected);
    })

    it("should save file", () => {
        renderComponent();

        const btn = screen.getByText("salvar");
        fireEvent.click(btn);

        expect(saveFile).toHaveBeenCalled();
    })
})