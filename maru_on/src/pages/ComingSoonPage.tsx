// src/pages/ComingSoonPage.tsx
export default function ComingSoonPage() {
    return (
        <>
            <img
                src="/img/comingSoon.jpg"
                alt="포스터"
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100vw",
                    height: "100vh",
                    objectFit: "cover",
                    zIndex: 9999,
                }}
            />
        </>
    );
}