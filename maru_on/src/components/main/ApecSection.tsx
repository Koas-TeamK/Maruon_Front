// ApecSection.tsx
import { useEffect, useRef, useState, useCallback } from "react";
import { Trans, useTranslation } from "react-i18next";

export default function ApecSection() {
    const HREF = "https://apec2025.kr/kor/?menuno=85";
    const { t } = useTranslation("common");

    const titleKey = t("apec.button"); //
    const titleRaw = t(titleKey);
    const ariaTitle = titleRaw.replace(/<br\s*\/?>/gi, " ");

    const [revealed, setRevealed] = useState(false);
    const hideTimer = useRef<number | null>(null);

    const clearHideTimer = () => {
        if (hideTimer.current) {
            clearTimeout(hideTimer.current);
            hideTimer.current = null;
        }
    };

    const show = useCallback(() => {
        clearHideTimer();
        setRevealed(true);
    }, []);

    const hide = useCallback(() => setRevealed(false), []);

    // 모바일: 첫 터치 시 보이게, 2.5초 뒤 자동 숨김
    const onTouch = useCallback(() => {
        show();
        clearHideTimer();
        hideTimer.current = window.setTimeout(() => setRevealed(false), 2500);
    }, [show]);

    const openSite = useCallback(() => {
        window.open(HREF, "_blank", "noopener,noreferrer");
        setRevealed(false);
    }, []);

    useEffect(() => () => clearHideTimer(), []);

    return (
        <section className="w-full">
            <div
                className="group relative w-full aspect-[9/5] md:aspect-[21/9] overflow-hidden"
                onMouseEnter={show}
                onMouseLeave={hide}
                onFocus={show}
                onBlur={hide}
                onTouchStart={onTouch}
            >
                {/* 배경 */}
                <img
                    src="/img/koas-apec.png"
                    alt="APEC 관련 비주얼"
                    className="absolute inset-0 w-full h-full object-cover block"
                    loading="lazy"
                    decoding="async"
                />

                <div
                    className={[
                        "absolute inset-0 transition-colors duration-200 pointer-events-none",
                        revealed ? "bg-black/45" : "bg-transparent",
                        "md:bg-transparent md:group-hover:bg-black/45",
                    ].join(" ")}
                />

                {/* 모바일: 오버레이 표시 트리거 */}
                <button
                    type="button"
                    aria-label={t("apec.showButton", "APEC 버튼 표시")}
                    className={[
                        "md:hidden absolute inset-0 z-10 bg-transparent",
                        revealed ? "pointer-events-none" : "pointer-events-auto",
                    ].join(" ")}
                    onClick={show}
                />

                <button
                    type="button"
                    onClick={openSite}
                    aria-label={`${ariaTitle} ${t("apec.open", "새 창에서 열기")}`}
                    className={[
                        "absolute z-20 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
                        "inline-flex items-center gap-2 px-5 py-2 rounded",
                        "text-[#eed49d] border border-white/30 bg-white/10 hover:bg-white/15",
                        "text-sm md:text-base font-medium transition-opacity duration-200 select-none",
                        revealed ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
                        "md:opacity-0 md:pointer-events-none md:group-hover:opacity-100 md:group-hover:pointer-events-auto",
                    ].join(" ")}
                >
                    <span className="text-sm md:text-base text-center">
                        <Trans ns="common" i18nKey={titleKey} components={{ br: <br /> }} />
                    </span>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        aria-hidden="true"
                    >
                        <path d="M13.172 12 8.222 7.05l1.414-1.414L16 12l-6.364 6.364-1.414-1.414z" />
                    </svg>
                </button>
            </div>
        </section>
    );
}
