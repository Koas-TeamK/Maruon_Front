// src/pages/MaruonSerialPage.tsx
import { useEffect, useMemo, useState } from "react";
import { parseNameSerialToken } from "@/shared/lib/qr";
import { Trans, useTranslation } from "react-i18next";

export default function MaruonSerialPage() {
    const { name, serial, token } = useMemo(() => parseNameSerialToken(), []);
    const { i18n } = useTranslation("common");

    const API_BASE = import.meta.env.PROD
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
                    // 진단용 로그 남기기
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

    // 숫자 포맷
    function formatSerialLocalized(v: string | number | null | undefined, locale: string) {
        if (v == null) return "—";
        const digits = String(v).replace(/[^\d]/g, "");
        if (!digits) return "—";
        const n = parseInt(digits, 10);
        if (Number.isNaN(n)) return "—";
        return new Intl.NumberFormat(locale).format(n);
    }

    const locale = i18n.language.startsWith("ko")
        ? "ko-KR"
        : i18n.language.startsWith("en")
            ? "en-US"
            : i18n.language;


    return (
        <div className="relative min-h-[90svh] md:h-[120svh]">
            {/* 배경 */}
            <div className="pointer-events-none absolute inset-0 z-0">
                <div className="absolute inset-0 z-0 bg-[url('/img/background.png')] bg-[length:290px_844px] bg-repeat" />
                <div className="absolute inset-0 z-[5] bg-[url('/img/background-log.png')] bg-no-repeat bg-top
                        bg-[length:280px_auto] md:bg-[length:320px_auto] lg:bg-[length:360px_auto]" />
                <div className="absolute inset-0 z-[5] bg-[url('/img/high-chair.png')] bg-no-repeat bg-bottom
                        bg-[length:300px_auto] md:bg-[length:340px_auto] lg:bg-[length:380px_auto]" />
            </div>

            {/* 로고 + 문구 */}
            <div className="relative z-10 flex flex-col items-center px-6 pt-10">
                <img src="/logo/maruon-gold.png" alt="Maruon" className="w-40 md:w-52 lg:w-60" />

                <div className="mt-16 text-center md:text-lg text-[#eed49d] [text-wrap:balance] break-keep leading-relaxed md:leading-loose">
                    <Trans
                        i18nKey="edition.registeredLine"
                        ns="common"
                        components={{
                            num: (
                                <span
                                    className="inline-block text-4xl md:text-6xl leading-none tracking-[0.02em]
                             text-transparent bg-clip-text [text-shadow:0_0_0_#e6c981]
                             [-webkit-text-stroke:1px_rgba(0,0,0,.18)]
                             [font-family:'Cinzel',serif]"
                                >
                                    {formatSerialLocalized(serialNum, locale)}
                                </span>
                            ),
                        }}
                    />
                    <p className="mt-5"> 귀하의 제품 도착 예정일은 {date}입니다. </p>
                </div>
            </div>
        </div>
    );
}
