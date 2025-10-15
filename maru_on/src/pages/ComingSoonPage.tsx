import MobileShell from "@/components/MobileShell"
//import { EllipsisOutlined } from '@ant-design/icons';

export default function ComingSoonPage() {
    //const wechatSrc = "/logo/wechat.png";
    //const lineSrc = "/logo/line.png";
    //const linkedinSrc = "/logo/linkedin.png";
    //const facebookSrc = "/logo/facebook.png";
    const comingSoon = "/img/comingSoon.jpg";

    return (
        <MobileShell>
            <div className="flex min-h-dvh flex-col">
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
            </div>
        </MobileShell>
    )
}
