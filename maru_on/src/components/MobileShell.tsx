// src/components/MobileShell.tsx
import type { ReactNode } from "react";
import clsx from "clsx";

type Props = {
    children: ReactNode;
    /** 내부 페이지에서 자체 스크롤을 쓸 때 true (사파리 호환) */
    allowInnerScroll?: boolean;
};

export default function MobileShell({ children, allowInnerScroll = false }: Props) {
    return (
        <div className="min-h-[100svh] w-dvw bg-[#0b0b0f] flex items-center justify-center">
            <div
                className={clsx(
                    "w-full h-[100svh] bg-white",
                    allowInnerScroll ? "" : "overflow-hidden" // ← 필요 시 off
                )}
            >
                {children}
            </div>
        </div>
    );
}
