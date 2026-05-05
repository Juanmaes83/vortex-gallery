import { useEffect, useRef, useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import VortexGallery from "@/lib/VortexGallery";
import type { PickResult } from "@/lib/VortexGallery";
import { galleryConfig } from "@/config";
import ImageDetailOverlay from "@/components/ImageDetailOverlay";
import NewsletterForm from "@/components/NewsletterForm";
import CustomCursor from "@/components/CustomCursor";
import Countdown from "@/components/Countdown";
import AnimatedCounter from "@/components/AnimatedCounter";
import StarRating from "@/components/StarRating";
import StickyCTA from "@/components/StickyCTA";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const { t } = useTranslation();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const vortexRef = useRef<VortexGallery | null>(null);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([]);
  const mouseDownRef = useRef<{ x: number; y: number } | null>(null);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const soundRef = useRef<HTMLAudioElement | null>(null);
  const [soundEnabled, setSoundEnabled] = useState(false);

  const images = galleryConfig.images;
  const hasImages = images.length > 0;

  // Vortex setup
  useEffect(() => {
    if (!canvasRef.current || !hasImages) return;
    const vortex = new VortexGallery(
      canvasRef.current,
      images.map((i) => i.src)
    );
    vortexRef.current = vortex;
    return () => { vortex.destroy(); };
  }, [hasImages, images]);

  useEffect(() => {
    vortexRef.current?.setPaused(selectedIdx !== null);
  }, [selectedIdx]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    vortexRef.current?.addMouseDelta(e.movementX, e.movementY);
  }, []);

  const handleMouseDown = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    mouseDownRef.current = { x: e.clientX, y: e.clientY };
  }, []);

  const handleMouseUp = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!vortexRef.current || !canvasRef.current || !mouseDownRef.current) return;
    const dx = e.clientX - mouseDownRef.current.x;
    const dy = e.clientY - mouseDownRef.current.y;
    if (Math.sqrt(dx * dx + dy * dy) > 8) { mouseDownRef.current = null; return; }
    const rect = canvasRef.current.getBoundingClientRect();
    const result: PickResult = vortexRef.current.pickAtScreen(e.clientX, e.clientY, rect);
    if (!result) return;
    if (result.type === "instance") vortexRef.current.setCenterImage(result.index);
    else if (result.type === "center") setSelectedIdx(result.index);
    mouseDownRef.current = null;
  }, []);

  const handleTouchStart = useCallback((e: React.TouchEvent<HTMLCanvasElement>) => {
    const touch = e.touches[0];
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent<HTMLCanvasElement>) => {
    if (!vortexRef.current || !touchStartRef.current) return;
    const touch = e.touches[0];
    vortexRef.current.addTouchDelta(touch.clientX - touchStartRef.current.x, touch.clientY - touchStartRef.current.y);
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
  }, []);

  const toggleSound = useCallback(() => {
    if (!soundRef.current) {
      const audio = new Audio("/sounds/gallery-ambient.mp3");
      audio.loop = true;
      audio.volume = 0.08;
      soundRef.current = audio;
    }
    if (soundEnabled) { soundRef.current.pause(); setSoundEnabled(false); }
    else { soundRef.current.play().catch(() => {}); setSoundEnabled(true); }
  }, [soundEnabled]);

  // GSAP scroll animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      sectionsRef.current.forEach((el) => {
        if (!el) return;
        gsap.fromTo(el, { opacity: 0, y: 50 }, {
          opacity: 1, y: 0, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none none" },
        });
      });
    });
    return () => ctx.revert();
  }, []);

  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !sectionsRef.current.includes(el)) sectionsRef.current.push(el);
  };

  return (
    <div style={{ background: "#F8F6F0" }}>
      <CustomCursor />
      <StickyCTA />

      {/* ==================== HERO WITH VORTEX ==================== */}
      <section className="relative w-full overflow-hidden vortex-hero" style={{ minHeight: "600px" }}>
        <canvas
          ref={canvasRef}
          onMouseMove={handleMouseMove}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={() => { touchStartRef.current = null; }}
          className="vortex-canvas"
          style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: 1, touchAction: "none", userSelect: "none" }}
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center section-padding hero-overlay" style={{ zIndex: 10, pointerEvents: "none" }}>
          <h1 className="font-display hero-headline">{t("hero.headline")}</h1>
          <p className="font-body mt-6 hero-subheadline">{t("hero.subheadline")}</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10" style={{ pointerEvents: "auto" }}>
            <Link to="/exposiciones" className="font-body inline-block px-8 py-3 hero-cta-primary">{t("cta.exploreExhibitions")}</Link>
            <a href="#newsletter" className="font-body inline-block px-8 py-3 hero-cta-secondary">{t("cta.newsletterGuide")}</a>
          </div>
          <p className="font-body mt-8 hero-hint">Mueve el raton para rotar &bull; Clic en obra para seleccionarla &bull; Clic en el centro para ampliar</p>
          <button onClick={toggleSound} className="absolute bottom-6 right-6 font-body text-xs uppercase tracking-widest flex items-center gap-2"
            style={{ pointerEvents: "auto", color: "#6B6B6B", background: "rgba(248,246,240,0.7)", backdropFilter: "blur(8px)", border: "1px solid rgba(199,184,154,0.25)", borderRadius: "20px", padding: "6px 14px", zIndex: 20 }}>
            {soundEnabled ? "🔊" : "🔇"}<span>Ambiente</span>
          </button>
        </div>
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 scroll-indicator" style={{ zIndex: 10, pointerEvents: "none" }}>
          <span className="font-body text-xs uppercase tracking-widest" style={{ color: "#6B6B6B", opacity: 0.6 }}>Scroll</span>
          <div className="w-px h-8" style={{ background: "linear-gradient(to bottom, #C7B89A, transparent)" }} />
        </div>
      </section>

      {/* ==================== STATS BAR ==================== */}
      <section ref={addToRefs} className="section-padding" style={{ paddingTop: "60px", paddingBottom: "40px" }}>
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { value: 150, suffix: "+", label: t("stats.works") },
            { value: 35, suffix: "", label: t("stats.artists") },
            { value: 12000, suffix: "", label: t("stats.visitors") },
            { value: 8, suffix: "", label: t("stats.years") },
          ].map((stat, i) => (
            <div key={i} className="glass-card p-5">
              <p className="font-display text-3xl md:text-4xl" style={{ color: "#C7B89A" }}>
                <AnimatedCounter end={stat.value} duration={2500} suffix={stat.suffix} />
              </p>
              <p className="font-body mt-1" style={{ color: "#6B6B6B", fontSize: "13px" }}>{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ==================== FEATURED EXHIBITION + COUNTDOWN ==================== */}
      <section ref={addToRefs} className="section-padding" style={{ paddingTop: "60px", paddingBottom: "80px" }}>
        <div className="max-w-6xl mx-auto">
          <p className="font-body uppercase tracking-widest text-xs mb-4" style={{ color: "#C7B89A" }}>
            {t("featuredExhibition.eyebrow")}
          </p>
          <Countdown targetDate="2026-06-30T23:59:59" />
          <div className="grid md:grid-cols-2 gap-8 items-center mt-6">
            <div className="image-zoom rounded-xl overflow-hidden" style={{ aspectRatio: "4/3" }}>
              <img src="/images/expo_escultura.jpg" alt={t("featuredExhibition.title")} className="w-full h-full object-cover" loading="lazy" />
            </div>
            <div>
              <h2 className="font-display section-title mb-4" style={{ color: "#111" }}>
                {t("featuredExhibition.title")}
              </h2>
              <p className="font-body mb-2" style={{ color: "#D4A373", fontSize: "14px", fontWeight: 500 }}>
                {t("featuredExhibition.urgency")}
              </p>
              <p className="font-body mb-6" style={{ color: "#6B6B6B", lineHeight: 1.7 }}>
                {t("exhibitionDetail.curatorialText")}
              </p>
              <p className="font-body mb-6" style={{ color: "#6B6B6B", fontSize: "13px" }}>
                {t("featuredExhibition.curator")}
              </p>
              <Link to="/exposicion/silencio" className="font-body inline-block px-6 py-3 hero-cta-primary">
                {t("cta.reserveTicket")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== FEATURED ARTISTS ==================== */}
      <section ref={addToRefs} className="section-padding" style={{ paddingBottom: "80px" }}>
        <div className="max-w-6xl mx-auto">
          <h2 className="font-display section-title mb-10" style={{ color: "#111" }}>
            {t("featuredArtists.title")}
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[
              { name: t("featuredArtists.artist1.name"), discipline: t("featuredArtists.artist1.discipline"), img: "/images/artista_mujer.jpg", slug: "elena-vazquez" },
              { name: t("featuredArtists.artist2.name"), discipline: t("featuredArtists.artist2.discipline"), img: "/images/artista_hombre.jpg", slug: "carlos-mendoza" },
              { name: t("featuredArtists.artist3.name"), discipline: t("featuredArtists.artist3.discipline"), img: "/images/fotografia_expo.jpg", slug: "laura-sanchez" },
            ].map((artist) => (
              <Link key={artist.slug} to={`/artista/${artist.slug}`} className="group block">
                <div className="image-zoom rounded-xl overflow-hidden mb-4" style={{ aspectRatio: "3/4" }}>
                  <img src={artist.img} alt={artist.name} className="w-full h-full object-cover" loading="lazy" />
                </div>
                <h3 className="font-display text-xl group-hover:text-terracotta transition-colors" style={{ color: "#111" }}>{artist.name}</h3>
                <p className="font-body text-sm" style={{ color: "#6B6B6B" }}>{artist.discipline}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== ARTIST QUOTE ==================== */}
      <section ref={addToRefs} className="section-padding" style={{ paddingBottom: "80px" }}>
        <div className="max-w-4xl mx-auto text-center">
          <div className="glass-card p-8 md:p-12">
            <p className="font-display italic text-xl md:text-2xl mb-6" style={{ color: "#111", lineHeight: 1.5 }}>
              &ldquo;{t("artistQuote.text")}&rdquo;
            </p>
            <div className="flex flex-col items-center gap-2">
              <img src="/images/artista_mujer.jpg" alt={t("artistQuote.author")} className="w-16 h-16 rounded-full object-cover mb-2" />
              <span className="font-display text-lg" style={{ color: "#111" }}>{t("artistQuote.author")}</span>
              <span className="font-body text-sm" style={{ color: "#6B6B6B" }}>{t("artistQuote.role")}</span>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== UPCOMING EVENTS ==================== */}
      <section ref={addToRefs} className="section-padding" style={{ paddingBottom: "80px" }}>
        <div className="max-w-6xl mx-auto">
          <h2 className="font-display section-title mb-10" style={{ color: "#111" }}>
            {t("upcomingEvents.title")}
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[
              { title: t("upcomingEvents.event1.title"), date: t("upcomingEvents.event1.date"), price: t("upcomingEvents.event1.price"), img: "/images/evento_taller.jpg" },
              { title: t("upcomingEvents.event2.title"), date: t("upcomingEvents.event2.date"), price: t("upcomingEvents.event2.price"), img: "/images/fotografia_expo.jpg" },
              { title: t("upcomingEvents.event3.title"), date: t("upcomingEvents.event3.date"), price: t("upcomingEvents.event3.price"), img: "/images/artista_mujer.jpg" },
            ].map((event, i) => (
              <div key={i} className="glass-card overflow-hidden">
                <div className="image-zoom" style={{ aspectRatio: "16/10" }}>
                  <img src={event.img} alt={event.title} className="w-full h-full object-cover" loading="lazy" />
                </div>
                <div className="p-5">
                  <p className="font-body text-xs uppercase tracking-wider mb-2" style={{ color: "#C7B89A" }}>{event.date}</p>
                  <h3 className="font-display text-lg mb-2" style={{ color: "#111" }}>{event.title}</h3>
                  <div className="flex items-center justify-between mt-4">
                    <span className="font-body text-sm font-medium" style={{ color: "#D4A373" }}>{event.price}</span>
                    <button className="font-body text-sm px-4 py-2 event-cta">{t("cta.subscribe")}</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== TESTIMONIAL WITH PHOTO ==================== */}
      <section ref={addToRefs} className="section-padding" style={{ paddingBottom: "80px" }}>
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display section-title mb-10 text-center" style={{ color: "#111" }}>
            {t("testimonials.title")}
          </h2>
          <div className="glass-card p-8 md:p-10">
            <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
              <div className="flex-shrink-0 text-center">
                <img
                  src="/images/critico.jpg"
                  alt={t("testimonial.name")}
                  className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover mx-auto mb-3"
                  style={{ border: "2px solid #C7B89A" }}
                />
                <StarRating rating={5} />
              </div>
              <div className="text-center md:text-left">
                <p className="font-display italic text-lg md:text-xl mb-4" style={{ color: "#111", lineHeight: 1.6 }}>
                  &ldquo;{t("testimonial.quote")}&rdquo;
                </p>
                <p className="font-body font-medium" style={{ color: "#111", fontSize: "15px" }}>
                  {t("testimonial.name")}
                </p>
                <p className="font-body" style={{ color: "#C7B89A", fontSize: "13px" }}>
                  {t("testimonial.role")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== MEMBERSHIP ==================== */}
      <section ref={addToRefs} className="section-padding" style={{ paddingBottom: "80px" }}>
        <div className="max-w-6xl mx-auto">
          <h2 className="font-display section-title mb-2 text-center" style={{ color: "#111" }}>
            {t("membership.title")}
          </h2>
          <p className="font-body mb-2 text-center" style={{ color: "#6B6B6B", fontSize: "15px" }}>
            {t("membership.subtitle")}
          </p>
          <p className="font-body mb-10 text-center" style={{ color: "#C7B89A", fontSize: "14px" }}>
            {t("socialProof.membersCounter")} {t("socialProof.membersSubtitle")}
          </p>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[
              { level: t("membership.levels.basic"), price: "60€/año", beforePrice: "90€", benefits: [t("membership.benefits.freeEntry"), t("membership.benefits.guidedTours")], highlight: false },
              { level: t("membership.levels.premium"), price: "120€/año", beforePrice: "150€", benefits: [t("membership.benefits.freeEntry"), t("membership.benefits.guidedTours"), t("membership.benefits.previews"), t("membership.benefits.catalog")], highlight: true },
              { level: t("membership.levels.protector"), price: "300€/año", beforePrice: "", benefits: [t("membership.benefits.freeEntry"), t("membership.benefits.guidedTours"), t("membership.benefits.previews"), t("membership.benefits.catalog"), t("membership.benefits.studioVisit"), t("membership.benefits.nameWall"), t("membership.benefits.dinner")], highlight: false },
            ].map((plan, i) => (
              <div key={i} className="glass-card p-6 flex flex-col relative" style={{ borderColor: plan.highlight ? "#C7B89A" : "rgba(199,184,154,0.25)", borderWidth: plan.highlight ? "2px" : "1px" }}>
                {plan.highlight && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 font-body text-xs px-3 py-1 rounded-full" style={{ background: "#C7B89A", color: "#111", fontWeight: 500 }}>
                    {t("membershipPricing.popular")}
                  </span>
                )}
                <h3 className="font-display text-2xl mb-1" style={{ color: "#111" }}>{plan.level}</h3>
                <div className="flex items-baseline gap-2 mb-1">
                  <p className="font-body text-lg" style={{ color: "#C7B89A", fontWeight: 600 }}>{plan.price}</p>
                  {plan.beforePrice && (
                    <>
                      <p className="font-body text-sm" style={{ color: "#6B6B6B", textDecoration: "line-through" }}>
                        {plan.beforePrice}
                      </p>
                      {i === 0 && (
                        <span className="font-body text-xs px-2 py-0.5 rounded" style={{ background: "rgba(74,222,128,0.15)", color: "#4ade80" }}>
                          {t("membershipPricing.savings")}
                        </span>
                      )}
                    </>
                  )}
                </div>
                <ul className="flex flex-col gap-2 flex-1 mb-6">
                  {plan.benefits.map((b, j) => (
                    <li key={j} className="font-body flex items-start gap-2" style={{ color: "#6B6B6B", fontSize: "13px" }}>
                      <span style={{ color: "#C7B89A" }}>&#10003;</span>{b}
                    </li>
                  ))}
                </ul>
                <Link to="/membresia" className="font-body text-center py-3 membership-cta" data-highlight={plan.highlight}>
                  {t("membership.cta")}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== NEWSLETTER ==================== */}
      <section id="newsletter" ref={addToRefs} className="section-padding" style={{ paddingBottom: "80px" }}>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1">
            <h2 className="font-display section-title mb-4" style={{ color: "#111" }}>
              {t("newsletter.title")}
            </h2>
            <p className="font-body" style={{ color: "#6B6B6B", fontSize: "15px", lineHeight: 1.7 }}>
              {t("newsletter.subtitle")}
            </p>
          </div>
          <NewsletterForm />
        </div>
      </section>

      {/* ==================== FAQ ==================== */}
      <section ref={addToRefs} className="section-padding" style={{ paddingBottom: "80px" }}>
        <div className="max-w-3xl mx-auto">
          <h2 className="font-display section-title mb-10" style={{ color: "#111" }}>
            {t("faq.title")}
          </h2>
          <div className="flex flex-col gap-4">
            {[
              { q: t("faq.q1"), a: t("faq.a1") },
              { q: t("faq.q2"), a: t("faq.a2") },
              { q: t("faq.q3"), a: t("faq.a3") },
              { q: t("faq.q4"), a: t("faq.a4") },
              { q: t("faq.q5"), a: t("faq.a5") },
              { q: t("faq.q6"), a: t("faq.a6") },
              { q: t("faq.q7"), a: t("faq.a7") },
            ].map((faq, i) => (
              <div key={i} className="glass-card p-5 faq-card">
                <h3 className="font-display text-lg mb-2" style={{ color: "#111" }}>{faq.q}</h3>
                <p className="font-body" style={{ color: "#6B6B6B", fontSize: "14px", lineHeight: 1.6 }}>{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Overlay */}
      <ImageDetailOverlay image={selectedIdx !== null ? images[selectedIdx] : null} onClose={() => setSelectedIdx(null)} />
    </div>
  );
}
