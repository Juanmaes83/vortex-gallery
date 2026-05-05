import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import AnimatedCounter from "./AnimatedCounter";
import Confetti from "./Confetti";

export default function NewsletterForm() {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [confetti, setConfetti] = useState(false);
  const [emailValid, setEmailValid] = useState<boolean | null>(null);

  const validateEmail = (value: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailValid(value.length > 0 ? regex.test(value) : null);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    validateEmail(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || emailValid !== true) return;
    setConfetti(true);
    setSent(true);
    setEmail("");
    setEmailValid(null);
    setTimeout(() => {
      setSent(false);
      setConfetti(false);
    }, 4000);
  };

  return (
    <>
      <Confetti active={confetti} />
      <div className="glass-card p-6 md:p-8" style={{ maxWidth: "520px" }}>
        <h3 className="font-display text-2xl mb-2" style={{ color: "#111" }}>
          {t("newsletter.title")}
        </h3>
        <p className="font-body mb-2" style={{ color: "#6B6B6B", fontSize: "14px" }}>
          {t("newsletter.subtitle")}
        </p>

        {/* Social proof counter */}
        <div
          className="flex items-center gap-2 mb-4 px-3 py-2 rounded"
          style={{ background: "rgba(199, 184, 154, 0.12)" }}
        >
          <div
            className="w-2 h-2 rounded-full"
            style={{ background: "#4ade80", animation: "pulse 2s infinite" }}
          />
          <span className="font-body" style={{ color: "#6B6B6B", fontSize: "13px" }}>
            <AnimatedCounter end={8432} duration={2500} />{" "}
            {t("socialProof.newsletterCounter")}
          </span>
        </div>

        <ul className="flex flex-col gap-2 mb-6">
          {[t("newsletter.benefit1"), t("newsletter.benefit2"), t("newsletter.benefit3")].map(
            (b, i) => (
              <li
                key={i}
                className="font-body flex items-start gap-2"
                style={{ color: "#6B6B6B", fontSize: "13px" }}
              >
                <span style={{ color: "#C7B89A", fontWeight: 600 }}>&#8594;</span>
                {b}
              </li>
            )
          )}
        </ul>

        {sent ? (
          <div className="text-center py-4">
            <div
              className="mx-auto mb-3 flex items-center justify-center rounded-full"
              style={{
                width: "48px",
                height: "48px",
                background: "rgba(74, 222, 128, 0.15)",
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <p className="font-body" style={{ color: "#6B6B6B", fontSize: "14px" }}>
              {t("newsletter.success")}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <div className="relative">
              <Input
                type="email"
                placeholder={t("newsletter.placeholder")}
                value={email}
                onChange={handleEmailChange}
                required
                className="font-body flex-1 pr-10"
                style={{
                  background: "rgba(255,255,255,0.6)",
                  borderColor:
                    emailValid === true
                      ? "#4ade80"
                      : emailValid === false
                      ? "#ef4444"
                      : "rgba(199,184,154,0.3)",
                  transition: "border-color 0.3s ease",
                }}
              />
              {emailValid === true && (
                <svg
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#4ade80"
                  strokeWidth="2.5"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              )}
            </div>
            <Button
              type="submit"
              className="font-body w-full"
              disabled={emailValid !== true}
              style={{
                background: emailValid === true ? "#C7B89A" : "rgba(199,184,154,0.4)",
                color: "#111",
                borderRadius: "6px",
                fontWeight: 500,
                transition: "all 0.3s ease",
              }}
            >
              {t("newsletter.cta")}
            </Button>
          </form>
        )}
      </div>
    </>
  );
}
