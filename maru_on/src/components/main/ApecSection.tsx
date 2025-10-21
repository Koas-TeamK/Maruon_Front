//ApecSection.tsx

//import { useTranslation } from "react-i18next";

export default function ApecSection() {
    return (
        <section className="w-full">
            <div className="relative w-full aspect-[9/5] md:aspect-[21/9]">
                <img
                    src="/img/koas-apec.png"
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover block"
                    loading="lazy"
                    decoding="async"
                />
            </div>
        </section>
    );
}
