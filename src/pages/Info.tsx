import { useTranslation } from "react-i18next";
import { Link } from "react-router";

export default function Info() {
  const { t } = useTranslation();

  return (
    <div style={{ background: "#F8F6F0", minHeight: "100vh", paddingTop: "96px" }}>
      <div className="section-padding" style={{ paddingTop: "40px", paddingBottom: "80px" }}>
        <div
          className="max-w-6xl mx-auto grid gap-16"
          style={{ gridTemplateColumns: "minmax(0, 1.4fr) minmax(0, 1fr)", alignItems: "start" }}
        >
          {/* LEFT - Bio */}
          <div>
            <p
              className="font-body uppercase tracking-widest text-xs mb-6"
              style={{ color: "#C7B89A" }}
            >
              {t("info.eyebrow")}
            </p>
            <h1
              className="font-display"
              style={{
                fontSize: "clamp(32px, 3.6vw, 52px)",
                color: "#111",
                lineHeight: 1.1,
                marginBottom: "40px",
              }}
            >
              {t("info.title")}
            </h1>
            <div className="flex flex-col gap-4">
              {(t("info.paragraphs", { returnObjects: true }) as string[]).map((p, i) => (
                <p
                  key={i}
                  className="font-body"
                  style={{ color: "#6B6B6B", fontSize: "16px", lineHeight: 1.7 }}
                >
                  {p}
                </p>
              ))}
            </div>
          </div>

          {/* RIGHT - Contact */}
          <div style={{ paddingTop: "40px" }}>
            <p
              className="font-body uppercase tracking-widest text-xs mb-6"
              style={{ color: "#C7B89A" }}
            >
              {t("info.contactLabel")}
            </p>
            <dl
              className="flex flex-col gap-4"
              style={{ fontSize: "15px" }}
            >
              {[
                { label: "Email", value: t("info.contactEntries.email"), href: "mailto:hola@vortexgallery.es" },
                { label: "Tel", value: t("info.contactEntries.phone"), href: "tel:+34629554870" },
                { label: "Instagram", value: t("info.contactEntries.instagram"), href: "https://instagram.com/vortexgallery" },
                { label: "Dirección", value: t("info.contactEntries.address") },
              ].map((entry, i) => (
                <div key={i} className="flex flex-col">
                  <dt className="font-body text-xs uppercase tracking-wider mb-1" style={{ color: "#C7B89A" }}>
                    {entry.label}
                  </dt>
                  <dd className="font-body" style={{ color: "#6B6B6B", lineHeight: 1.5 }}>
                    {entry.href ? (
                      <a
                        href={entry.href}
                        target={entry.href.startsWith("http") ? "_blank" : undefined}
                        rel="noreferrer"
                        className="underline-hover"
                        style={{ color: "#111" }}
                      >
                        {entry.value}
                      </a>
                    ) : (
                      entry.value
                    )}
                  </dd>
                </div>
              ))}
            </dl>

            <div
              className="mt-10 pt-6"
              style={{ borderTop: "1px solid rgba(199,184,154,0.25)" }}
            >
              <Link
                to="/"
                className="font-body text-sm underline-hover"
                style={{ color: "#111" }}
              >
                ← {t("cta.back")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
