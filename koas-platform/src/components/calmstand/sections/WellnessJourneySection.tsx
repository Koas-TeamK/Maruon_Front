import mainStyles from '@/pages/calmstand/CalmStandPage.module.css'
import ProductViewer from '@/components/calmstand/ProductViewer'

export default function WellnessJourneySection() {

    const calmStandLogo = '/logo/calmStand/calmstand.png';

    return (
        <div className="lg:w-2/3 h-screen m-auto 
            text-center flex flex-col justify-around
            //border border-gray-300
        ">
            <div className="mt-30 relative flex flex-col items-center justify-around">
                <div className={`relative z-10 ${mainStyles.viweTitle}`}>
                    Wellness Journey
                </div>

                <div
                    className="
                        relative 
                        z-20
                        mt-[-160px]         /* 위 텍스트 쪽으로 조금 끌어올림 */
                        mb-[-200px]     /* 아래 텍스트와도 약간 겹치게 */
                    "
                >
                    <div className="inline-block w-[350px] h-[500px]">
                        <ProductViewer />
                    </div>
                </div>

                <div className="relative z-10 mt-2">
                    <div className={`${mainStyles.viweTitle} ${mainStyles.gradientText}`}>
                        Starts Now.
                    </div>
                    <div className={mainStyles.viweDescription}>
                        Move to explore.
                    </div>
                </div>
            </div>

            <div>
                <img src={calmStandLogo} alt="CalmStand" className="m-auto mt-10" />
            </div>
        </div>
    )
};
