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
                setSerialNum(json?.serial ?? null);
                setDate(json?.createDate ?? null);
            } catch { }
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
            {/* 배경: 고정 + 클릭/스크롤 통과 */}
            <div className="pointer-events-none fixed inset-0 z-0">
                <div className="absolute inset-0 bg-[url('/img/background.png')] bg-[length:390px_844px] bg-repeat" />
                <div className="absolute inset-x-0 -top-10 h-full
                        bg-[url('/img/background-log.png')] bg-no-repeat
                        bg-[position:top_center]
                        bg-[length:280px_auto] md:bg-[length:320px_auto] lg:bg-[length:360px_auto]" />
            </div>

            {/* 본문: 스크롤 가능(레이아웃 흐름) */}
            <main
                className="relative z-10 mx-auto w-full max-w-[640px] px-6
                   min-h-[100dvh]
                   pb-[calc(max(env(safe-area-inset-bottom),16px)+160px)] /* 의자 높이만큼 버퍼 */
      ">
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
                <section className="mt-8 text-center text-[#eed49d] md:text-lg [text-wrap:balance] break-keep leading-relaxed md:leading-loose">
                    <Trans
                        i18nKey="edition.registeredLine"
                        ns="common"
                        components={{
                            num: (
                                <span className="inline-block text-3xl md:text-6xl leading-none tracking-[0.02em]
                                 text-transparent bg-clip-text [text-shadow:0_0_0_#e6c981]
                                 [-webkit-text-stroke:1px_rgba(0,0,0,.18)]
                                 [font-family:'Cinzel',serif]">
                                    {formatSerialLocalized(serialNum, locale)}
                                </span>
                            ),
                        }}
                    />
                    {date && <p className="mt-4">귀하의 제품 도착 예정일은 {date}입니다.</p>}
                </section>

                {/* 의자: sticky → 뷰포트 하단에 붙어있다가 푸터 나오면 자연스럽게 위로 밀림 */}
                <div className="h-[180px] md:h-[220px] lg:h-[240px] mt-10">
                    <div className="sticky bottom-[max(env(safe-area-inset-bottom),16px)] flex justify-center">
                        <img
                            src="/img/high-chair.png"
                            alt=""
                            className="w-[260px] md:w-[300px] lg:w-[340px] select-none pointer-events-none"
                            decoding="async"
                            loading="lazy"
                        />
                    </div>
                </div>
                {/* ↑ 바깥 div의 높이가 의자 이미지 ‘자체 높이’ 역할(레이아웃 공간 확보) */}
            </main >
        </div >
    );
}
