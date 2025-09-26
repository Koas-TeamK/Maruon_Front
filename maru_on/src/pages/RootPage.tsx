import MobileShell from "@/components/MobileShell"

export default function RootPage() {
    return (
        <MobileShell>
            <div className="flex min-h-dvh flex-col">
                {/* 상단 바 */}
                <header className="h-14 px-4 flex items-center">
                    헤더
                </header>

                {/* 스크롤되는 본문 */}
                <main className="flex-1 overflow-y-auto px-4 py-3">
                    준비중...
                    <div className="mt-3 h-48 bg-gray-100 rounded-xl" />
                    <div className="mt-3 h-48 bg-gray-100 rounded-xl" />
                    <div className="mt-3 h-48 bg-gray-100 rounded-xl" />
                </main>

                {/* 하단 탭 */}
                <nav className="h-16 border-t bg-white">
                    <div className="grid h-full grid-cols-3 place-items-center text-sm">
                        <button>홈</button><button>검색</button><button>내 정보</button>
                    </div>
                </nav>
            </div>
        </MobileShell>
    )
}