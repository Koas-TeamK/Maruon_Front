//PurchaseSection.tsx
import ProductTile from "./ProductTile";

export default function PurchaseSection() {
    return (
        <section className="w-full">
            <div className="flex gap-0 aspect-[3/2] ">
                <ProductTile
                    className="relative flex-1"
                    imgSrc="/img/maruon-high.png"
                    titleKey="purchase.high.title"
                    altKey="purchase.high.alt"
                    href="#"
                />
                <ProductTile
                    className="relative flex-1"
                    imgSrc="/img/maruon-mid.png"
                    titleKey="purchase.middle.title"
                    altKey="purchase.middle.alt"
                    href="#"
                />
            </div>
        </section>
    );
}
