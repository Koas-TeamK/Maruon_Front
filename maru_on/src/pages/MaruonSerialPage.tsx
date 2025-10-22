// src/pages/MaruonSerialPage.tsx
import { useEffect, useMemo, useState } from "react";
import { parseNameSerialToken } from "@/shared/lib/qr";
import { Trans, useTranslation } from "react-i18next";

export default function MaruonSerialPage() {
    const { name, serial, token } = useMemo(() => parseNameSerialToken(), []);
    const { i18n } = useTranslation("common");

    const API_BASE =
        import.meta.env.PROD
            ? ""
            : (import.meta.env.VITE_API_BASE as string) ?? "http://localhost:8080";

    const [serialNum, setSerialNum] = useState<string | number | null>(null);
    const [date, setDate] = useState<string | number | null>(null);

    useEffect(() => {
        if (!name || !serial || !token) return;
        (async () => {
            try {
                const qs = new URLSearchParams({ name, serial, token }).toString();
                const url = `${API_BASE}/api/qr/check?${qs}`;
                const res = await fetch(url, { headers: { Accept: "application/json" } });
                if (!res.ok) return;
                const json = await res.json();
                //console.log("[MaruonSeiralPage] qr ", json);
                setSerialNum(json?.serial ?? null);
                setDate(json?.createdDate ?? null);
            } catch {
                // noop
            }
        })();
    }, [API_BASE, name, serial, token]);

    function formatSerialLocalized(v: string | number | null | undefined, locale: string) {
        if (v == null) return "—";
        const digits = String(v).replace(/[^\d]/g, "");
        if (!digits) return "—";
        const n = parseInt(digits, 10);
        if (Number.isNaN(n)) return "—";
        return new Intl.NumberFormat(locale).format(n);
    }

    const locale =
        i18n.language.startsWith("ko") ? "ko-KR"
            : i18n.language.startsWith("en") ? "en-US"
                : i18n.language;

    return (
        <div className="relative min-h-[100dvh]">
            {/* 1) 패턴 배경: 뷰포트 고정 (z-0) */}
            <div className="pointer-events-none fixed inset-0 z-0" aria-hidden>
                <div className="absolute inset-0 bg-[url('/img/background.png')] bg-[length:390px_844px] bg-repeat" />
            </div>

            {/* 2) background-log: 스크롤과 함께 이동 (z-[1]) */}
            <div
                className="
                pointer-events-none absolute inset-x-0 -top-20 z-[1]
                h-[800px]
                bg-[url('/img/background-log.png')] bg-no-repeat bg-top
                bg-[length:280px_auto] md:bg-[length:320px_auto] lg:bg-[length:360px_auto]
                "
                aria-hidden
            />

            {/* 3) 본문 */}
            <main
                className="relative z-10 mx-auto w-full max-w-[640px] px-6
                   min-h-[100dvh]
                   pb-[calc(max(env(safe-area-inset-bottom),16px)+160px)]"
            >
                {/* 로고 */}
                <div className="flex justify-center">
                    <img
                        src="/logo/maruon-gold.png"
                        alt="Maruon"
                        className="w-32 md:w-40 lg:w-56 select-none"
                        decoding="async"
                        loading="lazy"
                    />
                </div>

                {/* 문구 */}
                <section className="mt-8 text-center text-[#eed49d] text-xl [text-wrap:balance] break-keep leading-[2.2]">
                    <Trans
                        i18nKey="edition.registeredLine"
                        ns="common"
                        components={{
                            num: (
                                <span
                                    className="inline-block text-5xl md:text-6xl leading-none tracking-[0.02em]
                             text-transparent bg-clip-text [text-shadow:0_0_0_#e6c981]
                             [-webkit-text-stroke:1px_rgba(0,0,0,.18)]
                             [font-family:'Cinzel',serif]"
                                >
                                    {formatSerialLocalized(serialNum, locale)}
                                </span>
                            ),
                        }}
                    />
                </section>

                {/* 의자: sticky → 하단 고정, 푸터 영역에서 자연스럽게 밀림 */}
                <div className="h-[300px] md:h-[220px] lg:h-[240px] mt-10 mb-20">
                    <div className="sticky bottom-[max(env(safe-area-inset-bottom),16px)] flex justify-center">
                        <img
                            src="/img/high-chair.png"
                            alt="Maruon"
                            className="w-[260px] md:w-[300px] lg:w-[340px] select-none pointer-events-none"
                            decoding="async"
                            loading="lazy"
                        />
                    </div>

                    {/* 배송예정일 */}
                    {date && (
                        <div className="text-center text-[#eed49d] text-xl mt-10 ">
                            <Trans
                                i18nKey="edition.date" // "Your product is scheduled to ship on <br /> <date/>."
                                ns="common"
                                components={{
                                    br: <br />,
                                    date: (
                                        <span
                                            className="inline-block text-5xl leading-[2.2] tracking-[0.02em]
                                            text-transparent bg-clip-text [text-shadow:0_0_0_#e6c981]
                                            [-webkit-text-stroke:1px_rgba(0,0,0,.18)]
                                            [font-family:'Cinzel',serif]"
                                        >
                                            {String(date)}
                                        </span>
                                    ),
                                }}
                            />
                        </div>
                    )}
                </div>
            </main >
        </div >
    );
}
