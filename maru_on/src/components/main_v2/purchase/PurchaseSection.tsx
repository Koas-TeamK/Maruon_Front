// PurchaseSection.tsx
import { useState, useCallback } from "react";
import { Trans, useTranslation } from "react-i18next";
import { motion, AnimatePresence, type Variants, type Transition } from "framer-motion";
import "./PurchaseSection.css";

export default function PurchaseSection() {
    const { t } = useTranslation("common");
    const highChair = "/img/chair/high-chair.png";
    const midChair = "/img/chair/mid-chair.png";
    const purchaseLink = "https://brand.naver.com/koasshop/products/12597423706";

    // 이미지 전환 상태
    const [variant, setVariant] = useState<"high" | "mid">("high");
    const showHigh = useCallback(() => setVariant("high"), []);
    const showMid = useCallback(() => setVariant("mid"), []);
    const next = useCallback(() => setVariant((v) => (v === "high" ? "mid" : "high")), []);
    const prev = useCallback(() => setVariant((v) => (v === "mid" ? "high" : "mid")), []);

    /* ===== 모션 설정(텍스트 스태거 + 부드러운 이징) ===== */
    const softEase: Transition = {
        duration: 1.1,
        ease: "easeInOut", // 더 부드럽게 하려면: ease: [0.16, 1, 0.3, 1] as any
    };

    const container: Variants = {
        hidden: {},
        show: {
            transition: {
                staggerChildren: 0.14,
                delayChildren: 0.15,
            },
        },
    };

    const fadeUp: Variants = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: softEase },
    };

    // 이미지 전환 모션(교차 페이드 + 살짝 슬라이드)
    const imgEnter: Variants = {
        hidden: { opacity: 0, y: 12 },
        show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
        exit: { opacity: 0, y: -12, transition: { duration: 0.45, ease: "easeIn" } },
    };

    return (
        <section className="w-full h-full bg-[linear-gradient(to_bottom,white_0%,white_66%,#c8bdb6_66%,#c8bdb6_100%)]">
            {/* 내용 */}
            <div className="w-full h-full flex flex-col lg:flex-row">
                {/* 왼쪽: 타이틀, 구매 버튼 */}
                <div
                    className="
            lg:w-1/3 lg:h-full w-full h-1/2
            text-[#403736]
            flex items-center justify-center sm:justify-start
            text-center sm:text-left
          "
                >
                    {/* 텍스트 블록: 스태거 모션 */}
                    <motion.div
                        className="
              flex flex-col gap-2 justify-center
              items-center sm:items-start
              lg:mb-30
              ml-0 sm:ml-10
            "
                        variants={container}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: false, amount: 0.35 }}  // 다시 들어올 때마다 재생
                    >
                        {/* 타이틀 */}
                        <motion.div variants={fadeUp} className="w-full">
                            <h1
                                className="
                  mb-3
                  lg:text-8xl md:text-8xl text-6xl
                  text-center sm:text-left
                  font-JoseonSolidGothic
                "
                            >
                                <Trans ns="common" i18nKey="title.title" components={{ br: <br /> }} />
                            </h1>
                        </motion.div>

                        {/* 일반용 설명 (sm 이상) */}
                        <motion.div variants={fadeUp} className="hidden sm:flex">
                            <div className="mb-5 lg:text-1xl md:text-base text-sm text-left">
                                <Trans ns="common" i18nKey="title.desc" components={{ br: <br /> }} />
                            </div>
                        </motion.div>

                        {/* 모바일용 설명 (sm 미만) */}
                        <motion.div variants={fadeUp} className="sm:hidden w-full">
                            <div className="mb-5 lg:text-1xl md:text-base text-sm text-center">
                                <Trans ns="common" i18nKey="title.descM" components={{ br: <br /> }} />
                            </div>
                        </motion.div>

                        {/* 구매 버튼 */}
                        <motion.div variants={fadeUp} className="w-full flex justify-center sm:justify-start">
                            <a
                                href={purchaseLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block"
                                aria-label={t("title.buy")}
                            >
                                <motion.button
                                    type="button"
                                    className="buy-btn inline-flex items-center gap-2 bg-transparent"
                                    whileTap={{ scale: 0.97 }}
                                    whileHover={{ x: 2 }}
                                >
                                    <p data-text={t("title.buy")}>
                                        <Trans ns="common" i18nKey="title.buy" components={{ br: <br /> }} />
                                    </p>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-8 w-8"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={4}
                                        aria-hidden="true"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </motion.button>
                            </a>
                        </motion.div>
                    </motion.div>
                </div>

                {/* 오른쪽: 의자 이미지 (화살표/점 전환) */}
                <div
                    className="
            relative 
            lg:w-2/3 lg:h-full w-full h-1/2
            select-none
          "
                    role="img"
                    aria-label={variant === "high" ? "High-back chair" : "Mid-back chair"}
                >
                    <AnimatePresence mode="wait" initial={false}>
                        {variant === "high" ? (
                            <motion.img
                                key="high"
                                src={highChair}
                                alt="High-back chair"
                                variants={imgEnter}
                                initial="hidden"
                                animate="show"
                                exit="exit"
                                className="
                  absolute left-1/2 -translate-x-1/2 
                  sm:bottom-20 bottom-10
                  lg:w-[29rem] md:w-[29rem] sm:w-[24rem] w-[18rem] h-auto
                "
                                draggable={false}
                            />
                        ) : (
                            <motion.img
                                key="mid"
                                src={midChair}
                                alt="Mid-back chair"
                                variants={imgEnter}
                                initial="hidden"
                                animate="show"
                                exit="exit"
                                className="
                  absolute left-1/2 -translate-x-1/2 
                  sm:bottom-20 bottom-10
                  lg:w-[29rem] md:w-[29rem] sm:w-[24rem] w-[18rem] h-auto
                "
                                draggable={false}
                            />
                        )}
                    </AnimatePresence>

                    {/* 전환 컨트롤: 화살표 + 점 (미니멀) */}
                    <div className="absolute left-1/2 -translate-x-1/2 bottom-2 sm:bottom-6 flex items-center gap-3 sm:gap-4">
                        {/* prev */}
                        <button
                            type="button"
                            onClick={prev}
                            aria-label="Previous image"
                            className="
                p-2 sm:p-3 text-[#403736]
                hover:opacity-80 active:opacity-70
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#403736]/40
              "
                        >
                            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>

                        {/* 점(인디케이터) */}
                        <div className="flex items-center gap-2">
                            <button
                                type="button"
                                onClick={showHigh}
                                aria-pressed={variant === "high"}
                                aria-label="Show high-back"
                                className={`
                  h-2.5 w-2.5 rounded-full
                  ${variant === "high" ? "bg-[#403736]" : "bg-black/30"}
                  ring-1 ring-black/10
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#403736]/40
                `}
                            />
                            <button
                                type="button"
                                onClick={showMid}
                                aria-pressed={variant === "mid"}
                                aria-label="Show mid-back"
                                className={`
                  h-2.5 w-2.5 rounded-full
                  ${variant === "mid" ? "bg-[#403736]" : "bg-black/30"}
                  ring-1 ring-black/10
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#403736]/40
                `}
                            />
                        </div>

                        {/* next */}
                        <button
                            type="button"
                            onClick={next}
                            aria-label="Next image"
                            className="
                p-2 sm:p-3 text-[#403736]
                hover:opacity-80 active:opacity-70
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#403736]/40
              "
                        >
                            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
