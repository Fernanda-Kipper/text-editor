import { fireEvent, render, screen } from "@testing-library/react"
import { EditorContext, EditorContextType } from "../../../context/editor-context"
import { EditorHeader } from "../editor-header"
import { EditorPlayground } from "../editor-playground";

const saveFile = jest.fn();
const setBody = jest.fn();
const body = "Testing";
const handlePreview = jest.fn();
const isErrorSavingFile = false;

const renderComponent = () => {
    return render(
        <EditorContext.Provider value={{
            saveFile,
            setBody,
            body,
            handlePreview,
            isErrorSavingFile
        } as unknown as EditorContextType}>
            <EditorHeader/>
            <EditorPlayground/>
        </EditorContext.Provider>
    )
}

describe("EditorHeader", () => {
    it("should render correctly", () => {
        renderComponent();

        expect(screen.getByText("Heading")).toBeTruthy();
    })

    it.each([
        ["heading-1", "#", "\n"], 
        ["heading-2", "##", "\n"], 
        ["heading-3", "###", "\n"], 
        ["bold", "** **", ""], 
        ["italic", "* *", ""], 
        ["block", "> ", ""]
    ])(("Should set body when hit element btn"), 
    (btnId, value, thirdParam) => {
        renderComponent();

        const btn = screen.getByTestId(btnId);
        const newBodyValue = body + thirdParam + value;

        fireEvent.click(btn);

        expect(setBody).toHaveBeenCalledWith(newBodyValue);
    })
})