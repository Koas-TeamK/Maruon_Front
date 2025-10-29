// ApecSection.tsx
import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { Trans, useTranslation } from "react-i18next";

export default function ApecSection({ lang }: { lang: string }) {
    //console.log("[lang]", lang);
    const HREF = "/leaflet/apec%20leaflet.pdf";
    const { t } = useTranslation("common");

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

    const toggleReveal = useCallback((e?: React.SyntheticEvent) => {
        if (e) {
            // 터치→클릭 중복 방지 + 부모로 버블링 방지
            e.preventDefault?.();
            e.stopPropagation?.();
        }
        setRevealed(prev => {
            const next = !prev;
            clearHideTimer();
            if (next) armAutoHide();
            return next;
        });
    }, [armAutoHide, clearHideTimer]);

    const openSite = useCallback((e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        window.open(HREF, "_blank", "noopener,noreferrer");
        setRevealed(false);
    }, []);

    useEffect(() => () => clearHideTimer(), [clearHideTimer]);

    //언어별 이미지 변경
    const imgSrc = useMemo(() => {
        const prefix = lang?.toLowerCase().split("-")[0] || "en";
        const map: Record<string, "(ko)" | "(en)" | "(zh)"> = { ko: "(ko)", en: "(en)", zh: "(zh)" };
        const suffix = map[prefix] ?? "(en)";
        return encodeURI(`/img/apec/apec${suffix}.png`);
    }, [lang]);

    return (
        <section
            className={[
                "group relative w-full h-full overflow-hidden",
                "bg-no-repeat bg-cover",
                "bg-[position:50%_50%] transition-[background-position] duration-500",
                "hover:bg-[position:50%_30%] focus:bg-[position:50%_30%]"
            ].join(" ")}
            style={{ backgroundImage: `url("${imgSrc}")` }}  //동적 URL은 inline style로
            onMouseEnter={show}
            onMouseLeave={hide}
            onFocus={show}
            onBlur={hide}
        >
        </section>
    );
}
