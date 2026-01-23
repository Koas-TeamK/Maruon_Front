import mainStyles from '@/features/calmstand/pages/CalmStandPage.module.css';

export default function AutoHeightSection() {
    const height_1 = '/img/calmStand/height_1.png';
    const height_2 = '/img/calmStand/height_2.png';
    return (
        <section className="w-full h-full">
            <div className='p-3'>
                <div className={mainStyles.title}>
                    Auto
                </ div>
                <div className='text-end'>
                    <div className={mainStyles.title}>
                        Height
                    </div>
                    <div className={mainStyles.description}>
                        It automatically recognizes your posture <br />
                        and makes smooth ergonomic adjustments <br />
                        to keep you at your ideal height.
                    </div>
                </div>
            </div>
            <div className="">
                <div
                    className="w-full h-[230px] bg-[#a4a4a4] bg-contain sm:bg-cover bg-bottom bg-no-repeat "
                    style={{ backgroundImage: `url(${height_1})` }}
                />

                <div
                    className="w-full h-[250px] bg-[#a4a4a4] bg-contain sm:bg-cover bg-bottom bg-no-repeat "
                    style={{ backgroundImage: `url(${height_2})` }}
                />
            </div>
        </section>
    )
};