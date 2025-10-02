import MobileShell from "@/components/MobileShell"
import { EllipsisOutlined } from '@ant-design/icons';

export default function RootPage() {
    const wechatSrc = "/logo/wechat.png";
    const lineSrc = "/logo/line.png";
    const linkedinSrc = "/logo/linkedin.png";
    const facebookSrc = "/logo/facebook.png";

    return (
        <MobileShell>
            <div className="flex min-h-dvh flex-col">
                {/* 상단 바 */}
                <header className="h-14 px-4 flex items-center justify-end">
                    <EllipsisOutlined />
                </header>

                {/* 스크롤되는 본문 */}
                <main className="flex-1 overflow-y-auto px-4 py-3">
                    준비중...
                    <div className="mt-3 h-48 bg-gray-100 rounded-xl" />
                    <div className="mt-3 h-48 bg-gray-100 rounded-xl" />
                    <div className="mt-3 h-48 bg-gray-100 rounded-xl" />
                    <div className="mt-3 h-48 bg-gray-100 rounded-xl" />
                    <div className="mt-3 h-48 bg-gray-100 rounded-xl" />
                    <div className="mt-3 h-48 bg-gray-100 rounded-xl" />
                    <div className="mt-3 h-48 bg-gray-100 rounded-xl" />
                    <div className="mt-3 h-48 bg-gray-100 rounded-xl" />
                    <div className="mt-3 h-48 bg-gray-100 rounded-xl" />
                </main>

                {/* 하단 탭 */}
                <nav className="fixed right-4 bottom-4 z-50">
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