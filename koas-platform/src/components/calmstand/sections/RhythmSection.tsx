import mainStyles from '@/pages/calmstand/CalmStandPage.module.css';

export default function RhythmSection() {

    const rhythm = '/img/calmStand/about_2.png';
    return (
        <div className="sm:w-2/3 md:w-1/2 m-auto 
        mt-20 p-8">
            <div className={mainStyles.title}>
                Sense
            </div>

            <div style={{ width: '100%', height: '245px', margin: '20px 0px' }}>
                <img src={rhythm} alt="About Calm Stand" />
            </div >

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