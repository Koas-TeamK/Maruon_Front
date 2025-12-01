import mainStyles from '@/pages/calmstand/CalmStandPage.module.css';

export default function AutoHeightSection() {
    const height_1 = '/img/calmStand/height_1.png';
    const height_2 = '/img/calmStand/height_2.png';
    return (
        <div className="sm:w-2/3 md:w-1/2 m-auto mt-10">
            <div className='p-5'>
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
                    className="w-full h-[210px] bg-[#a4a4a4] bg-contain bg-bottom bg-no-repeat "
                    style={{ backgroundImage: `url(${height_1})` }}
                />

                <div
                    className="w-full h-[210px] bg-[#a4a4a4] bg-contain bg-bottom bg-no-repeat"
                    style={{ backgroundImage: `url(${height_2})` }}
                />
            </div>
        </div>
    )
};