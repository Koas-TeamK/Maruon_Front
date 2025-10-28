// PurchaseSection.tsx
import { useState, useCallback } from "react";
import { Trans, useTranslation } from "react-i18next";
import "./PurchaseSection.css";

export default function PurchaseSection({ lang }: { lang: string }) {
    const { t } = useTranslation("common");
    const highChair = "/img/chair/high-chair.png";
    const midChair = "/img/chair/mid-chair.png";
    const purchaseLink = "https://brand.naver.com/koasshop/products/12597423706";

    // 이미지 전환 상태
    const [variant, setVariant] = useState<"high" | "mid">("high");
    const showHigh = useCallback(() => setVariant("high"), []);
    const showMid = useCallback(() => setVariant("mid"), []);
    const next = useCallback(
        () => setVariant((v) => (v === "high" ? "mid" : "high")),
        []
    );
    const prev = useCallback(
        () => setVariant((v) => (v === "mid" ? "high" : "mid")),
        []
    );

    return (
        <section
            className="w-full h-full
      bg-[linear-gradient(to_bottom,white_0%,white_66%,#c8bdb6_66%,#c8bdb6_100%)]"
        >
            {/* 내용 */}
            <div className="w-full h-full flex flex-col lg:flex-row">
                {/* 왼쪽: 타이틀, 구매 버튼 */}
                <div
                    className="
            lg:w-1/3 lg:h-full w-full h-1/2
            text-[#403736]
            flex items-center justify-center sm:justify-start
            text-center sm:text-left
          "
                >
                    <div
                        className="
              flex flex-col gap-2 justify-center
              items-center sm:items-start
              lg:mb-30
              ml-0 sm:ml-10
            "
                    >
                        {/* 타이틀 */}
                        <div className="w-full">
                            <h1
                                className="
                  mb-3
                  lg:text-8xl md:text-8xl text-6xl
                  text-center sm:text-left
                "
                            >
                                <Trans ns="common" i18nKey="title.title" components={{ br: <br /> }} />
                            </h1>
                        </div>

                        {/* 일반용 설명 (sm 이상) */}
                        <div className="hidden sm:flex">
                            <div className="mb-5 lg:text-1xl md:text-base text-sm text-left">
                                <Trans ns="common" i18nKey="title.desc" components={{ br: <br /> }} />
                            </div>
                        </div>

                        {/* 모바일용 설명 (sm 미만) */}
                        <div className="sm:hidden w-full">
                            <div className="mb-5 lg:text-1xl md:text-base text-sm text-center">
                                <Trans ns="common" i18nKey="title.descM" components={{ br: <br /> }} />
                            </div>
                        </div>

                        {/* 구매 버튼: 새창 열기 */}
                        <div className="w-full flex justify-center sm:justify-start">
                            <a
                                href={purchaseLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block"
                                aria-label={t("title.buy")}
                            >
                                <button
                                    type="button"
                                    className="buy-btn inline-flex items-center gap-2 bg-transparent"
                                >
                                    <p data-text={t("title.buy")}>
                                        <Trans ns="common" i18nKey="title.buy" components={{ br: <br /> }} />
                                    </p>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-8 w-8"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={4}
                                        aria-hidden="true"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                                        />
                                    </svg>
                                </button>
                            </a>
                        </div>
                    </div>
                </div>

                {/* 오른쪽: 의자 이미지 (화살표/점 전환만) */}
                <div
                    className="
            relative 
            lg:w-2/3 lg:h-full w-full h-1/2
            select-none
          "
                    role="img"
                    aria-label={variant === "high" ? "High-back chair" : "Mid-back chair"}
                >
                    {/* high */}
                    <img
                        src={highChair}
                        alt="High-back chair"
                        className={`
              absolute left-1/2 -translate-x-1/2 
              sm:bottom-20 bottom-10  /* 모바일에서 점과 여백 확보 */
              lg:w-[29rem] md:w-[29rem] sm:w-[24rem] w-[18rem] h-auto
              transition-opacity duration-500 ease-out
              ${variant === "high" ? "opacity-100" : "opacity-0"}
            `}
                        draggable={false}
                    />

                    {/* mid */}
                    <img
                        src={midChair}
                        alt="Mid-back chair"
                        className={`
              absolute left-1/2 -translate-x-1/2 
              sm:bottom-20 bottom-10
              lg:w-[29rem] md:w-[29rem] sm:w-[24rem] w-[18rem] h-auto
              transition-opacity duration-500 ease-out
              ${variant === "mid" ? "opacity-100" : "opacity-0"}
            `}
                        draggable={false}
                    />

                    {/* 전환 컨트롤: 화살표 + 점 (미니멀) */}
                    <div className="absolute left-1/2 -translate-x-1/2 bottom-2 sm:bottom-6 flex items-center gap-3 sm:gap-4">
                        {/* prev 화살표 – 미니멀(투명 배경, 선만) */}
                        <button
                            type="button"
                            onClick={prev}
                            aria-label="Previous image"
                            className="
                p-2 sm:p-3 text-[#403736]
                hover:opacity-80 active:opacity-70
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#403736]/40
              "
                        >
                            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>

                        {/* 점(인디케이터) */}
                        <div className="flex items-center gap-2">
                            <button
                                type="button"
                                onClick={showHigh}
                                aria-pressed={variant === "high"}
                                aria-label="Show high-back"
                                className={`
                  h-2.5 w-2.5 rounded-full
                  ${variant === "high" ? "bg-[#403736]" : "bg-black/30"}
                  ring-1 ring-black/10
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#403736]/40
                `}
                            />
                            <button
                                type="button"
                                onClick={showMid}
                                aria-pressed={variant === "mid"}
                                aria-label="Show mid-back"
                                className={`
                  h-2.5 w-2.5 rounded-full
                  ${variant === "mid" ? "bg-[#403736]" : "bg-black/30"}
                  ring-1 ring-black/10
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#403736]/40
                `}
                            />
                        </div>

                        {/* next 화살표 – 미니멀 */}
                        <button
                            type="button"
                            onClick={next}
                            aria-label="Next image"
                            className="
                p-2 sm:p-3 text-[#403736]
                hover:opacity-80 active:opacity-70
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#403736]/40
              "
                        >
                            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
