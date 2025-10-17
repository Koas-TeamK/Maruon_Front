import { BrowserRouter, Routes, Route } from "react-router-dom";
import RandingPage from "@/pages/RandingPage";
import AppLayout from "@/shared/ui/AppLayout";
import MainPage from "@/pages/MainPage";

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AppLayout />}>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/randing" element={<RandingPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}