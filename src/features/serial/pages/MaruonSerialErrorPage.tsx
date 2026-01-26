// src/pages/MaruonSerialPage.tsx
import './MaruonSerialPage.module.css'
import { usePageTheme } from "@/shared/hooks/usePageTheme";

export default function MaruonSerialErrorPage() {
    usePageTheme("#403736");

    const logoUrl = "/logo/maruon/maruon-gold.png";
    const chairUrl = "/img/chair/high-chair.png";

    return (
        <div className="bg-[url('/img/background/background.png')] bg-[length:390px_844px] bg-repeat -mt-20 md:-mt-24 lg:-mt-28">
            <div className="pointer-events-none w-full h-full bg-[url('/img/background/background-log.png')] bg-no-repeat bg-top bg-[length:280px_auto] md:bg-[length:320px_auto]">
                <div className='max-w-[500px] mx-auto'>
                    {/* 번역 토글 */}
                    <div className='w-full h-[80px]' />
                    {/* 컨텐츠 */}
                    <section className={`w-full px-6 pt-20 pb-3 flex flex-col justify-center items-center gap-25`}>
                        {/* 로고 */}
                        <img
                            src={logoUrl}
                            alt="Maruon"
                            className="w-24 md:w-36 select-none"
                            decoding="async"
                            loading="lazy"
                        />


                        {/* 의자 */}
                        <div>

                            <img
                                src={chairUrl}
                                alt="Maruon Chair"
                                className="w-[260px] md:w-[300px] lg:w-[340px] select-none pointer-events-none"
                                decoding="async"
                                loading="lazy"
                            />
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
