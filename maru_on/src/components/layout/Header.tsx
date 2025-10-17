// components/layout/Header.tsx
import { Bars3Icon } from "@heroicons/react/24/solid";
import Menu from "@/components/menu/Menu";
import { useState } from "react";

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className="fixed inset-x-0 top-0 z-[100] flex items-center justify-between p-3 ">
            <img
                src="/logo/maruon-logo-black.png"
                alt="MARUON"
                className="w-12 h-auto max-h-full"
            />

            <button
                type="button"
                aria-label="메뉴 열기"
                onClick={() => setMenuOpen(true)}
                className="p-2 hover:opacity-80 active:opacity-60"
            >
                <Bars3Icon className="w-8 h-8 fill-black" />
            </button>

            <Menu open={menuOpen} onClose={() => setMenuOpen(false)} />
        </header>
    );
}
