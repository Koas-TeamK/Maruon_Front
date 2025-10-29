// MainPage.tsx
import { useTranslation } from "react-i18next";
import "./MainPage.css";
import PurchaseSection from "@/components/main_v2/purchase/PurchaseSection";
import CatalogSection from "@/components/main_v2/catalog/CatalogSection";
import ApecSection from "@/components/main_v2/apec/ApecSection";
import { motion, type Variants } from "framer-motion";

// 섹션 래퍼: 섹션 들어올 때 컨텐츠가 '딱' 등장
const sectionVariants: Variants = {
    hidden: { opacity: 0, y: 36, filter: "blur(2px)" },
    show: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: {
            type: "tween",
            duration: 2,
            ease: [0.22, 1, 0.36, 1],
            staggerChildren: 0.06,
            delayChildren: 0.04
        }
    }
};

function SnapSection({ children }: { children: React.ReactNode }) {
    return (
        <section className="snap-start snap-always h-[100svh] w-full">
            <motion.div
                className="h-full w-full"
                variants={sectionVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ amount: 0.6, once: false }} // 60% 들어오면 발동
            >
                {children}
            </motion.div>
        </section>
    );
}

export default function MainPage() {
    const { i18n } = useTranslation("common");
    const lang = i18n.resolvedLanguage || i18n.language || "en";

    return (
        // 스냅 스크롤 컨테이너
        <main
            className="
        h-[100svh] w-full overflow-y-auto
        snap-y snap-mandatory
        overscroll-contain
        hide-scrollbar
      "
            // iOS 자연 관성 유지. scrollBehavior는 빼서 스냅만 작동.
            style={{ WebkitOverflowScrolling: "touch" }}
        >
            {/* 섹션 1 */}
            <SnapSection>
                <PurchaseSection />
            </SnapSection>

            {/* 섹션 2 */}
            <SnapSection>
                <CatalogSection lang={lang} />
            </SnapSection>

            {/* 섹션 3 */}
            <SnapSection>
                <ApecSection lang={lang} />
            </SnapSection>

            {/* 섹션 4 (비워둔 자리) */}
            <SnapSection>
                <div className="h-full w-full" />
            </SnapSection>
        </main>
    );
}
