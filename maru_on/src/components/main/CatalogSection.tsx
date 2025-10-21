// CatalogSection.tsx
import { useState, useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";

export default function CatalogSection() {
    const { t, i18n } = useTranslation("common");
    const lang = i18n.resolvedLanguage || i18n.language || "en";

    // 언어별 PDF 매핑 (없으면 ko로 폴백)
    const pdfHref = useMemo(() => {
        const path =
            lang.startsWith("ko")
                ? "/catalog/maruon(ko).pdf"
                : lang.startsWith("en")
                    ? "/catalog/maruon(ko).pdf"
                    : "/catalog/maruon(ko).pdf"; // fallback
        return encodeURI(path);
    }, [lang]);

    const [showCta, setShowCta] = useState(false); // 모바일: 첫 탭 시 버튼 노출

    const openPdf = useCallback(() => {
        window.open(pdfHref, "_blank", "noopener");
        setShowCta(false); // 열고 나면 다시 숨김(선택)
    }, [pdfHref]);

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

                {/* 시각 오버레이 */}
                <div
                    className={[
                        "absolute inset-0 z-10 transition-colors duration-200",
                        showCta ? "bg-black/45" : "bg-transparent",
                        "md:bg-transparent md:group-hover:bg-black/45",
                        "pointer-events-none", // 시각만, 클릭 방해 X
                    ].join(" ")}
                />

                {/* 모바일 전용 터치 레이어 */}
                <button
                    type="button"
                    aria-label="카탈로그 버튼 표시"
                    className={[
                        "md:hidden absolute inset-0 z-20",
                        showCta ? "pointer-events-none" : "pointer-events-auto",
                        "bg-transparent",
                    ].join(" ")}
                    onClick={() => setShowCta(true)}
                />

                {/* 버튼*/}
                <button
                    type="button"
                    onClick={openPdf}
                    aria-label="마루온 카탈로그(PDF) 새 창에서 열기"
                    className={[
                        "absolute z-30 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
                        "text-[#eed49d] px-5 py-2 border border-white/30 bg-white/10 hover:bg-white/15",
                        "inline-flex items-center gap-2 text-sm md:text-base font-medium rounded",
                        "transition-opacity duration-200 select-none",
                        showCta ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",

                        "md:opacity-0 md:pointer-events-none md:group-hover:opacity-100 md:group-hover:pointer-events-auto",
                    ].join(" ")}
                >
                    {t("catalog.open")}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M13.172 12 8.222 7.05l1.414-1.414L16 12l-6.364 6.364-1.414-1.414z" />
                    </svg>
                </button>
            </div>
        </section>
    );
}
