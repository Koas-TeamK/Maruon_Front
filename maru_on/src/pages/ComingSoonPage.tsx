export default function ComingSoonPage() {
    return (
        <div
            style={{
                minHeight: "100vh",
                width: "100vw",
                backgroundColor: "#000",
                overflow: "auto",
            }}
        >
            {/* ✅ 포스터 배경 */}
            <img
                src="/img/comingSoon.jpg"
                alt="Coming Soon"
                style={{
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    zIndex: -1,
                }}
            />
        </div>
    );
}
