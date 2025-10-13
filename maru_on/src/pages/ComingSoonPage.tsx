import MobileShell from "@/components/MobileShell"
import { EllipsisOutlined } from '@ant-design/icons';

export default function ComingSoonPage() {
    const wechatSrc = "/logo/wechat.png";
    const lineSrc = "/logo/line.png";
    const linkedinSrc = "/logo/linkedin.png";
    const facebookSrc = "/logo/facebook.png";
    const comingSoon = "/img/comingSoon.jpg";

    return (
        <MobileShell>
            <div className="flex min-h-dvh flex-col">
                {/* 상단 바 
                <header className="h-14 px-4 flex items-center justify-end">
                    <EllipsisOutlined />
                </header>
                */}
                {/* 스크롤되는 본문 */}
                <main className="relative flex-1 w-full h-full grid place-items-center overflow-hidden">
                    {/* 배경층 */}
                    <img
                        src={comingSoon}
                        alt=""
                        aria-hidden
                        className="pointer-events-none absolute inset-0 w-full h-full object-cover blur-2xl scale-110 opacity-70 z-0"
                    />
                    <div className="pointer-events-none absolute inset-0 z-0
        bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.10)_0%,rgba(43,29,22,0.6)_38%,rgba(14,9,7,0.9)_100%)]" />

                    {/* 본 이미지: 안 잘리고 중앙 */}
                    <img
                        src={comingSoon}
                        alt="Coming Soon"
                        className="block z-10 object-contain max-w-full max-h-full"
                    />
                </main>

                {/* 하단 탭 
                <nav
                    className="
                        absolute z-50
                        right-4 md:right-3                        
                        bottom-[max(1rem,env(safe-area-inset-bottom))]  
                        "
                >
                    <div className="flex flex-col items-end gap-3">
                        <img src={wechatSrc} className="w-[50px] h-[50px] block" alt="WeChat" />
                        <img src={lineSrc} className="w-[50px] h-[50px] block" alt="LINE" />
                        <img src={linkedinSrc} className="w-[50px] h-[50px] block" alt="LinkedIn" />
                        <img src={facebookSrc} className="w-[50px] h-[50px] block" alt="Facebook" />
                    </div>
                </nav>
*/}
            </div>
        </MobileShell>
    )
}