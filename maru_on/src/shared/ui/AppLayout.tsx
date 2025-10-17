import { Outlet } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SnsTab from "@/components/SnsTab";

export default function AppLayout() {
    return (
        <div className="w-screen h-screen bg-white">
            <Header />

            {/* 헤더 높이 + 노치 영역만큼 상단 여백 */}
            {/* SnsTab(고정 하단 버튼류) 높이까지 하단 여백 */}
            <main className="pt-[calc(env(safe-area-inset-top)+4rem)]">
                <Outlet />
            </main>

            <Footer />
            <SnsTab />
        </div>
    );
}
