import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import MobileShell from "@/components/MobileShell";
import Section1 from "@/components/Detail/Section1";
import Section2 from "@/components/Detail/Section2";
import Section3 from "@/components/Detail/Section3";
import Section4 from "@/components/Detail/Section4";
import Section5 from "@/components/Detail/Section5";

export default function DetailPage() {
    const wechatSrc = "/logo/wechat.png";
    const lineSrc = "/logo/line.png";
    const linkedinSrc = "/logo/linkedin.png";
    const facebookSrc = "/logo/facebook.png";
    const whiteLogo = "/logo/maruon_mono_white.png"; // 권장(검은 배경 위 시인성)

    // 세션 정의
    const sections = useMemo(
        () => [
            { key: "s1", content: <Section1 />, bg: "bg-gray-100" },
            { key: "s2", content: <Section2 />, bg: "bg-gray-200" },
            { key: "s3", content: <Section3 />, bg: "bg-gray-300" },
            { key: "s4", content: <Section4 />, bg: "bg-gray-400" },
            { key: "s5", content: <Section5 />, bg: "bg-gray-500 text-white" },
        ],
        []
    );

    // 초기 해시 → 인덱스
    const initialIndex = (() => {
        const h = typeof window !== "undefined" ? window.location.hash : "";
        const idx = sections.findIndex((s) => `#${s.key}` === h);
        return idx >= 0 ? idx : 0;
    })();

    const [index, setIndex] = useState(initialIndex);
    const slidingRef = useRef<HTMLDivElement>(null);
    const touchStartY = useRef<number | null>(null);
    const isThrottled = useRef(false);

    const clamp = (n: number) => Math.max(0, Math.min(sections.length - 1, n));
    const goTo = useCallback(
        (i: number) => setIndex((prev) => clamp(typeof i === "number" ? i : prev)),
        [sections.length]
    );

    // 해시 동기화
    useEffect(() => {
        const key = sections[index]?.key ?? "s1";
        history.replaceState(null, "", `#${key}`);
    }, [index, sections]);

    // 스로틀
    const throttle = (fn: () => void, ms = 700) => {
        if (isThrottled.current) return;
        isThrottled.current = true;
        fn();
        setTimeout(() => (isThrottled.current = false), ms);
    };

    // 입력 이벤트
    useEffect(() => {
        const onWheel = (e: WheelEvent) => {
            e.preventDefault();
            throttle(() => {
                if (e.deltaY > 0) goTo(index + 1);
                else if (e.deltaY < 0) goTo(index - 1);
            });
        };

        const onKey = (e: KeyboardEvent) => {
            if (e.key === "ArrowDown" || e.key === "PageDown") {
                e.preventDefault();
                throttle(() => goTo(index + 1));
            } else if (e.key === "ArrowUp" || e.key === "PageUp") {
                e.preventDefault();
                throttle(() => goTo(index - 1));
            }
        };

        const onTouchStart = (e: TouchEvent) => {
            touchStartY.current = e.touches[0].clientY;
        };
        const onTouchEnd = (e: TouchEvent) => {
            const startY = touchStartY.current;
            if (startY == null) return;
            const endY = e.changedTouches[0].clientY;
            const diff = startY - endY;
            const threshold = 40;
            if (Math.abs(diff) > threshold) {
                throttle(() => {
                    if (diff > 0) goTo(index + 1);
                    else goTo(index - 1);
                });
            }
            touchStartY.current = null;
        };

        document.addEventListener("wheel", onWheel, { passive: false });
        document.addEventListener("keydown", onKey, { passive: false });
        document.addEventListener("touchstart", onTouchStart, { passive: true });
        document.addEventListener("touchend", onTouchEnd, { passive: true });

        return () => {
            document.removeEventListener("wheel", onWheel as any);
            document.removeEventListener("keydown", onKey as any);
            document.removeEventListener("touchstart", onTouchStart as any);
            document.removeEventListener("touchend", onTouchEnd as any);
        };
    }, [index, goTo]);

    return (
        <MobileShell>
            {/* 오버레이 구조: 헤더는 투명, 컨텐츠는 100dvh 유지 */}
            <div className="relative w-full h-dvh overflow-hidden bg-[#0b0b0f] touch-none">
                {/* 투명 헤더(오버레이) */}
                <header className="fixed inset-x-0 top-0 h-14 z-[100] bg-transparent flex items-center justify-end px-4 pointer-events-none">
                    {/* 내부 요소만 클릭 가능 */}
                    <img
                        src={whiteLogo}
                        alt="MARUON"
                        className="h-8 w-auto drop-shadow pointer-events-auto"
                    />
                </header>

                {/* 슬라이딩 트랙: 100dvh 기준 */}
                <div
                    ref={slidingRef}
                    className="relative w-full z-0 transition-transform duration-700 ease-in-out"
                    style={{
                        height: "100dvh",
                        transform: `translateY(-${index * 100}%)`,
                    }}
                >
                    {sections.map((s) => (
                        <section
                            key={s.key}
                            className={`w-full ${s.bg}`}
                            style={{ height: "100dvh" }}
                        >
                            {/* 섹션 내용은 자유 배치. 헤더 아래도 그대로 비침 */}
                            <div className="w-full h-full grid place-items-center">
                                {s.content}
                            </div>
                        </section>
                    ))}
                </div>

                {/* 하단 고정 SNS 탭 */}
                <nav className="fixed z-[90] right-4 md:right-3 bottom-[max(1rem,env(safe-area-inset-bottom))]">
                    <div className="flex flex-col items-end gap-3">
                        <img src={wechatSrc} className="w-[50px] h-[50px]" alt="WeChat" />
                        <img src={lineSrc} className="w-[50px] h-[50px]" alt="LINE" />
                        <img src={linkedinSrc} className="w-[50px] h-[50px]" alt="LinkedIn" />
                        <img src={facebookSrc} className="w-[50px] h-[50px]" alt="Facebook" />
                    </div>
                </nav>

                {/* 하단 페이지 인디케이터 */}
                <div className="fixed left-1/2 -translate-x-1/2 bottom-[calc(env(safe-area-inset-bottom)+0.5rem)] z-[95]">
                    <div className="flex items-center gap-2 rounded-full bg-black/40 px-3 py-1 backdrop-blur">
                        {sections.map((s, i) => (
                            <button
                                key={s.key}
                                onClick={() => goTo(i)}
                                aria-label={`Go to ${s.key}`}
                                className={`h-2.5 rounded-full transition-all ${i === index ? "w-6 bg-white" : "w-2.5 bg-white/50 hover:bg-white/80"
                                    }`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </MobileShell>
    );
}
