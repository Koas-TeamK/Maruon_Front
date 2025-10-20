import { useTranslation } from "react-i18next";

export default function ApecSection() {
    const { t } = useTranslation("common");

    return (
        <div className="bg-black/50">
            {t("apec.section")}
        </div>
    )
}