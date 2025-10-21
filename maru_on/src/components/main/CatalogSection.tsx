// CatalogSection.tsx
import { useState, useCallback, useMemo, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";

export default function CatalogSection() {
    const { t, i18n } = useTranslation("common");
    const lang = i18n.resolvedLanguage || i18n.language || "en";

    // 언어별 PDF 매핑 (필요 시 en 경로로 교체)
    const pdfHref = useMemo(() => {
        const path =
            lang.startsWith("ko")
                ? "/catalog/maruon(ko).pdf"
                : lang.startsWith("en")
                    ? "/catalog/maruon(en).pdf" // en 파일이 없다면 ko로 바꿔도 됨
                    : "/catalog/maruon(ko).pdf";
        return encodeURI(path);
    }, [lang]);

    // 모바일: 첫 탭 시 버튼 노출 + 자동 숨김 타이머
    const [showCta, setShowCta] = useState(false);
    const hideTimer = useRef<number | null>(null);

    const clearHideTimer = () => {
        if (hideTimer.current) {
            clearTimeout(hideTimer.current);
            hideTimer.current = null;
        }
    };

    const revealOnce = () => {
        clearHideTimer();
        setShowCta(true);
        hideTimer.current = window.setTimeout(() => setShowCta(false), 2500); // 시간 지나면 사라짐
    };

    const openPdf = useCallback(() => {
        window.open(pdfHref, "_blank", "noopener");
        setShowCta(false); // 열고 나면 숨김
        clearHideTimer();
    }, [pdfHref]);

    useEffect(() => () => clearHideTimer(), []);

    return (
        <section className="w-full">
            <div className="group relative w-full aspect-[9/5] md:aspect-[21/9] overflow-hidden">
                {/* 배경 이미지 */}
                <img
                    src="/img/catalog.png"
                    sizes="100vw"
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover block"
                    loading="lazy"
                    decoding="async"
                />

                {/* 시각 오버레이: 모바일 showCta / 데스크탑 hover */}
                <div
                    className={[
                        "absolute inset-0 z-10 transition-colors duration-200 pointer-events-none",
                        showCta ? "bg-black/45" : "bg-transparent",
                        "md:bg-transparent md:group-hover:bg-black/45",
                    ].join(" ")}
                />

                {/* 모바일 전용 터치 레이어: 첫 탭 → 버튼 표시, 표시된 동안은 비활성화 */}
                <button
                    type="button"
                    aria-label={t("catalog.showButton", "카탈로그 버튼 표시")}
                    className={[
                        "md:hidden absolute inset-0 z-20 bg-transparent",
                        showCta ? "pointer-events-none" : "pointer-events-auto",
                    ].join(" ")}
                    onClick={revealOnce}
                />

                {/* 중앙 버튼: 모바일 showCta일 때만 / 데스크탑 hover일 때만 */}
                <button
                    type="button"
                    onClick={openPdf}
                    aria-label={t("catalog.openAria", "카탈로그(PDF) 새 창에서 열기")}
                    className={[
                        "absolute z-30 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
                        "inline-flex items-center gap-2 px-5 py-2 rounded",
                        "text-[#eed49d] border border-white/30 bg-white/10 hover:bg-white/15",
                        "text-sm md:text-base font-medium transition-opacity duration-200 select-none",
                        // 모바일: showCta일 때만 보임
                        showCta ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
                        // 데스크탑: hover 시 보임
                        "md:opacity-0 md:pointer-events-none md:group-hover:opacity-100 md:group-hover:pointer-events-auto",
                    ].join(" ")}
                >
                    {t("catalog.open", "View Catalog (PDF)")}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M13.172 12 8.222 7.05l1.414-1.414L16 12l-6.364 6.364-1.414-1.414z" />
                    </svg>
                </button>
            </div>
        </section>
    );
}
