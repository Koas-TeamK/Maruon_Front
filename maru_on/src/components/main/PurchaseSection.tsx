//PurchaseSection.tsx
import ProductTile from "./ProductTile";

export default function PurchaseSection() {
    return (
        <section className="w-full">
            <div className="flex flex-col md:flex-row gap-0 aspect-[2/3] md:aspect-[5/3] bg-white">
                <ProductTile
                    className="relative flex-1"
                    imgSrc="/img/high-chair.png"
                    titleKey="purchase.high.title"
                    altKey="purchase.high.alt"
                    descKey="purchase.high.desc"
                    priceKey="purchase.high.price"
                    href="/purchase/high-chair"
                />
                <ProductTile
                    className="relative flex-1"
                    imgSrc="/img/middle-chair.png"
                    titleKey="purchase.middle.title"
                    altKey="purchase.middle.alt"
                    descKey="purchase.middle.desc"
                    priceKey="purchase.middle.price"
                    href="/purchase/middle-chair"
                />
            </div>
        </section>
    );
}
