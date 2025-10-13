import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
//import { useSelector } from "react-redux";
//import type { RootState } from "./store";
import type { ReactNode } from "react";
import ComingSoonPage from "@/pages/ComingSoonPage";
import DetailPage from "@/pages/DetailPage";
import RandingPage from "@/pages/RandingPage";

function Protected({ children }: { children: ReactNode }) {
    //const token = useSelector((s: RootState) => s.auth.token);
    //if (!token) return <Navigate to="/login" replace />;
    return children;
}

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<ComingSoonPage />} />
                <Route path="/main" element={<Protected><DetailPage /></Protected>} />
                <Route path="/randing" element={<Protected><RandingPage /></Protected>} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter>
    );
}