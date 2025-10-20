// src/pages/MaruonSerialPage.tsx
import { useEffect, useMemo, useState } from "react";
import { parseNameSerialToken } from "@/shared/lib/qr";
import { Trans, useTranslation } from "react-i18next";

export default function MaruonSerialPage() {
    const API_BASE = (import.meta.env.VITE_API_BASE as string)?.replace(/\/$/, "") || "";
    const { name, serial, token } = useMemo(() => parseNameSerialToken(), []);
    const [serialNum, setSerialNum] = useState(null);
    const { i18n } = useTranslation("common");

    // QR check (GET)
    useEffect(() => {
        if (!name || !serial || !token) {
            return;
        }
        const run = async () => {
            try {
                const qs = new URLSearchParams({ name, serial, token }).toString();
                const url = `${API_BASE}/api/qr/check?${qs}`;
                const res = await fetch(url, { method: "GET", headers: { Accept: "application/json" } });
                if (!res.ok) {
                    return;
                }
                const json = await res.json();
                setSerialNum(json.serial);
            } catch {
            }
        };
        run();
    }, [name, serial, token]);

    //숫자 표시
    function formatSerialLocalized(
        v: string | number | null | undefined,
        locale: string
    ) {
        if (v == null) return "—";
        const digits = String(v).replace(/[^\d]/g, "");
        if (!digits) return "—";
        const n = parseInt(digits, 10);
        if (Number.isNaN(n)) return "—";
        return new Intl.NumberFormat(locale).format(n);
    }

    return (
        <div className="relative min-h-[90svh] md:h-[120svh]">
            {/* 배경 레이어 컨테이너 */}
            <div className="pointer-events-none absolute inset-0 z-0">
                {/* 패턴 배경 */}
                <div className="absolute inset-0 z-0 bg-[url('/img/background.png')] bg-[length:290px_844px] bg-repeat" />
                {/* 장식 배경*/}
                <div className="absolute inset-0 z-5 bg-[url('/img/background-log.png')] 
                    bg-no-repeat bg-top
                    bg-[length:280px_auto]
                    md:bg-[length:320px_auto] 
                    lg:bg-[length:360px_auto]"
                />
                <div className="absolute inset-0 z-5 bg-[url('/img/maruonChair.png')] 
                    bg-no-repeat bg-bottom
                    bg-[length:300px_auto]
                    md:bg-[length:340px_auto] 
                    lg:bg-[length:380px_auto]"
                />


                {/* 앞 레이어: 로고 + 문구 */}
                <div className="relative z-10 flex flex-col items-center px-6 pt-10">
                    {/* 로고*/}
                    <img
                        src="/logo/maruon-gold.png"
                        alt="Maruon"
                        className="w-40 md:w-52 lg:w-60"
                    />
                    {/* 문구*/}
                    <div className="mt-15 text-center md:text-lg text-[#eed49d] [text-wrap:balance] break-keep  leading-10">
                        <Trans
                            i18nKey="edition.registeredLine"
                            ns="common"
                            components={{
                                num: (
                                    <span
                                        className="text-4xl md:text-6xl leading-none tracking-[0.02em]
                             text-transparent bg-clip-text [text-shadow:0_0_0_#e6c981]
                             [-webkit-text-stroke:1px_rgba(0,0,0,.18)]
                             [font-family:'Cinzel',serif]"
                                    >
                                        {formatSerialLocalized(serialNum, i18n.language)}
                                    </span>
                                ),
                            }}
                        />
                    </div>
                </div>

            </div>
        </div>
    );
}
