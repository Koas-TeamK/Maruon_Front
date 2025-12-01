import AboutSection from "@/components/calmstand/sections/AboutSection";
import AutoHeightSection from "@/components/calmstand/sections/AutoHeightSection";
import RhythmSection from "@/components/calmstand/sections/RhythmSection";
import FocusRelaxSection from "@/components/calmstand/sections/FocusRelaxSection";
import CatchPhrase from "@/components/calmstand/sections/Catchphrase";
import WellnessJourneySection from "@/components/calmstand/sections/WellnessJourneySection";
import './CalmStandPage.module.css'

export default function CalmStandPage() {
    return (
        <div>
            <div>
                <AboutSection />
            </div>
            <div>
                <AutoHeightSection />
            </div>
            <div>
                <RhythmSection />
            </div>
            <div>
                <FocusRelaxSection />
            </div>
            <div>
                <CatchPhrase />
            </div>
            <div>
                <WellnessJourneySection />
            </div>
        </div>
    );
}