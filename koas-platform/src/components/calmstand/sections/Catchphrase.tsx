"use client";

import { useEffect, useRef, useState } from "react";
import mainStyles from "@/pages/calmstand/CalmStandPage.module.css";

export default function CatchPhrase() {
    const phrasesRef = useRef<(HTMLDivElement | null)[]>([]);
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            let closestIndex = 0;
            let minDistance = Infinity;
            const viewportCenter = window.innerHeight / 2;

            phrasesRef.current.forEach((el, index) => {
                if (!el) return;

                const rect = el.getBoundingClientRect();
                const elementCenter = rect.top + rect.height / 2;
                const distance = Math.abs(viewportCenter - elementCenter);

                if (distance < minDistance) {
                    minDistance = distance;
                    closestIndex = index;
                }
            });

            setActiveIndex(closestIndex);
        };

        handleScroll();
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const phrases = ["", "FOCUS DEEPER", "WORK NATURALLY", "FEEL BETTER", ""];

    return (
        <div className="sm:w-2/3 md:w-1/2 h-[200vh] m-auto mt-20 text-center flex flex-col justify-center gap-y-30">
            {phrases.map((text, i) => (
                <div
                    key={i}
                    ref={(el) => {
                        phrasesRef.current[i] = el;
                    }}
                    className={`${mainStyles.catchphrase} ${activeIndex === i ? mainStyles.active : ""
                        }`}
                >
                    {text}
                </div>
            ))}
        </div>
    );
}
