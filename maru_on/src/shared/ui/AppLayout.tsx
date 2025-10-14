import { Outlet } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SnsTab from "@/components/SnsTab";

export default function AppLayout() {

    return (
        <>
            {/* 전체 페이지를 덮는 오버레이/공통 UI */}
            <Header />
            {/* 페이지별 콘텐츠만 교체 */}
            <div className="relative w-full min-h-dvh bg-[#0b0b0f]">
                <Outlet />
            </div>
            <Footer />
            {/* 하단 SNS 토글 탭(공통) */}
            <SnsTab />
        </>
    );
}
