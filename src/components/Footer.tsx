import { useTranslation } from "react-i18next";
import { Link } from "react-router";

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer style={{ background: "#111", color: "#F8F6F0" }}>
      <div className="section-padding" style={{ paddingTop: "64px", paddingBottom: "32px" }}>
        {/* Trust badges */}
        <div
          className="flex flex-wrap items-center justify-center gap-6 md:gap-10 mb-10 pb-8"
          style={{ borderBottom: "1px solid rgba(199,184,154,0.15)" }}
        >
          {[
            { icon: "🏛️", text: t("trust.arco") },
            { icon: "📰", text: t("trust.elpais") },
            { icon: "⭐", text: t("trust.rated") },
          ].map((badge, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="text-lg">{badge.icon}</span>
              <span
                className="font-body text-xs uppercase tracking-wider"
                style={{ color: "#9a9a9a" }}
              >
                {badge.text}
              </span>
            </div>
          ))}
        </div>

        <div
          className="grid gap-8"
          style={{ gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}
        >
          {/* Brand */}
          <div>
            <Link to="/" className="font-display text-lg" style={{ color: "#C7B89A" }}>
              Vortex Gallery
            </Link>
            <p className="font-body mt-3" style={{ color: "#9a9a9a", fontSize: "13px", lineHeight: 1.7 }}>
              {t("footer.address")}
            </p>
            <p className="font-body mt-1" style={{ color: "#9a9a9a", fontSize: "13px" }}>
              {t("footer.hours")}
            </p>
          </div>

          {/* Links */}
          <div>
            <h4
              className="font-body text-xs uppercase tracking-widest mb-4"
              style={{ color: "#C7B89A" }}
            >
              {t("nav.exhibitions")}
            </h4>
            <div className="flex flex-col gap-2">
              <Link to="/exposiciones" className="font-body" style={{ color: "#9a9a9a", fontSize: "13px" }}>
                {t("exhibitions.filters.current")}
              </Link>
              <Link to="/exposiciones" className="font-body" style={{ color: "#9a9a9a", fontSize: "13px" }}>
                {t("exhibitions.filters.upcoming")}
              </Link>
              <Link to="/agenda" className="font-body" style={{ color: "#9a9a9a", fontSize: "13px" }}>
                {t("nav.agenda")}
              </Link>
            </div>
          </div>

          <div>
            <h4
              className="font-body text-xs uppercase tracking-widest mb-4"
              style={{ color: "#C7B89A" }}
            >
              {t("nav.artists")}
            </h4>
            <div className="flex flex-col gap-2">
              <Link to="/artistas" className="font-body" style={{ color: "#9a9a9a", fontSize: "13px" }}>
                {t("artists.filters.painting")}
              </Link>
              <Link to="/artistas" className="font-body" style={{ color: "#9a9a9a", fontSize: "13px" }}>
                {t("artists.filters.sculpture")}
              </Link>
              <Link to="/artistas" className="font-body" style={{ color: "#9a9a9a", fontSize: "13px" }}>
                {t("artists.filters.photography")}
              </Link>
            </div>
          </div>

          <div>
            <h4
              className="font-body text-xs uppercase tracking-widest mb-4"
              style={{ color: "#C7B89A" }}
            >
              {t("nav.membership")}
            </h4>
            <div className="flex flex-col gap-2">
              <Link to="/membresia" className="font-body" style={{ color: "#9a9a9a", fontSize: "13px" }}>
                {t("membership.levels.basic")}
              </Link>
              <Link to="/membresia" className="font-body" style={{ color: "#9a9a9a", fontSize: "13px" }}>
                {t("membership.levels.premium")}
              </Link>
              <Link to="/membresia" className="font-body" style={{ color: "#9a9a9a", fontSize: "13px" }}>
                {t("membership.levels.protector")}
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ borderTop: "1px solid rgba(199,184,154,0.2)" }}
        >
          <p className="font-body" style={{ color: "#9a9a9a", fontSize: "12px" }}>
            &copy; 2026 Vortex Gallery. {t("footer.rights")}
          </p>
          <p className="font-body" style={{ color: "#C7B89A", fontSize: "12px", fontWeight: 500 }}>
            {t("footer.credit")}
          </p>
        </div>
      </div>
    </footer>
  );
}
