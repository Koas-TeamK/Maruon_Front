import { useTranslation } from "react-i18next";

export default function PurchaseSection() {
    const { t } = useTranslation("common");

    return (
        <div className="bg-black/80">
            {t("purchase.section")}
        </div>
    )
}