// src/pages/MaruonSerialPage.tsx
import './MaruonSerialPage.module.css'
import { useEffect, useMemo, useState } from "react";
import { parseNameSerialToken } from "@/shared/lib/qr";
import { Trans, useTranslation } from "react-i18next";
import { usePageTheme } from "@/shared/hooks/usePageTheme";
import { useSerialStore } from '@/stores/useSerialStore';
import MaruonSerialErrorPage from './MaruonSerialErrorPage';

export default function MaruonSerialPage() {
    usePageTheme("#403736");
    const { name, serial, token } = useMemo(() => parseNameSerialToken(), []);
    const { i18n } = useTranslation("common");
    const qrCheckRequest = useSerialStore((s) => s.checkQr);
    const loading = useSerialStore((s) => s.loading);
    const error = useSerialStore((s) => s.error);
    const data = useSerialStore((s) => s.data);

    const logoUrl = "/logo/maruon/maruon-gold.png";
    const chairUrl = "/img/chair/high-chair.png";

    // message exist or not
    const hasMessage = !!data?.message;
    const [isMessageShow, setIsMessageShow] = useState(true);
    const toggleMessageShow = () => {
        setIsMessageShow(!isMessageShow);
    }

    // QR 정보 가져오기
    useEffect(() => {
        if (!name || !serial || !token) return;
        qrCheckRequest({ name, serial, token });

    }, [name, serial, token, qrCheckRequest]);

    // Num 정규화
    function formatSerialKeepZeros(v: string | number | null | undefined) {
        if (v == null) return "—";
        const s = String(v).replace(/[０-９]/g, ch =>
            String.fromCharCode(ch.charCodeAt(0) - 0xFF10 + 0x30)
        );
        const m = s.match(/\d+/);
        return m ? m[0] : "—";
    }

    if (loading || error) {
        return <MaruonSerialErrorPage />;
    }

    return (
        <div className="bg-[url('/img/background/background.png')] bg-[length:390px_844px] bg-repeat -mt-20 md:-mt-24 lg:-mt-28">
            <div className="pointer-events-none w-full h-full bg-[url('/img/background/background-log.png')] bg-no-repeat bg-top bg-[length:280px_auto] md:bg-[length:320px_auto]">
                <div className='max-w-[500px] mx-auto'>
                    {/* 번역 토글 */}
                    <div className='w-full h-[70px]' />
                    {/* 컨텐츠 */}
                    <section className={`w-full px-6 pb-1 flex flex-col justify-center items-center ${isMessageShow && hasMessage ? 'gap-12' : 'gap-10'}`}>
                        {/* 로고 */}
                        <img
                            src={logoUrl}
                            alt="Maruon"
                            className="w-26 md:w-36 select-none"
                            decoding="async"
                            loading="lazy"
                        />

                        {/* 문구 */}
                        <div key={i18n.language} className="text-center text-[#eed49d] pointer-events-auto"
                            onClick={() => toggleMessageShow()}>
                            {isMessageShow && hasMessage ? (
                                <>
                                    <div className="text-2xl font-kyobo-handwriting whitespace-pre-wrap leading-[3rem]">
                                        {data?.message.replace(/\\n/g, '\n')}
                                    </div>
                                </>
                            ) : (
                                <div className="text-[1.5rem]">
                                    <div>
                                        <Trans i18nKey="edition.registeredLine1" ns="common" />
                                    </div>
                                    <div className="mt-1">
                                        <Trans
                                            i18nKey="edition.registeredLine2"
                                            ns="common"
                                            components={{
                                                br: <br />,
                                                num: (
                                                    <span
                                                        className="inline-block text-[3rem] leading-[3rem] tracking-[0.02em]
                                                text-transparent bg-clip-text [text-shadow:0_0_0_#e6c981]
                                                [-webkit-text-stroke:1px_rgba(0,0,0,.18)]
                                                [font-family:'Cinzel',serif]"
                                                    >
                                                        {formatSerialKeepZeros(data?.serial)}
                                                    </span>
                                                ),
                                            }}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* 의자 */}
                        <div>
                            {isMessageShow && hasMessage && (
                                <div className="text-center text-sm text-[#eed49d] pointer-events-auto [font-family:'Cinzel',serif]">
                                    <div className="mb-3">
                                        <p> No.<span className='text-2xl'>{data?.serial}</span></p>
                                    </div>
                                </div>
                            )}
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
