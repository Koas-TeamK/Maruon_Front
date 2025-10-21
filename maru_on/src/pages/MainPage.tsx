//MainPage.tsx
import CatalogSection from "@/components/main/CatalogSection";
import ApecSection from "@/components/main/ApecSection";
import PurchaseSection from "@/components/main/PurchaseSection";

export default function MainPage() {
    return (
        <main className="grid grid-cols-1 gap-0 [&>*]:m-0 [&>*]:p-0">
            <CatalogSection />
            <ApecSection />
            <PurchaseSection />
        </main>
    );
}