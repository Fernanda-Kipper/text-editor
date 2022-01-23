import { Routes, Route, BrowserRouter } from "react-router-dom";

import { Home } from "./pages/home";

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}