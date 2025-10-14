// components/layout/Header.tsx
import { Bars3Icon } from "@heroicons/react/24/solid";
import Menu from "@/components/menu/Menu";
import { useState } from "react";

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className="fixed inset-x-0 top-0 z-[100] flex items-center justify-between px-4 h-[clamp(56px,8vh,96px)]">
            <img
                src="/logo/maruon_mono_white.png"
                alt="MARUON"
                className="h-[clamp(40px,3vw,90px)] w-auto max-h-full drop-shadow"
            />

            <button
                type="button"
                aria-label="메뉴 열기"
                onClick={() => setMenuOpen(true)}
                className="p-2 hover:opacity-80 active:opacity-60"
            >
                <Bars3Icon className="w-8 h-8" />
            </button>

            <Menu open={menuOpen} onClose={() => setMenuOpen(false)} />
        </header>
    );
}
