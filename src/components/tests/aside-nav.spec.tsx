import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import { BrowserRouter } from "react-router-dom";

import { AsideNav } from '../aside-nav';
import { QueryClientProvider, QueryClient } from 'react-query';

const mockNavigate = jest.fn();

jest.mock('react-router', () => ({
    ...jest.requireActual('react-router'),
    useNavigate: () => mockNavigate
}))

describe("AsideNav", () => {
    it("should render correctly", () => {
        const queryClient = new QueryClient();
        render(
            <BrowserRouter>
            <QueryClientProvider client={queryClient}>
                <AsideNav />
            </QueryClientProvider>
            </BrowserRouter>
        )

        expect(screen.getByText("All files")).toBeInTheDocument();
        expect(screen.getByText("Favorites")).toBeInTheDocument();
        expect(screen.getByText("New")).toBeInTheDocument();
    });

    it("should call navigate with correct params", () => {
        const queryClient = new QueryClient();
        render(
            <BrowserRouter>
            <QueryClientProvider client={queryClient}>
                <AsideNav />
            </QueryClientProvider>
            </BrowserRouter>
        )

        const btn = screen.getByText("All files")

        fireEvent.click(btn);

        expect(mockNavigate).toHaveBeenCalled();
        expect(mockNavigate).toHaveBeenCalledWith("/");
    })

    it.each([["All files", "/"], ["Favorites", "/favorites"]])("testings %s", (text, path) => {
        const queryClient = new QueryClient();
        render(
            <BrowserRouter>
            <QueryClientProvider client={queryClient}>
                <AsideNav />
            </QueryClientProvider>
            </BrowserRouter>
        )

        const btn = screen.getByText(text);

        fireEvent.click(btn);

        expect(mockNavigate).toHaveBeenCalled();
        expect(mockNavigate).toHaveBeenCalledWith(path);
    })
})