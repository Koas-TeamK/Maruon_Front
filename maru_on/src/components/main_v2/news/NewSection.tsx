// src/components/news/NewsSection.tsx
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/app/store";
import {
    newsSummaryRequest,
    clearNews,
    selectNews,              // ✅ summary 전용 셀렉터
} from "@/features/news/newsSlice";
import type { NewsSummary, NewsSummaryItem } from "@/features/news/newsSlice";

export default function NewsSection() {
    const dispatch = useDispatch();

    // ✅ 핵심: summary만 선택 (이전: s.news → 오경로)
    const summary = useSelector((s: RootState) => selectNews(s));

    const { loading, data, error, lastFetchedAt } = summary;

    useEffect(() => {
        if (!data && !loading && !error) {
            dispatch(newsSummaryRequest());
        }
    }, [data, loading, error, dispatch]);

    const list: NewsSummary = data ?? [];

    const fetchedTime = useMemo(() => {
        if (!lastFetchedAt) return null;
        try {
            return new Date(lastFetchedAt).toLocaleString();
        } catch {
            return null;
        }
    }, [lastFetchedAt]);

    return (
        // 가시성 확보: 어두운 배경에서도 보이게
        <section className="relative z-10 w-full max-w-4xl mx-auto p-4 md:p-6 text-black">
            {/* 헤더 */}
            <div className="flex items-center justify-between gap-3 mb-4">
                <h2 className="text-lg md:text-xl font-semibold">뉴스 요약</h2>
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => dispatch(newsSummaryRequest())}
                        disabled={loading}
                        className="inline-flex items-center px-3 h-9 rounded-md text-sm font-medium
                       bg-white/10 hover:bg-white/15 disabled:opacity-60"
                    >
                        {loading ? "불러오는 중…" : "새로고침"}
                    </button>
                    <button
                        onClick={() => dispatch(clearNews())}
                        className="inline-flex items-center px-3 h-9 rounded-md text-sm font-medium
                       border border-white/20 hover:bg-white/5"
                    >
                        초기화
                    </button>
                </div>
            </div>

            {/* 에러 */}
            {error && (
                <div className="mb-4 rounded-md border border-red-400/60 bg-red-500/15 p-3 text-sm">
                    {error}
                </div>
            )}

            {/* 로딩 */}
            {loading && (
                <ul className="space-y-3">
                    {Array.from({ length: 3 }).map((_, i) => (
                        <li key={i} className="animate-pulse rounded-lg border border-white/15 p-4">
                            <div className="flex gap-3">
                                <div className="h-16 w-24 bg-white/10 rounded" />
                                <div className="flex-1">
                                    <div className="h-4 w-3/5 bg-white/10 rounded mb-2" />
                                    <div className="h-3 w-2/5 bg-white/10 rounded" />
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            )}

            {/* 리스트 */}
            {!loading && list.length > 0 && (
                <ul className="space-y-3">
                    {list.map((item: NewsSummaryItem) => (
                        <li
                            key={item.id}
                            className="rounded-lg border border-white/15 p-4 hover:bg-white/5 transition"
                        >
                            <div className="flex gap-3">
                                <Thumbnail src={item.thumbnailUrl} alt={item.title} />
                                <div className="min-w-0 flex-1">
                                    <h3 className="text-base md:text-lg font-medium leading-snug line-clamp-2">
                                        {item.title}
                                    </h3>
                                    <p className="mt-1 text-xs md:text-sm opacity-70">
                                        {formatDateSafe(item.date)}
                                    </p>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            )}

            {/* 빈 상태 */}
            {!loading && list.length === 0 && !error && (
                <div className="rounded-md border border-white/15 p-4 text-sm opacity-80">
                    표시할 뉴스가 없습니다.
                </div>
            )}

            <div className="mt-6 text-xs opacity-60">
                {fetchedTime ? `마지막 갱신: ${fetchedTime}` : "아직 불러오지 않았습니다."}
            </div>
        </section>
    );
}

function Thumbnail({ src, alt }: { src: string | null; alt: string }) {
    if (!src) {
        return (
            <div
                className="h-16 w-24 rounded bg-white/10 grid place-items-center text-[10px] opacity-70 shrink-0"
                aria-label="썸네일 없음"
            >
                No Image
            </div>
        );
    }
    return (
        <img
            src={src}
            alt={alt}
            className="h-16 w-24 object-cover rounded shrink-0 bg-white/10"
            loading="lazy"
            referrerPolicy="no-referrer"
        />
    );
}

function formatDateSafe(v: string) {
    const d = new Date(v);
    if (!isNaN(d.getTime())) return d.toLocaleDateString();
    return v;
}
