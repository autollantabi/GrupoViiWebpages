import { useEffect } from 'react';
import { useEmpresa } from '../../hooks/useEmpresa';

const SEO = ({ 
  title, 
  description, 
  keywords, 
  image, 
  url, 
  type = 'website',
  noindex = false 
}) => {
  const { empresa } = useEmpresa();
  
  // Configuración base por empresa
  const getEmpresaConfig = () => {
    const configs = {
      autollanta: {
        name: 'Autollanta',
        siteName: 'Autollanta - Neumáticos y Servicios',
        defaultDescription: 'Autollanta - Especialistas en neumáticos, llantas y servicios automotrices. Calidad y confianza para tu vehículo.',
        defaultKeywords: 'neumáticos, llantas, autollanta, neumáticos autollanta, servicios automotrices, llantas autollanta',
        logo: '/brands/autollanta.png',
        color: '#e74c3c'
      },
      maxximundo: {
        name: 'Maxximundo',
        siteName: 'Maxximundo - Neumáticos Premium',
        defaultDescription: 'Maxximundo - Neumáticos de alta calidad y servicios especializados. Tu confianza, nuestra prioridad.',
        defaultKeywords: 'neumáticos, llantas, maxximundo, neumáticos premium, llantas maxximundo, servicios especializados',
        logo: '/brands/maxximundo.png',
        color: '#2c3e50'
      },
      ikonix: {
        name: 'Ikonix',
        siteName: 'Ikonix - Innovación en Neumáticos',
        defaultDescription: 'Ikonix - Tecnología avanzada en neumáticos y servicios automotrices. Innovación que marca la diferencia.',
        defaultKeywords: 'neumáticos, llantas, ikonix, neumáticos innovación, llantas ikonix, tecnología automotriz',
        logo: '/brands/ikonix.png',
        color: '#79c3d2'
      },
      stox: {
        name: 'Stox',
        siteName: 'Stox - Neumáticos de Calidad',
        defaultDescription: 'Stox - Neumáticos confiables y servicios profesionales. Calidad que se siente en cada kilómetro.',
        defaultKeywords: 'neumáticos, llantas, stox, neumáticos calidad, llantas stox, servicios profesionales',
        logo: '/brands/stox.png',
        color: '#8e44ad'
      }
    };
    
    return configs[empresa] || configs.ikonix;
  };

  const config = getEmpresaConfig();
  const siteUrl = url || (typeof window !== 'undefined' ? window.location.origin : '');
  const fullImageUrl = image ? (image.startsWith('http') ? image : `${siteUrl}${image}`) : `${siteUrl}${config.logo}`;
  
  const seoTitle = title ? `${title} | ${config.siteName}` : config.siteName;
  const seoDescription = description || config.defaultDescription;
  const seoKeywords = keywords || config.defaultKeywords;

  useEffect(() => {
    // Actualizar título
    document.title = seoTitle;
    
    // Función para actualizar o crear meta tag
    const updateMetaTag = (name, content, property = false) => {
      const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let meta = document.querySelector(selector);
      
      if (!meta) {
        meta = document.createElement('meta');
        if (property) {
          meta.setAttribute('property', name);
        } else {
          meta.setAttribute('name', name);
        }
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    // Meta tags básicos
    updateMetaTag('description', seoDescription);
    updateMetaTag('keywords', seoKeywords);
    updateMetaTag('author', config.siteName);
    updateMetaTag('robots', noindex ? "noindex,nofollow" : "index,follow");
    
    // Open Graph
    updateMetaTag('og:type', type, true);
    updateMetaTag('og:title', seoTitle, true);
    updateMetaTag('og:description', seoDescription, true);
    updateMetaTag('og:image', fullImageUrl, true);
    updateMetaTag('og:url', siteUrl, true);
    updateMetaTag('og:site_name', config.siteName, true);
    updateMetaTag('og:locale', 'es_ES', true);
    
    // Twitter Card
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', seoTitle);
    updateMetaTag('twitter:description', seoDescription);
    updateMetaTag('twitter:image', fullImageUrl);
    
    // Meta tags adicionales
    updateMetaTag('theme-color', config.color);
    updateMetaTag('msapplication-TileColor', config.color);
    
    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', siteUrl);
    
    // JSON-LD Structured Data
    let jsonLd = document.querySelector('script[type="application/ld+json"]');
    if (!jsonLd) {
      jsonLd = document.createElement('script');
      jsonLd.setAttribute('type', 'application/ld+json');
      document.head.appendChild(jsonLd);
    }
    jsonLd.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": config.siteName,
      "url": siteUrl,
      "logo": fullImageUrl,
      "description": seoDescription,
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "customer service",
        "availableLanguage": "Spanish"
      }
    });

  }, [seoTitle, seoDescription, seoKeywords, config, siteUrl, fullImageUrl, type, noindex]);

  return null; // Este componente no renderiza nada visual
};

export default SEO;
