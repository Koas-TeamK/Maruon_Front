import mainStyles from '@/pages/calmstand/CalmStandPage.module.css';
import { useRef } from 'react';

export default function FocusRelaxSection() {
    const scent = 'https://j6wajg0oe8xjlsj8.public.blob.vercel-storage.com/scent-3.mp4';
    const videoRef = useRef<HTMLVideoElement | null>(null);
    return (
        <section className="w-full h-full
        p-5 flex flex-col gap-y-10">
            {/* first title */}
            <div>
                <div className={`${mainStyles.title} leading-12 mb-3`}>
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
                <div style={{ width: '300px', height: '160px' }}>
                    <video
                        ref={videoRef}
                        src={scent}
                        autoPlay
                        playsInline
                        muted
                        loop
                        className="w-full oberflow-hidden"
                    />
                </div >
            </div>
            {/* third title */}
            <div className='text-end mt-20 mb-30'>
                <div className={`${mainStyles.title} leading-12 mb-3`}>
                    Relax <br />
                    through scent.
                </div>
                <div className={mainStyles.description}>
                    turning your desk into a personalized wellness environment.
                </div>
            </div>
        </section>
    )
};