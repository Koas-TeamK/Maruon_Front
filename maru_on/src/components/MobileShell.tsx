// src/components/MobileShell.tsx
import type { ReactNode } from "react";

export default function MobileShell({ children }: { children: ReactNode }) {
    return (
        // 1) 바깥 래퍼가 무조건 화면 전체 크기를 가진다
        // 2) 데스크탑(md↑)에서만 중앙 정렬(grid + place-items-center)
        <div className="w-dvw min-h-dvh bg-[#0b0b0f] md:grid md:place-items-center">
            {/* 폰 프레임: 모바일=가득, 데스크탑=고정폭 */}
            <div className="w-full md:w-[390px] md:min-h-[844px] bg-white md:rounded-3xl md:shadow-2xl md:overflow-hidden">
                {children}
            </div>
        </div>
    );
}
