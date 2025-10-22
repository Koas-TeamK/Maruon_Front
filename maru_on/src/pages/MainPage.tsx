//MainPage.tsx
import CatalogSection from "@/components/main/CatalogSection";
import ApecSection from "@/components/main/ApecSection";
import PurchaseSection from "@/components/main/PurchaseSection";

export default function MainPage() {
    return (
        <main className="flex flex-col gap-0 [&>*]:m-0 [&>*]:p-0">
            <div className="h-1/2">
                <CatalogSection />
                <ApecSection />
            </div>
            <div className="h-1/2">
                <PurchaseSection />
            </div>
        </main>
    );
}