//MainPage.tsx
import CatalogSection from "@/components/main/CatalogSection";
import ApecSection from "@/components/main/ApecSection";
import PurchaseSection from "@/components/main/PurchaseSection";

export default function MainPage() {
    return (
        <main className="flex flex-col [&>*]:m-0 [&>*]:p-0">
            <section className="h-[50vh]"><CatalogSection /></section>
            <section className="h-[50vh]"><ApecSection /></section>
            <section className="h-[50vh]"><PurchaseSection /></section>
        </main>
    );
}