"use client";

import { useRef } from "react";

import AboutSection from "@/components/calmstand/sections/AboutSection";
import AutoHeightSection from "@/components/calmstand/sections/AutoHeightSection";
import RhythmSection from "@/components/calmstand/sections/RhythmSection";
import FocusRelaxSection from "@/components/calmstand/sections/FocusRelaxSection";
import CatchphraseSection from "@/components/calmstand/sections/CatchphraseSection";
import WellnessJourneySection from "@/components/calmstand/sections/WellnessJourneySection";

import { motion, type Variants } from "framer-motion";

import { usePageTitle } from "@/shared/hooks/usePageTitle";


export default function CalmStandPage() {
    usePageTitle("Calm Stand");

    const focusRef = useRef<HTMLDivElement | null>(null);
    const catchRef = useRef<HTMLElement | null>(null);
    const wellnessRef = useRef<HTMLElement | null>(null);
    const snapZoneRef = useRef<HTMLDivElement | null>(null);

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
                delayChildren: 0.04,
            },
        },
    };

    const scrollToElement = (el: HTMLElement | null) => {
        if (!el) return;
        el.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    //위 섹션으로 갈 때 스냅 영역 스크롤도 리셋
    const goToFocusSection = () => {
        if (snapZoneRef.current) {
            snapZoneRef.current.scrollTo({
                top: 0,
                behavior: "smooth",
            });
        }
        scrollToElement(focusRef.current);
    };

    return (
        <div
            className="
                w-screen sm:w-2/3 lg:w-1/3 m-auto
                flex flex-col
            "
        >
            <div className="w-full">
                <AboutSection />
            </div>

            <div className="mt-[3rem] w-full">
                <RhythmSection />
            </div>

            <div
                ref={focusRef}
                className="mt-[5rem] w-full min-h-screen flex items-center"
            >
                <FocusRelaxSection />
            </div>

            <div className="mt-[4rem] w-full">
                <AutoHeightSection />
            </div>
            <div
                ref={snapZoneRef}
                className="
                    h-[100dvh] w-full
                    overflow-y-auto overflow-x-hidden [overflow:clip] max-w-[100vw]
                    snap-y snap-mandatory
                    overscroll-contain
                    hide-scrollbar
                "
                style={{ WebkitOverflowScrolling: "touch" }}
            >
                {/* Catch 섹션 */}
                <section
                    ref={catchRef}
                    className="snap-start snap-always h-[100dvh] w-full overflow-x-hidden [overflow:clip]"
                >
                    <motion.div
                        className="h-full w-full"
                        variants={sectionVariants}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ amount: 0.6, once: false }}
                    >
                        <CatchphraseSection
                            onRequestPrevSection={goToFocusSection}
                            onRequestNextSection={() =>
                                scrollToElement(wellnessRef.current)
                            }
                        />
                    </motion.div>
                </section>

                {/* Wellness 섹션 */}
                <section
                    ref={wellnessRef}
                    className="snap-start snap-always h-[100dvh] w-full overflow-x-hidden [overflow:clip]"
                >
                    <motion.div
                        className="
                            h-full w-full
                            flex items-center justify-center
                        "
                        variants={sectionVariants}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ amount: 0.6, once: false }}
                    >
                        <WellnessJourneySection />
                    </motion.div>
                </section>
            </div>
        </div>
    );
}
