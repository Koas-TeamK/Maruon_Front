import mainStyles from '@/pages/calmstand/CalmStandPage.module.css';

export default function RhythmSection() {

    const rhythm = '/img/calmStand/about_2.png';
    return (
        <div className="sm:w-2/3 md:w-1/2 m-auto 
        mt-20 p-8">
            <div className={mainStyles.title}>
                Sense
            </div>

            <div className="w-full h-[300px] bg-[#a4a4a4] bg-cover bg-center bg-no-repeat my-10"
                style={{ backgroundImage: `url(${rhythm})` }} />

            <div className='text-end'>
                <div className={mainStyles.title}>
                    Rhythm
                </div >
                <div className={mainStyles.description}>
                    By reading micro signals <br />
                    like heart rate, expressions, and stress levels, <br />
                    it understands your posture and mood for <br />
                    smarter ergonomic and wellness adjustments.
                </div>
            </div>
        </div >
    )
};