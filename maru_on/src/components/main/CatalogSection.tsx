// CatalogSection.tsx
import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";

export default function CatalogSection() {
    const { t, i18n } = useTranslation("common");
    const lang = i18n.resolvedLanguage || i18n.language || "en";

    const pdfHref = useMemo(() => {
        const path =
            lang.startsWith("ko")
                ? "/catalog/maruon(ko).pdf"
                : lang.startsWith("en")
                    ? "/catalog/maruon(en).pdf"
                    : "/catalog/maruon(ko).pdf";
        return encodeURI(path);
    }, [lang]);

    const [revealed, setRevealed] = useState(false);
    const hideTimer = useRef<number | null>(null);

    const clearHideTimer = useCallback(() => {
        if (hideTimer.current) {
            clearTimeout(hideTimer.current);
            hideTimer.current = null;
        }
    }, []);

    const armAutoHide = useCallback(() => {
        clearHideTimer();
        hideTimer.current = window.setTimeout(() => setRevealed(false), 2500);
    }, [clearHideTimer]);

    const show = useCallback(() => {
        setRevealed(true);
        armAutoHide();
    }, [armAutoHide]);

    const hide = useCallback(() => {
        clearHideTimer();
        setRevealed(false);
    }, [clearHideTimer]);

    // 모바일: 첫 터치 → 보이기(+타이머), 다시 터치 → 숨기기
    const onTouch = useCallback(() => {
        if (!revealed) {
            show();
        } else {
            hide();
        }
    }, [revealed, show, hide]);

    // PDF 열기 + 즉시 숨기기
    const openPdf = useCallback(() => {
        window.open(pdfHref, "_blank", "noopener,noreferrer");
        hide();
    }, [pdfHref, hide]);

    useEffect(() => () => clearHideTimer(), [clearHideTimer]);

    return (
        <section
            className="
          group relative w-full  h-full overflow-hidden
          bg-[url('/img/catalog.png')] bg-cover bg-no-repeat
          bg-[position:50%_50%] transition-[background-position] duration-500
          hover:bg-[position:50%_30%] focus:bg-[position:50%_30%]
        "
            onMouseEnter={show}
            onMouseLeave={hide}
            onFocus={show}
            onBlur={hide}
            onTouchStart={onTouch}
        >
            {/* 오버레이: 반드시 같은 래퍼 안, 그리고 pointer-events-none */}
            <div
                className={[
                    "absolute inset-0 transition-colors duration-200 pointer-events-none",
                    revealed ? "bg-black/45" : "bg-transparent",
                    "md:bg-transparent md:group-hover:bg-black/45",
                ].join(" ")}
            />

            {/* CTA 버튼: 같은 래퍼 안에서 absolute */}
            <button
                type="button"
                onClick={openPdf}
                className={[
                    "absolute z-20 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
                    "inline-flex items-center gap-2 px-5 py-2 rounded",
                    "text-[#eed49d] border border-white/30 bg-white/10 hover:bg-white/15",
                    "text-sm md:text-base font-medium transition-opacity duration-200 select-none",
                    revealed ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
                    "md:opacity-0 md:pointer-events-none md:group-hover:opacity-100 md:group-hover:pointer-events-auto",
                ].join(" ")}
            >
                {t("catalog.open", "View Catalog (PDF)")}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M13.172 12 8.222 7.05l1.414-1.414L16 12l-6.364 6.364-1.414-1.414z" />
                </svg>
            </button>
        </section>
    );
}
