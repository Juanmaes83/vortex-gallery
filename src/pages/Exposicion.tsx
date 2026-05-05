import { useParams } from "react-router";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import ContactModal from "@/components/ContactModal";

const worksData = [
  { src: "/images/obra_abstracta.jpg", title: "Silencio I", forSale: true },
  { src: "/images/obra_pintura.jpg", title: "Silencio II", forSale: false },
  { src: "/images/obra_retrato.jpg", title: "Presencia", forSale: true },
  { src: "/images/obra_acuarela.jpg", title: "Ausencia", forSale: false },
  { src: "/images/escultura.jpg", title: "Forma vacía", forSale: true },
];

export default function Exposicion() {
  const { id: _id } = useParams();
  const { t } = useTranslation();
  const [contactOpen, setContactOpen] = useState(false);
  const [selectedWork, setSelectedWork] = useState("");

  const openContact = (workTitle: string) => {
    setSelectedWork(workTitle);
    setContactOpen(true);
  };

  return (
    <div style={{ background: "#F8F6F0", paddingTop: "96px" }}>
      {/* Hero */}
      <section className="section-padding" style={{ paddingTop: "40px", paddingBottom: "40px" }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="image-zoom rounded-xl overflow-hidden" style={{ aspectRatio: "4/3" }}>
              <img
                src="/images/expo_escultura.jpg"
                alt={t("featuredExhibition.title")}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="font-body text-xs uppercase tracking-widest mb-3" style={{ color: "#C7B89A" }}>
                {t("featuredExhibition.eyebrow")}
              </p>
              <h1 className="font-display text-4xl md:text-5xl mb-4" style={{ color: "#111" }}>
                {t("featuredExhibition.title")}
              </h1>
              <p className="font-body mb-2" style={{ color: "#6B6B6B", fontSize: "14px" }}>
                {t("featuredExhibition.curator")}
              </p>
              <p className="font-body mb-6" style={{ color: "#D4A373", fontSize: "14px", fontWeight: 500 }}>
                {t("featuredExhibition.urgency")}
              </p>
              <button
                className="font-body px-6 py-3 transition-all"
                style={{
                  background: "#C7B89A",
                  color: "#111",
                  borderRadius: "6px",
                  fontSize: "14px",
                  fontWeight: 500,
                }}
              >
                {t("cta.reserveTicket")}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Curatorial text */}
      <section className="section-padding" style={{ paddingBottom: "60px" }}>
        <div className="max-w-3xl mx-auto">
          <p className="font-body" style={{ color: "#6B6B6B", fontSize: "16px", lineHeight: 1.8 }}>
            {t("exhibitionDetail.curatorialText")}
          </p>
        </div>
      </section>

      {/* Works carousel */}
      <section className="section-padding" style={{ paddingBottom: "80px" }}>
        <div className="max-w-6xl mx-auto">
          <h2 className="font-display text-3xl mb-8" style={{ color: "#111" }}>
            {t("exhibitionDetail.works")}
          </h2>
          <Swiper
            modules={[Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
            spaceBetween={24}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
          >
            {worksData.map((work, i) => (
              <SwiperSlide key={i}>
                <div className="glass-card overflow-hidden">
                  <div className="image-zoom" style={{ aspectRatio: "3/4" }}>
                    <img src={work.src} alt={work.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-display text-lg" style={{ color: "#111" }}>
                        {work.title}
                      </h3>
                      {work.forSale && (
                        <span
                          className="font-body text-xs px-2 py-1 rounded"
                          style={{ background: "#C7B89A", color: "#111" }}
                        >
                          {t("cta.consultPrice")}
                        </span>
                      )}
                    </div>
                    {work.forSale && (
                      <button
                        onClick={() => openContact(work.title)}
                        className="font-body mt-3 text-sm underline-hover"
                        style={{ color: "#D4A373" }}
                      >
                        {t("cta.consultAvailability")}
                      </button>
                    )}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      <ContactModal
        open={contactOpen}
        onClose={() => setContactOpen(false)}
        title={t("contact.title")}
        subtitle={`${t("contact.text")} (${selectedWork})`}
      />
    </div>
  );
}
