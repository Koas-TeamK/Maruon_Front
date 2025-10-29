// components/layout/Header.tsx
import { LanguageIcon } from "@heroicons/react/24/solid";
import Menu from "@/components/menu/Menu";
import { useEffect, useMemo, useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import "./Header.css";

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [langHint, setLangHint] = useState<string | null>(null);
    const { i18n, t } = useTranslation();

    // 글라이더/라디오 순서와 동일해야 함 (silver → gold → platinum)
    // silver=en, gold=ko, platinum=zh 로 매핑
    const LANG_ORDER = ["en", "ko", "zh"] as const;
    const LANG_LABEL: Record<string, string> = { en: "English", ko: "한국어", zh: "中文" };

    // i18n.language 를 en/ko/zh 중 하나로 표준화
    const currentLang = useMemo<"en" | "ko" | "zh">(() => {
        const cur = i18n.language || "en";
        if (cur.startsWith("ko")) return "ko";
        if (cur.startsWith("zh")) return "zh";
        return "en";
    }, [i18n.language]);

    const toHtmlLang = (lng: "en" | "ko" | "zh") => (lng === "zh" ? "zh-CN" : lng);

    // 공통 언어 변경 함수 (라디오/모바일 버튼 모두 이 함수 사용)
    const setLanguage = useCallback(
        async (next: "en" | "ko" | "zh") => {
            await i18n.changeLanguage(next);
            document.documentElement.lang = toHtmlLang(next);
            setLangHint(LANG_LABEL[next]);
            try {
                localStorage.setItem("i18nextLng", next);
            } catch { }
            window.setTimeout(() => setLangHint(null), 1200);
        },
        [i18n]
    );

    // 모바일: 다음 언어로 순환
    const toggleLang = useCallback(() => {
        const idx = LANG_ORDER.findIndex((l) => l === currentLang);
        const next = LANG_ORDER[(idx + 1) % LANG_ORDER.length];
        setLanguage(next);
    }, [currentLang, setLanguage]);

    // 초기 진입 시 html lang/배지 동기화 → "처음부터 현재 언어" 표시
    useEffect(() => {
        document.documentElement.lang = toHtmlLang(currentLang);
        setLangHint(LANG_LABEL[currentLang]);
        const id = window.setTimeout(() => setLangHint(null), 1200);
        return () => window.clearTimeout(id);
    }, [currentLang]);

    return (
        <header className="fixed inset-x-0 top-0 z-[100] grid grid-cols-[1fr_auto_1fr] items-center p-3">
            <div className="justify-self-start" />

            {/* 중앙 로고 */}
            <div className="justify-self-center">
                <img
                    src="/logo/maruon-logo.png"
                    alt="MARUON"
                    className="w-11 h-auto max-h-full lg:w-18 mt-2"
                />
            </div>

            {/* 오른쪽 컨트롤 */}
            <div className="justify-self-end flex items-center gap-2">
                {/* >= sm: 라디오(글래스 토글) — ★ ID는 CSS와 동일하게 유지 */}
                <div className="hidden sm:block">
                    <div className="glass-radio-group">
                        {/* silver => English */}
                        <input
                            type="radio"
                            name="lang"
                            id="glass-silver"
                            checked={currentLang === "en"}
                            onChange={() => setLanguage("en")}
                        />
                        <label htmlFor="glass-silver">English</label>

                        {/* gold => 한국어 */}
                        <input
                            type="radio"
                            name="lang"
                            id="glass-gold"
                            checked={currentLang === "ko"}
                            onChange={() => setLanguage("ko")}
                        />
                        <label htmlFor="glass-gold">한국어</label>

                        {/* platinum => 中文 */}
                        <input
                            type="radio"
                            name="lang"
                            id="glass-platinum"
                            checked={currentLang === "zh"}
                            onChange={() => setLanguage("zh")}
                        />
                        <label htmlFor="glass-platinum">中文</label>

                        {/* 글라이더: 반드시 마지막 형제여야 함 */}
                        <div className="glass-glider" />
                    </div>
                </div>

                {/* < sm: 아이콘 버튼(순환) */}
                <div className="relative flex justify-end items-center gap-1 sm:hidden">
                    <button
                        type="button"
                        aria-label={t("changeLanguage", "Change language")}
                        title={`${LANG_LABEL[currentLang]} → ${LANG_LABEL[LANG_ORDER[(LANG_ORDER.indexOf(currentLang) + 1) % LANG_ORDER.length]]
                            }`}
                        onClick={toggleLang}
                        className="relative p-2 hover:opacity-80 active:opacity-60"
                    >
                        <LanguageIcon className="w-6 h-6 fill-[#403736]" />
                        {langHint && (
                            <span
                                className="absolute top-full left-1/2 -translate-x-1/2 mt-1
                           inline-block pointer-events-none z-50
                           whitespace-nowrap [word-break:keep-all]
                           text-center leading-none rounded-full px-2 py-0.5 text-xs font-medium
                           bg-black/80 text-white shadow"
                            >
                                {langHint}
                            </span>
                        )}
                    </button>
                </div>
            </div>

            {/* 스크린리더 알림 */}
            <div className="sr-only" aria-live="polite">
                {langHint ? `언어가 ${langHint}로 변경되었습니다.` : ""}
            </div>

            <Menu open={menuOpen} onClose={() => setMenuOpen(false)} />
        </header>
    );
}
