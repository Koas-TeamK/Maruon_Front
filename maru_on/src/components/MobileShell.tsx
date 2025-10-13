// src/components/MobileShell.tsx
import type { ReactNode } from "react";

export default function MobileShell({ children }: { children: ReactNode }) {
    return (
        <div className="min-h-[100svh] w-dvw bg-[#0b0b0f]">
            <div className="w-full h-[100svh] bg-white overflow-hidden">
                {children}
            </div>
        </div>
    );
}
