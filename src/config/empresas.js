/**
 * Configuración de empresas
 * Contiene toda la información específica de cada empresa
 */

export const empresasConfig = {
  IKONIX: {
    nombre: "Ikonix",
    titulo: "Ikonix - Herramientas Profesionales",
    descripcion:
      "Especialistas en herramientas de alta calidad para profesionales",
    imagenBrand: "/brands/ikonix.png",
    imagenBrand1: "/brands/ikonix1.png",
    favicon: "/brands/iso_ikonix.png",
    colores: {
      primary: "#79c3d2",
      secondary: "#303030",
      accent: "#FFB800",
      white: "#FFFFFF",
      light: "#FFFFFF",
      dark: "#333333",
      gray: "#EFEFEF",
      lightGray: "#F8F8F8",
      text: {
        primary: "#333333",
        secondary: "#666666",
        light: "#FFFFFF",
      },
    },
    lineasNegocio: ["HERRAMIENTAS"],
    marcas: [
      {
        nombre: "Uyustools",
        logo: "/brands/uyustools.png",
        linea: "HERRAMIENTAS",
        descripcion:
          "Herramientas de rendimiento superior para cualquier trabajo",
        descripcion_larga:
          "Herramientas de rendimiento superior para cualquier trabajo, diseñadas con tecnologías innovadoras para brindar seguridad y durabilidad.",
        features: [
          "Excelente rendimiento en todo tipo de trabajos",
          "Resistencia superior al desgaste",
          "Tecnología de materiales avanzada",
          "Diseños optimizados para rendimiento",
        ],
      },
    ],
    textos: {
      hero: {
        titulo: "Bienvenido a Ikonix",
        subtitulo: "Herramientas Profesionales de Calidad",
        descripcion:
          "Ofrecemos herramientas de la mejor calidad para profesionales exigentes",
      },
      marcas: {
        titulo: "Marcas que Confiamos",
        subtitulo: "Trabajamos con las mejores marcas de herramientas",
      },
      catalogo: {
        titulo: "Nuestro Catálogo",
        subtitulo: "Descubre nuestra amplia gama de herramientas profesionales",
      },
      ubicacion: {
        titulo: "Ubicación",
        subtitulo:
          "Visítanos en nuestras instalaciones. Nuestro equipo de expertos estará encantado de atenderte y asesorarte personalmente.",
        direccion: "Gonzales Suarez y Gonzalo Saldumbide, Cuenca, Ecuador",
        horario: [
          "Lunes a Viernes: 8:00 AM - 6:00 PM",
          "Sábados: 8:00 AM - 1:00 PM",
          "Domingos: Cerrado",
        ],
        telefono: "+593 (07) 2800 022",
        email: "info@ikonix.ec",
        schedules: {
          schedule1: { day: "Lunes a Viernes", hours: "8:30 AM - 6:00 PM" },
          schedule2: { day: "Sábados", hours: "8:00 AM - 1:00 PM" },
          schedule3: { day: "Domingos", hours: "Cerrado" },
        },
        mapurl: "https://maps.app.goo.gl/Cx9FFKT66cGPrJ9s7",
        map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3984.7160462878433!2d-78.99734182502982!3d-2.8979390970785275!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91cd183ddbb21d2d%3A0xb68ca724c7002d48!2sMecanica%20Automotriz%20Autollanta%20Cuenca!5e0!3m2!1ses-419!2sec!4v1745597631849!5m2!1ses-419!2sec",
      },
      footer: {
        descripcion:
          "Distribuidor de herramientas profesionales. Calidad y rendimiento para su trabajo.",
        redesSociales: [
          {
            nombre: "Facebook",
            url: "https://www.facebook.com/profile.php?id=61559151658803",
            icon: "FaFacebook",
          },
          {
            nombre: "Instagram",
            url: "https://www.instagram.com/ikonix_cialtda?igsh=cXRsdXYxZzRlOXYx&utm_source=qr",
            icon: "FaInstagram",
          },
          {
            nombre: "TikTok",
            url: "https://www.tiktok.com/@uyustools_ecuador?_r=1&_t=ZM-91MnYL3yDbn",
            icon: "FaTiktok",
          },
        ],
      },
      pageMarcas: {
        titulo: "Nuestras Marcas",
        subtitulo:
          "En Ikonix nos enorgullece distribuir las mejores marcas de herramientas, garantizando calidad y rendimiento para todos nuestros clientes.",
        lineas: [
          {
            titulo_destacado: "Herramientas de",
            titulo_destacado_2: "Calidad y Rendimiento",
            descripcion:
              "Ofrecemos una amplia gama de herramientas para diferentes aplicaciones, desde uso diario hasta deportivo, garantizando seguridad y durabilidad.",
            linea: "HERRAMIENTAS",
          },
        ],
      },
      pageContacto: {
        titulo: "Contáctanos",
        subtitulo:
          "Estamos aquí para responder sus preguntas y proporcionarle la información que necesita sobre nuestros productos y servicios.",
      },
    },
  },

  AUTOLLANTA: {
    nombre: "Autollanta",
    titulo: "Autollanta - Especialistas en Llantas",
    descripcion:
      "Especialistas en llantas de alta calidad para todo tipo de vehículos",
    imagenBrand: "/brands/autollanta.png",
    imagenBrand1: "/brands/autollanta1.png",
    favicon: "/brands/iso_autollanta.png",
    colores: {
      primary: "#E8122B",
      secondary: "#B80E1F",
      accent: "#F39C12",
      white: "#FFFFFF",
      light: "#FFFFFF",
      dark: "#2C3E50",
      gray: "#ECF0F1",
      lightGray: "#F8F9FA",
      text: {
        primary: "#2C3E50",
        secondary: "#7F8C8D",
        light: "#FFFFFF",
      },
    },
    lineasNegocio: ["LLANTAS"],
    marcas: [
      {
        nombre: "Fortune",
        logo: "/brands/fortune.png",
        linea: "LLANTAS",
        descripcion: "Llantas de alta calidad y durabilidad",
        descripcion_larga:
          "Llantas de alta calidad y durabilidad, diseñadas para ofrecer máximo rendimiento y seguridad en todo tipo de condiciones de manejo.",
        features: [
          "Excelente agarre en superficies mojadas y secas",
          "Resistencia superior al desgaste",
          "Tecnología de banda de rodamiento avanzada",
          "Diseño optimizado para eficiencia de combustible",
        ],
      },
      {
        nombre: "Maxtrek",
        logo: "/brands/maxtrek.png",
        linea: "LLANTAS",
        descripcion: "Llantas para todo tipo de terreno",
        descripcion_larga:
          "Llantas versátiles diseñadas para adaptarse a cualquier tipo de terreno, desde carreteras urbanas hasta caminos rurales.",
        features: [
          "Versatilidad para diferentes tipos de terreno",
          "Durabilidad excepcional en condiciones adversas",
          "Tecnología de construcción robusta",
          "Rendimiento confiable en todo clima",
        ],
      },
    ],
    textos: {
      hero: {
        titulo: "Bienvenido a Autollanta",
        subtitulo: "Especialistas en Llantas",
        descripcion:
          "Ofrecemos las mejores llantas para tu vehículo con garantía de calidad",
      },
      marcas: {
        titulo: "Marcas que Confiamos",
        subtitulo: "Trabajamos con las mejores marcas de llantas",
      },
      catalogo: {
        titulo: "Nuestro Catálogo",
        subtitulo: "Descubre nuestra amplia gama de llantas",
      },
      ubicacion: {
        titulo: "Ubicación",
        subtitulo:
          "Visítanos en nuestras instalaciones. Nuestro equipo de expertos estará encantado de atenderte y asesorarte personalmente.",
        direccion: "Gonzales Suarez y Gonzalo Saldumbide, Cuenca, Ecuador",
        horario: [
          "Lunes a Viernes: 8:00 AM - 6:00 PM",
          "Sábados: 8:00 AM - 1:00 PM",
          "Domingos: Cerrado",
        ],
        telefono: "+593 (07) 2800 022",
        email: "info@autollanta.com",
        schedules: {
          schedule1: { day: "Lunes a Viernes", hours: "8:30 AM - 6:00 PM" },
          schedule2: { day: "Sábados", hours: "8:00 AM - 1:00 PM" },
          schedule3: { day: "Domingos", hours: "Cerrado" },
        },
        mapurl: "https://maps.app.goo.gl/Cx9FFKT66cGPrJ9s7",
        map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3984.7160651494632!2d-78.99734182416204!3d-2.897933739513325!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91cd183ddbb21d2d%3A0xb68ca724c7002d48!2sMecanica%20Automotriz%20Autollanta%20Cuenca!5e0!3m2!1ses!2sec!4v1763577190225!5m2!1ses!2sec",
      },
      footer: {
        descripcion:
          "Distribuidor especializado en llantas de alta calidad. Seguridad y rendimiento para tu vehículo.",
        redesSociales: [
          {
            nombre: "Facebook",
            url: "https://www.facebook.com/AutollantaEcuador",
            icon: "FaFacebook",
          },
          {
            nombre: "Instagram",
            url: "https://www.instagram.com/autollanta_cuenca?igsh=am5ucjRwb3ZzNWZj",
            icon: "FaInstagram",
          },
        ],
      },
      pageMarcas: {
        titulo: "Nuestras Marcas",
        subtitulo:
          "En Autollanta nos enorgullece distribuir las mejores marcas de llantas, garantizando seguridad y rendimiento para todos nuestros clientes.",
        lineas: [
          {
            titulo_destacado: "Llantas de",
            titulo_destacado_2: "Calidad y Seguridad",
            descripcion:
              "Ofrecemos una amplia gama de llantas para diferentes tipos de vehículos, desde automóviles hasta camiones, garantizando seguridad y durabilidad.",
            linea: "LLANTAS",
          },
        ],
      },
      pageContacto: {
        titulo: "Contáctanos",
        subtitulo:
          "Estamos aquí para responder sus preguntas y proporcionarle la información que necesita sobre nuestros productos y servicios.",
      },
    },
  },

  MAXXIMUNDO: {
    nombre: "Maxximundo",
    titulo: "Maxximundo - Llantas y Lubricantes",
    descripcion:
      "Distribuidores especializados en llantas y lubricantes de alta calidad",
    imagenBrand: "/brands/maxximundo.png",
    imagenBrand1: "/brands/maxximundo1.png",
    favicon: "/brands/iso_maxximundo.png",
    colores: {
      primary: "#FD4703",
      secondary: "#CC3800",
      accent: "#FFD700",
      white: "#FFFFFF",
      light: "#FFFFFF",
      dark: "#2F2F2F",
      gray: "#F0F0F0",
      lightGray: "#FAFAFA",
      text: {
        primary: "#2F2F2F",
        secondary: "#666666",
        light: "#FFFFFF",
      },
    },
    lineasNegocio: ["LLANTAS", "LLANTAS MOTO", "LUBRICANTES"],
    marcas: [
      // Marcas de Lubricantes
      {
        nombre: "Shell",
        logo: "/brands/shell.png",
        linea: "LUBRICANTES",
        categorias: [],
        descripcion: "Lubricantes de alta tecnología",
        descripcion_larga:
          "Lubricantes de alta tecnología diseñados para ofrecer máximo rendimiento y protección del motor en todas las condiciones de manejo.",
        features: [
          "Protección superior del motor",
          "Tecnología de limpieza avanzada",
          "Rendimiento optimizado en frío y calor",
          "Eficiencia de combustible mejorada",
        ],
      },
      {
        nombre: "Pennzoil",
        logo: "/brands/pennzoil.png",
        linea: "LUBRICANTES",
        categorias: [],
        descripcion: "Aceites de motor premium",
        descripcion_larga:
          "Aceites de motor premium con tecnología de limpieza superior que mantiene el motor más limpio que cualquier otro aceite convencional.",
        features: [
          "Tecnología de limpieza superior",
          "Protección contra el desgaste",
          "Rendimiento en condiciones extremas",
          "Durabilidad excepcional",
        ],
      },
      // Marcas de Llantas
      {
        nombre: "Maxxis",
        logo: "/brands/maxxis.png",
        linea: "LLANTAS",
        categorias: ["Vehiculos", "Motocicletas"],
        descripcion: "Llantas de alto rendimiento",
        descripcion_larga:
          "Llantas de alto rendimiento diseñadas para ofrecer excelente agarre, durabilidad y eficiencia de combustible en todo tipo de condiciones, desde vehículos comerciales hasta motocicletas.",
        features: [
          "Alto rendimiento en todo tipo de superficie",
          "Durabilidad excepcional",
          "Tecnología de banda de rodamiento avanzada",
          "Eficiencia de combustible optimizada",
          "Disponible para vehículos y motocicletas",
        ],
      },
      {
        nombre: "Roadcruza",
        logo: "/brands/roadcruza.png",
        linea: "LLANTAS",
        categorias: ["Vehiculos"],
        descripcion: "Llantas para vehículos comerciales",
        descripcion_larga:
          "Llantas especializadas para vehículos comerciales, diseñadas para soportar cargas pesadas y ofrecer máxima durabilidad.",
        features: [
          "Resistencia superior para cargas pesadas",
          "Durabilidad excepcional en uso comercial",
          "Tecnología de construcción robusta",
          "Rendimiento confiable en largas distancias",
        ],
      },
      {
        nombre: "Aplus",
        logo: "/brands/aplus.png",
        linea: "LLANTAS",
        categorias: ["Vehiculos"],
        descripcion: "Llantas de calidad garantizada",
        descripcion_larga:
          "Llantas de calidad garantizada que ofrecen excelente relación calidad-precio para todo tipo de vehículos y presupuestos.",
        features: [
          "Excelente relación calidad-precio",
          "Garantía de calidad extendida",
          "Versatilidad para diferentes vehículos",
          "Rendimiento confiable y duradero",
        ],
      },
      {
        nombre: "Haohua",
        logo: "/brands/haohua.png",
        linea: "LLANTAS",
        categorias: ["Vehiculos"],
        descripcion: "Llantas para todo tipo de vehículos",
        descripcion_larga:
          "Llantas versátiles diseñadas para adaptarse a todo tipo de vehículos, desde automóviles hasta camiones comerciales.",
        features: [
          "Versatilidad para diferentes tipos de vehículos",
          "Durabilidad en condiciones variadas",
          "Tecnología de construcción confiable",
          "Rendimiento equilibrado en todo clima",
        ],
      },
      {
        nombre: "CST",
        logo: "/brands/cst.png",
        linea: "LLANTAS",
        categorias: ["Motocicletas"],
        descripcion: "Llantas especializadas para motocicletas",
        descripcion_larga:
          "Llantas especializadas para motocicletas, diseñadas para ofrecer máximo agarre y control en todo tipo de terreno y condiciones.",
        features: [
          "Especializadas para motocicletas",
          "Máximo agarre en diferentes superficies",
          "Tecnología de construcción ligera",
          "Rendimiento deportivo superior",
        ],
      },
      {
        nombre: "Keystone",
        logo: "/brands/keystone.png",
        linea: "LLANTAS",
        categorias: ["Motocicletas"],
        descripcion: "Llantas de moto de diseño y calidad",
        descripcion_larga:
          "Llantas para motocicletas que combinan diseño atractivo con calidad superior, ofreciendo tanto estética como rendimiento excepcional.",
        features: [
          "Diseño atractivo y moderno",
          "Calidad superior en materiales",
          "Rendimiento equilibrado",
          "Durabilidad excepcional",
        ],
      },
    ],
    textos: {
      hero: {
        titulo: "Bienvenido a Maxximundo",
        subtitulo: "Llantas y Lubricantes de Calidad",
        descripcion:
          "Distribuidores especializados en llantas y lubricantes para todo tipo de vehículos",
      },
      marcas: {
        titulo: "Marcas que Confiamos",
        subtitulo: "Trabajamos con las mejores marcas del mercado",
      },
      catalogo: {
        titulo: "Nuestro Catálogo",
        subtitulo: "Descubre nuestra amplia gama de llantas y lubricantes",
      },
      ubicacion: {
        titulo: "Ubicación",
        subtitulo:
          "Visítanos en nuestras instalaciones. Nuestro equipo de expertos estará encantado de atenderte y asesorarte personalmente.",
        direccion: "Gonzales Suarez y Gonzalo Saldumbide, Cuenca, Ecuador",
        horario: [
          "Lunes a Viernes: 8:00 AM - 6:00 PM",
          "Sábados: 8:00 AM - 1:00 PM",
          "Domingos: Cerrado",
        ],
        telefono: "+593 (07) 2800 022",
        email: "info@maxximundo.com",
        schedules: {
          schedule1: { day: "Lunes a Viernes", hours: "8:30 AM - 6:00 PM" },
          schedule2: { day: "Sábados", hours: "8:00 AM - 1:00 PM" },
          schedule3: { day: "Domingos", hours: "Cerrado" },
        },
        mapurl: "https://maps.app.goo.gl/Cx9FFKT66cGPrJ9s7",
        map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3984.7160651494632!2d-78.99734182416204!3d-2.897933739513325!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91cd183ddbb21d2d%3A0xb68ca724c7002d48!2sMecanica%20Automotriz%20Autollanta%20Cuenca!5e0!3m2!1ses!2sec!4v1763577190225!5m2!1ses!2sec",
      },
      footer: {
        descripcion:
          "Distribuidores especializados en llantas y lubricantes de alta calidad. Rendimiento y durabilidad para tu vehículo.",
        redesSociales: [
          {
            nombre: "Facebook",
            url: "https://www.facebook.com/maxximundo/",
            icon: "FaFacebook",
          },
          {
            nombre: "Instagram",
            url: "https://www.instagram.com/maxximundo?igsh=OWFzN3VvbDR3YjJz",
            icon: "FaInstagram",
          },
        ],
      },
      pageMarcas: {
        titulo: "Nuestras Marcas",
        subtitulo:
          "En Maxximundo nos enorgullece distribuir las mejores marcas de llantas y lubricantes, garantizando calidad y rendimiento para todos nuestros clientes.",
        lineas: [
          {
            titulo_destacado: "Lubricantes de",
            titulo_destacado_2: "Alta Tecnología",
            descripcion:
              "Ofrecemos una amplia gama de lubricantes para diferentes tipos de motores, desde automóviles hasta maquinaria industrial, garantizando protección y rendimiento.",
            linea: "LUBRICANTES",
          },
          {
            titulo_destacado: "Llantas de",
            titulo_destacado_2: "Calidad y Rendimiento",
            descripcion:
              "Ofrecemos una amplia gama de llantas para diferentes tipos de vehículos, desde automóviles y camiones comerciales hasta motocicletas, garantizando seguridad y durabilidad.",
            linea: "LLANTAS",
          },
        ],
      },
      pageContacto: {
        titulo: "Contáctanos",
        subtitulo:
          "Estamos aquí para responder sus preguntas y proporcionarle la información que necesita sobre nuestros productos y servicios.",
      },
    },
  },

  STOX: {
    nombre: "Stox",
    titulo: "Stox - Especialistas en Llantas",
    descripcion: "Especialistas en llantas de alta calidad y rendimiento",
    imagenBrand: "/brands/stox.png",
    imagenBrand1: "/brands/stox1.png",
    favicon: "/brands/iso_stox.png",
    colores: {
      primary: "#e22084",
      secondary: "#3bbbed",
      accent: "#F1C40F",
      white: "#FFFFFF",
      light: "#FFFFFF",
      dark: "#2C3E50",
      gray: "#F4F6F7",
      lightGray: "#F8F9FA",
      text: {
        primary: "#2C3E50",
        secondary: "#7F8C8D",
        light: "#FFFFFF",
      },
    },
    lineasNegocio: ["LLANTAS"],
    marcas: [
      {
        nombre: "Farroad",
        logo: "/brands/farroad.png",
        linea: "LLANTAS",
        descripcion: "Llantas de alta calidad y durabilidad",
        descripcion_larga:
          "Llantas de alta calidad y durabilidad, diseñadas para ofrecer excelente rendimiento y resistencia en todo tipo de condiciones de manejo.",
        features: [
          "Excelente durabilidad y resistencia",
          "Rendimiento superior en diferentes superficies",
          "Tecnología de construcción avanzada",
          "Garantía de calidad extendida",
        ],
      },
      {
        nombre: "Antares",
        logo: "/brands/antares.png",
        linea: "LLANTAS",
        descripcion: "Llantas para todo tipo de terreno",
        descripcion_larga:
          "Llantas versátiles diseñadas para adaptarse a cualquier tipo de terreno, desde carreteras urbanas hasta caminos rurales y off-road.",
        features: [
          "Versatilidad para diferentes terrenos",
          "Durabilidad excepcional en condiciones adversas",
          "Tecnología de banda de rodamiento especializada",
          "Rendimiento confiable en todo clima",
        ],
      },
      {
        nombre: "CST",
        logo: "/brands/cst.png",
        linea: "LLANTAS",
        descripcion: "Llantas de tecnología avanzada",
        descripcion_larga:
          "Llantas de tecnología avanzada que incorporan las últimas innovaciones en diseño y materiales para ofrecer máximo rendimiento y eficiencia.",
        features: [
          "Tecnología de vanguardia en materiales",
          "Diseño aerodinámico optimizado",
          "Eficiencia de combustible mejorada",
          "Rendimiento superior en todo tipo de condiciones",
        ],
      },
      {
        nombre: "Wonderland",
        logo: "/brands/wonderland.png",
        linea: "LLANTAS",
        descripcion: "Llantas de diseño y rendimiento",
        descripcion_larga:
          "Llantas que combinan diseño atractivo con rendimiento excepcional, ofreciendo tanto estética como funcionalidad superior.",
        features: [
          "Diseño atractivo y moderno",
          "Rendimiento excepcional",
          "Calidad superior en materiales",
          "Durabilidad y estética equilibradas",
        ],
      },
    ],
    textos: {
      hero: {
        titulo: "Bienvenido a Stox",
        subtitulo: "Especialistas en Llantas",
        descripcion:
          "Ofrecemos las mejores llantas con garantía de calidad y rendimiento",
      },
      marcas: {
        titulo: "Marcas que Confiamos",
        subtitulo: "Trabajamos con las mejores marcas de llantas",
      },
      catalogo: {
        titulo: "Nuestro Catálogo",
        subtitulo: "Descubre nuestra amplia gama de llantas",
      },
      ubicacion: {
        titulo: "Ubicación",
        subtitulo:
          "Visítanos en nuestras instalaciones. Nuestro equipo de expertos estará encantado de atenderte y asesorarte personalmente.",
        direccion: "Gonzales Suarez y Gonzalo Saldumbide, Cuenca, Ecuador",
        horario: [
          "Lunes a Viernes: 8:00 AM - 6:00 PM",
          "Sábados: 8:00 AM - 1:00 PM",
          "Domingos: Cerrado",
        ],
        telefono: "+593 (07) 2800 022",
        email: "info@stox.com.ec",
        schedules: {
          schedule1: { day: "Lunes a Viernes", hours: "8:30 AM - 6:00 PM" },
          schedule2: { day: "Sábados", hours: "8:00 AM - 1:00 PM" },
          schedule3: { day: "Domingos", hours: "Cerrado" },
        },
        mapurl: "https://maps.app.goo.gl/Cx9FFKT66cGPrJ9s7",
        map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3984.7160651494632!2d-78.99734182416204!3d-2.897933739513325!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91cd183ddbb21d2d%3A0xb68ca724c7002d48!2sMecanica%20Automotriz%20Autollanta%20Cuenca!5e0!3m2!1ses!2sec!4v1763577190225!5m2!1ses!2sec",
      },
      footer: {
        descripcion:
          "Especialistas en llantas de alta calidad y rendimiento. Seguridad y durabilidad para tu vehículo.",
        redesSociales: [
          {
            nombre: "Facebook",
            url: "https://www.facebook.com/profile.php?id=61562193869634",
            icon: "FaFacebook",
          },
        ],
      },
      pageMarcas: {
        titulo: "Nuestras Marcas",
        subtitulo:
          "En Stox nos enorgullece distribuir las mejores marcas de llantas, garantizando calidad y rendimiento para todos nuestros clientes.",
        lineas: [
          {
            titulo_destacado: "Llantas de",
            titulo_destacado_2: "Calidad y Rendimiento",
            descripcion:
              "Ofrecemos una amplia gama de llantas para diferentes tipos de vehículos, desde automóviles hasta camiones, garantizando seguridad y durabilidad.",
            linea: "LLANTAS",
          },
        ],
      },
      pageContacto: {
        titulo: "Contáctanos",
        subtitulo:
          "Estamos aquí para responder sus preguntas y proporcionarle la información que necesita sobre nuestros productos y servicios.",
      },
    },
  },

  AUTOMAX: {
    nombre: "Automax",
    titulo: "Automax - Especialistas en Llantas",
    descripcion:
      "Distribuidores especializados en llantas y lubricantes de alta calidad",
    imagenBrand: "/brands/automax.png",
    imagenBrand1: "/brands/automax1.png",
    favicon: "/brands/iso_automax.png",
    colores: {
      primary: "#FD4703",
      secondary: "#CC3800",
      accent: "#FFD700",
      white: "#FFFFFF",
      light: "#FFFFFF",
      dark: "#2F2F2F",
      gray: "#F0F0F0",
      lightGray: "#FAFAFA",
      text: {
        primary: "#2F2F2F",
        secondary: "#666666",
        light: "#FFFFFF",
      },
    },
    lineasNegocio: ["LLANTAS", "LLANTAS MOTO"],
    marcas: [
      // Marcas de Lubricantes
      {
        nombre: "Shell",
        logo: "/brands/shell.png",
        linea: "LUBRICANTES",
        categorias: [],
        descripcion: "Lubricantes de alta tecnología",
        descripcion_larga:
          "Lubricantes de alta tecnología diseñados para ofrecer máximo rendimiento y protección del motor en todas las condiciones de manejo.",
        features: [
          "Protección superior del motor",
          "Tecnología de limpieza avanzada",
          "Rendimiento optimizado en frío y calor",
          "Eficiencia de combustible mejorada",
        ],
      },
      {
        nombre: "Pennzoil",
        logo: "/brands/pennzoil.png",
        linea: "LUBRICANTES",
        categorias: [],
        descripcion: "Aceites de motor premium",
        descripcion_larga:
          "Aceites de motor premium con tecnología de limpieza superior que mantiene el motor más limpio que cualquier otro aceite convencional.",
        features: [
          "Tecnología de limpieza superior",
          "Protección contra el desgaste",
          "Rendimiento en condiciones extremas",
          "Durabilidad excepcional",
        ],
      },
      // Marcas de Llantas
      {
        nombre: "Maxxis",
        logo: "/brands/maxxis.png",
        linea: "LLANTAS",
        categorias: ["Vehiculos", "Motocicletas"],
        descripcion: "Llantas de alto rendimiento",
        descripcion_larga:
          "Llantas de alto rendimiento diseñadas para ofrecer excelente agarre, durabilidad y eficiencia de combustible en todo tipo de condiciones, desde vehículos comerciales hasta motocicletas.",
        features: [
          "Alto rendimiento en todo tipo de superficie",
          "Durabilidad excepcional",
          "Tecnología de banda de rodamiento avanzada",
          "Eficiencia de combustible optimizada",
          "Disponible para vehículos y motocicletas",
        ],
      },
      {
        nombre: "Roadcruza",
        logo: "/brands/roadcruza.png",
        linea: "LLANTAS",
        categorias: ["Vehiculos"],
        descripcion: "Llantas para vehículos comerciales",
        descripcion_larga:
          "Llantas especializadas para vehículos comerciales, diseñadas para soportar cargas pesadas y ofrecer máxima durabilidad.",
        features: [
          "Resistencia superior para cargas pesadas",
          "Durabilidad excepcional en uso comercial",
          "Tecnología de construcción robusta",
          "Rendimiento confiable en largas distancias",
        ],
      },
      {
        nombre: "Aplus",
        logo: "/brands/aplus.png",
        linea: "LLANTAS",
        categorias: ["Vehiculos"],
        descripcion: "Llantas de calidad garantizada",
        descripcion_larga:
          "Llantas de calidad garantizada que ofrecen excelente relación calidad-precio para todo tipo de vehículos y presupuestos.",
        features: [
          "Excelente relación calidad-precio",
          "Garantía de calidad extendida",
          "Versatilidad para diferentes vehículos",
          "Rendimiento confiable y duradero",
        ],
      },
      {
        nombre: "Haohua",
        logo: "/brands/haohua.png",
        linea: "LLANTAS",
        categorias: ["Vehiculos"],
        descripcion: "Llantas para todo tipo de vehículos",
        descripcion_larga:
          "Llantas versátiles diseñadas para adaptarse a todo tipo de vehículos, desde automóviles hasta camiones comerciales.",
        features: [
          "Versatilidad para diferentes tipos de vehículos",
          "Durabilidad en condiciones variadas",
          "Tecnología de construcción confiable",
          "Rendimiento equilibrado en todo clima",
        ],
      },
      {
        nombre: "CST",
        logo: "/brands/cst.png",
        linea: "LLANTAS",
        categorias: ["Motocicletas"],
        descripcion: "Llantas especializadas para motocicletas",
        descripcion_larga:
          "Llantas especializadas para motocicletas, diseñadas para ofrecer máximo agarre y control en todo tipo de terreno y condiciones.",
        features: [
          "Especializadas para motocicletas",
          "Máximo agarre en diferentes superficies",
          "Tecnología de construcción ligera",
          "Rendimiento deportivo superior",
        ],
      },
      {
        nombre: "Keystone",
        logo: "/brands/keystone.png",
        linea: "LLANTAS",
        categorias: ["Motocicletas"],
        descripcion: "Llantas de moto de diseño y calidad",
        descripcion_larga:
          "Llantas para motocicletas que combinan diseño atractivo con calidad superior, ofreciendo tanto estética como rendimiento excepcional.",
        features: [
          "Diseño atractivo y moderno",
          "Calidad superior en materiales",
          "Rendimiento equilibrado",
          "Durabilidad excepcional",
        ],
      },
    ],
    textos: {
      hero: {
        titulo: "Bienvenido a Automax",
        subtitulo: "Especialistas en Llantas",
        descripcion:
          "Ofrecemos las mejores llantas con garantía de calidad y rendimiento",
      },
      marcas: {
        titulo: "Marcas que Confiamos",
        subtitulo: "Trabajamos con las mejores marcas del mercado",
      },
      catalogo: {
        titulo: "Nuestro Catálogo",
        subtitulo: "Descubre nuestra amplia gama de llantas",
      },
      ubicacion: {
        titulo: "Ubicación",
        subtitulo:
          "Visítanos en nuestras instalaciones. Nuestro equipo de expertos estará encantado de atenderte y asesorarte personalmente.",
        direccion:
          "Pavas, 50 metros al Oeste de las oficinas de pizza Hut, San José, Costa Rica",
        horario: ["Lunes a Viernes: 7:30 AM - 5:30 PM"],
        telefono: "+(506) 2290 0535",
        email: "info@automax.cr",
        schedules: {
          schedule1: { day: "Lunes a Viernes", hours: "7:30 AM - 5:30 PM" },
        },
        
        mapurl:
          "https://www.google.com/maps/place/Complejo+Industrial+AUTOMAX+SRL/@9.9420802,-84.1332021,12.88z/data=!4m6!3m5!1s0x8fa0fd0040ce782b:0x5f90c63800f9b7a0!8m2!3d9.9375037!4d-84.1219586!16s%2Fg%2F11y43xxthk?entry=ttu&g_ep=EgoyMDI1MTExNi4wIKXMDSoASAFQAw%3D%3D",
        map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d68402.05536059935!2d-84.13320209006733!3d9.942080162394426!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8fa0fd0040ce782b%3A0x5f90c63800f9b7a0!2sComplejo%20Industrial%20AUTOMAX%20SRL!5e0!3m2!1ses!2sec!4v1763576083909!5m2!1ses!2sec",
      },
      footer: {
        descripcion:
          "Especialistas en llantas de alta calidad y rendimiento. Seguridad y durabilidad para tu vehículo.",
        redesSociales: [
          {
            nombre: "Facebook",
            url: "https://www.facebook.com/automaxxis1",
            icon: "FaFacebook",
          },
          {
            nombre: "Instagram",
            url: "https://www.instagram.com/maxxiscostarica?igsh=MXRxMjV3bDUzcjEzZw== ",
            icon: "FaInstagram",
          },
        ],
      },
      pageMarcas: {
        titulo: "Nuestras Marcas",
        subtitulo:
          "En Automax nos enorgullece distribuir las mejores marcas de llantas, garantizando calidad y rendimiento para todos nuestros clientes.",
        lineas: [
          {
            titulo_destacado: "Llantas de",
            titulo_destacado_2: "Calidad y Rendimiento",
            descripcion:
              "Ofrecemos una amplia gama de llantas para diferentes tipos de vehículos, desde automóviles y camiones comerciales hasta motocicletas, garantizando seguridad y durabilidad.",
            linea: "LLANTAS",
          },
        ],
      },
      pageContacto: {
        titulo: "Contáctanos",
        subtitulo:
          "Estamos aquí para responder sus preguntas y proporcionarle la información que necesita sobre nuestros productos y servicios.",
      },
    },
  },
};

/**
 * Obtiene la configuración de la empresa actual
 * @param {string} nombreEmpresa - Nombre de la empresa
 * @returns {Object} Configuración de la empresa
 */
export const getEmpresaConfig = (nombreEmpresa) => {
  const empresaKey = nombreEmpresa?.toUpperCase().replace(/\s+/g, "");
  return empresasConfig[empresaKey];
};

/**
 * Obtiene el tema de colores de la empresa actual
 * @param {string} nombreEmpresa - Nombre de la empresa
 * @returns {Object} Tema de colores
 */
export const getEmpresaTheme = (nombreEmpresa) => {
  const config = getEmpresaConfig(nombreEmpresa);
  return {
    colors: config.colores,
    fonts: {
      main: "system-ui, Avenir, Helvetica, Arial, sans-serif",
    },
    fontSizes: {
      xs: "0.75rem",
      sm: "0.875rem",
      md: "1rem",
      lg: "1.25rem",
      xl: "1.5rem",
      xxl: "2rem",
      xxxl: "3rem",
    },
    spacing: {
      xs: "0.25rem",
      sm: "0.5rem",
      md: "1rem",
      lg: "1.5rem",
      xl: "2rem",
      xxl: "3rem",
    },
    breakpoints: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
    },
    borderRadius: {
      sm: "4px",
      md: "8px",
      lg: "16px",
      xl: "20px",
      full: "9999px",
    },
    shadows: {
      sm: "0 1px 3px rgba(0, 0, 0, 0.1)",
      md: "0 4px 6px rgba(0, 0, 0, 0.1)",
      lg: "0 10px 15px rgba(0, 0, 0, 0.1)",
    },
  };
};
