import { Outlet } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SnsTab from "@/components/SnsTab";

export default function AppLayout() {
    return (
        <div className="w-screen h-screen bg-white">
            <Header />
            <main className="pt-[calc(env(safe-area-inset-top))]">
                <Outlet />
            </main>

            <Footer />
            <SnsTab />
        </div>
    );
}
