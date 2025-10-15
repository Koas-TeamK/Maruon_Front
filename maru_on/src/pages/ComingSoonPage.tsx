export default function ComingSoonPage() {
    const comingSoon = "/img/comingSoon.jpg";

    return (
        <div className="relative w-dvw min-h-dvh overflow-auto">
            {/* 🔥 배경 포스터 (cover 방식) */}
            <img
                src={comingSoon}
                alt="Coming Soon"
                className="fixed inset-0 w-full h-full object-cover z-0"
            />

            {/* 🌫️ 블러 + 그라디언트 */}
            <div className="fixed inset-0 pointer-events-none z-10 backdrop-blur-sm
        bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.10)_0%,rgba(43,29,22,0.6)_38%,rgba(14,9,7,0.9)_100%)]"
            />

            {/* 🌟 본문 내용이 실제로 페이지 높이를 차지 */}
            <div className="relative z-20 flex flex-col items-center justify-center min-h-dvh py-12 px-4">
                <img
                    src={comingSoon}
                    alt="Coming Soon"
                    className="object-contain max-w-full max-h-full"
                />
            </div>
        </div>
    );
}
