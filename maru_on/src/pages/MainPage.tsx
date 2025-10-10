import MobileShell from "@/components/MobileShell";

export default function MainPage() {
    const wechatSrc = "/logo/wechat.png";
    const lineSrc = "/logo/line.png";
    const linkedinSrc = "/logo/linkedin.png";
    const facebookSrc = "/logo/facebook.png";

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
                    준비중..
                </main>

                {/* 하단 탭 */}
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
            </div>
        </MobileShell>
    )
}