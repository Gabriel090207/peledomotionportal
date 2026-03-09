import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import ToolPage from "./pages/ToolPage/ToolPage";
import LoginPage from "./pages/LoginPage";
import ScrollToTop from "./components/ScrollToTop";
import AdsPowerPage from "./pages/AdsPowerPage/AdsPowerPage";


export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />

      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/tool/:toolId" element={<ToolPage />} />
        <Route path="/adspower" element={<AdsPowerPage />} />
      </Routes>
    </BrowserRouter>
  );
}
