import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router";
import gsap from "gsap";

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLAnchorElement[]>([]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // GSAP stagger animation for mobile menu
  useEffect(() => {
    if (mobileOpen && menuRef.current) {
      gsap.fromTo(
        linksRef.current.filter(Boolean),
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.08,
          ease: "power3.out",
          delay: 0.1,
        }
      );
    }
  }, [mobileOpen]);

  const toggleLang = () => {
    const next = i18n.language === "es" ? "en" : "es";
    i18n.changeLanguage(next);
  };

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { path: "/", label: t("nav.home") },
    { path: "/exposiciones", label: t("nav.exhibitions") },
    { path: "/artistas", label: t("nav.artists") },
    { path: "/agenda", label: t("nav.agenda") },
    { path: "/tienda", label: t("nav.shop") },
    { path: "/membresia", label: t("nav.membership") },
  ];

  return (
    <>
      <nav
        className="fixed top-0 left-0 w-full z-50 transition-all duration-500"
        style={{
          background: scrolled ? "rgba(248, 246, 240, 0.92)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(199,184,154,0.2)" : "1px solid transparent",
          height: scrolled ? "56px" : "72px",
        }}
      >
        <div className="section-padding flex items-center justify-between h-full">
          {/* Logo */}
          <Link
            to="/"
            className="font-display tracking-wide transition-all duration-300"
            style={{
              color: "#111",
              fontWeight: 500,
              fontSize: scrolled ? "16px" : "18px",
            }}
          >
            Vortex Gallery
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="underline-hover font-body"
                style={{
                  color: isActive(link.path) ? "#D4A373" : "#111",
                  fontWeight: isActive(link.path) ? 500 : 400,
                  fontSize: "clamp(11px, 0.85vw, 13px)",
                  letterSpacing: "0.02em",
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Language + mobile toggle */}
          <div className="flex items-center gap-4">
            <button
              onClick={toggleLang}
              className="font-body"
              style={{
                color: "#6B6B6B",
                fontSize: "12px",
                letterSpacing: "0.1em",
                border: "1px solid rgba(199,184,154,0.4)",
                borderRadius: "4px",
                padding: "4px 8px",
                background: "transparent",
                minHeight: "32px",
                minWidth: "40px",
              }}
            >
              {i18n.language === "es" ? t("language.en") : t("language.es")}
            </button>

            {/* Hamburger button */}
            <button
              className="md:hidden tap-zone relative"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Cerrar menu" : "Abrir menu"}
              style={{ background: "none", border: "none", width: "32px", height: "32px" }}
            >
              <div className="flex flex-col items-center justify-center gap-[5px]">
                <span
                  className="block w-5 h-[1.5px] transition-all duration-300"
                  style={{
                    background: "#111",
                    transform: mobileOpen ? "rotate(45deg) translate(2px, 2px)" : "none",
                  }}
                />
                <span
                  className="block w-5 h-[1.5px] transition-all duration-300"
                  style={{
                    background: "#111",
                    opacity: mobileOpen ? 0 : 1,
                  }}
                />
                <span
                  className="block w-5 h-[1.5px] transition-all duration-300"
                  style={{
                    background: "#111",
                    transform: mobileOpen ? "rotate(-45deg) translate(2px, -2px)" : "none",
                  }}
                />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      {mobileOpen && (
        <div
          ref={menuRef}
          className="mobile-menu-overlay md:hidden"
          style={{ zIndex: 90 }}
        >
          {navLinks.map((link, i) => (
            <Link
              key={link.path}
              to={link.path}
              ref={(el) => { if (el) linksRef.current[i] = el; }}
              onClick={() => setMobileOpen(false)}
              className="mobile-menu-link"
              style={{
                color: isActive(link.path) ? "#D4A373" : "#111",
                fontWeight: isActive(link.path) ? 600 : 400,
              }}
            >
              {link.label}
            </Link>
          ))}
          <button
            onClick={() => {
              toggleLang();
              setMobileOpen(false);
            }}
            className="font-body uppercase tracking-widest mt-4"
            style={{ color: "#6B6B6B", fontSize: "12px", letterSpacing: "0.15em" }}
          >
            {i18n.language === "es" ? "Switch to English" : "Cambiar a Espanol"}
          </button>
        </div>
      )}
    </>
  );
}
