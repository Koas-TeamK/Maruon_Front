import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import Section1 from "@/components/Detail/Section1";
import Section2 from "@/components/Detail/Section2";
import Section3 from "@/components/Detail/Section3";
import Section4 from "@/components/Detail/Section4";
import Section5 from "@/components/Detail/Section5";

export default function DetailPage() {

    // 세션 정의
    const sections = useMemo(
        () => [
            { key: "s1", label: "소개", content: <Section1 />, bg: "bg-gray-100" },
            { key: "s2", label: "이미지", content: <Section2 />, bg: "bg-gray-200" },
            { key: "s3", label: "기능", content: <Section3 />, bg: "bg-gray-300" },
            { key: "s4", label: "후기·SNS", content: <Section4 />, bg: "bg-gray-400" },
            { key: "s5", label: "문의", content: <Section5 />, bg: "bg-gray-500 text-white" },
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
        <div className="relative w-full h-dvh overflow-hidden bg-[#0b0b0f] touch-none">

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
                        <div className="w-full h-full grid place-items-center">
                            {s.content}
                        </div>
                    </section>
                ))}
            </div>


            {/* 하단 페이지 인디케이터 — 미니멀 원형점 */}
            <div className="fixed left-1/2 -translate-x-1/2 bottom-[max(0.8rem,calc(env(safe-area-inset-bottom)+0.4rem))] z-[95] pointer-events-none">
                <div className="flex items-center gap-3 pointer-events-auto">
                    {sections.map((s, i) => {
                        const active = i === index;
                        return (
                            <span
                                key={s.key}
                                role="button"
                                tabIndex={0}
                                onClick={() => goTo(i)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter" || e.key === " ") {
                                        e.preventDefault();
                                        goTo(i);
                                    }
                                }}
                                aria-label={`Go to ${s.label ?? s.key}`}
                                aria-current={active ? "page" : undefined}
                                className="relative p-2 inline-grid place-items-center cursor-pointer select-none
                     outline-none focus-visible:scale-105 transition-transform
                     bg-transparent"
                            >
                                {/* 코어 점 */}
                                <span
                                    className={`block rounded-full transition-all ${active ? "w-2.5 h-2.5 bg-white" : "w-2.5 h-2.5 bg-white/50"
                                        }`}
                                />
                                {/* 활성 링 */}
                                <span
                                    className={`pointer-events-none absolute inset-0 grid place-items-center transition-all ${active ? "opacity-100 scale-100" : "opacity-0 scale-75"
                                        }`}
                                >
                                    <span className="block w-5 h-5 rounded-full ring-1 ring-white/90" />
                                </span>
                            </span>
                        );
                    })}
                </div>
            </div>
            {/* E 인디케이터 */}

        </div>
    );
}
