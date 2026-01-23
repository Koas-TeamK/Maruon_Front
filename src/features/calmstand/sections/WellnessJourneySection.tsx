import mainStyles from "@/features/calmstand/pages/CalmStandPage.module.css";
import ProductViewer from '../components/ProductViewer'

export default function WellnessJourneySection() {


    return (
        <section className="w-full h-full relative text-center
           flex flex-col items-center justify-center
        ">
            <div className={`relative z-10 ${mainStyles.viweTitle}`}>
                Wellness Journey
            </div>
            <div
                className="
                        relative 
                        z-20 w-full
                        mt-[-130px]         /* 위 텍스트 쪽으로 조금 끌어올림 */
                        mb-[-180px]     /* 아래 텍스트와도 약간 겹치게 */
                    "
            >
                <div className="w-full h-[500px]">
                    <ProductViewer />
                </div>
            </div>

            <div className="relative z-10">
                <div className={`${mainStyles.viweTitle} ${mainStyles.gradientText}`}>
                    Starts Now.
                </div>
                <div className={mainStyles.viweDescription}>
                    Move to explore.
                </div>
            </div>
        </section>
    )
};
