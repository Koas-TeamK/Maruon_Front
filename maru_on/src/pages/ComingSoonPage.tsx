// ComingSoonPage.tsx
import MobileShell from "@/components/MobileShell";

export default function ComingSoonPage() {
    const comingSoon = "/img/comingSoon.jpg";
    return (
        <MobileShell allowInnerScroll>
            <img
                src={comingSoon}
                alt="Coming Soon"
                className="block w-full h-auto max-w-none"
            />
        </MobileShell>
    );
}
