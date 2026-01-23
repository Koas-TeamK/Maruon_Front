export default function CalmStandFooter() {

    const imgsrc = "/img/calmStand/hiy.png";

    return (
        <div className="w-full px-5 pt-7 pb-20 flex justify-center flex-col items-center gap-3">
            <div className="rounded-full  w-15 h-15 overflow-hidden">
                <img
                    src={imgsrc}
                    alt="img"
                    className="m-auto w-15 "
                />
            </div>
            <div className="text-[#5A5A5A]">
                +82 10-9978-6655
            </div>
        </div>
    )
}