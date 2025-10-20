import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "@/shared/ui/AppLayout";
import MainPage from "@/pages/MainPage";
import MaruonSerialPage from "@/pages/MaruonSerialPage";

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AppLayout />}>
                    <Route path="/" element={<MainPage />} />
                    {/* 오너십(시리얼 노출) 페이지*/}
                    <Route path="/maruon" element={<MaruonSerialPage />} />
                    <Route path="/maruon/:serial" element={<MaruonSerialPage />} />
                    <Route path="/maruon/serial=:serial" element={<MaruonSerialPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}