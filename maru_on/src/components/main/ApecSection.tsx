import { useEffect, useRef, useState, type ReactNode } from "react";
import { useTranslation } from "react-i18next";

type HoverGoButtonProps = {
    href: string;
    children: ReactNode;
    delay?: number;
    target?: "_self" | "_blank";
    className?: string;
};

function HoverGoButton({
    href,
    children,
    delay = 600,
    target = "_blank",
    className = "",
}: HoverGoButtonProps) {
    const timerRef = useRef<number | null>(null);
    const go = () => window.open(href, target, "noopener,noreferrer");

    const start = () => {
        if (timerRef.current) return;
        timerRef.current = window.setTimeout(go, delay);
    };
    const stop = () => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
            timerRef.current = null;
        }
    };

    useEffect(() => {
        return () => stop();
    }, []);

    return (
        <button
            type="button"
            onMouseEnter={start}
            onMouseLeave={stop}
            onFocus={start}
            onBlur={stop}
            onClick={go}
            title="호버하면 이동합니다"
            aria-label="APEC 2025 바로가기"
            className={
                "group inline-flex items-center gap-2 rounded-2xl px-5 py-3 " +
                "bg-white/90 backdrop-blur text-gray-900 font-semibold shadow " +
                "hover:shadow-lg active:scale-[0.98] transition-all " +
                className
            }
        >
            <span className="underline-offset-4 group-hover:underline">
                {children}
            </span>
            <svg
                className="size-4 translate-x-0 group-hover:translate-x-0.5 transition-transform"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
            >
                <path d="M7 17L17 7" />
                <path d="M8 7h9v9" />
            </svg>
        </button>
    );
}

export default function ApecSection() {
    const HREF = "https://apec2025.kr/kor/?menuno=85";
    const { t } = useTranslation("common");

    const [revealed, setRevealed] = useState(false);
    const hideTimer = useRef<number | null>(null);

    const show = () => {
        if (hideTimer.current) {
            clearTimeout(hideTimer.current);
            hideTimer.current = null;
        }
        setRevealed(true);
    };
    const hide = () => setRevealed(false);

    const onTouch = () => {
        show();
        if (hideTimer.current) clearTimeout(hideTimer.current);
        hideTimer.current = window.setTimeout(() => setRevealed(false), 2500);
    };

    useEffect(() => {
        return () => {
            if (hideTimer.current) clearTimeout(hideTimer.current);
        };
    }, []);

    return (
        <section className="w-full">
            <div
                className="group relative w-full aspect-[9/5] md:aspect-[21/9]"
                onMouseEnter={show}
                onMouseLeave={hide}
                onFocus={show}
                onBlur={hide}
                onTouchStart={onTouch}
            >
                <img
                    src="/img/koas-apec.png"
                    alt="APEC 관련 비주얼"
                    className="absolute inset-0 w-full h-full object-cover block"
                    loading="lazy"
                    decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

                <div
                    className={
                        "absolute left-4 right-4 bottom-4 z-10 " +
                        "flex flex-col sm:flex-row items-start sm:items-center gap-3 " +
                        (revealed
                            ? "opacity-100 translate-y-0 pointer-events-auto"
                            : "opacity-0 translate-y-1 pointer-events-none") +
                        " transition-all duration-300"
                    }
                >
                    <HoverGoButton href={HREF} delay={600} target="_blank">
                        {t("apec.button")}
                    </HoverGoButton>

                    <p className="text-white/90 text-sm sm:text-base select-none">
                        {t("apec.goSite")}
                    </p>
                </div>
            </div>
        </section>
    );
}
