// src/components/MobileShell.tsx
import type { ReactNode } from "react";

export default function MobileShell({ children }: { children: ReactNode }) {
    return (
        <div
            className="w-dvw min-h-dvh bg-[#0b0b0f] md:grid md:place-items-center"
            style={{
                paddingTop: "env(safe-area-inset-top)",
                paddingBottom: "env(safe-area-inset-bottom)",
                paddingLeft: "env(safe-area-inset-left)",
                paddingRight: "env(safe-area-inset-right)",
            }}
        >
            <div className="w-full md:w-[390px] md:min-h-[844px] bg-white md:rounded-3xl md:shadow-2xl md:overflow-hidden">
                {children}
            </div>
        </div>
    );
}
