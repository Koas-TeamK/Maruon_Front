"use client";

import { useEffect, useRef, useState } from "react";
import mainStyles from "@/pages/calmstand/CalmStandPage.module.css";

interface CatchPhraseProps {
    onRequestPrevSection: () => void;
    onRequestNextSection: () => void;
}

export default function CatchPhraseSection({
    onRequestPrevSection,
    onRequestNextSection,
}: CatchPhraseProps) {
    const phrases = ["FOCUS DEEPER", "WORK NATURALLY", "FEEL BETTER"];
    const [activeIndex, setActiveIndex] = useState(0);

    const isHandlingRef = useRef(false);
    const containerRef = useRef<HTMLElement | null>(null);

    // 모바일 터치 시작 좌표
    const touchStartYRef = useRef<number | null>(null);

    // 진동 함수
    const vibrate = (pattern: number | number[]) => {
        if (typeof window === "undefined") return;
        if (!("vibrate" in navigator)) return;

        try {
            (navigator as any).vibrate(pattern);
        } catch (err) {
        }
    };

    const handleDirection = (direction: 1 | -1) => {
        if (isHandlingRef.current) return;
        isHandlingRef.current = true;

        //진동
        vibrate(80);

        setActiveIndex((prev) => {
            // ▼ 아래로 (다음 문장 / 다음 섹션)
            if (direction > 0) {
                if (prev < phrases.length - 1) {
                    return prev + 1;
                } else {
                    vibrate([20, 40, 20]);
                    onRequestNextSection();
                    return prev;
                }
            }

            // ▲ 위로 (이전 문장 / 이전 섹션)
            if (direction < 0) {
                if (prev > 0) {
                    return prev - 1;
                } else {
                    // 첫 문장에서 위로 올림 → 이전 섹션
                    vibrate(12);
                    onRequestPrevSection();
                    return prev;
                }
            }

            return prev;
        });

        // Debounce (과민 반응 방지)
        window.setTimeout(() => {
            isHandlingRef.current = false;
        }, 350);
    };

    /* ================================================================
     * 🖱 데스크탑 wheel + 📱 모바일 touch 이벤트 처리
     * ================================================================ */
    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        /* ------------------------------
         * 🖱 데스크탑 wheel 이벤트
         * ------------------------------ */
        const handleWheel = (e: WheelEvent) => {
            e.preventDefault();
            if (e.deltaY === 0) return;

            const direction = e.deltaY > 0 ? 1 : -1;
            handleDirection(direction);
        };

        /* ------------------------------
         * 📱 모바일 touch 이벤트
         * ------------------------------ */
        const handleTouchStart = (e: TouchEvent) => {
            if (e.touches.length !== 1) return;
            touchStartYRef.current = e.touches[0].clientY;
        };

        const handleTouchMove = (e: TouchEvent) => {
            if (touchStartYRef.current === null) return;

            const currentY = e.touches[0].clientY;
            const deltaY = touchStartYRef.current - currentY;

            // 손 떨림 방지 (필터)
            const THRESHOLD = 25;
            if (Math.abs(deltaY) < THRESHOLD) return;

            // 기본 스크롤 방지
            e.preventDefault();

            const direction = deltaY > 0 ? 1 : -1;
            handleDirection(direction);

            // 다음 스와이프를 위해 초기화
            touchStartYRef.current = null;
        };

        const handleTouchEnd = () => {
            touchStartYRef.current = null;
        };

        /* 이벤트 등록 */
        el.addEventListener("wheel", handleWheel, { passive: false });
        el.addEventListener("touchstart", handleTouchStart, { passive: true });
        el.addEventListener("touchmove", handleTouchMove, { passive: false });
        el.addEventListener("touchend", handleTouchEnd);

        /* 종료 시 cleanup */
        return () => {
            el.removeEventListener("wheel", handleWheel);
            el.removeEventListener("touchstart", handleTouchStart);
            el.removeEventListener("touchmove", handleTouchMove);
            el.removeEventListener("touchend", handleTouchEnd);
        };
    }, [phrases.length, onRequestNextSection, onRequestPrevSection]);

    /* ================================================================
     * UI 출력
     * ================================================================ */
    return (
        <section
            ref={containerRef as React.RefObject<HTMLElement>}
            className="
                w-full h-full
                touch-none    /* 모바일 페이지 스크롤 방지 */
                select-none   /* 텍스트 블록 선택 방지 */
                border border-red
            "
        >
            <div
                className="
                    w-full h-full
                    flex flex-col
                    items-center
                    justify-center
                    text-center
                    gap-y-8
                "
            >
                {phrases.map((text, i) => (
                    <div
                        key={i}
                        className={`
                            ${mainStyles.catchphrase}
                            ${activeIndex === i ? mainStyles.active : ""}
                        `}
                    >
                        {text}
                    </div>
                ))}
            </div>
        </section>
    );
}
