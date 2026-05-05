import { useTranslation } from "react-i18next";
import { Link } from "react-router";

export default function StickyCTA() {
  const { t } = useTranslation();

  return (
    <div
      className="fixed bottom-0 left-0 w-full z-50 md:hidden"
      style={{
        background: "rgba(248, 246, 240, 0.95)",
        backdropFilter: "blur(12px)",
        borderTop: "1px solid rgba(199, 184, 154, 0.3)",
        padding: "10px 16px",
      }}
    >
      <Link
        to="/exposiciones"
        className="font-body block w-full text-center py-3"
        style={{
          background: "#C7B89A",
          color: "#111",
          borderRadius: "6px",
          fontSize: "14px",
          fontWeight: 500,
        }}
      >
        {t("cta.reserveTicket")}
      </Link>
    </div>
  );
}
