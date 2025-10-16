import PosterPopup from "@/components/PosterPopup"

export default function VideoPage() {
    return (
        <div className="relative h-screen">
            <PosterPopup />
            {/* 배경 이미지 */}
            <div className="absolute inset-0 -z-10 bg-[url('/img/background.png')] bg-[length:auto_500px] bg-repeat" />
            {/* 어둡게 오버레이 */}
            <div className="absolute inset-0 -z-10 bg-black/20" />

            {/* 콘텐츠 그리드 */}
            <div className="relative grid grid-rows-[1fr_1fr_2fr] h-full p-4">

                {/* 상단 섹션 */}
                <section className="flex items-center justify-center mt-20">
                    <div className="flex flex-col items-center">
                        <img
                            src="/logo/maruon-logo-gold.png"
                            alt="MARUON"
                            className="w-40 md:w-32 lg:w-36"
                        />
                    </div>
                </section>
                <section className="flex items-center justify-center">
                    <div className="flex flex-col items-center">
                        <div className="text-3xl sm:text-lg md:text-2xl font-gowun mb-5">
                            ‘다시, 생명으로’
                        </div>
                        <div className="text-base sm:text-lg md:text-2xl font-gowun ">
                            <span className="">대나무 가죽의 숨결</span>과
                        </div>
                        <div className="text-base sm:text-lg md:text-2xl font-gowun ">
                            <span className="">산불피해목의 기억</span>을 담다
                        </div>
                    </div>
                </section>

                {/* 하단 섹션 */}
                <section className="flex items-start justify-center">
                    <div className="relative w-full max-w-4xl aspect-video">
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
