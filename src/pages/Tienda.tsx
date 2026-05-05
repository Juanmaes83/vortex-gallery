import { useState } from "react";
import { useTranslation } from "react-i18next";
import ContactModal from "@/components/ContactModal";

const productsData = [
  {
    id: 1,
    nameKey: "shop.product1.name",
    descKey: "shop.product1.description",
    image: "/images/catalogo_tienda.jpg",
  },
  {
    id: 2,
    nameKey: "shop.product2.name",
    descKey: "shop.product2.description",
    image: "/images/libro_arte.jpg",
  },
  {
    id: 3,
    nameKey: "shop.product3.name",
    descKey: "shop.product3.description",
    image: "/images/lamina_arte.jpg",
  },
  {
    id: 4,
    nameKey: "shop.product4.name",
    descKey: "shop.product4.description",
    image: "/images/obra_pintura.jpg",
  },
];

export default function Tienda() {
  const { t } = useTranslation();
  const [contactOpen, setContactOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState("");

  const openContact = (productName: string) => {
    setSelectedProduct(productName);
    setContactOpen(true);
  };

  return (
    <div style={{ background: "#F8F6F0", paddingTop: "96px" }}>
      {/* Hero */}
      <section className="section-padding" style={{ paddingTop: "40px", paddingBottom: "40px" }}>
        <h1 className="font-display text-4xl md:text-5xl mb-2" style={{ color: "#111" }}>
          {t("shop.title")}
        </h1>
        <p className="font-body" style={{ color: "#6B6B6B", fontSize: "15px" }}>
          {t("shop.subtitle")}
        </p>
      </section>

      {/* Products grid */}
      <section className="section-padding" style={{ paddingBottom: "80px" }}>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {productsData.map((product) => (
            <div key={product.id} className="glass-card overflow-hidden flex flex-col">
              <div className="image-zoom" style={{ aspectRatio: "3/4" }}>
                <img
                  src={product.image}
                  alt={t(product.nameKey)}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 flex flex-col flex-1">
                <h3 className="font-display text-lg mb-1" style={{ color: "#111" }}>
                  {t(product.nameKey)}
                </h3>
                <p className="font-body mb-4" style={{ color: "#6B6B6B", fontSize: "13px" }}>
                  {t(product.descKey)}
                </p>
                <button
                  onClick={() => openContact(t(product.nameKey))}
                  className="font-body mt-auto py-2 transition-all"
                  style={{
                    background: "transparent",
                    color: "#C7B89A",
                    border: "1px solid #C7B89A",
                    borderRadius: "6px",
                    fontSize: "13px",
                    fontWeight: 500,
                  }}
                >
                  {t("shop.consult")}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <ContactModal
        open={contactOpen}
        onClose={() => setContactOpen(false)}
        title={t("shop.modalTitle")}
        subtitle={`${t("shop.modalText")} (${selectedProduct})`}
      />
    </div>
  );
}
