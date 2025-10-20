// src/pages/MaruonSerialPage.tsx
import { useEffect, useMemo, useState } from "react";
import { parseNameSerialToken } from "@/shared/lib/qr";

type VerifyOk = { ok: true; name: string; serial: string; message?: string };
type VerifyBad = { ok: false; reason: string; message?: string };

export default function MaruonSerialPage() {
    const { name, serial, token } = useMemo(() => parseNameSerialToken(), []);
    const [result, setResult] = useState<VerifyOk | VerifyBad | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!name || !serial || !token) {
            setResult({ ok: false, reason: "missing_params", message: "name/serial/token 누락" });
            return;
        }
        const run = async () => {
            setLoading(true);
            try {
                // 같은 도메인에서 프록시되는 경우: /api/qr/check
                // 다른 도메인이면: VITE_API_BASE 같은 환경변수 사용
                const qs = new URLSearchParams({
                    name,
                    serial,
                    token,
                }).toString();

                const res = await fetch(`/api/qr/check?${qs}`, {
                    method: "GET",
                    headers: { "Accept": "application/json" },
                });

                const json = await res.json();
                setResult(json);
            } catch (e) {
                setResult({ ok: false, reason: "network_error", message: "네트워크 오류" });
            } finally {
                setLoading(false);
            }
        };
        run();
    }, [name, serial, token]);

    return (
        <div className="min-h-[100svh] bg-[#0b0b0f] text-white">
            <div className="fixed top-0 inset-x-0 h-[env(safe-area-inset-top)] bg-[#0b0b0f]" />
            <div className="mx-auto max-w-[520px] px-6 pt-10 pb-24">
                <h1 className="text-2xl font-semibold mb-6">Ownership</h1>

                <section className="rounded-2xl bg-white/5 border border-white/10 p-6 space-y-6">
                    <div>
                        <p className="text-white/60 text-sm">{name || "Item"}</p>
                        <h2 className="mt-2 text-6xl md:text-7xl font-bold tracking-widest tabular-nums">
                            #{serial || "----"}
                        </h2>
                        <p className="mt-2 text-white/80 text-sm">
                            {loading
                                ? "확인 중…"
                                : !result
                                    ? ""
                                    : result.ok
                                        ? result.message || "정품 확인 완료"
                                        : result.message || reasonToKorean(result.reason)}
                        </p>
                    </div>

                    <div className="flex gap-3">
                        <button
                            className="px-4 py-2 rounded-xl bg-white text-black font-medium disabled:opacity-50"
                            onClick={() => navigator.clipboard.writeText(serial)}
                            disabled={!serial}
                        >
                            시리얼 복사
                        </button>
                        <button
                            className="px-4 py-2 rounded-xl border border-white/30"
                            onClick={() => navigator.clipboard.writeText(window.location.href)}
                        >
                            링크 복사
                        </button>
                    </div>
                </section>
            </div>
        </div>
    );
}

function reasonToKorean(r?: string) {
    switch (r) {
        case "missing_params": return "필수 파라미터가 없습니다.";
        case "bad_signature": return "토큰 서명이 유효하지 않습니다.";
        case "serial_mismatch": return "시리얼이 일치하지 않습니다.";
        case "expired": return "토큰이 만료되었습니다.";
        case "network_error": return "네트워크 오류가 발생했습니다.";
        default: return "확인할 수 없습니다.";
    }
}
