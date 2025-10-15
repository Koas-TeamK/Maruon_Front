import PosterPopup from "@/components/PosterPopup"

export default function VideoPage() {
    return (
        <div className="flex justify-center items-center h-screen bg-black px-4">
            <PosterPopup />
            <div className="relative w-full max-w-6xl aspect-video">
                <iframe
                    className="absolute top-0 left-0 w-full h-full"
                    src="https://www.youtube.com/embed/7rk_LtB3kV0?si=CyS6rjgDHAzQduvx"
                    title="YouTube video player"
                    allowFullScreen
                />
            </div>
        </div>
    )
}