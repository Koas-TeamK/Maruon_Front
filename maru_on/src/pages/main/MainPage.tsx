// MainPage.tsx
import { useTranslation } from "react-i18next";
import "./MainPage.css";
import PurchaseSection from "@/components/main_v2/purchase/PurchaseSection";
import CatalogSection from "@/components/main_v2/catalog/CatalogSection";
import ApecSection from "@/components/main_v2/apec/ApecSection";

export default function MainPage() {
    const { i18n } = useTranslation("common");
    const lang = i18n.resolvedLanguage || i18n.language || "en";

    return (
        // 스냅 스크롤 컨테이너
        <main
            className="
            h-[100svh] w-full overflow-y-auto
            snap-y snap-mandatory
            overscroll-contain
            hide-scrollbar
            "
            // iOS 부드러운 스크롤
            style={{ WebkitOverflowScrolling: "touch", scrollBehavior: "smooth" }}
        >
            {/* 섹션 1 */}
            <section className="snap-start snap-always h-[100svh] w-full">
                <PurchaseSection />
            </section>

            {/* 섹션 2 */}
            <section className="snap-start snap-always h-[100svh] w-full">
                <CatalogSection lang={lang} />
            </section>

            {/* 섹션 3 */}
            <section className="snap-start snap-always h-[100svh] w-full">
                <ApecSection lang={lang} />
            </section>

            {/* 섹션 4 */}
            <section className="snap-start snap-always h-[100svh] w-full">
            </section>
        </main>
    );
}
