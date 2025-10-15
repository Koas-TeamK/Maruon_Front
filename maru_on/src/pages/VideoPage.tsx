import PosterPopup from "@/components/PosterPopup"

export default function VideoPage() {
    return (
        <div className="relative h-screen">
            {/* 배경 이미지 */}
            <div className="absolute inset-0 bg-[url('/img/background.png')] bg-[length:auto_500px] bg-repeat" />
            {/* 어둡게 오버레이 */}
            <div className="absolute inset-0 bg-black/20" />

            {/* 콘텐츠 그리드 */}
            <div className="relative grid grid-rows-[2fr_1fr_3fr] gap-4 h-full p-4">
                <PosterPopup />

                {/* 상단 섹션 */}
                <section className="flex items-center justify-center">
                    <div className="flex flex-col items-center">
                        <img
                            src="/logo/maruon-logo-gold.png"
                            alt="MARUON"
                            className="w-28 md:w-32 lg:w-36"
                        />
                        <h2 className="text-base sm:text-lg md:text-2xl font-gowun mt-5">
                            다시, 생명으로
                        </h2>

                    </div>
                </section>

                <section className="flex items-center justify-center">
                    <div className="flex flex-col items-center">
                        <div className="text-base sm:text-lg md:text-2xl font-gowun ">
                            <span className="font-bold">대나무 가죽의 숨결</span>과
                        </div>
                        <div className="text-base sm:text-lg md:text-2xl font-gowun ">
                            <span className="font-bold">산불피해목의 기억</span>을 담다
                        </div>
                    </div>
                </section>

                {/* 하단 섹션 */}
                <section className="flex items-start justify-center">
                    <div className="relative w-full max-w-6xl aspect-video">
                        <iframe
                            className="absolute inset-0 w-full h-full"
                            src="https://www.youtube.com/embed/7rk_LtB3kV0?si=CyS6rjgDHAzQduvx"
                            title="YouTube video player"
                            allowFullScreen
                        />
                    </div>
                </section>
            </div>
        </div>
    )
}
