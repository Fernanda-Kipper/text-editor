import { Routes, Route, BrowserRouter } from "react-router-dom";

import { EditorPage } from "./pages/editor";
import { Home } from "./pages/home";
import PreviewPage from "./pages/preview";

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/editor" element={<EditorPage />} />
        <Route path="/preview" element={<PreviewPage/>} />
      </Routes>
    </BrowserRouter>
  );
}