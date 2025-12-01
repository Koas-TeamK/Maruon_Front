import mainStyles from '@/pages/calmstand/CalmStandPage.module.css';

export default function FocusRelaxSection() {
    const scent = 'img/calmStand/scent.png';
    return (
        <div className="sm:w-2/3 md:w-1/2 m-auto 
        mt-20 p-5 flex flex-col gap-y-10">
            {/* first title */}
            <div>
                <div className={mainStyles.title}>
                    Focus <br />
                    through scent.
                </div>
                <div className={mainStyles.description}>
                    Carefully crafted fragrances stimulate your mind to improve focus
                    or gently soothe your senses to help you unwind,
                </div>
            </div>
            {/* second image */}
            <div>
                <div style={{ width: '250px', height: '160px' }}>
                    <img src={scent} alt="About Calm Stand" />
                </div >
            </div>
            {/* third title */}
            <div className='text-end'>
                <div className={mainStyles.title}>
                    Relax <br />
                    through scent.
                </div>
                <div className={mainStyles.description}>
                    turning your desk into a personalized wellness environment.
                </div>
            </div>
        </div>
    )
};