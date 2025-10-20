// components/sections/CatalogSection.tsx
import { useTranslation } from "react-i18next";

export default function CatalogSection() {
    const { t, i18n, ready } = useTranslation("common");

    return (
        <div className="bg-black/30 h-50">
            {/* 로딩 중에도 기본값 출력되게 defaultValue 사용 */}
            {t("catalog.section")}

            {/* 디버그: 현재 언어 표시(화면엔 안 보임) */}
            <span className="sr-only">lang: {i18n.language} (ready: {String(ready)})</span>
        </div>
    );
}
