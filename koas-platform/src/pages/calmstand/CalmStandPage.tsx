"use client";

import { useEffect, useRef, useState } from "react";

import AboutSection from "@/components/calmstand/sections/AboutSection";
import AutoHeightSection from "@/components/calmstand/sections/AutoHeightSection";
import RhythmSection from "@/components/calmstand/sections/RhythmSection";
import FocusRelaxSection from "@/components/calmstand/sections/FocusRelaxSection";
import CatchPhrase from "@/components/calmstand/sections/Catchphrase";
import WellnessJourneySection from "@/components/calmstand/sections/WellnessJourneySection";

export default function CalmStandPage() {
    const wellnessRef = useRef<HTMLDivElement | null>(null);
    const [wellnessActive, setWellnessActive] = useState(false);
    const hasSnappedRef = useRef(false);

    useEffect(() => {
        if (!wellnessRef.current) return;

        const target = wellnessRef.current;

        const observer = new IntersectionObserver(
            ([entry]) => {
                const ratio = entry.intersectionRatio;

                // 애니메이션 on/off
                if (ratio >= 0.2) {
                    setWellnessActive(true);

                    if (!hasSnappedRef.current) {
                        hasSnappedRef.current = true;
                        window.scrollTo({
                            top: target.offsetTop,
                            behavior: "smooth",
                        });
                    }
                } else {
                    setWellnessActive(false);

                    if (ratio < 0.01) {
                        hasSnappedRef.current = false;
                    }
                }
            },
            {
                threshold: [0, 0.2, 1],
            }
        );

        observer.observe(target);

        return () => observer.disconnect();
    }, []);

    return (
        <div>
            <AboutSection />
            <div className="mt-20" />

            <AutoHeightSection />
            <div className="mt-20" />

            <RhythmSection />
            <div className="mt-30" />

            <FocusRelaxSection />

            <CatchPhrase />

            <div
                ref={wellnessRef}
                className={`
                    transition-all duration-700 ease-out
                    ${wellnessActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
                `}
            >
                <WellnessJourneySection />
            </div>
        </div>
    );
}
