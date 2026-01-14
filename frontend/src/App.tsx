import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import ToolPage from "./pages/ToolPage/ToolPage";

import LoginPage from "./pages/LoginPage";





export default function App() {
  return (
    <BrowserRouter>
      <Routes>
  <Route path="/" element={<DashboardPage />} />
  <Route path="/login" element={<LoginPage />} />
  <Route path="/tool/:toolId" element={<ToolPage />} />
</Routes>

    </BrowserRouter>
  );
}

