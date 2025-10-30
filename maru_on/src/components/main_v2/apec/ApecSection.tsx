// src/components/main/ApecSection.tsx
import { useEffect, useRef, useCallback, useMemo, useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import "./ApecSection.css";

export default function ApecSection({ lang }: { lang: string }) {
    const HREF = "/leaflet/apec%20leaflet.pdf";
    const { t } = useTranslation();

    const [showMobileBtn, setShowMobileBtn] = useState(false);
    const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    const clearHideTimer = useCallback(() => {
        if (hideTimer.current) {
            clearTimeout(hideTimer.current);
            hideTimer.current = null;
        }
    }, []);

    const isBelowLg = () => window.matchMedia("(max-width: 1023.98px)").matches;

    const onSectionClick = useCallback(() => {
        if (!isBelowLg()) return;
        if (showMobileBtn) {
            clearHideTimer();
            setShowMobileBtn(false);
        } else {
            setShowMobileBtn(true);
            clearHideTimer();
            hideTimer.current = setTimeout(() => setShowMobileBtn(false), 2500);
        }
    }, [showMobileBtn, clearHideTimer]);

    const openSite = useCallback((e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        window.open(HREF, "_blank", "noopener,noreferrer");
    }, []);

    useEffect(() => () => clearHideTimer(), [clearHideTimer]);

    const imgSrc = useMemo(() => {
        const prefix = lang?.toLowerCase().split("-")[0] || "en";
        const map: Record<string, "(ko)" | "(en)" | "(zh)"> = { ko: "(ko)", en: "(en)", zh: "(zh)" };
        const suffix = map[prefix] ?? "(en)";
        return encodeURI(`/img/apec/apec${suffix}.png`);
    }, [lang]);

    return (
        <section
            onClick={onSectionClick}
            className={[
                "group w-full min-h-[100svh] overflow-hidden relative",
                "bg-no-repeat bg-cover bg-[#1E2950]",
                "transition-[background-position] duration-500",
                "2xl:bg-size-[auto_1600px] xl:bg-size-[auto_1100px] lg:bg-size-[auto_800px] md:bg-size-[auto_1000px] sm:bg-size-[auto_2000px] bg-size-[auto_800px]",
                "2xl:bg-[position:100%_50%] xl:bg-[position:100%_50%] lg:bg-[position:50%_100%] md:bg-[position:50%_10%] sm:bg-[position:50%_150%] bg-[position:50%_140%]",
            ].join(" ")}
            style={{ backgroundImage: `url("${imgSrc}")` }}
        >
            {/* 어둡게 오버레이 */}
            {showMobileBtn && (
                <div
                    className="fixed inset-0 lg:hidden bg-black/60 z-40 transition-opacity duration-300"
                    onClick={(e) => {
                        e.stopPropagation();
                        clearHideTimer();
                        setShowMobileBtn(false);
                    }}
                />
            )}

            {/* 버튼 컨테이너 */}
            <div
                className="
          absolute inset-x-0 lg:inset-auto
          lg:right-70 lg:top-1/2 lg:-translate-y-1/2
          flex flex-col items-center lg:items-end justify-center gap-4
          z-50
        "
            >
                {/* 데스크탑(>=lg) */}
                <div className="hidden lg:block">
                    <button type="button" onClick={openSite} className="apec-button flex">
                        <p className="text-sm md:text-base text-center" data-text={t("apec.button", "View Leaflet")}>
                            <Trans ns="common" i18nKey="apec.button" components={{ br: <br /> }} />
                        </p>
                        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>

                {/* 모바일(<lg): 화면 중앙 */}
                <div
                    className={[
                        "lg:hidden fixed inset-0 grid place-items-center transition-opacity duration-300",
                        showMobileBtn ? "opacity-100 z-50" : "opacity-0 pointer-events-none",
                    ].join(" ")}
                >
                    <button
                        type="button"
                        onClick={openSite}
                        className="apec-button flex"
                    >
                        <p className="text-sm text-center" data-text={t("apec.button", "View Leaflet")}>
                            <Trans ns="common" i18nKey="apec.button" />
                        </p>
                        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            </div>
        </section>
    );
}
