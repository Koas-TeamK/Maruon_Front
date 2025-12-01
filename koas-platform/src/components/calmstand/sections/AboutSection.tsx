import styles from './AboutSection.module.css';
import mainStyles from '@/pages/calmstand/CalmStandPage.module.css';

export default function AboutSection() {
    const about_1 = '/img/calmStand/about_1.png';
    const about_2 = '/img/calmStand/about_2.png';

    return (
        <div className="sm:w-2/3 md:w-1/2 m-auto
        mt-10 
        ">
            {/* about */}
            <div className='
            flex flex-col gap-5'>
                <div className='
                pl-8
                '>
                    <div className={mainStyles.mainTitle}>About.</div>
                    <div className={mainStyles.description}>
                        Degined to sense.  Built to enhance your well-being. <br />
                        Where posture intelligence meets desktop minimalism.
                    </div>
                </div>
                <div className='
                flex justify-end
                    '>
                    <div style={{ width: '290px', height: '185px' }}>
                        <img src={about_1} alt="About Calm Stand"
                            className='bg-[#C7C7C7] ' />
                    </div >
                </div >
            </div >
            {/* calmStand */}
            <div className='
             mt-20
            '>
                <div className='text-end pr-6'>
                    <div className={`${mainStyles.title} ${mainStyles.gradientText}`}>Calm Stand</div>
                    <div className={` ${mainStyles.description} ${styles.text1} `}>
                        Adaptive support for every workspace.
                    </div>
                </div>
                <div className='
                    mt-10  
                '>
                    <div style={{ width: '250px', height: '200px' }}>
                        <img src={about_2} alt="About Calm Stand"
                            className='bg-[#C7C7C7]' />
                    </div>
                </div>
            </div >
        </div >
    );
}