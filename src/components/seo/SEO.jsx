import { useEffect } from "react";
import { getEmpresaConfig } from "../../config/empresas";

const SEO = ({
  title,
  description,
  keywords,
  image,
  url,
  type = "website",
  noindex = false,
}) => {
  // Usar directamente la variable de entorno para evitar problemas de timing
  const empresa = import.meta.env.VITE_EMPRESA_NOMBRE;

  // Obtener configuración de la empresa desde el archivo centralizado
  const config = getEmpresaConfig(empresa);
  const siteUrl =
    url || (typeof window !== "undefined" ? window.location.origin : "");
  const fullImageUrl = image
    ? image.startsWith("http")
      ? image
      : `${siteUrl}${image}`
    : `${siteUrl}${config.imagenBrand}`;

  const seoTitle = title ? `${title} | ${config.titulo}` : config.titulo;
  const seoDescription = description || config.descripcion;
  const seoKeywords =
    keywords ||
    config.defaultKeywords ||
    "llantas, servicios automotrices";

  useEffect(() => {
    // Actualizar título
    document.title = seoTitle;

    // Actualizar favicon
    const updateFavicon = (href) => {
      let link =
        document.querySelector("link[rel*='icon']") ||
        document.createElement("link");
      link.type = "image/x-icon";
      link.rel = "shortcut icon";
      link.href = href;
      document.getElementsByTagName("head")[0].appendChild(link);
    };

    if (config.favicon) {
      updateFavicon(config.favicon);
    }

    // Función para actualizar o crear meta tag
    const updateMetaTag = (name, content, property = false) => {
      const selector = property
        ? `meta[property="${name}"]`
        : `meta[name="${name}"]`;
      let meta = document.querySelector(selector);

      if (!meta) {
        meta = document.createElement("meta");
        if (property) {
          meta.setAttribute("property", name);
        } else {
          meta.setAttribute("name", name);
        }
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", content);
    };

    // Meta tags básicos
    updateMetaTag("description", seoDescription);
    updateMetaTag("keywords", seoKeywords);
    updateMetaTag("author", config.titulo);
    updateMetaTag("robots", noindex ? "noindex,nofollow" : "index,follow");

    // Open Graph
    updateMetaTag("og:type", type, true);
    updateMetaTag("og:title", seoTitle, true);
    updateMetaTag("og:description", seoDescription, true);
    updateMetaTag("og:image", fullImageUrl, true);
    updateMetaTag("og:url", siteUrl, true);
    updateMetaTag("og:site_name", config.titulo, true);
    updateMetaTag("og:locale", "es_ES", true);

    // Twitter Card
    updateMetaTag("twitter:card", "summary_large_image");
    updateMetaTag("twitter:title", seoTitle);
    updateMetaTag("twitter:description", seoDescription);
    updateMetaTag("twitter:image", fullImageUrl);

    // Meta tags adicionales
    updateMetaTag("theme-color", config.colores?.primary || "#79c3d2");
    updateMetaTag(
      "msapplication-TileColor",
      config.colores?.primary || "#79c3d2"
    );

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", siteUrl);

    // JSON-LD Structured Data
    let jsonLd = document.querySelector('script[type="application/ld+json"]');
    if (!jsonLd) {
      jsonLd = document.createElement("script");
      jsonLd.setAttribute("type", "application/ld+json");
      document.head.appendChild(jsonLd);
    }
    jsonLd.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Organization",
      name: config.titulo,
      url: siteUrl,
      logo: fullImageUrl,
      description: seoDescription,
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer service",
        availableLanguage: "Spanish",
      },
    });
  }, [
    seoTitle,
    seoDescription,
    seoKeywords,
    config,
    siteUrl,
    fullImageUrl,
    type,
    noindex,
  ]);

  return null; // Este componente no renderiza nada visual
};

export default SEO;
