import CatalogSection from "@/components/main/CatalogSection"
import ApecSection from "@/components/main/ApecSection"
import PurchaseSection from "@/components/main/PurchaseSection"

export default function MainPage() {
    return (
        <div className="grid grid-cols-1 grid-rows-[1fr_1fr_2fr] ">
            <CatalogSection />
            <ApecSection />
            <PurchaseSection />
        </div>
    )
}