//MainPage.tsx
import CatalogSection from "@/components/main/CatalogSection";
import ApecSection from "@/components/main/ApecSection";
import PurchaseSection from "@/components/main/PurchaseSection";

export default function MainPage() {
    return (
        <main className="flex flex-col min-h-[100svh] bg-[#403736]">
            {/* 1) vh → svh  2) 마진 콜랩스 방지: overflow-hidden (또는 pt-px) */}
            <section className="h-[50svh] overflow-hidden [&_*]:m-0">
                <CatalogSection />
            </section>

            <section className="h-[50svh] overflow-hidden [&_*]:m-0">
                <ApecSection />
            </section>

            <section className="h-[35svh] overflow-hidden [&_*]:m-0">
                <PurchaseSection />
            </section>
        </main>
    );
}