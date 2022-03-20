import { Routes, Route, BrowserRouter } from "react-router-dom";

import { EditorPage } from "./pages/editor";
import { FileListPage } from "./pages/file-list"

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FileListPage />} />
        <Route path="/editor/:slug" element={<EditorPage />} />
        <Route path="/favorites" element={<FileListPage />}/>
      </Routes>
    </BrowserRouter>
  );
}