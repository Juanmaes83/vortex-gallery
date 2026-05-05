import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import gsap from "gsap";

const artistsData = [
  {
    id: "elena-vazquez",
    nameKey: "featuredArtists.artist1.name",
    disciplineKey: "featuredArtists.artist1.discipline",
    category: "painting",
    image: "/images/artista_mujer.jpg",
  },
  {
    id: "carlos-mendoza",
    nameKey: "featuredArtists.artist2.name",
    disciplineKey: "featuredArtists.artist2.discipline",
    category: "sculpture",
    image: "/images/artista_hombre.jpg",
  },
  {
    id: "laura-sanchez",
    nameKey: "featuredArtists.artist3.name",
    disciplineKey: "featuredArtists.artist3.discipline",
    category: "photography",
    image: "/images/fotografia_expo.jpg",
  },
  {
    id: "ana-ruiz",
    nameKey: "Ana Ruiz",
    disciplineKey: "Instalación",
    category: "installation",
    image: "/images/expo_foto.jpg",
  },
  {
    id: "pedro-gonzalez",
    nameKey: "Pedro González",
    disciplineKey: "Fotografía",
    category: "photography",
    image: "/images/obra_acuarela.jpg",
  },
  {
    id: "marta-lopez",
    nameKey: "Marta López",
    disciplineKey: "Pintura",
    category: "painting",
    image: "/images/obra_retrato.jpg",
  },
];

export default function Artistas() {
  const { t } = useTranslation();
  const [filter, setFilter] = useState("all");
  const gridRef = useRef<HTMLDivElement>(null);

  const filtered =
    filter === "all"
      ? artistsData
      : artistsData.filter((a) => a.category === filter);

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
          stagger: 0.08,
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
          {t("artists.title")}
        </h1>

        {/* Filters */}
        <div className="flex flex-wrap gap-3">
          {[
            { key: "all", label: t("artists.filters.all") },
            { key: "painting", label: t("artists.filters.painting") },
            { key: "sculpture", label: t("artists.filters.sculpture") },
            { key: "photography", label: t("artists.filters.photography") },
            { key: "installation", label: t("artists.filters.installation") },
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
              {f.label}
            </button>
          ))}
        </div>
      </section>

      {/* Grid */}
      <section className="section-padding" style={{ paddingBottom: "80px" }}>
        <div ref={gridRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {filtered.map((artist) => (
            <Link
              key={artist.id}
              to={`/artista/${artist.id}`}
              className="group block"
            >
              <div className="image-zoom rounded-xl overflow-hidden mb-4" style={{ aspectRatio: "3/4" }}>
                <img
                  src={artist.image}
                  alt={t(artist.nameKey) || artist.nameKey}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-display text-xl group-hover:text-terracotta transition-colors" style={{ color: "#111" }}>
                {t(artist.nameKey) || artist.nameKey}
              </h3>
              <p className="font-body text-sm" style={{ color: "#6B6B6B" }}>
                {t(artist.disciplineKey) || artist.disciplineKey}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
