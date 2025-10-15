export default function ComingSoonPage() {
    const poster = "/img/comingSoon.jpg";

    return (
        <div
            style={{
                minHeight: "100vh", // ✅ 화면보다 커지면 스크롤 생김
                width: "100vw",
                backgroundColor: "#000", // ✅ 노치 검정 처리
                overflow: "auto",
            }}
        >
            <img
                src={poster}
                alt="Coming Soon"
                style={{
                    position: "absolute",     // ✅ fixed ❌, 이제는 absolute
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    zIndex: -1,
                }}
            />
            <div style={{ padding: "4rem", color: "#fff" }}>
                <h1>Coming Soon</h1>
                <p>스크롤 테스트용 텍스트</p>
                <div style={{ height: "200vh" }}></div>
                <p>아래까지 잘 보이면 성공</p>
            </div>
        </div>
    );
}
