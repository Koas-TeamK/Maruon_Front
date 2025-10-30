// NewsDetailSection.tsx (임시 최소 렌더 버전)
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo } from "react";
import { newsDetailRequest, makeSelectNewsDetailById } from "@/features/news/newsSlice";

export default function NewsDetailSection({ id }: { id: number }) {
    const dispatch = useDispatch();
    const selectDetail = useMemo(() => makeSelectNewsDetailById(id), [id]);
    const detail = useSelector(selectDetail);

    useEffect(() => {
        dispatch(newsDetailRequest(id));
    }, [dispatch, id]);

    if (detail.loading && !detail.data) return <div style={{ color: "#fff" }}>불러오는 중…</div>;
    if (detail.error) return <div style={{ color: "#fff" }}>에러: {detail.error}</div>;
    if (!detail.data) return <div style={{ color: "#fff" }}>콘텐츠가 없습니다.</div>;

    const { title, date, content, imgUrl } = detail.data;

    return (
        <section
            style={{
                position: "relative",
                zIndex: 10000,           // 어떤 오버레이보다 위로
                background: "rgba(0,0,0,0.6)", // 대비 확보
                color: "#fff",           // 텍스트 확실히 보이게
                padding: 16,
                borderRadius: 8,
            }}
        >
            <h1 style={{ margin: 0, fontSize: 20, fontWeight: 700 }}>{title}</h1>
            <div style={{ opacity: 0.8, fontSize: 12, marginTop: 6 }}>{date}</div>

            {/* 텍스트를 이미지 위/아래 어디든 보이게: 우선 본문 먼저 */}
            <pre style={{ whiteSpace: "pre-wrap", marginTop: 12, fontFamily: "inherit" }}>
                {content}
            </pre>

            {Array.isArray(imgUrl) && imgUrl.length > 0 && (
                <div style={{ display: "grid", gap: 8, gridTemplateColumns: "repeat(2, minmax(0,1fr))", marginTop: 12 }}>
                    {imgUrl.map((src, i) => (
                        <img key={i} src={src} alt={`news-${id}-${i}`} style={{ width: "100%", height: "auto", display: "block" }} />
                    ))}
                </div>
            )}
        </section>
    );
}
