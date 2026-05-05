import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const exhibitionsData = [
  {
    id: "silencio",
    titleKey: "exhibitions.exhibition1.title",
    datesKey: "exhibitions.exhibition1.dates",
    curatorKey: "exhibitions.exhibition1.curator",
    status: "current",
    image: "/images/expo_escultura.jpg",
  },
  {
    id: "horizontes",
    titleKey: "exhibitions.exhibition2.title",
    datesKey: "exhibitions.exhibition2.dates",
    curatorKey: "exhibitions.exhibition2.curator",
    status: "upcoming",
    image: "/images/expo_foto.jpg",
  },
  {
    id: "cuerpo",
    titleKey: "exhibitions.exhibition3.title",
    datesKey: "exhibitions.exhibition3.dates",
    curatorKey: "exhibitions.exhibition3.curator",
    status: "past",
    image: "/images/obra_abstracta.jpg",
  },
  {
    id: "luz",
    titleKey: "exhibitions.exhibition4.title",
    datesKey: "exhibitions.exhibition4.dates",
    curatorKey: "exhibitions.exhibition4.curator",
    status: "upcoming",
    image: "/images/obra_acuarela.jpg",
  },
];

export default function Exposiciones() {
  const { t } = useTranslation();
  const [filter, setFilter] = useState("all");
  const gridRef = useRef<HTMLDivElement>(null);

  const filtered =
    filter === "all"
      ? exhibitionsData
      : exhibitionsData.filter((e) => e.status === filter);

  useEffect(() => {
    if (!gridRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        gridRef.current!.children,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: "power3.out",
        }
      );
    });
    return () => ctx.revert();
  }, [filter]);

  return (
    <div style={{ background: "#F8F6F0", paddingTop: "96px" }}>
      {/* Hero */}
      <section className="section-padding" style={{ paddingTop: "40px", paddingBottom: "40px" }}>
        <h1 className="font-display text-4xl md:text-5xl mb-6" style={{ color: "#111" }}>
          {t("exhibitions.title")}
        </h1>

        {/* Filters */}
        <div className="flex flex-wrap gap-3">
          {[
            { key: "all", label: t("exhibitions.filters.current") + " / " + t("exhibitions.filters.upcoming") + " / " + t("exhibitions.filters.past") },
            { key: "current", label: t("exhibitions.filters.current") },
            { key: "upcoming", label: t("exhibitions.filters.upcoming") },
            { key: "past", label: t("exhibitions.filters.past") },
          ].map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className="font-body px-4 py-2 transition-all"
              style={{
                background: filter === f.key ? "#C7B89A" : "transparent",
                color: filter === f.key ? "#111" : "#6B6B6B",
                border: "1px solid rgba(199,184,154,0.4)",
                borderRadius: "6px",
                fontSize: "13px",
              }}
            >
              {f.key === "all" ? "Todos" : f.label}
            </button>
          ))}
        </div>
      </section>

      {/* Grid */}
      <section className="section-padding" style={{ paddingBottom: "80px" }}>
        <div ref={gridRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {filtered.map((expo) => (
            <Link
              key={expo.id}
              to={`/exposicion/${expo.id}`}
              className="group block glass-card overflow-hidden"
            >
              <div className="image-zoom" style={{ aspectRatio: "4/3" }}>
                <img
                  src={expo.image}
                  alt={t(expo.titleKey)}
                  className="w-full h-full object-cover"
                />
                <span
                  className="absolute top-3 right-3 font-body text-xs px-2 py-1 rounded"
                  style={{
                    background: expo.status === "current" ? "#C7B89A" : expo.status === "upcoming" ? "#D4A373" : "#6B6B6B",
                    color: "#fff",
                  }}
                >
                  {t(`exhibitions.filters.${expo.status}`)}
                </span>
              </div>
              <div className="p-5">
                <h3 className="font-display text-xl group-hover:text-terracotta transition-colors" style={{ color: "#111" }}>
                  {t(expo.titleKey)}
                </h3>
                <p className="font-body mt-1" style={{ color: "#6B6B6B", fontSize: "13px" }}>
                  {t(expo.datesKey)}
                </p>
                <p className="font-body mt-1" style={{ color: "#C7B89A", fontSize: "12px" }}>
                  {t(expo.curatorKey)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
