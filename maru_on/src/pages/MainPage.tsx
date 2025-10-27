//MainPage.tsx
import { useTranslation } from "react-i18next";
import CatalogSection from "@/components/main/CatalogSection";
import ApecSection from "@/components/main/ApecSection";
import PurchaseSection from "@/components/main/PurchaseSection";

export default function MainPage() {
    const { i18n } = useTranslation("common");
    const lang = i18n.resolvedLanguage || i18n.language || "en";


    return (
        <main className="flex flex-col min-h-[100svh] bg-[#403736]">
            {/* 1) vh → svh  2) 마진 콜랩스 방지: overflow-hidden (또는 pt-px) */}
            <section className="h-[50svh] overflow-hidden [&_*]:m-0">
                <CatalogSection lang={lang} />
            </section>

            <section className="h-[50svh] overflow-hidden [&_*]:m-0">
                <ApecSection lang={lang} />
            </section>

            <section className="h-[35svh] overflow-hidden [&_*]:m-0">
                <PurchaseSection />
            </section>
        </main>
    );
}