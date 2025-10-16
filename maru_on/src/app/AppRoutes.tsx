import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
//import { useSelector } from "react-redux";
//import type { RootState } from "./store";
import type { ReactNode } from "react";
import MainPage from "@/pages/MainPage";
import VideoPage from "@/pages/VideoPage";

function Protected({ children }: { children: ReactNode }) {
    //const token = useSelector((s: RootState) => s.auth.token);
    //if (!token) return <Navigate to="/login" replace />;
    return children;
}

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<VideoPage />} />
                <Route path="/main" element={<Protected><MainPage /></Protected>} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter>
    );
}