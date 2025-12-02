import { useEffect, useRef } from "react";
import styles from "./AboutSection.module.css";
import mainStyles from "@/pages/calmstand/CalmStandPage.module.css";

export default function AboutSection() {
    const about_1 = "/img/calmStand/about_1.png";
    const videoUrl =
        "https://j6wajg0oe8xjlsj8.public.blob.vercel-storage.com/calmStand-1.mp4";
    const calmStandLogo = "/logo/calmStand/calmstand.png";

    const videoRef = useRef<HTMLVideoElement | null>(null);

    useEffect(() => {
        const v = videoRef.current;
        if (!v) return;

        v.muted = true;
        v.playsInline = true;

        const tryPlay = async () => {
            try {
                await v.play();
            } catch (e) {
                console.warn("Autoplay blocked", e);
            }
        };

        tryPlay();
    }, []);

    return (
        <div className="sm:w-2/3 md:w-1/2 m-auto">
            <div>
                <img
                    src={calmStandLogo}
                    alt="CalmStand"
                    className="m-auto w-40"
                />
            </div>

            <video
                ref={videoRef}
                src={videoUrl}
                autoPlay
                playsInline
                muted
                loop
                className="w-full h-auto rounded-lg"
            />

            <div
                className={`${mainStyles.description} ${styles.text1} text-center`}
            >
                Engineered calm. Built to last.
            </div>

            <div className="mt-20" />

            {/* about */}
            <div className="flex flex-col gap-5">
                <div className="pl-8">
                    <div className={mainStyles.mainTitle}>About.</div>
                    <div className={mainStyles.description}>
                        Degined to sense. Built to enhance your well-being. <br />
                        Where posture intelligence meets desktop minimalism.
                    </div>
                </div>
                <div className="flex justify-end">
                    <div style={{ width: "290px", height: "185px" }}>
                        <img
                            src={about_1}
                            alt="About Calm Stand"
                            className="bg-[#C7C7C7] mt-10"
                        />
                    </div>
                </div>
            </div>

            {/* calmStand */}
            <div className="mt-30">
                <div className="text-end pr-6">
                    <div
                        className={`${mainStyles.title} ${mainStyles.gradientText}`}
                    >
                        Calm Stand
                    </div>
                    <div
                        className={`${mainStyles.description} ${styles.text1}`}
                    >
                        Adaptive support for every workspace.
                    </div>
                </div>
            </div>
        </div>
    );
}
