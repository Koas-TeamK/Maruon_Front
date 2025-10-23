// components/menu/Menu.tsx
import { useEffect } from "react";
import { createPortal } from "react-dom";
import { XMarkIcon } from "@heroicons/react/24/solid";

type MenuProps = {
    open: boolean;
    onClose: () => void;
};

export default function Menu({ open, onClose }: MenuProps) {
    // ESC 닫기
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [onClose]);

    // 스크롤 잠금(열렸을 때만)
    useEffect(() => {
        if (!open) return;
        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => { document.body.style.overflow = prev; };
    }, [open]);

    return createPortal(
        <>
            {/* overlay: 표시/비표시는 opacity + pointer-events로 제어 */}
            <div
                onClick={onClose}
                className={[
                    "fixed inset-0 z-[190] bg-black/40 transition-opacity duration-300",
                    open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
                ].join(" ")}
            />

            {/* 모바일: 우측 슬라이드 (md 미만) */}
            <aside
                role="dialog"
                aria-modal="true"
                className={[
                    "md:hidden fixed top-0 right-0 z-[200] h-dvh w-[320px] bg-black/50 shadow-2xl",
                    "transition-transform duration-300 will-change-transform",
                    open ? "translate-x-0" : "translate-x-full",
                    "flex flex-col",
                ].join(" ")}
            >
                <div className="flex items-center justify-end px-4 h-[64px] border-b">
                    <button type="button" aria-label="닫기" onClick={onClose} className="p-2  hover:bg-black/50 rounded-md">
                        <XMarkIcon className="w-6 h-6" />
                    </button>
                </div>

                <nav className="p-4 space-y-2">
                    <a href="/about" className="block px-2 py-2 rounded  hover:bg-black/50">About</a>
                    <a href="/products" className="block px-2 py-2 rounded  hover:bg-black/50">Products</a>
                    <a href="/contact" className="block px-2 py-2 rounded  hover:bg-black/50">Contact</a>
                </nav>
            </aside>

            {/* 데스크탑*/}
            <aside
                role="dialog"
                aria-modal="true"
                className={[
                    "hidden md:flex fixed left-1/2 z-[200] top-0 -translate-x-1/2",
                    "w-[100vh] bg-black/50 shadow-2xl",
                    "h-[50vh] max-h-[80vh] overflow-y-auto",
                    "transition-transform duration-500 ease-out will-change-transform",
                    open ? "translate-y-[calc(50vh-50%)]" : "-translate-y-full",
                    "flex flex-col",
                ].join(" ")}
                aria-hidden={!open}
            >
                <div className="flex items-center justify-end px-4 h-[64px] border-b">
                    <button type="button" aria-label="닫기" onClick={onClose} className="p-2 hover:bg-gray-100 rounded-md">
                        <XMarkIcon className="w-6 h-6" />
                    </button>
                </div>

                <nav className="p-4 space-y-2">
                    <a href="/about" className="block px-2 py-2 rounded hover:bg-black/50">About</a>
                    <a href="/products" className="block px-2 py-2 rounded hover:bg-black/50">Products</a>
                    <a href="/contact" className="block px-2 py-2 rounded hover:bg-black/50">Contact</a>
                </nav>
            </aside>
        </>,
        document.body
    );
}
