// src/components/SnsFab.tsx
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleSns, closeSns } from "@/features/ui/uiSlice";
import type { RootState } from "@/app/store";

export default function SnsFab() {
    const dispatch = useDispatch();
    const open = useSelector((s: RootState) => s.ui.snsOpen);
    const wrapRef = useRef<HTMLDivElement>(null);

    const wechatSrc = "/logo/wechat.png";
    const lineSrc = "/logo/line.png";
    const linkedinSrc = "/logo/linkedin.png";
    const facebookSrc = "/logo/facebook.png";

    useEffect(() => {
        const onDocClick = (e: MouseEvent) => {
            if (!open) return;
            if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) dispatch(closeSns());
        };
        const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") dispatch(closeSns()); };
        document.addEventListener("mousedown", onDocClick);
        document.addEventListener("keydown", onKey);
        return () => {
            document.removeEventListener("mousedown", onDocClick);
            document.removeEventListener("keydown", onKey);
        };
    }, [open, dispatch]);

    return (
        <nav aria-label="Contact quick panel" className="fixed z-[90] right-0 bottom-16">
            <div ref={wrapRef} className="relative">
                {/* 아이콘: 세로로 위로 */}
                <div
                    id="sns-pop"
                    aria-hidden={!open}
                    className={`absolute right-3 bottom-[calc(100%+12px)]
                      flex flex-col items-end gap-5
                      ${open ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-2 pointer-events-none"}
                      transition-all duration-200`}
                >
                    {[{ src: wechatSrc, alt: "WeChat" },
                    { src: lineSrc, alt: "LINE" },
                    { src: linkedinSrc, alt: "LinkedIn" },
                    { src: facebookSrc, alt: "Facebook" }]
                        .map(({ src, alt }) => (
                            <a key={alt} href="#" title={alt} tabIndex={open ? 0 : -1} className="inline-block">
                                <img src={src} alt={alt}
                                    className="object-contain drop-shadow hover:scale-105 active:scale-80 
                                    transition-transform !rounded-none w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 
                                    " />
                            </a>
                        ))}
                </div>

                <button
                    aria-controls="sns-pop"
                    aria-expanded={open}
                    aria-label={open ? "닫기" : "연락하기 열기"}
                    onClick={() => dispatch(toggleSns())}
                    className="group bg-white/95 backdrop-blur shadow-2xl px-5 py-4 text-right border border-black/5
                     hover:shadow-[0_10px_30px_rgba(0,0,0,0.2)] transition-shadow focus:outline-none focus:ring-2 focus:ring-black/10
                     !rounded-none"
                    style={{ borderRadius: 0 }}
                >
                    <div className="flex items-center gap-3">
                        <span className="hidden md:block h-8 w-[3px] bg-black/80" />
                        <div className="leading-tight">
                            <div className="text-[13px] font-semibold tracking-wide text-black">CONTACT&nbsp;US</div>
                        </div>
                    </div>
                </button>
            </div>
        </nav>
    );
}
