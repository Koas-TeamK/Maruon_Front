//CatalogSection.tsx

//import { useTranslation } from "react-i18next";

export default function CatalogSection() {
    return (
        <section className="w-full">
            {/* 화면폭에 비례해 높이가 정해지는 컨테이너 */}
            <div className="relative w-full aspect-[9/5] md:aspect-[21/9]">
                <img
                    src="/img/catalog.png"
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover block"
                    loading="lazy"
                    decoding="async"
                />
            </div>
        </section>
    );
}
