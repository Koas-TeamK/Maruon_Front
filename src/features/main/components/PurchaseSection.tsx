// PurchaseSection.tsx
import { useState, useCallback } from "react";
import { Trans, useTranslation } from "react-i18next";
import { motion, AnimatePresence, type Variants, type Transition } from "framer-motion";
import "./PurchaseSection.css";

export default function PurchaseSection() {
    const { t } = useTranslation("common");
    const highChair = "/img/chair/high-chair.png";
    const midChair = "/img/chair/mid-chair.png";
    const purchaseLink = import.meta.env.VITE_PURCHASE_URL;

    // 이미지 전환 상태
    const [variant, setVariant] = useState<"high" | "mid">("high");

    // 🔸 추가: 전환 방향 (→ = 1, ← = -1)
    const [direction, setDirection] = useState<1 | -1>(1);

    const showHigh = useCallback(() => setVariant("high"), []);
    const showMid = useCallback(() => setVariant("mid"), []);

    // 🔸 수정: next/prev에서 방향 먼저 설정
    const next = useCallback(() => {
        setDirection(1); // 오른쪽으로 들어오고 왼쪽으로 나가게
        setVariant((v) => (v === "high" ? "mid" : "high"));
    }, []);
    const prev = useCallback(() => {
        setDirection(-1); // 왼쪽으로 들어오고 오른쪽으로 나가게
        setVariant((v) => (v === "mid" ? "high" : "mid"));
    }, []);

    /* ===== 모션 설정(텍스트 스태거 + 부드러운 이징) ===== */
    const softEase: Transition = {
        duration: 1.1,
        ease: "easeInOut",
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

    const imgEnter: Variants = {
        hidden: (dir: number) => ({ opacity: 0, x: 100 * dir }),
        show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
        exit: (dir: number) => ({ opacity: 0, x: -100 * dir, transition: { duration: 0.45, ease: "easeIn" } }),
    };

    return (
        <section className="w-full h-full bg-[linear-gradient(to_bottom,white_0%,white_66%,#c8bdb6_66%,#c8bdb6_100%)]">
            {/* 내용 */}
            <div className="w-full h-full flex flex-col lg:flex-row">
                {/* 왼쪽: 타이틀, 버튼, 설명 */}
                <div
                    className="
                    lg:w-1/2 lg:h-full w-full h-1/2
                    text-[#403736] tracking-[-0.02em]
                    flex items-center justify-center sm:justify-start
                    text-center sm:text-left
                    mt-10
                "
                >
                    {/* 세로 레이아웃 래퍼 */}
                    <div className="
                        w-full h-full flex flex-col justify-center
                        relavite
                        //border border-red-500    
                    ">
                        {/* 상단: 타이틀, 구매버튼 */}
                        <div className="
                        px-5 sm:pl-20 mb-30 mt-15 lg:mb-100 
                        //border border-red-500
                        ">
                            <motion.div
                                className="
                                flex flex-col gap-2 justify-center
                                items-center sm:items-start
                                "
                                variants={container}
                                initial="hidden"
                                whileInView="show"
                                viewport={{ once: false, amount: 0.35 }} // 다시 들어올 때마다 재생
                            >
                                {/* 슬로건 (≥ sm) */}
                                <motion.div variants={fadeUp} className="hidden sm:flex ml-3">
                                    <div className="2xl:text-3xl lg:text-2xl md:text-xl text-base text-left">
                                        <Trans ns="common" i18nKey="title.slogan" components={{ br: <br /> }} />
                                    </div>
                                </motion.div>

                                {/* 타이틀 */}
                                <motion.div variants={fadeUp} className="w-full">
                                    <h1
                                        className="
                                        mb-3 font-bold
                                        2xl:text-9xl lg:text-8xl md:text-8xl text-6xl
                                        text-center sm:text-left
                                        "
                                    >
                                        <Trans ns="common" i18nKey="title.title" components={{ br: <br /> }} />
                                    </h1>
                                </motion.div>

                                {/* 모바일용 설명 (sm 미만) */}
                                <motion.div variants={fadeUp} className="sm:hidden w-full">
                                    <div className="mb-5 lg:text-1xl md:text-base text-sm text-center">
                                        <Trans ns="common" i18nKey="title.descM" components={{ br: <br /> }} />
                                    </div>
                                </motion.div>

                                {/* 구매 버튼 */}
                                <motion.div variants={fadeUp} className="w-full flex justify-center sm:justify-start z-20 lg:mt-5">
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
                                            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.5}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
                                            </svg>
                                        </motion.button>
                                    </a>
                                </motion.div>
                            </motion.div>
                        </div>

                        {/* 하단 설명 (데스크탑 전용) */}
                        <motion.div
                            className="
                                absolute left-15
                                2xl:bottom-35 lg:bottom-20
                                hidden lg:block
                                px-5
                                text-start text-white
                                2xl:text-2xl xl:text-lg lg:text-base
                                //border border-red-500
                            "
                            variants={container}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: false, amount: 0.30 }} // 스크롤로 25% 보이면 재생
                        >
                            <motion.div variants={fadeUp} className="w-full">
                                <div className="mb-5">
                                    <Trans ns="common" i18nKey="title.desc1"
                                        components={{ br: <br />, strong: <strong className="font-bold" /> }} />
                                </div>
                            </motion.div>

                            <motion.div variants={fadeUp} className="w-full">
                                <div className="mb-5">
                                    <Trans ns="common" i18nKey="title.desc2"
                                        components={{ br: <br />, strong: <strong className="font-bold" /> }} />
                                </div>
                            </motion.div>

                            <motion.div variants={fadeUp} className="w-full">
                                <div className="mb-0">
                                    <Trans ns="common" i18nKey="title.desc3"
                                        components={{ br: <br />, strong: <strong className="font-bold" /> }} />
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>

                {/* 오른쪽: 의자 이미지 (화살표/점 전환) */}
                <div
                    className="
                        relative                         
                        lg:w-1/2 lg:h-full w-full h-1/2
                        select-none
                        xl:mb-20 lg:mb-15 mb-10
                        //border border-red-500
                    "
                    role="img"
                    aria-label={variant === "high" ? "High-back chair" : "Mid-back chair"}
                >
                    <AnimatePresence mode="wait" initial={false} custom={direction}>
                        {variant === "high" ? (
                            <motion.img
                                key="high"
                                src={highChair}
                                alt="High-back chair"
                                variants={imgEnter}
                                custom={direction}
                                initial="hidden"
                                animate="show"
                                exit="exit"
                                className="
                                absolute left-1/2 -translate-x-1/2 
                                bottom-15 sm:bottom-19 md:bottom-22 lg:bottom-23 xl:bottom-25 2xl:bottom-30
                                2xl:w-[38rem] xl:w-[30rem] lg:w-[29rem] md:w-[27rem] sm:w-[24rem] w-[16rem] h-auto
                                //border border-blue-500
                                "
                                draggable={false}
                            />
                        ) : (
                            <motion.img
                                key="mid"
                                src={midChair}
                                alt="Mid-back chair"
                                variants={imgEnter}
                                custom={direction}
                                initial="hidden"
                                animate="show"
                                exit="exit"
                                className="
                                absolute left-1/2 -translate-x-1/2 
                                bottom-15 sm:bottom-19 md:bottom-22 lg:bottom-23 xl:bottom-25 2xl:bottom-30
                                2xl:w-[38rem] xl:w-[32rem] lg:w-[29rem] md:w-[27rem] sm:w-[24rem] w-[15rem] h-auto
                                "
                                draggable={false}
                            />
                        )}
                    </AnimatePresence>

                    {/* 전환 컨트롤: 화살표 + 점 (미니멀) */}
                    <div className="absolute left-1/2 -translate-x-1/2 mt-
                    bottom-2 sm:bottom-8 md:bottom-10 lg:bottom-12 xl:bottom-12 2xl:bottom-16
                    flex items-center gap-3 sm:gap-4
                    //border border-black">
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
                            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>

                        {/* 점(인디케이터) */}
                        <div className="flex items-center gap-2" >
                            <button
                                type="button"
                                onClick={showHigh}
                                aria-pressed={variant === "high"}
                                aria-label="Show high-back"
                                className={`
                                h-3 w-3 rounded-full
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
                                h-3 w-3 rounded-full
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
                            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
