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
                if (!res.ok) {
                    console.warn("[qr/check] http", res.status, await res.text().catch(() => ""));
                    return;
                }
                const json = await res.json();
                setSerialNum(json?.serial ?? null);
                setDate(json?.createDate ?? null);
            } catch (e) {
                console.warn("[qr/check] network_error", e);
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
        i18n.language.startsWith("ko")
            ? "ko-KR"
            : i18n.language.startsWith("en")
                ? "en-US"
                : i18n.language;

    return (
        <div className="relative h-[100svh]">
            {/* 고정 배경 레이어 */}
            <div className="fixed inset-0">
                {/* 패턴 (맨 뒤) */}
                <div className="absolute inset-0 z-0 bg-[url('/img/background.png')] bg-[length:390px_844px] bg-repeat" />
                {/* 상단 로그 패턴 (뒤) */}
                <div className="absolute inset-x-0 -top-10 h-full z-0
                        bg-[url('/img/background-log.png')] bg-no-repeat
                        bg-[position:top_center]
                        bg-[length:280px_auto] md:bg-[length:320px_auto] lg:bg-[length:360px_auto]" />

                {/* 로고 / 문구 / 의자 : 앞쪽으로 올림 */}
                <div className="relative z-10 h-full flex flex-col items-center justify-between
                        pt-[max(env(safe-area-inset-top),1.5rem)]
                        pb-[clamp(220px,30vh,360px)]
                        px-6 pointer-events-none">
                    {/* 로고 */}
                    <img
                        src="/logo/maruon-gold.png"
                        alt="Maruon"
                        className="w-36 md:w-42 lg:w-56 select-none"
                        decoding="async"
                        loading="lazy"
                    />

                    {/* 문구(가운데). 상호작용 필요하면 auto */}
                    <div className="pointer-events-auto w-full max-w-[640px] text-center md:text-lg text-[#eed49d]
                          [text-wrap:balance] break-keep leading-relaxed md:leading-loose mt-10">
                        <Trans
                            i18nKey="edition.registeredLine"
                            ns="common"
                            components={{
                                num: (
                                    <span className="inline-block text-4xl md:text-6xl leading-none tracking-[0.02em]
                                   text-transparent bg-clip-text [text-shadow:0_0_0_#e6c981]
                                   [-webkit-text-stroke:1px_rgba(0,0,0,.18)]
                                   [font-family:'Cinzel',serif]">
                                        {formatSerialLocalized(serialNum, locale)}
                                    </span>
                                ),
                            }}
                        />
                        {date && <p className="mt-5">귀하의 제품 도착 예정일은 {date}입니다.</p>}
                    </div>

                    {/* 의자 (하단) */}
                    <img
                        src="/img/high-chair.png"
                        alt=""
                        className="block mx-auto select-none pointer-events-none
                       w-[280px] md:w-[300px] lg:w-[340px]"
                        decoding="async"
                        loading="lazy"
                    />
                </div>
            </div>
        </div>
    );
}
