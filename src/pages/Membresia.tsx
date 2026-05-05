import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const plans = [
  {
    level: "membership.levels.basic",
    price: "60€/año",
    benefits: ["membership.benefits.freeEntry", "membership.benefits.guidedTours"],
    highlight: false,
  },
  {
    level: "membership.levels.premium",
    price: "120€/año",
    benefits: [
      "membership.benefits.freeEntry",
      "membership.benefits.guidedTours",
      "membership.benefits.previews",
      "membership.benefits.catalog",
    ],
    highlight: true,
  },
  {
    level: "membership.levels.protector",
    price: "300€/año",
    benefits: [
      "membership.benefits.freeEntry",
      "membership.benefits.guidedTours",
      "membership.benefits.previews",
      "membership.benefits.catalog",
      "membership.benefits.studioVisit",
      "membership.benefits.nameWall",
      "membership.benefits.dinner",
    ],
    highlight: false,
  },
];

export default function Membresia() {
  const { t } = useTranslation();
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", level: "Premium" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setForm({ name: "", email: "", level: "Premium" });
    }, 3000);
  };

  return (
    <div style={{ background: "#F8F6F0", paddingTop: "96px" }}>
      {/* Hero */}
      <section className="section-padding" style={{ paddingTop: "40px", paddingBottom: "40px" }}>
        <h1 className="font-display text-4xl md:text-5xl mb-2" style={{ color: "#111" }}>
          {t("membershipPage.title")}
        </h1>
        <p className="font-body" style={{ color: "#6B6B6B", fontSize: "15px" }}>
          {t("membershipPage.subtitle")}
        </p>
      </section>

      {/* Comparison table */}
      <section className="section-padding" style={{ paddingBottom: "60px" }}>
        <div className="max-w-6xl mx-auto grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {plans.map((plan, i) => (
            <div
              key={i}
              className="glass-card p-6 flex flex-col"
              style={{
                borderColor: plan.highlight ? "#C7B89A" : "rgba(199,184,154,0.25)",
                borderWidth: plan.highlight ? "2px" : "1px",
              }}
            >
              <h3 className="font-display text-2xl mb-1" style={{ color: "#111" }}>
                {t(plan.level)}
              </h3>
              <p className="font-body text-lg mb-4" style={{ color: "#C7B89A", fontWeight: 600 }}>
                {plan.price}
              </p>
              <ul className="flex flex-col gap-2 flex-1 mb-6">
                {plan.benefits.map((b, j) => (
                  <li
                    key={j}
                    className="font-body flex items-start gap-2"
                    style={{ color: "#6B6B6B", fontSize: "13px" }}
                  >
                    <span style={{ color: "#C7B89A" }}>✓</span>
                    {t(b)}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding" style={{ paddingBottom: "60px" }}>
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display text-2xl mb-6" style={{ color: "#111" }}>
            Testimonios
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="glass-card p-6">
              <p className="font-body italic" style={{ color: "#111", fontSize: "15px", lineHeight: 1.6 }}>
                "{t("membershipPage.testimonial1")}"
              </p>
            </div>
            <div className="glass-card p-6">
              <p className="font-body italic" style={{ color: "#111", fontSize: "15px", lineHeight: 1.6 }}>
                "{t("membershipPage.testimonial2")}"
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="section-padding" style={{ paddingBottom: "80px" }}>
        <div className="max-w-md mx-auto glass-card p-8">
          <h2 className="font-display text-2xl mb-6" style={{ color: "#111" }}>
            {t("membershipPage.form.title")}
          </h2>

          {sent ? (
            <p className="font-body text-center py-6" style={{ color: "#6B6B6B" }}>
              {t("membershipPage.form.success")}
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <Input
                placeholder={t("membershipPage.form.name")}
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
                className="font-body"
                style={{ background: "rgba(255,255,255,0.6)", borderColor: "rgba(199,184,154,0.3)" }}
              />
              <Input
                type="email"
                placeholder={t("membershipPage.form.email")}
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
                className="font-body"
                style={{ background: "rgba(255,255,255,0.6)", borderColor: "rgba(199,184,154,0.3)" }}
              />
              <select
                value={form.level}
                onChange={(e) => setForm({ ...form, level: e.target.value })}
                className="font-body w-full rounded-md px-3 py-2"
                style={{
                  background: "rgba(255,255,255,0.6)",
                  border: "1px solid rgba(199,184,154,0.3)",
                  color: "#111",
                  fontSize: "14px",
                }}
              >
                <option>{t("membership.levels.basic")}</option>
                <option>{t("membership.levels.premium")}</option>
                <option>{t("membership.levels.protector")}</option>
              </select>
              <Button
                type="submit"
                className="font-body w-full"
                style={{
                  background: "#C7B89A",
                  color: "#111",
                  borderRadius: "6px",
                  fontWeight: 500,
                }}
              >
                {t("membershipPage.form.submit")}
              </Button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
