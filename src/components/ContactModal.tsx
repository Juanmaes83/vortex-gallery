import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface ContactModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
}

export default function ContactModal({ open, onClose, title, subtitle }: ContactModalProps) {
  const { t } = useTranslation();
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setForm({ name: "", email: "", phone: "", message: "" });
      onClose();
    }, 2500);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="glass-card max-w-md" style={{ background: "#F8F6F0", borderColor: "rgba(199,184,154,0.3)" }}>
        <DialogHeader>
          <DialogTitle className="font-display text-2xl" style={{ color: "#111" }}>
            {title || t("contact.title")}
          </DialogTitle>
        </DialogHeader>
        {sent ? (
          <p className="font-body text-center py-6" style={{ color: "#6B6B6B" }}>
            {t("contact.success")}
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-2">
            {subtitle && (
              <p className="font-body text-sm" style={{ color: "#6B6B6B" }}>
                {subtitle}
              </p>
            )}
            <Input
              placeholder={t("contact.name")}
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
              className="font-body"
              style={{ background: "rgba(255,255,255,0.6)", borderColor: "rgba(199,184,154,0.3)" }}
            />
            <Input
              type="email"
              placeholder={t("contact.email")}
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
              className="font-body"
              style={{ background: "rgba(255,255,255,0.6)", borderColor: "rgba(199,184,154,0.3)" }}
            />
            <Input
              placeholder={t("contact.phone")}
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="font-body"
              style={{ background: "rgba(255,255,255,0.6)", borderColor: "rgba(199,184,154,0.3)" }}
            />
            <Textarea
              placeholder={t("contact.message")}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              rows={4}
              className="font-body"
              style={{ background: "rgba(255,255,255,0.6)", borderColor: "rgba(199,184,154,0.3)" }}
            />
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
              {t("contact.send")}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
