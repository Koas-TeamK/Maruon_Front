// ProductTile.tsx
import { useState } from "react";
import { Trans, useTranslation } from "react-i18next";

type ProductTileProps = {
    className?: string;
    imgSrc: string;
    titleKey: string;
    altKey: string;
    href: string;
};

export default function ProductTile({
    className = "",
    imgSrc,
    titleKey,
    altKey,
    href,
}: ProductTileProps) {
    const { t } = useTranslation("common");
    const [open, setOpen] = useState(false);

    const titleRaw = t(titleKey); // 예: "MARUON<br/>PREMIUM CHAIR"
    const alt = t(altKey);
    const ariaTitle = titleRaw.replace(/<br\s*\/?>/gi, " ");

    return (
        <div className={`group relative w-full h-full overflow-hidden select-none ${className}`}>
            {/* 모바일 탭 토글 */}
            <button
                type="button"
                className={`absolute inset-0 md:hidden ${open ? "hidden" : "z-10"}`}
                aria-label={`${ariaTitle} details`}
                onClick={() => setOpen((v) => !v)}
            />

            {/* 이미지 */}
            <img
                src={imgSrc}
                alt={alt}
                className={[
                    "absolute inset-0 w-full h-full object-cover block",
                    "transition-transform duration-300 ease-out will-change-transform",
                    open ? "scale-105" : "scale-100 md:group-hover:scale-105",
                ].join(" ")}
            />

            {/* 오버레이 */}
            <div
                className={[
                    "pointer-events-none absolute inset-0",
                    "bg-black/60 backdrop-blur-sm text-[#eed49d]",
                    "flex items-center justify-center p-6 text-center",
                    "transition-opacity duration-200 ease-out",
                    open ? "opacity-100" : "opacity-0 md:group-hover:opacity-100",
                ].join(" ")}
            >
                <div className="pointer-events-auto space-y-3">
                    <div className="text-base md:text-lg font-semibold">
                        <Trans ns="common" i18nKey={titleKey} components={{ br: <br /> }} />
                    </div>

                    <div className="mt-2">
                        <a
                            href={href}
                            className="inline-flex items-center gap-2 border border-white/30 bg-white/10 px-5 py-2 text-sm md:text-base hover:bg-white/20 transition"
                        >
                            {t("purchase.buy")}
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M13.172 12 8.222 7.05l1.414-1.414L16 12l-6.364 6.364-1.414-1.414z" />
                            </svg>
                        </a>
                    </div>

                    <button
                        type="button"
                        className="md:hidden mt-2 text-xs underline opacity-80"
                        onClick={() => setOpen(false)}
                    >
                        X
                    </button>
                </div>
            </div>
        </div>
    );
}
