// components/layout/Header.tsx
export default function Header() {
    return (
        <header className="fixed inset-x-0 top-0 z-[100] flex items-center justify-end px-4
+                       h-[clamp(56px,8vh,96px)]">  {/* 컨테이너도 커지게 */}
            <img
                src="/logo/maruon_mono_white.png"
                alt="MARUON"
                // 고정값 대신 clamp로 반응형 확대
                className="h-[clamp(40px,3vw,90px)] w-auto  max-h-full drop-shadow"
            />
        </header>
    );
}