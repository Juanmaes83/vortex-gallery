import { useState } from "react";
import { useTranslation } from "react-i18next";

const eventsData = [
  {
    id: 1,
    titleKey: "upcomingEvents.event1.title",
    dateKey: "upcomingEvents.event1.date",
    priceKey: "upcomingEvents.event1.price",
    type: "workshop",
    image: "/images/evento_taller.jpg",
  },
  {
    id: 2,
    titleKey: "upcomingEvents.event2.title",
    dateKey: "upcomingEvents.event2.date",
    priceKey: "upcomingEvents.event2.price",
    type: "guided",
    image: "/images/fotografia_expo.jpg",
  },
  {
    id: 3,
    titleKey: "upcomingEvents.event3.title",
    dateKey: "upcomingEvents.event3.date",
    priceKey: "upcomingEvents.event3.price",
    type: "talk",
    image: "/images/artista_mujer.jpg",
  },
  {
    id: 4,
    title: "Visita guiada: Horizontes fragmentados",
    date: "25 de julio, 18:00",
    price: "12€",
    type: "guided",
    image: "/images/expo_foto.jpg",
  },
  {
    id: 5,
    title: "Taller de escultura en bronce",
    date: "8 de agosto, 10:00",
    price: "65€",
    type: "workshop",
    image: "/images/expo_escultura.jpg",
  },
  {
    id: 6,
    title: "Conversación con Carlos Mendoza",
    date: "12 de agosto, 19:00",
    price: "Gratuito",
    type: "talk",
    image: "/images/artista_hombre.jpg",
  },
];

export default function Agenda() {
  const { t } = useTranslation();
  const [filter, setFilter] = useState("all");

  const filtered =
    filter === "all"
      ? eventsData
      : eventsData.filter((e) => e.type === filter);

  return (
    <div style={{ background: "#F8F6F0", paddingTop: "96px" }}>
      {/* Hero */}
      <section className="section-padding" style={{ paddingTop: "40px", paddingBottom: "40px" }}>
        <h1 className="font-display text-4xl md:text-5xl mb-2" style={{ color: "#111" }}>
          {t("agenda.title")}
        </h1>
        <p className="font-body mb-6" style={{ color: "#6B6B6B", fontSize: "15px" }}>
          {t("agenda.subtitle")}
        </p>

        {/* Filters */}
        <div className="flex flex-wrap gap-3">
          {[
            { key: "all", label: t("artists.filters.all") },
            { key: "workshop", label: t("agenda.eventTypes.workshop") },
            { key: "guided", label: t("agenda.eventTypes.guided") },
            { key: "talk", label: t("agenda.eventTypes.talk") },
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

      {/* Calendar visual */}
      <section className="section-padding" style={{ paddingBottom: "60px" }}>
        <div className="max-w-6xl mx-auto">
          <div className="glass-card p-6 mb-8">
            <div className="grid grid-cols-7 gap-2 text-center">
              {["L", "M", "X", "J", "V", "S", "D"].map((d, i) => (
                <div key={i} className="font-body text-xs uppercase tracking-wider py-2" style={{ color: "#C7B89A" }}>
                  {d}
                </div>
              ))}
              {Array.from({ length: 30 }, (_, i) => {
                const day = i + 1;
                const hasEvent = [15, 18, 22, 25, 8, 12].includes(day);
                return (
                  <div
                    key={i}
                    className="font-body py-2 rounded"
                    style={{
                      color: hasEvent ? "#111" : "#6B6B6B",
                      background: hasEvent ? "#C7B89A" : "transparent",
                      fontSize: "13px",
                      fontWeight: hasEvent ? 500 : 400,
                    }}
                  >
                    {day}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Events list */}
      <section className="section-padding" style={{ paddingBottom: "80px" }}>
        <div className="max-w-6xl mx-auto flex flex-col gap-6">
          {filtered.map((event) => (
            <div
              key={event.id}
              className="glass-card overflow-hidden flex flex-col md:flex-row"
            >
              <div className="image-zoom md:w-48 flex-shrink-0" style={{ aspectRatio: "16/10" }}>
                <img src={event.image} alt={event.title || (event.titleKey ? t(event.titleKey) : "")} className="w-full h-full object-cover" />
              </div>
              <div className="p-5 flex-1 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                  <span
                    className="font-body text-xs px-2 py-1 rounded mb-2 inline-block"
                    style={{
                      background: event.type === "workshop" ? "#D4A373" : event.type === "guided" ? "#C7B89A" : "#6B6B6B",
                      color: "#fff",
                    }}
                  >
                    {t(`agenda.eventTypes.${event.type}`)}
                  </span>
                  <h3 className="font-display text-xl" style={{ color: "#111" }}>
                    {event.title || (event.titleKey ? t(event.titleKey) : "")}
                  </h3>
                  <p className="font-body mt-1" style={{ color: "#6B6B6B", fontSize: "13px" }}>
                    {event.date || (event.dateKey ? t(event.dateKey) : "")}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-body font-medium" style={{ color: "#D4A373", fontSize: "14px" }}>
                    {event.price || (event.priceKey ? t(event.priceKey) : "")}
                  </span>
                  <button
                    className="font-body px-5 py-2 transition-all"
                    style={{
                      background: "#C7B89A",
                      color: "#111",
                      borderRadius: "6px",
                      fontSize: "13px",
                      fontWeight: 500,
                    }}
                  >
                    {t("cta.subscribe")}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
