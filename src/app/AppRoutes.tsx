//AppRoutes.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Analytics } from '@vercel/analytics/react';
import AppLayout from "@/shared/ui/AppLayout";
import AppLayout_QR from "@/shared/ui/AppLayout_QR";
import MainPage from "@/features/main/pages/MainPage";
import MaruonSerialPage from "@/features/serial/pages/MaruonSerialPage";
import CalmStandPage from "@/features/calmstand/pages/CalmStandPage";

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                {/* 메인 */}
                <Route element={<AppLayout />}>
                    <Route path="/" element={<MainPage />} />
                </Route>
                {/* 오너십(시리얼 노출) 페이지*/}
                <Route element={<AppLayout_QR />}>
                    <Route path="/maruon" element={<MaruonSerialPage />} />
                    <Route path="/maruon/:serial" element={<MaruonSerialPage />} />
                    <Route path="/maruon/serial=:serial" element={<MaruonSerialPage />} />
                </Route>
                {/* CalmStand */}
                <Route >
                    <Route path="/calmStand" element={<CalmStandPage />} />
                </Route>
            </Routes>
            <Analytics />
        </BrowserRouter>
    );
}