import { Routes, Route, BrowserRouter } from "react-router-dom";

import { EditorPage } from "./pages/editor";
import { AllFilesPage } from "./pages/all-files"

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AllFilesPage />} />
        <Route path="/editor/:slug" element={<EditorPage />} />
        <Route path="favorites"/>
      </Routes>
    </BrowserRouter>
  );
}