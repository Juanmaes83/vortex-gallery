export interface SiteConfig {
  language: string;
  brandName: string;
  copyright: string;
}

export interface NavigationConfig {
  infoLinkLabel: string;
}

export interface ContactEntry {
  label: string;
  value: string;
  href?: string;
}

export interface InfoPageConfig {
  backLinkLabel: string;
  eyebrow: string;
  title: string;
  paragraphs: string[];
  contactLabel: string;
  contactEntries: ContactEntry[];
}

export interface OverlayConfig {
  frameDetailLabel: string;
  fileLabel: string;
  seriesLabel: string;
  closeLabel: string;
}

export interface ImageItem {
  src: string;
  category: string;
  title: string;
  description: string;
}

export interface GalleryConfig {
  images: ImageItem[];
}

export const siteConfig: SiteConfig = {
  language: "es",
  brandName: "Vortex Gallery",
  copyright: "IDEA BY RUBIK SOTA 629554870",
};

export const navigationConfig: NavigationConfig = {
  infoLinkLabel: "Info",
};

export const infoPageConfig: InfoPageConfig = {
  backLinkLabel: "Volver",
  eyebrow: "Sobre nosotros",
  title: "Conectamos personas con arte que transforma",
  paragraphs: [
    "Vortex Gallery nació en 2018 con una convicción: el arte debe ser accesible, emocionante y transformador. No vendemos cuadros, creamos experiencias.",
    "Nuestro espacio en el centro de Madrid acoge exposiciones de artistas emergentes y consagrados, talleres prácticos, visitas guiadas y encuentros con creadores.",
    "Creemos en el coleccionismo como acto de amor y curiosidad. Por eso ofrecemos formación gratuita, guías y acompañamiento personalizado.",
  ],
  contactLabel: "Contacto",
  contactEntries: [
    { label: "Email", value: "hola@vortexgallery.es", href: "mailto:hola@vortexgallery.es" },
    { label: "Tel", value: "+34 629 554 870", href: "tel:+34629554870" },
    { label: "Instagram", value: "@vortexgallery", href: "https://instagram.com/vortexgallery" },
    { label: "Dirección", value: "Calle del Arte, 23\n28004 Madrid" },
  ],
};

export const overlayConfig: OverlayConfig = {
  frameDetailLabel: "Obra",
  fileLabel: "Archivo",
  seriesLabel: "Serie",
  closeLabel: "Cerrar",
};

export const galleryConfig: GalleryConfig = {
  images: [
    {
      src: "/images/obra_abstracta.jpg",
      category: "Pintura",
      title: "Silencio I — Materia y tiempo",
      description: "Pintura matérica que explora la textura como lenguaje emocional. Pigmentos naturales mezclados con tierra y ceniza sobre lienzo de lino.",
    },
    {
      src: "/images/obra_pintura.jpg",
      category: "Pintura",
      title: "Textura III — Capas de memoria",
      description: "Oleo sobre lienzo que dialoga con la abstracción gestual. Cada capa representa un momento de introspección del artista.",
    },
    {
      src: "/images/obra_retrato.jpg",
      category: "Retrato",
      title: "Presencia — Mirada interior",
      description: "Retrato contemporáneo que captura la esencia humana a través de la luz dramática y la composición clásica reinterpretada.",
    },
    {
      src: "/images/obra_acuarela.jpg",
      category: "Acuarela",
      title: "Ausencia — Paisaje etéreo",
      description: "Acuarela sobre papel de algodón que juega con la transparencia y el vacío como elementos constructivos del paisaje.",
    },
    {
      src: "/images/escultura.jpg",
      category: "Escultura",
      title: "Forma vacía — Bronce patinado",
      description: "Escultura en bronce que explora el equilibrio entre la presencia física y el espacio vacío que la rodea.",
    },
    {
      src: "/images/expo_escultura.jpg",
      category: "Exposición",
      title: "El silencio de las formas — Instalación",
      description: "Vista de la sala principal de la exposición. La escultura central dialoga con el espacio arquitectónico del museo.",
    },
    {
      src: "/images/expo_foto.jpg",
      category: "Fotografía",
      title: "Horizontes — Serie en blanco y negro",
      description: "Fotografía de gran formato que captura la soledad del paisaje desértico como metáfora del silencio interior.",
    },
    {
      src: "/images/artista_mujer.jpg",
      category: "Retrato",
      title: "Elena Vázquez — En su taller",
      description: "La artista en su espacio de trabajo, rodeada de materiales orgánicos que utiliza en su práctica pictórica matérica.",
    },
    {
      src: "/images/artista_hombre.jpg",
      category: "Retrato",
      title: "Carlos Mendoza — Escultor",
      description: "Retrato del escultor en su estudio de fundición, capturado entre moldes y maquetas de futuras obras.",
    },
    {
      src: "/images/fotografia_expo.jpg",
      category: "Fotografía",
      title: "Luz y sombra — Diapositiva III",
      description: "Fotografía experimental que explora la interacción entre luz natural y superficies reflectantes en espacios de exhibición.",
    },
    {
      src: "/images/lamina_arte.jpg",
      category: "Edición",
      title: "Geometría I — Lámina serigráfica",
      description: "Edición limitada de 50 ejemplares. Serigrafía sobre papel Arches con tintas metálicas y acrílicas.",
    },
    {
      src: "/images/libro_arte.jpg",
      category: "Publicación",
      title: "Catálogo El silencio de las formas",
      description: "Publicación de 120 páginas con textos curatorial, ensayos críticos y reproducciones a tamaño natural.",
    },
    {
      src: "/images/catalogo_tienda.jpg",
      category: "Publicación",
      title: "Edición limitada — Cuerpo y materia",
      description: "Libro de artista encuadernado en tela con estampación en caliente. Incluye obra original insertada.",
    },
    {
      src: "/images/hero_home.jpg",
      category: "Exposición",
      title: "Sala principal — Vista panorámica",
      description: "El espacio expositivo de Vortex Gallery diseñado para permitir una experiencia contemplativa sin distracciones.",
    },
    {
      src: "/images/evento_taller.jpg",
      category: "Evento",
      title: "Taller de pintura matérica",
      description: "Sesión práctica dirigida por Elena Vázquez donde los participantes experimentan con pigmentos naturales y técnicas ancestrales.",
    },
  ],
};
