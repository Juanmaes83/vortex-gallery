import { useState } from "react";
import { useTranslation } from "react-i18next";
import ContactModal from "@/components/ContactModal";

const artistWorks = [
  { src: "/images/obra_abstracta.jpg", title: "Silencio I", forSale: true },
  { src: "/images/obra_pintura.jpg", title: "Textura III", forSale: true },
  { src: "/images/obra_retrato.jpg", title: "Memoria", forSale: false },
  { src: "/images/obra_acuarela.jpg", title: "Residuo IV", forSale: true },
];

export default function Artista() {
  const { t } = useTranslation();
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <div style={{ background: "#F8F6F0", paddingTop: "96px" }}>
      {/* Hero */}
      <section className="section-padding" style={{ paddingTop: "40px", paddingBottom: "40px" }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="image-zoom rounded-xl overflow-hidden" style={{ aspectRatio: "3/4" }}>
              <img
                src="/images/artista_mujer.jpg"
                alt={t("featuredArtists.artist1.name")}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="font-body text-xs uppercase tracking-widest mb-3" style={{ color: "#C7B89A" }}>
                {t("featuredArtists.artist1.discipline")}
              </p>
              <h1 className="font-display text-4xl md:text-5xl mb-6" style={{ color: "#111" }}>
                {t("featuredArtists.artist1.name")}
              </h1>
              <p className="font-body mb-6" style={{ color: "#6B6B6B", fontSize: "15px", lineHeight: 1.8 }}>
                {t("artistDetail.biography")}
              </p>
              <div className="glass-card p-5 mb-6">
                <p className="font-display italic text-lg" style={{ color: "#111", lineHeight: 1.5 }}>
                  "{t("artistDetail.statement")}"
                </p>
              </div>
              <div className="flex gap-3">
                <span className="font-body text-sm" style={{ color: "#6B6B6B" }}>
                  {t("artistDetail.social")}:
                </span>
                {["Instagram", "Twitter"].map((social) => (
                  <a
                    key={social}
                    href="#"
                    className="font-body text-sm underline-hover"
                    style={{ color: "#C7B89A" }}
                  >
                    {social}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Works */}
      <section className="section-padding" style={{ paddingBottom: "60px" }}>
        <div className="max-w-6xl mx-auto">
          <h2 className="font-display text-3xl mb-8" style={{ color: "#111" }}>
            {t("artistDetail.availableWorks")}
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {artistWorks.map((work, i) => (
              <div key={i} className="glass-card overflow-hidden">
                <div className="image-zoom" style={{ aspectRatio: "3/4" }}>
                  <img src={work.src} alt={work.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-4">
                  <h3 className="font-display text-lg" style={{ color: "#111" }}>
                    {work.title}
                  </h3>
                  {work.forSale && (
                    <button
                      onClick={() => setContactOpen(true)}
                      className="font-body mt-2 text-sm underline-hover"
                      style={{ color: "#D4A373" }}
                    >
                      {t("cta.consultAvailability")}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ContactModal
        open={contactOpen}
        onClose={() => setContactOpen(false)}
        title={t("contact.title")}
      />
    </div>
  );
}
